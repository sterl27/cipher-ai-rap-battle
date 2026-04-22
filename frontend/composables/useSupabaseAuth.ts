import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js'

interface SignInWithOtpOptions {
  emailRedirectTo?: string
  shouldCreateUser?: boolean
}

export const useSupabaseAuth = () => {
  const { $supabase } = useNuxtApp()

  const session = useState<Session | null>('supabase-session', () => null)
  const user = useState<User | null>('supabase-user', () => null)
  const loading = useState<boolean>('supabase-loading', () => true)

  const setSessionState = (nextSession: Session | null) => {
    session.value = nextSession
    user.value = nextSession?.user ?? null
  }

  const init = async () => {
    if (!$supabase) {
      loading.value = false
      return
    }

    const { data, error } = await $supabase.auth.getSession()

    if (error) {
      console.error('[supabase-auth] Failed to load session', error)
      loading.value = false
      return
    }

    setSessionState(data.session)
    loading.value = false
  }

  const onAuthStateChange = (callback?: (event: AuthChangeEvent, nextSession: Session | null) => void) => {
    if (!$supabase) {
      return () => {}
    }

    const { data } = $supabase.auth.onAuthStateChange((event, nextSession) => {
      setSessionState(nextSession)
      callback?.(event, nextSession)
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }

  const signInWithOtp = async (email: string, options: SignInWithOtpOptions = {}) => {
    if (!$supabase) {
      throw new Error('Supabase client is not configured.')
    }

    return $supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: options.emailRedirectTo,
        shouldCreateUser: options.shouldCreateUser,
      },
    })
  }

  const verifyOtp = async (email: string, token: string) => {
    if (!$supabase) {
      throw new Error('Supabase client is not configured.')
    }

    return $supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    })
  }

  const signOut = async () => {
    if (!$supabase) {
      return
    }

    await $supabase.auth.signOut()
    setSessionState(null)
  }

  return {
    supabase: $supabase,
    session,
    user,
    loading,
    init,
    onAuthStateChange,
    signInWithOtp,
    verifyOtp,
    signOut,
  }
}
