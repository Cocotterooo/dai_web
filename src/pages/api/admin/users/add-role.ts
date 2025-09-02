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

        // Verificar si el usuario ya tiene ese rol
        const { data: existingRoles, error: checkError } = await supabase
            .from('user_roles')
            .select('*')
            .eq('user_id', userId)
            .eq('role_id', roleId);

        if (checkError) {
            console.error('Error verificando roles existentes:', checkError);
            throw checkError;
        }

        if (existingRoles && existingRoles.length > 0) {
            return new Response(JSON.stringify({ error: "El usuario ya tiene este rol asignado" }), { 
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Añadir el rol al usuario
        const { error: insertError } = await supabase
            .from('user_roles')
            .insert([{
                user_id: userId,
                role_id: roleId,
                assigned_at: new Date().toISOString(),
                assigned_by: user.id
            }]);

        if (insertError) {
            console.error('Error añadiendo rol:', insertError);
            throw insertError;
        }

        return new Response(JSON.stringify({ 
            success: true,
            message: "Rol añadido correctamente"
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
