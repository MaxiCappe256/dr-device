import { useMutation, useQueryClient } from '@tanstack/react-query';
import account from '../api/account';

export function useAccount() {
  const queryClient = useQueryClient();

  const updatedMutation = useMutation({
    mutationFn: account.updated,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-me'] });
      console.log('EXITOS');
    },
    onError: (error) => {
      console.log(error.response?.data?.error);
    },
  });

  
  const deletedMutation = useMutation({
    mutationFn: account.deleted,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-me'] });
      console.log('EXITOS');
    },
    onError: (error) => {
      console.log(error.response?.data?.error);
    },
  });

  return { updatedMutation, deletedMutation };
}
