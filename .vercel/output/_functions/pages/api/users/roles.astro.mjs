import { s as supabase } from '../../../chunks/supabase_CcsmWd0j.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ request, url }) => {
  try {
    const userId = url.searchParams.get("user_id");
    if (!userId) {
      return new Response(JSON.stringify({
        error: "user_id es requerido"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { data: userRoles, error: rolesError } = await supabase.from("organization.user_roles").select(`
        id,
        user_id,
        role_id,
        group_id,
        created_at
      `).eq("user_id", userId);
    if (rolesError) {
      return new Response(JSON.stringify({
        error: "Error al consultar roles",
        details: rolesError.message
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    let rolesData = [];
    let groupsData = [];
    if (userRoles?.length) {
      const roleIds = userRoles.map((ur) => ur.role_id).filter(Boolean);
      const groupIds = userRoles.map((ur) => ur.group_id).filter(Boolean);
      if (roleIds.length > 0) {
        const { data: roles } = await supabase.from("organization.roles").select("id, name").in("id", roleIds);
        rolesData = roles || [];
      }
      if (groupIds.length > 0) {
        const { data: groups } = await supabase.from("organization.groups").select(`
            id, 
            year, 
            degree_id, 
            branch, 
            site
          `).in("id", groupIds);
        groupsData = groups || [];
        const degreeIds = groupsData.map((g) => g.degree_id).filter(Boolean);
        if (degreeIds.length > 0) {
          const { data: degrees } = await supabase.from("organization.degrees").select("id, name, campus, city").in("id", degreeIds);
          groupsData = groupsData.map((group) => ({
            ...group,
            degree: degrees?.find((d) => d.id === group.degree_id) || null
          }));
        }
      }
    }
    const enrichedRoles = userRoles?.map((userRole) => {
      const role = rolesData.find((r) => r.id === userRole.role_id);
      const group = groupsData.find((g) => g.id === userRole.group_id);
      return {
        id: userRole.id,
        user_id: userRole.user_id,
        role_id: userRole.role_id,
        group_id: userRole.group_id,
        created_at: userRole.created_at,
        role: role || null,
        group: group || null
      };
    }) || [];
    return new Response(JSON.stringify({
      success: true,
      data: {
        roles: enrichedRoles
      }
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error en GET /api/users/roles:", error);
    return new Response(JSON.stringify({
      error: "Error interno del servidor",
      details: error instanceof Error ? error.message : "Error desconocido"
    }), {
      status: 500,
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
