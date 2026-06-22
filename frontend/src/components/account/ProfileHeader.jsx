import { useAuthContext } from "../../hooks/useAuthContext";
import { useAuth } from "../../hooks/useAuth";
import UserMenu from "../ui/shared/UserMenu";
import Tag from "../ui/shared/Tag";
import { MenuIcon } from "../../utils/icons";

export default function ProfileHeader({ onOpenMenu }) {
  const {
    user: { data },
  } = useAuthContext();
  const { logoutMutation } = useAuth();

  const { roles, full_name, email, createdAt } = data;
  return (
    <>
      <header className="flex h-20 items-center justify-between border-b border-surface-container-highest bg-surface-container-lowest px-4 sm:px-6 lg:px-12">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-xl bg-primary text-on-primary shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90 lg:hidden"
            onClick={onOpenMenu}
            aria-label="Abrir menú de cuenta"
          >
            <MenuIcon className="size-7" />
          </button>

          <h1 className="text-2xl font-bold text-primary sm:text-3xl">
            Cuenta
          </h1>
        </div>

        <UserMenu
          user={data}
          logoutLoading={logoutMutation.isPending}
          onLogout={logoutMutation.mutateAsync}
          hideNameOnMobile
        />
      </header>

      <article className="mx-4 my-6 overflow-hidden rounded-2xl border border-surface-container-highest bg-surface-container-lowest sm:mx-6 lg:m-10">
        <div className="h-28 auth-brand-panel sm:h-40" />

        <div className="flex flex-col gap-8 px-5 py-8 sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-col gap-3">
              <h2 className="break-words text-2xl font-bold tracking-tight text-on-surface sm:text-3xl">
                {full_name}
              </h2>

              <div className="my-2 flex flex-wrap gap-3">
                {roles.map((rol) => (
                  <Tag key={rol.id} label={rol.title} color="#0f56d9" />
                ))}
              </div>
            </div>
            <p className="mt-2 break-words text-base text-tertiary sm:text-xl">
              {email} • Miembro desde {new Date(createdAt).getFullYear()}
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
