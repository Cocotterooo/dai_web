import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const GET: APIRoute = async ({ request }) => {
    console.log('🔍 === CHECK EMAIL CONFIRMATION ===');
    
    try {
        // Obtener el token de la sesión desde las cookies
        const authHeader = request.headers.get('authorization');
        const cookies = request.headers.get('cookie');
        
        console.log('🍪 Cookies recibidas:', !!cookies);
        console.log('🔑 Auth header:', !!authHeader);
        
        // Intentar obtener la sesión actual
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        console.log('📋 Estado de sesión:');
        console.log('   - Sesión activa:', !!session);
        console.log('   - Error de sesión:', sessionError?.message || 'Ninguno');
        
        if (!session?.user) {
            console.log('❌ No hay sesión activa');
            return new Response(JSON.stringify({ 
                confirmed: false, 
                message: 'No hay sesión activa' 
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Verificar si el email está confirmado
        const emailConfirmed = !!session.user.email_confirmed_at;
        
        console.log('✅ Resultado de verificación:');
        console.log('   - Usuario ID:', session.user.id);
        console.log('   - Email:', session.user.email);
        console.log('   - Email confirmado:', emailConfirmed);
        console.log('   - Fecha de confirmación:', session.user.email_confirmed_at || 'No confirmado');
        
        return new Response(JSON.stringify({ 
            confirmed: emailConfirmed,
            user: {
                id: session.user.id,
                email: session.user.email,
                email_confirmed_at: session.user.email_confirmed_at
            }
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('❌ Error verificando confirmación de email:', error);
        return new Response(JSON.stringify({ 
            confirmed: false, 
            error: 'Error interno del servidor' 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
