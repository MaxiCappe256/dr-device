import { useAuthContext } from "../../hooks/useAuthContext";
import { useAuth } from "../../hooks/useAuth";
import UserMenu from "../ui/shared/UserMenu";
import Tag from "../ui/shared/Tag";

export default function ProfileHeader() {
  const {
    user: { data },
  } = useAuthContext();
  const { logoutMutation } = useAuth();

  const { roles, full_name, email, createdAt } = data;
  return (
    <>
      <header className="flex h-20 items-center justify-between border-b border-surface-container-highest bg-surface-container-lowest px-12">
        <h1 className="text-3xl font-bold text-primary">Cuenta</h1>

        <UserMenu
          user={data}
          logoutLoading={logoutMutation.isPending}
          onLogout={logoutMutation.mutateAsync}
        />
      </header>

      <article className="m-10 overflow-hidden rounded-2xl border border-surface-container-highest bg-surface-container-lowest">
        <div className="h-40 auth-brand-panel" />

        <div className="flex flex-col gap-8 px-10 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold tracking-tight text-on-surface">
                {full_name}
              </h2>

              <div className="space-x-4 my-2">
                {roles.map((rol) => (
                  <Tag key={rol.id} label={rol.title} color="#0f56d9" />
                ))}
              </div>
            </div>
            <p className="mt-2 text-xl text-tertiary">
              {email} • Miembro desde {new Date(createdAt).getFullYear()}
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
