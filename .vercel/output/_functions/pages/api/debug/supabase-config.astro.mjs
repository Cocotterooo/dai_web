export { renderers } from '../../../renderers.mjs';

const GET = async ({ request }) => {
  console.log("🔍 === DIAGNÓSTICO DE CONFIGURACIÓN SUPABASE ===");
  try {
    const supabaseUrl = "https://dyexolosxkftwblwotig.supabase.co";
    const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5ZXhvbG9zeGtmdHdibHdvdGlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxOTU2MjEsImV4cCI6MjA2ODc3MTYyMX0.rFq80MtpXMNrS1e0KA1CluPGtpZ3EOeQM8QPWCTEelA";
    const baseUrl = new URL(request.url).origin;
    console.log("📋 Configuración actual:");
    console.log("   - Supabase URL:", supabaseUrl || "[FALTA]");
    console.log("   - Supabase Anon Key:", supabaseAnonKey ? "[CONFIGURADA]" : "[FALTA]");
    console.log("   - Base URL de la app:", baseUrl);
    console.log("   - URL de confirmación:", `${baseUrl}/auth/confirm`);
    return new Response(JSON.stringify({
      supabase_configured: !!(supabaseUrl && supabaseAnonKey),
      base_url: baseUrl,
      confirmation_url: `${baseUrl}/auth/confirm`,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      message: "Revisar logs del servidor para más detalles"
    }, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("❌ Error en diagnóstico:", error);
    return new Response(JSON.stringify({
      error: "Error en diagnóstico",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
