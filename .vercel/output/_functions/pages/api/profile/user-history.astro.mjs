import { s as supabase } from '../../../chunks/supabase_CcsmWd0j.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ locals }) => {
  try {
    const user = locals.user;
    if (!user) {
      return new Response(JSON.stringify({
        error: "No autorizado",
        fallback: {
          history: []
        }
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const userId = user.id;
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Database timeout")), 5e3);
    });
    const historyPromise = supabase.from("user_activity_history").select(`
                id,
                activity_type,
                description,
                created_at,
                metadata
            `).eq("user_id", userId).order("created_at", { ascending: false }).limit(50);
    const { data: historyData, error } = await Promise.race([
      historyPromise,
      timeoutPromise
    ]);
    if (error) {
      throw error;
    }
    return new Response(JSON.stringify({
      success: true,
      data: {
        history: historyData || []
      }
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error en /api/profile/user-history:", error);
    return new Response(JSON.stringify({
      error: "Error cargando historial",
      fallback: {
        history: [
          {
            id: 1,
            activity_type: "system",
            description: "No se pudieron cargar los datos del historial",
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            metadata: {}
          }
        ]
      }
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
