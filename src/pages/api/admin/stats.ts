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

        // Obtener usuarios con roles usando la función RPC
        const { data: usersData, error: usersError } = await supabase
            .rpc("get_users_with_roles");

        if (usersError) {
            console.error("Error cargando usuarios para estadísticas:", usersError);
            throw usersError;
        }

        const users = (usersData || []) as any[];

        // Calcular estadísticas básicas
        const totalUsers = users.length;
        
        // Usuarios nuevos este mes
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        
        const newUsersThisMonth = users.filter((user: any) => {
            const createdAt = new Date(user.created_at);
            return createdAt >= firstDayOfMonth;
        }).length;

        // Contar miembros DAI (usuarios con rol dai_member)
        const verifiedUsers = users.filter((user: any) => {
            return user.roles && user.roles.some((role: any) => role.role_name === 'dai_member');
        }).length;

        const stats = {
            totalUsers,
            activeUsers: newUsersThisMonth, // Cambiamos "usuarios activos" a "nuevos este mes"
            verifiedUsers // Miembros DAI
        };

        return new Response(JSON.stringify(stats), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error('Error en /api/admin/stats:', error);
        
        return new Response(JSON.stringify({ 
            error: "Error interno del servidor",
            totalUsers: 0,
            activeUsers: 0,
            verifiedUsers: 0
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
