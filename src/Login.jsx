import { useState } from "react";
import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";
import useAuth from "./auth/useAuth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const from =
        location.state?.from?.pathname ?? "/menu";

    function handleSubmit(event) {
        event.preventDefault();

        setError("");

        const result = login(
            email.trim(),
            password
        );

        if (!result.success) {
            setError(result.message);
            return;
        }

        navigate(from, {
            replace: true
        });
    }

    return (
        <section className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <span className="auth-icon">
                        👋
                    </span>

                    <h2>Welcome Back</h2>

                    <p>
                        Sign in to continue to Addis Eats.
                    </p>
                </div>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >
                    <label>
                        Email

                        <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                        />
                    </label>

                    <label>
                        Password

                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            placeholder="Your password"
                            autoComplete="current-password"
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

                <p className="auth-switch">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Create Account
                    </Link>
                </p>
            </div>
        </section>
    );
}

export default Login;
