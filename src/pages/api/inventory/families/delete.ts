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
    const { family_id } = body;

    // Validaciones
    if (!family_id) {
      return new Response(JSON.stringify({ error: 'ID de familia es requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Eliminar familia usando RPC
    console.log('Intentando eliminar familia usando RPC:', family_id);
    
    const { data, error } = await supabase.rpc("delete_family", {
      p_family_id: parseInt(family_id)
    });

    if (error) {
      console.error('Error eliminando familia:', error);
      return new Response(JSON.stringify({ 
        error: error.message || 'Error al eliminar la familia' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Familia eliminada exitosamente:', data);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Familia eliminada correctamente',
      data 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en API delete family:', error);
    return new Response(JSON.stringify({ 
      error: 'Error interno del servidor' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};