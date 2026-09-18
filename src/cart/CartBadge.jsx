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
        <div className="cart-badge">
            Cart: {itemCount}
        </div>
    );
}

export default CartBadge;