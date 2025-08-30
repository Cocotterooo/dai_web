import type { APIRoute } from 'astro';
import { supabase } from '@/lib/supabase';

// POST - Asignar comisión a un usuario
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { user_id, commission_id } = body;

    // Validar datos requeridos
    if (!user_id || !commission_id) {
      return new Response(JSON.stringify({ 
        error: 'user_id y commission_id son requeridos' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verificar si ya existe la asignación activa
    const { data: existing, error: checkError } = await supabase
      .from('user_commissions')
      .select('id')
      .eq('user_id', user_id)
      .eq('commission_id', commission_id)
      .eq('active', true)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
      return new Response(JSON.stringify({ 
        error: 'Error al verificar comisión existente',
        details: checkError.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (existing) {
      return new Response(JSON.stringify({ 
        error: 'El usuario ya pertenece a esta comisión' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insertar la nueva asignación de comisión
    const { data, error } = await supabase
      .from('user_commissions')
      .insert([{
        user_id,
        commission_id,
        start_date: new Date().toISOString().split('T')[0],
        active: true
      }])
      .select(`
        id,
        commissions (id, name, description),
        start_date
      `);

    if (error) {
      return new Response(JSON.stringify({ 
        error: 'Error al asignar comisión',
        details: error.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Comisión asignada correctamente',
      data: data[0]
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en POST /api/users/commissions:', error);
    return new Response(JSON.stringify({ 
      error: 'Error interno del servidor' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// DELETE - Eliminar comisión de un usuario
export const DELETE: APIRoute = async ({ request, url }) => {
  try {
    const userCommissionId = url.searchParams.get('user_commission_id');
    
    if (!userCommissionId) {
      return new Response(JSON.stringify({ 
        error: 'user_commission_id es requerido' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Marcar la comisión como inactiva
    const { data, error } = await supabase
      .from('user_commissions')
      .update({ 
        active: false,
        end_date: new Date().toISOString().split('T')[0]
      })
      .eq('id', userCommissionId)
      .select();

    if (error) {
      return new Response(JSON.stringify({ 
        error: 'Error al eliminar comisión',
        details: error.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (data.length === 0) {
      return new Response(JSON.stringify({ 
        error: 'Asignación de comisión no encontrada' 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Comisión eliminada correctamente'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en DELETE /api/users/commissions:', error);
    return new Response(JSON.stringify({ 
      error: 'Error interno del servidor' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
