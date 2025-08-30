import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request }) => {
    console.log('🔧 === CONFIRMACIÓN MANUAL DE USUARIO ===');
    
    try {
        const { email } = await request.json();
        
        if (!email) {
            return new Response(JSON.stringify({ 
                error: 'Email es requerido' 
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        console.log('📧 Intentando confirmación manual para:', email);
        
        // OPCIÓN 1: Intentar reenviar el email de confirmación
        console.log('🔄 Reenviando email de confirmación...');
        const { data: resendData, error: resendError } = await supabase.auth.resend({
            type: 'signup',
            email: email,
            options: {
                emailRedirectTo: `${new URL(request.url).origin}/auth/confirm`
            }
        });
        
        if (resendError) {
            console.error('❌ Error reenviando email:', resendError.message);
            return new Response(JSON.stringify({ 
                error: resendError.message,
                details: 'No se pudo reenviar el email de confirmación'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        console.log('✅ Email de confirmación reenviado');
        console.log('   - Respuesta:', resendData);
        
        return new Response(JSON.stringify({ 
            success: true,
            message: 'Email de confirmación reenviado exitosamente',
            email: email,
            timestamp: new Date().toISOString()
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('❌ Error en confirmación manual:', error);
        return new Response(JSON.stringify({ 
            error: 'Error interno del servidor' 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
