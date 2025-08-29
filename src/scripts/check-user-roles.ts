import { supabase } from '../lib/supabase';
import { checkAdminPermissions, getUserRoles } from '../lib/auth-utils';

/**
 * Script para verificar los roles y permisos de un usuario
 * Usa organization.roles en lugar de delegation_positions
 */
export async function checkUserRoles(userId: string) {
  try {
    console.log('🔍 Verificando roles para usuario:', userId);

    // Verificar permisos administrativos
    const { isAdmin, roles, adminLevel } = await checkAdminPermissions(userId);
    
    console.log('📋 Resultado de verificación:', {
      userId,
      isAdmin,
      adminLevel,
      roles,
    });

    // Obtener roles detallados
    const userRoles = await getUserRoles(userId);
    
    console.log('📊 Roles detallados:', userRoles.map(role => ({
      id: role.id,
      roleName: role.roles?.name,
      groupId: role.group_id,
      createdAt: role.created_at,
    })));

    return {
      isAdmin,
      adminLevel,
      roles,
      detailedRoles: userRoles,
    };

  } catch (error) {
    console.error('❌ Error verificando roles:', error);
    throw error;
  }
}

/**
 * Función para verificar roles desde el navegador
 */
export async function checkCurrentUserRoles() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      console.error('❌ No hay usuario autenticado:', error);
      return null;
    }

    return await checkUserRoles(user.id);
  } catch (error) {
    console.error('❌ Error verificando roles del usuario actual:', error);
    return null;
  }
}