import { createClient } from '@supabase/supabase-js';

// Configuración optimizada para API routes con PKCE flow
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string

// Validación para asegurar que las variables están definidas
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Configuración de Supabase incompleta:');
    console.error('  - Supabase URL:', supabaseUrl || '[FALTANTE]');
    console.error('  - Supabase Anon Key:', supabaseAnonKey ? '[PRESENTE]' : '[FALTANTE]');
    
    if (import.meta.env.PROD) {
        console.error('🚨 En producción, esto causará errores. Configura las variables de entorno en Vercel.');
    }
    
    // En desarrollo, mostrar mensaje más detallado
    if (import.meta.env.DEV) {
        console.log('💡 Para configurar Supabase:');
        console.log('   1. Copia .env.example a .env');
        console.log('   2. Añade tus credenciales de Supabase');
        console.log('   3. Reinicia el servidor de desarrollo');
    }
    
    throw new Error(`Missing Supabase environment variables. 
    Required: PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY
    Environment: ${import.meta.env.MODE}
    Check your ${import.meta.env.PROD ? 'Vercel dashboard' : '.env file'}.`);
}

console.log('✅ Supabase configurado correctamente');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        flowType: "pkce",
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
    }
});
