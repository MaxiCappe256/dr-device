import { useMutation, useQueryClient } from '@tanstack/react-query';
import account from '../api/account';
import { toast } from "react-toastify";

export function useAccount() {
  const queryClient = useQueryClient();

  const updatedMutation = useMutation({
    mutationFn: account.updated,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-me'] });
      toast.success("Datos actualizados correctamente");
    },
    onError: (error) => {
      toast.error(
        createOrderMutation.error?.response?.data?.message ?? "Error al actualizar los datos"
      );
    },
  });


  const deletedMutation = useMutation({
    mutationFn: account.deleted,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-me'] });
      toast.success("Usuario eliminado correctamente");
    },
    onError: (error) => {
      toast.error(
        createOrderMutation.error?.response?.data?.message ?? "Error al eliminar la cuenta"
      );
    },
  });

  return { updatedMutation, deletedMutation };
}
