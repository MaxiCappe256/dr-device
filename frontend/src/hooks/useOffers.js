import offers from "../api/offers.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useGetOffersByOrder(orderId) {
  return useQuery({
    queryKey: ["offers", "order", orderId],
    queryFn: () => offers.getOffersByOrder(orderId),
    enabled: !!orderId,
  });
}

export function useGetOffer(id) {
  return useQuery({
    queryKey: ["offer", id],
    queryFn: () => offers.getOffer(id),
    enabled: !!id,
  });
}

export function useAcceptOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => offers.acceptOffer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offers"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Oferta aceptada exitosamente.");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ?? "Error al aceptar la oferta.",
      );
    },
  });
}

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