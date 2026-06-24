import { useMutation, useQueryClient } from '@tanstack/react-query';
import account from '../api/account';
import { toast } from "react-toastify";

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: account.updated,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-me'] });
      toast.success("Datos actualizados correctamente");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ?? "Error al actualizar los datos"
      );
    },
  });
}

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: account.deleted,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-me'] });
      toast.success("Usuario eliminado correctamente");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ?? "Error al eliminar la cuenta"
      );
    },
  });
}
