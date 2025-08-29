import { c as createComponent, b as createAstro } from '../../chunks/astro/server_BKdtxvi7.mjs';
import 'kleur/colors';
import 'clsx';
import '../../chunks/Layout_C3WOZSUX.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Confirm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Confirm;
  const token_hash = Astro2.url.searchParams.get("token_hash");
  const type = Astro2.url.searchParams.get("type");
  const next = Astro2.url.searchParams.get("next") || "/profile";
  console.log("\u{1F517} === EMAIL CONFIRMATION CALLBACK ===");
  console.log("   - URL completa:", Astro2.url.href);
  console.log("   - Token hash existe:", !!token_hash);
  console.log("   - Token hash (primeros 20 chars):", token_hash ? token_hash.substring(0, 20) + "..." : "N/A");
  console.log("   - Type:", type);
  console.log("   - Next:", next);
  console.log("   - Timestamp:", (/* @__PURE__ */ new Date()).toISOString());
  if (!token_hash || type !== "signup") {
    console.log("\u274C Par\xE1metros faltantes o inv\xE1lidos");
    console.log('   - Esperado: type="signup", token_hash=[string]');
    console.log('   - Recibido: type="' + type + '", token_hash=' + !!token_hash);
    return Astro2.redirect("/auth?message=invalid_confirmation_link&error=" + encodeURIComponent("Faltan par\xE1metros en el enlace"));
  }
  let confirmationError = null;
  try {
    console.log("\u{1F310} Haciendo petici\xF3n a endpoint de confirmaci\xF3n...");
    const baseUrl = Astro2.url.origin;
    const confirmUrl = `${baseUrl}/api/auth/confirm-signup`;
    console.log("   - URL del endpoint:", confirmUrl);
    console.log("   - Payload:", { token_hash: token_hash.substring(0, 20) + "...", type });
    const confirmResponse = await fetch(confirmUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token_hash,
        type
      })
    });
    console.log("\u{1F4CA} Respuesta del endpoint:");
    console.log("   - Status:", confirmResponse.status);
    console.log("   - Status Text:", confirmResponse.statusText);
    console.log("   - Headers:", Object.fromEntries(confirmResponse.headers.entries()));
    const result = await confirmResponse.json();
    console.log("   - Result:", JSON.stringify(result, null, 2));
    if (confirmResponse.ok && result.success) {
      console.log("\u2705 Confirmaci\xF3n exitosa, redirigiendo al perfil...");
      return Astro2.redirect("/auth/email-confirmed?message=email_confirmed");
    } else {
      const errorMsg = result.error || result.technical_error || "Error desconocido";
      const errorCode = result.error_code || "unknown";
      console.error("\u274C Error en confirmaci\xF3n:");
      console.error("   - Error message:", errorMsg);
      console.error("   - Error code:", errorCode);
      console.error("   - Technical error:", result.technical_error);
      confirmationError = errorMsg;
      const errorParam = encodeURIComponent(errorMsg);
      const codeParam = encodeURIComponent(errorCode);
      return Astro2.redirect(`/auth?message=confirmation_error&error=${errorParam}&code=${codeParam}`);
    }
  } catch (error) {
    console.error("\u274C Excepci\xF3n procesando confirmaci\xF3n:");
    console.error("   - Error:", error);
    console.error("   - Message:", error instanceof Error ? error.message : "Unknown error");
    console.error("   - Stack:", error instanceof Error ? error.stack : "No stack trace");
    const errorMsg = error instanceof Error ? error.message : "Error interno del servidor";
    confirmationError = errorMsg;
    return Astro2.redirect(`/auth?message=confirmation_error&error=${encodeURIComponent(errorMsg)}`);
  }
  const finalError = confirmationError || "Error desconocido procesando confirmaci\xF3n";
  return Astro2.redirect(`/auth?message=confirmation_error&error=${encodeURIComponent(finalError)}`);
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/auth/confirm.astro", void 0);

const $$file = "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/auth/confirm.astro";
const $$url = "/auth/confirm";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Confirm,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
