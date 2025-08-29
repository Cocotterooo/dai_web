import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CVo5TeJH.mjs';
import { manifest } from './manifest_B8OJA-B7.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/api/auth/analyze-token.astro.mjs');
const _page3 = () => import('./pages/api/auth/callback.astro.mjs');
const _page4 = () => import('./pages/api/auth/check-confirmation.astro.mjs');
const _page5 = () => import('./pages/api/auth/complete-profile.astro.mjs');
const _page6 = () => import('./pages/api/auth/register.astro.mjs');
const _page7 = () => import('./pages/api/auth/signin.astro.mjs');
const _page8 = () => import('./pages/api/auth/signout.astro.mjs');
const _page9 = () => import('./pages/api/auth/update-profile.astro.mjs');
const _page10 = () => import('./pages/api/check-user-roles.astro.mjs');
const _page11 = () => import('./pages/api/debug/manual-confirm.astro.mjs');
const _page12 = () => import('./pages/api/debug/supabase-config.astro.mjs');
const _page13 = () => import('./pages/api/profile/generate-qr.astro.mjs');
const _page14 = () => import('./pages/api/profile/user-history.astro.mjs');
const _page15 = () => import('./pages/api/profile/user-info.astro.mjs');
const _page16 = () => import('./pages/api/profile/user-stats.astro.mjs');
const _page17 = () => import('./pages/api/users/commissions.astro.mjs');
const _page18 = () => import('./pages/api/users/roles.astro.mjs');
const _page19 = () => import('./pages/api/users/roles-corrected.astro.mjs');
const _page20 = () => import('./pages/auth/callback.astro.mjs');
const _page21 = () => import('./pages/auth/confirm.astro.mjs');
const _page22 = () => import('./pages/auth/email-confirmation-pending.astro.mjs');
const _page23 = () => import('./pages/auth/email-confirmed.astro.mjs');
const _page24 = () => import('./pages/auth/verify-email.astro.mjs');
const _page25 = () => import('./pages/auth.astro.mjs');
const _page26 = () => import('./pages/complete-profile.astro.mjs');
const _page27 = () => import('./pages/members.astro.mjs');
const _page28 = () => import('./pages/profile.astro.mjs');
const _page29 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/api/auth/analyze-token.ts", _page2],
    ["src/pages/api/auth/callback.ts", _page3],
    ["src/pages/api/auth/check-confirmation.ts", _page4],
    ["src/pages/api/auth/complete-profile.ts", _page5],
    ["src/pages/api/auth/register.ts", _page6],
    ["src/pages/api/auth/signin.ts", _page7],
    ["src/pages/api/auth/signout.ts", _page8],
    ["src/pages/api/auth/update-profile.ts", _page9],
    ["src/pages/api/check-user-roles.ts", _page10],
    ["src/pages/api/debug/manual-confirm.ts", _page11],
    ["src/pages/api/debug/supabase-config.ts", _page12],
    ["src/pages/api/profile/generate-qr.ts", _page13],
    ["src/pages/api/profile/user-history.ts", _page14],
    ["src/pages/api/profile/user-info.ts", _page15],
    ["src/pages/api/profile/user-stats.ts", _page16],
    ["src/pages/api/users/commissions.ts", _page17],
    ["src/pages/api/users/roles.ts", _page18],
    ["src/pages/api/users/roles-corrected.ts", _page19],
    ["src/pages/auth/callback.astro", _page20],
    ["src/pages/auth/confirm.astro", _page21],
    ["src/pages/auth/email-confirmation-pending.astro", _page22],
    ["src/pages/auth/email-confirmed.astro", _page23],
    ["src/pages/auth/verify-email.astro", _page24],
    ["src/pages/auth.astro", _page25],
    ["src/pages/complete-profile.astro", _page26],
    ["src/pages/members/index.astro", _page27],
    ["src/pages/profile.astro", _page28],
    ["src/pages/index.astro", _page29]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "26204abb-8da1-42d0-bd71-4bc0e4bbec9e",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
