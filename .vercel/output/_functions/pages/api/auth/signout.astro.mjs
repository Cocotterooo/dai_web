export { renderers } from '../../../renderers.mjs';

const GET = async ({ cookies, redirect }) => {
  console.log("🚪 === API AUTH SIGNOUT ===");
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });
  console.log("🍪 Cookies de sesión eliminadas");
  console.log("🔄 Redirigiendo a auth");
  return redirect("/auth");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
