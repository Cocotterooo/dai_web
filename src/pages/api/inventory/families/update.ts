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
    const { id, name, details, parent_id, default_loan_days, color, icon } = body;

    // Validaciones
    if (!id || !name || !default_loan_days) {
      return new Response(JSON.stringify({ error: 'ID, nombre y días de préstamo son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Actualizar familia usando RPC
    const { data, error } = await supabase.rpc("update_family", {
      p_id: parseInt(id),
      p_name: name ? name.trim() : null,
      p_description: details ? details.trim() : null,
      p_parent_id: parent_id ? parseInt(parent_id) : null,
      p_loanable_time: default_loan_days ? parseInt(default_loan_days) : null,
      p_color: color || null,
      p_icon: icon || null
    });

    if (error) {
      console.error('Error actualizando familia:', error);
      return new Response(JSON.stringify({ error: 'Error al actualizar la familia: ' + error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      data,
      message: 'Familia actualizada correctamente' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en API de actualización de familia:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};