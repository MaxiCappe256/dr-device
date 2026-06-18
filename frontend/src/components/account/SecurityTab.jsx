import Button from "../ui/shared/Button";
import Input from "../ui/shared/Input";
import { LockIcon } from "../../utils/icons";

export default function SecurityTab() {
  return (
    <form className="grid gap-8 md:grid-cols-2">
      <label className="space-y-3">
        <span className="text-sm font-bold uppercase tracking-wide text-on-surface">Contraseña actual</span>
        <Input
          type="password"
          placeholder="••••••••"
          icon={ <LockIcon height='24'/> }
          name="password"
        />
      </label>

      <label className="space-y-3">
        <span className="text-sm font-bold uppercase tracking-wide text-on-surface">Nueva contraseña</span>
        <Input
          type="password"
          placeholder="••••••••"
          name="password"
          icon={ <LockIcon height='24'/> }
        />
      </label>

      <Button
        variant="primary"
        type="submit"
      >
        Cambiar contraseña
      </Button>
    </form>
  );
}
