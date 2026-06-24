import { UserIcon, PhoneIcon, EmailIcon, LockIcon, ArrowRightIcon } from "../../../utils/icons";
import { useFormContext, useFormState } from "react-hook-form";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Error from "../shared/Error";

export default function RegisterForm({ onNext, }) {
  const { register, control } = useFormContext();
  const { errors } = useFormState({
    control,
    name: ["full_name", "phone", "email", "password"]
  });

  return (
    <>
      <label htmlFor="full_name" className="text-lg font-medium text-tertiary">
        Nombre completo <span className="text-red-500">*</span>
      </label>
      <Input
        id="full_name"
        type="text"
        {...register("full_name", {
          required: "El nombre completo es obligatorio"
        })}
        icon={<UserIcon height="24" />}
        placeholder="Cristián Gallo"
      />

      {errors.full_name && <Error message={errors.full_name.message}/>}
      <label htmlFor="phone" className="text-lg font-medium text-tertiary">
        Teléfono
      </label>
      <Input
        id="phone"
        type="number"
        {...register("phone", {
          required: "El teléfono es obligatorio"
        })}
        icon={<PhoneIcon height="24" />}
        placeholder="+54341823942"
      />
      {errors.phone && <Error message={errors.phone.message}/>}

      <label htmlFor="email" className="text-lg font-medium text-tertiary">
        Correo electrónico <span className="text-red-500">*</span>
      </label>
      <Input
        id="email"
        type="email"
        {...register("email", {
          required: "El correo electrónico es obligatorio",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Ingresá un correo electrónico válido"
          }
        })}
        icon={<EmailIcon height="24" />}
        placeholder="cristiangallo@gmail.com"
      />
      {errors.email && <Error message={errors.email.message}/>}
      <label htmlFor="password" className="text-lg font-medium text-tertiary">
        Contraseña <span className="text-red-500">*</span>
      </label>
      <Input
        id="password"
        type="password"
        aria-invalid={Boolean(errors.password)}
        aria-describedby={errors.password ? "password-error" : undefined}
        {...register("password", {
          required: "La contraseña es obligatoria"
        })}
        icon={<LockIcon height="24" />}
        placeholder="* * * * * * * *"
      />
      {errors.password && <Error message={errors.password.message}/>}
      <Button
        variant="primary"
        type="button"
        onClick={onNext}
        iconRight={<ArrowRightIcon height="24" />}
        className="mt-8"
      >
        Siguiente
      </Button>
    </>
  );
}