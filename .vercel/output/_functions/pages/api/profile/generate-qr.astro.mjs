export { renderers } from '../../../renderers.mjs';

const GET = async ({ locals }) => {
  try {
    const user = locals.user;
    if (!user) {
      return new Response(JSON.stringify({
        error: "No autorizado",
        fallback: {
          qrData: "user-not-found",
          displayText: "Usuario no encontrado"
        }
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const userId = user.id;
    const userEmail = user.email || user.user_metadata?.email;
    const qrData = {
      userId,
      email: userEmail,
      timestamp: Date.now()
    };
    const qrString = JSON.stringify(qrData);
    return new Response(JSON.stringify({
      success: true,
      data: {
        qrData: qrString,
        userId,
        displayText: `Usuario: ${userEmail || userId}`,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error en /api/profile/generate-qr:", error);
    const fallbackQr = {
      qrData: `dai-user-${Date.now()}`,
      displayText: "Error generando QR personalizado"
    };
    return new Response(JSON.stringify({
      error: "Error generando QR",
      fallback: fallbackQr
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
