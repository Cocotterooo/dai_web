import { d as defineMiddleware, s as sequence } from './chunks/index_CpSvxrxe.mjs';
import { s as supabase } from './chunks/supabase_CcsmWd0j.mjs';
import micromatch from 'micromatch';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_CEbxiMXW.mjs';
import 'kleur/colors';
import './chunks/astro/server_BKdtxvi7.mjs';
import 'clsx';
import 'cookie';

const protectedRoutes = ["/profile(|/)", "/complete-profile(|/)"];
const redirectRoutes = ["/auth(|/)", "/signin(|/)", "/register(|/)"];
const roleProtectedRoutes = {
  "/admin/**": ["admin", "dai_communication_coord"],
  "/admin/users/**": [1, 2],
  "/delegation/**": [1, 2, 3, 4],
  "/coordination/**": [1, 2, 5, 6, 7, 8]
};
async function safeCheckUserRoles(user, accessToken, refreshToken, requiredRoles) {
  try {
    if (!accessToken || !refreshToken) {
      console.warn("🔍 No se pueden verificar roles: tokens no disponibles");
      return false;
    }
    console.log("🔍 Verificando roles para usuario:", user?.email);
    console.log("🎯 Roles requeridos:", requiredRoles);
    const rolePromise = supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    }).then(async ({ data: sessionData, error: sessionError }) => {
      if (sessionError || !sessionData.session) {
        throw new Error(`Error de sesión: ${sessionError?.message}`);
      }
      return await supabase.rpc("my_roles");
    });
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Timeout verificando roles")), 2e3);
    });
    const { data: userRoles, error: rolesError } = await Promise.race([
      rolePromise,
      timeoutPromise
    ]);
    if (rolesError) {
      console.error("❌ Error obteniendo roles del usuario:", rolesError.message);
      return false;
    }
    if (!userRoles || userRoles.length === 0) {
      console.log("📭 Usuario sin roles asignados");
      return false;
    }
    const userRoleIds = userRoles.map((role) => role.role_id).filter(Boolean);
    const userRoleNames = userRoles.map((role) => role.role_name).filter(Boolean);
    console.log("👤 Roles del usuario:", { userRoleIds, userRoleNames });
    const hasRequiredRole = requiredRoles.some((requiredRole) => {
      if (typeof requiredRole === "string") {
        return userRoleNames.some((roleName) => roleName.toLowerCase() === requiredRole.toLowerCase());
      } else if (typeof requiredRole === "number") {
        return userRoleIds.includes(requiredRole);
      }
      return false;
    });
    console.log(hasRequiredRole ? "✅ Usuario autorizado" : "❌ Usuario no autorizado");
    return hasRequiredRole;
  } catch (error) {
    console.error("❌ Error en verificación de roles:", error);
    return false;
  }
}
async function safeCacheUserRoles(user, accessToken, refreshToken, locals) {
  try {
    if (!accessToken || !refreshToken) {
      console.warn("🔍 No se pueden cachear roles: tokens no disponibles");
      locals.userRoles = [];
      locals.userRoleIds = [];
      locals.userRoleNames = [];
      locals.isAdmin = false;
      return;
    }
    console.log("🔍 Iniciando cacheo de roles para usuario:", user?.email);
    const sessionPromise = supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });
    const sessionTimeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Timeout estableciendo sesión")), 2e3);
    });
    const { data: sessionData, error: sessionError } = await Promise.race([
      sessionPromise,
      sessionTimeoutPromise
    ]);
    if (sessionError || !sessionData.session) {
      console.error("❌ Error estableciendo sesión para cachear roles:", sessionError?.message);
      locals.userRoles = [];
      locals.userRoleIds = [];
      locals.userRoleNames = [];
      locals.isAdmin = false;
      return;
    }
    const cachePromise = supabase.rpc("my_roles");
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Timeout cacheando roles")), 1500);
    });
    const { data: userRoles, error: rolesError } = await Promise.race([
      cachePromise,
      timeoutPromise
    ]);
    if (!rolesError && userRoles && Array.isArray(userRoles)) {
      locals.userRoles = userRoles;
      locals.userRoleIds = userRoles.map((role) => role.role_id).filter(Boolean);
      locals.userRoleNames = userRoles.map((role) => role.role_name).filter(Boolean);
      console.log("🎭 Roles cacheados exitosamente:", {
        count: userRoles.length,
        roleNames: locals.userRoleNames
      });
      locals.isAdmin = userRoles.some(
        (role) => role.role_name?.toLowerCase() === "admin" || role.role_name?.toLowerCase() === "delegado"
      );
    } else {
      console.warn("⚠️ No se pudieron cachear roles:", rolesError?.message || "Sin datos");
      locals.userRoles = [];
      locals.userRoleIds = [];
      locals.userRoleNames = [];
      locals.isAdmin = false;
    }
  } catch (error) {
    console.error("❌ Error cacheando roles:", error);
    locals.userRoles = [];
    locals.userRoleIds = [];
    locals.userRoleNames = [];
    locals.isAdmin = false;
  }
}
const onRequest$1 = defineMiddleware(async ({ locals, request, cookies, redirect, url }, next) => {
  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");
  const pathname = url.pathname;
  console.log("🚦 Middleware ejecutándose para ruta:", pathname);
  locals.user = void 0;
  locals.email = void 0;
  locals.userRoles = [];
  locals.userRoleIds = [];
  locals.userRoleNames = [];
  locals.isAdmin = false;
  if (accessToken && refreshToken) {
    try {
      console.log("🔐 Verificando sesión...");
      const sessionPromise = supabase.auth.getUser(accessToken.value);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Session timeout")), 3e3);
      });
      const { data, error } = await Promise.race([
        sessionPromise,
        timeoutPromise
      ]);
      if (!error && data.user) {
        console.log("✅ Sesión válida para:", data.user.email);
        locals.user = data.user;
        locals.email = data.user.email;
        try {
          await safeCacheUserRoles(data.user, accessToken.value, refreshToken.value, locals);
        } catch (cacheError) {
          console.warn("⚠️ Error cacheando roles, continuando sin roles:", cacheError);
        }
      } else {
        console.warn("⚠️ Sesión inválida:", error?.message || "Usuario no encontrado");
        try {
          cookies.delete("sb-access-token", { path: "/" });
          cookies.delete("sb-refresh-token", { path: "/" });
        } catch (cookieError) {
          console.warn("⚠️ Error limpiando cookies:", cookieError);
        }
      }
    } catch (error) {
      console.error("❌ Error verificando sesión:", error);
      try {
        cookies.delete("sb-access-token", { path: "/" });
        cookies.delete("sb-refresh-token", { path: "/" });
      } catch (cookieError) {
        console.warn("⚠️ Error limpiando cookies tras fallo de sesión:", cookieError);
      }
    }
  }
  if (locals.user && micromatch.isMatch(pathname, redirectRoutes)) {
    console.log("🔄 Usuario autenticado redirigido desde auth a profile");
    return redirect("/profile");
  }
  if (micromatch.isMatch(pathname, protectedRoutes)) {
    if (!locals.user) {
      console.log("🚫 Acceso denegado a ruta protegida:", pathname);
      return redirect("/auth");
    }
  }
  for (const [routePattern, requiredRoles] of Object.entries(roleProtectedRoutes)) {
    if (micromatch.isMatch(pathname, routePattern)) {
      if (!locals.user) {
        console.log("🚫 Usuario no autenticado intentando acceder a:", pathname);
        return redirect("/auth");
      }
      try {
        if (!accessToken || !refreshToken) {
          console.log("🚫 Tokens no disponibles para verificar permisos:", pathname);
          return redirect("/auth");
        }
        if (locals.userRoles && locals.userRoles.length > 0) {
          const hasRequiredRole = requiredRoles.some((requiredRole) => {
            if (typeof requiredRole === "string") {
              return locals.userRoleNames && locals.userRoleNames.some((roleName) => roleName.toLowerCase() === requiredRole.toLowerCase());
            } else if (typeof requiredRole === "number") {
              return locals.userRoleIds && locals.userRoleIds.includes(requiredRole);
            }
            return false;
          });
          if (!hasRequiredRole) {
            console.log("🚫 Usuario sin permisos (roles cacheados):", pathname);
            return redirect("/profile?error=insufficient_permissions");
          }
        } else {
          const hasPermission = await safeCheckUserRoles(locals.user, accessToken.value, refreshToken.value, requiredRoles);
          if (!hasPermission) {
            console.log("🚫 Usuario sin permisos para acceder a:", pathname);
            return redirect("/profile?error=insufficient_permissions");
          }
        }
      } catch (error) {
        console.error("❌ Error verificando permisos para:", pathname, error);
        console.warn("⚠️ Denegando acceso debido a error en verificación de permisos");
        return redirect("/profile?error=permission_check_failed");
      }
      break;
    }
  }
  console.log("✅ Middleware completado - continuando...");
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
