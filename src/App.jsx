import {
    lazy,
    Suspense
} from "react";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import Menu from "./menu/Menu";
import DishDetail from "./menu/DishDetail";
import Cart from "./cart/Cart";
import Login from "./Login";
import NotFound from "./NotFound";
import RequireAuth from "./auth/RequireAuth";
import AuthProvider from "./auth/AuthContext";
import ErrorBoundary from "./ErrorBoundary";
import Favorites from "./favorites/Favorites";
import Orders from "./orders/Orders";
import ThemeProvider from "./theme/ThemeContext";

import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import RequireAdmin from "./admin/RequireAdmin";
import Dashboard from "./admin/Dashboard";

const Checkout = lazy(
    () => import("./checkout/Checkout")
);

const Receipt = lazy(
    () => import("./Receipt")
);

function Skeleton() {
    return (
        <p className="status">
            Loading...
        </p>
    );
}

function MenuUnavailable() {
    return (
        <section>
            <h2>Menu unavailable</h2>

            <p>
                We could not load the menu right now.
                Please try again.
            </p>
        </section>
    );
}

function CartUnavailable() {
    return (
        <section>
            <h2>Cart unavailable</h2>

            <p>
                Something went wrong while loading
                your cart.
            </p>
        </section>
    );
}

function CheckoutUnavailable() {
    return (
        <section>
            <h2>Checkout unavailable</h2>

            <p>
                Something went wrong while loading
                checkout.
            </p>
        </section>
    );
}

function ReceiptUnavailable() {
    return (
        <section>
            <h2>Receipt unavailable</h2>

            <p>
                Something went wrong while loading
                your receipt.
            </p>
        </section>
    );
}

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>

                        {/* Customer Routes */}

                        <Route
                            path="/"
                            element={<Layout />}
                        >
                            <Route
                                index
                                element={<Home />}
                            />

                            <Route
                                path="menu"
                                element={
                                    <ErrorBoundary
                                        fallback={
                                            <MenuUnavailable />
                                        }
                                    >
                                        <Menu />
                                    </ErrorBoundary>
                                }
                            />

                            <Route
                                path="menu/:id"
                                element={
                                    <ErrorBoundary
                                        fallback={
                                            <MenuUnavailable />
                                        }
                                    >
                                        <DishDetail />
                                    </ErrorBoundary>
                                }
                            />

                            <Route
                                path="cart"
                                element={
                                    <ErrorBoundary
                                        fallback={
                                            <CartUnavailable />
                                        }
                                    >
                                        <Cart />
                                    </ErrorBoundary>
                                }
                            />

                            <Route
                                path="checkout"
                                element={
                                    <ErrorBoundary
                                        fallback={
                                            <CheckoutUnavailable />
                                        }
                                    >
                                        <Suspense
                                            fallback={
                                                <Skeleton />
                                            }
                                        >
                                            <RequireAuth>
                                                <Checkout />
                                            </RequireAuth>
                                        </Suspense>
                                    </ErrorBoundary>
                                }
                            />

                            <Route
                                path="receipt"
                                element={
                                    <ErrorBoundary
                                        fallback={
                                            <ReceiptUnavailable />
                                        }
                                    >
                                        <Suspense
                                            fallback={
                                                <Skeleton />
                                            }
                                        >
                                            <Receipt />
                                        </Suspense>
                                    </ErrorBoundary>
                                }
                            />

                            <Route
                                path="login"
                                element={
                                    <Login />
                                }
                            />

                            <Route
                                path="favorites"
                                element={
                                    <Favorites />
                                }
                            />

                            <Route
                                path="orders"
                                element={
                                    <Orders />
                                }
                            />

                            <Route
                                path="*"
                                element={
                                    <NotFound />
                                }
                            />
                        </Route>


                        {/* Admin Login */}

                        <Route
                            path="/admin/login"
                            element={
                                <AdminLogin />
                            }
                        />


                        {/* Protected Admin Routes */}

                        <Route
                            path="/admin"
                            element={
                                <RequireAdmin>
                                    <AdminLayout />
                                </RequireAdmin>
                            }
                        >
                            <Route
                                index
                                element={
                                    <Dashboard />
                                }
                            />

                            <Route
                                path="menu"
                                element={
                                    <p className="status">
                                        Menu Manager
                                        coming soon...
                                    </p>
                                }
                            />

                            <Route
                                path="orders"
                                element={
                                    <p className="status">
                                        Order Manager
                                        coming soon...
                                    </p>
                                }
                            />
                        </Route>

                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;