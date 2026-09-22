import {
    NavLink,
    Outlet,
    useNavigate
} from "react-router-dom";

import useAdminAuth from "./useAdminAuth";

function AdminLayout() {
    const { admin, logout } =
        useAdminAuth();

    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/admin/login");
    }

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <h2>Addis Eats</h2>

                    <p>Admin Panel</p>
                </div>

                <nav
                    className="admin-nav"
                    aria-label="Admin navigation"
                >
                    <NavLink to="/admin">
                        Dashboard
                    </NavLink>

                    <NavLink to="/admin/menu">
                        Menu
                    </NavLink>

                    <NavLink to="/admin/orders">
                        Orders
                    </NavLink>
                </nav>

                <div className="admin-sidebar-footer">
                    <p>
                        Signed in as{" "}
                        <strong>
                            {admin?.username}
                        </strong>
                    </p>

                    <button
                        type="button"
                        onClick={
                            handleLogout
                        }
                    >
                        Logout
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;