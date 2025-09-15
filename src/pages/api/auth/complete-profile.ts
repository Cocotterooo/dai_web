import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

// Funciones de validación de DNI/NIE
function calculateDNILetter(dni: number): string {
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    return letters[dni % 23];
}

function calculateNIELetter(firstChar: string, numbers: string): string {
    let nieNumber: string;
    switch(firstChar) {
        case 'X': nieNumber = '0' + numbers; break;
        case 'Y': nieNumber = '1' + numbers; break;
        case 'Z': nieNumber = '2' + numbers; break;
        default: return '';
    }
    
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    return letters[parseInt(nieNumber) % 23];
}

function isValidDNI(dni: string): boolean {
    const dniPattern = /^[0-9]{8}[A-Z]$/;
    if (!dniPattern.test(dni)) return false;
    
    const dniNumber = dni.slice(0, 8);
    const dniLetter = dni[8];
    const expectedLetter = calculateDNILetter(parseInt(dniNumber));
    
    return dniLetter === expectedLetter;
}

function isValidNIE(nie: string): boolean {
    const niePattern = /^[XYZ][0-9]{7}[A-Z]$/;
    if (!niePattern.test(nie)) return false;
    
    const firstChar = nie[0];
    const nieNumbers = nie.slice(1, 8);
    const nieLetter = nie[8];
    const expectedLetter = calculateNIELetter(firstChar, nieNumbers);
    
    return nieLetter === expectedLetter;
}

function validateDocument(document: string): boolean {
    if (!document || document.length !== 9) return false;
    
    const firstChar = document[0];
    const isNIE = ['X', 'Y', 'Z'].includes(firstChar);
    
    return isNIE ? isValidNIE(document) : isValidDNI(document);
}

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
    const fullName = formData.get("full_name")?.toString();

    console.log('📋 Datos para completar perfil:', {
        userId: user.id,
        email: user.email,
        hasPhone: !!phone,
        hasDni: !!dni,
        hasFullName: !!fullName,
        currentMetadata: user.user_metadata,
    });

    // Validar nombre completo (siempre requerido)
    if (!fullName || fullName.trim().length === 0) {
        console.error('❌ Nombre completo requerido');
        return redirect("/complete-profile?error=missing_full_name&message=" + encodeURIComponent("El nombre completo es obligatorio"));
    }

    // Validar que tenga al menos nombre y apellido
    const nameWords = fullName.trim().split(/\s+/);
    if (nameWords.length < 2) {
        console.error('❌ Nombre completo debe incluir nombre y apellido');
        return redirect("/complete-profile?error=invalid_full_name&message=" + encodeURIComponent("Debe incluir al menos un nombre y un apellido"));
    }

    // Validar que no contenga números o caracteres especiales
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!nameRegex.test(fullName)) {
        console.error('❌ Nombre contiene caracteres inválidos');
        return redirect("/complete-profile?error=invalid_full_name&message=" + encodeURIComponent("El nombre solo puede contener letras y espacios"));
    }

    // Validar campos si se proporcionan
    if (dni) {
        const dniUpper = dni.toUpperCase().trim();
        if (!validateDocument(dniUpper)) {
            console.error('❌ DNI/NIE inválido');
            return redirect("/complete-profile?error=invalid_dni&message=" + encodeURIComponent("DNI/NIE debe tener formato válido"));
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
        full_name: fullName.trim(),
        ...(phone && { phone }),
        ...(dni && { dni: dni.toUpperCase().trim() }),
    };

    console.log('🔄 Actualizando metadatos del usuario...');
    
    // Actualizar metadatos del usuario
    const { error: updateError } = await supabase.auth.updateUser({
        data: updatedMetadata
    });

    if (updateError) {
        console.error('❌ Error actualizando perfil:', updateError);
        return redirect("/complete-profile?error=update_failed&message=" + 'Error actualizando perfil... (Probablemente alguno de los datos ya este en uso)');
    }

    // También crear/actualizar en user_profiles si la tabla existe
    try {
        const { error: profileError } = await supabase
            .from('user_profiles')
            .upsert({
                id: user.id,
                full_name: updatedMetadata.full_name,
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
    return redirect("/profile");
};
