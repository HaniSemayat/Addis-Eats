import { Link } from "react-router-dom";

import { useCartStore } from "./cartStore";

import formatCurrency from "../utils/formatCurrency";

function Cart() {
    const items = useCartStore(
        (state) => state.items
    );

    const increaseQuantity = useCartStore(
        (state) => state.increaseQuantity
    );

    const decreaseQuantity = useCartStore(
        (state) => state.decreaseQuantity
    );

    const removeItem = useCartStore(
        (state) => state.removeItem
    );

    const clear = useCartStore(
        (state) => state.clear
    );

    const subtotal = items.reduce(
        function (sum, item) {
            return (
                sum +
                item.price *
                    (item.quantity ?? 1)
            );
        },
        0
    );

    const deliveryFee =
        items.length === 0
            ? 0
            : subtotal >= 1000
                ? 0
                : 100;

    const total =
        subtotal + deliveryFee;

    const estimatedTime =
        subtotal >= 1000
            ? "25–35 min"
            : "30–40 min";

    return (
        <section className="checkout cart-page">
            <div className="cart-heading">
                <div>
                    <p className="section-eyebrow">
                        Your selection
                    </p>

                    <h2>Your Cart</h2>
                </div>

                {items.length > 0 && (
                    <span className="cart-item-count">
                        {items.length}{" "}
                        {items.length === 1
                            ? "item"
                            : "items"}
                    </span>
                )}
            </div>

            {items.length === 0 ? (
                <div className="cart-empty">
                    <div className="cart-empty-icon">
                        🛒
                    </div>

                    <h3>
                        Your cart is empty
                    </h3>

                    <p>
                        Add something delicious
                        from our menu.
                    </p>

                    <Link
                        className="cart-primary-link"
                        to="/menu"
                    >
                        Browse Menu
                    </Link>
                </div>
            ) : (
                <>
                    <ul className="cart-items">
                        {items.map(function (
                            item
                        ) {
                            const quantity =
                                item.quantity ??
                                1;

                            const itemTotal =
                                item.price *
                                quantity;

                            return (
                                <li
                                    className="cart-item"
                                    key={item.id}
                                >
                                    <div className="cart-item-info">
                                        <strong>
                                            {
                                                item.name
                                            }
                                        </strong>

                                        <p>
                                            {formatCurrency(
                                                item.price
                                            )}{" "}
                                            each
                                        </p>

                                        <p className="cart-item-subtotal">
                                            Subtotal:{" "}
                                            {formatCurrency(
                                                itemTotal
                                            )}
                                        </p>
                                    </div>

                                    <div className="cart-item-actions">
                                        <div
                                            className="quantity-control"
                                            aria-label={`Quantity controls for ${item.name}`}
                                        >
                                            <button
                                                type="button"
                                                className="quantity-button"
                                                onClick={function () {
                                                    decreaseQuantity(
                                                        item.id
                                                    );
                                                }}
                                                aria-label={`Decrease ${item.name} quantity`}
                                            >
                                                −
                                            </button>

                                            <span
                                                className="quantity-value"
                                                aria-label={`${quantity} ${item.name} in cart`}
                                            >
                                                {
                                                    quantity
                                                }
                                            </span>

                                            <button
                                                type="button"
                                                className="quantity-button"
                                                onClick={function () {
                                                    increaseQuantity(
                                                        item.id
                                                    );
                                                }}
                                                aria-label={`Increase ${item.name} quantity`}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            className="remove-cart-button"
                                            onClick={function () {
                                                removeItem(
                                                    item.id
                                                );
                                            }}
                                            aria-label={`Remove ${item.name} from cart`}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="cart-summary">
                        <div className="cart-summary-row">
                            <span>
                                Subtotal
                            </span>

                            <strong>
                                {formatCurrency(
                                    subtotal
                                )}
                            </strong>
                        </div>

                        <div className="cart-summary-row">
                            <span>
                                Delivery
                            </span>

                            <strong>
                                {deliveryFee ===
                                0
                                    ? "Free"
                                    : formatCurrency(
                                        deliveryFee
                                    )}
                            </strong>
                        </div>

                        <div className="cart-summary-row">
                            <span>
                                Estimated delivery
                            </span>

                            <strong>
                                {estimatedTime}
                            </strong>
                        </div>

                        <div className="cart-total-row">
                            <span>Total</span>

                            <strong>
                                {formatCurrency(
                                    total
                                )}
                            </strong>
                        </div>
                    </div>

                    <div className="cart-footer-actions">
                        <button
                            type="button"
                            className="clear-cart-button"
                            onClick={clear}
                        >
                            Clear Cart
                        </button>

                        <Link
                            className="checkout-cart-button"
                            to="/checkout"
                        >
                            Proceed to Checkout →
                        </Link>
                    </div>
                </>
            )}
        </section>
    );
}

export default Cart;
