import {
    NavLink,
    Outlet
} from "react-router-dom";

import CartBadge from "./cart/CartBadge";
import ThemeToggle from "./theme/ThemeToggle";

function Layout() {
    return (
        <>
            <header className="site-header">
                <div className="header-inner">
                    <div className="brand">
                        <NavLink
                            to="/"
                            className="brand-link"
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

                    <nav className="main-nav">
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

            <main>
                <Outlet />
            </main>

            <footer>
                <p>Addis Eats</p>
            </footer>
        </>
    );
}

export default Layout;