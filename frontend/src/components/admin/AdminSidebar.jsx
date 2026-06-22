import { useState } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { LoginIcon, UserIcon, EmailIcon, LockIcon, PhoneIcon } from '../../utils/icons';
import Modal from '../ui/shared/Modal';
import Button from '../ui/shared/Button';
import Input from '../ui/shared/Input';
import Error from '../ui/shared/Error';
import { useCreateAdmin } from '../../hooks/useUsers';

export default function AdminSidebar({ links, activeTab, onTabChange, isLoading, onLogout, children }) {
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { mutateAsync, isPending, error: mutationError } = useCreateAdmin();

  const handleCreateAdmin = async (data) => {
    await mutateAsync(data);
    setShowCreateAdmin(false);
  };

  return (
    <div className="flex min-h-screen bg-surface text-on-surface">
      <aside className="flex w-80 h-screen sticky top-0 shrink-0 flex-col border-r border-surface-container-highest bg-surface-container-lowest text-on-surface shadow-[4px_0_18px_rgba(11,28,48,0.06)]">
        <Link to="/">
          <div className="flex items-center gap-4 px-5 py-6">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-on-primary shadow-lg shadow-primary/25">
              <svg
                aria-hidden="true"
                className="size-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6V4h6v2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 6h14v14H5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m-3-3h6" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold leading-6 text-primary">Dr. Device</p>
            </div>
          </div>
        </Link>

        <p className="px-8 pt-8 pb-4 text-sm font-bold uppercase tracking-wider text-tertiary">
          Administrar
        </p>

        <nav className="flex flex-1 flex-col gap-2 px-4">
          {isLoading ? (
            <p className="px-5 py-4 text-lg text-tertiary">Cargando...</p>
          ) : (
            links.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;

              return (
              <button
                type="button"
                key={link.id}
                onClick={() => onTabChange(link.id)}
                className={`flex items-center gap-4 rounded-xl px-5 py-4 text-xl font-medium transition-colors text-left cursor-pointer ${isActive
                  ? 'bg-primary-soft text-primary'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                  }`}
              >
                <Icon className="size-6 shrink-0" />
                <span className="capitalize">{link.label}</span>
              </button>
              );
            })
          )}
        </nav>

        <div className="px-4 pb-6 mt-auto space-y-2">
        <button
          type="button"
          onClick={() => setShowCreateAdmin(true)}
          className="flex w-full items-center gap-4 rounded-xl px-5 py-4 text-xl font-medium transition-colors text-on-surface-variant hover:bg-surface-container-low hover:text-primary cursor-pointer"
        >
          <UserIcon className="size-6 shrink-0" />
          <span>Crear admin</span>
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-4 rounded-xl px-5 py-4 text-xl font-medium transition-colors text-error hover:bg-error-container hover:text-on-error-container cursor-pointer"
        >
          <LoginIcon className="size-6 shrink-0" />
          <span>Cerrar sesión</span>
        </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto">
        <header className="flex h-20 items-center border-b border-surface-container-highest bg-surface-container-lowest px-12">
          <h1 className="text-3xl font-bold text-primary">Panel de Administración</h1>
        </header>

        {children}
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
