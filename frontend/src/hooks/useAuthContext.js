import { useContext } from 'react';
import { AuthContext } from '../context/auth';

// creamos un hook para evitar tener que ir página a página utilizando "useContext(AuthContext)"
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe estar dentro de authProvider');
  }
  return context;
};
