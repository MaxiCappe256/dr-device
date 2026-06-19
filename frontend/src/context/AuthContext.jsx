import { useQuery } from '@tanstack/react-query';
import apiUser from '../api/users';
import { AuthContext } from './auth';

export const AuthProvider = ({ children }) => {
  const userQuery = useQuery({
    queryKey: ['user-me'],
    queryFn: apiUser.userMe,
    retry: false,
  });

  return (
    <AuthContext.Provider
      value={{ user: userQuery.data ?? null, loading: userQuery.isPending }}
    >
      {children}
    </AuthContext.Provider>
  );
};
