import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals }) => {
    try {
        const user = locals.user;
        
        if (!user) {
            return new Response(JSON.stringify({ 
                error: "No autorizado",
                fallback: {
                    qrData: "user-not-found",
                    displayText: "Usuario no encontrado"
                }
            }), { 
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        }

        const userId = user.id;
        const userEmail = user.email || user.user_metadata?.email;
        
        // Crear datos para el QR - usando información mínima pero válida
        const qrData = {
            userId: userId,
            email: userEmail,
            timestamp: Date.now()
        };
        
        // Convertir a string para el QR
        const qrString = JSON.stringify(qrData);

        return new Response(JSON.stringify({ 
            success: true,
            data: {
                qrData: qrString,
                userId: userId,
                displayText: `Usuario: ${userEmail || userId}`,
                timestamp: new Date().toISOString()
            }
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error('Error en /api/profile/generate-qr:', error);
        
        // Fallback con QR genérico
        const fallbackQr = {
            qrData: `dai-user-${Date.now()}`,
            displayText: "Error generando QR personalizado"
        };
        
        return new Response(JSON.stringify({ 
            error: "Error generando QR",
            fallback: fallbackQr
        }), { 
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    }
};
