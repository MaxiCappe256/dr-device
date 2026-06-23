import { useState } from 'react';
import { NavLink } from 'react-router';
import { useForm } from 'react-hook-form';
import { LoginIcon, UserIcon, SecurityIcon, SpecializationIcon, EmailIcon, LockIcon, PhoneIcon } from '../../../utils/icons';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import Input from '../shared/Input';
import Error from '../shared/Error';
import Logo from '../shared/Logo';
import { useCreateAdmin } from '../../../hooks/useUsers';
import { useLogout } from '../../../hooks/useAuth';
import { useAuthContext } from '../../../hooks/useAuthContext';

const sidebarLinks = [
  { id: 'users', label: 'Usuarios', icon: UserIcon, to: '/admin-panel/users' },
  { id: 'roles', label: 'Roles', icon: SecurityIcon, to: '/admin-panel/roles' },
  { id: 'categories', label: 'Categorías', icon: SpecializationIcon, to: '/admin-panel/categories' },
];

export default function AdminSidebar() {
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { mutateAsync, isPending, error: mutationError } = useCreateAdmin();
  const logoutMutation = useLogout();
  const {
    user: { data },
  } = useAuthContext();

  const handleCreateAdmin = async (data) => {
    await mutateAsync(data);
    setShowCreateAdmin(false);
  };


  return (
    <>
      <aside className="fixed left-0 top-0 z-50 flex h-screen w-80 shrink-0 flex-col border-r border-surface-container-highest bg-surface-container-lowest text-on-surface shadow-[4px_0_18px_rgba(11,28,48,0.06)] rounded-r-xl transition-transform duration-300 lg:sticky lg:z-auto lg:translate-x-0 ">
        <Logo to="/" className="px-5 py-6" />

        <nav className="mt-8 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-4 pb-4">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                to={link.to}
                key={link.id}
                end={link.to === '/admin-panel/users'}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-md p-3 text-xl font-medium transition-colors ${isActive
                    ? 'bg-primary-soft text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                  }`
                }
              >
                <Icon className="size-6 shrink-0" />
                <span className="capitalize">{link.label}</span>
              </NavLink>
            );
          })}
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
          <div className="flex items-center justify-between rounded-lg border border-surface-container-highest px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-on-primary">
                <UserIcon height="28" />
              </div>
              <div className="min-w-0 flex flex-col">
                <span className="truncate text-md font-semibold text-on-surface">
                  {data?.full_name}
                </span>
                <small className="truncate text-sm text-tertiary">{data?.email}</small>
              </div>
            </div>
            <LoginIcon height="24" className="cursor-pointer transition-colors hover:text-error" onClick={() => logoutMutation.mutateAsync()} />
          </div>
        </nav>

      </aside>

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
    </>
  );
}
