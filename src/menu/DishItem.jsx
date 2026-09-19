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
            <div className="dish-card-content">
                <div className="dish-image-area">
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
                        title={
                            isFavorite
                                ? "Remove from favorites"
                                : "Add to favorites"
                        }
                    >
                        {isFavorite
                            ? "♥"
                            : "♡"}
                    </button>
                </div>

                <div className="dish-secondary-actions">
                    <button
                        type="button"
                        className="quick-view-button"
                        onClick={handleQuickView}
                    >
                        Quick View
                    </button>

                    <Link
                        className="details-link"
                        to={`/menu/${dish.id}`}
                    >
                        Details →
                    </Link>
                </div>
            </div>
        </Card>
    );
}

export default memo(DishItem);