import { s as supabase } from '../../../chunks/supabase_CcsmWd0j.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, redirect }) => {
  console.log("📝 === API AUTH REGISTER ===");
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const phone = formData.get("phone")?.toString();
  const dni = formData.get("dni")?.toString();
  const fullName = formData.get("fullName")?.toString();
  console.log("📋 Datos de registro:", {
    hasEmail: !!email,
    hasPassword: !!password,
    hasPhone: !!phone,
    hasDni: !!dni,
    hasFullName: !!fullName
  });
  if (!email || !password || !phone || !dni || !fullName) {
    console.error("❌ Todos los campos son requeridos");
    return new Response("Email, contraseña, teléfono, DNI y nombre completo son requeridos", { status: 400 });
  }
  const dniRegex = /^[0-9]{8}[A-Za-z]$/;
  if (!dniRegex.test(dni)) {
    console.error("❌ DNI inválido");
    return new Response("DNI debe tener formato válido (8 números + 1 letra)", { status: 400 });
  }
  const phoneRegex = /^[0-9]{9}$/;
  if (!phoneRegex.test(phone)) {
    console.error("❌ Teléfono inválido");
    return new Response("Teléfono debe tener 9 dígitos", { status: 400 });
  }
  console.log("🔐 Registrando usuario con Supabase...");
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone,
        dni
      },
      // URL de confirmación personalizada
      emailRedirectTo: `${new URL(request.url).origin}/auth/confirm`
    }
  });
  console.log("📊 === RESPUESTA COMPLETA DE SUPABASE AUTH ===");
  console.log("✅ authData:", JSON.stringify(authData, null, 2));
  console.log("❌ authError:", JSON.stringify(authError, null, 2));
  if (authError) {
    console.error("❌ Error registrando usuario:");
    console.error("   - Message:", authError.message);
    console.error("   - Name:", authError.name || "N/A");
    console.error("   - Status:", authError.status || "N/A");
    console.error("   - Full Error:", JSON.stringify(authError, null, 2));
    return new Response(authError.message, { status: 500 });
  }
  if (!authData.user) {
    console.error("❌ No se pudo crear el usuario");
    return new Response("Error creando usuario", { status: 500 });
  }
  console.log("✅ Usuario registrado exitosamente:");
  console.log("   - ID:", authData.user.id);
  console.log("   - Email:", authData.user.email);
  console.log("   - Confirmación requerida:", !authData.user.email_confirmed_at);
  console.log("   - Email de confirmación enviado en:", authData.user.confirmation_sent_at);
  console.log("   - Provider:", authData.user.app_metadata?.provider);
  console.log("   - URL de confirmación configurada:", `${new URL(request.url).origin}/auth/confirm`);
  if (authData.user.confirmation_sent_at) {
    console.log("✅ Supabase reporta que el email de confirmación fue enviado");
    console.log("   - Fecha/Hora de envío:", authData.user.confirmation_sent_at);
    console.log("   - Si no llega, revisar:");
    console.log("     1. Carpeta de spam/correo no deseado");
    console.log("     2. Configuración de email templates en Supabase");
    console.log("     3. Configuración SMTP en Supabase");
    console.log("     4. Límites de rate limiting");
  } else {
    console.log("❌ Supabase NO reporta envío de email de confirmación");
  }
  const emailParam = encodeURIComponent(email);
  return redirect(`/auth/email-confirmation-pending?email=${emailParam}`);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
