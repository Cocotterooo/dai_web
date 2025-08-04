import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
    console.log('📝 === API AUTH REGISTER ===');
    
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const phone = formData.get("phone")?.toString();
    const dni = formData.get("dni")?.toString();
    const fullName = formData.get("fullName")?.toString();

    console.log('📋 Datos de registro:', {
        hasEmail: !!email,
        hasPassword: !!password,
        hasPhone: !!phone,
        hasDni: !!dni,
        hasFullName: !!fullName,
    });

    // Validación de campos obligatorios
    if (!email || !password || !phone || !dni || !fullName) {
        console.error('❌ Todos los campos son requeridos');
        return new Response("Email, contraseña, teléfono, DNI y nombre completo son requeridos", { status: 400 });
    }

    // Validación básica de DNI (9 caracteres, 8 números + 1 letra)
    const dniRegex = /^[0-9]{8}[A-Za-z]$/;
    if (!dniRegex.test(dni)) {
        console.error('❌ DNI inválido');
        return new Response("DNI debe tener formato válido (8 números + 1 letra)", { status: 400 });
    }

    // Validación básica de teléfono (9 dígitos)
    const phoneRegex = /^[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
        console.error('❌ Teléfono inválido');
        return new Response("Teléfono debe tener 9 dígitos", { status: 400 });
    }

    console.log('🔐 Registrando usuario con Supabase...');
    
    // 1. Registrar en auth.users con metadatos básicos
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                phone: phone,
                dni: dni,
            }
        }
    });

    if (authError) {
        console.error('❌ Error registrando usuario:', authError);
        return new Response(authError.message, { status: 500 });
    }

    // 2. Crear perfil detallado en user_profiles (si la tabla existe)
    if (authData.user) {
        console.log('👤 Creando perfil de usuario...');
        const { error: profileError } = await supabase
            .from('user_profiles')
            .insert({
                id: authData.user.id,
                full_name: fullName,
                phone: phone,
                dni: dni,
            });

        if (profileError) {
            console.warn('⚠️ Error creando perfil extendido (tabla user_profiles no existe):', profileError.message);
            // No fallar el registro por esto - la tabla podría no existir aún
        } else {
            console.log('✅ Perfil extendido creado exitosamente');
        }
    }

    console.log('✅ Usuario registrado exitosamente con metadatos adicionales');
    return redirect("/auth?message=check_email");
};