    import { defineMiddleware } from "astro:middleware";
    import { supabase } from "../lib/supabase";
    import micromatch from "micromatch";

    const protectedRoutes = ["/profile(|/)", "/complete-profile(|/)"];
    const adminRoutes = ["/admin/**"];
    const redirectRoutes = ["/auth(|/)", "/signin(|/)", "/register(|/)"];

    // Configuración de rutas que requieren roles específicos
    const roleProtectedRoutes = {
    "/admin/**": ['admin', 'dai_communication_coord'], 
    "/admin/users/**": [1, 2], 
    "/delegation/**": [1, 2, 3, 4], 
    "/coordination/**": [1, 2, 5, 6, 7, 8], 
    } as const;

    // Función para verificar roles con manejo mejorado de errores
    async function safeCheckUserRoles(user: any, requiredRoles: readonly (string | number)[]): Promise<boolean> {
    try {
        if (!user?.access_token || !user?.refresh_token) {
        console.warn('🔍 No se pueden verificar roles: tokens no disponibles');
        return false;
        }

        console.log('🔍 Verificando roles para usuario:', user.email);
        console.log('🎯 Roles requeridos:', requiredRoles);

        // Establecer timeout para la consulta de roles
        const rolePromise = supabase
        .auth.setSession({
            access_token: user.access_token,
            refresh_token: user.refresh_token
        })
        .then(async ({ data: sessionData, error: sessionError }) => {
            if (sessionError || !sessionData.session) {
            throw new Error(`Error de sesión: ${sessionError?.message}`);
            }
            
            // Ejecutar la RPC con la sesión activa
            return await supabase.rpc('my_roles');
        });

        // Timeout de 3 segundos para evitar cuelgues
        const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout verificando roles')), 3000);
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
        const userRoleIds = userRoles.map((role: any) => role.role_id).filter(Boolean);
        const userRoleNames = userRoles.map((role: any) => role.role_name).filter(Boolean);
        
        console.log('👤 Roles del usuario:', { userRoleIds, userRoleNames });
        
        // Verificar si el usuario tiene al menos uno de los roles requeridos
        const hasRequiredRole = requiredRoles.some(requiredRole => {
        if (typeof requiredRole === 'string') {
            return userRoleNames.some((roleName: string) => roleName.toLowerCase() === requiredRole.toLowerCase());
        } else if (typeof requiredRole === 'number') {
            return userRoleIds.includes(requiredRole);
        }
        return false;
        });
        
        console.log(hasRequiredRole ? '✅ Usuario autorizado' : '❌ Usuario no autorizado');
        return hasRequiredRole;
        
    } catch (error) {
        console.error('❌ Error en verificación de roles:', error);
        return false;
    }
    }

    // Función para cachear roles de manera segura
    async function safeCacheUserRoles(user: any, locals: any) {
    try {
        if (!user?.access_token || !user?.refresh_token) {
        console.warn('🔍 No se pueden cachear roles: tokens no disponibles');
        locals.userRoles = [];
        locals.userRoleIds = [];
        locals.userRoleNames = [];
        locals.isAdmin = false;
        return;
        }

        // Timeout para el cacheo de roles
        const cachePromise = supabase.rpc('my_roles');
        const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout cacheando roles')), 2000);
        });

        const { data: userRoles, error: rolesError } = await Promise.race([
        cachePromise,
        timeoutPromise
        ]) as any;
        
        if (!rolesError && userRoles && Array.isArray(userRoles)) {
        locals.userRoles = userRoles;
        locals.userRoleIds = userRoles.map((role: any) => role.role_id).filter(Boolean);
        locals.userRoleNames = userRoles.map((role: any) => role.role_name).filter(Boolean);
        
        console.log('🎭 Roles cacheados exitosamente:', {
            count: userRoles.length,
            roleNames: locals.userRoleNames
        });
        
        // Verificar si es admin
        locals.isAdmin = userRoles.some((role: any) => 
            role.role_name?.toLowerCase() === 'admin' || 
            role.role_name?.toLowerCase() === 'delegado'
        );
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
        
        // Timeout para la verificación de sesión
        const sessionPromise = supabase.auth.getUser(accessToken.value);
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Session timeout')), 5000);
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
            
            // Cachear roles de manera segura (sin bloquear si falla)
            await safeCacheUserRoles(data.user, locals);
            
        } else {
            console.warn('⚠️ Sesión inválida:', error?.message || 'Usuario no encontrado');
            // Limpiar cookies inválidas
            cookies.delete("sb-access-token", { path: "/" });
            cookies.delete("sb-refresh-token", { path: "/" });
        }
        } catch (error) {
        console.error('❌ Error verificando sesión:', error);
        // Limpiar cookies en caso de error
        cookies.delete("sb-access-token", { path: "/" });
        cookies.delete("sb-refresh-token", { path: "/" });
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
        if (!locals.user) {
            console.log('🚫 Usuario no autenticado intentando acceder a:', pathname);
            return redirect("/auth");
        }
        
        // Verificar roles de manera segura (no bloquear si falla)
        try {
            const hasPermission = await safeCheckUserRoles(locals.user, requiredRoles);
            if (!hasPermission) {
            console.log('🚫 Usuario sin permisos para acceder a:', pathname);
            return redirect("/profile?error=insufficient_permissions");
            }
        } catch (error) {
            console.error('❌ Error verificando permisos para:', pathname, error);
            // En caso de error verificando permisos, permitir acceso pero logear el problema
            console.warn('⚠️ Permitiendo acceso debido a error en verificación de permisos');
        }
        break;
        }
    }

    console.log('✅ Middleware completado - continuando...');
    return next();
    });
