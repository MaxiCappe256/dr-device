import { NavLink } from "react-router";
import { useLogout } from "../../../hooks/useAuth";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { ArrowCloseIcon, LoginIcon, UserIcon } from "../../../utils/icons";
import Button from "./Button";
import Logo from "./Logo";

export default function Sidebar({ isOpen = false, onClose, links, children }) {
  const logoutMutation = useLogout();
  const {
    user: { data },
  } = useAuthContext();

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-80 shrink-0 flex-col border-r border-surface-container-highest bg-surface-container-lowest text-on-surface shadow-[4px_0_18px_rgba(11,28,48,0.06)] rounded-r-xl transition-transform duration-300 lg:sticky lg:z-auto lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <button
        type="button"
        className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary lg:hidden"
        onClick={onClose}
        aria-label="Cerrar menú"
      >
        <ArrowCloseIcon className="size-6" />
      </button>

      <Logo to="/" className="px-5 py-6 text-primary" onClick={onClose} />

      <nav className="mt-8 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-4 pb-4">
        {links.map((link) => {
          const Icon = link.icon;

          return link.danger ? (
            <Button
              type="button"
              variant="danger"
              key={link.label}
              className="mt-auto justify-start text-xl"
              onClick={link.onClick}
            >
              <Icon className="size-6 shrink-0" />
              <span>{link.label}</span>
            </Button>
          ) : (
            <NavLink
              to={link.to}
              key={link.label}
              end={link.end}
              className={({ isActive }) =>
                [
                  "flex items-center gap-4 rounded-md p-3 text-xl font-medium transition-colors",
                  isActive
                    ? "bg-primary-soft text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                ].join(" ")
              }
              onClick={onClose}
            >
              <Icon className="size-6 shrink-0" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}

        {children}

        <div className="flex items-center justify-between rounded-lg border border-surface-container-highest px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-on-primary">
              <UserIcon height="28" />
            </div>
            <div className="min-w-0 flex flex-col">
              <span className="truncate text-md font-semibold text-on-surface">
                {data?.full_name}
              </span>
              <small className="truncate text-sm text-tertiary">{data?.email}</small>
            </div>
          </div>
          <LoginIcon height="24" className="cursor-pointer transition-colors hover:text-error" onClick={() => logoutMutation.mutateAsync()} />
        </div>
      </nav>
    </aside>
  );
}
