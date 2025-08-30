import { createClient } from '@supabase/supabase-js';

// Configuración optimizada para API routes con PKCE flow
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY as string

// Validación de configuración de Supabase
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Supabase configuration missing:');
    console.error('  - URL:', supabaseUrl || '[MISSING]');
    console.error('  - Anon Key:', supabaseAnonKey ? '[PRESENT]' : '[MISSING]');
    console.error('  - Service Key:', supabaseServiceKey ? '[PRESENT]' : '[MISSING]');

    throw new Error('Missing Supabase environment variables.')
} else {
    console.log('✅ Supabase configuration loaded');
    console.log('  - URL:', supabaseUrl);
    console.log('  - Anon Key:', supabaseAnonKey ? '[PRESENT]' : '[MISSING]');
    console.log('  - Service Key:', supabaseServiceKey ? '[PRESENT]' : '[MISSING]');
}

// Cliente estándar con autenticación normal (respeta RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        flowType: "pkce",
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
    }
});

// Cliente administrativo con Service Role Key (bypasa RLS) - SOLO para uso en APIs de administrador
export const supabaseAdmin = supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
}) : null;

if (supabaseAdmin) {
    console.log('✅ Cliente administrativo Supabase inicializado correctamente');
} else {
    console.warn('⚠️ Cliente administrativo Supabase no disponible - Service Role Key no configurada');
}

// Función para crear cliente autenticado con sesión del usuario
export function createAuthenticatedSupabaseClient(accessToken: string, refreshToken: string) {
    const client = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            flowType: "pkce",
            autoRefreshToken: false,
            detectSessionInUrl: false,
            persistSession: false,
        }
    });
    
    // Establecer la sesión del usuario
    client.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
    });
    
    return client;
}

// Función para usar en componentes de Astro - obtiene cliente autenticado desde locals
export function getAuthenticatedSupabaseFromLocals(locals: any) {
    if (locals.accessToken && locals.refreshToken) {
        return createAuthenticatedSupabaseClient(locals.accessToken, locals.refreshToken);
    }
    
    // Si no hay tokens, devolver cliente sin autenticar
    return supabase;
}

// Función para verificar si un usuario es administrador - CORREGIDA
export async function verifyAdminAccess(userId: string): Promise<boolean> {
    try {
        console.log('🔍 Verificando permisos de administrador para:', userId);
        
        // Consulta corregida usando el esquema organization
        const { data: userRoles, error } = await supabase
            .from('user_roles')
            .select(`
                roles!inner (
                    name
                )
            `)
            .eq('user_id', userId);

        if (error) {
            console.error('❌ Error verificando permisos de admin:', error);
            return false;
        }

        console.log('📋 Roles encontrados:', userRoles?.map((r: any) => r.roles?.name) || []);

        // Roles que consideramos administrativos
        const adminRoles = ['admin', 'coordinador', 'delegado', 'subdelegado'];
        const isAdmin = userRoles?.some((userRole: any) => 
            adminRoles.includes(userRole.roles?.name)
        ) || false;

        console.log('✅ Es administrador:', isAdmin);
        return isAdmin;
    } catch (error) {
        console.error('💥 Error verificando acceso de administrador:', error);
        return false;
    }
}

// Función para obtener los roles de un usuario - NUEVA
export async function getUserRoles(userId: string): Promise<any[]> {
    try {
        const { data, error } = await supabase
            .from('user_roles')
            .select(`
                id,
                created_at,
                roles!inner (
                    id,
                    name,
                    description
                ),
                groups (
                    id,
                    year,
                    branch,
                    site,
                    degrees (
                        name,
                        campus,
                        city
                    )
                )
            `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error obteniendo roles del usuario:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error en getUserRoles:', error);
        return [];
    }
}
