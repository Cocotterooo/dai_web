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
    const { id, name, details, family_id, place, saved_in, amount, min_stock, custom_loan_days } = body;

    // Validaciones
    if (!id || !place || amount === undefined) {
      return new Response(JSON.stringify({ error: 'ID, ubicación y cantidad son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validar que place sea un valor válido
    const validPlaces = ['city', 'campus'];
    if (!validPlaces.includes(place)) {
      return new Response(JSON.stringify({ error: 'Ubicación debe ser "city" o "campus"' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Extraer el object_id del id compuesto (stock_OBJECT_ID) o usar ID directo
    let item_id;
    const match = id.match(/^stock_(\d+)$/);
    if (match) {
      item_id = parseInt(match[1]);
    } else {
      item_id = parseInt(id);
    }

    // Actualizar item fungible usando RPC
    const { data, error } = await supabase.rpc("update_fungible_item", {
      p_object_id: item_id,
      p_name: name ? name.trim() : null,
      p_place: place, 
      p_min_stock: min_stock ? parseInt(min_stock) : 0,
      p_amount: parseInt(amount),
      p_saved_in: saved_in ? saved_in.trim() : null,
      p_description: details ? details.trim() : null
    });

    if (error) {
      console.error('Error actualizando item fungible:', error);
      return new Response(JSON.stringify({ error: 'Error al actualizar el item: ' + error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      data,
      message: 'Item fungible actualizado correctamente' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en API de actualización de item fungible:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};