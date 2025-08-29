import { c as createComponent, f as addAttribute, g as renderHead, r as renderComponent, h as renderSlot, a as renderTemplate } from './astro/server_BKdtxvi7.mjs';
import 'kleur/colors';
/* empty css                        */
import './index_MaT6fT73.mjs';
import { $ as $$Font } from './_astro_assets_DdnmNlfD.mjs';
import { $ as $$BlueMistBackground } from './BlueMistBackground_U_jHJWty.mjs';
/* empty css                        */

const $$AuthLayout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es" data-astro-cid-3qlrnpww> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><!-- HTML Meta Tags --><title>Delegación de Alumnado de Industriales - EEI - UVigo</title><link rel="icon" type="image/svg+xml" href="/DAI_favicon.svg"><meta name="theme-color" content="#00ace2"><meta name="description"${addAttribute("La Delegaci\xF3n de Alumnos de Industriales es un \xF3rgano de representaci\xF3n estudiantil que defiende los intereses de los estudiantes de la Escuela de Ingenier\xEDa Industrial de la Universidad de Vigo. Descubre eventos, asesor\xEDa acad\xE9mica y c\xF3mo participar en la vida universitaria.", "content")}><!-- Open Graph Meta Tags --><meta property="og:title" content="Delegación de Alumnos de Industriales - UVigo"><meta property="og:description"${addAttribute("La Delegaci\xF3n de Alumnos de Industriales es un \xF3rgano de representaci\xF3n estudiantil que defiende los intereses de los estudiantes de la Escuela de Ingenier\xEDa Industrial de la Universidad de Vigo. Descubre eventos, asesor\xEDa acad\xE9mica y c\xF3mo participar en la vida universitaria.", "content")}><meta property="og:image"${addAttribute("", "content")}><!-- Twitter/X Meta Tags --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@dai_uvigo"><meta name="twitter:title" content="Delegación de Alumnos de Industriales - UVigo">${renderHead()}</head> ${renderComponent($$result, "Font", $$Font, { "cssVariable": "--font-roboto", "preload": true, "data-astro-cid-3qlrnpww": true })} <main class="min-h-screen flex items-center justify-center p-4" data-astro-cid-3qlrnpww> ${renderSlot($$result, $$slots["default"])} </main> <background class="fixed inset-0 -z-1 bg-azul-oscuro" data-astro-cid-3qlrnpww> ${renderComponent($$result, "BlueMistBackground", $$BlueMistBackground, { "data-astro-cid-3qlrnpww": true })} </background>  </html>`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/layouts/AuthLayout.astro", void 0);

export { $$AuthLayout as $ };
