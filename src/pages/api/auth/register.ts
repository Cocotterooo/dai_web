import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import { createClient } from '@supabase/supabase-js';

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

    // 1. Registrar en auth.users con metadatos extra (full_name, phone, dni)
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                phone: phone,
                dni: dni,
            },
            // URL de confirmación personalizada
            emailRedirectTo: `${new URL(request.url).origin}/auth/confirm`,
        }
    });

    // Imprimir TODA la respuesta de Supabase Auth
    console.log('📊 === RESPUESTA COMPLETA DE SUPABASE AUTH ===');
    console.log('✅ authData:', JSON.stringify(authData, null, 2));
    console.log('❌ authError:', JSON.stringify(authError, null, 2));
    
    if (authError) {
        console.error('❌ Error registrando usuario:');
        console.error('   - Message:', authError.message);
        console.error('   - Name:', authError.name || 'N/A');
        console.error('   - Status:', (authError as any).status || 'N/A');
        console.error('   - Full Error:', JSON.stringify(authError, null, 2));
        return new Response(authError.message, { status: 500 });
    }

    if (!authData.user) {
        console.error('❌ No se pudo crear el usuario');
        return new Response("Error creando usuario", { status: 500 });
    }

    console.log('✅ Usuario registrado exitosamente:');
    console.log('   - ID:', authData.user.id);
    console.log('   - Email:', authData.user.email);
    console.log('   - Confirmación requerida:', !authData.user.email_confirmed_at);
    console.log('   - Email de confirmación enviado en:', authData.user.confirmation_sent_at);
    console.log('   - Provider:', authData.user.app_metadata?.provider);
    console.log('   - URL de confirmación configurada:', `${new URL(request.url).origin}/auth/confirm`);
    
    // Verificar si el email fue enviado
    if (authData.user.confirmation_sent_at) {
        console.log('✅ Supabase reporta que el email de confirmación fue enviado');
        console.log('   - Fecha/Hora de envío:', authData.user.confirmation_sent_at);
        console.log('   - Si no llega, revisar:');
        console.log('     1. Carpeta de spam/correo no deseado');
        console.log('     2. Configuración de email templates en Supabase');
        console.log('     3. Configuración SMTP en Supabase');
        console.log('     4. Límites de rate limiting');
    } else {
        console.log('❌ Supabase NO reporta envío de email de confirmación');
    }
    
    // Redirigir a la página de confirmación pendiente con el email
    const emailParam = encodeURIComponent(email);
    return redirect(`/auth/email-confirmation-pending?email=${emailParam}`);
};