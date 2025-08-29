import { c as createComponent, b as createAstro, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../chunks/astro/server_BKdtxvi7.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_C3WOZSUX.mjs';
import { $ as $$DAILogo } from '../chunks/DAILogo_NxZ-ndM4.mjs';
import { $ as $$Input, b as $$DNIInput, a as $$PhoneInput } from '../chunks/phone-input_Dllun-VX.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$CompleteProfile = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CompleteProfile;
  const user = Astro2.locals.user;
  Astro2.locals.email;
  if (!user) {
    return Astro2.redirect("/auth");
  }
  const hasPhone = user.user_metadata?.phone;
  const hasDni = user.user_metadata?.dni;
  const hasFullName = user.user_metadata?.full_name;
  if (hasPhone && hasDni && hasFullName) {
    return Astro2.redirect("/profile");
  }
  console.log("=== COMPLETAR PERFIL ===");
  console.log("Usuario:", user.email);
  console.log("Metadatos actuales:", user.user_metadata);
  const url = new URL(Astro2.request.url);
  const errorParam = url.searchParams.get("error");
  const messageParam = url.searchParams.get("message");
  if (errorParam) {
    console.log("\u274C Error detectado en URL:", errorParam, messageParam);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Completar Perfil - DAI" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen flex items-center justify-center p-6"> <div class="w-full max-w-md"> <div class="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8"> <!-- Header --> <div class="text-center mb-8"> <div class="flex justify-center mb-4"> ${renderComponent($$result2, "DAILogo", $$DAILogo, { "size": "md" })} </div> <h1 class="text-2xl font-bold text-white mb-2">
Completa tu perfil
</h1> <p class="text-white/70">
Necesitamos algunos datos adicionales para completar tu registro
</p> </div> <!-- Mensajes de error --> ${errorParam && renderTemplate`<div class="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg"> <p class="text-red-200 text-sm"> ${messageParam ? decodeURIComponent(messageParam) : errorParam} </p> </div>`} <!-- Información del usuario actual --> <div class="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg"> <div class="flex items-center gap-3"> ${user.user_metadata?.avatar_url && renderTemplate`<img${addAttribute(user.user_metadata.avatar_url, "src")} alt="Avatar" class="w-10 h-10 rounded-full">`} <div class="flex-1"> <p class="text-green-200 text-sm font-medium"> ${hasFullName ? user.user_metadata.full_name : user.user_metadata?.name || "Nombre por completar"} </p> <p class="text-green-200/80 text-xs"> ${user.email} </p> ${!hasFullName && renderTemplate`<p class="text-yellow-200 text-xs mt-1">
⚠️ Se requiere nombre completo
</p>`} </div> </div> </div> <!-- Formulario de completar perfil --> <form action="/api/auth/complete-profile" method="post" class="space-y-4"> <!-- Nombre completo --> <div> <label for="full_name" class="block text-sm font-medium text-white/90 mb-2">
Nombre completo *
</label> ${renderComponent($$result2, "Input", $$Input, { "type": "text", "name": "full_name", "id": "full_name", "placeholder": "Nombre y apellido(s)", "variant": "auth", "required": true, "className": "text-white", "value": user.user_metadata?.full_name || user.user_metadata?.name || "" })} <p class="text-white/60 text-xs mt-1">
Debe incluir al menos un nombre y un apellido
</p> </div> <!-- DNI solo si no lo tiene --> ${!hasDni && renderTemplate`${renderComponent($$result2, "DNIInput", $$DNIInput, {})}`} <!-- Teléfono solo si no lo tiene --> ${!hasPhone && renderTemplate`${renderComponent($$result2, "PhoneInput", $$PhoneInput, {})}`} <button type="submit" class="w-full bg-dai text-white py-3 px-4 rounded-lg font-medium hover:bg-dai/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
Completar Perfil
</button> </form> <!-- Botón para completar después (opcional, solo para OAuth) --> ${user.app_metadata?.provider && user.app_metadata?.provider !== "email" && renderTemplate`<div class="mt-4"> <a href="/profile?skip_profile=true" class="w-full block text-center bg-gray-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
Completar después
</a> <p class="text-xs text-white/60 mt-2 text-center">
Podrás acceder con funcionalidad limitada
</p> </div>`} <!-- Texto del footer --> <div class="text-center text-white/60 text-sm mt-6">
Estos datos son obligatorios para acceder a todos los servicios de DAI
<br> <span class="text-xs">El nombre completo debe incluir al menos un nombre y un apellido</span> </div> </div> </div> </main> ` })} ${renderScript($$result, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/complete-profile.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/complete-profile.astro", void 0);

const $$file = "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/complete-profile.astro";
const $$url = "/complete-profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$CompleteProfile,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
