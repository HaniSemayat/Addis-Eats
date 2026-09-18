import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
    persist(
        (set) => ({
            items: [],

            addItem: (dish) =>
                set((state) => {
                    const existingItem =
                        state.items.find(
                            function (item) {
                                return (
                                    item.id ===
                                    dish.id
                                );
                            }
                        );

                    if (existingItem) {
                        return {
                            items: state.items.map(
                                function (item) {
                                    if (
                                        item.id ===
                                        dish.id
                                    ) {
                                        return {
                                            ...item,
                                            quantity:
                                                (item.quantity ??
                                                    1) + 1
                                        };
                                    }

                                    return item;
                                }
                            )
                        };
                    }

                    return {
                        items: [
                            ...state.items,
                            {
                                ...dish,
                                quantity: 1
                            }
                        ]
                    };
                }),

            increaseQuantity: (id) =>
                set((state) => ({
                    items: state.items.map(
                        function (item) {
                            if (item.id === id) {
                                return {
                                    ...item,
                                    quantity:
                                        (item.quantity ??
                                            1) + 1
                                };
                            }

                            return item;
                        }
                    )
                })),

            decreaseQuantity: (id) =>
                set((state) => ({
                    items: state.items
                        .map(function (item) {
                            if (item.id === id) {
                                return {
                                    ...item,
                                    quantity:
                                        (item.quantity ??
                                            1) - 1
                                };
                            }

                            return item;
                        })
                        .filter(function (item) {
                            return item.quantity > 0;
                        })
                })),

            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter(
                        function (item) {
                            return item.id !== id;
                        }
                    )
                })),

            clear: () =>
                set({ items: [] })
        }),
        {
            name: "addis-eats-cart"
        }
    )
);