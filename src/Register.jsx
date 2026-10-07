import { useState } from "react";
import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";
import useAuth from "./auth/useAuth";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");
    const [error, setError] = useState("");

    const { register } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const from =
        location.state?.from?.pathname ?? "/menu";

    function handleSubmit(event) {
        event.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError(
                "Password must be at least 6 characters."
            );
            return;
        }

        const result = register(
            name.trim(),
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
                        🍽️
                    </span>

                    <h2>Create Account</h2>

                    <p>
                        Join Addis Eats and start ordering.
                    </p>
                </div>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >
                    <label>
                        Name

                        <input
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="Your name"
                            autoComplete="name"
                            required
                        />
                    </label>

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
                                setPassword(event.target.value)
                            }
                            placeholder="At least 6 characters"
                            autoComplete="new-password"
                            required
                        />
                    </label>

                    <label>
                        Confirm Password

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(
                                    event.target.value
                                )
                            }
                            placeholder="Enter your password again"
                            autoComplete="new-password"
                            required
                        />
                    </label>

                    {error && (
                        <p className="error">
                            {error}
                        </p>
                    )}

                    <button type="submit">
                        Create Account
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account?{" "}
                    <Link to="/login">
                        Sign In
                    </Link>
                </p>
            </div>
        </section>
    );
}

export default Register;
