import { NavLink, useNavigate } from "react-router";
import { useDeleteAccount } from "../../../hooks/useAccount";
import Modal from "../shared/Modal";
import { useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Button from "../shared/Button";
import Logo from "../shared/Logo";
import { useLogout } from "../../../hooks/useAuth";
import {
  ArrowCloseIcon,
  UserIcon,
  DeleteIcon,
  SpecializationIcon,
  OrderIcon,
  ToolKitIcon,
  LoginIcon
} from "../../../utils/icons";

export default function AssideAccount({ isOpen = false, onClose }) {
  const deletedMutation = useDeleteAccount();
  const logoutMutation = useLogout();

  const [isModalActive, setIsModalActive] = useState(false);

  const {
    user: { data },
  } = useAuthContext();

  const { full_name, roles, email } = data;
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
      icon: OrderIcon,
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
          icon: ToolKitIcon,
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
    <>
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-80 shrink-0 flex-col border-r border-surface-container-highest bg-surface-container-lowest text-on-surface shadow-[4px_0_18px_rgba(11,28,48,0.06)] rounded-r-xl transition-transform duration-300 lg:sticky lg:z-auto lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
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

        <Logo to="/" className="px-5 py-6" onClick={onClose} />
        <nav className="mt-8 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-4 pb-4">
          {links.map((link) => {
            const Icon = link.icon;

            return link.danger ? (
              <Button
                type="button"
                variant="danger"
                key={link.label}
                className="mt-auto justify-start text-xl"
                onClick={() => setIsModalActive(true)}
              >
                <Icon className="size-6 shrink-0" />
                <span>{link.label}</span>
              </Button>
            ) : (
              <NavLink
                to={link.to}
                key={link.label}
                end={link.to === "/account"}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-4 rounded-md p-3 text-xl font-medium transition-colors",
                    isActive && !link.danger
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
          <div className="flex items-center justify-between rounded-lg border border-surface-container-highest px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-on-primary">
                <UserIcon height="28" />
              </div>
              <div className="min-w-0 flex flex-col">
                <span className="truncate text-md font-semibold text-on-surface">
                  {full_name}
                </span>
                <small className="truncate text-sm text-tertiary">{email}</small>
              </div>
            </div>
            <LoginIcon height="24" className="cursor-pointer transition-colors hover:text-error" onClick={() => logoutMutation.mutateAsync()} />
          </div>
        </nav>
      </aside>

        {isModalActive && (
          <Modal title={full_name} onClose={() => setIsModalActive(false)}>
            <div className="flex flex-col gap-2 h-full justify-between items-center">
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
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </Modal>
        )}
    </>
  );
}
