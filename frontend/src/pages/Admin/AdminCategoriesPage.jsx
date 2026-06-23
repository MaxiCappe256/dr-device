import { useGetCategories } from '../../hooks/useCategories';
import CategoriesList from '../../components/ui/admin/CategoriesList';

export default function AdminCategoriesPage() {
  const getCategories = useGetCategories();
  const categories = getCategories.data ?? [];

  return (
    <div className="px-10 py-10">
      <div className="w-full rounded-2xl border border-surface-container-highest bg-surface-container-lowest p-10 shadow-sm">
        <CategoriesList categories={categories} isLoading={getCategories.isLoading} />
      </div>
    </div>
  );
}
