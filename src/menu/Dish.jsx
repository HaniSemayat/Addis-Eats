import PropTypes from "prop-types";
import formatCurrency from "../utils/formatCurrency";

const TEST_MENU_ERROR = false;

function Dish({
    name,
    amharicName,
    price,
    spicy = false,
    image,
    onAdd
}) {
    if (TEST_MENU_ERROR && name === "Doro Wot") {
        throw new Error(
            "Deliberate menu error for testing ErrorBoundary."
        );
    }

    return (
        <div className="dish">
            <img
                src={image}
                alt={name}
            />

            <h3>
                {name}{" "}
                {spicy && <span>• Spicy</span>}
            </h3>

            {amharicName && (
                <p className="dish-amharic">
                    {amharicName}
                </p>
            )}

            <p>
                {formatCurrency(price)}
            </p>

            <button
                type="button"
                className="add-to-cart-button"
                onClick={onAdd}
            >
                Add to Cart
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
    onAdd: PropTypes.func.isRequired
};

export default Dish;