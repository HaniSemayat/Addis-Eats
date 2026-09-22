import {
    Link,
    useNavigate
} from "react-router-dom";

import { useOrderStore } from "./orderStore";
import { useCartStore } from "../cart/cartStore";

import formatCurrency from "../utils/formatCurrency";

function Orders() {
    const orders = useOrderStore(
        (state) => state.orders
    );

    const addItem = useCartStore(
        (state) => state.addItem
    );

    const navigate = useNavigate();

    function handleReorder(order) {
        order.items.forEach(function (item) {
            const quantity =
                item.quantity ?? 1;

            for (
                let i = 0;
                i < quantity;
                i++
            ) {
                addItem(item);
            }
        });

        navigate("/cart");
    }

    function getStatusLabel(status) {
        const labels = {
            pending: "Pending",
            preparing: "Preparing",
            delivering: "Delivering",
            delivered: "Delivered"
        };

        return (
            labels[status] ||
            "Pending"
        );
    }

    return (
        <section className="orders-page">
            <div className="page-heading">
                <div>
                    <h2>
                        Order History
                    </h2>

                    <p>
                        Your previous Addis Eats orders.
                    </p>
                </div>

                <Link to="/menu">
                    Browse Menu
                </Link>
            </div>

            {orders.length === 0 ? (
                <div className="empty-state">
                    <p>
                        You haven't placed
                        an order yet.
                    </p>

                    <Link to="/menu">
                        Explore the menu
                    </Link>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map(function (
                        order
                    ) {
                        const status =
                            order.status ||
                            "pending";

                        return (
                            <article
                                className="order-card"
                                key={order.id}
                            >
                                <div className="order-card-header">
                                    <div>
                                        <strong>
                                            {order.id}
                                        </strong>

                                        <p>
                                            {order.date}
                                        </p>
                                    </div>

                                    <div className="order-header-right">
                                        <strong>
                                            {formatCurrency(
                                                order.total
                                            )}
                                        </strong>

                                        <span
                                            className={`order-status order-status-${status}`}
                                        >
                                            {getStatusLabel(
                                                status
                                            )}
                                        </span>
                                    </div>
                                </div>

                                {order.estimatedDeliveryTime && (
                                    <p className="delivery-estimate">
                                        Estimated delivery:{" "}
                                        <strong>
                                            {
                                                order.estimatedDeliveryTime
                                            }
                                        </strong>
                                    </p>
                                )}

                                <ul className="order-items">
                                    {order.items.map(
                                        function (
                                            item
                                        ) {
                                            return (
                                                <li
                                                    key={
                                                        item.id
                                                    }
                                                >
                                                    <span>
                                                        {
                                                            item.name
                                                        }
                                                    </span>

                                                    <span>
                                                        ×{" "}
                                                        {item.quantity ??
                                                            1}
                                                    </span>
                                                </li>
                                            );
                                        }
                                    )}
                                </ul>

                                <div className="order-card-footer">
                                    <span>
                                        {
                                            order
                                                .items
                                                .length
                                        }{" "}
                                        item
                                        {order
                                            .items
                                            .length !==
                                        1
                                            ? "s"
                                            : ""}
                                    </span>

                                    <button
                                        type="button"
                                        className="reorder-button"
                                        onClick={function () {
                                            handleReorder(
                                                order
                                            );
                                        }}
                                    >
                                        Reorder
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

export default Orders;