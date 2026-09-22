import { useEffect, useState } from "react";

import formatCurrency from "../utils/formatCurrency";
import DishForm from "./DishForm";

const STORAGE_KEY =
    "addis-eats-admin-dishes";

function DishManager() {
    const [dishes, setDishes] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [showForm, setShowForm] =
        useState(false);

    const [editingDish, setEditingDish] =
        useState(null);

    useEffect(function () {
        async function loadDishes() {
            try {
                const saved =
                    localStorage.getItem(
                        STORAGE_KEY
                    );

                if (saved) {
                    const parsed =
                        JSON.parse(saved);

                    const normalized =
                        parsed.map(
                            function (dish) {
                                return {
                                    ...dish,
                                    available:
                                        dish.available ??
                                        true
                                };
                            }
                        );

                    setDishes(normalized);

                    localStorage.setItem(
                        STORAGE_KEY,
                        JSON.stringify(
                            normalized
                        )
                    );

                    setLoading(false);
                    return;
                }

                const response =
                    await fetch(
                        "/dishes.json"
                    );

                if (!response.ok) {
                    throw new Error(
                        "Could not load menu."
                    );
                }

                const data =
                    await response.json();

                const normalized =
                    data.map(
                        function (dish) {
                            return {
                                ...dish,
                                available:
                                    dish.available ??
                                    true
                            };
                        }
                    );

                setDishes(normalized);

                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(
                        normalized
                    )
                );
            } catch {
                setError(
                    "Could not load the menu."
                );
            } finally {
                setLoading(false);
            }
        }

        loadDishes();
    }, []);

    function saveDishes(updatedDishes) {
        setDishes(updatedDishes);

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(
                updatedDishes
            )
        );
    }

    function handleAdd() {
        setEditingDish(null);
        setShowForm(true);
    }

    function handleEdit(dish) {
        setEditingDish(dish);
        setShowForm(true);
    }

    function handleSave(formDish) {
        if (editingDish) {
            const updated =
                dishes.map(
                    function (dish) {
                        if (
                            dish.id ===
                            editingDish.id
                        ) {
                            return {
                                ...formDish,
                                id: dish.id
                            };
                        }

                        return dish;
                    }
                );

            saveDishes(updated);
        } else {
            const newDish = {
                ...formDish,
                id: `Food-${Date.now()}`
            };

            saveDishes([
                newDish,
                ...dishes
            ]);
        }

        setShowForm(false);
        setEditingDish(null);
    }

    function handleCancel() {
        setShowForm(false);
        setEditingDish(null);
    }

    function handleAvailability(id) {
        const updated =
            dishes.map(
                function (dish) {
                    if (dish.id === id) {
                        return {
                            ...dish,
                            available:
                                dish.available ===
                                false
                                    ? true
                                    : false
                        };
                    }

                    return dish;
                }
            );

        saveDishes(updated);
    }

    function handleDelete(id) {
        const dish = dishes.find(
            function (item) {
                return item.id === id;
            }
        );

        if (!dish) {
            return;
        }

        const confirmed =
            window.confirm(
                `Delete "${dish.name}"?`
            );

        if (!confirmed) {
            return;
        }

        const updated =
            dishes.filter(
                function (item) {
                    return item.id !== id;
                }
            );

        saveDishes(updated);
    }

    const shownDishes =
        dishes.filter(
            function (dish) {
                const text =
                    search
                        .trim()
                        .toLowerCase();

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
            }
        );

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
                    <h1>
                        Menu Manager
                    </h1>

                    <p>
                        Manage dishes in the
                        Addis Eats menu.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleAdd}
                >
                    + Add Dish
                </button>
            </div>

            {showForm && (
                <div className="admin-form-panel">

                    <h2>
                        {editingDish
                            ? "Edit Dish"
                            : "Add New Dish"}
                    </h2>

                    <DishForm
                        key={
                            editingDish
                                ? editingDish.id
                                : "new"
                        }
                        dish={editingDish}
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />

                </div>
            )}

            <div className="admin-menu-toolbar">
                <input
                    type="search"
                    placeholder="Search dishes..."
                    value={search}
                    onChange={function (
                        event
                    ) {
                        setSearch(
                            event.target.value
                        );
                    }}
                />
            </div>

            {shownDishes.length ===
            0 ? (
                <p className="status">
                    No dishes found.
                </p>
            ) : (
                <div className="admin-dish-list">

                    {shownDishes.map(
                        function (dish) {
                            const isAvailable =
                                dish.available !==
                                false;

                            return (
                                <article
                                    className={
                                        isAvailable
                                            ? "admin-dish-card"
                                            : "admin-dish-card unavailable"
                                    }
                                    key={dish.id}
                                >
                                    <img
                                        src={
                                            dish.image
                                        }
                                        alt={
                                            dish.name
                                        }
                                    />

                                    <div className="admin-dish-info">
                                        <h2>
                                            {
                                                dish.name
                                            }
                                        </h2>

                                        <p>
                                            {
                                                dish.category
                                            }
                                        </p>

                                        <strong>
                                            {formatCurrency(
                                                dish.price
                                            )}
                                        </strong>

                                        <span
                                            className={
                                                isAvailable
                                                    ? "admin-availability available"
                                                    : "admin-availability unavailable-status"
                                            }
                                        >
                                            {isAvailable
                                                ? "Available"
                                                : "Unavailable"}
                                        </span>
                                    </div>

                                    <div className="admin-dish-actions">

                                        <button
                                            type="button"
                                            onClick={function () {
                                                handleAvailability(
                                                    dish.id
                                                );
                                            }}
                                        >
                                            {isAvailable
                                                ? "Disable"
                                                : "Enable"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={function () {
                                                handleEdit(
                                                    dish
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