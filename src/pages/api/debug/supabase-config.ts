import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
    console.log('🔍 === DIAGNÓSTICO DE CONFIGURACIÓN SUPABASE ===');
    
    try {
        const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
        const baseUrl = new URL(request.url).origin;
        
        console.log('📋 Configuración actual:');
        console.log('   - Supabase URL:', supabaseUrl || '[FALTA]');
        console.log('   - Supabase Anon Key:', supabaseAnonKey ? '[CONFIGURADA]' : '[FALTA]');
        console.log('   - Base URL de la app:', baseUrl);
        console.log('   - URL de confirmación:', `${baseUrl}/auth/confirm`);
        
        // Respuesta para desarrollo/debug
        return new Response(JSON.stringify({
            supabase_configured: !!(supabaseUrl && supabaseAnonKey),
            base_url: baseUrl,
            confirmation_url: `${baseUrl}/auth/confirm`,
            timestamp: new Date().toISOString(),
            message: 'Revisar logs del servidor para más detalles'
        }, null, 2), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('❌ Error en diagnóstico:', error);
        return new Response(JSON.stringify({ 
            error: 'Error en diagnóstico',
            timestamp: new Date().toISOString()
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
