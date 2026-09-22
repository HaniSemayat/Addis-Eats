import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOrderStore = create(
    persist(
        (set) => ({
            orders: [],

            addOrder: (order) =>
                set((state) => ({
                    orders: [
                        {
                            ...order,
                            id: `ORDER-${Date.now()}`,
                            status:
                                order.status ??
                                "pending"
                        },
                        ...state.orders
                    ]
                })),

            updateOrderStatus: (
                id,
                status
            ) =>
                set((state) => ({
                    orders: state.orders.map(
                        function (order) {
                            if (
                                order.id === id
                            ) {
                                return {
                                    ...order,
                                    status: status
                                };
                            }

                            return order;
                        }
                    )
                })),

            deleteOrder: (id) =>
                set((state) => ({
                    orders: state.orders.filter(
                        function (order) {
                            return (
                                order.id !== id
                            );
                        }
                    )
                }))
        }),
        {
            name: "addis-eats-orders"
        }
    )
);