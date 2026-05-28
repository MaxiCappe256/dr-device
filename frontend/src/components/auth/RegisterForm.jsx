import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { UserIcon, PhoneIcon, EmailIcon, LockIcon } from "../../utils/icons";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="full_name" className="text-lg font-medium text-tertiary">
        Nombre completo <span className="text-red-500">*</span>
      </label>

      <Input
        id="full_name"
        type="text"
        {...register("full_name", { required: true })}
        icon={<UserIcon height="24" />}
        placeholder="Facundo Gómez"
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
        placeholder="culoflojo92@gmail.com"
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

      <Button variant="primary" type="button">
        Siguiente
      </Button>
    </form>
  );
}
