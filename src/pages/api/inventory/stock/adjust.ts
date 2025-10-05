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
    const { id, new_amount, object_id } = body;

    // Validaciones
    if ((!id && !object_id) || new_amount === undefined) {
      return new Response(JSON.stringify({ error: 'ID (o object_id) y nueva cantidad son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let finalObjectId;

    // Si viene object_id directamente, usarlo
    if (object_id) {
      finalObjectId = parseInt(object_id);
    } else {
      // Extraer el object_id del id compuesto (stock_OBJECT_ID)
      const match = id.match(/^stock_(\d+)$/);
      if (!match) {
        return new Response(JSON.stringify({ error: 'ID de item inválido' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      finalObjectId = parseInt(match[1]);
    }

    if (isNaN(new_amount) || parseInt(new_amount) < 0) {
      return new Response(JSON.stringify({ error: 'La cantidad debe ser un número válido mayor o igual a 0' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Ajustar stock usando RPC
    const { data, error } = await supabase.rpc("update_fungible_amount", {
      p_object_id: finalObjectId,
      p_amount: parseInt(new_amount)
    });

    if (error) {
      console.error('Error ajustando stock:', error);
      return new Response(JSON.stringify({ error: 'Error al ajustar el stock: ' + error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      data,
      message: `Stock ajustado correctamente a ${new_amount} unidades` 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en API de ajuste de stock:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};