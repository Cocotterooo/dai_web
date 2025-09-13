import type { APIRoute } from 'astro';
import { supabase } from '@/lib/supabase';

export const POST: APIRoute = async ({ request }) => {
    const { user_uuid } = await request.json();
    console.log('Recibido user_uuid:', user_uuid)

    if (!user_uuid) {
        return new Response('Falta user_uuid', { status: 400 })
    }

    const { data, error } = await supabase
        .rpc('get_printing_user_stats', { user_uuid })

    if (error) {
        console.error('Error al obtener estadísticas:', error)
        return new Response('Error al obtener estadísticas', { status: 500 })
    }

    return new Response(JSON.stringify(data[0]), { status: 200 })
}