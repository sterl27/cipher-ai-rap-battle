<template>
  <div class="px-6 py-16 max-w-7xl mx-auto">
    <!-- Hero -->
    <div class="text-center mb-20">
      <HoloBadge color="gold" dot class="mb-4">2026 Edition</HoloBadge>
      <h1 class="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
        <span style="color: #FFD600">LiquidUI</span><br/>
        <span class="holo-text">2026</span>
      </h1>
      <p class="text-mx-muted text-lg max-w-2xl mx-auto leading-relaxed">
        A revolutionary holographic and mobile-first interface. Navigate your entire
        Musaix Pro suite through intuitive spatial UI that feels like the future — because it is.
      </p>
    </div>

    <!-- Hero Visual -->
    <div class="relative mb-20 h-96 flex items-center justify-center overflow-hidden rounded-3xl border border-mx-border">
      <div class="liquid-bg" />
      <!-- Orbs -->
      <div class="liquid-orb liquid-orb-1" />
      <div class="liquid-orb liquid-orb-2" />
      <div class="liquid-orb liquid-orb-3" />
      <!-- UI elements overlay -->
      <div class="relative z-10 text-center">
        <p class="font-display font-black text-6xl text-white opacity-20 tracking-widest">LIQUID</p>
        <div class="flex justify-center gap-4 mt-4">
          <div v-for="i in 5" :key="i" class="ui-pill" :style="{ animationDelay: (i * 0.1) + 's' }">
            <span class="w-1.5 h-1.5 rounded-full bg-mx-gold animate-pulse" />
            <span class="font-mono text-xs text-mx-gold">{{ ['FREQ', 'BPM', 'KEY', 'MIX', 'FX'][i-1] }}</span>
          </div>
        </div>
        <div class="mt-6">
          <HoloBadge color="gold" dot>Holographic Preview Mode</HoloBadge>
        </div>
      </div>
    </div>

    <!-- Design Principles -->
    <div class="mb-20">
      <h2 class="font-display font-bold text-3xl text-white text-center mb-12">
        Design <span style="color: #FFD600">Principles</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard
          v-for="principle in principles"
          :key="principle.title"
          accent="gold"
          class="text-center"
          hoverable
        >
          <div class="principle-icon mx-auto mb-4">{{ principle.icon }}</div>
          <h3 class="font-display font-bold text-sm text-white mb-2">{{ principle.title }}</h3>
          <p class="text-mx-muted text-xs leading-relaxed">{{ principle.desc }}</p>
        </GlassCard>
      </div>
    </div>

    <!-- Components Showcase -->
    <div class="mb-20">
      <h2 class="font-display font-bold text-3xl text-white text-center mb-12">
        <span class="holo-text">Component</span> Library
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Glass Card Component -->
        <GlassCard accent="gold">
          <p class="section-label mb-4">Glass Cards</p>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="variant in cardVariants" :key="variant.label" class="component-demo" :style="{ borderColor: variant.color }">
              <span class="text-xs font-mono" :style="{ color: variant.color }">{{ variant.label }}</span>
            </div>
          </div>
        </GlassCard>

        <!-- Button Components -->
        <GlassCard accent="gold">
          <p class="section-label mb-4">Interactive Elements</p>
          <div class="space-y-3">
            <button class="btn-primary w-full text-xs">Primary Action</button>
            <button class="btn-holo w-full text-xs">Secondary Action</button>
            <div class="flex gap-2">
              <HoloBadge color="cyan"  dot size="sm">Active</HoloBadge>
              <HoloBadge color="gold"  dot size="sm">Premium</HoloBadge>
              <HoloBadge color="green" dot size="sm">Live</HoloBadge>
            </div>
          </div>
        </GlassCard>

        <!-- Waveform component -->
        <GlassCard accent="cyan">
          <p class="section-label mb-4">Audio Waveform</p>
          <div class="waveform-showcase">
            <div
              v-for="i in 60"
              :key="i"
              class="wave-bar"
              :style="{
                height: (20 + Math.abs(Math.sin(i * 0.25)) * 60 + Math.sin(i * 0.1) * 20) + '%',
                animationDelay: (i * 0.03) + 's',
              }"
            />
          </div>
        </GlassCard>

        <!-- Color Palette -->
        <GlassCard accent="magenta">
          <p class="section-label mb-4">Design Tokens</p>
          <div class="grid grid-cols-5 gap-2">
            <div
              v-for="token in colorTokens"
              :key="token.name"
              class="text-center"
            >
              <div class="w-full aspect-square rounded-lg mb-1.5" :style="{ background: token.color }" />
              <span class="text-mx-muted text-xs">{{ token.name }}</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>

    <!-- Roadmap -->
    <div class="mb-20">
      <h2 class="font-display font-bold text-3xl text-white text-center mb-12">
        <span style="color: #FFD600">2026</span> Roadmap
      </h2>
      <div class="space-y-4">
        <div v-for="milestone in roadmap" :key="milestone.quarter" class="roadmap-item">
          <div class="roadmap-dot" :style="{ background: milestone.color }" />
          <div class="roadmap-line" v-if="!milestone.last" />
          <div class="glass-card ml-8 p-5">
            <div class="flex items-center justify-between mb-2">
              <span class="font-display font-bold text-sm text-white">{{ milestone.quarter }}</span>
              <HoloBadge :color="milestone.status === 'Live' ? 'green' : milestone.status === 'Beta' ? 'gold' : 'purple'" size="sm" dot>
                {{ milestone.status }}
              </HoloBadge>
            </div>
            <p class="text-mx-muted text-sm">{{ milestone.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="text-center">
      <p class="text-mx-muted mb-6 text-sm">LiquidUI 2026 is available now in Musaix Pro</p>
      <NuxtLink to="/tools" class="btn-primary mr-4">Launch Musaix Pro</NuxtLink>
      <NuxtLink to="/about" class="btn-holo">About the Team</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'LiquidUI 2026 — Holographic UI for Music Production | Musaix Pro',
  description: 'A revolutionary holographic and mobile-first interface for Musaix Pro.',
})

const principles = [
  { icon: '💎', title: 'Glass-First',    desc: 'Every surface uses backdrop blur and translucency for depth perception.' },
  { icon: '🌈', title: 'Holographic',   desc: 'Dynamic gradient rendering that shifts with user interaction and audio.' },
  { icon: '📱', title: 'Mobile-First',  desc: 'Built from touch up — spatial gestures and haptic-ready components.' },
  { icon: '⚡', title: 'Zero Latency', desc: '< 16ms response time on all interactions — no UI lag, ever.' },
]

const cardVariants = [
  { label: 'Default',  color: 'rgba(255,255,255,0.1)' },
  { label: 'Cyan',     color: '#00EAFF' },
  { label: 'Purple',   color: '#8B00FF' },
  { label: 'Gold',     color: '#FFD600' },
]

const colorTokens = [
  { name: 'Void',     color: '#08080E' },
  { name: 'Cyan',     color: '#00EAFF' },
  { name: 'Purple',   color: '#8B00FF' },
  { name: 'Magenta',  color: '#FF007A' },
  { name: 'Gold',     color: '#FFD600' },
]

const roadmap = [
  { quarter: 'Q1 2026 — Core Release',     status: 'Live',  color: '#00FF8C', desc: 'Glass card system, holo badges, animated backgrounds, and core navigation components released.', last: false },
  { quarter: 'Q2 2026 — Audio Widgets',    status: 'Beta',  color: '#FFD600', desc: 'Real-time waveform visualizer, spectral analyzer overlay, and dynamic BPM reactive UI elements.', last: false },
  { quarter: 'Q3 2026 — Spatial Mode',     status: 'Soon',  color: '#8B00FF', desc: 'Full holographic depth mode with parallax layers, 3D component transforms, and gesture navigation.', last: false },
  { quarter: 'Q4 2026 — AR Integration',   status: 'Soon',  color: '#FF007A', desc: 'WebXR-powered augmented reality workspace — arrange your music tools in physical space.', last: true },
]
</script>

<style scoped>
/* Hero visual */
.liquid-bg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 30% 50%, rgba(255,214,0,0.1) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 50%, rgba(139,0,255,0.1) 0%, transparent 60%);
}
.liquid-orb {
  position: absolute; border-radius: 50%; filter: blur(60px);
  animation: float 8s ease-in-out infinite;
}
.liquid-orb-1 { width: 300px; height: 300px; top: -50px; left: -50px; background: rgba(255,214,0,0.15); }
.liquid-orb-2 { width: 200px; height: 200px; bottom: -30px; right: 100px; background: rgba(255,0,122,0.12); animation-delay: -3s; }
.liquid-orb-3 { width: 250px; height: 250px; top: 50px; right: -50px; background: rgba(139,0,255,0.12); animation-delay: -6s; }

.ui-pill {
  @apply flex items-center gap-1.5 px-3 py-1.5 rounded-full border;
  border-color: rgba(255,214,0,0.3);
  background: rgba(255,214,0,0.08);
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-20px); }
}

.principle-icon {
  @apply w-12 h-12 rounded-2xl flex items-center justify-center text-2xl;
  background: rgba(255,214,0,0.1);
  border: 1px solid rgba(255,214,0,0.2);
}
.component-demo {
  @apply rounded-xl p-3 border text-center;
  background: rgba(255,255,255,0.03);
}
.waveform-showcase {
  @apply flex items-center gap-0.5 h-16;
}
.wave-bar {
  @apply flex-1 rounded-full;
  min-height: 4px;
  background: linear-gradient(to top, #00EAFF60, #00EAFF);
  animation: waveAnim 1s ease-in-out infinite alternate;
}
@keyframes waveAnim {
  from { transform: scaleY(0.3); }
  to   { transform: scaleY(1); }
}

/* Roadmap */
.roadmap-item { @apply relative pl-0; }
.roadmap-dot {
  @apply w-3 h-3 rounded-full absolute left-0 top-6 z-10;
  box-shadow: 0 0 10px currentColor;
}
.roadmap-line {
  @apply absolute left-1.5 top-9 bottom-[-1rem] w-px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.2), transparent);
}
</style>
