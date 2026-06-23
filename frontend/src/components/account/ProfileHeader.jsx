import { useAuthContext } from "../../hooks/useAuthContext";
import Tag from "../ui/shared/Tag";

export default function ProfileHeader() {
  const {
    user: { data },
  } = useAuthContext();

  const { roles, full_name, email, createdAt } = data;
  return (
    <article className="mx-4 my-6 overflow-hidden rounded-lg border border-surface-container-highest bg-surface-container-lowest sm:mx-6 lg:m-10">
        <div className="relative">
          <div className="h-28 auth-brand-panel sm:h-40" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-surface-container-lowest to-transparent" />
        </div>

        <div className="flex flex-col gap-8 px-5 py-8 sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-col gap-3">
              <h2 className="wrap-break-words text-2xl font-bold tracking-tight text-on-surface sm:text-3xl">
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
  );
}
