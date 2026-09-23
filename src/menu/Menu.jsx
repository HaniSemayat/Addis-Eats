import {
    useEffect,
    useMemo,
    useState
} from "react";

import { useSearchParams } from "react-router-dom";

import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import Skeleton from "../ui/Skeleton";
import { useCartStore } from "../cart/cartStore";


const STORAGE_KEY =
    "addis-eats-admin-dishes";

function Menu() {
    const [searchParams, setSearchParams] =
        useSearchParams();

    const [search, setSearch] =
        useState("");

    const [dishes, setDishes] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const category =
        searchParams.get("category") || "All";

    const addItem = useCartStore(
        (state) => state.addItem
    );

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

                    setDishes(parsed);
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

    function handleCategoryChange(
        newCategory
    ) {
        if (newCategory === "All") {
            setSearchParams({});
        } else {
            setSearchParams({
                category: newCategory
            });
        }
    }

    const shownDishes = useMemo(
        function () {
            let filteredDishes =
                dishes;

            if (category !== "All") {
                filteredDishes =
                    filteredDishes.filter(
                        function (dish) {
                            return (
                                dish.category ===
                                category
                            );
                        }
                    );
            }

            const searchText =
                search.trim().toLowerCase();

            if (searchText) {
                filteredDishes =
                    filteredDishes.filter(
                        function (dish) {
                            return (
                                dish.name
                                    .toLowerCase()
                                    .includes(
                                        searchText
                                    ) ||
                                dish.description
                                    .toLowerCase()
                                    .includes(
                                        searchText
                                    )
                            );
                        }
                    );
            }

            return filteredDishes;
        },
        [dishes, category, search]
    );

    function handleAdd(dish) {
        if (dish.available === false) {
            return;
        }

        addItem(dish);
    }

    if (loading) {
        return (
             <div>
                <h2>Full Menu</h2>
                <Skeleton />
            </div>
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
        <div>
            <h2>Full Menu</h2>

            <input
                className="menu-search"
                type="search"
                placeholder="Search dishes..."
                value={search}
                onChange={function (event) {
                    setSearch(
                        event.target.value
                    );
                }}
            />

            <CategoryBar
                selected={category}
                onSelect={
                    handleCategoryChange
                }
            />

            {shownDishes.length === 0 ? (
                <p className="status">
                    No dishes found.
                </p>
            ) : (
                <DishList
                    dishes={shownDishes}
                    onAdd={handleAdd}
                />
            )}
        </div>
    );
}

export default Menu;