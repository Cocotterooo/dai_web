import { defineMiddleware } from "astro:middleware";
import { supabase } from "../lib/supabase";
import micromatch from "micromatch";

const protectedRoutes = ["/dashboard(|/)", "/complete-profile(|/)"];
const redirectRoutes = ["/auth(|/)", "/signin(|/)", "/register(|/)"];

export const onRequest = defineMiddleware(
  async ({ locals, url, cookies, redirect }, next) => {
    console.log('🔄 Middleware ejecutándose para:', url.pathname);
    
    // Verificar rutas protegidas
    if (micromatch.isMatch(url.pathname, protectedRoutes)) {
      console.log('🔒 Ruta protegida:', url.pathname);
      
      const accessToken = cookies.get("sb-access-token");
      const refreshToken = cookies.get("sb-refresh-token");

      /*console.log('🍪 Estado de cookies:', {
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!refreshToken,
        accessTokenValue: accessToken ? 'OK' : 'Missing',
        refreshTokenValue: refreshToken ? 'OK' : 'Missing',
      });*/

      if (!accessToken || !refreshToken) {
        console.log('❌ No hay tokens de sesión, redirigiendo a auth');
        return redirect("/auth");
      }

      console.log('🔑 Verificando tokens de sesión...');
      const { data, error } = await supabase.auth.setSession({
        refresh_token: refreshToken.value,
        access_token: accessToken.value,
      });

      if (error) {
        console.error('❌ Error verificando sesión:', error);
        cookies.delete("sb-access-token", { path: "/" });
        cookies.delete("sb-refresh-token", { path: "/" });
        return redirect("/auth");
      }

      if (!data.session?.user) {
        console.log('❌ No hay usuario en la sesión');
        return redirect("/auth");
      }

      console.log('✅ Usuario autenticado:', data.session.user.email);
      console.log('👤 Metadatos del usuario:', {
        user_metadata: data.session.user.user_metadata,
        app_metadata: data.session.user.app_metadata,
        hasAvatar: !!data.session.user.user_metadata?.avatar_url,
        avatarUrl: data.session.user.user_metadata?.avatar_url,
        hasPhone: !!data.session.user.user_metadata?.phone,
        hasDni: !!data.session.user.user_metadata?.dni,
      });
      
      // Intentar obtener perfil extendido de user_profiles
      let userProfile = null;
      try {
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single();
        
        if (!profileError && profile) {
          userProfile = profile;
          console.log('📄 Perfil extendido encontrado:', {
            name: profile.full_name,
            phone: profile.phone,
            dni: profile.dni
          });
        }
      } catch (error) {
        console.log('ℹ️ Tabla user_profiles no existe o no se pudo acceder');
      }
      
      locals.email = data.session.user.email!;
      locals.user = data.session.user;
      locals.profile = userProfile;
      
      // Verificar si el perfil está completo para usuarios OAuth
      const isOAuthUser = data.session.user.app_metadata?.provider !== 'email';
      const hasRequiredData = data.session.user.user_metadata?.phone && data.session.user.user_metadata?.dni;
      
      // Solo redirigir a complete-profile en el primer login, no forzar siempre
      if (isOAuthUser && !hasRequiredData && url.pathname === '/dashboard' && !url.searchParams.has('skip_profile')) {
        console.log('⚠️ Usuario OAuth sin perfil completo, redirigiendo a completar perfil');
        return redirect("/complete-profile");
      }
      
      // Actualizar cookies con tokens frescos si es necesario
      if (data.session.access_token !== accessToken.value) {
        console.log('🔄 Actualizando tokens de sesión');
        cookies.set("sb-access-token", data.session.access_token, {
          sameSite: "strict",
          path: "/",
          secure: import.meta.env.PROD,
          httpOnly: true,
        });
      }
      
      if (data.session.refresh_token !== refreshToken.value) {
        cookies.set("sb-refresh-token", data.session.refresh_token, {
          sameSite: "strict",
          path: "/",
          secure: import.meta.env.PROD,
          httpOnly: true,
        });
      }
    }

    // Redirigir usuarios autenticados lejos de páginas de auth
    if (micromatch.isMatch(url.pathname, redirectRoutes)) {
      console.log('🔄 Página de auth detectada:', url.pathname);
      
      const accessToken = cookies.get("sb-access-token");
      const refreshToken = cookies.get("sb-refresh-token");

      if (accessToken && refreshToken) {
        console.log('🔑 Usuario ya tiene tokens, verificando...');
        
        const { data, error } = await supabase.auth.setSession({
          refresh_token: refreshToken.value,
          access_token: accessToken.value,
        });
        
        if (!error && data.session?.user) {
          console.log('✅ Usuario ya autenticado, redirigiendo al dashboard');
          return redirect("/dashboard");
        }
      }
    }

    return next();
  },
);
