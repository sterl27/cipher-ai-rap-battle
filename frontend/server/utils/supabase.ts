import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export const createSupabaseServerClient = (): SupabaseClient => {
  const config = useRuntimeConfig()

  const supabaseUrl = config.public.supabaseUrl
  const serviceRoleKey = config.supabaseServiceRoleKey

  if (!supabaseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing NUXT_PUBLIC_SUPABASE_URL runtime configuration.',
    })
  }

  if (!serviceRoleKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing SUPABASE_SERVICE_ROLE_KEY runtime configuration.',
    })
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
