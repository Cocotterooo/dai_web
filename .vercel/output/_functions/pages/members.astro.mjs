import { c as createComponent, m as maybeRenderHead, a as renderTemplate, b as createAstro, e as defineScriptVars, h as renderSlot, f as addAttribute, r as renderComponent } from '../chunks/astro/server_BKdtxvi7.mjs';
import 'kleur/colors';
import { c as createSvgComponent, L as LinkedInIcon, T as TikTokIcon, X as XIcon, I as InstagramIcon, $ as $$Layout } from '../chunks/Layout_C3WOZSUX.mjs';
import 'clsx';
import { s as supabase } from '../chunks/supabase_CcsmWd0j.mjs';
import { U as User } from '../chunks/user_9DELL1oN.mjs';
export { renderers } from '../renderers.mjs';

const $$MemberCardSkeleton = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="col-span-10 md:col-span-6 lg:col-span-4 xl:col-span-3 overflow-hidden flex flex-col scale-90"> <div class="bg-white/5 w-70 border backdrop-blur-sm border-white/10 rounded-2xl p-6 flex flex-col min-h-105 max-h-105 animate-pulse relative"> <!-- Fondo para evitar flash --> <div class="absolute inset-0 bg-gradient-to-br from-azul-oscuro/80 to-azul-oscuro/60 rounded-2xl"></div> <!-- Contenido del skeleton --> <div class="relative z-10"> <!-- Skeleton para foto de usuario y nombre --> <div class="flex flex-col items-center gap-3 mb-4 w-full"> <div class="flex"> <!-- Skeleton del avatar --> <div class="w-50 h-50 rounded-full bg-white/10 animate-pulse"></div> </div> <!-- Skeleton del nombre --> <div class="h-6 w-32 bg-white/10 rounded animate-pulse"></div> </div> <!-- Skeleton para cargo y email --> <div class="flex flex-col justify-between flex-1 mb-4 w-full h-[75px]"> <!-- Skeleton del rol --> <div class="h-5 w-24 bg-azul-brillante/20 rounded animate-pulse mx-auto"></div> <!-- Skeleton del email --> <div class="flex justify-center mt-2"> <div class="h-4 w-40 bg-white/10 rounded animate-pulse"></div> </div> </div> <!-- Skeleton para redes sociales --> <div class="flex justify-center space-x-4"> <div class="h-6 w-6 bg-white/10 rounded animate-pulse"></div> <div class="h-6 w-6 bg-white/10 rounded animate-pulse"></div> <div class="h-6 w-6 bg-white/10 rounded animate-pulse"></div> <div class="h-6 w-6 bg-white/10 rounded animate-pulse"></div> </div> </div> </div> </div>`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/members/MemberCardSkeleton.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$2 = createAstro();
const $$LazyMembersSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$LazyMembersSection;
  const { skeletonCount = 4, sectionId } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", "<div", ' class="members-section" style="background-color: transparent;"> <!-- Skeletons que se muestran inicialmente --> <div', ' class="flex flex-row flex-wrap justify-center gap-2 transition-opacity duration-500 ease-in-out"> ', " </div> <!-- Contenido real que se carga de forma lazy --> <div", ' class="hidden transition-opacity duration-500 ease-in-out"', ' style="opacity: 0;"> ', " </div> </div> <script>(function(){", "\n    // Script para simular el lazy loading de Server Islands\n    function loadSection(sectionId) {\n        const container = document.getElementById(`${sectionId}-container`);\n        const skeletons = document.getElementById(`${sectionId}-skeletons`);\n        const content = document.getElementById(`${sectionId}-content`);\n        \n        if (!container || !skeletons || !content) return;\n        \n        // Crear un IntersectionObserver para detectar cuando la secci\xF3n es visible\n        const observer = new IntersectionObserver(\n            (entries) => {\n                entries.forEach((entry) => {\n                    if (entry.isIntersecting) {\n                        // Transici\xF3n suave sin flash\n                        setTimeout(() => {\n                            // Fade out skeletons\n                            skeletons.style.opacity = '0';\n                            skeletons.style.transition = 'opacity 300ms ease-out';\n                            \n                            setTimeout(() => {\n                                skeletons.classList.add('hidden');\n                                content.classList.remove('hidden');\n                                content.style.opacity = '1';\n                                content.style.transition = 'opacity 300ms ease-in';\n                            }, 300);\n                            \n                            observer.unobserve(entry.target);\n                        }, 200); // Delay reducido para mejor UX\n                    }\n                });\n            },\n            {\n                rootMargin: '50px', // Comenzar a cargar cuando est\xE9 a 50px de ser visible\n                threshold: 0.1,\n            },\n        );\n        \n        observer.observe(container);\n    }\n    \n    // Inicializar el lazy loading cuando el DOM est\xE9 listo\n    if (document.readyState === 'loading') {\n        document.addEventListener('DOMContentLoaded', () => loadSection(sectionId));\n    } else {\n        loadSection(sectionId);\n    }\n})();<\/script>"], ["", "<div", ' class="members-section" style="background-color: transparent;"> <!-- Skeletons que se muestran inicialmente --> <div', ' class="flex flex-row flex-wrap justify-center gap-2 transition-opacity duration-500 ease-in-out"> ', " </div> <!-- Contenido real que se carga de forma lazy --> <div", ' class="hidden transition-opacity duration-500 ease-in-out"', ' style="opacity: 0;"> ', " </div> </div> <script>(function(){", "\n    // Script para simular el lazy loading de Server Islands\n    function loadSection(sectionId) {\n        const container = document.getElementById(\\`\\${sectionId}-container\\`);\n        const skeletons = document.getElementById(\\`\\${sectionId}-skeletons\\`);\n        const content = document.getElementById(\\`\\${sectionId}-content\\`);\n        \n        if (!container || !skeletons || !content) return;\n        \n        // Crear un IntersectionObserver para detectar cuando la secci\xF3n es visible\n        const observer = new IntersectionObserver(\n            (entries) => {\n                entries.forEach((entry) => {\n                    if (entry.isIntersecting) {\n                        // Transici\xF3n suave sin flash\n                        setTimeout(() => {\n                            // Fade out skeletons\n                            skeletons.style.opacity = '0';\n                            skeletons.style.transition = 'opacity 300ms ease-out';\n                            \n                            setTimeout(() => {\n                                skeletons.classList.add('hidden');\n                                content.classList.remove('hidden');\n                                content.style.opacity = '1';\n                                content.style.transition = 'opacity 300ms ease-in';\n                            }, 300);\n                            \n                            observer.unobserve(entry.target);\n                        }, 200); // Delay reducido para mejor UX\n                    }\n                });\n            },\n            {\n                rootMargin: '50px', // Comenzar a cargar cuando est\xE9 a 50px de ser visible\n                threshold: 0.1,\n            },\n        );\n        \n        observer.observe(container);\n    }\n    \n    // Inicializar el lazy loading cuando el DOM est\xE9 listo\n    if (document.readyState === 'loading') {\n        document.addEventListener('DOMContentLoaded', () => loadSection(sectionId));\n    } else {\n        loadSection(sectionId);\n    }\n})();<\/script>"])), maybeRenderHead(), addAttribute(`${sectionId}-container`, "id"), addAttribute(`${sectionId}-skeletons`, "id"), Array.from({ length: skeletonCount }).map((_, index) => renderTemplate`${renderComponent($$result, "MemberCardSkeleton", $$MemberCardSkeleton, { "key": index })}`), addAttribute(`${sectionId}-content`, "id"), addAttribute(sectionId, "data-section"), renderSlot($$result, $$slots["default"]), defineScriptVars({ sectionId }));
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/members/LazyMembersSection.astro", void 0);

const CopyIcon = createSvgComponent({"meta":{"src":"/_astro/copy.C8-5ITQT.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","class":"icon icon-tabler icons-tabler-outline icon-tabler-copy"},"children":"<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /><path d=\"M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z\" /><path d=\"M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1\" />"});

const CopyCheckIcon = createSvgComponent({"meta":{"src":"/_astro/copy-check.Ci8Pwy7a.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","viewBox":"0 0 24 24","fill":"currentColor","class":"icon icon-tabler icons-tabler-filled icon-tabler-copy-check"},"children":"<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /><path d=\"M18.333 6a3.667 3.667 0 0 1 3.667 3.667v8.666a3.667 3.667 0 0 1 -3.667 3.667h-8.666a3.667 3.667 0 0 1 -3.667 -3.667v-8.666a3.667 3.667 0 0 1 3.667 -3.667zm-3.333 -4c1.094 0 1.828 .533 2.374 1.514a1 1 0 1 1 -1.748 .972c-.221 -.398 -.342 -.486 -.626 -.486h-10c-.548 0 -1 .452 -1 1v9.998c0 .32 .154 .618 .407 .805l.1 .065a1 1 0 1 1 -.99 1.738a3 3 0 0 1 -1.517 -2.606v-10c0 -1.652 1.348 -3 3 -3zm1.293 9.293l-3.293 3.292l-1.293 -1.292a1 1 0 0 0 -1.414 1.414l2 2a1 1 0 0 0 1.414 0l4 -4a1 1 0 0 0 -1.414 -1.414\" />"});

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$EmailCopy = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$EmailCopy;
  const { email, className = "" } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["", "<button", "", '> <!-- Texto del email --> <span class="group-hover:text-azul-brillante/80 transition-colors duration-300"> ', ' </span> <!-- Contenedor para \xEDconos superpuestos --> <div class="relative w-4 h-4"> <!-- Icono portapapeles --> ', " <!-- Icono \xE9xito --> ", ' </div> <!-- Tooltip --> <span class="z-20 tooltip absolute -top-7 left-1/2 -translate-x-1/2 backdrop:blur-sm bg-dai/40 border-1 border-dai/30 text-white text-xs rounded-md px-2 py-1 opacity-0 transition-opacity duration-300">\nCopiado\n</span> </button> <script type="module">\n    function initEmailCopy() {\n        const containers = document.querySelectorAll("[data-email]");\n\n        containers.forEach(container => {\n        const email = container.dataset.email;\n        const clipboardIcon = container.querySelector(".clipboard-icon");\n        const successIcon = container.querySelector(".success-icon");\n        const tooltip = container.querySelector(".tooltip");\n\n        container.addEventListener("click", async () => {\n            try {\n            await navigator.clipboard.writeText(email);\n\n            // feedback\n            clipboardIcon.classList.add("hidden");\n            successIcon.classList.remove("opacity-0");\n            tooltip.classList.remove("opacity-0");\n\n            setTimeout(() => {\n                clipboardIcon.classList.remove("hidden");\n                successIcon.classList.add("opacity-0");\n                tooltip.classList.add("opacity-0");\n            }, 2000);\n            } catch (err) {\n            console.error("Error al copiar:", err);\n            }\n        });\n        });\n    }\n\n    if (document.readyState === "loading") {\n        document.addEventListener("DOMContentLoaded", initEmailCopy);\n    } else {\n        initEmailCopy();\n    }\n<\/script>'])), maybeRenderHead(), addAttribute(`relative inline-flex items-center gap-2 group ${className}`, "class"), addAttribute(email, "data-email"), email, renderComponent($$result, "CopyIcon", CopyIcon, { "class": "clipboard-icon absolute inset-0 w-4 h-4 text-white group-hover:text-azul-brillante/80 transition-colors duration-300" }), renderComponent($$result, "CopyCheckIcon", CopyCheckIcon, { "class": "success-icon absolute inset-0 w-4 h-4 text-yellow-200 opacity-0 transition-opacity duration-300" }));
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/members/emailCopy.astro", void 0);

const $$Astro = createAstro();
const $$MemberCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MemberCard;
  const avatarUrl = Astro2.props.avatarUrl;
  const role = Astro2.props.role;
  const name = Astro2.props.name;
  const email = Astro2.props.email;
  const linkedin = Astro2.props.linkedin;
  const tiktok = Astro2.props.tiktok;
  const x = Astro2.props.x;
  const instagram = Astro2.props.instagram;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`${name} - ${role}`, "title")} class="col-span-10 md:col-span-6 lg:col-span-4 xl:col-span-3 overflow-hidden flex flex-col scale-90"> <div class="bg-white/10 w-70 border backdrop-blur-sm border-dai/30 hover:border-dai/70 transition-all duration-300 rounded-2xl p-6 flex flex-col min-h-105 max-h-105"> <!-- Encapsulación 1: Foto de usuario y nombre --> <div class="flex flex-col items-center gap-3 mb-4 w-full"> <div class="flex"> ${avatarUrl ? renderTemplate`<img${addAttribute(avatarUrl, "src")}${addAttribute(`Imagen del perfil de ${name}`, "alt")} class="w-50 h-50 rounded-full border-2 border-white/20">` : renderTemplate`<div class="h-40 w-40 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center text-white"> ${renderComponent($$result, "UserIcon", User, { "class": "h-25 w-25 text-azul-brillante" })} </div>`} </div> <h2 class="text-xl font-semibold text-white text-center -mx-6 px-2 break-words">${name}</h2> </div> <!-- Encapsulación 2: Cargo y email --> <div class="flex flex-col justify-between flex-1 mb-4 w-full"> <h3 class="text-[18px] font-semibold text-azul-brillante text-center">${role}</h3> <div class="flex justify-center mt-2"> ${renderComponent($$result, "EmailCopy", $$EmailCopy, { "email": email, "className": "text-white/90 text-sm cursor-pointer" })} </div> </div> <!-- Redes sociales respetando padding --> <div class="flex justify-center space-x-4"> ${linkedin && renderTemplate`<a${addAttribute(linkedin, "href")} class="text-white hover:text-azul-brillante hover:scale-115 duration-300 transition-all">${renderComponent($$result, "LinkedInIcon", LinkedInIcon, { "class": "inline-block h-[22px] w-[22px]" })}</a>`} ${tiktok && renderTemplate`<a${addAttribute(tiktok, "href")} class="text-white hover:text-azul-brillante hover:scale-115 duration-300 transition-all">${renderComponent($$result, "TikTokIcon", TikTokIcon, { "class": "inline-block h-5 w-5" })}</a>`} ${x && renderTemplate`<a${addAttribute(x, "href")} class="text-white hover:text-azul-brillante hover:scale-115 duration-300 transition-all">${renderComponent($$result, "XIcon", XIcon, { "class": "inline-block h-6 w-6" })}</a>`} ${instagram && renderTemplate`<a${addAttribute(instagram, "href")} class="text-white hover:text-azul-brillante hover:scale-115 duration-300 transition-all">${renderComponent($$result, "InstagramIcon", InstagramIcon, { "class": "inline-block h-6 w-6" })}</a>`} ${!linkedin && !tiktok && !x && !instagram && renderTemplate`<div class="text-azul-brillante"> <div class="h-3 w-30 border-t-1 border-azul-brillante/50 mt-3"></div> </div>`} </div> </div> </div>`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/members/memberCard.astro", void 0);

const $$DirectiveMembers = createComponent(async ($$result, $$props, $$slots) => {
  const roleEmails = {
    "dai_delegate": "delegado@dai.uvigo.gal",
    "dai_subdelegate": "subdelegada@dai.uvigo.gal",
    "dai_secretary": "secretario@dai.uvigo.gal",
    "dai_treasurer": "tesouraria@dai.uvigo.gal",
    "dai_communication_coord": "redes@dai.uvigo.gal",
    "dai_infrastructure_coord": "infraestructuras@dai.uvigo.gal",
    "dai_foreign_affairs_coord": "externas@dai.uvigo.gal",
    "dai_leisure_sports_coord": "deporteseocio@dai.uvigo.gal",
    "local_ceeibis_representative": "uvigo@ceeibis.com"
  };
  let sortedDirectiveMembers = [];
  let error = null;
  try {
    const { data: directive_members_data, error: dbError } = await supabase.from("dai_directiva_users").select("*");
    if (dbError) throw dbError;
    const directive_members = directive_members_data || [];
    const roleDirectiveOrder = ["dai_delegate", "dai_subdelegate", "dai_secretary", "dai_treasurer"];
    sortedDirectiveMembers = directive_members.sort((a, b) => {
      const orderA = roleDirectiveOrder.indexOf(a.role_id);
      const orderB = roleDirectiveOrder.indexOf(b.role_id);
      if (orderA === -1 && orderB === -1) return 0;
      if (orderA === -1) return 1;
      if (orderB === -1) return -1;
      return orderA - orderB;
    });
  } catch (e) {
    error = e;
  }
  return renderTemplate`${error && renderTemplate`${maybeRenderHead()}<div class="text-center text-red-400 p-4"><p>Error al cargar los miembros de la directiva</p><p class="text-sm text-white/60">Intenta recargar la página</p></div>`}${!error && renderTemplate`<div class="flex flex-row flex-wrap justify-center gap-2">${sortedDirectiveMembers.map((member) => renderTemplate`${renderComponent($$result, "MemberCard", $$MemberCard, { "key": member.id, "name": member.name, "avatarUrl": member.avatar_url, "role": member.role_name.slice(0, -6), "email": roleEmails[member.role_id], "x": member.x, "linkedin": member.linkedin, "tiktok": member.tiktok, "instagram": member.instagram })}`)}</div>`}`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/members/DirectiveMembers.astro", void 0);

const $$ExtendedDirectiveMembers = createComponent(async ($$result, $$props, $$slots) => {
  const roleEmails = {
    "dai_delegate": "delegado@dai.uvigo.gal",
    "dai_subdelegate": "subdelegada@dai.uvigo.gal",
    "dai_secretary": "secretario@dai.uvigo.gal",
    "dai_treasurer": "tesouraria@dai.uvigo.gal",
    "dai_communication_coord": "redes@dai.uvigo.gal",
    "dai_infrastructure_coord": "infraestructuras@dai.uvigo.gal",
    "dai_foreign_affairs_coord": "externas@dai.uvigo.gal",
    "dai_leisure_sports_coord": "deporteseocio@dai.uvigo.gal",
    "local_ceeibis_representative": "uvigo@ceeibis.com"
  };
  let sortedExtendedMembers = [];
  let error = null;
  try {
    const { data: extended_members_data, error: dbError } = await supabase.from("dai_directiva_extendida_users").select("*");
    if (dbError) throw dbError;
    const extended_members = extended_members_data || [];
    const roleExtendedOrder = [
      "dai_communication_coord",
      "dai_infrastructure_coord",
      "dai_foreign_affairs_coord",
      "dai_leisure_sports_coord",
      "local_ceeibis_representative"
    ];
    sortedExtendedMembers = extended_members.sort((a, b) => {
      const orderA = roleExtendedOrder.indexOf(a.role_id);
      const orderB = roleExtendedOrder.indexOf(b.role_id);
      if (orderA === -1 && orderB === -1) return 0;
      if (orderA === -1) return 1;
      if (orderB === -1) return -1;
      return orderA - orderB;
    });
  } catch (e) {
    error = e;
  }
  return renderTemplate`${error && renderTemplate`${maybeRenderHead()}<div class="text-center text-red-400 p-4"><p>Error al cargar los miembros de la directiva extendida</p><p class="text-sm text-white/60">Intenta recargar la página</p></div>`}${!error && renderTemplate`<div class="flex flex-row flex-wrap justify-center gap-2">${sortedExtendedMembers.map((member) => renderTemplate`${renderComponent($$result, "MemberCard", $$MemberCard, { "key": member.id, "name": member.name, "avatarUrl": member.avatar_url, "role": member.role_name.endsWith(" - DAI") ? member.role_name.slice(0, -6) : member.role_name, "email": roleEmails[member.role_id], "x": member.x, "linkedin": member.linkedin, "tiktok": member.tiktok, "instagram": member.instagram })}`)}</div>`}`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/members/ExtendedDirectiveMembers.astro", void 0);

const $$FreeMembersMembers = createComponent(async ($$result, $$props, $$slots) => {
  let freeMembers = [];
  let error = null;
  try {
    const { data: free_members_data, error: dbError } = await supabase.from("dai_free_members_users").select("*");
    if (dbError) throw dbError;
    freeMembers = free_members_data || [];
  } catch (e) {
    error = e;
  }
  return renderTemplate`${error && renderTemplate`${maybeRenderHead()}<div class="text-center text-red-400 p-4"><p>Error al cargar los miembros libres</p><p class="text-sm text-white/60">Intenta recargar la página</p></div>`}${!error && renderTemplate`<div class="flex flex-row flex-wrap justify-center gap-2">${freeMembers.map((member) => renderTemplate`${renderComponent($$result, "MemberCard", $$MemberCard, { "key": member.id, "name": member.name, "avatarUrl": member.avatar_url, "role": member.role_name.endsWith(" - DAI") ? member.role_name.slice(0, -6) : member.role_name, "email": member.email, "x": member.x, "linkedin": member.linkedin, "tiktok": member.tiktok, "instagram": member.instagram })}`)}</div>`}`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/members/FreeMembersMembers.astro", void 0);

const $$TutorandosMembers = createComponent(async ($$result, $$props, $$slots) => {
  let tutorandos = [];
  let error = null;
  try {
    const { data: tutorandos_data, error: dbError } = await supabase.from("dai_scholars_users").select("*");
    if (dbError) throw dbError;
    tutorandos = tutorandos_data || [];
  } catch (e) {
    error = e;
  }
  return renderTemplate`${error && renderTemplate`${maybeRenderHead()}<div class="text-center text-red-400 p-4"><p>Error al cargar los tutorandos</p><p class="text-sm text-white/60">Intenta recargar la página</p></div>`}${!error && renderTemplate`<div class="flex flex-row flex-wrap justify-center gap-6">${tutorandos.map((member) => renderTemplate`${renderComponent($$result, "MemberCard", $$MemberCard, { "key": member.id, "name": member.name, "avatarUrl": member.avatar_url, "role": member.role_name.endsWith(" - DAI") ? member.role_name.slice(0, -6) : member.role_name, "email": member.email, "x": member.x, "linkedin": member.linkedin, "tiktok": member.tiktok, "instagram": member.instagram })}`)}</div>`}`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/components/members/TutorandosMembers.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "class": "z-100", "title": "P\xE1gina de Miembros de la DAI" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col text-white gap-10 min-h-screen pt-6 max-w-[1500px] mx-auto"> <section title="Directiva" class="p-6 mt-26 text-center"> <h1 class="text-5xl font-bold mb-6">Directiva</h1> ${renderComponent($$result2, "LazyMembersSection", $$LazyMembersSection, { "skeletonCount": 4, "sectionId": "directive" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "DirectiveMembers", $$DirectiveMembers, {})} ` })} </section> <!-- Sección Directiva Extendida con Server Island --> <section title="Directiva Extendida" class="p-6 text-center"> <h1 class="text-5xl font-bold mb-6">Directiva Extendida</h1> ${renderComponent($$result2, "LazyMembersSection", $$LazyMembersSection, { "skeletonCount": 5, "sectionId": "extended-directive" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "ExtendedDirectiveMembers", $$ExtendedDirectiveMembers, {})} ` })} </section> <!-- Sección Miembros Libres con Server Island --> <section title="Miembros Libres" class="p-6 text-center"> <h1 class="text-5xl font-bold mb-6">Miembros Libres</h1> ${renderComponent($$result2, "LazyMembersSection", $$LazyMembersSection, { "skeletonCount": 8, "sectionId": "free-members" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "FreeMembersMembers", $$FreeMembersMembers, {})} ` })} </section> <!-- Sección Tutorandos con Server Island --> <section title="Tutorandos" class="p-6 text-center"> <h1 class="text-5xl font-bold mb-6">Tutorandos</h1> ${renderComponent($$result2, "LazyMembersSection", $$LazyMembersSection, { "skeletonCount": 12, "sectionId": "tutorandos" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "TutorandosMembers", $$TutorandosMembers, {})} ` })} </section> </div> ` })}`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/members/index.astro", void 0);

const $$file = "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/members/index.astro";
const $$url = "/members";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
