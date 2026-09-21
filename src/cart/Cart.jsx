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

    const total = subtotal + deliveryFee;

    const estimatedTime =
        subtotal >= 1000
            ? "25–35 min"
            : "30–40 min";

    return (
        <section className="checkout">
            <h2>Your Cart</h2>

            {items.length === 0 ? (
                <>
                    <p>Your cart is empty.</p>

                    <Link to="/menu">
                        Browse Menu
                    </Link>
                </>
            ) : (
                <>
                    <ul>
                        {items.map(function (item) {
                            const quantity =
                                item.quantity ?? 1;

                            const itemTotal =
                                item.price *
                                quantity;

                            return (
                                <li
                                    key={item.id}
                                >
                                    <div>
                                        <strong>
                                            {item.name}
                                        </strong>

                                        <p>
                                            {formatCurrency(
                                                item.price
                                            )}{" "}
                                            each
                                        </p>

                                        <p>
                                            Subtotal:{" "}
                                            {formatCurrency(
                                                itemTotal
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <button
                                            type="button"
                                            onClick={function () {
                                                decreaseQuantity(
                                                    item.id
                                                );
                                            }}
                                        >
                                            −
                                        </button>

                                        <span>
                                            {" "}
                                            {quantity}{" "}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={function () {
                                                increaseQuantity(
                                                    item.id
                                                );
                                            }}
                                        >
                                            +
                                        </button>

                                        <button
                                            type="button"
                                            onClick={function () {
                                                removeItem(
                                                    item.id
                                                );
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="cart-summary">
                        <p>
                            Subtotal:{" "}
                            {formatCurrency(subtotal)}
                        </p>

                        <p>
                            Delivery:{" "}
                            {deliveryFee === 0
                                ? "Free"
                                : formatCurrency(
                                    deliveryFee
                                )}
                        </p>

                        <p>
                            Estimated delivery:{" "}
                            {estimatedTime}
                        </p>

                        <h3>
                            Total:{" "}
                            {formatCurrency(total)}
                        </h3>
                    </div>

                    <button
                        type="button"
                        onClick={clear}
                    >
                        Clear Cart
                    </button>

                    <p>
                        <Link to="/checkout">
                            Proceed to Checkout
                        </Link>
                    </p>
                </>
            )}
        </section>
    );
}

export default Cart;