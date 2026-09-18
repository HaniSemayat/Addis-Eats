import {
    useMemo,
    useState
} from "react";

import { useSearchParams } from "react-router-dom";

import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import useFetch from "../hooks/useFetch";
import { useCartStore } from "../cart/cartStore";

function Menu() {
    const [searchParams, setSearchParams] =
        useSearchParams();

    const [search, setSearch] = useState("");

    const category =
        searchParams.get("category") || "All";

    const { data, loading, error } =
        useFetch("/dishes.json");

    const addItem = useCartStore(
        (state) => state.addItem
    );

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
            let dishes = data ?? [];

            if (category !== "All") {
                dishes = dishes.filter(
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
                dishes = dishes.filter(
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

            return dishes;
        },
        [data, category, search]
    );

    function handleAdd(dish) {
        addItem(dish);
    }

    if (loading) {
        return (
            <p className="status">
                Loading the menu...
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