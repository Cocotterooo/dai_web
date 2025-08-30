import type { APIRoute } from "astro";
import { supabase, supabaseAdmin, createAuthenticatedSupabaseClient } from "@/lib/supabase";

// ⚡ Ruta para actualizar el DNI del usuario autenticado
export const POST: APIRoute = async ({ request, cookies }) => {
    try {
        const { dni } = await request.json();

        if (!dni) {
            return new Response(JSON.stringify({ error: "DNI es requerido" }), { status: 400 });
        }

        // 🔑 Obtener token de acceso desde las cookies
        const accessToken = cookies.get("sb-access-token")?.value;
        const refreshToken = cookies.get("sb-refresh-token")?.value;
        
        if (!accessToken || !refreshToken) {
            return new Response(JSON.stringify({ error: "No autorizado - sesión no encontrada" }), { status: 401 });
        }

        const { data: { user }, error: userError } = await supabase.auth.getUser(accessToken);
        if (userError || !user) {
            console.error("❌ Error obteniendo usuario:", userError);
            return new Response(JSON.stringify({ error: "Usuario no válido" }), { status: 401 });
        }

        console.log("🟢 Usuario autenticado:", user.id);

        // 1️⃣ Actualizar tabla public.users usando cliente con sesión del usuario
        const authenticatedClient = createAuthenticatedSupabaseClient(accessToken, refreshToken);
        
        const { error: updateUsersError } = await authenticatedClient
            .from("users")
            .update({ dni })
            .eq("id", user.id);

        if (updateUsersError) {
            console.error("❌ Error actualizando public.users:", updateUsersError);
            
            // Manejar error de DNI duplicado
            if (updateUsersError.code === '23505' && updateUsersError.message.includes('users_dni_key')) {
                return new Response(JSON.stringify({ 
                    error: "Este DNI ya está registrado por otro usuario" 
                }), { 
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            
            return new Response(JSON.stringify({ error: "Error actualizando perfil en base de datos" }), { status: 500 });
        }

        console.log("✅ DNI actualizado correctamente en tabla users");
        
        return new Response(JSON.stringify({ 
            success: true, 
            dni,
            message: "DNI actualizado correctamente" 
        }), { status: 200 });

    } catch (err) {
        console.error("❌ Error inesperado:", err);
        return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
    }
};
