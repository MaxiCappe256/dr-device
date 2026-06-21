import offers from "../api/offers.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCreateOffer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: offers.createOffer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["offers"] });
            toast.success("Oferta realizada exitosamente.");
        },
        onError: (error) => {
            toast.error(
                error?.response?.data?.message ?? "Error al realizar la oferta."
            );
        },
    })
}