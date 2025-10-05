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

    // Verificar permisos
    const roleIds = locals.userRoleIds as string[] || [];
    const canManageInventory = roleIds.includes("admin") 
                            || roleIds.includes("dai_delegate") 
                            || roleIds.includes("dai_secretary")
                            || roleIds.includes("dai_infrastructure_coord");

    if (!canManageInventory) {
      return new Response(JSON.stringify({ error: 'Permisos insuficientes' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const { 
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

    // Validaciones
    if (!family_id || !place || !state) {
      return new Response(JSON.stringify({ error: 'Familia, ubicación y estado son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validar que custom_id sea obligatorio
    if (!custom_id || custom_id.trim() === '') {
      return new Response(JSON.stringify({ error: 'El ID personalizado es obligatorio' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Crear item inventariable usando RPC
    const { data, error } = await supabase.rpc("add_inventory_item", {
      p_family_id: parseInt(family_id),
      p_custom_id: custom_id.trim(),
      p_name: name ? name.trim() : null,
      p_place: place,             // ENUM: 'city' o 'campus'
      p_state: state,            // ENUM: 'available', 'loaned', 'broken', etc.
      p_serial_number: serial_number ? serial_number.trim() : null,
      p_saved_in: saved_in ? saved_in.trim() : null,
      p_image_url: image_url ? image_url.trim() : null,
      p_description: details ? details.trim() : null
    });

    if (error) {
      console.error('Error creando item inventariable:', error);
      return new Response(JSON.stringify({ error: 'Error al crear el item: ' + error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      data,
      message: 'Item inventariable creado correctamente'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en API de creación de item inventariable:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};