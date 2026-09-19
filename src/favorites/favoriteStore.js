import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoriteStore = create(
    persist(
        (set) => ({
            favoriteIds: [],

            toggleFavorite: (id) =>
                set((state) => {
                    const isFavorite =
                        state.favoriteIds.includes(
                            id
                        );

                    if (isFavorite) {
                        return {
                            favoriteIds:
                                state.favoriteIds.filter(
                                    function (
                                        favoriteId
                                    ) {
                                        return (
                                            favoriteId !==
                                            id
                                        );
                                    }
                                )
                        };
                    }

                    return {
                        favoriteIds: [
                            ...state.favoriteIds,
                            id
                        ]
                    };
                })
        }),
        {
            name: "addis-eats-favorites"
        }
    )
);