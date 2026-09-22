import { useState } from "react";

function getSavedAdmin() {
    const savedAdmin = sessionStorage.getItem(
        "addis-eats-admin"
    );

    return savedAdmin
        ? JSON.parse(savedAdmin)
        : null;
}

function useAdminAuth() {
    const [admin, setAdmin] = useState(
        getSavedAdmin
    );

    function logout() {
        sessionStorage.removeItem(
            "addis-eats-admin"
        );

        setAdmin(null);
    }

    return {
        admin,
        isAdmin: Boolean(admin),
        logout
    };
}

export default useAdminAuth;