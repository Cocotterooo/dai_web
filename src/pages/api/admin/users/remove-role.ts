import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const POST: APIRoute = async ({ locals, request }) => {
    try {
        const user = locals.user;
        const userRoleIds = (locals.userRoleIds as unknown) as string[] || [];
        
        if (!user) {
            return new Response(JSON.stringify({ error: "No autorizado" }), { 
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Verificar permisos - solo admins y coordinadores pueden gestionar roles
        const hasPermission = userRoleIds.includes('admin') 
                            || userRoleIds.includes('dai_communication_coord') 
                            || userRoleIds.includes('dai_delegate') 
                            || userRoleIds.includes('dai_secretary');

        if (!hasPermission) {
            return new Response(JSON.stringify({ error: "Permisos insuficientes para gestionar roles" }), { 
                status: 403,
                headers: { "Content-Type": "application/json" }
            });
        }

        const { userId, roleId } = await request.json();

        if (!userId || !roleId) {
            return new Response(JSON.stringify({ error: "userId y roleId son requeridos" }), { 
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Eliminar el rol del usuario
        const { error: deleteError } = await supabase
            .from('user_roles')
            .delete()
            .eq('user_id', userId)
            .eq('role_id', roleId);

        if (deleteError) {
            console.error('Error eliminando rol:', deleteError);
            throw deleteError;
        }

        return new Response(JSON.stringify({ 
            success: true,
            message: "Rol eliminado correctamente"
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error('Error en /api/admin/users/remove-role:', error);
        
        return new Response(JSON.stringify({ 
            error: "Error interno del servidor",
            details: error instanceof Error ? error.message : String(error)
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
