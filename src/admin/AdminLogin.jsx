import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        setError("");

        if (
            username === "admin" &&
            password === "admin123"
        ) {
            sessionStorage.setItem(
                "addis-eats-admin",
                JSON.stringify({
                    username: "admin"
                })
            );

            navigate("/admin");
            return;
        }

        setError(
            "Invalid username or password."
        );
    }

    return (
        <section className="admin-login">
            <div className="admin-login-card">
                <h2>Admin Login</h2>

                <p>
                    Sign in to manage Addis Eats.
                </p>

                <form
                    onSubmit={handleSubmit}
                >
                    <label>
                        Username
                        <input
                            type="text"
                            value={username}
                            onChange={
                                function (event) {
                                    setUsername(
                                        event.target.value
                                    );
                                }
                            }
                            required
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={
                                function (event) {
                                    setPassword(
                                        event.target.value
                                    );
                                }
                            }
                            required
                        />
                    </label>

                    {error && (
                        <p className="error">
                            {error}
                        </p>
                    )}

                    <button type="submit">
                        Sign In
                    </button>
                </form>
            </div>
        </section>
    );
}

export default AdminLogin;