import { s as supabase } from '../../../chunks/supabase_CcsmWd0j.mjs';
export { renderers } from '../../../renderers.mjs';

async function enhanceGoogleAvatar(user) {
  const currentAvatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;
  if (!currentAvatarUrl) {
    console.log("⚠️ No se encontró URL de avatar");
    return;
  }
  console.log("🔍 Avatar URL actual:", currentAvatarUrl);
  let enhancedUrl = currentAvatarUrl;
  if (currentAvatarUrl.includes("googleusercontent.com")) {
    enhancedUrl = currentAvatarUrl.replace(/=s\d+-c$/, "=s400-c").replace(/=s\d+$/, "=s400").replace(/\/s\d+\//, "/s400/");
    if (!enhancedUrl.includes("=s") && !enhancedUrl.includes("/s")) {
      enhancedUrl += enhancedUrl.includes("?") ? "&sz=400" : "?sz=400";
    }
  }
  console.log("✨ Avatar URL mejorado:", enhancedUrl);
  if (enhancedUrl !== currentAvatarUrl) {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          ...user.user_metadata,
          avatar_url: enhancedUrl,
          picture: enhancedUrl,
          // También actualizar picture por compatibilidad
          original_avatar_url: currentAvatarUrl
          // Guardar la original por si acaso
        }
      });
      if (error) {
        console.error("❌ Error actualizando avatar:", error);
      } else {
        console.log("✅ Avatar actualizado exitosamente");
      }
    } catch (error) {
      console.error("❌ Error al actualizar metadatos del usuario:", error);
    }
  } else {
    console.log("ℹ️ URL del avatar no necesita mejoras");
  }
}
const GET = async ({ url, cookies, redirect }) => {
  console.log("🔄 === API AUTH CALLBACK ===");
  console.log("URL completa:", url.toString());
  const authCode = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const errorDescription = url.searchParams.get("error_description");
  console.log("📋 Parámetros recibidos:", {
    hasCode: !!authCode,
    error,
    errorDescription
  });
  if (error) {
    console.error("❌ Error OAuth recibido:", error, errorDescription);
    return redirect(`/auth?error=${error}&message=${encodeURIComponent(errorDescription || error)}`);
  }
  if (!authCode) {
    console.error("❌ No se recibió código de autorización");
    return redirect("/auth?error=no_code");
  }
  console.log("🔑 Intercambiando código por sesión...");
  const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(authCode);
  if (exchangeError) {
    console.error("❌ Error intercambiando código por sesión:", exchangeError);
    return redirect("/auth?error=callback_error");
  }
  if (!data.session) {
    console.error("❌ No se obtuvo sesión después del intercambio");
    return redirect("/auth?error=no_session");
  }
  console.log("✅ Sesión obtenida exitosamente:", {
    userId: data.session.user.id,
    email: data.session.user.email,
    provider: data.session.user.app_metadata?.provider
  });
  if (data.session.user.app_metadata?.provider === "google") {
    console.log("🖼️ Procesando avatar de Google...");
    await enhanceGoogleAvatar(data.session.user);
  }
  const { access_token, refresh_token } = data.session;
  cookies.set("sb-access-token", access_token, {
    sameSite: "strict",
    path: "/",
    secure: true,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7
    // 7 días
  });
  cookies.set("sb-refresh-token", refresh_token, {
    sameSite: "strict",
    path: "/",
    secure: true,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30
    // 30 días
  });
  console.log("🍪 Cookies de sesión configuradas");
  const isOAuthUser = data.session.user.app_metadata?.provider !== "email";
  const hasRequiredData = data.session.user.user_metadata?.phone && data.session.user.user_metadata?.dni;
  let redirectUrl = "/profile";
  if (isOAuthUser && !hasRequiredData) {
    redirectUrl = "/complete-profile";
    console.log("🎯 Usuario OAuth sin perfil completo, redirigiendo a completar perfil");
  } else {
    console.log("🎯 Redirigiendo al perfil");
  }
  return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Autenticación exitosa</title>
        </head>
        <body>
            <script>
                console.log('🔄 Redirigiendo desde callback...');
                window.location.href = '${redirectUrl}';
            </script>
            <p>Autenticación exitosa. Redirigiendo...</p>
        </body>
        </html>
    `, {
    status: 200,
    headers: {
      "Content-Type": "text/html"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
