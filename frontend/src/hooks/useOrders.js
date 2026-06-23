import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import orders from "../api/orders.js";
import { toast } from "react-toastify";

export function useOrdersByUser() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: orders.getOrdersByUser,
  });
}

export function useGetOrder(orderId) {
  return useQuery({
    queryKey: ["order-get", orderId],
    queryFn: () => orders.getOrder(orderId),
    enabled: !!orderId,
  });
}

export function useAvailableOrders() {
  return useQuery({
    queryKey: ["available-orders"],
    queryFn: orders.getAvailableOrders,
  });
}

export function useTechOrders() {
  return useQuery({
    queryKey: ["tech-orders"],
    queryFn: orders.getOrdersByTechnician,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orders.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Orden creada exitosamente");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? "Error al crear la orden");
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orders.cancelledOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Orden cancelada exitosamente");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ?? "Error al cancelar la orden",
      );
    },
  });
}
