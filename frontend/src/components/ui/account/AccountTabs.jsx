import { UserIcon, LockIcon } from "../../../utils/icons";

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
    <div className="mt-8 w-full overflow-x-auto border-b border-surface-container-highest sm:mt-12">
      <div className="flex w-full min-w-max justify-start gap-2 sm:gap-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex cursor-pointer items-center gap-2 border-b-3 px-4 py-4 text-base font-medium transition-colors sm:gap-3 sm:px-10 sm:text-xl ${
                isActive
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
