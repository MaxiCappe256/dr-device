import { useForm } from "react-hook-form";
import { useChangePassword } from "../../../hooks/useAuth";
import Button from "../shared/Button";
import Input from "../shared/Input";
import { LockIcon, SaveIcon } from "../../../utils/icons";

export default function SecurityTab() {
  const changePasswordMutation = useChangePassword();
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      current_password: '',
      new_password: ''
    }
  });

  const onSubmit = (data) => {
    changePasswordMutation.mutate(data, {
      onSuccess: () => reset()
    });
  };

  watch();

  return (
    <form className="grid gap-8 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
      <label className="space-y-3">
        <span className="text-sm font-bold uppercase tracking-wide text-on-surface">Contraseña actual</span>
        <Input
          type="password"
          placeholder="••••••••"
          // name="current_password"
          icon={<LockIcon height='24' />}
          {...register("current_password", {
            required: "La contraseña actual es requerida",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          })}
        />
        {errors.current_password && (
          <p className="text-error text-sm">{errors.current_password.message}</p>
        )}
      </label>

      <label className="space-y-3">
        <span className="text-sm font-bold uppercase tracking-wide text-on-surface">Nueva contraseña</span>
        <Input
          type="password"
          placeholder="••••••••"
          // name="new_password"
          icon={<LockIcon height='24' />}
          {...register("new_password", {
            required: "La nueva contraseña es requerida",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          })}
        />
        {errors.new_password && (
          <p className="text-error text-sm">{errors.new_password.message}</p>
        )}
      </label>

      <div className="flex justify-end md:col-span-2">
        <Button
          variant="primary"
          type="submit"
          loading={changePasswordMutation.isPending}
          iconRight={<SaveIcon height="24" />}
          className="w-auto! px-8"
        >
          Cambiar contraseña
        </Button>
      </div>
    </form>
  );
}
