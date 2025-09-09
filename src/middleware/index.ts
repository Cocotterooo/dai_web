import { defineMiddleware } from "astro:middleware";
import { supabase } from "../lib/supabase";
import { PERMISSIONS, hasPermission } from "../lib/permissions";
import micromatch from "micromatch";

const protectedRoutes = ["/profile(|/)", "/complete-profile(|/)"];
const adminRoutes = ["/admin/**"];
const redirectRoutes = ["/auth(|/)", "/signin(|/)", "/register(|/)"];

// Usar configuración de permisos del archivo centralizado
const roleProtectedRoutes = PERMISSIONS.ROUTES;

// Función para verificar roles con manejo mejorado de errores
async function safeCheckUserRoles(user: any, accessToken: string, refreshToken: string, requiredRoles: readonly string[]): Promise<boolean> {
  try {
    if (!accessToken || !refreshToken) {
      console.warn('🔍 No se pueden verificar roles: tokens no disponibles');
      return false;
    }

    console.log('🔍 Verificando roles para usuario:', user?.email);
    console.log('🎯 Roles requeridos:', requiredRoles);

    // Establecer timeout para la consulta de roles
    const rolePromise = supabase
      .auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      })
      .then(async ({ data: sessionData, error: sessionError }) => {
        if (sessionError || !sessionData.session) {
          throw new Error(`Error de sesión: ${sessionError?.message}`);
        }
        
        // Ejecutar la RPC con la sesión activa
        return await supabase.rpc('my_roles');
      });

    // Timeout más corto para evitar cuelgues en producción
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout verificando roles')), 2000); // Reducido de 3s a 2s
    });

    const { data: userRoles, error: rolesError } = await Promise.race([
      rolePromise,
      timeoutPromise
    ]) as any;

    if (rolesError) {
      console.error('❌ Error obteniendo roles del usuario:', rolesError.message);
      return false;
    }

    if (!userRoles || userRoles.length === 0) {
      console.log('📭 Usuario sin roles asignados');
      return false;
    }

    // Extraer IDs y nombres de roles del resultado
    const userRoleIds = userRoles.map((role: any) => String(role.role_id)).filter(Boolean);
    const userRoleNames = userRoles.map((role: any) => String(role.role_name)).filter(Boolean);
    
    console.log('👤 Roles del usuario:', { userRoleIds, userRoleNames });
    
    // Usar función centralizada de permisos
    const hasRequiredRole = hasPermission(userRoleIds, userRoleNames, requiredRoles);
    
    console.log(hasRequiredRole ? '✅ Usuario autorizado' : '❌ Usuario no autorizado');
    return hasRequiredRole;
    
  } catch (error) {
    console.error('❌ Error en verificación de roles:', error);
    return false;
  }
}

// Función para cachear roles de manera segura
async function safeCacheUserRoles(user: any, accessToken: string, refreshToken: string, locals: any) {
  try {
    if (!accessToken || !refreshToken) {
      console.warn('🔍 No se pueden cachear roles: tokens no disponibles');
      locals.userRoles = [];
      locals.userRoleIds = [];
      locals.userRoleNames = [];
      locals.isAdmin = false;
      return;
    }

    console.log('🔍 Iniciando cacheo de roles para usuario:', user?.email);

    // Establecer la sesión antes de ejecutar la RPC - con timeout más corto
    const sessionPromise = supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });

    const sessionTimeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout estableciendo sesión')), 2000);
    });

    const { data: sessionData, error: sessionError } = await Promise.race([
      sessionPromise,
      sessionTimeoutPromise
    ]) as any;

    if (sessionError || !sessionData.session) {
      console.error('❌ Error estableciendo sesión para cachear roles:', sessionError?.message);
      locals.userRoles = [];
      locals.userRoleIds = [];
      locals.userRoleNames = [];
      locals.isAdmin = false;
      return;
    }

    // Timeout más corto para el cacheo de roles
    const cachePromise = supabase.rpc('my_roles');
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout cacheando roles')), 1500); // Reducido de 2s a 1.5s
    });

    const { data: userRoles, error: rolesError } = await Promise.race([
      cachePromise,
      timeoutPromise
    ]) as any;
    
    if (!rolesError && userRoles && Array.isArray(userRoles)) {
      locals.userRoles = userRoles;
      locals.userRoleIds = userRoles.map((role: any) => String(role.role_id)).filter(Boolean);
      locals.userRoleNames = userRoles.map((role: any) => String(role.role_name)).filter(Boolean);
      
      console.log('🎭 Roles cacheados exitosamente:', {
        count: userRoles.length,
        roleNames: locals.userRoleNames
      });
      
    // Verificar si es admin (usar para locals.isAdmin)
    locals.isAdmin = userRoles.some((role: any) => {
      const roleName = role.role_name?.toLowerCase() || '';
      const roleId = role.role_id?.toLowerCase() || '';
      return roleName.includes('admin') || 
             roleName.includes('dai_delegate') ||
             roleName.includes('dai_secretary') ||
             roleName.includes('dai_printer');
    });
    } else {
      console.warn('⚠️ No se pudieron cachear roles:', rolesError?.message || 'Sin datos');
      locals.userRoles = [];
      locals.userRoleIds = [];
      locals.userRoleNames = [];
      locals.isAdmin = false;
    }
  } catch (error) {
    console.error('❌ Error cacheando roles:', error);
    locals.userRoles = [];
    locals.userRoleIds = [];
    locals.userRoleNames = [];
    locals.isAdmin = false;
  }
}

export const onRequest = defineMiddleware(async ({ locals, request, cookies, redirect, url }, next) => {
  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");
  const pathname = url.pathname;
  
  console.log('🚦 Middleware ejecutándose para ruta:', pathname);
  
  // Inicializar locals con valores por defecto
  locals.user = undefined;
  locals.email = undefined;
  locals.userRoles = [];
  locals.userRoleIds = [];
  locals.userRoleNames = [];
  locals.isAdmin = false;
  
  // Verificar sesión solo si tenemos tokens
  if (accessToken && refreshToken) {
    try {
      console.log('🔐 Verificando sesión...');
      
      // Timeout más corto para producción
      const sessionPromise = supabase.auth.getUser(accessToken.value);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Session timeout')), 3000); // Reducido de 5s a 3s
      });

      const { data, error } = await Promise.race([
        sessionPromise,
        timeoutPromise
      ]) as any;
      
      if (!error && data.user) {
        console.log('✅ Sesión válida para:', data.user.email);
        
        // Configurar datos del usuario
        locals.user = data.user;
        locals.email = data.user.email;
        
        // Intentar cachear roles pero no fallar si no se puede
        try {
          await safeCacheUserRoles(data.user, accessToken.value, refreshToken.value, locals);
        } catch (cacheError) {
          console.warn('⚠️ Error cacheando roles, continuando sin roles:', cacheError);
          // Continuar sin roles - mejor que fallar completamente
        }
        
      } else {
        console.warn('⚠️ Sesión inválida:', error?.message || 'Usuario no encontrado');
        // Limpiar cookies inválidas
        try {
          cookies.delete("sb-access-token", { path: "/" });
          cookies.delete("sb-refresh-token", { path: "/" });
        } catch (cookieError) {
          console.warn('⚠️ Error limpiando cookies:', cookieError);
        }
      }
    } catch (error) {
      console.error('❌ Error verificando sesión:', error);
      // En producción, es mejor continuar que fallar completamente
      try {
        cookies.delete("sb-access-token", { path: "/" });
        cookies.delete("sb-refresh-token", { path: "/" });
      } catch (cookieError) {
        console.warn('⚠️ Error limpiando cookies tras fallo de sesión:', cookieError);
      }
    }
  }

  // Redireccionar usuarios autenticados desde páginas de auth
  if (locals.user && micromatch.isMatch(pathname, redirectRoutes)) {
    console.log('🔄 Usuario autenticado redirigido desde auth a profile');
    return redirect("/profile");
  }

  // Proteger rutas que requieren autenticación
  if (micromatch.isMatch(pathname, protectedRoutes)) {
    if (!locals.user) {
      console.log('🚫 Acceso denegado a ruta protegida:', pathname);
      return redirect("/auth");
    }
  }

  // Verificar rutas que requieren roles específicos
  for (const [routePattern, requiredRoles] of Object.entries(roleProtectedRoutes)) {
    if (micromatch.isMatch(pathname, routePattern)) {
      console.log('🔐 Verificando permisos para ruta protegida:', pathname);
      
      if (!locals.user) {
        console.log('🚫 Usuario no autenticado intentando acceder a:', pathname);
        return redirect("/auth");
      }
      
      // Verificar roles de manera segura
      try {
        if (!accessToken || !refreshToken) {
          console.log('🚫 Tokens no disponibles para verificar permisos:', pathname);
          return redirect("/auth");
        }
        
        // Si ya tenemos roles cacheados, usarlos
        if (locals.userRoles && locals.userRoles.length > 0) {
          const userRoleIds = (locals.userRoleIds as unknown) as string[];
          const userRoleNames = (locals.userRoleNames as unknown) as string[];
          
          console.log('🎭 Verificando con roles cacheados:', { userRoleIds, userRoleNames });
          
          // Usar función centralizada de permisos
          const hasRequiredRole = hasPermission(userRoleIds, userRoleNames, requiredRoles);
          
          if (!hasRequiredRole) {
            console.log('🚫 Usuario sin permisos suficientes:', {
              pathname,
              userRoles: userRoleNames,
              requiredRoles
            });
            return redirect("/profile?error=insufficient_permissions");
          } else {
            console.log('✅ Usuario autorizado para:', pathname);
          }
        } else {
          // Si no hay roles cacheados, verificar en tiempo real
          console.log('⏳ Verificando roles en tiempo real...');
          const hasPermission = await safeCheckUserRoles(locals.user, accessToken.value, refreshToken.value, requiredRoles);
          if (!hasPermission) {
            console.log('🚫 Usuario sin permisos para acceder a:', pathname);
            return redirect("/profile?error=insufficient_permissions");
          }
        }
      } catch (error) {
        console.error('❌ Error verificando permisos para:', pathname, error);
        // En producción, es más seguro denegar acceso en caso de error crítico
        console.warn('⚠️ Denegando acceso debido a error en verificación de permisos');
        return redirect("/profile?error=permission_check_failed");
      }
      break;
    }
  }

  console.log('✅ Middleware completado - continuando...');
  return next();
});
