import type { APIRoute } from 'astro';
import { supabase, createAuthenticatedSupabaseClient } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { field, value } = await request.json();

    // Validar que el campo y valor estén presentes
    if (!field || value === undefined) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Campo y valor son requeridos' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validar que el campo sea permitido
    const allowedFields = ['full_name', 'phone', 'instagram', 'linkedin', 'tiktok', 'x'];
    if (!allowedFields.includes(field)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Campo no permitido para actualización' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // 🔑 Obtener tokens desde las cookies
    const accessToken = cookies.get("sb-access-token")?.value;
    const refreshToken = cookies.get("sb-refresh-token")?.value;
    
    if (!accessToken || !refreshToken) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'No autorizado - sesión no encontrada' 
        }), 
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validar usuario con token básico
    const { data: { user }, error: userError } = await supabase.auth.getUser(accessToken);
    if (userError || !user) {
      console.error("❌ Error obteniendo usuario:", userError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Usuario no válido' 
        }), 
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log("🟢 Usuario autenticado:", user.id, "Campo:", field);

    // Validaciones específicas por campo
    let processedValue = value;
    
    if (field === 'full_name') {
      if (!value || value.trim().length < 2) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'El nombre debe tener al menos 2 caracteres' 
          }), 
          { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
      
      const words = value.trim().split(/\s+/);
      if (words.length < 2) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'El nombre debe tener al menos 2 palabras' 
          }), 
          { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
      
      processedValue = value.trim();
    }
    
    if (field === 'phone') {
      if (value && !/^\d{9}$/.test(value)) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'El teléfono debe tener exactamente 9 dígitos' 
          }), 
          { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }
    
    // Validaciones específicas para redes sociales
    if (field === 'instagram') {
      if (value) {
        // Limpiar @ si lo incluye y validar formato de usuario
        const username = value.replace('@', '').trim();
        if (!/^[a-zA-Z0-9._]+$/.test(username) || username.length < 1) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'Usuario de Instagram inválido. Solo letras, números, puntos y guiones bajos' 
            }), 
            { 
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
        processedValue = username;
      }
    }
    
    if (field === 'tiktok') {
      if (value) {
        // Limpiar @ si lo incluye y validar formato de usuario
        const username = value.replace('@', '').trim();
        if (!/^[a-zA-Z0-9._]+$/.test(username) || username.length < 1) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'Usuario de TikTok inválido. Solo letras, números, puntos y guiones bajos' 
            }), 
            { 
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
        processedValue = username;
      }
    }
    
    if (field === 'x') {
      if (value) {
        // Limpiar @ si lo incluye y validar formato de usuario
        const username = value.replace('@', '').trim();
        if (!/^[a-zA-Z0-9_]+$/.test(username) || username.length < 1) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'Usuario de X (Twitter) inválido. Solo letras, números y guiones bajos' 
            }), 
            { 
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
        processedValue = username;
      }
    }
    
    if (field === 'linkedin') {
      if (value) {
        // Validar formato LinkedIn: www.linkedin.com/in/usuario o linkedin.com/in/usuario
        const linkedinPattern = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
        if (!linkedinPattern.test(value.trim())) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'URL de LinkedIn inválida. Formato: www.linkedin.com/in/usuario' 
            }), 
            { 
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
        
        // Normalizar la URL (agregar https:// si no lo tiene)
        let normalizedUrl = value.trim();
        if (!normalizedUrl.startsWith('http')) {
          normalizedUrl = 'https://' + normalizedUrl;
        }
        processedValue = normalizedUrl;
      }
    }

    // Usar cliente autenticado para actualizar solo con RLS
    const authenticatedClient = createAuthenticatedSupabaseClient(accessToken, refreshToken);
    
    const { error } = await authenticatedClient
      .from('users')
      .update({ [field]: processedValue })
      .eq('id', user.id);

    if (error) {
      console.error('❌ Error actualizando perfil:', error);
      
      // Manejar errores de duplicados específicos
      if (error.code === '23505') {
        if (error.message.includes('users_dni_key')) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'Este DNI ya está registrado por otro usuario' 
            }), 
            { 
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
        
        if (error.message.includes('users_phone_key')) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'Este número de teléfono ya está registrado por otro usuario' 
            }), 
            { 
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
        
        if (error.message.includes('users_instagram_key')) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'Este usuario de Instagram ya está registrado por otro usuario' 
            }), 
            { 
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
        
        if (error.message.includes('users_tiktok_key')) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'Este usuario de TikTok ya está registrado por otro usuario' 
            }), 
            { 
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
        
        if (error.message.includes('users_x_key')) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'Este usuario de X ya está registrado por otro usuario' 
            }), 
            { 
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
        
        if (error.message.includes('users_linkedin_key')) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'Esta URL de LinkedIn ya está registrada por otro usuario' 
            }), 
            { 
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
        
        // Error de duplicado genérico
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Ya existe un usuario con este valor' 
          }), 
          { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Error al actualizar el perfil: ' + error.message 
        }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log("✅ Perfil actualizado correctamente para el usuario:", user.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Perfil actualizado correctamente' 
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('❌ Error en update-profile:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Error interno del servidor' 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
