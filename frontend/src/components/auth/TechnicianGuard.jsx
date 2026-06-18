import { Navigate, Outlet } from 'react-router';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function TechnicianGuard() {
  const { user, loading } = useAuthContext();

  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/auth/login" replace />;

  const roles = user.data?.roles ?? [];
  const isTechnician = roles.some(role => role.title === 'technician');

  if (!isTechnician) return <Navigate to="/account" replace />;

  return <Outlet />;
}