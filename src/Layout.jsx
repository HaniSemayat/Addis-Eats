import {
    NavLink,
    Outlet,
    useNavigate
} from "react-router-dom";

import CartBadge from "./cart/CartBadge";
import ThemeToggle from "./theme/ThemeToggle";
import useAuth from "./auth/useAuth";

function Layout() {
    const {
        user,
        logout
    } = useAuth();

    const navigate = useNavigate();

    const userInitial =
        user?.name?.trim().charAt(0).toUpperCase();

    function handleLogout() {
        logout();

        navigate("/");
    }

    return (
        <>
            <a
                className="skip-link"
                href="#main-content"
            >
                Skip to main content
            </a>

            <header className="site-header">
                <div className="header-inner">
                    <div className="brand">
                        <NavLink
                            to="/"
                            className="brand-link"
                            aria-label="Addis Eats home"
                        >
                            <span className="brand-name">
                                Addis Eats
                            </span>
                        </NavLink>
                    </div>

                    <nav
                        className="main-nav"
                        aria-label="Main navigation"
                    >
                        <NavLink
                            to="/"
                            end
                        >
                            Home
                        </NavLink>

                        <NavLink to="/menu">
                            Menu
                        </NavLink>

                        <NavLink to="/favorites">
                            Favorites
                        </NavLink>

                        <NavLink to="/orders">
                            Orders
                        </NavLink>

                        <NavLink to="/checkout">
                            Checkout
                        </NavLink>
                    </nav>

                    <div className="header-actions">
                        <ThemeToggle />

                        <CartBadge />

                        {user ? (
                            <div className="user-menu">
                                <div
                                    className="user-profile"
                                    aria-label={`Signed in as ${user.name}`}
                                >
                                    <span className="user-avatar">
                                        {userInitial}
                                    </span>

                                    <span className="user-greeting">
                                        {user.name}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className="logout-button"
                                    onClick={handleLogout}
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <NavLink
                                to="/register"
                                className="login-link"
                            >
                                Sign Up
                            </NavLink>
                        )}
                    </div>
                </div>
            </header>

            <main id="main-content">
                <Outlet />
            </main>

            <footer className="site-footer">
                <div className="footer-inner">
                    <div className="footer-brand">
                        <h2>Addis Eats</h2>

                        <p>
                            Delicious food from
                            Addis Ababa.
                        </p>

                        <p>
                            Addis Ababa, Ethiopia
                        </p>
                    </div>

                    <div className="footer-column">
                        <h3>Explore</h3>

                        <NavLink
                            to="/"
                            end
                        >
                            Home
                        </NavLink>

                        <NavLink to="/menu">
                            Menu
                        </NavLink>

                        <NavLink to="/favorites">
                            Favorites
                        </NavLink>

                        <NavLink to="/orders">
                            Orders
                        </NavLink>
                    </div>

                    <div className="footer-column">
                        <h3>Your Order</h3>

                        <NavLink to="/cart">
                            Cart
                        </NavLink>

                        <NavLink to="/checkout">
                            Checkout
                        </NavLink>
                    </div>

                    <div className="footer-column">
                        <h3>Management</h3>

                        <NavLink to="/admin">
                            Admin Panel
                        </NavLink>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        © 2026 Addis Eats. All
                        rights reserved.
                    </p>

                    <p>
                        Built as a React food
                        ordering project.
                    </p>
                </div>
            </footer>
        </>
    );
}

export default Layout;
