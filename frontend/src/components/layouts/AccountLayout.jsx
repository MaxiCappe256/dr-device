import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { MenuIcon, UserIcon, OrderIcon, SpecializationIcon, ToolKitIcon, DeleteIcon, SecurityIcon } from '../../utils/icons';
import Sidebar from '../ui/shared/Sidebar';
import ProfileHeader from '../ui/account/ProfileHeader';
import Button from '../ui/shared/Button';
import Modal from '../ui/shared/Modal';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useDeleteAccount } from '../../hooks/useAccount';
import { useLogout } from '../../hooks/useAuth';
import Logo from '../ui/shared/Logo';

export default function AccountLayout() {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const deletedMutation = useDeleteAccount();
  const logoutMutation = useLogout();
  const navigate = useNavigate();

  const closeAccountMenu = () => setIsAccountMenuOpen(false);
  const {
    user: { data },
  } = useAuthContext();
  const isTechnician = data?.roles?.find((role) => role.title === "technician");
  const isAdmin = data?.roles?.some((role) => role.title === "admin");

  const links = [
    { label: "Cuenta", to: "/account", icon: UserIcon, end: true },
    { label: "Ordenes", to: "/account/orders", icon: OrderIcon },
    ...(isTechnician
      ? [
        { label: "Especializaciones", to: "/account/specializations", icon: SpecializationIcon },
        { label: "Trabajos", to: "/account/works", icon: ToolKitIcon },
      ]
      : []),
    ...(isAdmin
      ? [{ label: "Panel admin", to: "/admin-panel", icon: SecurityIcon }]
      : []),
    { label: "Eliminar cuenta", icon: DeleteIcon, danger: true, onClick: () => setIsModalActive(true) },
  ];

  return (
    <div className="flex min-h-screen bg-surface text-on-surface">
      <Sidebar isOpen={isAccountMenuOpen} onClose={closeAccountMenu} links={links} />
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${isAccountMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        onClick={closeAccountMenu}
      />

      <main className="min-w-0 flex-1 overflow-y-auto">
        <header className='flex items-center justify-between mx-6 my-4 lg:hidden'>
          <Logo to="/" iconClassName="size-6" textClassName="text-lg text-primary" />
          <div className='w-fit' onClick={() => setIsAccountMenuOpen(true)}>
            <Button
              type="button"
              variant="primary"
              iconRight={<MenuIcon height='24' />}
            />
          </div>

        </header>
        <ProfileHeader onOpenMenu={() => setIsAccountMenuOpen(true)} />
        <div className="px-4 pb-8 sm:px-6 lg:px-10">
          <Outlet />
        </div>
      </main>

      {isModalActive && (
        <Modal title={data?.full_name} onClose={() => setIsModalActive(false)}>
          <div className="flex flex-col gap-2 h-full justify-between items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">
                ¿Deseas eliminar tu cuenta?
              </h3>
              <p className="text-lg">
                Al confirmar tu cuenta quedara suspendida durante 30 días, para
                volver a activarla deberás volver a iniciar sesión con las
                mismas credenciales.
              </p>
            </div>

            <div className="flex gap-10 items-center jusitfy-between w-full">
              <Button
                onClick={() => {
                  deletedMutation.mutateAsync();
                  setIsModalActive(false);
                  navigate("/auth/login");
                  logoutMutation.mutateAsync();
                }}
                loading={logoutMutation.isPending}
                variant="danger"
              >
                Eliminar
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
