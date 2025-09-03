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

        const { userId, roleId, groupId } = await request.json();

        // console.log('🔄 API remove-role recibió:', { userId, roleId, groupId });

        if (!userId || !roleId) {
            return new Response(JSON.stringify({ error: "userId y roleId son requeridos" }), { 
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Usar la función RPC remove_role_from_user
        // console.log('🔄 Llamando a remove_role_from_user con:', {
        //     target_user_id: userId,
        //     target_role_id: roleId,
        //     target_group_id: groupId || null
        // });
        
        const { data, error: removeError } = await supabase.rpc('remove_role_from_user', {
            target_user_id: userId,
            target_role_id: roleId,
            target_group_id: groupId || null // Será null excepto para delegados/subdelegados
        });

        // console.log('📋 Respuesta de remove_role_from_user:', { data, removeError });

        if (removeError) {
            console.error('Error eliminando rol:', removeError);
            return new Response(JSON.stringify({ 
                error: "Error eliminando el rol",
                details: removeError.message
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
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
