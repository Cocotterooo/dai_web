import type { APIRoute } from "astro";
import { supabase, supabaseAdmin, createAuthenticatedSupabaseClient } from "@/lib/supabase";

// Funciones de validación de DNI/NIE
function calculateDNILetter(dni: number): string {
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    return letters[dni % 23];
}

function calculateNIELetter(firstChar: string, numbers: string): string {
    let nieNumber: string;
    switch(firstChar) {
        case 'X': nieNumber = '0' + numbers; break;
        case 'Y': nieNumber = '1' + numbers; break;
        case 'Z': nieNumber = '2' + numbers; break;
        default: return '';
    }
    
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    return letters[parseInt(nieNumber) % 23];
}

function isValidDNI(dni: string): boolean {
    const dniPattern = /^[0-9]{8}[A-Z]$/;
    if (!dniPattern.test(dni)) return false;
    
    const dniNumber = dni.slice(0, 8);
    const dniLetter = dni[8];
    const expectedLetter = calculateDNILetter(parseInt(dniNumber));
    
    return dniLetter === expectedLetter;
}

function isValidNIE(nie: string): boolean {
    const niePattern = /^[XYZ][0-9]{7}[A-Z]$/;
    if (!niePattern.test(nie)) return false;
    
    const firstChar = nie[0];
    const nieNumbers = nie.slice(1, 8);
    const nieLetter = nie[8];
    const expectedLetter = calculateNIELetter(firstChar, nieNumbers);
    
    return nieLetter === expectedLetter;
}

function validateDocument(document: string): boolean {
    if (!document || document.length !== 9) return false;
    
    const firstChar = document[0];
    const isNIE = ['X', 'Y', 'Z'].includes(firstChar);
    
    return isNIE ? isValidNIE(document) : isValidDNI(document);
}

// ⚡ Ruta para actualizar el DNI/NIE del usuario autenticado
export const POST: APIRoute = async ({ request, cookies }) => {
    try {
        const { dni } = await request.json();

        if (!dni) {
            return new Response(JSON.stringify({ error: "DNI/NIE es requerido" }), { status: 400 });
        }

        // Validar formato del documento
        const documentUpper = dni.toUpperCase().trim();
        if (!validateDocument(documentUpper)) {
            return new Response(JSON.stringify({ error: "Formato de DNI/NIE inválido" }), { status: 400 });
        }

        // 🔑 Obtener token de acceso desde las cookies
        const accessToken = cookies.get("sb-access-token")?.value;
        const refreshToken = cookies.get("sb-refresh-token")?.value;
        
        if (!accessToken || !refreshToken) {
            return new Response(JSON.stringify({ error: "No autorizado - sesión no encontrada" }), { status: 401 });
        }

        const { data: { user }, error: userError } = await supabase.auth.getUser(accessToken);
        if (userError || !user) {
            console.error("❌ Error obteniendo usuario:", userError);
            return new Response(JSON.stringify({ error: "Usuario no válido" }), { status: 401 });
        }

        console.log("🟢 Usuario autenticado:", user.id);

        // 1️⃣ Actualizar tabla public.users usando cliente con sesión del usuario
        const authenticatedClient = createAuthenticatedSupabaseClient(accessToken, refreshToken);
        
        const { error: updateUsersError } = await authenticatedClient
            .from("users")
            .update({ dni: documentUpper })
            .eq("id", user.id);

        if (updateUsersError) {
            console.error("❌ Error actualizando public.users:", updateUsersError);
            
            // Manejar error de DNI/NIE duplicado
            if (updateUsersError.code === '23505' && updateUsersError.message.includes('users_dni_key')) {
                return new Response(JSON.stringify({ 
                    error: "Este DNI/NIE ya está registrado por otro usuario" 
                }), { 
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            
            return new Response(JSON.stringify({ error: "Error actualizando perfil en base de datos" }), { status: 500 });
        }

        console.log("✅ DNI/NIE actualizado correctamente en tabla users");
        
        return new Response(JSON.stringify({ 
            success: true, 
            dni: documentUpper,
            message: "DNI/NIE actualizado correctamente" 
        }), { status: 200 });

    } catch (err) {
        console.error("❌ Error inesperado:", err);
        return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
    }
};
