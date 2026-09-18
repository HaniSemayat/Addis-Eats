import { Link } from "react-router-dom";
import { useCartStore } from "./cartStore";

function CartBadge() {
    const itemCount = useCartStore(
        (state) =>
            state.items.reduce(
                function (total, item) {
                    return (
                        total +
                        (item.quantity ?? 1)
                    );
                },
                0
            )
    );

    return (
        <Link
            to="/cart"
            className="cart-icon"
            aria-label={`Cart with ${itemCount} items`}
        >
            <svg
                viewBox="0 0 32 32"
                aria-hidden="true"
                focusable="false"
            >
                <path
                    d="M5 7h3l2.4 12.1a2.5 2.5 0 0 0 2.5 2h9.6a2.5 2.5 0 0 0 2.4-1.8L28 11H9"
                />

                <circle
                    cx="13"
                    cy="26"
                    r="1.8"
                />

                <circle
                    cx="24"
                    cy="26"
                    r="1.8"
                />
            </svg>

            {itemCount > 0 && (
                <span className="cart-count">
                    {itemCount}
                </span>
            )}
        </Link>
    );
}

export default CartBadge;