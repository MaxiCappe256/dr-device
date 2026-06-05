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

      <div className="rounded-xl border border-surface-container-highest bg-surface-container-low p-6 md:col-span-2">
        <h3 className="text-xl font-bold text-on-surface">Sesiones activas</h3>
        <p className="mt-2 text-lg text-tertiary">
          Revisá tus dispositivos conectados y cerrá sesiones que ya no uses.
        </p>
      </div>
    </form>
  );
}
