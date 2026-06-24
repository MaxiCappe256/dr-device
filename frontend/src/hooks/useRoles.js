import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import roles from '../api/roles.js';
import { toast } from "react-toastify";

export function useRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: roles.getRoles,
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roles.updateRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success("Rol actualizado correctamente");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? "Error al actualizar el rol");
    },
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roles.createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success("Rol creado correctamente");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? "Error al crear el rol");
    },
  });
}
