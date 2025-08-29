import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const GET: APIRoute = async ({ locals }) => {
    try {
        const user = locals.user;
        
        if (!user) {
            return new Response(JSON.stringify({ 
                error: "No autorizado",
                fallback: {
                    printing: { thisMonth: 0, total: 0, limit: 40, percentage: 0 },
                    loans: { active: 0, completed: 0, pending: 0, lastLoan: 'Nunca' }
                }
            }), { 
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Intentar obtener estadísticas reales de la base de datos con timeout
        const userId = user.id;
        
        // Establecer un timeout para las consultas
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Database timeout')), 5000);
        });

        const statsPromise = Promise.all([
            // Consulta de impresiones con manejo de errores
            supabase
                .from('user_printing_stats')
                .select('*')
                .eq('user_id', userId)
                .single()
                .then(({ data, error }) => {
                    if (error) return { thisMonth: 0, total: 0, limit: 40, percentage: 0 };
                    return data || { thisMonth: 0, total: 0, limit: 40, percentage: 0 };
                }),

            // Consulta de préstamos con manejo de errores
            supabase
                .from('user_loan_stats')
                .select('*')
                .eq('user_id', userId)
                .single()
                .then(({ data, error }) => {
                    if (error) return { active: 0, completed: 0, pending: 0, lastLoan: 'Nunca' };
                    return data || { active: 0, completed: 0, pending: 0, lastLoan: 'Nunca' };
                })
        ]);

        const [printingStats, loanStats] = await Promise.race([
            statsPromise,
            timeoutPromise
        ]) as any[];

        return new Response(JSON.stringify({ 
            success: true,
            data: {
                printing: printingStats,
                loans: loanStats
            }
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error('Error en /api/profile/user-stats:', error);
        
        // Devolver datos de fallback en caso de error
        return new Response(JSON.stringify({ 
            error: "Error cargando estadísticas",
            fallback: {
                printing: { thisMonth: 0, total: 0, limit: 40, percentage: 0 },
                loans: { active: 0, completed: 0, pending: 0, lastLoan: 'No disponible' }
            }
        }), { 
            status: 200, // 200 para que el cliente pueda manejar el fallback
            headers: { "Content-Type": "application/json" }
        });
    }
};
