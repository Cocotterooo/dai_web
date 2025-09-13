import type { APIRoute } from 'astro';
import { supabase } from '@/lib/supabase';

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { user_id, pages, sheets, print_type, cd_member, location } = body;

        // Validar datos requeridos uno por uno
        if (!user_id) {
            return new Response(JSON.stringify({ 
                error: 'Falta dato requerido: user_id' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        if (!pages) {
            return new Response(JSON.stringify({ 
                error: 'Falta dato requerido: pages' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        if (!sheets) {
            return new Response(JSON.stringify({ 
                error: 'Falta dato requerido: sheets' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        if (!print_type) {
            return new Response(JSON.stringify({ 
                error: 'Falta dato requerido: print_type' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        if (!cd_member) {
            return new Response(JSON.stringify({ 
                error: 'Falta dato requerido: cd_member' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        // location es opcional

        //console.log('Datos de impresión recibidos:', { user_id, pages, sheets, print_type, cd_member, location });

        // Llamar a la función de la base de datos
        const { data, error } = await supabase
        .rpc('insert_printing_history', {
            p_user_id: user_id,
            p_pages_printed: parseInt(pages),
            p_sheets_used: parseInt(sheets),
            p_filename: `Print_${Date.now()}`, // Generar nombre de archivo único
            p_printer_location: location, // Valor por defecto
            p_processed_by: cd_member,
            p_type_color: print_type
        });

        if (error) {
        console.error('❌ Error en insert_printing_history:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
        }

        return new Response(JSON.stringify({ success: true, data }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('❌ Error en endpoint print-history:', error);
        return new Response(JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Error interno del servidor' 
        }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
        });
    }
};
