import { Link, useSearchParams } from "react-router";
import RegisterForm from "../../components/auth/RegisterForm";
import Stepper from "../../components/ui/Stepper";
import Button from "../../components/ui/Button"

const ComponentePrueba = ({ onBack, onNext }) => {
  const [searchParams] = useSearchParams()
  const role = searchParams.get('role')

  return (
    <>
      <Button variant="outline" onClick={onBack}>Volver</Button>
      <Button variant="primary" onClick={onNext}>Siguiente</Button>
      <span>Rol: {role === "tech" ? 'Seleccionaste TECNICO' : 'Seleccionaste USUARIO'}</span>
    </>
  )
}

const ComponentePrueba2 = ({ onBack }) => {
  return (
    <>
      <Button variant="outline" onClick={onBack}>Volver</Button>
    </>
  )
}

const Register = () => {
  const steps = [
    {
      id: 1,
      label: "Datos personales",
      Component: RegisterForm
    },
    {
      id: 2,
      label: "Seleccionar rol",
      Component: ComponentePrueba
    },
    {
      id: 3,
      label: "Confirmación",
      Component: ComponentePrueba2
    }
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
