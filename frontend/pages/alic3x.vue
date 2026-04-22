<template>
  <div class="px-4 py-8 md:px-6 md:py-10 max-w-7xl mx-auto">
    <div class="mb-8 md:mb-10">
      <HoloBadge color="purple" dot class="mb-3">Supabase Auth + Gemini</HoloBadge>
      <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 class="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white mb-3">
            Alic3X PRO <span class="holo-text">Dashboard</span>
          </h1>
          <p class="text-sm md:text-base text-mx-muted max-w-2xl leading-relaxed">
            A dark, modular AI workspace with voice chat, task management, web search,
            analytics, and a local knowledge base — now gated behind Supabase authentication.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:min-w-[420px]">
          <div class="hero-stat">
            <p class="hero-stat-label">Voice</p>
            <p class="hero-stat-value text-mx-cyan">Web Speech</p>
          </div>
          <div class="hero-stat">
            <p class="hero-stat-label">Auth</p>
            <p class="hero-stat-value text-mx-purple">Supabase</p>
          </div>
          <div class="hero-stat">
            <p class="hero-stat-label">Search</p>
            <p class="hero-stat-value text-mx-green">Google API</p>
          </div>
          <div class="hero-stat">
            <p class="hero-stat-label">Mode</p>
            <p class="hero-stat-value text-mx-gold">Realtime</p>
          </div>
        </div>
      </div>
    </div>

    <GlassCard
      v-if="!supabaseConfigured"
      accent="magenta"
      class="max-w-3xl mx-auto"
    >
      <p class="section-label mb-3">Configuration Needed</p>
      <h2 class="font-display font-bold text-2xl text-white mb-3">
        Add your <span class="holo-text">Supabase keys</span>
      </h2>
      <p class="text-mx-muted text-sm leading-relaxed mb-5">
        This page is wired for Supabase email auth, but the browser client is currently disabled
        because `NUXT_PUBLIC_SUPABASE_URL` and/or `NUXT_PUBLIC_SUPABASE_ANON_KEY` are missing.
      </p>

      <div class="rounded-2xl border border-mx-border bg-mx-surface/60 p-4 font-mono text-xs text-mx-muted mb-5 overflow-x-auto">
        <p>NUXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co</p>
        <p>NUXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxx</p>
        <p>SUPABASE_SERVICE_ROLE_KEY=sb_secret_xxx</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-mx-muted">
        <div class="rounded-xl border border-mx-border p-4 bg-white/5">
          <p class="font-display font-bold text-white mb-2">For local auth redirects</p>
          <p>Add this to Supabase Auth → URL Configuration:</p>
          <p class="text-mx-cyan mt-2 break-all">http://localhost:3002/**</p>
        </div>
        <div class="rounded-xl border border-mx-border p-4 bg-white/5">
          <p class="font-display font-bold text-white mb-2">For production</p>
          <p>Use your Vercel URL as Site URL and allow:</p>
          <p class="text-mx-cyan mt-2 break-all">https://cipher-ai-rap-battle.vercel.app/**</p>
        </div>
      </div>
    </GlassCard>

    <GlassCard v-else-if="loading" accent="purple" class="max-w-xl mx-auto text-center py-14">
      <div class="inline-flex items-center gap-3 text-mx-purple">
        <span class="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin inline-block" />
        <span class="font-display font-bold text-lg">Checking session…</span>
      </div>
    </GlassCard>

    <GlassCard v-else-if="!user" accent="purple" class="max-w-xl mx-auto">
      <p class="section-label mb-3">Secure Access</p>
      <h2 class="font-display font-bold text-2xl md:text-3xl text-white mb-3">
        Sign in to <span class="holo-text">Alic3X PRO</span>
      </h2>
      <p class="text-sm text-mx-muted leading-relaxed mb-6">
        Enter your email and we’ll send a magic link using Supabase Auth.
        If your Supabase email template is configured for OTP instead, you can use the code below too.
      </p>

      <div class="space-y-4">
        <div>
          <label class="auth-label">Email Address</label>
          <input
            v-model="authEmail"
            type="email"
            class="auth-input w-full"
            autocomplete="email"
            placeholder="you@studio.com"
            @keydown.enter.prevent="sendMagicLink"
          />
        </div>

        <div class="flex flex-wrap gap-3">
          <button
            class="btn-primary"
            :disabled="authBusy || !authEmail.trim()"
            @click="sendMagicLink"
          >
            <span v-if="!authBusy">Send Sign-In Link</span>
            <span v-else class="inline-flex items-center gap-2">
              <span class="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin inline-block" />
              Sending...
            </span>
          </button>
        </div>

        <div class="rounded-xl border border-mx-border bg-white/5 p-4">
          <p class="auth-label mb-2">Optional OTP Verification</p>
          <div class="flex flex-col md:flex-row gap-3">
            <input
              v-model="otpCode"
              type="text"
              inputmode="numeric"
              maxlength="6"
              class="auth-input flex-1"
              placeholder="123456"
              @keydown.enter.prevent="verifyEmailOtp"
            />
            <button
              class="btn-holo whitespace-nowrap"
              :disabled="authBusy || !authEmail.trim() || otpCode.trim().length < 6"
              @click="verifyEmailOtp"
            >
              Verify OTP
            </button>
          </div>
          <p class="text-xs text-mx-muted mt-2">
            Use this only if your Supabase email template sends a 6-digit code instead of a magic link.
          </p>
        </div>

        <p v-if="authNotice" class="text-sm text-mx-green">{{ authNotice }}</p>
        <p v-if="authError" class="text-sm text-mx-magenta">{{ authError }}</p>
      </div>

      <div class="mt-6 pt-6 border-t border-mx-border text-xs text-mx-muted space-y-2">
        <p>
          <span class="text-white font-medium">Redirect URL:</span>
          <span class="break-all ml-1">{{ authRedirectUrl }}</span>
        </p>
        <p>
          Make sure this URL is allowed in Supabase Auth settings, or the login email will bounce like a bad snare.
        </p>
      </div>
    </GlassCard>

    <div v-else class="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-6 min-h-[780px]">
      <Sidebar v-model="activeView" />

      <div class="space-y-4">
        <div class="md:hidden flex gap-2 overflow-x-auto pb-2">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="[
              'px-3 py-2 rounded-xl border text-xs whitespace-nowrap transition-all',
              activeView === tab.id
                ? 'border-mx-purple/40 bg-mx-purple/20 text-mx-purple'
                : 'border-mx-border text-mx-muted',
            ]"
            @click="activeView = tab.id"
          >
            {{ tab.icon }} {{ tab.label }}
          </button>
        </div>

        <GlassCard accent="purple" class="p-0 overflow-hidden min-h-[720px]">
          <div class="flex flex-col gap-4 border-b border-mx-border px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p class="text-xs text-mx-muted uppercase tracking-[0.2em] font-mono">Authenticated session</p>
              <h2 class="font-display font-bold text-xl text-white mt-1">Welcome back, {{ user.email }}</h2>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <span class="px-3 py-1 text-xs rounded-full border border-mx-green/30 bg-mx-green/10 text-mx-green">
                Session Active
              </span>
              <button class="btn-holo text-xs" @click="handleSignOut">Sign Out</button>
            </div>
          </div>

          <component :is="activeComponent" @goto-settings="activeView = 'settings'" />
        </GlassCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import Analytics from '~/components/alic3x/Analytics.vue'
import ChatInterface from '~/components/alic3x/ChatInterface.vue'
import KnowledgeBase from '~/components/alic3x/KnowledgeBase.vue'
import Settings from '~/components/alic3x/Settings.vue'
import Sidebar from '~/components/alic3x/Sidebar.vue'
import TaskManager from '~/components/alic3x/TaskManager.vue'
import WebSearch from '~/components/alic3x/WebSearch.vue'

useSeoMeta({
  title: 'Alic3X PRO Dashboard — Supabase Auth + AI Workspace | Musaix Pro',
  description: 'Authenticated AI workspace for music production with Supabase auth, voice chat, task management, analytics, and web search.',
})

type ViewId = 'chat' | 'tasks' | 'search' | 'analytics' | 'kb' | 'settings'

const {
  supabase,
  user,
  loading,
  init,
  onAuthStateChange,
  signInWithOtp,
  verifyOtp,
  signOut,
} = useSupabaseAuth()

const activeView = ref<ViewId>('chat')
const authEmail = ref('')
const otpCode = ref('')
const authBusy = ref(false)
const authNotice = ref('')
const authError = ref('')

const tabs = [
  { id: 'chat' as ViewId, icon: '💬', label: 'Chat' },
  { id: 'tasks' as ViewId, icon: '✅', label: 'Tasks' },
  { id: 'search' as ViewId, icon: '🔍', label: 'Search' },
  { id: 'analytics' as ViewId, icon: '📊', label: 'Analytics' },
  { id: 'kb' as ViewId, icon: '🗄️', label: 'Knowledge' },
  { id: 'settings' as ViewId, icon: '⚙️', label: 'Settings' },
]

const supabaseConfigured = computed(() => Boolean(supabase))

const activeComponent = computed(() => {
  switch (activeView.value) {
    case 'tasks':
      return TaskManager
    case 'search':
      return WebSearch
    case 'analytics':
      return Analytics
    case 'kb':
      return KnowledgeBase
    case 'settings':
      return Settings
    case 'chat':
    default:
      return ChatInterface
  }
})

const authRedirectUrl = computed(() => {
  if (import.meta.client) {
    return `${window.location.origin}/alic3x`
  }

  return 'http://localhost:3000/alic3x'
})

let unsubscribeAuth: (() => void) | null = null

function setAuthMessage(message: string, type: 'notice' | 'error') {
  if (type === 'notice') {
    authNotice.value = message
    authError.value = ''
    return
  }

  authError.value = message
  authNotice.value = ''
}

async function sendMagicLink() {
  const email = authEmail.value.trim()
  if (!email || authBusy.value) return

  authBusy.value = true
  setAuthMessage('', 'notice')

  try {
    const { error } = await signInWithOtp(email, {
      emailRedirectTo: authRedirectUrl.value,
      shouldCreateUser: true,
    })

    if (error) throw error

    setAuthMessage(`Magic link sent to ${email}. Check your inbox — and maybe the spam folder’s underground mixtape.`, 'notice')
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unable to send sign-in link.'
    setAuthMessage(message, 'error')
  } finally {
    authBusy.value = false
  }
}

async function verifyEmailOtp() {
  const email = authEmail.value.trim()
  const token = otpCode.value.trim()
  if (!email || token.length < 6 || authBusy.value) return

  authBusy.value = true
  setAuthMessage('', 'notice')

  try {
    const { error } = await verifyOtp(email, token)
    if (error) throw error

    otpCode.value = ''
    setAuthMessage('OTP verified. You are now signed in.', 'notice')
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unable to verify OTP.'
    setAuthMessage(message, 'error')
  } finally {
    authBusy.value = false
  }
}

async function handleSignOut() {
  await signOut()
  setAuthMessage('Signed out successfully.', 'notice')
  activeView.value = 'chat'
}

function handleAuthStateChange(_event: AuthChangeEvent, nextSession: Session | null) {
  if (nextSession?.user) {
    setAuthMessage(`Signed in as ${nextSession.user.email ?? 'your account'}.`, 'notice')
    return
  }

  if (!nextSession) {
    activeView.value = 'chat'
  }
}

function readAuthErrorFromUrl() {
  if (!import.meta.client || !window.location.hash) return

  const params = new URLSearchParams(window.location.hash.slice(1))
  const description = params.get('error_description')

  if (description) {
    setAuthMessage(description, 'error')
  }
}

onMounted(async () => {
  await init()
  unsubscribeAuth = onAuthStateChange(handleAuthStateChange)
  readAuthErrorFromUrl()
})

onUnmounted(() => {
  unsubscribeAuth?.()
})
</script>

<style scoped>
.hero-stat {
  @apply rounded-2xl border border-mx-border bg-white/5 px-4 py-3;
}

.hero-stat-label {
  @apply text-[10px] uppercase tracking-[0.2em] font-mono text-mx-muted mb-1;
}

.hero-stat-value {
  @apply text-sm font-display font-bold;
}

.auth-label {
  @apply block text-xs text-mx-muted mb-1.5 font-mono uppercase tracking-[0.18em];
}

.auth-input {
  @apply px-4 py-3 rounded-xl text-sm text-mx-text bg-mx-surface border border-mx-border
    outline-none focus:border-mx-purple/40 transition-colors;
}
</style>
