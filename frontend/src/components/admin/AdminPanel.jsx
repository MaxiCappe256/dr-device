import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { useRoles } from '../../hooks/useRoles';
import { useUsersList } from '../../hooks/useUsers';
import { useCategories } from '../../hooks/useCategories';
import { UserIcon, ToolKitIcon, SecurityIcon, SpecializationIcon } from '../../utils/icons';
import AdminSidebar from './AdminSidebar';
import UsersByRole from './UsersByRole';
import RolesList from './RolesList';
import CategoriesList from './CategoriesList';

const roleIconMap = {
  user: UserIcon,
  technician: ToolKitIcon,
};

const sidebarLinks = [
  { id: 'users', label: 'Usuarios', icon: UserIcon },
  { id: 'roles', label: 'Roles', icon: SecurityIcon },
  { id: 'categories', label: 'Categorías', icon: SpecializationIcon },
];

export default function AdminPanel() {

  const { logoutMutation } = useAuth();
  const navigate = useNavigate();
  const { data: rolesData, isLoading: rolesLoading } = useRoles();
  const { data: usersData, isLoading: usersLoading } = useUsersList();
  const { getCategories } = useCategories();

  const roles = rolesData ?? [];
  const users = usersData?.users ?? [];
  const categories = getCategories.data ?? [];

  const nonAdminRoles = roles.filter((r) => r.title !== 'admin');

  const [activeTab, setActiveTab] = useState('users');
  const [selectedRole, setSelectedRole] = useState(null);

  const handleLogout = () => {
    logoutMutation.mutateAsync();
    navigate('/auth/login');
  };

  return (
    <AdminSidebar
      links={sidebarLinks}
      activeTab={activeTab}
      onTabChange={(tab) => {
        setActiveTab(tab);
        setSelectedRole(null);
      }}
      isLoading={rolesLoading}
      onLogout={handleLogout}
    >
      <div className="px-10 py-10">
        <div className="max-w-5xl rounded-2xl border border-surface-container-highest bg-surface-container-lowest p-10 shadow-sm">
          {activeTab === 'users' && !selectedRole && (
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Usuarios por rol</h2>
              <div className="space-y-3">
                {nonAdminRoles.map((role) => {
                  const Icon = roleIconMap[role.title] || UserIcon;

                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className="flex w-full items-center gap-4 rounded-xl border border-surface-container-highest px-6 py-5 text-xl font-medium capitalize transition-colors hover:bg-surface-container-low cursor-pointer text-left"
                    >
                      <Icon className="size-6 shrink-0 text-primary" />
                      <span>{role.label || role.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'users' && selectedRole && (
            <div>
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="mb-4 text-lg font-semibold text-primary hover:underline cursor-pointer"
              >
                ← Volver a roles
              </button>
              <UsersByRole role={selectedRole} users={users} isLoading={usersLoading} />
            </div>
          )}
          {activeTab === 'roles' && (
            <RolesList roles={roles} isLoading={rolesLoading} />
          )}
          {activeTab === 'categories' && (
            <CategoriesList categories={categories} isLoading={getCategories.isLoading} />
          )}
        </div>
      </div>
    </AdminSidebar>
  );
}
