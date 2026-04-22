<template>
  <div class="px-6 py-16 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="mb-10">
      <NuxtLink to="/tools" class="flex items-center gap-2 text-mx-muted text-sm mb-6 hover:text-mx-magenta transition-colors">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        Back to Tools
      </NuxtLink>
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <HoloBadge color="magenta" dot class="mb-3">Cipher.AI × Musaix Pro</HoloBadge>
          <h1 class="font-display font-black text-4xl sm:text-5xl text-white">
            AI Battle <span class="holo-text">Arena</span>
          </h1>
        </div>
        <div class="flex gap-2 flex-wrap">
          <HoloBadge color="magenta" size="sm" dot>Round {{ currentRound }}/{{ totalRounds }}</HoloBadge>
          <HoloBadge :color="gameState === 'idle' ? 'purple' : 'green'" size="sm">{{ stateLabels[gameState] }}</HoloBadge>
        </div>
      </div>
    </div>

    <!-- Arena -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <!-- Player Side -->
      <GlassCard accent="cyan" class="lg:col-span-1">
        <div class="text-center mb-4">
          <div class="player-avatar player-avatar-user mx-auto mb-2">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <p class="font-display font-bold text-sm text-white">YOU</p>
          <p class="text-mx-muted text-xs font-mono">Human MC</p>
        </div>
        <div class="score-display">
          <span class="stat-number text-4xl font-black">{{ playerScore }}</span>
          <span class="text-mx-muted text-xs block">points</span>
        </div>
        <div class="mt-4 space-y-1.5">
          <div v-for="(s, label) in playerScoreBreakdown" :key="label">
            <div class="flex justify-between text-xs mb-0.5">
              <span class="text-mx-muted">{{ label }}</span>
              <span class="font-mono text-mx-cyan">{{ s }}/25</span>
            </div>
            <div class="h-1 rounded-full bg-mx-surface">
              <div class="h-full rounded-full bg-mx-cyan" :style="{ width: (s / 25 * 100) + '%' }" />
            </div>
          </div>
        </div>
      </GlassCard>

      <!-- Center / Battle Feed -->
      <div class="lg:col-span-1 flex flex-col">
        <!-- VS -->
        <div class="text-center mb-4">
          <div class="vs-badge">
            <span class="font-display font-black text-2xl holo-text">VS</span>
          </div>
          <!-- Timer -->
          <div v-if="gameState === 'player-turn'" class="mt-2">
            <div class="font-display font-black text-3xl" :class="timer <= 10 ? 'text-mx-magenta' : 'text-mx-gold'">
              {{ timer }}s
            </div>
          </div>
        </div>

        <!-- Battle Log -->
        <div class="battle-log flex-1 mb-4">
          <div v-if="gameState === 'idle'" class="h-full flex items-center justify-center">
            <p class="text-mx-muted text-sm text-center">
              Press <strong class="text-white">Start Battle</strong> to drop your first verse
            </p>
          </div>
          <div v-else class="space-y-3">
            <div v-for="log in battleLog" :key="log.id" :class="['log-entry', log.role === 'ai' ? 'log-ai' : 'log-player']">
              <div class="flex items-center gap-1.5 mb-1">
                <span class="text-xs font-mono" :class="log.role === 'ai' ? 'text-mx-magenta' : 'text-mx-cyan'">
                  {{ log.role === 'ai' ? '⚡ AI MC' : '🎤 You' }}
                </span>
                <span class="text-mx-muted text-xs">Round {{ log.round }}</span>
              </div>
              <p class="text-sm leading-relaxed font-mono">{{ log.verse }}</p>
            </div>
            <!-- AI thinking indicator -->
            <div v-if="aiThinking" class="log-ai">
              <div class="flex items-center gap-1.5 mb-2">
                <span class="text-xs font-mono text-mx-magenta">⚡ AI MC</span>
                <span class="text-mx-muted text-xs">is cooking...</span>
              </div>
              <div class="flex gap-1">
                <span v-for="i in 3" :key="i" class="typing-dot" :style="{ animationDelay: (i * 0.15) + 's' }" />
              </div>
            </div>
          </div>
        </div>

        <!-- Hype Meter -->
        <div class="mb-4">
          <div class="flex justify-between text-xs mb-1">
            <span class="text-mx-muted">Crowd Hype</span>
            <span class="font-mono text-mx-gold">{{ hypeMeter }}%</span>
          </div>
          <div class="h-3 rounded-full bg-mx-surface overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-500"
              :style="{
                width: hypeMeter + '%',
                background: 'linear-gradient(90deg, #FF007A, #FFD600)'
              }"
            />
          </div>
        </div>

        <!-- Action buttons -->
        <div class="space-y-2">
          <button
            v-if="gameState === 'idle'"
            class="btn-primary w-full"
            @click="startBattle"
          >⚡ Start Battle</button>
          <button
            v-if="gameState === 'battle-over'"
            class="btn-primary w-full"
            @click="resetBattle"
          >🔄 New Battle</button>
        </div>
      </div>

      <!-- AI Side -->
      <GlassCard accent="magenta" class="lg:col-span-1">
        <div class="text-center mb-4">
          <div class="player-avatar player-avatar-ai mx-auto mb-2">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>
          <p class="font-display font-bold text-sm text-white">CIPHER</p>
          <p class="text-mx-muted text-xs font-mono">AI MC · Neural v3</p>
        </div>
        <div class="score-display">
          <span class="font-display font-black text-4xl" style="color: #FF007A">{{ aiScore }}</span>
          <span class="text-mx-muted text-xs block">points</span>
        </div>
        <div class="mt-4 space-y-1.5">
          <div v-for="(s, label) in aiScoreBreakdown" :key="label">
            <div class="flex justify-between text-xs mb-0.5">
              <span class="text-mx-muted">{{ label }}</span>
              <span class="font-mono text-mx-magenta">{{ s }}/25</span>
            </div>
            <div class="h-1 rounded-full bg-mx-surface">
              <div class="h-full rounded-full bg-mx-magenta" :style="{ width: (s / 25 * 100) + '%' }" />
            </div>
          </div>
        </div>
      </GlassCard>
    </div>

    <!-- Input Section -->
    <GlassCard v-if="gameState === 'player-turn'" accent="cyan" class="mb-6">
      <p class="section-label mb-3">Drop Your Bars</p>
      <textarea
        v-model="playerVerse"
        class="verse-input w-full"
        placeholder="Type your 4 bars here... (max 4 lines)"
        rows="4"
        :maxlength="280"
      />
      <div class="flex items-center justify-between mt-3">
        <span class="text-mx-muted text-xs font-mono">{{ playerVerse.length }}/280 · {{ barCount }} bars</span>
        <button class="btn-primary text-sm px-6" @click="submitVerse" :disabled="!playerVerse.trim()">
          Submit Verse ↵
        </button>
      </div>
    </GlassCard>

    <!-- Leaderboard teaser -->
    <GlassCard>
      <p class="section-label mb-4">Top MCs This Week</p>
      <div class="space-y-2">
        <div v-for="(mc, i) in leaderboard" :key="mc.name" class="leaderboard-row">
          <span class="font-display font-black text-sm w-6 text-center" :style="{ color: i === 0 ? '#FFD600' : i === 1 ? '#C0C0C0' : '#CD7F32' }">
            {{ i + 1 }}
          </span>
          <span class="font-display font-bold text-sm text-white flex-1">{{ mc.name }}</span>
          <span class="font-mono text-xs text-mx-muted">{{ mc.wins }}W · {{ mc.losses }}L</span>
          <span class="font-mono text-sm" :style="{ color: mc.color }">{{ mc.score }}</span>
        </div>
      </div>
    </GlassCard>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'AI Battle Arena — Cipher.AI × Musaix Pro',
  description: 'Real-time AI rap battle. Test your lyrical skills against an adaptive AI MC.',
})

type GameState = 'idle' | 'player-turn' | 'ai-turn' | 'scoring' | 'battle-over'

const gameState = ref<GameState>('idle')
const currentRound = ref(1)
const totalRounds = 5
const timer = ref(30)
const playerScore = ref(0)
const aiScore = ref(0)
const hypeMeter = ref(50)
const playerVerse = ref('')
const aiThinking = ref(false)
const battleLog = ref<Array<{ id: number; role: string; round: number; verse: string }>>([])
let timerInterval: ReturnType<typeof setInterval> | null = null

const stateLabels: Record<GameState, string> = {
  idle: 'Ready', 'player-turn': 'Your Turn', 'ai-turn': 'AI Turn', scoring: 'Scoring', 'battle-over': 'Battle Over'
}

const playerScoreBreakdown = ref({ 'Rhyme Scheme': 0, 'Wordplay': 0, 'Flow': 0, 'Crowd': 0 })
const aiScoreBreakdown     = ref({ 'Rhyme Scheme': 0, 'Wordplay': 0, 'Flow': 0, 'Crowd': 0 })

const barCount = computed(() => playerVerse.value.trim().split('\n').filter(Boolean).length)

async function startBattle() {
  gameState.value = 'player-turn'
  timer.value = 30
  startTimer()
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer.value--
    if (timer.value <= 0) {
      clearInterval(timerInterval!)
      submitVerse()
    }
  }, 1000)
}

async function submitVerse() {
  clearInterval(timerInterval!)
  const verse = playerVerse.value.trim() || '[skipped — no verse submitted]'
  battleLog.value.push({ id: Date.now(), role: 'player', round: currentRound.value, verse })
  playerVerse.value = ''
  gameState.value = 'ai-turn'
  aiThinking.value = true

  // Score player (heuristic based on verse length/variety)
  const lineCount = verse.split('\n').filter(Boolean).length
  const base = verse === '[skipped — no verse submitted]' ? 5 : Math.min(25, 10 + lineCount * 3)
  const rnd = () => Math.floor(Math.random() * 8)
  const breakdown = {
    'Rhyme Scheme': Math.min(25, base + rnd()),
    'Wordplay':     Math.min(25, base - 2 + rnd()),
    'Flow':         Math.min(25, base + rnd()),
    'Crowd':        Math.min(25, base - 1 + rnd()),
  }
  playerScore.value += Object.values(breakdown).reduce((a, b) => a + b, 0)
  playerScoreBreakdown.value = breakdown

  // Call Gemini for AI verse + scores
  let aiVerse = "My circuits fire like synapses — I'm built to spit bars\nYou reached for the mic but I'm already reachin' for stars\nEvery line I generate is hotter than a thousand scars\nStep back to your side of the ring — this arena is ours"
  let aiBreakdown = { 'Rhyme Scheme': 19, 'Wordplay': 18, 'Flow': 20, 'Crowd': 17 }

  try {
    const { verse, scores } = await $fetch<{
      verse: string
      scores: { rhymeScheme: number; wordplay: number; flow: number; crowd: number }
    }>('/api/ai/battle-verse', {
      method: 'POST',
      body: {
        playerVerse: verse,
        round: currentRound.value,
        battleLog: battleLog.value,
      },
    })
    aiVerse = verse
    aiBreakdown = {
      'Rhyme Scheme': Math.min(25, scores.rhymeScheme),
      'Wordplay':     Math.min(25, scores.wordplay),
      'Flow':         Math.min(25, scores.flow),
      'Crowd':        Math.min(25, scores.crowd),
    }
  } catch {
    // Fallback to local AI verse and score defaults when API call fails.
  }

  aiThinking.value = false
  battleLog.value.push({ id: Date.now() + 1, role: 'ai', round: currentRound.value, verse: aiVerse })

  // Score AI
  const aScore = Object.values(aiBreakdown).reduce((a, b) => a + b, 0)
  aiScore.value += aScore
  aiScoreBreakdown.value = aiBreakdown

  // Update hype
  hypeMeter.value = Math.min(100, Math.max(10, 50 + (playerScore.value - aiScore.value) / 5))

  if (currentRound.value >= totalRounds) {
    gameState.value = 'battle-over'
  } else {
    currentRound.value++
    timer.value = 30
    gameState.value = 'player-turn'
    startTimer()
  }
}

function resetBattle() {
  gameState.value = 'idle'
  currentRound.value = 1
  playerScore.value = 0
  aiScore.value = 0
  hypeMeter.value = 50
  battleLog.value = []
  playerVerse.value = ''
}

onUnmounted(() => { if (timerInterval) clearInterval(timerInterval) })

const leaderboard = [
  { name: 'LyriX_King',   wins: 42, losses: 8,  score: 9847, color: '#FFD600' },
  { name: 'FlowMaster',   wins: 38, losses: 12, score: 8932, color: '#C0C0C0' },
  { name: 'CipherBreak',  wins: 31, losses: 14, score: 7654, color: '#CD7F32' },
  { name: 'VerseCraft99', wins: 28, losses: 16, score: 6891, color: '#00EAFF' },
  { name: 'BarBuilder',   wins: 25, losses: 20, score: 5743, color: '#8B00FF' },
]
</script>

<style scoped>
.player-avatar {
  @apply w-16 h-16 rounded-2xl flex items-center justify-center;
}
.player-avatar-user { background: linear-gradient(135deg, rgba(0,234,255,0.2), rgba(0,234,255,0.05)); border: 1px solid rgba(0,234,255,0.3); color: #00EAFF; }
.player-avatar-ai   { background: linear-gradient(135deg, rgba(255,0,122,0.2), rgba(255,0,122,0.05)); border: 1px solid rgba(255,0,122,0.3); color: #FF007A; }

.score-display { @apply text-center py-3 rounded-xl border border-mx-border; background: rgba(255,255,255,0.03); }

.vs-badge {
  @apply w-16 h-16 rounded-full flex items-center justify-center mx-auto border-2;
  border-color: rgba(255,0,122,0.4);
  background: radial-gradient(circle, rgba(255,0,122,0.15), transparent);
}
.battle-log {
  @apply rounded-xl border border-mx-border p-3 min-h-48 max-h-64 overflow-y-auto;
  background: rgba(0,0,0,0.2);
}
.log-entry { @apply p-3 rounded-xl text-mx-text; }
.log-player { background: rgba(0,234,255,0.06); border: 1px solid rgba(0,234,255,0.15); }
.log-ai     { background: rgba(255,0,122,0.06); border: 1px solid rgba(255,0,122,0.15); }

.verse-input {
  @apply w-full bg-transparent text-mx-text font-mono text-sm leading-relaxed outline-none resize-none border-b border-mx-border pb-3;
}

.typing-dot {
  @apply w-2 h-2 rounded-full bg-mx-magenta inline-block;
  animation: typingBounce 1s ease-in-out infinite;
}
@keyframes typingBounce {
  0%, 100% { transform: translateY(0); opacity: 0.4; }
  50%       { transform: translateY(-4px); opacity: 1; }
}

.leaderboard-row {
  @apply flex items-center gap-3 p-2.5 rounded-lg transition-colors;
  background: rgba(255,255,255,0.02);
}
.leaderboard-row:hover { background: rgba(255,255,255,0.05); }
</style>
