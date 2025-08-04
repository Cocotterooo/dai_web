import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, redirect }) => {
    console.log('🚪 === API AUTH SIGNOUT ===');
    
    // Eliminar cookies de sesión
    cookies.delete("sb-access-token", { path: "/" });
    cookies.delete("sb-refresh-token", { path: "/" });
    
    console.log('🍪 Cookies de sesión eliminadas');
    console.log('🔄 Redirigiendo a auth');
    
    return redirect("/auth");
};
