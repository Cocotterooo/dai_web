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
                            || userRoleIds.includes('dai_delegate') 
                            || userRoleIds.includes('dai_secretary');

        if (!hasPermission) {
            return new Response(JSON.stringify({ error: "Permisos insuficientes para gestionar roles" }), { 
                status: 403,
                headers: { "Content-Type": "application/json" }
            });
        }

        const { userId, roleId, groupId } = await request.json();

        console.log('📝 Datos recibidos:', { userId, roleId, groupId });
        console.log('📝 Tipos de datos:', { 
            userIdType: typeof userId, 
            roleIdType: typeof roleId, 
            groupIdType: typeof groupId 
        });

        if (!userId || !roleId) {
            return new Response(JSON.stringify({ error: "userId y roleId son requeridos" }), { 
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Asignar el rol al usuario usando la función RPC
        console.log('🔄 Asignando rol:', { userId, roleId, groupId });
        const { data, error } = await supabase.rpc("assign_role_to_user", {
            target_user_id: userId,
            target_role_id: roleId,
            target_group_id: groupId || null
        });
        if (error) {
            console.error('Error asignando rol:', error);
            return new Response(JSON.stringify({ 
                error: "Error al asignar el rol",
                details: error.message 
            }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        console.log('✅ Rol asignado correctamente:', data);

        return new Response(JSON.stringify({ 
            message: "Rol asignado correctamente",
            data: {
                assignment: data
            }
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error('Error en /api/admin/users/add-role:', error);
        
        return new Response(JSON.stringify({ 
            error: "Error interno del servidor",
            details: error instanceof Error ? error.message : String(error)
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
