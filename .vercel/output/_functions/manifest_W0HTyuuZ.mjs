import 'kleur/colors';
import { p as decodeKey } from './chunks/astro/server_DaIkj40x.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Nt9NpqF-.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/manue/Desktop/DAI-Proyectos/dai_web/","cacheDir":"file:///C:/Users/manue/Desktop/DAI-Proyectos/dai_web/node_modules/.astro/","outDir":"file:///C:/Users/manue/Desktop/DAI-Proyectos/dai_web/dist/","srcDir":"file:///C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/","publicDir":"file:///C:/Users/manue/Desktop/DAI-Proyectos/dai_web/public/","buildClientDir":"file:///C:/Users/manue/Desktop/DAI-Proyectos/dai_web/dist/client/","buildServerDir":"file:///C:/Users/manue/Desktop/DAI-Proyectos/dai_web/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/auth.Eg-V8z8I.css"},{"type":"inline","content":".menu-line[data-astro-cid-7beitfol]{transition:transform .4s ease-in-out,opacity .4s ease-in-out;transform-origin:left}#menu-button[data-astro-cid-7beitfol].is-active .top-line[data-astro-cid-7beitfol]{transform:rotate(45deg)}#menu-button[data-astro-cid-7beitfol].is-active .middle-line[data-astro-cid-7beitfol]{opacity:0;transform:translate(-20px)}#menu-button[data-astro-cid-7beitfol].is-active .bottom-line[data-astro-cid-7beitfol]{transform:rotate(-45deg)}#menu-backdrop-desktop[data-astro-cid-7beitfol]{backface-visibility:hidden;transform-style:preserve-3d}html,body{font-family:var(--font-roboto);margin:0;padding:0;width:100%;min-height:100vh;background:transparent;overflow-x:hidden;box-sizing:border-box}\n"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/auth.Eg-V8z8I.css"},{"type":"inline","content":"html,body{font-family:var(--font-roboto);margin:0;padding:0;width:100%;min-height:100vh;background:transparent;overflow-x:hidden;box-sizing:border-box}\n"}],"routeData":{"route":"/auth","isIndex":false,"type":"page","pattern":"^\\/auth\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth.astro","pathname":"/auth","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/auth.Eg-V8z8I.css"},{"type":"inline","content":".menu-line[data-astro-cid-7beitfol]{transition:transform .4s ease-in-out,opacity .4s ease-in-out;transform-origin:left}#menu-button[data-astro-cid-7beitfol].is-active .top-line[data-astro-cid-7beitfol]{transform:rotate(45deg)}#menu-button[data-astro-cid-7beitfol].is-active .middle-line[data-astro-cid-7beitfol]{opacity:0;transform:translate(-20px)}#menu-button[data-astro-cid-7beitfol].is-active .bottom-line[data-astro-cid-7beitfol]{transform:rotate(-45deg)}#menu-backdrop-desktop[data-astro-cid-7beitfol]{backface-visibility:hidden;transform-style:preserve-3d}html,body{font-family:var(--font-roboto);margin:0;padding:0;width:100%;min-height:100vh;background:transparent;overflow-x:hidden;box-sizing:border-box}\n"}],"routeData":{"route":"/complete-profile","isIndex":false,"type":"page","pattern":"^\\/complete-profile\\/?$","segments":[[{"content":"complete-profile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/complete-profile.astro","pathname":"/complete-profile","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/auth.Eg-V8z8I.css"},{"type":"inline","content":".menu-line[data-astro-cid-7beitfol]{transition:transform .4s ease-in-out,opacity .4s ease-in-out;transform-origin:left}#menu-button[data-astro-cid-7beitfol].is-active .top-line[data-astro-cid-7beitfol]{transform:rotate(45deg)}#menu-button[data-astro-cid-7beitfol].is-active .middle-line[data-astro-cid-7beitfol]{opacity:0;transform:translate(-20px)}#menu-button[data-astro-cid-7beitfol].is-active .bottom-line[data-astro-cid-7beitfol]{transform:rotate(-45deg)}#menu-backdrop-desktop[data-astro-cid-7beitfol]{backface-visibility:hidden;transform-style:preserve-3d}html,body{font-family:var(--font-roboto);margin:0;padding:0;width:100%;min-height:100vh;background:transparent;overflow-x:hidden;box-sizing:border-box}\n.rotar-engranaje-grande[data-astro-cid-wycztcts]{animation:rotarD infinite 90s linear;transform-origin:center}.rotar-engranaje-pequeño[data-astro-cid-wycztcts]{animation:rotarI infinite 90s linear;transform-origin:center}.rotar-engranaje-pequeño-wrapper[data-astro-cid-wycztcts]{width:160px;height:160px;transform:translate(90px,22px)}@keyframes rotarD{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes rotarI{0%{transform:rotate(0)}to{transform:rotate(-360deg)}}.gradient-border[data-astro-cid-7lrx4sl3]{background:var(--color-azul-oscuro);border-radius:16px;box-sizing:border-box;position:relative;padding:0}@property --angle{syntax: \"<angle>\"; initial-value: 0deg; inherits: false;}.gradient-border[data-astro-cid-7lrx4sl3]:after,.gradient-border[data-astro-cid-7lrx4sl3]:before{content:\"\";position:absolute;top:50%;left:50%;translate:-50% -50%;width:calc(100% + 4px);height:calc(100% + 3px);background-image:conic-gradient(from var(--angle),var(--color-instagram-2),var(--color-instagram-3),var(--color-instagram-1),var(--color-instagram-5),var(--color-instagram-4),var(--color-instagram-2));border-radius:16px;z-index:-1;animation:spin 10s linear infinite;box-sizing:border-box}.gradient-border[data-astro-cid-7lrx4sl3]:before{filter:blur(12px);opacity:.5}@keyframes spin{0%{--angle: 0deg}to{--angle: 360deg}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/auth.astro",{"propagation":"none","containsHead":true}],["C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/complete-profile.astro",{"propagation":"none","containsHead":true}],["C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/auth@_@astro":"pages/auth.astro.mjs","\u0000@astro-page:src/pages/complete-profile@_@astro":"pages/complete-profile.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_W0HTyuuZ.mjs","C:/Users/manue/Desktop/DAI-Proyectos/dai_web/node_modules/@astrojs/vercel/dist/image/build-service.js":"chunks/build-service_BMjnysy6.mjs","C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/complete-profile.astro?astro&type=script&index=0&lang.ts":"_astro/complete-profile.astro_astro_type_script_index_0_lang.BbnLLWzI.js","C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.BVfloJzG.js","C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/layouts/OurServices/ServiceCard.astro?astro&type=script&index=0&lang.ts":"_astro/ServiceCard.astro_astro_type_script_index_0_lang.DbY7Y4zd.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/pages/complete-profile.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const s=document.querySelector(\"form\"),e=document.getElementById(\"full_name\");if(s&&e){let i=function(){if(!e)return!1;const t=e.value.trim(),l=document.getElementById(\"full_name_error\");l&&l.remove();let n=\"\";if(t?t.split(/\\s+/).length<2?n=\"Debe incluir al menos un nombre y un apellido\":/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$/.test(t)?t.length<3?n=\"El nombre debe tener al menos 3 caracteres\":t.length>100&&(n=\"El nombre no puede exceder 100 caracteres\"):n=\"Solo se permiten letras y espacios\":n=\"El nombre completo es obligatorio\",n){const r=document.createElement(\"p\");r.id=\"full_name_error\",r.className=\"text-red-400 text-xs mt-1\",r.textContent=n;const o=e.nextSibling;return e.parentNode&&o&&o.nextSibling?e.parentNode.insertBefore(r,o.nextSibling):e.parentNode&&e.parentNode.appendChild(r),e.classList.add(\"border-red-400\",\"focus:ring-red-400\"),e.classList.remove(\"border-white/30\",\"focus:ring-dai\"),!1}else return e.classList.remove(\"border-red-400\",\"focus:ring-red-400\"),e.classList.add(\"border-white/30\",\"focus:ring-dai\"),!0};e.addEventListener(\"input\",function(){i()}),s.addEventListener(\"submit\",function(t){i()||t.preventDefault()})}});"],["C:/Users/manue/Desktop/DAI-Proyectos/dai_web/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","function l(n,t=32){const o=document.querySelector(n);if(!o){console.warn(\"Target element not found:\",n);return}const e=document.querySelector('header[class*=\"fixed\"]'),c=(e?e.getBoundingClientRect().height:56)+t,r=o.getBoundingClientRect().top+window.pageYOffset-c;window.scrollTo({top:r,behavior:\"smooth\"})}function i(){document.querySelectorAll(\"[data-scroll-target]\").forEach(t=>{t.addEventListener(\"click\",o=>{o.preventDefault();const e=t.getAttribute(\"data-scroll-target\"),s=t.getAttribute(\"data-scroll-offset\"),c=s?parseInt(s):32;e&&l(e,c)})})}document.addEventListener(\"DOMContentLoaded\",i);"]],"assets":["/_astro/bus.Bvf-VkOy.svg","/_astro/maletin.D96mXlGE.svg","/_astro/arrow-down.BZy-rm9a.svg","/_astro/noticias.CsHR96Py.svg","/_astro/x.ATC87rTm.svg","/_astro/instagram.PzqHEj04.svg","/_astro/engranaje_vacio.BvxtPlRu.svg","/_astro/tiktok.BUirgCX1.svg","/_astro/discord.B77MMf3i.svg","/_astro/linkedin.CgFOWy_H.svg","/_astro/logo_s.CzpOcaA-.svg","/_astro/engranaje_linea.1WWON6DD.svg","/_astro/dai_blanco.CBjf4OZy.svg","/_astro/calendario.DKePTeI8.svg","/_astro/ayuda.ZuVtZ5Qu.svg","/_astro/libreta.BOvw0oiP.svg","/_astro/usuarios.CJlZdStn.svg","/_astro/discord_complete.DZ2a7QoS.svg","/_astro/InstaLogotipe.D1ae9nW7.svg","/_astro/auth.Eg-V8z8I.css","/favicon.svg","/_astro/ServiceCard.astro_astro_type_script_index_0_lang.DbY7Y4zd.js","/_astro/fonts/0577fe8bb9cd84bf.woff2","/_astro/fonts/11db651e280eda63.woff2","/_astro/fonts/1db1938a9a323da0.woff2","/_astro/fonts/34266fc688623477.woff2","/_astro/fonts/5d51c2d822bd1293.woff2","/_astro/fonts/5dff60e16d21febe.woff2","/_astro/fonts/8d330041b04e49bd.woff2","/_astro/fonts/9a8e37c92f662669.woff2","/_astro/fonts/ccbd7268ffc62f0d.woff2","/_astro/fonts/cdc5dea70583eb75.woff2","/_astro/fonts/e036622a2f6a1999.woff2","/_astro/fonts/ebcca4a796cb533a.woff2","/_astro/fonts/f5bac213627e8597.woff2","/_astro/fonts/f8c044ffcdad6309.woff2"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"kFbpj3pFLBKzdaYEXUJKKi0VqJ/J6y7Wjk9uWm7pijE="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
