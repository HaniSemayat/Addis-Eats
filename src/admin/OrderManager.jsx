import { useState } from "react";

import { useOrderStore } from "../orders/orderStore";
import formatCurrency from "../utils/formatCurrency";

function OrderManager() {
    const orders = useOrderStore(
        (state) => state.orders
    );

    const updateOrderStatus =
        useOrderStore(
            (state) =>
                state.updateOrderStatus
        );

    const deleteOrder =
        useOrderStore(
            (state) =>
                state.deleteOrder
        );

    const [selectedOrder, setSelectedOrder] =
        useState(null);

    function handleStatusChange(
        id,
        status
    ) {
        updateOrderStatus(
            id,
            status
        );

        if (
            selectedOrder &&
            selectedOrder.id === id
        ) {
            setSelectedOrder(
                function (current) {
                    return {
                        ...current,
                        status: status
                    };
                }
            );
        }
    }

    function handleDelete(order) {
        const confirmed =
            window.confirm(
                `Delete ${order.id}?`
            );

        if (!confirmed) {
            return;
        }

        deleteOrder(order.id);

        if (
            selectedOrder &&
            selectedOrder.id === order.id
        ) {
            setSelectedOrder(null);
        }
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

    if (orders.length === 0) {
        return (
            <section className="admin-orders">
                <div className="admin-page-heading">
                    <div>
                        <h1>
                            Order Manager
                        </h1>

                        <p>
                            Manage customer orders
                            and delivery status.
                        </p>
                    </div>
                </div>

                <div className="empty-state">
                    <p>
                        No orders have been
                        placed yet.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="admin-orders">
            <div className="admin-page-heading">
                <div>
                    <h1>
                        Order Manager
                    </h1>

                    <p>
                        Manage customer orders
                        and delivery status.
                    </p>
                </div>

                <strong>
                    {orders.length}{" "}
                    order
                    {orders.length !== 1
                        ? "s"
                        : ""}
                </strong>
            </div>

            <div className="admin-order-list">
                {orders.map(function (order) {
                    const status =
                        order.status ||
                        "pending";

                    return (
                        <article
                            className="admin-order-card"
                            key={order.id}
                        >
                            <div className="admin-order-main">
                                <div>
                                    <h2>
                                        {order.id}
                                    </h2>

                                    <p>
                                        {order.date}
                                    </p>

                                    <strong>
                                        {formatCurrency(
                                            order.total
                                        )}
                                    </strong>
                                </div>

                                <span
                                    className={`order-status order-status-${status}`}
                                >
                                    {getStatusLabel(
                                        status
                                    )}
                                </span>
                            </div>

                            <div className="admin-order-meta">
                                <span>
                                    {
                                        order.items
                                            .length
                                    }{" "}
                                    item
                                    {order.items
                                        .length !==
                                    1
                                        ? "s"
                                        : ""}
                                </span>

                                <span>
                                    Subtotal:{" "}
                                    {formatCurrency(
                                        order.subtotal
                                    )}
                                </span>

                                <span>
                                    Delivery:{" "}
                                    {formatCurrency(
                                        order.deliveryFee
                                    )}
                                </span>
                            </div>

                            <div className="admin-order-actions">
                                <select
                                    value={status}
                                    onChange={function (
                                        event
                                    ) {
                                        handleStatusChange(
                                            order.id,
                                            event.target.value
                                        );
                                    }}
                                    aria-label={`Update status for ${order.id}`}
                                >
                                    <option value="pending">
                                        Pending
                                    </option>

                                    <option value="preparing">
                                        Preparing
                                    </option>

                                    <option value="delivering">
                                        Delivering
                                    </option>

                                    <option value="delivered">
                                        Delivered
                                    </option>
                                </select>

                                <button
                                    type="button"
                                    onClick={function () {
                                        setSelectedOrder(
                                            order
                                        );
                                    }}
                                >
                                    Details
                                </button>

                                <button
                                    type="button"
                                    onClick={function () {
                                        handleDelete(
                                            order
                                        );
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>

            {selectedOrder && (
                <div
                    className="admin-order-modal-backdrop"
                    onClick={function () {
                        setSelectedOrder(null);
                    }}
                >
                    <section
                        className="admin-order-modal"
                        onClick={function (event) {
                            event.stopPropagation();
                        }}
                    >
                        <div className="admin-order-modal-header">
                            <div>
                                <h2>
                                    {
                                        selectedOrder.id
                                    }
                                </h2>

                                <p>
                                    {
                                        selectedOrder.date
                                    }
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={function () {
                                    setSelectedOrder(
                                        null
                                    );
                                }}
                                aria-label="Close order details"
                            >
                                ×
                            </button>
                        </div>

                        <div className="admin-order-detail-status">
                            <span>
                                Status
                            </span>

                            <strong
                                className={`order-status order-status-${
                                    selectedOrder.status ||
                                    "pending"
                                }`}
                            >
                                {getStatusLabel(
                                    selectedOrder.status ||
                                        "pending"
                                )}
                            </strong>
                        </div>

                        {selectedOrder.estimatedDeliveryTime && (
                            <p className="delivery-estimate">
                                <strong>
                                    Estimated Delivery:
                                </strong>{" "}
                                {
                                    selectedOrder.estimatedDeliveryTime
                                }
                            </p>
                        )}

                        <div className="admin-order-customer">
                            <h3>
                                Customer
                            </h3>

                            <p>
                                <strong>
                                    Name:
                                </strong>{" "}
                                {selectedOrder.name ||
                                    "—"}
                            </p>

                            <p>
                                <strong>
                                    Phone:
                                </strong>{" "}
                                {selectedOrder.phone ||
                                    "—"}
                            </p>

                            <p>
                                <strong>
                                    Area:
                                </strong>{" "}
                                {selectedOrder.area ||
                                    "—"}
                            </p>

                            <p>
                                <strong>
                                    Notes:
                                </strong>{" "}
                                {selectedOrder.notes ||
                                    "—"}
                            </p>
                        </div>

                        <h3>
                            Order Items
                        </h3>

                        <ul className="admin-order-items">
                            {selectedOrder.items.map(
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

                                            <strong>
                                                {formatCurrency(
                                                    item.price *
                                                        (item.quantity ??
                                                            1)
                                                )}
                                            </strong>
                                        </li>
                                    );
                                }
                            )}
                        </ul>

                        <div className="admin-order-total">
                            <p>
                                Subtotal
                                <strong>
                                    {formatCurrency(
                                        selectedOrder.subtotal
                                    )}
                                </strong>
                            </p>

                            <p>
                                Delivery Fee
                                <strong>
                                    {formatCurrency(
                                        selectedOrder.deliveryFee
                                    )}
                                </strong>
                            </p>

                            <p>
                                Total
                                <strong>
                                    {formatCurrency(
                                        selectedOrder.total
                                    )}
                                </strong>
                            </p>
                        </div>
                    </section>
                </div>
            )}
        </section>
    );
}

export default OrderManager;