import { useMutation, useQueryClient } from '@tanstack/react-query';
import auth from '../api/auth';

export function useAuth() {
  const queryClient = useQueryClient();

  // creamos las diferentes mutations manejando sus estados mediante eventos (onSuccess, onError)

  const registerMutation = useMutation({
    mutationFn: auth.register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-me'] });
    },
  });

  const loginMutation = useMutation({
    mutationFn: auth.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-me'] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: auth.logout,
    onSuccess: () => {
      queryClient.setQueryData(['user-me'], null);
    },
  });

  return {
    registerMutation,
    loginMutation,
    logoutMutation,
  };
}
