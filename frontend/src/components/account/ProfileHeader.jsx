import React from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function ProfileHeader() {
  const {
    user: { data },
  } = useAuthContext();

  const { roles, full_name, email, createdAt } = data;
  return (
    <>
      <header className="flex h-20 items-center justify-between border-b border-surface-container-highest bg-surface-container-lowest px-12">
        <h1 className="text-3xl font-bold text-primary">Cuenta</h1>

        <div className="text-right">
          <p className="font-bold text-on-surface">{full_name}</p>
          <p className="text-sm text-tertiary">Lead Technician</p>
        </div>
      </header>

      <article className="m-10 overflow-hidden rounded-2xl border border-surface-container-highest bg-surface-container-lowest shadow-sm">
        <div className="h-40 auth-brand-panel" />

        <div className="flex flex-col gap-8 px-10 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-col gap-3">
              <h2 className="text-4xl font-bold tracking-tight text-on-surface">
                {full_name}
              </h2>

              <div className="space-x-4 my-2">
                {roles.map((rol) => (
                  <span
                    key={rol.id}
                    className="rounded-full border border-surface-container-highest bg-primary-soft px-4 py-1 text-sm font-bold text-primary"
                  >
                    {rol.title}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-2 text-xl text-tertiary">
              {email} • Miembro desde {new Date(createdAt).getFullYear()}
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 text-lg font-bold text-on-primary shadow-lg shadow-primary/25 transition-colors hover:bg-primary-hover"
          >
            Guardar cambios
          </button>
        </div>
      </article>
    </>
  );
}
