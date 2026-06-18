import Button from "../ui/Button";

export default function SecurityTab() {
  return (
    <form className="grid gap-8 md:grid-cols-2">
      <label className="space-y-3">
        <span className="text-sm font-bold uppercase tracking-wide text-on-surface">Contraseña actual</span>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-surface-container-highest bg-surface-container-lowest px-5 py-4 text-lg text-on-surface outline-none transition-colors focus:border-primary"
        />
      </label>

      <label className="space-y-3">
        <span className="text-sm font-bold uppercase tracking-wide text-on-surface">Nueva contraseña</span>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-surface-container-highest bg-surface-container-lowest px-5 py-4 text-lg text-on-surface outline-none transition-colors focus:border-primary"
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
