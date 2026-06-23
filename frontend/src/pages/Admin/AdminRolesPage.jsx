import { useRoles } from '../../hooks/useRoles';
import RolesList from '../../components/ui/admin/RolesList';

export default function AdminRolesPage() {
  const { data: rolesData, isLoading } = useRoles();
  const roles = rolesData ?? [];

  return (
    <div className="px-10 py-10">
      <div className="max-full rounded-2xl border border-surface-container-highest bg-surface-container-lowest p-10 shadow-sm">
        <RolesList roles={roles} isLoading={isLoading} />
      </div>
    </div>
  );
}
