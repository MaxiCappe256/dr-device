import { createContext, use, useContext, useEffect } from "react";
import { useState } from "react";
import apiUser from "../api/user";
import { useMutation } from "@tanstack/react-query";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const userMutation = useMutation({
        mutationFn: apiUser.userMe,
        onSuccess: ({ data }) => setUser(data),
        onError: (err) => console.log("No hay sesión.")
    })

    useEffect(() => {
        userMutation.mutateAsync()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading: userMutation.isPending }}>
            {children}
        </AuthContext.Provider>
    )
}

// creamos un hook para evitar tener que ir página a página utilizando "useContext(AuthContext)"
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe estar dentro de authProvider");
    }
    return context;
}


