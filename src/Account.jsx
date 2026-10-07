import { useNavigate } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import useAuth from "./auth/useAuth";

function AccountContent() {
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
        <section className="account-page">
            <div className="account-card">
                <div className="account-header">
                    <span className="account-avatar">
                        {userInitial}
                    </span>

                    <div>
                        <p className="account-eyebrow">
                            My Account
                        </p>

                        <h2>
                            {user.name}
                        </h2>

                        <p>
                            {user.email}
                        </p>
                    </div>
                </div>

                <div className="account-details">
                    <div className="account-detail">
                        <span>Name</span>
                        <strong>
                            {user.name}
                        </strong>
                    </div>

                    <div className="account-detail">
                        <span>Email</span>
                        <strong>
                            {user.email}
                        </strong>
                    </div>
                </div>

                <div className="account-actions">
                    <button
                        type="button"
                        onClick={handleLogout}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </section>
    );
}

function Account() {
    return (
        <RequireAuth>
            <AccountContent />
        </RequireAuth>
    );
}

export default Account;
