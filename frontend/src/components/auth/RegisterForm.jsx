import { UserIcon, PhoneIcon, EmailIcon, LockIcon, ArrowRightIcon } from "../../utils/icons";
import { useForm, useFormContext } from "react-hook-form";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function RegisterForm({ onNext, }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label htmlFor="full_name" className="text-lg font-medium text-tertiary">
        Nombre completo <span className="text-red-500">*</span>
      </label>
      <Input
        id="full_name"
        type="text"
        {...register("full_name", { required: true })}
        icon={<UserIcon height="24" />}
        placeholder="Cristián Gallo"
      />

      {errors.full_name && <p>{errors.full_name.message}</p>}
      <label htmlFor="phone" className="text-lg font-medium text-tertiary">
        Teléfono
      </label>
      <Input
        id="phone"
        type="tel"
        {...register("phone", { required: true })}
        icon={<PhoneIcon height="24" />}
        placeholder="+54341823942"
      />

      <label htmlFor="email" className="text-lg font-medium text-tertiary">
        Correo electrónico <span className="text-red-500">*</span>
      </label>
      <Input
        id="email"
        type="email"
        {...register("email", { required: true })}
        icon={<EmailIcon height="24" />}
        placeholder="cristiangallo@gmail.com"
      />
      <label htmlFor="password" className="text-lg font-medium text-tertiary">
        Contraseña <span className="text-red-500">*</span>
      </label>
      <Input
        id="password"
        type="password"
        {...register("password", { required: true })}
        icon={<LockIcon height="24" />}
        placeholder="* * * * * * * *"
      />
      <div className="w-full">
        <Button variant="primary" type="button" onClick={onNext} iconRight={<ArrowRightIcon height="24"/>}>
          Siguiente
        </Button>
      </div>
    </>
  );
}
