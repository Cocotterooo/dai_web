import type { APIRoute } from 'astro';
import { supabase } from '@/lib/supabase';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Verificar autenticación
    const user = locals.user;
    if (!user) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }


    const body = await request.json();
    const { 
      id,
      name, 
      details, 
      family_id, 
      custom_id, 
      place, 
      saved_in, 
      state, 
      serial_number, 
      image_url, 
      custom_loan_days 
    } = body;
    console.log('Datos recibidos para actualización:', body);

    // Validaciones
    if (!id || !family_id || !place || !state) {
      return new Response(JSON.stringify({ error: 'ID, familia, ubicación y estado son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Actualizar item inventariable usando RPC
    const { data, error } = await supabase.rpc("update_inventory_item", {
      p_id: id,
      p_custom_id: custom_id || null,
      p_name: name ? name.trim() : null,
      p_place: place,          // ENUM: 'city' o 'campus'
      p_state: state,         // ENUM: 'available', 'loaned', 'broken', 'maintenance', etc.
      p_serial_number: serial_number ? serial_number.trim() : null,
      p_saved_in: saved_in ? saved_in.trim() : null,
      p_image_url: image_url ? image_url.trim() : null,
      p_description: details ? details.trim() : null
    });

    if (error) {
      console.error('Error actualizando item inventariable:', error);
      return new Response(JSON.stringify({ error: 'Error al actualizar el item: ' + error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      data,
      message: 'Item inventariable actualizado correctamente' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en API de actualización de item inventariable:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};