import {
    useEffect,
    useState
} from "react";

import { Link } from "react-router-dom";

import formatCurrency from "./utils/formatCurrency";

function Home() {
    const [specials, setSpecials] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(false);

    useEffect(function () {
        fetch("/dishes.json")
            .then(function (response) {
                if (!response.ok) {
                    throw new Error(
                        "Failed to load dishes."
                    );
                }

                return response.json();
            })
            .then(function (data) {
                const availableSpecials =
                    data.filter(function (dish) {
                        return (
                            dish.isSpecial === true &&
                            dish.available !== false
                        );
                    });

                setSpecials(
                    availableSpecials.slice(0, 6)
                );
            })
            .catch(function () {
                setError(true);
            })
            .finally(function () {
                setLoading(false);
            });
    }, []);

    return (
        <section className="home-page">
            <section className="home-hero">
                <div>
                    <p className="home-eyebrow">
                        Welcome to Addis Eats
                    </p>

                    <h1>
                        Delicious food from
                        Addis Ababa.
                    </h1>

                    <p className="home-hero-text">
                        Enjoy Ethiopian favorites,
                        fresh drinks, and other
                        delicious meals made for
                        your day.
                    </p>

                    <Link
                        className="home-primary-link"
                        to="/menu"
                    >
                        Explore Full Menu
                    </Link>
                </div>
            </section>

            <section className="specials-section">
                <div className="section-heading">
                    <div>
                        <p className="section-eyebrow">
                            Featured today
                        </p>

                        <h2>
                            Today's Specials
                        </h2>
                    </div>

                    <Link to="/menu">
                        View Full Menu →
                    </Link>
                </div>

                {loading && (
                    <p className="status">
                        Loading today's specials...
                    </p>
                )}

                {error && (
                    <p className="error">
                        Unable to load today's
                        specials.
                    </p>
                )}

                {!loading &&
                    !error &&
                    specials.length === 0 && (
                        <p className="empty">
                            No specials available
                            right now.
                        </p>
                    )}

                {!loading &&
                    !error &&
                    specials.length > 0 && (
                        <div className="specials-grid">
                            {specials.map(
                                function (dish) {
                                    return (
                                        <article
                                            className="special-card"
                                            key={
                                                dish.id
                                            }
                                        >
                                            <div className="special-image-wrapper">
                                                <img
                                                    src={
                                                        dish.image
                                                    }
                                                    alt={
                                                        dish.name
                                                    }
                                                />

                                                <span className="special-badge">
                                                    Special
                                                </span>
                                            </div>

                                            <div className="special-content">
                                                <div>
                                                    <h3>
                                                        {
                                                            dish.name
                                                        }
                                                    </h3>

                                                    {dish.amharicName && (
                                                        <p className="dish-amharic">
                                                            {
                                                                dish.amharicName
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                <p className="special-description">
                                                    {
                                                        dish.description
                                                    }
                                                </p>

                                                <div className="special-footer">
                                                    <strong>
                                                        {formatCurrency(
                                                            dish.price
                                                        )}
                                                    </strong>

                                                    <Link
                                                        to={`/menu/${dish.id}`}
                                                    >
                                                        View Dish
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                }
                            )}
                        </div>
                    )}
            </section>
        </section>
    );
}

export default Home;