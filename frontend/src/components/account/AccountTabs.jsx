const UserIcon = ({ className = 'size-5' }) => (
  <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.25a7.5 7.5 0 0 1 15 0" />
  </svg>
);

const ShieldIcon = ({ className = 'size-5' }) => (
  <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75 18.75 6v5.25c0 4.05-2.7 7.8-6.75 9-4.05-1.2-6.75-4.95-6.75-9V6L12 3.75Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 12 1.5 1.5 3-3" />
  </svg>
);

const tabs = [
  {
    id: 'personal',
    label: 'Personal Data',
    icon: UserIcon,
  },
  {
    id: 'security',
    label: 'Security',
    icon: ShieldIcon,
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
              className={`flex items-center gap-3 border-b-3 px-10 py-4 text-xl font-medium transition-colors ${
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-primary'
              }`}
            >
              <Icon />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
