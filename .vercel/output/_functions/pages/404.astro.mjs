import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BKdtxvi7.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_C3WOZSUX.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "class": "z-100" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col items-center justify-center h-screen text-white"> <h1 class="text-8xl font-bold mb-6">404</h1> <p class="text-3xl mb-8">Página no encontrada</p> </div> ` })}`;
}, "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/404.astro", void 0);

const $$file = "C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$404,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
