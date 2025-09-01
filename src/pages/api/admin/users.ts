import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const GET: APIRoute = async ({ locals }) => {
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

        // Obtener usuarios desde auth.users (información más completa)
        const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();

        if (authError) {
            console.error('Error obteniendo usuarios de auth:', authError);
            throw authError;
        }

        // Formatear datos de usuarios
        const users = authUsers.users.map(user => ({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || user.user_metadata?.name,
            avatar_url: user.user_metadata?.avatar_url,
            created_at: user.created_at,
            updated_at: user.updated_at || user.created_at,
            last_sign_in_at: user.last_sign_in_at,
            email_confirmed_at: user.email_confirmed_at,
            phone: user.phone
        }));

        // Ordenar por fecha de creación (más recientes primero)
        users.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        return new Response(JSON.stringify(users), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error('Error en /api/admin/users:', error);
        
        return new Response(JSON.stringify({ 
            error: "Error interno del servidor",
            details: error instanceof Error ? error.message : String(error)
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
