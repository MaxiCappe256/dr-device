import { NavLink } from 'react-router';
import { useAccount } from '../../hooks/useAccount';

const AccountIcon = ({ className = 'size-6' }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 20.25a7.5 7.5 0 0 1 15 0"
    />
  </svg>
);

const SpecializationIcon = ({ className = 'size-6' }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.25 6.75 3-3 3 3-3 3-3-3Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m3.75 16.5 3.75-3.75 3.75 3.75-3.75 3.75L3.75 16.5Z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12.75 14.25 6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 17.25h7.5" />
  </svg>
);

const DeleteIcon = ({ className = 'size-6' }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5h12" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 7.5V5.25h4.5V7.5"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 10.5v7.5m7.5-7.5v7.5"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 7.5 8.25 21h7.5l.75-13.5"
    />
  </svg>
);

export default function AssideAccount() {
  const { deletedMutation } = useAccount();
  const links = [
    {
      label: 'Cuenta',
      to: '/account',
      icon: AccountIcon,
    },
    {
      label: 'Especializaciones',
      to: '/account/specializations',
      icon: SpecializationIcon,
    },
    {
      label: 'Eliminar',
      to: '/',
      icon: DeleteIcon,
      danger: true,
    },
  ];

  return (
    <aside className="flex min-h-screen w-80 shrink-0 flex-col border-r border-surface-container-highest bg-surface-container-lowest text-on-surface shadow-[4px_0_18px_rgba(11,28,48,0.06)]">
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6V4h6v2" />
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

      <nav className="mt-8 flex flex-1 flex-col gap-2 px-4">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              to={link.to}
              key={link.label}
              className={({ isActive }) =>
                [
                  'flex items-center gap-4 rounded-xl px-5 py-4 text-xl font-medium transition-colors',
                  isActive && !link.danger
                    ? 'bg-primary-soft text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary',
                  link.danger
                    ? 'mt-auto text-error hover:bg-error-container hover:text-on-error-container'
                    : '',
                ].join(' ')
              }
              onClick={link.danger ? deletedMutation.mutateAsync : null}
            >
              <Icon className="size-6 shrink-0" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
