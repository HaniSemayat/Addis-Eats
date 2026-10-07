import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "./auth/useAuth";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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
        <section>
            <h2>Create Account</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    Name

                    <input
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        placeholder="Your name"
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

            <p>
                Already have an account?{" "}
                <Link to="/login">
                    Sign In
                </Link>
            </p>
        </section>
    );
}

export default Register;
