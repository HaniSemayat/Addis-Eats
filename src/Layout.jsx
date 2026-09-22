import {
    NavLink,
    Outlet
} from "react-router-dom";

import CartBadge from "./cart/CartBadge";
import ThemeToggle from "./theme/ThemeToggle";

function Layout() {
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
                            <span className="brand-icon">
                                🍴
                            </span>

                            <span>
                                <strong>
                                    Addis Eats
                                </strong>

                                <small>
                                    Delicious food from Addis Ababa
                                </small>
                            </span>
                        </NavLink>
                    </div>

                    <nav
                        className="main-nav"
                        aria-label="Main navigation"
                    >
                        <NavLink to="/">
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
                    </div>
                </div>
            </header>

            <main id="main-content">
                <Outlet />
            </main>

            <footer>
                <p>Addis Eats</p>
            </footer>
        </>
    );
}

export default Layout;