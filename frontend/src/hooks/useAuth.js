import { useMutation } from "@tanstack/react-query"
import { useAuthContext } from "../context/AuthContext";
import auth from "../api/auth";

export function useAuth() {
    const { setUser } = useAuthContext();

    // creamos las diferentes mutations manejando sus estados mediante eventos (onSuccess, onError)

    const registerMutation = useMutation({
        mutationFn: auth.register,
        onSuccess: ({data}) => setUser(data)
    })

    const loginMutation = useMutation({
        mutationFn: auth.login,
        onSuccess: ({data}) => setUser(data)
    })


    const logoutMutation = useMutation({
        mutationFn: auth.logout,
        onSuccess: () => setUser(null)
    })


    return {
        registerMutation,
        loginMutation,
        logoutMutation
    }
}
