import { c as createComponent, b as createAstro, m as maybeRenderHead, f as addAttribute, h as renderSlot, a as renderTemplate, d as renderScript, e as defineScriptVars, r as renderComponent } from '../chunks/astro/server_BKdtxvi7.mjs';
import 'kleur/colors';
import { c as createSvgComponent, I as InstagramIcon, L as LinkedInIcon, T as TikTokIcon, X as XIcon, $ as $$Layout } from '../chunks/Layout_C3WOZSUX.mjs';
import 'clsx';
import { $ as $$Button } from '../chunks/Button_BRpzlBlR.mjs';
import { U as User } from '../chunks/user_9DELL1oN.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$a = createAstro();
const $$BentoContainer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$BentoContainer;
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(`${Astro2.props.class} relative rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-4`, "class")}> <h2 class="font-semibold text-xl text-azul-brillante">${Astro2.props.title}</h2> ${Astro2.props.description && renderTemplate`<p class="text-gray-600">${Astro2.props.description}</p>`} ${renderSlot($$result, $$slots["default"])} </article>`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/profile/bento-container.astro", void 0);

var __freeze$4 = Object.freeze;
var __defProp$4 = Object.defineProperty;
var __template$4 = (cooked, raw) => __freeze$4(__defProp$4(cooked, "raw", { value: __freeze$4(cooked.slice()) }));
var _a$4;
const $$Astro$9 = createAstro();
const $$UserRoles = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$UserRoles;
  const user = Astro2.locals.user;
  Astro2.locals.userRoleIds || [];
  const roleNames = Astro2.locals.userRoleNames || [];
  let activeRoles = [];
  let hasError = false;
  let errorMessage = "";
  try {
    if (!user) {
      hasError = true;
      errorMessage = "Usuario no disponible";
    } else if (Array.isArray(roleNames) && roleNames.length > 0) {
      activeRoles = roleNames.filter((name) => name && name.trim() !== "").sort((a, b) => a.length - b.length).map((name) => {
        switch (name.toLowerCase()) {
          case "admin":
            return "Admin";
          case "secretario":
            return "Secretario";
          case "delegado":
            return "Delegado";
          case "subdelegado":
            return "Subdelegado";
          case "coord_comunicacion":
            return "Coord. Comunicaci\xF3n";
          case "coord_ocio_deportes":
            return "Coord. Ocio y Deportes";
          case "coord_asuntos_externos":
            return "Coord. Asuntos Externos";
          case "coord_infraestructuras":
            return "Coord. Infraestructuras";
          case "miembro_delegacion":
            return "Miembro Delegaci\xF3n";
          case "tutorando":
            return "Tutorando";
          default:
            return name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, " ");
        }
      });
    } else {
      activeRoles = [];
    }
    console.log("\u{1F3AD} Roles activos ordenados por longitud:", activeRoles);
  } catch (error) {
    console.error("Error procesando roles:", error);
    hasError = true;
    errorMessage = `Error procesando roles: ${error}`;
    activeRoles = [];
  }
  return renderTemplate`${hasError ? renderTemplate(_a$4 || (_a$4 = __template$4(["", '<div><div class="text-sm flex items-center gap-2"><div class="w-32 h-[15px] bg-white/10 rounded-full backdrop-blur-sm animate-pulse"></div></div><script>(function(){', "\n            console.warn('UserRoles: Mostrando skeleton debido a:', errorMessage);\n        })();<\/script></div>"])), maybeRenderHead(), defineScriptVars({ errorMessage })) : activeRoles.length > 0 ? renderTemplate`<div class="fixed translate-y-60"><div class="flex flex-wrap gap-2 justify-center sm:justify-center max-h-8 overflow-hidden transition-all duration-300" id="roles-container">${activeRoles.slice(0, 2).map((role) => renderTemplate`<span class="inline-flex items-center px-3 py-0.5 text-xs font-medium text-white/80 bg-azul-oscuro/20 border border-dai/30 rounded-full backdrop-blur-sm whitespace-nowrap flex-shrink-0">${role}</span>`)}</div>${activeRoles.length > 2 && renderTemplate`<div class="fixed bottom-[-22px] left-0 right-0"><button class="mt-1 text-xs text-dai/80 hover:text-dai transition-colors duration-200 w-full text-center z-20 relative bg-transparent border-none cursor-pointer" id="toggle-roles-btn"${addAttribute(activeRoles.length - 2, "data-hidden-count")} type="button" onclick="openRolesModal()">
+${activeRoles.length - 2} más
</button></div>`}</div>` : renderTemplate`<div class="text-sm text-white/60">
Sin roles asignados
</div>`}<div id="roles-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-4" onclick="closeRolesModal(event)"> <div class="bg-azul-oscuro/60 border backdrop-blur-sm border-dai/30 rounded-2xl shadow-2xl shadow-dai/20 max-w-md w-full max-h-[80vh] overflow-y-auto ring-1 ring-white/20 drop-shadow-xl" onclick="event.stopPropagation()"> <div class="sticky top-0 backdrop-blur-sm bg-azul-oscuro/50 border-b border-dai/30 p-4"> <div class="flex items-center justify-between"> <h2 class="font-bold text-xl text-azul-brillante drop-shadow-sm">Mis Roles</h2> <button onclick="closeRolesModal()" class="text-white/90 hover:text-white transition-colors p-1 hover:bg-dai/30 rounded-full" type="button" aria-label="Cerrar"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> </div> <div class="p-4"> <div class="flex flex-wrap gap-2 justify-center"> ${activeRoles.map((role) => renderTemplate`<span class="inline-flex items-center px-3 py-0.5 text-xs font-medium text-white/90 bg-dai/20 border border-dai/40 rounded-full whitespace-nowrap flex-shrink-0 shadow-lg shadow-azul-oscuro/10"> ${role} </span>`)} </div> ${activeRoles.length === 0 && renderTemplate`<div class="text-center py-8"> <p class="text-white/70">No tienes roles asignados</p> <span class="inline-flex items-center px-3 py-0.5 mt-3 text-xs font-medium text-white/90 bg-azul-oscuro/30 border border-dai/40 rounded-full shadow-lg shadow-azul-oscuro/10">
Estudiante
</span> </div>`} </div> </div> </div> ${renderScript($$result, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/profile/UserRoles.astro?astro&type=script&index=0&lang.ts")} ${// Solo mostrar algo si hay 0 roles
  activeRoles.length === 0 && renderTemplate`<div class="flex flex-wrap gap-2 justify-center sm:justify-start"> <span class="inline-flex items-center px-3 py-0.5 text-xs font-medium text-white/80 bg-azul-oscuro/20 border border-dai/30 rounded-full backdrop-blur-sm whitespace-nowrap flex-shrink-0">
Estudiante
</span> </div>`}`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/profile/UserRoles.astro", void 0);

const MailIcon = createSvgComponent({"meta":{"src":"/_astro/mail.BsR8RxJL.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","class":"icon icon-tabler icons-tabler-outline icon-tabler-mail"},"children":"<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /><path d=\"M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z\" /><path d=\"M3 7l9 6l9 -6\" />"});

const PhoneIcon = createSvgComponent({"meta":{"src":"/_astro/phone.CCUKgKeo.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","class":"icon icon-tabler icons-tabler-outline icon-tabler-phone"},"children":"<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /><path d=\"M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2\" />"});

const IdIcon = createSvgComponent({"meta":{"src":"/_astro/id.CyqCZi12.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","class":"icon icon-tabler icons-tabler-outline icon-tabler-id"},"children":"<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /><path d=\"M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z\" /><path d=\"M9 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /><path d=\"M15 8l2 0\" /><path d=\"M15 12l2 0\" /><path d=\"M7 16l10 0\" />"});

const QrIcon = createSvgComponent({"meta":{"src":"/_astro/qrcode.CFgI3H8C.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","class":"icon icon-tabler icons-tabler-outline icon-tabler-qrcode"},"children":"<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /><path d=\"M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z\" /><path d=\"M7 17l0 .01\" /><path d=\"M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z\" /><path d=\"M7 7l0 .01\" /><path d=\"M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z\" /><path d=\"M17 7l0 .01\" /><path d=\"M14 14l3 0\" /><path d=\"M20 14l0 .01\" /><path d=\"M14 14l0 3\" /><path d=\"M14 20l3 0\" /><path d=\"M17 17l3 0\" /><path d=\"M20 17l0 3\" />"});

const $$Astro$8 = createAstro();
const $$UserCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$UserCard;
  const user = Astro2.props.user;
  const name = user?.user_metadata?.full_name || user?.user_metadata?.name || "No disponible";
  const avatarUrl = user?.user_metadata?.avatar_url;
  const id = user?.id;
  const email = user?.user_metadata?.email;
  const dni = user?.user_metadata?.dni;
  const phone = user?.user_metadata?.phone;
  return renderTemplate`${renderComponent($$result, "BentoContainer", $$BentoContainer, { "class": "col-span-10 md:col-span-6 lg:col-span-4 xl:col-span-3 overflow-hidden flex flex-col", "title": "Tarjeta Identificativa" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mt-4 flex flex-col h-full"${addAttribute(id, "data-user-id")}> <!-- Sección superior: Avatar, nombre y roles (flexible) --> <div class="flex-shrink-0"> <div class="flex flex-col items-center mb-4"> ${avatarUrl && renderTemplate`<div class="flex mb-2"> <img${addAttribute(avatarUrl, "src")} alt="Avatar del usuario" class="w-50 h-50 rounded-full border-2 border-white/20"> </div>`} <h3 class="text-lg font-semibold text-white mb-2">${name}</h3> ${renderComponent($$result2, "UserRoles", $$UserRoles, {}, { "default": ($$result3) => renderTemplate`<div class="w-40 h-[15px] bg-white/10 rounded-full backdrop-blur-sm animate-pulse"></div> ` })} </div> </div> <!-- Spacer flexible para empujar contenido hacia abajo --> <div class="flex-grow"></div> <!-- Sección inferior fija: Información del usuario --> <div class="flex-shrink-0"> <ul class="space-y-2 text-white mb-1"> <li class="flex gap-1"> ${renderComponent($$result2, "MailIcon", MailIcon, { "class": "h-7 w-7 text-azul-brillante -translate-y-1 flex-shrink-0" })} <span class="text-[14px] text-white/80 truncate">${email || "No disponible"}</span> </li> <li class="flex gap-1"> ${renderComponent($$result2, "IdIcon", IdIcon, { "class": "h-7 w-7 text-azul-brillante -translate-y-1 flex-shrink-0" })} <span class="text-[14px] text-white/80">${dni || "No disponible"}</span> </li> <li class="flex gap-1"> ${renderComponent($$result2, "PhoneIcon", PhoneIcon, { "class": "h-7 w-7 text-azul-brillante -translate-y-1 flex-shrink-0" })} <span class="text-[14px] text-white/80">${phone || "No disponible"}</span> </li> <li class="flex gap-1"> ${renderComponent($$result2, "User", User, { "class": "h-7 w-7 text-azul-brillante -translate-y-1 flex-shrink-0" })} <span class="text-[14px] text-white/80 truncate"${addAttribute(id, "title")}>${id || "No disponible"}</span> </li> </ul> <!-- Botón para mostrar QR - siempre al final --> <div class="pt-3 border-t border-white/20"> ${renderComponent($$result2, "Button", $$Button, { "variant": "secondary", "size": "sm", "className": "w-full", "onClick": "showUserQR()" }, { "default": ($$result3) => renderTemplate` <span class="gap-1">${renderComponent($$result3, "QrIcon", QrIcon, { "class": "h-6 w-6 inline-block" })} Mostrar QR</span> ` })} </div> </div> <!-- Dialog para el QR --> <dialog id="qr-dialog" class="backdrop:bg-black/50 backdrop:backdrop-blur-sm bg-transparent border-0 p-4 max-w-sm w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> <div class="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6"> <div class="flex justify-between items-center mb-4"> <h3 class="text-lg font-semibold text-white">Tu código QR identificativo</h3> <button onclick="hideUserQR()" class="text-white/60 hover:text-white transition-colors p-1" type="button">
✕
</button> </div> <div class="flex flex-col items-center"> <div id="qr-container" class="bg-white p-4 rounded-lg mb-4"> <!-- El QR se generará aquí --> </div> <p class="text-sm text-white/80 text-center">
Muestra este QR para identificarte
</p> </div> </div> </dialog> </div> ` })} ${renderScript($$result, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/profile/user-card.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/profile/user-card.astro", void 0);

const $$UserCardSkeleton = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BentoContainer", $$BentoContainer, { "title": "Tarjeta Identificativa" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mt-4 flex flex-col h-full"> <!-- Sección superior: Avatar, nombre y roles --> <div class="flex-shrink-0"> <div class="flex flex-col items-center mb-4"> <!-- Avatar skeleton --> <div class="w-20 h-20 bg-white/10 rounded-full animate-pulse mb-2"></div> <!-- Nombre skeleton --> <div class="w-40 h-6 bg-white/10 rounded animate-pulse mb-2"></div> <!-- Roles skeleton --> <div class="w-32 h-5 bg-white/10 rounded animate-pulse"></div> </div> </div> <!-- Información de contacto skeleton --> <div class="flex-1 space-y-3 mb-4"> <div class="flex items-center gap-3"> <div class="w-5 h-5 bg-white/10 rounded animate-pulse"></div> <div class="w-48 h-4 bg-white/10 rounded animate-pulse"></div> </div> <div class="flex items-center gap-3"> <div class="w-5 h-5 bg-white/10 rounded animate-pulse"></div> <div class="w-36 h-4 bg-white/10 rounded animate-pulse"></div> </div> <div class="flex items-center gap-3"> <div class="w-5 h-5 bg-white/10 rounded animate-pulse"></div> <div class="w-28 h-4 bg-white/10 rounded animate-pulse"></div> </div> <div class="flex items-center gap-3"> <div class="w-5 h-5 bg-white/10 rounded animate-pulse"></div> <div class="w-32 h-4 bg-white/10 rounded animate-pulse"></div> </div> </div> <!-- Botón QR skeleton --> <div class="flex-shrink-0 mt-auto"> <div class="w-full h-10 bg-white/10 rounded-lg animate-pulse"></div> </div> </div> ` })}`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/ui/skeletons/UserCardSkeleton.astro", void 0);

var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(cooked.slice()) }));
var _a$3;
const $$Astro$7 = createAstro();
const $$SafeUserCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$SafeUserCard;
  const user = Astro2.props.user;
  let hasError = false;
  let errorMessage = "";
  if (!user) {
    hasError = true;
    errorMessage = "Usuario no disponible";
  }
  return renderTemplate`${maybeRenderHead()}<div class="col-span-10 md:col-span-6 lg:col-span-4 xl:col-span-3 overflow-hidden flex flex-col"> ${hasError ? renderTemplate(_a$3 || (_a$3 = __template$3(["<div> ", " <script>(function(){", "\n            console.warn('UserCard: Mostrando skeleton debido a:', errorMessage);\n        })();<\/script> </div>"])), renderComponent($$result, "UserCardSkeleton", $$UserCardSkeleton, {}), defineScriptVars({ errorMessage })) : renderTemplate`<div class="user-card-wrapper"> ${renderComponent($$result, "UserCard", $$UserCard, { "user": user })} ${renderScript($$result, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/profile/SafeUserCard.astro?astro&type=script&index=0&lang.ts")} </div>`} </div> <template data-fallback> ${renderComponent($$result, "UserCardSkeleton", $$UserCardSkeleton, {})} </template>`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/profile/SafeUserCard.astro", void 0);

const $$Astro$6 = createAstro();
const $$PrintingStats = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$PrintingStats;
  const {
    thisMonth = 24,
    total = 156,
    limit = 40,
    percentage = 60
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="bg-white/5 border border-white/20 rounded-xl p-4 flex flex-col justify-between h-full"> <div> <h3 class="font-semibold text-lg text-white mb-2">Impresiones</h3> <div class="space-y-2"> <div class="flex justify-between"> <span class="text-gray-300 text-sm">Este mes:</span> <span class="text-azul-brillante font-bold">${thisMonth}</span> </div> <div class="flex justify-between"> <span class="text-gray-300 text-sm">Total:</span> <span class="text-white font-bold">${total}</span> </div> </div> </div> <div class="mt-4"> <div class="w-full bg-white/10 rounded-full h-2"> <div class="bg-azul-brillante h-2 rounded-full"${addAttribute(`width: ${percentage}%`, "style")}></div> </div> <p class="text-xs text-gray-400 mt-1">Límite mensual: ${limit}</p> </div> </div>`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/profile/user-info/PrintingStats.astro", void 0);

const $$Astro$5 = createAstro();
const $$LoanStats = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$LoanStats;
  const {
    active = 2,
    completed = 23,
    pending = 0,
    lastLoan = "hace 3 d\xEDas"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="bg-white/5 border border-white/20 rounded-xl p-4 flex flex-col justify-between h-full"> <div> <h3 class="font-semibold text-lg text-white mb-2">Préstamos</h3> <div class="space-y-2"> <div class="flex justify-between"> <span class="text-gray-300 text-sm">Activos:</span> <span class="text-azul-brillante font-bold">${active}</span> </div> <div class="flex justify-between"> <span class="text-gray-300 text-sm">Completados:</span> <span class="text-white font-bold">${completed}</span> </div> <div class="flex justify-between"> <span class="text-gray-300 text-sm">Pendientes:</span> <span class="text-yellow-400 font-bold">${pending}</span> </div> </div> </div> <div class="mt-2"> <p class="text-xs text-gray-400">Último: ${lastLoan}</p> </div> </div>`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/profile/user-info/LoanStats.astro", void 0);

const EditIcon = createSvgComponent({"meta":{"src":"/_astro/edit.C9zdzJLB.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","class":"icon icon-tabler icons-tabler-outline icon-tabler-edit"},"children":"<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /><path d=\"M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1\" /><path d=\"M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z\" /><path d=\"M16 5l3 3\" />"});

const $$Astro$4 = createAstro();
const $$UserProfile = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$UserProfile;
  const { user, roleNames = [] } = Astro2.props;
  const name = user?.user_metadata?.full_name || user?.user_metadata?.name || "No disponible";
  const email = user?.user_metadata?.email;
  const dni = user?.user_metadata?.dni;
  const phone = user?.user_metadata?.phone;
  const instagram = user?.user_metadata?.instagram;
  const linkedin = user?.user_metadata?.linkedin;
  const tiktok = user?.user_metadata?.tiktok;
  const x = user?.user_metadata?.x;
  return renderTemplate`${maybeRenderHead()}<div class="bg-white/5 border border-white/20 rounded-xl p-4 justify-between h-full col-span-3 flex flex-col row-span-2 col-span-2"> <div> <div class="space-y-2 grid grid-cols-5 gap-6"> <div class="col-span-2"> <h4 class="text-azul-brillante font-bold text-mid mb-3">Información Personal:</h4> <div class="space-y-2"> <div class="flex gap-2 items-center group cursor-pointer hover:bg-white/5 rounded-lg p-2 -mx-2 transition-all" data-field="name"${addAttribute(name, "data-value")}> <span class="text-gray-300 text-sm w-16">Nombre:</span> <span class="text-white font-medium group-hover:text-azul-brillante transition-colors flex-1">${name}</span> ${renderComponent($$result, "EditIcon", EditIcon, { "class": "w-4 h-4 text-gray-400 group-hover:text-azul-brillante transition-colors" })} </div> <div class="flex gap-2 items-center group cursor-pointer hover:bg-white/5 rounded-lg p-2 -mx-2 transition-all" data-field="email"${addAttribute(email, "data-value")}> <span class="text-gray-300 text-sm w-16">Email:</span> <span class="text-white font-medium group-hover:text-azul-brillante transition-colors flex-1">${email}</span> ${renderComponent($$result, "EditIcon", EditIcon, { "class": "w-4 h-4 text-gray-400 group-hover:text-azul-brillante transition-colors" })} </div> <div class="flex gap-2 items-center group cursor-pointer hover:bg-white/5 rounded-lg p-2 -mx-2 transition-all" data-field="dni"${addAttribute(dni, "data-value")}> <span class="text-gray-300 text-sm w-16">DNI:</span> <span class="text-white font-medium group-hover:text-azul-brillante transition-colors flex-1">${dni || "No configurado"}</span> ${renderComponent($$result, "EditIcon", EditIcon, { "class": "w-4 h-4 text-gray-400 group-hover:text-azul-brillante transition-colors" })} </div> <div class="flex gap-2 items-center group cursor-pointer hover:bg-white/5 rounded-lg p-2 -mx-2 transition-all" data-field="phone"${addAttribute(phone, "data-value")}> <span class="text-gray-300 text-sm w-16">Teléfono:</span> <span class="text-white font-medium group-hover:text-azul-brillante transition-colors flex-1">${phone || "No configurado"}</span> ${renderComponent($$result, "EditIcon", EditIcon, { "class": "w-4 h-4 text-gray-400 group-hover:text-azul-brillante transition-colors" })} </div> </div> </div> <div class="col-span-2"> <h4 class="text-azul-brillante font-bold text-mid mb-3">Redes Sociales:</h4> <div class="space-y-2"> <div class="flex gap-2 items-center group cursor-pointer hover:bg-white/5 rounded-lg p-2 -mx-2 transition-all" data-field="instagram"${addAttribute(instagram, "data-value")}> ${renderComponent($$result, "InstagramIcon", InstagramIcon, { "class": "w-4 h-4 text-pink-500" })} <span class="text-gray-300 text-sm">Instagram:</span> <span class="text-white font-medium group-hover:text-azul-brillante transition-colors flex-1"> ${instagram || "No configurado"} </span> ${renderComponent($$result, "EditIcon", EditIcon, { "class": "w-4 h-4 text-gray-400 group-hover:text-azul-brillante transition-colors" })} </div> <div class="flex gap-2 items-center group cursor-pointer hover:bg-white/5 rounded-lg p-2 -mx-2 transition-all" data-field="linkedin"${addAttribute(linkedin, "data-value")}> ${renderComponent($$result, "LinkedInIcon", LinkedInIcon, { "class": "w-4 h-4 text-blue-500" })} <span class="text-gray-300 text-sm">LinkedIn:</span> <span class="text-white font-medium group-hover:text-azul-brillante transition-colors flex-1"> ${linkedin || "No configurado"} </span> ${renderComponent($$result, "EditIcon", EditIcon, { "class": "w-4 h-4 text-gray-400 group-hover:text-azul-brillante transition-colors" })} </div> <div class="flex gap-2 items-center group cursor-pointer hover:bg-white/5 rounded-lg p-2 -mx-2 transition-all" data-field="tiktok"${addAttribute(tiktok, "data-value")}> ${renderComponent($$result, "TikTokIcon", TikTokIcon, { "class": "w-4 h-4 text-red-500" })} <span class="text-gray-300 text-sm">TikTok:</span> <span class="text-white font-medium group-hover:text-azul-brillante transition-colors flex-1"> ${tiktok || "No configurado"} </span> ${renderComponent($$result, "EditIcon", EditIcon, { "class": "w-4 h-4 text-gray-400 group-hover:text-azul-brillante transition-colors" })} </div> <div class="flex gap-2 items-center group cursor-pointer hover:bg-white/5 rounded-lg p-2 -mx-2 transition-all" data-field="x"${addAttribute(x, "data-value")}> ${renderComponent($$result, "XIcon", XIcon, { "class": "w-4 h-4 text-white" })} <span class="text-gray-300 text-sm">X (Twitter):</span> <span class="text-white font-medium group-hover:text-azul-brillante transition-colors flex-1"> ${x || "No configurado"} </span> ${renderComponent($$result, "EditIcon", EditIcon, { "class": "w-4 h-4 text-gray-400 group-hover:text-azul-brillante transition-colors" })} </div> </div> </div> <div class="col-span-1"> <h4 class="text-azul-brillante font-bold text-mid mb-3">Roles:</h4> <div class="space-y-2"> ${roleNames.length > 0 ? roleNames.map((role) => renderTemplate`<div class="flex items-center"> <span class="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-azul-oscuro/30 border border-dai/40 rounded-full backdrop-blur-sm"> ${role} </span> </div>`) : renderTemplate`<div class="flex items-center p-2 rounded-lg"> <span class="text-gray-400 text-sm">Sin roles asignados</span> </div>`} </div> </div> </div> </div> </div> ${renderScript($$result, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/profile/user-info/UserProfile.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/profile/user-info/UserProfile.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(raw || cooked.slice()) }));
var _a$2;
const $$EditDialog = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$2 || (_a$2 = __template$2(["<!-- Dialog nativo de HTML5 para editar datos -->", `<dialog id="editDialog" class="backdrop:bg-black/50 rounded-2xl border border-white/30 bg-gray-900/95 backdrop-blur-xl p-6 text-white shadow-2xl 
                              fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 max-w-[90vw] max-h-[90vh] overflow-auto
                              open:flex open:flex-col"> <form method="dialog" class="space-y-4"> <div class="flex justify-between items-center mb-4"> <h3 id="dialogTitle" class="text-xl font-semibold text-azul-brillante"></h3> <button type="button" id="closeBtn" class="text-gray-400 hover:text-white transition-colors text-2xl leading-none">
\xD7
</button> </div> <div> <label id="inputLabel" class="block text-sm font-medium text-gray-300 mb-2"></label> <input id="editInput" type="text" class="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-azul-brillante focus:border-transparent transition-all" placeholder="Ingresa el nuevo valor"> </div> <div class="flex gap-3 pt-4"> <button type="button" id="saveBtn" class="flex-1 bg-azul-brillante hover:bg-azul-brillante/80 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
\u{1F4BE} Guardar
</button> <button type="button" id="cancelBtn" class="flex-1 bg-gray-600/50 hover:bg-gray-600/70 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
\u274C Cancelar
</button> </div> </form> </dialog> <script type="module">
// Esperar a que el DOM est\xE9 completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let currentField = '';
    let currentValue = '';
    const dialog = document.getElementById('editDialog');
    const dialogTitle = document.getElementById('dialogTitle');
    const inputLabel = document.getElementById('inputLabel');
    const editInput = document.getElementById('editInput');

    // Mapeo de campos para mostrar nombres amigables
    const fieldLabels = {
        'name': 'Nombre completo',
        'email': 'Correo electr\xF3nico',
        'dni': 'Documento de identidad',
        'phone': 'N\xFAmero de tel\xE9fono',
    };

    // Agregar event listeners a todos los campos editables
    const editableFields = document.querySelectorAll('[data-field]');
    editableFields.forEach(field => {
        field.addEventListener('click', function() {
            const fieldName = this.getAttribute('data-field');
            const fieldValue = this.getAttribute('data-value') || '';
            openEditDialog(fieldName, fieldValue);
        });
    });

    // Funci\xF3n para abrir el dialog
    function openEditDialog(field, value) {
        if (!dialog || !dialogTitle || !inputLabel || !editInput) {
            console.error('Elementos del dialog no encontrados');
            return;
        }

        currentField = field;
        currentValue = value;
        
        // Configurar el contenido del dialog
        dialogTitle.textContent = \`Editar \${fieldLabels[field]}\`;
        inputLabel.textContent = fieldLabels[field] + ':';
        editInput.value = value || '';
        
        // Configurar el tipo de input seg\xFAn el campo
        switch(field) {
            case 'email':
                editInput.type = 'email';
                editInput.placeholder = 'ejemplo@correo.com';
                break;
            case 'phone':
                editInput.type = 'tel';
                editInput.placeholder = '+34 600 000 000';
                break;
            case 'dni':
                editInput.type = 'text';
                editInput.placeholder = '12345678A';
                break;
            default:
                editInput.type = 'text';
                editInput.placeholder = 'Ingresa el nuevo valor';
        }
        
        // Abrir dialog usando la API nativa
        dialog.showModal();
        
        // Enfocar el input
        editInput.focus();
        editInput.select();
    }

    // Funci\xF3n para cerrar el dialog
    function closeEditDialog() {
        if (dialog) {
            dialog.close();
        }
        currentField = '';
        currentValue = '';
    }

    // Funci\xF3n para guardar cambios
    function saveChanges() {
        if (!editInput) return;
        
        const newValue = editInput.value.trim();
        
        if (!newValue) {
            alert('Por favor, ingresa un valor v\xE1lido');
            return;
        }
        
        // Validaciones b\xE1sicas
        if (currentField === 'email' && !isValidEmail(newValue)) {
            alert('Por favor, ingresa un email v\xE1lido');
            return;
        }
        
        if (currentField === 'dni' && !isValidDNI(newValue)) {
            alert('Por favor, ingresa un DNI v\xE1lido');
            return;
        }
        
        // Actualizar el valor en la interfaz
        updateFieldValue(currentField, newValue);
        
        // Aqu\xED podr\xEDas agregar una llamada a la API para persistir el cambio
        console.log(\`Campo \${currentField} actualizado de "\${currentValue}" a "\${newValue}"\`);
        
        // Cerrar dialog
        closeEditDialog();
    }

    // Funci\xF3n para actualizar el valor en la interfaz
    function updateFieldValue(field, newValue) {
        // Buscar el elemento que contiene el campo
        const fieldElement = document.querySelector(\`[data-field="\${field}"]\`);
        if (fieldElement) {
            const valueElement = fieldElement.querySelector('.font-bold');
            if (valueElement) {
                valueElement.textContent = newValue;
                fieldElement.setAttribute('data-value', newValue);
            }
        }
    }

    // Validaciones
    function isValidEmail(email) {
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidDNI(dni) {
        const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
        return dniRegex.test(dni);
    }

    // Event listeners para los botones del dialog
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const closeBtn = document.getElementById('closeBtn');

    if (saveBtn) {
        saveBtn.addEventListener('click', saveChanges);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeEditDialog);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeEditDialog);
    }

    // Cerrar dialog con Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && dialog && dialog.open) {
            closeEditDialog();
        }
    });

    // Enviar formulario con Enter
    if (editInput) {
        editInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                saveChanges();
            }
        });
    }

    // Hacer las funciones globalmente accesibles para compatibilidad
    window.openEditDialog = openEditDialog;
    window.closeEditDialog = closeEditDialog;
    window.saveChanges = saveChanges;
});
<\/script>`], ["<!-- Dialog nativo de HTML5 para editar datos -->", `<dialog id="editDialog" class="backdrop:bg-black/50 rounded-2xl border border-white/30 bg-gray-900/95 backdrop-blur-xl p-6 text-white shadow-2xl 
                              fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 max-w-[90vw] max-h-[90vh] overflow-auto
                              open:flex open:flex-col"> <form method="dialog" class="space-y-4"> <div class="flex justify-between items-center mb-4"> <h3 id="dialogTitle" class="text-xl font-semibold text-azul-brillante"></h3> <button type="button" id="closeBtn" class="text-gray-400 hover:text-white transition-colors text-2xl leading-none">
\xD7
</button> </div> <div> <label id="inputLabel" class="block text-sm font-medium text-gray-300 mb-2"></label> <input id="editInput" type="text" class="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-azul-brillante focus:border-transparent transition-all" placeholder="Ingresa el nuevo valor"> </div> <div class="flex gap-3 pt-4"> <button type="button" id="saveBtn" class="flex-1 bg-azul-brillante hover:bg-azul-brillante/80 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
\u{1F4BE} Guardar
</button> <button type="button" id="cancelBtn" class="flex-1 bg-gray-600/50 hover:bg-gray-600/70 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
\u274C Cancelar
</button> </div> </form> </dialog> <script type="module">
// Esperar a que el DOM est\xE9 completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let currentField = '';
    let currentValue = '';
    const dialog = document.getElementById('editDialog');
    const dialogTitle = document.getElementById('dialogTitle');
    const inputLabel = document.getElementById('inputLabel');
    const editInput = document.getElementById('editInput');

    // Mapeo de campos para mostrar nombres amigables
    const fieldLabels = {
        'name': 'Nombre completo',
        'email': 'Correo electr\xF3nico',
        'dni': 'Documento de identidad',
        'phone': 'N\xFAmero de tel\xE9fono',
    };

    // Agregar event listeners a todos los campos editables
    const editableFields = document.querySelectorAll('[data-field]');
    editableFields.forEach(field => {
        field.addEventListener('click', function() {
            const fieldName = this.getAttribute('data-field');
            const fieldValue = this.getAttribute('data-value') || '';
            openEditDialog(fieldName, fieldValue);
        });
    });

    // Funci\xF3n para abrir el dialog
    function openEditDialog(field, value) {
        if (!dialog || !dialogTitle || !inputLabel || !editInput) {
            console.error('Elementos del dialog no encontrados');
            return;
        }

        currentField = field;
        currentValue = value;
        
        // Configurar el contenido del dialog
        dialogTitle.textContent = \\\`Editar \\\${fieldLabels[field]}\\\`;
        inputLabel.textContent = fieldLabels[field] + ':';
        editInput.value = value || '';
        
        // Configurar el tipo de input seg\xFAn el campo
        switch(field) {
            case 'email':
                editInput.type = 'email';
                editInput.placeholder = 'ejemplo@correo.com';
                break;
            case 'phone':
                editInput.type = 'tel';
                editInput.placeholder = '+34 600 000 000';
                break;
            case 'dni':
                editInput.type = 'text';
                editInput.placeholder = '12345678A';
                break;
            default:
                editInput.type = 'text';
                editInput.placeholder = 'Ingresa el nuevo valor';
        }
        
        // Abrir dialog usando la API nativa
        dialog.showModal();
        
        // Enfocar el input
        editInput.focus();
        editInput.select();
    }

    // Funci\xF3n para cerrar el dialog
    function closeEditDialog() {
        if (dialog) {
            dialog.close();
        }
        currentField = '';
        currentValue = '';
    }

    // Funci\xF3n para guardar cambios
    function saveChanges() {
        if (!editInput) return;
        
        const newValue = editInput.value.trim();
        
        if (!newValue) {
            alert('Por favor, ingresa un valor v\xE1lido');
            return;
        }
        
        // Validaciones b\xE1sicas
        if (currentField === 'email' && !isValidEmail(newValue)) {
            alert('Por favor, ingresa un email v\xE1lido');
            return;
        }
        
        if (currentField === 'dni' && !isValidDNI(newValue)) {
            alert('Por favor, ingresa un DNI v\xE1lido');
            return;
        }
        
        // Actualizar el valor en la interfaz
        updateFieldValue(currentField, newValue);
        
        // Aqu\xED podr\xEDas agregar una llamada a la API para persistir el cambio
        console.log(\\\`Campo \\\${currentField} actualizado de "\\\${currentValue}" a "\\\${newValue}"\\\`);
        
        // Cerrar dialog
        closeEditDialog();
    }

    // Funci\xF3n para actualizar el valor en la interfaz
    function updateFieldValue(field, newValue) {
        // Buscar el elemento que contiene el campo
        const fieldElement = document.querySelector(\\\`[data-field="\\\${field}"]\\\`);
        if (fieldElement) {
            const valueElement = fieldElement.querySelector('.font-bold');
            if (valueElement) {
                valueElement.textContent = newValue;
                fieldElement.setAttribute('data-value', newValue);
            }
        }
    }

    // Validaciones
    function isValidEmail(email) {
        const emailRegex = /^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidDNI(dni) {
        const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
        return dniRegex.test(dni);
    }

    // Event listeners para los botones del dialog
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const closeBtn = document.getElementById('closeBtn');

    if (saveBtn) {
        saveBtn.addEventListener('click', saveChanges);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeEditDialog);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeEditDialog);
    }

    // Cerrar dialog con Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && dialog && dialog.open) {
            closeEditDialog();
        }
    });

    // Enviar formulario con Enter
    if (editInput) {
        editInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                saveChanges();
            }
        });
    }

    // Hacer las funciones globalmente accesibles para compatibilidad
    window.openEditDialog = openEditDialog;
    window.closeEditDialog = closeEditDialog;
    window.saveChanges = saveChanges;
});
<\/script>`])), maybeRenderHead());
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/profile/user-info/EditDialog.astro", void 0);

const $$Astro$3 = createAstro();
const $$UserInfo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$UserInfo;
  const user = Astro2.props.user;
  const roleNames = Astro2.locals.userRoleNames || [];
  return renderTemplate`${renderComponent($$result, "BentoContainer", $$BentoContainer, { "class": "col-span-10 md:col-span-4 lg:col-span-6 xl:col-span-7 h-full", "title": "Informaci\xF3n del Usuario" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid grid-cols-2 gap-4 mt-4 h-[calc(100%-3rem+5px)]"> <!-- Estadísticas de Impresión --> ${renderComponent($$result2, "PrintingStats", $$PrintingStats, {})} <!-- Estadísticas de Préstamos --> ${renderComponent($$result2, "LoanStats", $$LoanStats, {})} <!-- Datos personales del Usuario --> ${renderComponent($$result2, "UserProfile", $$UserProfile, { "user": user, "roleNames": roleNames })} </div> ` })} <!-- Modal de edición --> ${renderComponent($$result, "EditDialog", $$EditDialog, {})}`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/profile/user-info/user-info.astro", void 0);

const $$UserStatsSkeleton = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BentoContainer", $$BentoContainer, { "title": "Informaci\xF3n del Usuario" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid grid-cols-2 gap-4 mt-4 h-[calc(100%-3rem+5px)]"> <!-- Estadísticas de Impresión skeleton --> <div class="bg-white/5 border border-white/20 rounded-xl p-4 flex flex-col justify-between h-full"> <div> <div class="w-24 h-6 bg-white/10 rounded animate-pulse mb-2"></div> <div class="space-y-2"> <div class="flex justify-between"> <div class="w-16 h-4 bg-white/10 rounded animate-pulse"></div> <div class="w-8 h-4 bg-white/10 rounded animate-pulse"></div> </div> <div class="flex justify-between"> <div class="w-12 h-4 bg-white/10 rounded animate-pulse"></div> <div class="w-10 h-4 bg-white/10 rounded animate-pulse"></div> </div> </div> </div> <div class="mt-4"> <div class="w-full bg-white/10 rounded-full h-2 animate-pulse"></div> <div class="w-24 h-3 bg-white/10 rounded animate-pulse mt-1"></div> </div> </div> <!-- Estadísticas de Préstamos skeleton --> <div class="bg-white/5 border border-white/20 rounded-xl p-4 flex flex-col justify-between h-full"> <div> <div class="w-20 h-6 bg-white/10 rounded animate-pulse mb-2"></div> <div class="space-y-2"> <div class="flex justify-between"> <div class="w-14 h-4 bg-white/10 rounded animate-pulse"></div> <div class="w-6 h-4 bg-white/10 rounded animate-pulse"></div> </div> <div class="flex justify-between"> <div class="w-20 h-4 bg-white/10 rounded animate-pulse"></div> <div class="w-8 h-4 bg-white/10 rounded animate-pulse"></div> </div> <div class="flex justify-between"> <div class="w-18 h-4 bg-white/10 rounded animate-pulse"></div> <div class="w-6 h-4 bg-white/10 rounded animate-pulse"></div> </div> </div> </div> <div class="mt-2"> <div class="w-20 h-3 bg-white/10 rounded animate-pulse"></div> </div> </div> <!-- Datos personales del Usuario skeleton --> <div class="bg-white/5 border border-white/20 rounded-xl p-4 justify-between h-full col-span-2 flex flex-col"> <div> <div class="space-y-2 grid grid-cols-5 gap-6"> <div class="col-span-2"> <div class="w-40 h-5 bg-white/10 rounded animate-pulse mb-3"></div> <div class="space-y-2"> <div class="flex gap-2 items-center p-2"> <div class="w-16 h-4 bg-white/10 rounded animate-pulse"></div> <div class="w-32 h-4 bg-white/10 rounded animate-pulse flex-1"></div> <div class="w-4 h-4 bg-white/10 rounded animate-pulse"></div> </div> <div class="flex gap-2 items-center p-2"> <div class="w-16 h-4 bg-white/10 rounded animate-pulse"></div> <div class="w-40 h-4 bg-white/10 rounded animate-pulse flex-1"></div> <div class="w-4 h-4 bg-white/10 rounded animate-pulse"></div> </div> <div class="flex gap-2 items-center p-2"> <div class="w-16 h-4 bg-white/10 rounded animate-pulse"></div> <div class="w-28 h-4 bg-white/10 rounded animate-pulse flex-1"></div> <div class="w-4 h-4 bg-white/10 rounded animate-pulse"></div> </div> </div> </div> <div class="col-span-3"> <div class="w-36 h-5 bg-white/10 rounded animate-pulse mb-3"></div> <div class="space-y-2"> <div class="flex gap-2 items-center p-2"> <div class="w-16 h-4 bg-white/10 rounded animate-pulse"></div> <div class="w-24 h-4 bg-white/10 rounded animate-pulse flex-1"></div> <div class="w-4 h-4 bg-white/10 rounded animate-pulse"></div> </div> <div class="flex gap-2 items-center p-2"> <div class="w-20 h-4 bg-white/10 rounded animate-pulse"></div> <div class="w-28 h-4 bg-white/10 rounded animate-pulse flex-1"></div> <div class="w-4 h-4 bg-white/10 rounded animate-pulse"></div> </div> </div> </div> </div> </div> </div> </div> ` })}`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/ui/skeletons/UserStatsSkeleton.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$2 = createAstro();
const $$SafeUserStats = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SafeUserStats;
  const user = Astro2.props.user;
  let hasError = false;
  let errorMessage = "";
  if (!user) {
    hasError = true;
    errorMessage = "Usuario no disponible para estad\xEDsticas";
  }
  return renderTemplate`${maybeRenderHead()}<div class="col-span-10 md:col-span-4 lg:col-span-6 xl:col-span-7 h-full"> ${hasError ? renderTemplate(_a$1 || (_a$1 = __template$1(["<div> ", " <script>(function(){", "\n            console.warn('UserStats: Mostrando skeleton debido a:', errorMessage);\n        })();<\/script> </div>"])), renderComponent($$result, "UserStatsSkeleton", $$UserStatsSkeleton, {}), defineScriptVars({ errorMessage })) : renderTemplate`<div class="user-stats-wrapper"> ${renderComponent($$result, "UserStats", $$UserInfo, { "user": user })} ${renderScript($$result, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/profile/SafeUserStats.astro?astro&type=script&index=0&lang.ts")} </div>`} </div> <template data-fallback> ${renderComponent($$result, "UserStatsSkeleton", $$UserStatsSkeleton, {})} </template>`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/profile/SafeUserStats.astro", void 0);

const $$UserHistory = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BentoContainer", $$BentoContainer, { "class": "col-span-10 md:col-span-6 lg:col-span-4 xl:col-span-3", "title": "Historial de Actividad" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mt-4 space-y-3"> <!-- Lista de actividades recientes --> <div class="text-center py-8"> <p class="text-white/70 mb-2">Historial de actividades</p> <p class="text-sm text-white/50">Próximamente disponible</p> </div> </div> ` })}`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/profile/user-history.astro", void 0);

const $$UserHistorySkeleton = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BentoContainer", $$BentoContainer, { "title": "Historial de Usuario" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-3"> <!-- Elementos del historial skeleton --> <div class="flex items-center gap-3 p-3 rounded-lg bg-white/5"> <div class="w-8 h-8 bg-white/10 rounded-full animate-pulse"></div> <div class="flex-1"> <div class="w-48 h-4 bg-white/10 rounded animate-pulse mb-1"></div> <div class="w-24 h-3 bg-white/10 rounded animate-pulse"></div> </div> <div class="w-16 h-4 bg-white/10 rounded animate-pulse"></div> </div> <div class="flex items-center gap-3 p-3 rounded-lg bg-white/5"> <div class="w-8 h-8 bg-white/10 rounded-full animate-pulse"></div> <div class="flex-1"> <div class="w-40 h-4 bg-white/10 rounded animate-pulse mb-1"></div> <div class="w-20 h-3 bg-white/10 rounded animate-pulse"></div> </div> <div class="w-12 h-4 bg-white/10 rounded animate-pulse"></div> </div> <div class="flex items-center gap-3 p-3 rounded-lg bg-white/5"> <div class="w-8 h-8 bg-white/10 rounded-full animate-pulse"></div> <div class="flex-1"> <div class="w-52 h-4 bg-white/10 rounded animate-pulse mb-1"></div> <div class="w-28 h-3 bg-white/10 rounded animate-pulse"></div> </div> <div class="w-18 h-4 bg-white/10 rounded animate-pulse"></div> </div> <div class="flex items-center gap-3 p-3 rounded-lg bg-white/5"> <div class="w-8 h-8 bg-white/10 rounded-full animate-pulse"></div> <div class="flex-1"> <div class="w-36 h-4 bg-white/10 rounded animate-pulse mb-1"></div> <div class="w-16 h-3 bg-white/10 rounded animate-pulse"></div> </div> <div class="w-14 h-4 bg-white/10 rounded animate-pulse"></div> </div> </div> ` })}`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/ui/skeletons/UserHistorySkeleton.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$SafeUserHistory = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SafeUserHistory;
  const user = Astro2.locals?.user;
  let hasError = false;
  let errorMessage = "";
  try {
    if (!user?.id) {
      hasError = true;
      errorMessage = "No se puede cargar historial sin ID de usuario";
    }
  } catch (error) {
    hasError = true;
    errorMessage = `Error preparando historial: ${error}`;
  }
  return renderTemplate`${maybeRenderHead()}<div class="col-span-10 md:col-span-6 lg:col-span-4 xl:col-span-3"> ${hasError ? renderTemplate(_a || (_a = __template(["<div> ", " <script>(function(){", "\n            console.warn('UserHistory: Mostrando skeleton debido a:', errorMessage);\n        })();<\/script> </div>"])), renderComponent($$result, "UserHistorySkeleton", $$UserHistorySkeleton, {}), defineScriptVars({ errorMessage })) : renderTemplate`<div class="user-history-wrapper"> ${renderComponent($$result, "UserHistory", $$UserHistory, {})} ${renderScript($$result, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/profile/SafeUserHistory.astro?astro&type=script&index=0&lang.ts")} </div>`} </div> <template data-fallback> ${renderComponent($$result, "UserHistorySkeleton", $$UserHistorySkeleton, {})} </template>`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/profile/SafeUserHistory.astro", void 0);

const $$Astro = createAstro();
const $$Profile = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Profile;
  const user = Astro2.locals.user;
  Astro2.locals.email;
  const isAdmin = Astro2.locals.userRoleNames?.some((role) => {
    const adminRoles = ["admin", "delegado", "secretario", "coord_comunicacion", "coord_ocio_deportes", "coord_asuntos_externos", "coord_infraestructuras"];
    return adminRoles.includes(role?.toLowerCase());
  }) || false;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "DAI - Perfil de usuario" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="w-full max-w-[1400px] mx-auto p-20"> <div class="flex justify-between items-center mb-8"> <h1 class="font-semibold text-3xl text-white">Perfil de Usuario</h1> <div class="flex gap-4"> ${isAdmin && renderTemplate`<a href="/admin" class="bg-white/10 hover:bg-white/20 border-1 border-azul-brillante/20 text-azul-brillante px-4 py-2 rounded-lg transition-colors duration-300">
Panel Administración
</a>`} <a href="/api/auth/signout" class="bg-red-600/30 border-1 border-red-800 hover:bg-red-600/40 text-white px-4 py-2 rounded-lg transition-colors duration-300">
Cerrar sesión
</a> </div> </div> <div class="grid grid-cols-10 auto-rows-[35rem] gap-4"> ${renderComponent($$result2, "SafeUserCard", $$SafeUserCard, { "user": user })} ${renderComponent($$result2, "SafeUserStats", $$SafeUserStats, { "user": user })} ${renderComponent($$result2, "SafeUserHistory", $$SafeUserHistory, {})} </div> </section> ` })}`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/profile.astro", void 0);

const $$file = "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/profile.astro";
const $$url = "/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Profile,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
