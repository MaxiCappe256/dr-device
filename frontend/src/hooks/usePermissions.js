import { useQuery } from '@tanstack/react-query';
import permissions from '../api/permissions.js';

export function usePermissions() {
  return useQuery({
    queryKey: ['permissions'],
    queryFn: permissions.getPermissions,
  });
}
