import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const supabaseUrl = config.public.supabaseUrl
  const supabaseAnonKey = config.public.supabaseAnonKey

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[supabase] Missing NUXT_PUBLIC_SUPABASE_URL or NUXT_PUBLIC_SUPABASE_ANON_KEY')

    return {
      provide: {
        supabase: null as SupabaseClient | null,
      },
    }
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })

  return {
    provide: {
      supabase,
    },
  }
})

declare module '#app' {
  interface NuxtApp {
    $supabase: SupabaseClient | null
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $supabase: SupabaseClient | null
  }
}
