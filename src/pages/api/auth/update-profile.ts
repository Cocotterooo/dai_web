import type { APIRoute } from 'astro'
import { supabase } from '@/lib/supabase'

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 })
    }

    const userId = user.id

    // --- Actualizar datos personales en metadata + public.users ---
    const updates: Record<string, any> = {}
    if (body.full_name !== undefined) updates.full_name = body.full_name
    if (body.dni !== undefined) updates.dni = body.dni
    if (body.phone !== undefined) updates.phone = body.phone
    if (body.email !== undefined) updates.email = body.email

    if (Object.keys(updates).length > 0) {
      // 1. auth.users (metadata)
      const { error: authError } = await supabase.auth.updateUser({
        data: updates,
        email: body.email ?? undefined // si quieres permitir actualizar email real
      })
      if (authError) throw authError

      // 2. public.users
      const { error: userTableError } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)

      if (userTableError) throw userTableError
    }

    // --- Actualizar redes sociales SOLO en public.users ---
    const socialUpdates: Record<string, any> = {}
    if (body.instagram !== undefined) socialUpdates.instagram = body.instagram
    if (body.linkedin !== undefined) socialUpdates.linkedin = body.linkedin
    if (body.tiktok !== undefined) socialUpdates.tiktok = body.tiktok
    if (body.x !== undefined) socialUpdates.x = body.x

    if (Object.keys(socialUpdates).length > 0) {
      const { error: socialError } = await supabase
        .from('users')
        .update(socialUpdates)
        .eq('id', userId)

      if (socialError) throw socialError
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err: any) {
    console.error('Update profile error:', err)
    return new Response(JSON.stringify({ error: err.message || 'Error al actualizar perfil' }), {
      status: 500,
    })
  }
}
