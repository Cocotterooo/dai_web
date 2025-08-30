import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    console.log('🔍 === ANÁLISIS DE TOKEN ===');
    
    try {
        const { token_hash } = await request.json();
        
        if (!token_hash) {
            return new Response(JSON.stringify({ 
                success: false,
                error: 'Token hash requerido' 
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Analizar el token
        const tokenLength = token_hash.length;
        const tokenStart = token_hash.substring(0, 8);
        const tokenEnd = token_hash.substring(token_hash.length - 8);
        
        // Verificar formato base64
        const isBase64 = /^[A-Za-z0-9+/]*={0,2}$/.test(token_hash);
        
        // Verificar formato URL-safe base64
        const isUrlSafeBase64 = /^[A-Za-z0-9_-]*$/.test(token_hash);
        
        console.log('🔍 Análisis del token:');
        console.log('   - Longitud:', tokenLength);
        console.log('   - Inicio:', tokenStart);
        console.log('   - Final:', tokenEnd);
        console.log('   - Es Base64:', isBase64);
        console.log('   - Es URL-safe Base64:', isUrlSafeBase64);
        
        return new Response(JSON.stringify({
            success: true,
            analysis: {
                length: tokenLength,
                start: tokenStart,
                end: tokenEnd,
                formats: {
                    base64: isBase64,
                    urlSafeBase64: isUrlSafeBase64,
                },
                recommendations: [
                    tokenLength < 20 ? '⚠️ Token muy corto (posible problema)' : '✅ Longitud de token adecuada',
                    !isBase64 && !isUrlSafeBase64 ? '⚠️ Formato de token inválido' : '✅ Formato de token válido',
                    tokenLength > 200 ? '⚠️ Token muy largo (posible problema)' : '✅ Longitud razonable',
                ]
            }
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('❌ Error analizando token:', error);
        return new Response(JSON.stringify({ 
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido' 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
