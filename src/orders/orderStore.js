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
                            id: `ORDER-${Date.now()}`
                        },
                        ...state.orders
                    ]
                }))
        }),
        {
            name: "addis-eats-orders"
        }
    )
);