import { s as supabase } from '../../../chunks/supabase_CcsmWd0j.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const provider = formData.get("provider")?.toString();
  console.log("🚀 === API AUTH SIGNIN ===");
  console.log("Provider:", provider);
  console.log("Has email:", !!email);
  console.log("Has password:", !!password);
  if (provider) {
    console.log("📡 Iniciando OAuth con provider:", provider);
    const { data: data2, error: error2 } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "http://localhost:4321/api/auth/callback" 
      }
    });
    if (error2) {
      console.error("❌ Error OAuth:", error2);
      return new Response(error2.message, { status: 500 });
    }
    console.log("✅ OAuth URL generada:", data2.url);
    return redirect(data2.url);
  }
  if (!email || !password) {
    return new Response("Email y contraseña son requeridos", { status: 400 });
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) {
    console.error("❌ Error login email/password:", error);
    return new Response(error.message, { status: 500 });
  }
  if (!data.session) {
    return new Response("No se pudo crear la sesión", { status: 500 });
  }
  const { access_token, refresh_token } = data.session;
  cookies.set("sb-access-token", access_token, {
    sameSite: "strict",
    path: "/",
    secure: true,
    httpOnly: true
  });
  cookies.set("sb-refresh-token", refresh_token, {
    sameSite: "strict",
    path: "/",
    secure: true,
    httpOnly: true
  });
  console.log("✅ Login exitoso con email/password");
  return redirect("/profile");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
