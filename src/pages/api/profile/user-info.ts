import type { APIRoute } from "astro";
import { getAuthenticatedSupabaseFromLocals } from "@/lib/supabase";

export const GET: APIRoute = async ({ locals }) => {
    try {
        const user = locals.user;
        
        if (!user) {
            return new Response(JSON.stringify({ 
                error: "No autorizado",
                fallback: {
                    name: "Usuario no disponible",
                    email: "No disponible",
                    roles: []
                }
            }), { 
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Usar datos ya cacheados del middleware
        const userInfo = {
            id: user.id,
            name: user.user_metadata?.full_name || user.user_metadata?.name || 'Usuario',
            email: user.user_metadata?.email || user.email,
            dni: user.user_metadata?.dni,
            phone: user.user_metadata?.phone,
            avatar: user.user_metadata?.avatar_url,
            roles: locals.userRoleNames || [],
            instagram: user.user_metadata?.instagram,
            linkedin: user.user_metadata?.linkedin,
            tiktok: user.user_metadata?.tiktok,
            x: user.user_metadata?.x,
        };

        return new Response(JSON.stringify({ 
            success: true,
            data: userInfo 
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error('Error en /api/profile/user-info:', error);
        
        // Devolver datos mínimos de fallback
        return new Response(JSON.stringify({ 
            error: "Error interno del servidor",
            fallback: {
                name: "Error cargando datos",
                email: "No disponible",
                roles: []
            }
        }), { 
            status: 200, // 200 para que el cliente pueda manejar el fallback
            headers: { "Content-Type": "application/json" }
        });
    }
};
