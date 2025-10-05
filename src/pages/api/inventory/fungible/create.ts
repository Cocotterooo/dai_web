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
    const { name, details, family_id, place, saved_in, amount, min_stock, custom_loan_days } = body;

    // Validaciones
    if (!family_id || !place || amount === undefined) {
      return new Response(JSON.stringify({ error: 'Familia, ubicación y cantidad son requeridos' }), {
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

    // Crear item fungible usando RPC
    const { data, error } = await supabase.rpc("add_fungible_item", {
      p_family_id: parseInt(family_id),
      p_name: name ? name.trim() : null,
      p_place: place, // casteado automáticamente a tipo ENUM place
      p_min_stock: min_stock ? parseInt(min_stock) : 0,
      p_amount: parseInt(amount),
      p_saved_in: saved_in ? saved_in.trim() : null,
      p_description: details ? details.trim() : null
    });

    if (error) {
      console.error('Error creando item fungible:', error);
      return new Response(JSON.stringify({ error: 'Error al crear el item: ' + error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      data,
      message: 'Item fungible creado correctamente' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en API de creación de item fungible:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};