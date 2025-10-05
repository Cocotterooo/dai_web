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
    const { object_id } = body;

    // Validaciones
    if (!object_id) {
      return new Response(JSON.stringify({ error: 'ID del objeto es requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Eliminar item fungible usando RPC
    console.log('Intentando eliminar item fungible usando RPC:', object_id);
    
    const { data, error } = await supabase.rpc("delete_fungible_item", {
      p_object_id: parseInt(object_id)
    });

    if (error) {
      console.error('Error eliminando item fungible:', error);
      return new Response(JSON.stringify({ 
        error: error.message || 'Error al eliminar el item fungible' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Item fungible eliminado exitosamente:', data);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Item fungible eliminado correctamente',
      data 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en API delete fungible:', error);
    return new Response(JSON.stringify({ 
      error: 'Error interno del servidor' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};