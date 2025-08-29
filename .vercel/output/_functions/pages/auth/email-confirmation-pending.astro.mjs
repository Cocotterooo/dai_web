import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as renderScript } from '../../chunks/astro/server_BKdtxvi7.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_C3WOZSUX.mjs';
import { $ as $$AuthLayout } from '../../chunks/AuthLayout_QvpN_Tye.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$EmailConfirmationPending = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$EmailConfirmationPending;
  const email = Astro2.url.searchParams.get("email") || "";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Confirma tu Email - DAI" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AuthLayout", $$AuthLayout, {}, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-100"> <!-- Icono de email --> <div class="text-center mb-6"> <div class="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4"> <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg> </div> <h1 class="text-2xl font-bold text-gray-800 mb-2">
¡Confirma tu email!
</h1> </div> <!-- Mensaje principal --> <div class="text-center mb-8"> <p class="text-gray-600 mb-4">
Hemos enviado un enlace de confirmación a:
</p> ${email && renderTemplate`<p class="text-lg font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg mb-4"> ${email} </p>`} <p class="text-gray-600 text-sm mb-6">
Por favor, revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta.
</p> <!-- Indicador de estado --> <div class="flex items-center justify-center space-x-2 text-amber-600 mb-6"> <div class="animate-spin w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full"></div> <span class="font-medium">Esperando confirmación...</span> </div> </div> <!-- Instrucciones --> <div class="bg-gray-50 rounded-lg p-4 mb-6"> <h3 class="font-semibold text-gray-700 mb-2">¿No ves el email?</h3> <ul class="text-sm text-gray-600 space-y-1"> <li>• Revisa tu carpeta de spam o correo no deseado</li> <li>• Verifica que el email sea correcto</li> <li>• Puede tardar unos minutos en llegar</li> </ul> <!-- Enlace al diagnóstico --> <div class="mt-3 pt-3 border-t border-gray-200"> <a href="/email-diagnosis" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
🔧 Diagnóstico de problemas con email →
</a> </div> </div> <!-- Botones de acción --> <div class="space-y-4"> <button id="resend-email" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300">
Reenviar email de confirmación
</button> <a href="/auth" class="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition duration-300">
Volver al login
</a> </div> </div>  ${renderScript($$result3, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/auth/email-confirmation-pending.astro?astro&type=script&index=0&lang.ts")} ` })} ` })}`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/auth/email-confirmation-pending.astro", void 0);

const $$file = "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/auth/email-confirmation-pending.astro";
const $$url = "/auth/email-confirmation-pending";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$EmailConfirmationPending,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
