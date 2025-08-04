import { createClient } from '@supabase/supabase-js';

// Configuración optimizada para API routes con PKCE flow
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string

// Validación para asegurar que las variables están definidas
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL:', supabaseUrl);
    console.error('Supabase Anon Key:', supabaseAnonKey ? '[PRESENTE]' : '[FALTANTE]');
    throw new Error('Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        flowType: "pkce",
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
    }
});
