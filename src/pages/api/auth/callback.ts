import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
    console.log('🔄 === API AUTH CALLBACK ===');
    console.log('URL completa:', url.toString());
    
    const authCode = url.searchParams.get("code");
    const error = url.searchParams.get("error");
    const errorDescription = url.searchParams.get("error_description");

    console.log('📋 Parámetros recibidos:', {
        hasCode: !!authCode,
        error,
        errorDescription,
    });

    if (error) {
        console.error('❌ Error OAuth recibido:', error, errorDescription);
        return redirect(`/auth?error=${error}&message=${encodeURIComponent(errorDescription || error)}`);
    }

    if (!authCode) {
        console.error('❌ No se recibió código de autorización');
        return redirect("/auth?error=no_code");
    }

    console.log('🔑 Intercambiando código por sesión...');
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(authCode);

    if (exchangeError) {
        console.error("❌ Error intercambiando código por sesión:", exchangeError);
        return redirect("/auth?error=callback_error");
    }

    if (!data.session) {
        console.error("❌ No se obtuvo sesión después del intercambio");
        return redirect("/auth?error=no_session");
    }

    console.log('✅ Sesión obtenida exitosamente:', {
        userId: data.session.user.id,
        email: data.session.user.email,
        provider: data.session.user.app_metadata?.provider,
    });

    const { access_token, refresh_token } = data.session;

    // Configurar cookies de sesión
    cookies.set("sb-access-token", access_token, {
        sameSite: "strict",
        path: "/",
        secure: import.meta.env.PROD,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 7 días
    });
    
    cookies.set("sb-refresh-token", refresh_token, {
        sameSite: "strict",
        path: "/",
        secure: import.meta.env.PROD,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30, // 30 días
    });

    console.log('🍪 Cookies de sesión configuradas');
    
    // Verificar si el usuario necesita completar su perfil
    const isOAuthUser = data.session.user.app_metadata?.provider !== 'email';
    const hasRequiredData = data.session.user.user_metadata?.phone && data.session.user.user_metadata?.dni;
    
    let redirectUrl = '/dashboard';
    if (isOAuthUser && !hasRequiredData) {
        redirectUrl = '/complete-profile';
        console.log('🎯 Usuario OAuth sin perfil completo, redirigiendo a completar perfil');
    } else {
        console.log('🎯 Redirigiendo al dashboard');
    }
    
    // Usar redirección HTML con JavaScript para asegurar que las cookies se establezcan
    return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Autenticación exitosa</title>
        </head>
        <body>
            <script>
                console.log('🔄 Redirigiendo desde callback...');
                window.location.href = '${redirectUrl}';
            </script>
            <p>Autenticación exitosa. Redirigiendo...</p>
        </body>
        </html>
    `, {
        status: 200,
        headers: {
            'Content-Type': 'text/html',
        },
    });
};