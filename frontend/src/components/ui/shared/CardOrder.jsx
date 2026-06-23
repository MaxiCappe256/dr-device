import { CATEGORY_TELEFONO, CATEGORY_PC, CATEGORY_NOTEBOOK, CATEGORY_PANTALLA } from "../../../constants/categoryIcons.js"
import { ToolKitIcon, SmartPhoneIcon, DesktopIcon, LaptopIcon, GameConsoleIcon } from "../../../utils/icons.js";
import Tag from "./Tag.jsx";

export default function CardOrder({ id, title, description, children, status, category }) {
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
    <div className="flex  justify-between items-center bg-white p-7 rounded-lg border border-surface-container-highest ">
      <div className="flex items-center gap-4 w-[70%]">
        <div className="bg-surface-tint/20 p-4 rounded-lg">
          {currentCategory.icon}
        </div>

        <div className="p-2 flex flex-col gap-2 pr-5 ">
          {id && <small className="font-semibold text-on-surface-variant/80">ID: {id}</small>}
          <div className="flex items-center gap-5">
            <h2 className="text-xl font-semibold">{title}</h2>
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

      {children}
    </div>
  );
}
