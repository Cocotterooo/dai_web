import { supabase } from "./supabase";

export interface UserRole {
  id: string;
  user_id: string;
  role_id: number;
  group_id: number | null;
  created_at: string;
  active?: boolean;
  start_date?: string;
  end_date?: string;
  delegation_positions?: {
    id: number;
    name: string;
    category: string;
    description?: string;
  };
  roles?: {
    id: number;
    name: string;
  };
  groups?: {
    id: number;
    year: number;
    degree_id: number;
    branch: string;
    site: string;
  };
}

export interface AdminCheckResult {
  isAdmin: boolean;
  roles: string[];
  positions?: string[];
  adminLevel: 'admin' | 'delegado' | 'secretario' | 'coordinador' | 'none';
}

/**
 * Verifica si un usuario tiene permisos administrativos basado en organization.roles
 */
export async function checkAdminPermissions(userId: string): Promise<AdminCheckResult> {
  try {
    // Obtener roles del usuario desde organization.user_roles
    const { data: userRoles, error: rolesError } = await supabase
      .from('organization.user_roles')
      .select(`
        id,
        user_id,
        role_id,
        group_id,
        created_at
      `)
      .eq('user_id', userId);

    if (rolesError || !userRoles) {
      console.error('Error obteniendo roles del usuario:', rolesError);
      return { isAdmin: false, roles: [], adminLevel: 'none' };
    }

    // Obtener información de los roles
    const roleIds = userRoles.map(ur => ur.role_id).filter(Boolean);
    let rolesData: any[] = [];

    if (roleIds.length > 0) {
      const { data: roles } = await supabase
        .from('organization.roles')
        .select('id, name')
        .in('id', roleIds);
      rolesData = roles || [];
    }

    // Extraer nombres de roles
    const roles = rolesData.map(role => role.name?.toLowerCase()).filter(Boolean);

    console.log('🔍 Roles encontrados:', roles);

    // Definir roles administrativos en orden de jerarquía
    const adminRoles = {
      admin: ['admin'],
      delegado: ['delegado'],
      secretario: ['secretario'],
      coordinador: ['coord_comunicacion', 'coord_ocio_deportes', 'coord_asuntos_externos', 'coord_infraestructuras']
    };

    // Verificar nivel administrativo (del más alto al más bajo)
    let adminLevel: AdminCheckResult['adminLevel'] = 'none';
    let isAdmin = false;

    if (roles.some(role => adminRoles.admin.includes(role))) {
      adminLevel = 'admin';
      isAdmin = true;
    } else if (roles.some(role => adminRoles.delegado.includes(role))) {
      adminLevel = 'delegado';
      isAdmin = true;
    } else if (roles.some(role => adminRoles.secretario.includes(role))) {
      adminLevel = 'secretario';
      isAdmin = true;
    } else if (roles.some(role => adminRoles.coordinador.includes(role))) {
      adminLevel = 'coordinador';
      isAdmin = true;
    }

    console.log('✅ Resultado verificación admin:', { userId, isAdmin, adminLevel, roles });

    return {
      isAdmin,
      roles,
      positions: roles, // Por compatibilidad, positions será igual a roles
      adminLevel
    };

  } catch (error) {
    console.error('Error verificando permisos administrativos:', error);
    return { isAdmin: false, roles: [], positions: [], adminLevel: 'none' };
  }
}

/**
 * Verifica si un usuario tiene un rol específico
 */
export async function hasRole(userId: string, roleName: string): Promise<boolean> {
  try {
    // Obtener roles del usuario
    const { data: userRoles, error } = await supabase
      .from('organization.user_roles')
      .select('role_id')
      .eq('user_id', userId);

    if (error || !userRoles?.length) {
      return false;
    }

    // Obtener información del rol
    const roleIds = userRoles.map(ur => ur.role_id);
    const { data: roles, error: rolesError } = await supabase
      .from('organization.roles')
      .select('id, name')
      .in('id', roleIds)
      .eq('name', roleName);

    return !rolesError && !!roles?.length;
  } catch (error) {
    console.error(`Error verificando rol ${roleName}:`, error);
    return false;
  }
}

/**
 * Obtiene todos los roles de un usuario con información detallada
 */
export async function getUserRoles(userId: string): Promise<UserRole[]> {
  try {
    const { data: userRoles, error } = await supabase
      .from('organization.user_roles')
      .select(`
        id,
        user_id,
        role_id,
        group_id,
        created_at
      `)
      .eq('user_id', userId);

    if (error) {
      console.error('Error obteniendo roles del usuario:', error);
      return [];
    }

    // Obtener información de roles por separado
    const roleIds = userRoles?.map(ur => ur.role_id).filter(Boolean) || [];
    const groupIds = userRoles?.map(ur => ur.group_id).filter(Boolean) || [];

    let rolesData: any[] = [];
    let groupsData: any[] = [];

    if (roleIds.length > 0) {
      const { data: roles } = await supabase
        .from('organization.roles')
        .select('id, name')
        .in('id', roleIds);
      rolesData = roles || [];
    }

    if (groupIds.length > 0) {
      const { data: groups } = await supabase
        .from('organization.groups')
        .select('id, year, degree_id, branch, site')
        .in('id', groupIds);
      groupsData = groups || [];
    }

    return (userRoles || []).map(role => ({
      id: role.id,
      user_id: role.user_id,
      role_id: role.role_id,
      group_id: role.group_id,
      created_at: role.created_at,
      roles: rolesData.find(r => r.id === role.role_id),
      groups: groupsData.find(g => g.id === role.group_id)
    })) as UserRole[];
  } catch (error) {
    console.error('Error obteniendo roles del usuario:', error);
    return [];
  }
}

/**
 * Verifica si un usuario puede acceder al panel de administración
 */
export async function canAccessAdmin(userId: string): Promise<boolean> {
  const { isAdmin } = await checkAdminPermissions(userId);
  return isAdmin;
}
