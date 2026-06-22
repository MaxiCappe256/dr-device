import { useState } from "react";
import { NavLink } from "react-router";
import { UserIcon, AngleDownIcon, LoginIcon } from "../../../utils/icons";
import Button from "./Button";

const menuLinks = [
  { label: "Mi cuenta", to: "/account" },
  { label: "Órdenes", to: "/account/orders" },
];

export default function UserMenu({
  user,
  logoutLoading,
  onLogout,
  hideNameOnMobile = false,
}) {
  const [open, setOpen] = useState(false);
  const isAdmin = user?.roles?.some((role) => role.title === "admin");

  const links = isAdmin
    ? [...menuLinks, { label: "Panel admin", to: "/admin-panel" }]
    : menuLinks;

  return (
    <div className="relative">
      <Button
        type="button"
        variant="primary"
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`group rounded-xl border border-primary/20 p-2.5 shadow-sm shadow-primary/10 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 ${
          hideNameOnMobile ? "w-auto lg:w-full lg:px-4" : "w-full px-4"
        }`}
        iconLeft={
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-on-primary shadow-inner shadow-white/10">
            <UserIcon height={22} />
          </span>
        }
        iconRight={
          <AngleDownIcon
            className={`shrink-0 transition-transform duration-200 ${
              open ? "rotate-180" : "rotate-0"
            }`}
            height={20}
          />
        }
      >
        <span
          className={`min-w-0 flex-col items-start leading-tight ${
            hideNameOnMobile ? "hidden lg:flex" : "flex"
          }`}
        >
          <span className="w-36 truncate text-left text-sm font-semibold">
            {user?.full_name}
          </span>
          <span className="text-xs font-medium text-on-primary/75">
            Ver perfil
          </span>
        </span>
      </Button>

      <div
        className={`absolute right-0 top-14 z-50 w-72 overflow-hidden rounded-2xl border border-surface-container-highest bg-surface-container-lowest text-on-surface shadow-2xl shadow-primary/10 transition-all duration-200 ${
          open
            ? "translate-y-2 opacity-100"
            : "pointer-events-none translate-y-0 opacity-0"
        }`}
        role="menu"
      >
        <div className="auth-brand-panel p-4 text-on-primary">
          <div className="flex items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-on-primary/15">
              <UserIcon height={24} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-base font-bold">{user?.full_name}</p>
              <p className="truncate text-sm text-on-primary/80">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        <nav className="p-2">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-200 w-[90%] mx-auto"></div>

        <div className="p-2">
          <Button
            iconLeft={<LoginIcon height="24" />}
            type="button"
            className="justify-start rounded-xl px-4 py-3 text-left text-base font-medium  transition-colors"
            onClick={() => onLogout()}
            loading={logoutLoading}
            variant="danger"
          >
            Cerrar sesión
          </Button>
        </div>
      </div>
    </div>
  );
}
