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

        // Verificar permisos - solo admins y coordinadores pueden ver todos los roles
        const hasPermission = userRoleIds.includes('admin') 
                            || userRoleIds.includes('dai_communication_coord') 
                            || userRoleIds.includes('dai_delegate') 
                            || userRoleIds.includes('dai_secretary');

        if (!hasPermission) {
            return new Response(JSON.stringify({ error: "Permisos insuficientes para ver roles" }), { 
                status: 403,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Obtener todos los roles disponibles
        const { data: roles, error: rolesError } = await supabase
            .from('organization.roles')
            .select('id, name')
            .order('name');

        if (rolesError) {
            console.error('Error obteniendo roles:', rolesError);
            throw rolesError;
        }

        return new Response(JSON.stringify({
            success: true,
            roles: roles || []
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error('Error en /api/admin/roles:', error);
        
        return new Response(JSON.stringify({ 
            error: "Error interno del servidor",
            details: error instanceof Error ? error.message : String(error)
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
