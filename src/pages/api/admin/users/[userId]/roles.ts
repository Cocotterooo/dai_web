import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const GET: APIRoute = async ({ locals, params }) => {
    try {
        const user = locals.user;
        const userRoleIds = (locals.userRoleIds as unknown) as string[] || [];
        
        if (!user) {
            return new Response(JSON.stringify({ error: "No autorizado" }), { 
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Verificar si es admin o dai_communication_coord
        const isAdmin = userRoleIds.includes('admin') || userRoleIds.includes('dai_communication_coord');
        if (!isAdmin) {
            return new Response(JSON.stringify({ error: "Permisos insuficientes" }), { 
                status: 403,
                headers: { "Content-Type": "application/json" }
            });
        }

        const userId = params?.userId;
        if (!userId) {
            return new Response(JSON.stringify({ error: "ID de usuario requerido" }), { 
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Obtener roles del usuario usando la función RPC
        const { data: userRoles, error: rolesError } = await supabase
            .rpc('get_user_roles', { target_user_id: userId });

        if (rolesError) {
            console.error('Error obteniendo roles:', rolesError);
            throw rolesError;
        }

        // Obtener información básica del usuario
        const { data: authUser, error: userError } = await supabase.auth.admin.getUserById(userId);

        if (userError) {
            console.error('Error obteniendo usuario:', userError);
            throw userError;
        }

        const userInfo = {
            id: authUser.user.id,
            email: authUser.user.email,
            full_name: authUser.user.user_metadata?.full_name || authUser.user.user_metadata?.name,
            avatar_url: authUser.user.user_metadata?.avatar_url,
        };

        return new Response(JSON.stringify({
            user: userInfo,
            roles: userRoles || []
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error('Error en /api/admin/users/[userId]/roles:', error);
        
        return new Response(JSON.stringify({ 
            error: "Error interno del servidor",
            details: error instanceof Error ? error.message : String(error)
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
