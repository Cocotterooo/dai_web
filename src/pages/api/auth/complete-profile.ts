import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
    console.log('📝 === API COMPLETE PROFILE ===');
    
    // Obtener usuario actual de las cookies
    const accessToken = cookies.get("sb-access-token")?.value;
    const refreshToken = cookies.get("sb-refresh-token")?.value;

    if (!accessToken || !refreshToken) {
        console.error('❌ No hay sesión activa');
        return redirect("/auth");
    }

    // Verificar sesión
    const { data: { user }, error: sessionError } = await supabase.auth.getUser(accessToken);
    
    if (sessionError || !user) {
        console.error('❌ Error verificando sesión:', sessionError);
        return redirect("/auth");
    }

    const formData = await request.formData();
    const phone = formData.get("phone")?.toString();
    const dni = formData.get("dni")?.toString();

    console.log('📋 Datos para completar perfil:', {
        userId: user.id,
        email: user.email,
        hasPhone: !!phone,
        hasDni: !!dni,
        currentMetadata: user.user_metadata,
    });

    // Validar campos si se proporcionan
    if (dni) {
        const dniRegex = /^[0-9]{8}[A-Za-z]$/;
        if (!dniRegex.test(dni)) {
            console.error('❌ DNI inválido');
            return redirect("/complete-profile?error=invalid_dni&message=" + encodeURIComponent("DNI debe tener formato válido (8 números + 1 letra)"));
        }
    }

    if (phone) {
        const phoneRegex = /^[0-9]{9}$/;
        if (!phoneRegex.test(phone)) {
            console.error('❌ Teléfono inválido');
            return redirect("/complete-profile?error=invalid_phone&message=" + encodeURIComponent("Teléfono debe tener 9 dígitos"));
        }
    }

    // Combinar metadatos existentes con los nuevos
    const currentMetadata = user.user_metadata || {};
    const updatedMetadata = {
        ...currentMetadata,
        ...(phone && { phone }),
        ...(dni && { dni }),
    };

    console.log('🔄 Actualizando metadatos del usuario...');
    
    // Actualizar metadatos del usuario
    const { error: updateError } = await supabase.auth.updateUser({
        data: updatedMetadata
    });

    if (updateError) {
        console.error('❌ Error actualizando perfil:', updateError);
        return redirect("/complete-profile?error=update_failed&message=" + encodeURIComponent(updateError.message));
    }

    // También crear/actualizar en user_profiles si la tabla existe
    try {
        const { error: profileError } = await supabase
            .from('user_profiles')
            .upsert({
                id: user.id,
                full_name: (updatedMetadata as any).full_name || (updatedMetadata as any).name || user.email?.split('@')[0],
                phone: updatedMetadata.phone,
                dni: updatedMetadata.dni,
                updated_at: new Date().toISOString(),
            });

        if (profileError) {
            console.warn('⚠️ Error actualizando tabla user_profiles:', profileError.message);
        } else {
            console.log('✅ Perfil extendido actualizado');
        }
    } catch (error) {
        console.log('ℹ️ Tabla user_profiles no existe o no se pudo acceder');
    }

    console.log('✅ Perfil completado exitosamente');
    return redirect("/dashboard");
};
