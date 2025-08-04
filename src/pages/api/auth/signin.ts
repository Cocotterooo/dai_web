import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import type { Provider } from "@supabase/supabase-js";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const provider = formData.get("provider")?.toString();

    console.log('🚀 === API AUTH SIGNIN ===');
    console.log('Provider:', provider);
    console.log('Has email:', !!email);
    console.log('Has password:', !!password);

    // Manejar OAuth providers (Google)
    if (provider) {
        console.log('📡 Iniciando OAuth con provider:', provider);
        
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider as Provider,
            options: {
                redirectTo: import.meta.env.DEV
                    ? "http://localhost:4321/api/auth/callback"
                    : `${import.meta.env.AUTH_URL || 'http://localhost:4321'}/api/auth/callback`,
            },
        });

        if (error) {
            console.error('❌ Error OAuth:', error);
            return new Response(error.message, { status: 500 });
        }

        console.log('✅ OAuth URL generada:', data.url);
        return redirect(data.url);
    }

    // Autenticación con email/contraseña usando Supabase
    if (!email || !password) {
        return new Response("Email y contraseña son requeridos", { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error('❌ Error login email/password:', error);
        return new Response(error.message, { status: 500 });
    }

    if (!data.session) {
        return new Response("No se pudo crear la sesión", { status: 500 });
    }

    const { access_token, refresh_token } = data.session;
    
    // Configurar cookies de sesión
    cookies.set("sb-access-token", access_token, {
        sameSite: "strict",
        path: "/",
        secure: import.meta.env.PROD,
        httpOnly: true,
    });
    
    cookies.set("sb-refresh-token", refresh_token, {
        sameSite: "strict",
        path: "/",
        secure: import.meta.env.PROD,
        httpOnly: true,
    });

    console.log('✅ Login exitoso con email/password');
    return redirect("/dashboard");
};