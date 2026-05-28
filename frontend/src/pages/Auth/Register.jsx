import { Link } from "react-router";
import RegisterForm from "../../components/auth/RegisterForm";
import Stepper from "../../components/ui/Stepper";

const Register = () => {
  const steps = [
    {
      label: "Datos personales",
      children: <RegisterForm />,
    },
    {
      label: "Selecciona tu rol",
      children: <i>Segundo paso</i>,
    },
    {
      label: "Confirmación",
      children: <i>Tercer paso</i>,
    },
  ];

  return (
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
      <Stepper steps={steps} />
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
  );
};

export default Register;
