import {
    createContext,
    useCallback,
    useContext,
    useState
} from "react";

const ToastContext = createContext(null);

function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((currentToasts) =>
            currentToasts.filter(
                (toast) => toast.id !== id
            )
        );
    }, []);

    const showToast = useCallback(
        (message, type = "success") => {
            const id = Date.now();

            setToasts((currentToasts) => [
                ...currentToasts,
                {
                    id,
                    message,
                    type
                }
            ]);

            window.setTimeout(() => {
                removeToast(id);
            }, 3000);
        },
        [removeToast]
    );

    return (
        <ToastContext.Provider
            value={{
                showToast,
                removeToast
            }}
        >
            {children}

            <div
                className="toast-container"
                aria-live="polite"
                aria-atomic="true"
            >
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`toast toast-${toast.type}`}
                        role="status"
                    >
                        <span className="toast-icon">
                            {toast.type === "success"
                                ? "✓"
                                : "!"}
                        </span>

                        <p>{toast.message}</p>

                        <button
                            type="button"
                            onClick={() =>
                                removeToast(toast.id)
                            }
                            aria-label="Dismiss notification"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error(
            "useToast must be used inside ToastProvider."
        );
    }

    return context;
}

export default ToastProvider;
