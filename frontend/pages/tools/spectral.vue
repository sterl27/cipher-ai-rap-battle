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
          <HoloBadge color="cyan" dot class="mb-3">Live Audio</HoloBadge>
          <h1 class="font-display font-black text-4xl sm:text-5xl text-white">
            Spectral <span class="holo-text">Processor</span>
          </h1>
        </div>
        <div class="flex gap-2 flex-wrap">
          <HoloBadge color="cyan"   size="sm" dot>{{ isActive ? 'LIVE' : 'IDLE' }}</HoloBadge>
          <HoloBadge color="purple" size="sm">FFT Active</HoloBadge>
        </div>
      </div>
    </div>

    <!-- Main Visualizer -->
    <GlassCard accent="cyan" class="mb-6 p-0 overflow-hidden">
      <!-- Toolbar -->
      <div class="px-5 py-3 border-b border-mx-border flex items-center justify-between flex-wrap gap-3">
        <div class="flex gap-2">
          <button
            v-for="view in views"
            :key="view"
            class="view-btn"
            :class="activeView === view ? 'view-active' : ''"
            @click="activeView = view"
          >{{ view }}</button>
        </div>
        <div class="flex items-center gap-3">
          <select v-model="fftSize" class="select-sm">
            <option>2048</option>
            <option>4096</option>
            <option>8192</option>
          </select>
          <button
            class="btn-primary text-xs px-4 py-1.5"
            @click="toggleActive"
          >{{ isActive ? 'Pause' : 'Activate' }}</button>
        </div>
      </div>

      <!-- Spectrum Display -->
      <div class="relative h-64 p-4">
        <!-- Frequency axis labels -->
        <div class="absolute top-4 right-4 flex flex-col gap-1 text-right">
          <span v-for="label in freqLabels" :key="label" class="text-xs font-mono text-mx-muted">{{ label }}</span>
        </div>

        <!-- Waveform / Spectrum bars -->
        <div class="spectrum-container">
          <div
            v-for="i in barCount"
            :key="i"
            class="spectrum-bar"
            :style="spectrumStyle(i)"
          />
        </div>

        <!-- Peak line overlay -->
        <div class="peak-overlay">
          <svg width="100%" height="100%" preserveAspectRatio="none">
            <polyline
              :points="peakPoints"
              fill="none"
              stroke="rgba(0,234,255,0.4)"
              stroke-width="1.5"
            />
          </svg>
        </div>
      </div>

      <!-- Frequency band labels -->
      <div class="px-4 pb-3 flex justify-between text-xs font-mono text-mx-muted">
        <span>20Hz</span>
        <span>200Hz</span>
        <span>2kHz</span>
        <span>5kHz</span>
        <span>10kHz</span>
        <span>20kHz</span>
      </div>
    </GlassCard>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <!-- EQ Bands -->
      <GlassCard accent="cyan" class="lg:col-span-2">
        <p class="section-label mb-4">Frequency Band Analysis</p>
        <div class="space-y-3">
          <div v-for="band in eqBands" :key="band.name">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-mono text-mx-muted">{{ band.name }}</span>
              <div class="flex items-center gap-2">
                <div class="h-1.5 w-24 rounded-full bg-mx-surface overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all duration-300"
                    :style="{ width: band.level + '%', background: band.color }"
                  />
                </div>
                <span class="text-xs font-mono w-12 text-right" :style="{ color: band.color }">
                  {{ band.db > 0 ? '+' : '' }}{{ band.db }}dB
                </span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      <!-- Stats Panel -->
      <div class="space-y-4">
        <GlassCard v-for="stat in audioStats" :key="stat.label">
          <p class="text-mx-muted text-xs uppercase tracking-wider mb-1">{{ stat.label }}</p>
          <p class="font-display font-black text-2xl" :style="{ color: stat.color }">{{ stat.value }}</p>
          <p class="text-mx-muted text-xs mt-1">{{ stat.note }}</p>
        </GlassCard>
      </div>
    </div>

    <!-- AI Analysis Card -->
    <GlassCard accent="purple" class="mb-10">
      <div class="flex items-start gap-4">
        <div class="alic3x-icon">
          <span class="font-display font-black text-xs holo-text">A3</span>
        </div>
        <div>
          <p class="font-display font-bold text-sm text-white mb-2">Alic3X Mix Analysis</p>
          <p class="text-mx-muted text-sm leading-relaxed">
            <span class="text-mx-cyan font-semibold">Low-Mids (200–500Hz):</span> Slight buildup detected around 340Hz. Consider a narrow cut of -2.5dB to improve clarity. <br/>
            <span class="text-mx-purple font-semibold">High Frequency (8–12kHz):</span> Air band is well balanced. Presence is strong without being harsh. <br/>
            <span class="text-mx-gold font-semibold">Overall:</span> Mix is reading well on reference. Stereo width is excellent. Minor sub-bass tightening recommended below 60Hz.
          </p>
          <div class="flex gap-2 mt-3">
            <HoloBadge color="cyan"   size="sm">Mix Score: 87/100</HoloBadge>
            <HoloBadge color="green"  size="sm" dot>Good Balance</HoloBadge>
          </div>
        </div>
      </div>
    </GlassCard>

    <!-- CTA -->
    <div class="text-center">
      <NuxtLink to="/tools/lyrical" class="btn-holo mr-4">Lyrical Lab →</NuxtLink>
      <NuxtLink to="/tools/battle"  class="btn-primary">Battle Arena →</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Spectral Processor — Real-Time Audio Analysis | Musaix Pro',
  description: 'Real-time spectral audio visualization and intelligent processing for music professionals.',
})

const isActive = ref(false)
const activeView = ref('Spectrum')
const fftSize = ref('4096')
const views = ['Spectrum', 'Waterfall', 'Phase', 'Waveform']
const barCount = 80

let animFrame: number | null = null

const freqLabels = ['0 dBFS', '-12 dBFS', '-24 dBFS', '-48 dBFS']

// Dynamic bar heights driven by animation
const bars = ref(Array.from({ length: barCount }, (_, i) => ({
  height: 10 + Math.sin(i * 0.2) * 20,
})))

function spectrumStyle(i: number) {
  const h = bars.value[i - 1]?.height ?? 20
  const hue = Math.floor((i / barCount) * 200) // cyan to purple range
  return {
    height: h + '%',
    background: `hsl(${180 + hue}, 100%, ${50 + h * 0.2}%)`,
    opacity: isActive.value ? 1 : 0.4,
  }
}

const peakPoints = computed(() => {
  const w = 100 / barCount
  return bars.value.map((b, i) => `${i * w + w / 2}%,${100 - b.height}%`).join(' ')
})

function toggleActive() {
  isActive.value = !isActive.value
  if (isActive.value) startAnimation()
  else if (animFrame) cancelAnimationFrame(animFrame)
}

function startAnimation() {
  let t = 0
  function frame() {
    t += 0.05
    bars.value = bars.value.map((_, i) => ({
      height: Math.max(5, Math.min(95,
        20 + Math.sin(i * 0.15 + t) * 25
          + Math.sin(i * 0.4 + t * 1.7) * 15
          + Math.random() * 10
      ))
    }))
    animFrame = requestAnimationFrame(frame)
  }
  animFrame = requestAnimationFrame(frame)
}

onUnmounted(() => { if (animFrame) cancelAnimationFrame(animFrame) })

const eqBands = [
  { name: 'Sub Bass (20–60 Hz)',      level: 78, db: -3.2,  color: '#FF007A' },
  { name: 'Bass (60–250 Hz)',         level: 85, db: -1.4,  color: '#FF6B00' },
  { name: 'Low Mid (250–500 Hz)',     level: 92, db: +2.1,  color: '#FFD600' },
  { name: 'Mid (500Hz–2kHz)',         level: 80, db: -0.8,  color: '#00FF8C' },
  { name: 'Upper Mid (2–5kHz)',       level: 75, db: -1.9,  color: '#00EAFF' },
  { name: 'Presence (5–10kHz)',       level: 70, db: -2.5,  color: '#8B00FF' },
  { name: 'Air (10–20kHz)',           level: 60, db: -4.1,  color: '#C060FF' },
]

const audioStats = [
  { label: 'LUFS (Integrated)', value: '-8.3', color: '#00EAFF', note: 'Streaming target: -14 LUFS' },
  { label: 'Peak Level',        value: '-0.3',  color: '#FFD600', note: 'True Peak: -0.3 dBTP' },
  { label: 'Dynamic Range',     value: '11 DR', color: '#00FF8C', note: 'Good — target DR8 minimum' },
]
</script>

<style scoped>
.spectrum-container {
  @apply absolute inset-4 flex items-end gap-0.5;
}
.spectrum-bar {
  @apply flex-1 rounded-t-sm transition-all duration-75;
  min-height: 4px;
}
.peak-overlay {
  @apply absolute inset-4 pointer-events-none;
}
.view-btn {
  @apply px-3 py-1 text-xs font-display font-bold text-mx-muted rounded-md transition-all;
}
.view-btn:hover { @apply text-white; background: rgba(255,255,255,0.05); }
.view-active { @apply text-mx-cyan; background: rgba(0,234,255,0.1); }
.select-sm {
  @apply px-2 py-1 text-xs rounded-md border border-mx-border bg-mx-surface text-mx-muted outline-none;
}
.alic3x-icon {
  @apply w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border border-mx-purple/40;
  background: linear-gradient(135deg, rgba(139,0,255,0.2), rgba(255,0,122,0.2));
}
</style>
