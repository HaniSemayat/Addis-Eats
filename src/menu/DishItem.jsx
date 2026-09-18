import {
    memo,
    useCallback
} from "react";

import { Link } from "react-router-dom";

import Dish from "./Dish";
import Card from "../ui/Card";

function DishItem({
    dish,
    onAdd,
    onQuickView
}) {
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