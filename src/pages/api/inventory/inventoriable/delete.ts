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
    const { object_id, custom_id } = body;

    // Validaciones
    if (!object_id || !custom_id) {
      return new Response(JSON.stringify({ error: 'ID del objeto y custom_id son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Eliminar item inventariable usando RPC
    console.log('Intentando eliminar item inventariable usando RPC:', { object_id, custom_id });
    
    const { data, error } = await supabase.rpc("delete_inventory_item", {
      p_id: parseInt(object_id)
    });

    if (error) {
      console.error('Error eliminando item inventariable:', error);
      return new Response(JSON.stringify({ 
        error: error.message || 'Error al eliminar el item inventariable' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Item inventariable eliminado exitosamente:', data);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Item inventariable eliminado correctamente',
      data 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en API delete inventoriable:', error);
    return new Response(JSON.stringify({ 
      error: 'Error interno del servidor' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};