import { UserIcon, LockIcon } from "../../utils/icons";

const tabs = [
  {
    id: 'personal',
    label: 'Información personal',
    icon: UserIcon,
  },
  {
    id: 'security',
    label: 'Seguridad',
    icon: LockIcon,
  },
];

export default function AccountTabs({ activeTab, onTabChange }) {
  return (
    <div className="mt-12 border-b border-surface-container-highest">
      <div className="flex gap-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-3 border-b-3 px-10 py-4 text-xl font-medium transition-colors ${isActive
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-primary'
                }`}
            >
              <Icon className="size-5" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
