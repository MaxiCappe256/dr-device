export default function PersonalDataTab({ fullName, email, phone }) {
  return (
    <form className="grid gap-8 md:grid-cols-2">
      <label className="space-y-3">
        <span className="text-sm font-bold uppercase tracking-wide text-on-surface">Nombre completo</span>
        <input
          type="text"
          defaultValue={fullName}
          className="w-full rounded-xl border border-surface-container-highest bg-surface-container-lowest px-5 py-4 text-lg text-on-surface outline-none transition-colors focus:border-primary"
        />
      </label>

      <label className="space-y-3">
        <span className="text-sm font-bold uppercase tracking-wide text-on-surface">Correo electrónico</span>
        <input
          type="email"
          defaultValue={email}
          className="w-full rounded-xl border border-surface-container-highest bg-surface-container-lowest px-5 py-4 text-lg text-on-surface outline-none transition-colors focus:border-primary"
        />
      </label>

      <label className="space-y-3">
        <span className="text-sm font-bold uppercase tracking-wide text-on-surface">Teléfono</span>
        <input
          type="tel"
          defaultValue={phone}
          className="w-full rounded-xl border border-surface-container-highest bg-surface-container-lowest px-5 py-4 text-lg text-on-surface outline-none transition-colors focus:border-primary"
        />
      </label>

      <label className="space-y-3">
        <span className="text-sm font-bold uppercase tracking-wide text-on-surface">Zona horaria</span>
        <select
          defaultValue="America/Argentina/Buenos_Aires"
          className="w-full rounded-xl border border-surface-container-highest bg-surface-container-lowest px-5 py-4 text-lg text-on-surface outline-none transition-colors focus:border-primary"
        >
          <option value="America/Argentina/Buenos_Aires">Buenos Aires (ART)</option>
          <option value="America/New_York">Eastern Time (ET)</option>
          <option value="America/Chicago">Central Time (CT)</option>
        </select>
      </label>

      <label className="space-y-3 md:col-span-2">
        <span className="text-sm font-bold uppercase tracking-wide text-on-surface">Bio / notas profesionales</span>
        <textarea
          rows="5"
          defaultValue="Especialista en reparación y diagnóstico de dispositivos médicos de precisión."
          className="w-full resize-none rounded-xl border border-surface-container-highest bg-surface-container-lowest px-5 py-4 text-lg leading-8 text-on-surface outline-none transition-colors focus:border-primary"
        />
      </label>
    </form>
  );
}
