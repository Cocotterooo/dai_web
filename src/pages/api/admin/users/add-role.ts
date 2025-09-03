import type { APIRoute } from "astro";
import { supabase, supabaseAdmin } from "@/lib/supabase";

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

        // Verificar que tenemos acceso al cliente administrativo
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: "Cliente administrativo no disponible" }), { 
                status: 500,
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

        // Verificar que el usuario objetivo existe
        const { data: targetUser, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId);

        if (userError || !targetUser?.user) {
            return new Response(JSON.stringify({ error: "Usuario no encontrado" }), { 
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

        console.log('✅ Usuario encontrado:', targetUser.user.email);

        // Verificar si el usuario ya tiene el rol asignado
        const { data: existingAssignment } = await supabaseAdmin
            .from('organization.user_roles')
            .select('*')
            .eq('user_id', userId)
            .eq('role_id', roleId)
            .maybeSingle();

        if (existingAssignment) {
            return new Response(JSON.stringify({ error: "El usuario ya tiene este rol asignado" }), { 
                status: 409,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Asignar el rol al usuario (la tabla se encarga de validar que el rol existe)
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
