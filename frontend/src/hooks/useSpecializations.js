import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import specializations from '../api/specializations';
import { toast } from "react-toastify";

export function useSpecializationsCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: specializations.getAllCategories,
  });
}

export function useUpdateSpecialization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: specializations.updated,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-me'] });
      toast.success("Se guardaron los cambios correctamente.");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ?? "Error al crear la orden"
      );
    },
  });
}

