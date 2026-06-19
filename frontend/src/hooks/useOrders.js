import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import orders from "../api/orders.js";

export function useOrders() {
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: ["orders"],
    queryFn: orders.getOrdersByUser,
  });

  const cancelledMutation = useMutation({
    mutationFn: orders.cancelledOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      console.log(error.response?.data?.error);
    },
  });

  return { categoriesQuery, cancelledMutation };
}
