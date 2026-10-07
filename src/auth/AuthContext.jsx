import {
    createContext,
    useState
} from "react";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [user, setUser] = useState(function () {
        const savedUser =
            localStorage.getItem("addiseats-user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });

    const [loading] = useState(false);

    function register(name, email, password) {
        const savedAccounts =
            localStorage.getItem("addiseats-accounts");

        const accounts = savedAccounts
            ? JSON.parse(savedAccounts)
            : [];

        const existingAccount = accounts.find(
            (account) =>
                account.email.toLowerCase() ===
                email.toLowerCase()
        );

        if (existingAccount) {
            return {
                success: false,
                message: "An account with this email already exists."
            };
        }

        const newAccount = {
            id: Date.now().toString(),
            name,
            email,
            password
        };

        const updatedAccounts = [
            ...accounts,
            newAccount
        ];

        localStorage.setItem(
            "addiseats-accounts",
            JSON.stringify(updatedAccounts)
        );

        const newUser = {
            id: newAccount.id,
            name: newAccount.name,
            email: newAccount.email
        };

        localStorage.setItem(
            "addiseats-user",
            JSON.stringify(newUser)
        );

        setUser(newUser);

        return {
            success: true
        };
    }

    function login(email, password) {
        const savedAccounts =
            localStorage.getItem("addiseats-accounts");

        const accounts = savedAccounts
            ? JSON.parse(savedAccounts)
            : [];

        const account = accounts.find(
            (item) =>
                item.email.toLowerCase() ===
                    email.toLowerCase() &&
                item.password === password
        );

        if (!account) {
            return {
                success: false,
                message: "Invalid email or password."
            };
        }

        const loggedInUser = {
            id: account.id,
            name: account.name,
            email: account.email
        };

        localStorage.setItem(
            "addiseats-user",
            JSON.stringify(loggedInUser)
        );

        setUser(loggedInUser);

        return {
            success: true
        };
    }

    function logout() {
        localStorage.removeItem("addiseats-user");
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                register,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;