import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

const ThemeContext = createContext(null);

function getInitialTheme() {
    const savedTheme =
        localStorage.getItem("addis-eats-theme");

    if (
        savedTheme === "dark" ||
        savedTheme === "light"
    ) {
        return savedTheme;
    }

    return "light";
}

function ThemeProvider({ children }) {
    const [theme, setTheme] =
        useState(getInitialTheme);

    useEffect(
        function () {
            document.documentElement.dataset.theme =
                theme;

            localStorage.setItem(
                "addis-eats-theme",
                theme
            );
        },
        [theme]
    );

    function toggleTheme() {
        setTheme(function (currentTheme) {
            return currentTheme === "light"
                ? "dark"
                : "light";
        });
    }

    const value = useMemo(
        function () {
            return {
                theme,
                toggleTheme
            };
        },
        [theme]
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context =
        useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useTheme must be used inside ThemeProvider."
        );
    }

    return context;
}

export default ThemeProvider;