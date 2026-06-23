import { CATEGORY_TELEFONO, CATEGORY_PC, CATEGORY_NOTEBOOK, CATEGORY_PANTALLA } from "../../../constants/categoryIcons.js"
import { ToolKitIcon, SmartPhoneIcon, DesktopIcon, LaptopIcon, GameConsoleIcon, DateIcon, MoreIcon, OfferIcon } from "../../../utils/icons.js";
import Tag from "./Tag.jsx";

export default function CardOrder({ id, title, description, status, category, user, createdAt, onDetails, onViewOffers }) {
  const normalizeStatus = {
    SEARCHING: { label: "En búsqueda", color: "#7C3AED" },
    PENDING: { label: "Pendiente", color: "#B45309" },
    COMPLETED: { label: "Completado", color: "#047857" },
    IN_PROGRESS: { label: "En progreso", color: "#1D4ED8" },
    CANCELLED: { label: "Cancelado", color: "#B91C1C" },
    ACCEPTED: { label: "Aceptado", color: "#047857" },
    REJECTED: { label: "Rechazado", color: "#B91C1C" },
  };

  const categoryIcons = {
    [CATEGORY_TELEFONO]: { icon: <SmartPhoneIcon className="text-surface-tint " height="60" /> },
    [CATEGORY_PC]: { icon: <DesktopIcon className="text-surface-tint " height="60" /> },
    [CATEGORY_NOTEBOOK]: { icon: <LaptopIcon className="text-surface-tint " height="60" /> },
    [CATEGORY_PANTALLA]: { icon: <GameConsoleIcon className="text-surface-tint " height="60" /> },
  }
  const defaultIcon = { icon: <ToolKitIcon className="text-surface-tint " height="60" /> }
  const currentCategory = categoryIcons[category] ?? defaultIcon

  return (
    <div className="flex flex-col items-start gap-2 bg-white p-5 rounded-lg border border-surface-container-highest">
      {user && <span className="text-sm">Publicada por <strong className="text-primary">{user}</strong></span>}
      <div className="flex items-start gap-4 w-full">
        <div className="flex items-center justify-center bg-surface-tint/20 p-4 rounded-lg size-30">
          {currentCategory.icon}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-semibold">{title}</h2>
            <div className="flex items-center gap-2 ">
              {onViewOffers && <div className="flex items-center gap-2 p-2 bg-primary text-white rounded-full transition-colors hover:bg-on-surface-variant/50 cursor-pointer" onClick={onViewOffers}>
                <OfferIcon height="24" />
                Ver ofertas
              </div>}
              {onDetails && <div className="p-2 bg-on-surface-variant/20 rounded-full transition-colors hover:bg-on-surface-variant/50 cursor-pointer" onClick={onDetails}>
                <MoreIcon height="24" />
              </div>}
            </div>
          </div>
          <div className="flex items-center gap-5">
            {createdAt && <div className="flex items-center gap-2 text-sm text-on-surface-variant">
              <DateIcon height="20" />
              <span>{new Date(createdAt).toLocaleDateString("es-AR")}</span>
            </div>}
            {status && (
              <Tag
                color={normalizeStatus[status].color}
                label={normalizeStatus[status].label}
              />
            )}
          </div>
          <p className="line-clamp-2 text-on-surface-variant">{description}</p>
        </div>
      </div>

      {id && <small className="font-semibold text-on-surface-variant/80">ID: {id}</small>}
    </div>
  );
}
