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

        // Obtener estadísticas
        const { data: users, error: usersError } = await supabase
            .from('profiles')
            .select('id, created_at, updated_at');

        if (usersError) {
            throw usersError;
        }

        // Calcular estadísticas básicas
        const totalUsers = users?.length || 0;
        
        // Usuarios activos (que han actualizado su perfil en los últimos 30 días)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const activeUsers = users?.filter(user => {
            const updatedAt = new Date(user.updated_at || user.created_at);
            return updatedAt > thirtyDaysAgo;
        }).length || 0;

        // Obtener número de administradores
        const { data: adminRoles, error: adminError } = await supabase
            .rpc('get_admin_count');

        const adminUsers = adminError ? 0 : (adminRoles || 0);

        const stats = {
            totalUsers,
            activeUsers,
            adminUsers
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
            adminUsers: 0
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
