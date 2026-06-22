import { Link, NavLink, useNavigate } from "react-router";
import { useAccount } from "../../hooks/useAccount";
import Modal from "../ui/shared/Modal";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Button from "../ui/shared/Button";
import { useAuth } from "../../hooks/useAuth";
import {
  ArrowCloseIcon,
  UserIcon,
  DeleteIcon,
  SpecializationIcon,
} from "../../utils/icons";

export default function AssideAccount({ isOpen = false, onClose }) {
  const { deletedMutation } = useAccount();
  const { logoutMutation } = useAuth();

  const [isModalActive, setIsModalActive] = useState(false);

  const {
    user: { data },
  } = useAuthContext();

  const { full_name, roles } = data;
  const isTechnician = roles?.find((role) => role.title === "technician");
  const navigate = useNavigate();

  const links = [
    {
      label: "Cuenta",
      to: "/account",
      icon: UserIcon,
    },
    {
      label: "Ordenes",
      to: "/account/orders",
      icon: UserIcon,
    },
    ...(isTechnician
      ? [
        {
          label: "Especializaciones",
          to: "/account/specializations",
          icon: SpecializationIcon,
        },
        {
          label: "Trabajos",
          to: "/account/works",
          icon: UserIcon,
        },
      ]
      : []),
    {
      label: "Eliminar",
      icon: DeleteIcon,
      danger: true,
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-80 shrink-0 flex-col border-r border-surface-container-highest bg-surface-container-lowest text-on-surface shadow-[4px_0_18px_rgba(11,28,48,0.06)] transition-transform duration-300 lg:sticky lg:z-auto lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        type="button"
        className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary lg:hidden"
        onClick={onClose}
        aria-label="Cerrar menú de cuenta"
      >
        <ArrowCloseIcon className="size-6" />
      </button>

      <Link to="/" onClick={onClose}>
        <div className="flex items-center gap-4 px-5 py-6">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-on-primary shadow-lg shadow-primary/25">
            <svg
              aria-hidden="true"
              className="size-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6V4h6v2"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 6h14v14H5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10v6m-3-3h6"
              />
            </svg>
          </div>

          <div>
            <p className="text-2xl font-bold leading-6 text-primary">
              Dr. Device
            </p>
          </div>
        </div>
      </Link>
      <nav className="mt-8 flex flex-1 flex-col gap-2 px-4">
        {links.map((link) => {
          const Icon = link.icon;

          return link.danger ? (
            <button
              type="button"
              key={link.label}
              className="mt-auto flex cursor-pointer items-center gap-4 rounded-xl px-5 py-4 text-left text-xl font-medium text-error transition-colors hover:bg-error-container hover:text-on-error-container"
              onClick={() => setIsModalActive(true)}
            >
              <Icon className="size-6 shrink-0" />
              <span>{link.label}</span>
            </button>
          ) : (
            <NavLink
              to={link.to}
              key={link.label}
              end={link.to === "/account"}
              className={({ isActive }) =>
                [
                  "flex items-center gap-4 rounded-xl px-5 py-4 text-xl font-medium transition-colors",
                  isActive && !link.danger
                    ? "bg-primary-soft text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary",
                  link.danger
                    ? "mt-auto text-error hover:bg-error-container hover:text-on-error-container"
                    : "",
                ].join(" ")
              }
              onClick={onClose}
            >
              <Icon className="size-6 shrink-0" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
      {isModalActive && (
        <Modal title={full_name} onClose={() => setIsModalActive(false)}>
          <div className="flex flex-col h-full justify-between items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">
                ¿Deseas eliminar tu cuenta?
              </h3>
              <p className="text-lg">
                Al confirmar tu cuenta quedara suspendida durante 30 días, para
                volver a activarla deberás volver a iniciar sesión con las
                mismas credenciales.
              </p>
            </div>

            <div className="flex gap-10 items-center jusitfy-between w-full">
              <Button
                onClick={() => {
                  deletedMutation.mutateAsync();
                  setIsModalActive(false);
                  navigate("/auth/login");
                  logoutMutation.mutateAsync();
                }}
                loading={logoutMutation.isPending}
                variant="danger"
                className="text-white"
              >
                Eliminar
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </aside>
  );
}
