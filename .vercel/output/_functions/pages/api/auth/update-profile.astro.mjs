import { s as supabase } from '../../../chunks/supabase_CcsmWd0j.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401 });
    }
    const userId = user.id;
    const updates = {};
    if (body.full_name !== void 0) updates.full_name = body.full_name;
    if (body.dni !== void 0) updates.dni = body.dni;
    if (body.phone !== void 0) updates.phone = body.phone;
    if (body.email !== void 0) updates.email = body.email;
    if (Object.keys(updates).length > 0) {
      const { error: authError } = await supabase.auth.updateUser({
        data: updates,
        email: body.email ?? void 0
        // si quieres permitir actualizar email real
      });
      if (authError) throw authError;
      const { error: userTableError } = await supabase.from("users").update(updates).eq("id", userId);
      if (userTableError) throw userTableError;
    }
    const socialUpdates = {};
    if (body.instagram !== void 0) socialUpdates.instagram = body.instagram;
    if (body.linkedin !== void 0) socialUpdates.linkedin = body.linkedin;
    if (body.tiktok !== void 0) socialUpdates.tiktok = body.tiktok;
    if (body.x !== void 0) socialUpdates.x = body.x;
    if (Object.keys(socialUpdates).length > 0) {
      const { error: socialError } = await supabase.from("users").update(socialUpdates).eq("id", userId);
      if (socialError) throw socialError;
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Update profile error:", err);
    return new Response(JSON.stringify({ error: err.message || "Error al actualizar perfil" }), {
      status: 500
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
