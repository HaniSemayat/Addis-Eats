import { Link } from "react-router-dom";
import { useCartStore } from "./cartStore";

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

    const total = items.reduce(
        function (sum, item) {
            return (
                sum +
                item.price *
                    (item.quantity ?? 1)
            );
        },
        0
    );

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
                                            {item.price}{" "}
                                            ETB each
                                        </p>

                                        <p>
                                            Subtotal:{" "}
                                            {itemTotal}{" "}
                                            ETB
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

                    <h3>
                        Total: {total} ETB
                    </h3>

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