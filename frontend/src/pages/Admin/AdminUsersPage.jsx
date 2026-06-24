import { useParams, useNavigate, NavLink } from 'react-router';
import { useRoles } from '../../hooks/useRoles';
import { useUsersList } from '../../hooks/useUsers';
import { UserIcon, ToolKitIcon, ArrowRightIcon } from '../../utils/icons';
import UsersByRole from '../../components/ui/admin/UsersByRole';

const roleIconMap = {
  user: UserIcon,
  technician: ToolKitIcon,
};

export default function AdminUsersPage() {
  const { roleName } = useParams();
  const navigate = useNavigate();
  const { data: rolesData, isLoading: rolesLoading } = useRoles();
  const { data: usersData, isLoading: usersLoading } = useUsersList();

  const roles = rolesData ?? [];
  const users = usersData?.users ?? [];
  const nonAdminRoles = roles.filter((r) => r.title !== 'admin');

  const selectedRole = roleName
    ? roles.find((r) => r.title === roleName)
    : null;

  if (roleName && selectedRole) {
    return (
      <div className="px-10 py-10">
        <div className="w-full rounded-2xl border border-surface-container-highest bg-surface-container-lowest p-10 shadow-sm">
          <button
            type="button"
            onClick={() => navigate('/admin-panel/users')}
            className="mb-4 flex items-center text-lg font-semibold text-primary hover:underline cursor-pointer"
          >
            <ArrowRightIcon className='rotate-180' height='24'/>
            Volver a roles
          </button>
          <UsersByRole role={selectedRole} users={users} isLoading={usersLoading} />
        </div>
      </div>
    );
  }

  return (
    <div className="px-10 py-10">
      <div className="max-w-full rounded-2xl border border-surface-container-highest bg-surface-container-lowest p-10 shadow-sm">
        <h2 className="text-2xl font-bold text-primary mb-6">Usuarios por rol</h2>

        {rolesLoading ? (
          <p className="text-lg text-tertiary">Cargando roles...</p>
        ) : (
          <div className="space-y-3">
            {nonAdminRoles.map((role) => {
              const Icon = roleIconMap[role.title] || UserIcon;

              return (
                <NavLink
                  key={role.id}
                  to={`/admin-panel/users/${role.title}`}
                  className="flex w-full items-center gap-4 rounded-lg border border-surface-container-highest px-6 py-5 text-xl font-medium capitalize transition-colors hover:bg-surface-container-low text-left"
                >
                  <Icon className="size-6 shrink-0 text-primary" />
                  <span>{role.label || role.title}</span>
                </NavLink>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
