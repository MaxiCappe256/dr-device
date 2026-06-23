import { useState } from 'react';
import { Outlet } from 'react-router';
import { useForm } from 'react-hook-form';
import Sidebar from '../ui/shared/Sidebar';
import { UserIcon, SecurityIcon, SpecializationIcon, EmailIcon, LockIcon, PhoneIcon, MenuIcon } from '../../utils/icons';
import Button from '../ui/shared/Button';
import Input from '../ui/shared/Input';
import Modal from '../ui/shared/Modal';
import Error from '../ui/shared/Error';
import { useCreateAdmin } from '../../hooks/useUsers';

const sidebarLinks = [
  { label: 'Usuarios', icon: UserIcon, to: '/admin-panel/users', end: true },
  { label: 'Roles', icon: SecurityIcon, to: '/admin-panel/roles' },
  { label: 'Categorías', icon: SpecializationIcon, to: '/admin-panel/categories' },
];

export default function AdminLayout() {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { mutateAsync, isPending, error: mutationError } = useCreateAdmin();

  const closeAccountMenu = () => setIsAccountMenuOpen(false);

  const handleCreateAdmin = async (data) => {
    await mutateAsync(data);
    setShowCreateAdmin(false);
  };

  return (
    <div className="flex min-h-screen bg-surface text-on-surface">
      <Sidebar isOpen={isAccountMenuOpen} onClose={closeAccountMenu} links={sidebarLinks}>
        <div className="mt-auto justify-start space-y-2">
          <button
            type="button"
            onClick={() => setShowCreateAdmin(true)}
            className="flex w-full items-center gap-4 rounded-md p-3 text-xl font-medium transition-colors text-on-surface-variant hover:bg-surface-container-low hover:text-primary cursor-pointer"
          >
            <UserIcon className="size-6 shrink-0" />
            <span>Crear administrador</span>
          </button>
        </div>
      </Sidebar>

      <main className="min-w-0 flex-1 overflow-y-auto">
        <header className='flex items-center justify-between mx-6 lg:hidden'>
          <div className="flex items-center gap-4 py-6">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary text-on-primary shadow-lg shadow-primary/25">
              <svg
                aria-hidden="true"
                className="size-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6V4h6v2"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 6h14v14H5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10v6m-3-3h6"
                />
              </svg>
            </div>

            <div>
              <p className="text-2xl font-bold leading-6 text-primary">
                Dr. Device
              </p>
            </div>
          </div>
          <div className='w-fit' onClick={() => setIsAccountMenuOpen(true)}>
            <Button
              type="button"
              variant="primary"
              iconRight={<MenuIcon height='24' />}
            />
          </div>

        </header>
        <Outlet />
      </main>

      {showCreateAdmin && (
        <Modal title="Crear administrador" onClose={() => setShowCreateAdmin(false)}>
          <form onSubmit={handleSubmit(handleCreateAdmin)} className="flex flex-col gap-5">
            {mutationError?.response?.data && (
              <Error message={mutationError.response.data.message} />
            )}
            <label className="space-y-2">
              <span className="text-sm font-bold uppercase tracking-wide text-on-surface">Nombre completo</span>
              <Input
                type="text"
                placeholder="Nombre del admin"
                icon={<UserIcon height="24" />}
                {...register('full_name', { required: 'El nombre es obligatorio' })}
              />
              {errors.full_name && <Error message={errors.full_name.message} />}
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold uppercase tracking-wide text-on-surface">Correo electrónico</span>
              <Input
                type="email"
                placeholder="admin@drdevice.com"
                icon={<EmailIcon height="24" />}
                {...register('email', { required: 'El email es obligatorio' })}
              />
              {errors.email && <Error message={errors.email.message} />}
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold uppercase tracking-wide text-on-surface">Contraseña</span>
              <Input
                type="password"
                placeholder="* * * * * * * *"
                icon={<LockIcon height="24" />}
                {...register('password', { required: 'La contraseña es obligatoria' })}
              />
              {errors.password && <Error message={errors.password.message} />}
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold uppercase tracking-wide text-on-surface">Teléfono</span>
              <Input
                type="tel"
                placeholder="+54 11 1234-5678"
                icon={<PhoneIcon height="24" />}
                {...register('phone')}
              />
            </label>
            <div className="flex gap-4">
              <Button variant="outline" type="button" onClick={() => setShowCreateAdmin(false)}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit" loading={isPending}>
                Crear admin
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
