<template>
  <div class="px-6 py-16 max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-10">
      <NuxtLink to="/tools" class="flex items-center gap-2 text-mx-muted text-sm mb-6 hover:text-mx-cyan transition-colors">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        Back to Tools
      </NuxtLink>
      <div class="flex items-start justify-between flex-wrap gap-4">
        <div>
          <HoloBadge color="purple" dot class="mb-3">Lyrical Lab</HoloBadge>
          <h1 class="font-display font-black text-4xl sm:text-5xl text-white">
            AI Lyrical <span class="holo-text">Engineering</span>
          </h1>
        </div>
        <div class="flex gap-2 flex-wrap">
          <HoloBadge color="cyan"   size="sm">Rhyme Analysis</HoloBadge>
          <HoloBadge color="purple" size="sm">Flow Engine</HoloBadge>
          <HoloBadge color="gold"   size="sm">Co-Writer</HoloBadge>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Editor -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Input panel -->
        <GlassCard accent="purple" padding="">
          <div class="p-4 border-b border-mx-border flex items-center justify-between">
            <div class="flex gap-2">
              <button
                v-for="mode in modes"
                :key="mode"
                class="mode-btn"
                :class="activeMode === mode ? 'mode-btn-active' : ''"
                @click="activeMode = mode"
              >{{ mode }}</button>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-mx-muted text-xs font-mono">{{ wordCount }} words</span>
            </div>
          </div>
          <textarea
            v-model="userLyrics"
            class="lyric-textarea"
            :placeholder="placeholders[activeMode]"
            rows="8"
            @input="analyzeInput"
          />
          <div class="p-4 border-t border-mx-border flex items-center justify-between flex-wrap gap-3">
            <div class="flex gap-2">
              <select v-model="genre" class="select-input text-xs">
                <option>Hip-Hop</option>
                <option>R&B</option>
                <option>Trap</option>
                <option>Soul</option>
                <option>Pop</option>
              </select>
              <select v-model="rhymeScheme" class="select-input text-xs">
                <option>AABB</option>
                <option>ABAB</option>
                <option>ABCB</option>
                <option>Free</option>
              </select>
            </div>
            <button class="btn-primary text-xs px-5 py-2" @click="generate" :disabled="isGenerating">
              <span v-if="!isGenerating">Generate ✨</span>
              <span v-else class="flex items-center gap-2">
                <span class="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                Generating...
              </span>
            </button>
          </div>
        </GlassCard>

        <!-- AI Output -->
        <GlassCard v-if="aiOutput" accent="purple">
          <div class="flex items-center justify-between mb-4">
            <p class="section-label">Alic3X Suggestion</p>
            <div class="flex gap-2">
              <button class="icon-btn" title="Copy" @click="copyOutput">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="ai-verse-output">
            <p v-for="(line, idx) in outputLines" :key="idx" class="mb-2 leading-relaxed">{{ line }}</p>
          </div>
        </GlassCard>
      </div>

      <!-- Right Panel -->
      <div class="space-y-4">
        <!-- Analysis -->
        <GlassCard accent="cyan">
          <p class="section-label mb-4">Live Analysis</p>
          <div class="space-y-4">
            <div v-for="metric in analysis" :key="metric.label">
              <div class="flex justify-between mb-1.5">
                <span class="text-xs text-mx-muted">{{ metric.label }}</span>
                <span class="text-xs font-mono" :style="{ color: metric.color }">{{ metric.score }}/100</span>
              </div>
              <div class="h-1.5 rounded-full bg-mx-surface overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-500"
                  :style="{ width: metric.score + '%', background: metric.color }"
                />
              </div>
            </div>
          </div>
        </GlassCard>

        <!-- Rhyme Finder -->
        <GlassCard>
          <p class="section-label mb-3">Rhyme Finder</p>
          <input
            v-model="rhymeWord"
            class="select-input w-full text-sm mb-3"
            placeholder="Enter a word..."
            @input="findRhymes"
          />
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="rhyme in rhymeSuggestions"
              :key="rhyme"
              class="rhyme-pill"
              @click="insertRhyme(rhyme)"
            >{{ rhyme }}</button>
          </div>
        </GlassCard>

        <!-- Patterns -->
        <GlassCard>
          <p class="section-label mb-3">Flow Patterns</p>
          <div class="space-y-2">
            <button
              v-for="pattern in flowPatterns"
              :key="pattern.name"
              class="pattern-btn w-full"
              @click="activePattern = pattern.name"
              :class="activePattern === pattern.name ? 'pattern-active' : ''"
            >
              <div class="flex items-center justify-between">
                <span class="font-display font-bold text-xs text-white">{{ pattern.name }}</span>
                <span class="text-xs text-mx-muted font-mono">{{ pattern.bpm }}</span>
              </div>
              <div class="flex gap-0.5 mt-1.5">
                <div
                  v-for="(beat, i) in pattern.grid"
                  :key="i"
                  class="h-2 flex-1 rounded-sm"
                  :class="beat ? 'bg-mx-purple' : 'bg-mx-surface'"
                />
              </div>
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Lyrical Lab — AI Lyrical Engineering | Musaix Pro',
  description: 'AI-powered lyrical engineering tool. Generate rhyme schemes, analyze flow, and co-write verses.',
})

const activeMode = ref('Write')
const modes = ['Write', 'Analyze', 'Generate', 'Freestyle']
const userLyrics = ref('')
const genre = ref('Hip-Hop')
const rhymeScheme = ref('AABB')
const isGenerating = ref(false)
const aiOutput = ref('')
const rhymeWord = ref('')
const activePattern = ref('Straight')

const placeholders: Record<string, string> = {
  Write:    'Start writing your verse here...\n\nType freely and Alic3X will analyze your rhyme scheme, flow, and syllable patterns in real-time.',
  Analyze:  'Paste any lyrics to analyze — rhyme density, syllable count, flow pattern, and wordplay score.',
  Generate: 'Describe the vibe, topic, or mood you want...\n\nExample: "Late night trap energy, talking about rising from nothing, confident tone"',
  Freestyle:'Write your freestyle — no edits, pure expression. Alic3X will score your raw creativity.',
}

const wordCount = computed(() => userLyrics.value.trim().split(/\s+/).filter(Boolean).length)

const analysis = ref([
  { label: 'Rhyme Density',  score: 72, color: '#8B00FF' },
  { label: 'Syllable Flow',  score: 85, color: '#00EAFF' },
  { label: 'Wordplay',       score: 61, color: '#FF007A' },
  { label: 'Originality',    score: 90, color: '#FFD600' },
])

const rhymeSuggestions = ref(['night', 'right', 'light', 'might', 'sight', 'tight', 'fight', 'write'])

const flowPatterns = [
  { name: 'Straight',    bpm: '90 BPM', grid: [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0] },
  { name: 'Triplet',     bpm: '90 BPM', grid: [1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0] },
  { name: 'Double Time', bpm: '90 BPM', grid: [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0] },
  { name: 'Off-Beat',    bpm: '90 BPM', grid: [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1] },
]

const outputLines = computed(() => aiOutput.value.split('\n'))

let analyzeDebounce: ReturnType<typeof setTimeout> | null = null

function analyzeInput() {
  if (analyzeDebounce) clearTimeout(analyzeDebounce)
  analyzeDebounce = setTimeout(async () => {
    if (!userLyrics.value.trim() || userLyrics.value.trim().split(/\s+/).length < 5) return
    try {
      const res = await $fetch<{ type: string; scores: Record<string, number> }>('/api/ai/generate', {
        method: 'POST',
        body: { mode: 'Analyze', lyrics: userLyrics.value, genre: genre.value, rhymeScheme: rhymeScheme.value },
      })
      if (res.type === 'analysis' && res.scores) {
        analysis.value = [
          { label: 'Rhyme Density',  score: res.scores.rhymeDensity  ?? 60, color: '#8B00FF' },
          { label: 'Syllable Flow',  score: res.scores.syllableFlow  ?? 65, color: '#00EAFF' },
          { label: 'Wordplay',       score: res.scores.wordplay       ?? 55, color: '#FF007A' },
          { label: 'Originality',    score: res.scores.originality    ?? 70, color: '#FFD600' },
        ]
      }
    } catch {
      // Keep existing analysis values when live analysis request fails.
    }
  }, 1200)
}

async function generate() {
  if (!userLyrics.value && activeMode.value !== 'Generate') return
  isGenerating.value = true
  try {
    const res = await $fetch<{ type: string; output: string }>('/api/ai/generate', {
      method: 'POST',
      body: { mode: activeMode.value, lyrics: userLyrics.value, genre: genre.value, rhymeScheme: rhymeScheme.value },
    })
    aiOutput.value = res.output ?? ''
  } catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string }; message?: string }
    aiOutput.value = `[Error: ${err?.data?.statusMessage ?? err?.message ?? 'Something went wrong. Check your GEMINI_API_KEY.'}]`
  } finally {
    isGenerating.value = false
  }
}

let rhymeDebounce: ReturnType<typeof setTimeout> | null = null

function findRhymes() {
  if (!rhymeWord.value?.trim()) {
    rhymeSuggestions.value = []
    return
  }
  if (rhymeDebounce) clearTimeout(rhymeDebounce)
  rhymeDebounce = setTimeout(async () => {
    try {
      const res = await $fetch<{ rhymes: string[] }>('/api/ai/rhymes', {
        method: 'POST',
        body: { word: rhymeWord.value },
      })
      rhymeSuggestions.value = res.rhymes ?? []
    } catch {
      // Keep current rhyme suggestions when rhyme lookup fails.
    }
  }, 400)
}

function insertRhyme(rhyme: string) {
  userLyrics.value += ' ' + rhyme
}

function copyOutput() {
  navigator.clipboard.writeText(aiOutput.value)
}
</script>

<style scoped>
.lyric-textarea {
  @apply w-full bg-transparent text-mx-text font-mono text-sm leading-relaxed p-4 outline-none resize-none;
  min-height: 200px;
}
.select-input {
  @apply px-3 py-2 rounded-lg border border-mx-border bg-mx-surface text-mx-muted outline-none;
}
.mode-btn {
  @apply px-3 py-1 text-xs font-display font-bold text-mx-muted rounded-lg transition-all;
}
.mode-btn-active {
  @apply text-mx-purple;
  background: rgba(139,0,255,0.15);
}
.ai-verse-output {
  @apply font-mono text-sm text-mx-text leading-relaxed;
  color: #C8C8E0;
}
.rhyme-pill {
  @apply px-2 py-0.5 rounded-md border border-mx-border text-xs text-mx-muted hover:text-mx-purple hover:border-mx-purple/40 transition-all;
  background: rgba(255,255,255,0.03);
}
.pattern-btn {
  @apply p-3 rounded-lg border border-mx-border transition-all text-left;
  background: rgba(255,255,255,0.02);
}
.pattern-btn:hover { border-color: rgba(139,0,255,0.3); }
.pattern-active {
  border-color: rgba(139,0,255,0.5) !important;
  background: rgba(139,0,255,0.08) !important;
}
.icon-btn {
  @apply w-7 h-7 rounded-lg border border-mx-border flex items-center justify-center text-mx-muted hover:text-mx-cyan hover:border-mx-cyan/40 transition-all;
}
</style>
