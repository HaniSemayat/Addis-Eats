import { useEffect, useState } from "react";

import formatCurrency from "../utils/formatCurrency";

const STORAGE_KEY = "addis-eats-admin-dishes";

function DishManager() {
    const [dishes, setDishes] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(function () {
        async function loadDishes() {
            try {
                const saved =
                    localStorage.getItem(
                        STORAGE_KEY
                    );

                if (saved) {
                    setDishes(
                        JSON.parse(saved)
                    );
                    setLoading(false);
                    return;
                }

                const response =
                    await fetch("/dishes.json");

                if (!response.ok) {
                    throw new Error(
                        "Could not load menu."
                    );
                }

                const data =
                    await response.json();

                setDishes(data);

                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(data)
                );
            } catch (err) {
                setError(
                    "Could not load the menu."
                );
            } finally {
                setLoading(false);
            }
        }

        loadDishes();
    }, []);

    function handleDelete(id) {
        const dish = dishes.find(
            function (item) {
                return item.id === id;
            }
        );

        if (!dish) {
            return;
        }

        const confirmed = window.confirm(
            `Delete "${dish.name}"?`
        );

        if (!confirmed) {
            return;
        }

        setDishes(function (current) {
            const updated =
                current.filter(
                    function (item) {
                        return item.id !== id;
                    }
                );

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updated)
            );

            return updated;
        });
    }

    const shownDishes =
        dishes.filter(function (dish) {
            const text =
                search.trim().toLowerCase();

            if (!text) {
                return true;
            }

            return (
                dish.name
                    .toLowerCase()
                    .includes(text) ||
                dish.category
                    .toLowerCase()
                    .includes(text)
            );
        });

    if (loading) {
        return (
            <p className="status">
                Loading menu...
            </p>
        );
    }

    if (error) {
        return (
            <p className="error">
                {error}
            </p>
        );
    }

    return (
        <section className="admin-menu">
            <div className="admin-page-heading">
                <div>
                    <h1>Menu Manager</h1>
                    <p>
                        Manage dishes in the
                        Addis Eats menu.
                    </p>
                </div>
            </div>

            <div className="admin-menu-toolbar">
                <input
                    type="search"
                    placeholder="Search dishes..."
                    value={search}
                    onChange={function (event) {
                        setSearch(
                            event.target.value
                        );
                    }}
                />
            </div>

            {shownDishes.length === 0 ? (
                <p className="status">
                    No dishes found.
                </p>
            ) : (
                <div className="admin-dish-list">
                    {shownDishes.map(
                        function (dish) {
                            return (
                                <article
                                    className="admin-dish-card"
                                    key={dish.id}
                                >
                                    <img
                                        src={dish.image}
                                        alt={dish.name}
                                    />

                                    <div className="admin-dish-info">
                                        <h2>
                                            {dish.name}
                                        </h2>

                                        <p>
                                            {dish.category}
                                        </p>

                                        <strong>
                                            {formatCurrency(
                                                dish.price
                                            )}
                                        </strong>
                                    </div>

                                    <div className="admin-dish-actions">
                                        <button
                                            type="button"
                                            onClick={function () {
                                                window.alert(
                                                    "Edit form coming next."
                                                );
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={function () {
                                                handleDelete(
                                                    dish.id
                                                );
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </article>
                            );
                        }
                    )}
                </div>
            )}
        </section>
    );
}

export default DishManager;
