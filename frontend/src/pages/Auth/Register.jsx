import { Link } from "react-router";
import RegisterForm from "../../components/auth/RegisterForm";
import RegisterRoleForm from "../../components/auth/RegisterRoleForm";
import Stepper from "../../components/ui/Stepper";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";

const Register = () => {
  const methods = useForm()
  const { handleSubmit, formState: { errors }, watch } = methods
  const steps = [
    {
      id: 1,
      label: "Datos personales",
      Component: RegisterForm
    },
    {
      id: 2,
      label: "Seleccionar rol",
      Component: RegisterRoleForm
    },
    {
      id: 3,
      label: "Confirmación",
      Component: RegisterRoleForm
    }
  ];

  const campos = watch();

  useEffect(() => {
    console.log(errors)
    console.log(campos)
  }, [errors, campos])


  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl text-on-surface font-semibold">
            Crear nueva cuenta
          </h1>
          <p className="text-tertiary font-light">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            laboriosam dolor, obcaecati illum qui nobis voluptate dolorem.
          </p>
        </div>
        <form className="space-y-2" onSubmit={handleSubmit((data) => console.log(data))}>
          <Stepper steps={steps} />
        </form>
        <p className="text-center text-lg">
          ¿Ya tenés una cuenta?{" "}
          <Link
            className="text-primary font-semibold hover:underline"
            to="/auth/login"
          >
            Inicia sessión
          </Link>
        </p>
      </div>
    </FormProvider>
  );
};

export default Register;
