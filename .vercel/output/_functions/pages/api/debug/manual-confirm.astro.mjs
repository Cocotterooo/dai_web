import { s as supabase } from '../../../chunks/supabase_CcsmWd0j.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  console.log("🔧 === CONFIRMACIÓN MANUAL DE USUARIO ===");
  try {
    const { email } = await request.json();
    if (!email) {
      return new Response(JSON.stringify({
        error: "Email es requerido"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    console.log("📧 Intentando confirmación manual para:", email);
    console.log("🔄 Reenviando email de confirmación...");
    const { data: resendData, error: resendError } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${new URL(request.url).origin}/auth/confirm`
      }
    });
    if (resendError) {
      console.error("❌ Error reenviando email:", resendError.message);
      return new Response(JSON.stringify({
        error: resendError.message,
        details: "No se pudo reenviar el email de confirmación"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    console.log("✅ Email de confirmación reenviado");
    console.log("   - Respuesta:", resendData);
    return new Response(JSON.stringify({
      success: true,
      message: "Email de confirmación reenviado exitosamente",
      email,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("❌ Error en confirmación manual:", error);
    return new Response(JSON.stringify({
      error: "Error interno del servidor"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
