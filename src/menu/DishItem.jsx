import {
    memo,
    useCallback
} from "react";

import { Link } from "react-router-dom";

import Dish from "./Dish";
import Card from "../ui/Card";
import { useFavoriteStore } from "../favorites/favoriteStore";

function DishItem({
    dish,
    onAdd,
    onQuickView
}) {
    const isFavorite = useFavoriteStore(
        (state) =>
            state.favoriteIds.includes(
                dish.id
            )
    );

    const toggleFavorite =
        useFavoriteStore(
            (state) => state.toggleFavorite
        );

    const handleAdd = useCallback(
        function () {
            onAdd(dish);
        },
        [dish, onAdd]
    );

    const handleQuickView =
        useCallback(
            function () {
                onQuickView(dish);
            },
            [dish, onQuickView]
        );

    function handleFavorite() {
        toggleFavorite(dish.id);
    }

    return (
        <Card>
            <Dish
                name={dish.name}
                amharicName={
                    dish.amharicName
                }
                price={dish.price}
                spicy={dish.spicy}
                image={dish.image}
                onAdd={handleAdd}
            />

            <button
                type="button"
                className={
                    isFavorite
                        ? "favorite-button active"
                        : "favorite-button"
                }
                onClick={
                    handleFavorite
                }
                aria-label={
                    isFavorite
                        ? `Remove ${dish.name} from favorites`
                        : `Add ${dish.name} to favorites`
                }
            >
                {isFavorite
                    ? "♥"
                    : "♡"}
            </button>

            <button
                type="button"
                onClick={handleQuickView}
            >
                Quick View
            </button>

            <Link
                to={`/menu/${dish.id}`}
            >
                View Details
            </Link>
        </Card>
    );
}

export default memo(DishItem);