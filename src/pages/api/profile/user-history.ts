import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const GET: APIRoute = async ({ locals }) => {
    try {
        const user = locals.user;
        
        if (!user) {
            return new Response(JSON.stringify({ 
                error: "No autorizado",
                fallback: {
                    history: []
                }
            }), { 
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        }

        const userId = user.id;
        
        // Timeout para evitar cuelgues
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Database timeout')), 5000);
        });

        const historyPromise = supabase
            .from('user_activity_history')
            .select(`
                id,
                activity_type,
                description,
                created_at,
                metadata
            `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(50);

        const { data: historyData, error } = await Promise.race([
            historyPromise,
            timeoutPromise
        ]) as any;

        if (error) {
            throw error;
        }

        return new Response(JSON.stringify({ 
            success: true,
            data: {
                history: historyData || []
            }
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error('Error en /api/profile/user-history:', error);
        
        // Devolver historial vacío como fallback
        return new Response(JSON.stringify({ 
            error: "Error cargando historial",
            fallback: {
                history: [
                    {
                        id: 1,
                        activity_type: 'system',
                        description: 'No se pudieron cargar los datos del historial',
                        created_at: new Date().toISOString(),
                        metadata: {}
                    }
                ]
            }
        }), { 
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    }
};
