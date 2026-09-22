import { useMemo } from "react";

import { useOrderStore } from "../orders/orderStore";

import formatCurrency from "../utils/formatCurrency";

function Dashboard() {
    const orders = useOrderStore(
        (state) => state.orders
    );

    const analytics = useMemo(
        function () {
            const orderCount = orders.length;

            const revenue = orders.reduce(
                function (sum, order) {
                    return sum + (order.total ?? 0);
                },
                0
            );

            const averageOrderValue =
                orderCount === 0
                    ? 0
                    : revenue / orderCount;

            const dishSales = {};

            orders.forEach(function (order) {
                order.items.forEach(function (item) {
                    const quantity =
                        item.quantity ?? 1;

                    if (!dishSales[item.name]) {
                        dishSales[item.name] = 0;
                    }

                    dishSales[item.name] += quantity;
                });
            });

            const topSellingDishes =
                Object.entries(dishSales)
                    .sort(function (a, b) {
                        return b[1] - a[1];
                    })
                    .slice(0, 5);

            const statusCounts = {
                pending: 0,
                preparing: 0,
                delivering: 0,
                delivered: 0
            };

            orders.forEach(function (order) {
                const status =
                    order.status || "pending";

                if (statusCounts[status] !== undefined) {
                    statusCounts[status] += 1;
                }
            });

            return {
                orderCount,
                revenue,
                averageOrderValue,
                topSellingDishes,
                statusCounts
            };
        },
        [orders]
    );

    return (
        <section className="admin-dashboard">
            <div className="admin-page-heading">
                <div>
                    <h1>Dashboard</h1>
                    <p>
                        Overview of Addis Eats orders
                        and sales.
                    </p>
                </div>
            </div>

            <div className="admin-stats">
                <article className="admin-stat-card">
                    <span>Revenue</span>
                    <strong>
                        {formatCurrency(
                            analytics.revenue
                        )}
                    </strong>
                </article>

                <article className="admin-stat-card">
                    <span>Orders</span>
                    <strong>
                        {analytics.orderCount}
                    </strong>
                </article>

                <article className="admin-stat-card">
                    <span>Average Order</span>
                    <strong>
                        {formatCurrency(
                            analytics.averageOrderValue
                        )}
                    </strong>
                </article>
            </div>

            <div className="admin-dashboard-grid">
                <section className="admin-panel">
                    <h2>Top Selling Dishes</h2>

                    {analytics.topSellingDishes.length ===
                    0 ? (
                        <p className="status">
                            No sales data yet.
                        </p>
                    ) : (
                        <ol className="admin-ranking-list">
                            {analytics.topSellingDishes.map(
                                function (dish) {
                                    return (
                                        <li
                                            key={dish[0]}
                                        >
                                            <span>
                                                {dish[0]}
                                            </span>

                                            <strong>
                                                {dish[1]} sold
                                            </strong>
                                        </li>
                                    );
                                }
                            )}
                        </ol>
                    )}
                </section>

                <section className="admin-panel">
                    <h2>Order Status</h2>

                    <ul className="admin-status-list">
                        <li>
                            <span>Pending</span>
                            <strong>
                                {
                                    analytics
                                        .statusCounts
                                        .pending
                                }
                            </strong>
                        </li>

                        <li>
                            <span>Preparing</span>
                            <strong>
                                {
                                    analytics
                                        .statusCounts
                                        .preparing
                                }
                            </strong>
                        </li>

                        <li>
                            <span>Delivering</span>
                            <strong>
                                {
                                    analytics
                                        .statusCounts
                                        .delivering
                                }
                            </strong>
                        </li>

                        <li>
                            <span>Delivered</span>
                            <strong>
                                {
                                    analytics
                                        .statusCounts
                                        .delivered
                                }
                            </strong>
                        </li>
                    </ul>
                </section>
            </div>
        </section>
    );
}

export default Dashboard;

