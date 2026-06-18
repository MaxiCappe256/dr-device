import Input from '../ui/shared/Input.jsx';
import { useForm } from 'react-hook-form';
import Button from '../ui/shared/Button.jsx';
import { useAccount } from '../../hooks/useAccount';

export default function PersonalDataTab({ fullName, email, phone }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { updatedMutation } = useAccount();

  const onSubmit = (data) => {
    updatedMutation.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <label className="space-y-3">
        <span className="text-sm font-bold uppercase tracking-wide text-on-surface">
          Nombre completo
        </span>
        <Input
          type="text"
          {...register('full_name')}
          defaultValue={fullName}
          className="w-full rounded-xl border border-surface-container-highest bg-surface-container-lowest px-5 py-4 text-lg text-on-surface outline-none transition-colors focus:border-primary"
        />
        {errors.fullName && (
          <p className="text-red-500">{errors.fullName.message}</p>
        )}
      </label>

      <label className="space-y-3">
        <span className="text-sm font-bold uppercase tracking-wide text-on-surface">
          Correo electrónico
        </span>
        <Input
          type="email"
          defaultValue={email}
          {...register('email')}
          className="w-full rounded-xl border border-surface-container-highest bg-surface-container-lowest px-5 py-4 text-lg text-on-surface outline-none transition-colors focus:border-primary"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </label>

      <label className="space-y-3">
        <span className="text-sm font-bold uppercase tracking-wide text-on-surface">
          Teléfono
        </span>
        <Input
          type="tel"
          {...register('phone')}
          defaultValue={phone}
          className="w-full rounded-xl border border-surface-container-highest bg-surface-container-lowest px-5 py-4 text-lg text-on-surface outline-none transition-colors focus:border-primary"
        />

        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </label>
      <Button
        variant="primary"
        type="submit"
        loading={updatedMutation.isPending}
      >
        Enviar
      </Button>
    </form>
  );
}
