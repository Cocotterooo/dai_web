import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://dyexolosxkftwblwotig.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5ZXhvbG9zeGtmdHdibHdvdGlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxOTU2MjEsImV4cCI6MjA2ODc3MTYyMX0.rFq80MtpXMNrS1e0KA1CluPGtpZ3EOeQM8QPWCTEelA";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5ZXhvbG9zeGtmdHdibHdvdGlnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzE5NTYyMSwiZXhwIjoyMDY4NzcxNjIxfQ.I8xTwvP1__UlQGAXirq09hQUYYyBcIEMxivqR8t8mHU";
{
  console.log("✅ Supabase configuration loaded");
  console.log("  - URL:", supabaseUrl);
  console.log("  - Anon Key:", "[PRESENT]" );
  console.log("  - Service Key:", "[PRESENT]" );
}
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: "pkce",
    autoRefreshToken: false,
    detectSessionInUrl: false,
    persistSession: false
  }
});
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
}) ;
if (supabaseAdmin) {
  console.log("✅ Cliente administrativo Supabase inicializado correctamente");
} else {
  console.warn("⚠️ Cliente administrativo Supabase no disponible - Service Role Key no configurada");
}

export { supabase as s };
