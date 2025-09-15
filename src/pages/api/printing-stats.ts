import type { APIRoute } from 'astro';
import { supabase } from '@/lib/supabase';

export const POST: APIRoute = async () => {
    
    const { data, error } = await supabase
        .rpc('get_general_printing_stats_json')

    if (error) {
        console.error('Error al obtener estadísticas generales de impresión:', error)
        return new Response('Error al obtener estadísticas generales de impresión', { status: 500 })
    }
    //console.log('Estadísticas generales de impresión obtenidas:', data);
    return new Response(JSON.stringify(data), { status: 200 })
}