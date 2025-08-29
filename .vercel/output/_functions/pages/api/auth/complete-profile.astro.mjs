import { s as supabase } from '../../../chunks/supabase_CcsmWd0j.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, redirect, cookies }) => {
  console.log("📝 === API COMPLETE PROFILE ===");
  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;
  if (!accessToken || !refreshToken) {
    console.error("❌ No hay sesión activa");
    return redirect("/auth");
  }
  const { data: { user }, error: sessionError } = await supabase.auth.getUser(accessToken);
  if (sessionError || !user) {
    console.error("❌ Error verificando sesión:", sessionError);
    return redirect("/auth");
  }
  const formData = await request.formData();
  const phone = formData.get("phone")?.toString();
  const dni = formData.get("dni")?.toString();
  const fullName = formData.get("full_name")?.toString();
  console.log("📋 Datos para completar perfil:", {
    userId: user.id,
    email: user.email,
    hasPhone: !!phone,
    hasDni: !!dni,
    hasFullName: !!fullName,
    currentMetadata: user.user_metadata
  });
  if (!fullName || fullName.trim().length === 0) {
    console.error("❌ Nombre completo requerido");
    return redirect("/complete-profile?error=missing_full_name&message=" + encodeURIComponent("El nombre completo es obligatorio"));
  }
  const nameWords = fullName.trim().split(/\s+/);
  if (nameWords.length < 2) {
    console.error("❌ Nombre completo debe incluir nombre y apellido");
    return redirect("/complete-profile?error=invalid_full_name&message=" + encodeURIComponent("Debe incluir al menos un nombre y un apellido"));
  }
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!nameRegex.test(fullName)) {
    console.error("❌ Nombre contiene caracteres inválidos");
    return redirect("/complete-profile?error=invalid_full_name&message=" + encodeURIComponent("El nombre solo puede contener letras y espacios"));
  }
  if (dni) {
    const dniRegex = /^[0-9]{8}[A-Za-z]$/;
    if (!dniRegex.test(dni)) {
      console.error("❌ DNI inválido");
      return redirect("/complete-profile?error=invalid_dni&message=" + encodeURIComponent("DNI debe tener formato válido (8 números + 1 letra)"));
    }
  }
  if (phone) {
    const phoneRegex = /^[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      console.error("❌ Teléfono inválido");
      return redirect("/complete-profile?error=invalid_phone&message=" + encodeURIComponent("Teléfono debe tener 9 dígitos"));
    }
  }
  const currentMetadata = user.user_metadata || {};
  const updatedMetadata = {
    ...currentMetadata,
    full_name: fullName.trim(),
    ...phone && { phone },
    ...dni && { dni }
  };
  console.log("🔄 Actualizando metadatos del usuario...");
  const { error: updateError } = await supabase.auth.updateUser({
    data: updatedMetadata
  });
  if (updateError) {
    console.error("❌ Error actualizando perfil:", updateError);
    return redirect("/complete-profile?error=update_failed&message=" + encodeURIComponent(updateError.message));
  }
  try {
    const { error: profileError } = await supabase.from("user_profiles").upsert({
      id: user.id,
      full_name: updatedMetadata.full_name,
      phone: updatedMetadata.phone,
      dni: updatedMetadata.dni,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    });
    if (profileError) {
      console.warn("⚠️ Error actualizando tabla user_profiles:", profileError.message);
    } else {
      console.log("✅ Perfil extendido actualizado");
    }
  } catch (error) {
    console.log("ℹ️ Tabla user_profiles no existe o no se pudo acceder");
  }
  console.log("✅ Perfil completado exitosamente");
  return redirect("/profile");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
