// TODO: Crear y pensar permisos faltantes.

export const PERMISSIONS_LIST = {
  ORDER: {
    CREATE: 'order:create',
    READ: 'order:read',
    LIST_READ: 'order:list_read',
    CANCEL: 'order:cancel',
    FINISH: 'order:finish',
  },
  USER: {
    CREATE: 'user:create',
    READ: 'user:read',
    LIST_READ: 'user:list_read',
    UPDATE: 'user:update',
    DELETE: 'user:delete',
  },
  ADMIN: {
    CREATE: 'admin:create'
  },
  CATEGORY: {
    CREATE: 'category:create',
    READ: 'category:read',
    LIST_READ: 'category:list_read',
    UPDATE: 'category:update',
    DELETE: 'category:delete',
  },
  ROLE: {
    CREATE: 'role:create',
    READ: 'role:read',
    LIST_READ: 'role:list_read',
    UPDATE: 'role:update',
    DELETE: 'role:delete',
  },
  PERMISSION: {
    CREATE: 'permission:create',
    READ: 'permission:read',
    LIST_READ: 'permission:list_read',
    UPDATE: 'permission:update',
    DELETE: 'permission:delete',
  },
  OFFER: {
    CREATE: 'offer:create',
    READ: 'offer:read',
    LIST_READ: 'offer:list_read',
    ACCEPT: 'offer:accept',
    CANCEL: 'offer:cancel',
  },
  SPECIALIZATION: {
    CREATE: 'specialization:create',
    UPDATE: 'specialization:update',
  },
};