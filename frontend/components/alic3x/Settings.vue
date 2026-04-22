<template>
  <div class="p-6 h-full overflow-y-auto">
    <h2 class="font-display font-bold text-xl text-white mb-6">Settings</h2>

    <!-- Web Search Configuration -->
    <div class="glass-panel p-6 mb-6">
      <h3 class="font-display font-bold text-sm text-mx-cyan mb-1">Web Search (Server Config)</h3>
      <p class="text-xs text-mx-muted mb-4">
        Google Programmable Search now runs through a secure server route. No API keys are stored in your browser.
      </p>

      <div class="rounded-xl border border-mx-border bg-mx-surface/50 p-4 text-xs font-mono text-mx-muted space-y-1 mb-4">
        <p>GOOGLE_SEARCH_API_KEY=...</p>
        <p>GOOGLE_SEARCH_CX=...</p>
      </div>

      <div class="flex flex-wrap gap-3 items-center">
        <button
          :class="[
            'px-4 py-2 text-xs rounded-lg font-bold transition-all border',
            testStatus === 'ok'      ? 'border-mx-green/40 text-mx-green' :
            testStatus === 'error'   ? 'border-mx-magenta/40 text-mx-magenta' :
            testStatus === 'testing' ? 'border-mx-border text-mx-muted' :
                                       'border-mx-cyan/40 text-mx-cyan hover:bg-mx-cyan/10',
          ]"
          :disabled="testStatus === 'testing'"
          @click="testGoogle"
        >
          {{
            testStatus === 'testing' ? '...' :
            testStatus === 'ok'      ? '✓ Connected' :
            testStatus === 'error'   ? '✗ Failed' :
                                       'Test Connection'
          }}
        </button>
      </div>

      <!-- Setup guide -->
      <details class="mt-4">
        <summary class="text-xs text-mx-muted cursor-pointer hover:text-white transition-colors select-none">
          ▸ How to get your Google API credentials
        </summary>
        <div class="mt-3 space-y-2 text-xs text-mx-muted leading-relaxed pl-3 border-l border-mx-border">
          <p>1. Go to <strong class="text-white">Google Cloud Console</strong> → APIs &amp; Services → Credentials. Create an API key.</p>
          <p>2. Enable the <strong class="text-white">Custom Search API</strong> in the API Library.</p>
          <p>3. Go to <strong class="text-white">Programmable Search Engine</strong>, create an engine set to search the entire web.</p>
          <p>4. Copy the <strong class="text-white">Search Engine ID (cx)</strong> from the Basics section and add both values to server env vars.</p>
          <p class="text-mx-gold">Free tier: 100 queries/day · Paid: $5 per 1,000 queries</p>
        </div>
      </details>
    </div>

    <!-- Voice Settings -->
    <div class="glass-panel p-6 mb-6">
      <h3 class="font-display font-bold text-sm text-mx-purple mb-1">Voice Settings</h3>
      <p class="text-xs text-mx-muted mb-4">Control voice input and text-to-speech. Uses the Web Speech API (browser-native, no account required).</p>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-white">Voice Input &amp; TTS</p>
          <p class="text-xs text-mx-muted">Enable microphone and auto-read buttons in Chat</p>
        </div>
        <button
          :class="['w-10 h-6 rounded-full transition-colors relative shrink-0', voiceEnabled ? 'bg-mx-purple' : 'bg-mx-border']"
          @click="voiceEnabled = !voiceEnabled; saveVoice()"
        >
          <span
            :class="['absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform', voiceEnabled ? 'translate-x-5' : 'translate-x-1']"
          />
        </button>
      </div>
    </div>

    <!-- Data Management -->
    <div class="glass-panel p-6">
      <h3 class="font-display font-bold text-sm text-mx-magenta mb-1">Data Management</h3>
      <p class="text-xs text-mx-muted mb-4">Workspace data is stored locally in your browser's localStorage. (Web searches are sent through your configured server API route.)</p>
      <div class="space-y-2 text-xs text-mx-muted mb-4">
        <div class="flex justify-between py-1 border-b border-mx-border/30">
          <span>Tasks stored</span>
          <span class="text-white font-mono">{{ counts.tasks }}</span>
        </div>
        <div class="flex justify-between py-1 border-b border-mx-border/30">
          <span>KB documents</span>
          <span class="text-white font-mono">{{ counts.kb }}</span>
        </div>
        <div class="flex justify-between py-1">
          <span>Search history entries</span>
          <span class="text-white font-mono">{{ counts.history }}</span>
        </div>
      </div>
      <button
        class="px-4 py-2 text-xs rounded-lg font-bold border border-mx-magenta/40 text-mx-magenta hover:bg-mx-magenta/10 transition-all"
        @click="confirmClear"
      >
        Clear All Local Data
      </button>
      <p v-if="clearMsg" class="text-xs mt-2" :class="clearMsg.ok ? 'text-mx-green' : 'text-mx-magenta'">
        {{ clearMsg.text }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
type TestStatus = 'idle' | 'testing' | 'ok' | 'error'

const voiceEnabled = ref(true)
const testStatus   = ref<TestStatus>('idle')
const counts       = ref({ tasks: 0, kb: 0, history: 0 })
const clearMsg     = ref<{ text: string; ok: boolean } | null>(null)

function load() {
  if (typeof localStorage === 'undefined') return
  voiceEnabled.value = localStorage.getItem('alic3x_voice_enabled') !== 'false'
  refreshCounts()
}

function refreshCounts() {
  if (typeof localStorage === 'undefined') return
  try {
    counts.value = {
      tasks:   JSON.parse(localStorage.getItem('alic3x_tasks')          || '[]').length,
      kb:      JSON.parse(localStorage.getItem('alic3x_kb')             || '[]').length,
      history: JSON.parse(localStorage.getItem('alic3x_search_history') || '[]').length,
    }
  } catch { /* empty */ }
}

function saveVoice() {
  if (typeof localStorage !== 'undefined')
    localStorage.setItem('alic3x_voice_enabled', String(voiceEnabled.value))
}

async function testGoogle() {
  testStatus.value = 'testing'
  try {
    await $fetch('/api/google/search', {
      method: 'POST',
      body: { query: 'test', start: 1 },
    })
    testStatus.value = 'ok'
  } catch {
    testStatus.value = 'error'
  }
  setTimeout(() => { testStatus.value = 'idle' }, 4000)
}

function confirmClear() {
  if (!confirm('This will delete all tasks, KB documents, search history, analytics data, and API keys stored locally. Continue?')) return
  const keys = [
    'alic3x_tasks', 'alic3x_kb', 'alic3x_search_history',
    'alic3x_analytics', 'alic3x_voice_enabled',
    // Legacy local API-key settings from older versions
    'alic3x_google_api_key', 'alic3x_google_cx',
  ]
  keys.forEach(k => localStorage.removeItem(k))
  load()
  clearMsg.value = { text: 'All local data cleared.', ok: true }
  setTimeout(() => { clearMsg.value = null }, 3000)
}

onMounted(load)
</script>

<style scoped>
.glass-panel {
  @apply rounded-2xl border border-mx-border;
  background: rgba(255,255,255,0.04);
}
.settings-input {
  @apply px-3 py-2.5 rounded-xl text-sm text-mx-muted bg-mx-surface border border-mx-border
    outline-none focus:border-mx-cyan/40 transition-colors;
}
</style>
