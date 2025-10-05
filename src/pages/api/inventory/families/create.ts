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
    const { name, details, parent_id, default_loan_days, color, icon } = body;

    console.log('Datos recibidos:', { name, details, parent_id, default_loan_days, color, icon });

    // Validaciones
    if (!name || !default_loan_days) {
      return new Response(JSON.stringify({ error: 'Nombre y días de préstamo son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insertar nueva familia usando RPC
    console.log('Intentando insertar familia usando RPC...');
    
    const { data, error } = await supabase.rpc("add_family", {
      p_name: name.trim(),
      p_description: details ? details.trim() : null,
      p_parent_id: parent_id ? parseInt(parent_id) : null,
      p_loanable_time: parseInt(default_loan_days),
      p_color: color || '#00ace2',
      p_icon: icon || '📦'
    });

    if (error) {
      console.error('Error creando familia:', error);
      console.error('Detalles del error:', JSON.stringify(error, null, 2));
      return new Response(JSON.stringify({ 
        error: 'Error al crear la familia: ' + error.message,
        details: error
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      data,
      message: 'Familia creada correctamente' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en API de creación de familia:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};