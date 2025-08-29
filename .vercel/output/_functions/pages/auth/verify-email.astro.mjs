import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BKdtxvi7.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_C3WOZSUX.mjs';
import { $ as $$DAILogo } from '../../chunks/DAILogo_NxZ-ndM4.mjs';
import { $ as $$Button } from '../../chunks/Button_BRpzlBlR.mjs';
export { renderers } from '../../renderers.mjs';

const $$VerifyEmail = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Verifica tu email - DAI" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-gradient-to-br from-dai via-azul-brillante to-purple-600 flex items-center justify-center p-6"> <div class="w-full max-w-md"> <!-- Logo de la DAI --> <div class="flex justify-center mb-8"> ${renderComponent($$result2, "DAILogo", $$DAILogo, { "size": "md" })} </div> <!-- Contenedor principal --> <div class="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 text-center"> <!-- Icono de email --> <div class="w-20 h-20 bg-dai rounded-full flex items-center justify-center mx-auto mb-6"> <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg> </div> <h1 class="text-3xl font-bold text-white mb-4">¡Revisa tu email!</h1> <p class="text-white/80 mb-6 leading-relaxed">
Te hemos enviado un enlace de verificación a tu correo electrónico. 
            Haz clic en el enlace para activar tu cuenta.
</p> <div class="space-y-4"> ${renderComponent($$result2, "Button", $$Button, { "variant": "primary", "size": "md", "className": "w-full" }, { "default": ($$result3) => renderTemplate` <a href="https://gmail.com" target="_blank" rel="noopener noreferrer" class="block w-full">
Abrir Gmail
</a> ` })} ${renderComponent($$result2, "Button", $$Button, { "variant": "secondary", "size": "sm", "className": "w-full" }, { "default": ($$result3) => renderTemplate` <a href="/auth" class="block w-full">
Volver al login
</a> ` })} </div> <!-- Información adicional --> <div class="mt-8 p-4 bg-white/5 rounded-lg"> <p class="text-white/60 text-sm">
¿No has recibido el email? Revisa tu carpeta de spam o intenta registrarte de nuevo.
</p> </div> </div> <!-- Enlace para volver al inicio --> <div class="text-center mt-6"> <a href="/" class="text-white/80 hover:text-white transition-colors duration-300 text-sm">
← Volver al inicio
</a> </div> </div> </main> ` })}`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/auth/verify-email.astro", void 0);

const $$file = "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/auth/verify-email.astro";
const $$url = "/auth/verify-email";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$VerifyEmail,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
