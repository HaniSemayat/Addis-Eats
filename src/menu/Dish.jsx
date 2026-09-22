import {
    useEffect,
    useState
} from "react";

import PropTypes from "prop-types";

import formatCurrency from "../utils/formatCurrency";

const TEST_MENU_ERROR = false;

function Dish({
    name,
    amharicName,
    price,
    spicy = false,
    image,
    onAdd,
    available = true
}) {
    const [added, setAdded] =
        useState(false);

    useEffect(
        function () {
            if (!added) {
                return;
            }

            const timer =
                setTimeout(function () {
                    setAdded(false);
                }, 1500);

            return function () {
                clearTimeout(timer);
            };
        },
        [added]
    );

    if (
        TEST_MENU_ERROR &&
        name === "Doro Wot"
    ) {
        throw new Error(
            "Deliberate menu error for testing ErrorBoundary."
        );
    }

    function handleAdd() {
        if (!available) {
            return;
        }

        onAdd();

        setAdded(true);
    }

    return (
        <div className="dish">
            <img
                src={image}
                alt={name}
            />

            <h3>
                {name}{" "}
                {spicy && (
                    <span>• Spicy</span>
                )}
            </h3>

            {amharicName && (
                <p className="dish-amharic">
                    {amharicName}
                </p>
            )}

            <p>
                {formatCurrency(price)}
            </p>

            {!available && (
                <p className="unavailable-message">
                    Currently unavailable
                </p>
            )}

            <button
                type="button"
                className={
                    added
                        ? "add-to-cart-button added"
                        : "add-to-cart-button"
                }
                onClick={handleAdd}
                disabled={!available}
            >
                {!available
                    ? "Unavailable"
                    : added
                        ? "✓ Added to Cart"
                        : "Add to Cart"}
            </button>
        </div>
    );
}

Dish.propTypes = {
    name: PropTypes.string.isRequired,
    amharicName: PropTypes.string,
    price: PropTypes.number.isRequired,
    spicy: PropTypes.bool,
    image: PropTypes.string.isRequired,
    onAdd: PropTypes.func.isRequired,
    available: PropTypes.bool
};

export default Dish;