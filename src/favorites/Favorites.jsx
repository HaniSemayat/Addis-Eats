import { Link } from "react-router-dom";
import { useFavoriteStore } from "./favoriteStore";
import { useCartStore } from "../cart/cartStore";
import useFetch from "../hooks/useFetch";

function Favorites() {
    const {
        data,
        loading,
        error
    } = useFetch("/dishes.json");

    const favoriteIds = useFavoriteStore(
        (state) => state.favoriteIds
    );

    const toggleFavorite = useFavoriteStore(
        (state) => state.toggleFavorite
    );

    const addItem = useCartStore(
        (state) => state.addItem
    );

    if (loading) {
        return (
            <p className="status">
                Loading your favorites...
            </p>
        );
    }

    if (error) {
        return (
            <p className="error">
                {error}
            </p>
        );
    }

    const favorites = (data ?? []).filter(
        function (dish) {
            return favoriteIds.includes(dish.id);
        }
    );

    return (
        <section className="favorites-page">
            <div className="page-heading">
                <div>
                    <h2>My Favorites</h2>
                    <p>
                        Dishes you saved for later.
                    </p>
                </div>

                <Link to="/menu">
                    Browse Menu
                </Link>
            </div>

            {favorites.length === 0 ? (
                <div className="empty-state">
                    <p>
                        You haven't saved any dishes yet.
                    </p>

                    <Link to="/menu">
                        Find something delicious
                    </Link>
                </div>
            ) : (
                <div className="favorites-list">
                    {favorites.map(function (dish) {
                        return (
                            <article
                                className="favorite-card"
                                key={dish.id}
                            >
                                <img
                                    src={dish.image}
                                    alt={dish.name}
                                />

                                <div>
                                    <h3>{dish.name}</h3>

                                    {dish.amharicName && (
                                        <p className="dish-amharic">
                                            {dish.amharicName}
                                        </p>
                                    )}

                                    <p>
                                        {dish.price} ETB
                                    </p>

                                    <div className="favorite-card-actions">
                                        <button
                                            type="button"
                                            className="add-to-cart-button"
                                            onClick={function () {
                                                addItem(dish);
                                            }}
                                        >
                                            Add to Cart
                                        </button>

                                        <button
                                            type="button"
                                            className="remove-favorite-button"
                                            onClick={function () {
                                                toggleFavorite(
                                                    dish.id
                                                );
                                            }}
                                        >
                                            ♥ Remove
                                        </button>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

export default Favorites;