import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const GET: APIRoute = async ({ locals }) => {
    try {
        const user = locals.user;
        const userRoleIds = (locals.userRoleIds as unknown as string[]) || [];
        
        if (!user) {
            return new Response(JSON.stringify({ error: "No autorizado" }), { 
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Verificar si el usuario tiene permisos (admin, dai_delegate, dai_secretary)
        const hasPermission = userRoleIds.includes("admin") 
                           || userRoleIds.includes("dai_delegate") 
                           || userRoleIds.includes("dai_secretary");

        if (!hasPermission) {
            return new Response(JSON.stringify({ error: "Permisos insuficientes" }), { 
                status: 403,
                headers: { "Content-Type": "application/json" }
            });
        } else {
            console.log("💚💚Usuario autorizado:", user.email);
        }

        // Obtener usuarios con roles usando la función RPC protegida
        const { data, error } = await supabase
            .rpc("get_users_with_all_info");

        if (error) {
            console.error("Error cargando usuarios:", error);
            throw error;
        }

        const users = (data || []) as any[];

        // Ordenar por fecha de creación (más recientes primero)
        users.sort(
            (a: any, b: any) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        return new Response(JSON.stringify({ users }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("Error en /api/admin/users:", error);
        
        return new Response(JSON.stringify({ 
            error: "Error interno del servidor",
            details: error instanceof Error ? error.message : String(error)
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
