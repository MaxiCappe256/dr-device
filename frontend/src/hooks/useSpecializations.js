import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import specializations from '../api/specializations';

export function useSpecializations() {
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: specializations.getAllCategories,
  });

  const updatedMutation = useMutation({
    mutationFn: specializations.updated,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-me'] });
    },
  });

  return { categoriesQuery, updatedMutation };
}