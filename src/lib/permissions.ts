// Configuración de permisos para rutas y elementos de la UI
export const PERMISSIONS = {
  // Roles disponibles
  ROLES: {
    ADMIN: 'admin',
    DAI_DELEGATE: 'dai_delegate', 
    DAI_SECRETARY: 'dai_secretary',
    DAI_COMMUNICATION_COORD: 'dai_communication_coord',
    DAI_FREE_MEMBER: 'dai_free_member',
    DAI_SUBDELEGATE: 'dai_subdelegate',
    DAI_PRINTER: 'dai_printer'
  },

  // Configuración de rutas protegidas por roles
  ROUTES: {
    '/admin/**': ['admin', 'dai_communication_coord', 'dai_delegate', 'dai_secretary', 'dai_free_member', 'dai_subdelegate', 'dai_printer'],
    '/admin/users/**': ['admin', 'dai_delegate', 'dai_secretary'], 
    '/admin': ['admin', 'dai_communication_coord', 'dai_delegate', 'dai_secretary', 'dai_printer']
  },

  // Permisos para elementos de la sidebar organizados por secciones
  SIDEBAR: {
    // Sección Dashboard/Gestión principal
    dashboard: ['admin', 'dai_delegate', 'dai_secretary', 'dai_communication_coord', 'dai_free_member', 'dai_subdelegate', 'dai_printer'],
    
    // Sección Locales
    prints: ['admin', 'dai_delegate', 'dai_secretary', 'dai_printer'],
    loans: ['admin', 'dai_delegate', 'dai_secretary', 'dai_printer'],
    lockers: ['admin', 'dai_delegate', 'dai_secretary', 'dai_printer'],
    
    // Sección Gestión
    users: ['admin', 'dai_delegate', 'dai_secretary'],
    roles: ['admin', 'dai_delegate', 'dai_secretary'],
    events: ['admin', 'dai_delegate', 'dai_secretary', 'dai_communication_coord'],
    
    // Sección Sistema
    settings: ['admin', 'dai_delegate'],
    logs: ['admin', 'dai_delegate']
  }
} as const;

/**
 * Verifica si un usuario tiene permisos para acceder a una funcionalidad específica
 */
export function hasPermission(
  userRoleIds: string[],
  userRoleNames: string[], 
  requiredRoles: readonly string[]
): boolean {
  if (!userRoleIds.length && !userRoleNames.length) {
    return false;
  }

  return requiredRoles.some(requiredRole => {
    // Verificar por ID de rol
    if (userRoleIds.includes(requiredRole)) {
      return true;
    }

    // Verificar por nombre de rol con diferentes formatos
    const normalizedRequired = requiredRole.toLowerCase().replace(/[-_]/g, '_');
    return userRoleNames.some(roleName => {
      const normalizedRoleName = roleName.toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/-/g, '_')
        .replace(/\./g, '_');
      
      return normalizedRoleName === normalizedRequired ||
             roleName.toLowerCase() === requiredRole.toLowerCase() ||
             normalizedRoleName.includes(normalizedRequired) ||
             normalizedRequired.includes(normalizedRoleName);
    });
  });
}

/**
 * Verifica si un usuario puede ver una sección específica de la sidebar
 */
export function canViewSidebarSection(
  userRoleIds: string[],
  userRoleNames: string[],
  sectionKey: keyof typeof PERMISSIONS.SIDEBAR
): boolean {
  const requiredRoles = PERMISSIONS.SIDEBAR[sectionKey];
  return hasPermission(userRoleIds, userRoleNames, requiredRoles);
}

/**
 * Verifica si una sección tiene al menos un elemento visible para el usuario
 */
export function hasSectionVisibleItems(
  userRoleIds: string[],
  userRoleNames: string[],
  sectionItems: readonly (keyof typeof PERMISSIONS.SIDEBAR)[]
): boolean {
  return sectionItems.some(item => 
    canViewSidebarSection(userRoleIds, userRoleNames, item)
  );
}

// Agrupaciones de elementos por sección para facilitar la verificación de visibilidad
export const SIDEBAR_SECTIONS = {
  locales: ['prints', 'loans', 'lockers'] as const,
  gestion: ['users', 'roles', 'events'] as const, 
  sistema: ['settings', 'logs'] as const
} as const;
