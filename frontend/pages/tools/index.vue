<template>
  <div class="px-4 md:px-6 py-12 md:py-16 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-12 md:mb-20">
      <HoloBadge color="cyan" dot class="mb-3">Tools Suite</HoloBadge>
      <h1 class="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white mb-4">
        Professional Tools<br/>
        <span class="holo-text">for Every Workflow</span>
      </h1>
      <p class="text-mx-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
        From lyrical engineering to spectral audio analysis, every tool in the Musaix Pro suite
        is built for professional use — powered by AI, designed for speed.
      </p>
    </div>

    <!-- Tools Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16">
      <NuxtLink
        v-for="tool in tools"
        :key="tool.to"
        :to="tool.to"
        class="tool-feature-card group"
      >
        <!-- Color bar -->
        <div class="h-1 rounded-t-2xl" :style="{ background: tool.gradient }" />
        <div class="p-8">
          <div class="flex items-start justify-between mb-6">
            <div class="tool-feat-icon" :style="{ color: tool.color, borderColor: tool.color + '40' }">
              <span v-html="tool.icon" />
            </div>
            <HoloBadge :color="tool.badge.color" size="sm" dot>{{ tool.badge.text }}</HoloBadge>
          </div>
          <h2 class="font-display font-bold text-2xl text-white mb-3 group-hover:holo-text transition-all">
            {{ tool.name }}
          </h2>
          <p class="text-mx-muted leading-relaxed mb-6">{{ tool.description }}</p>
          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="tag in tool.tags"
              :key="tag"
              class="text-xs px-2 py-0.5 rounded-md border border-mx-border text-mx-muted"
            >{{ tag }}</span>
          </div>
          <div class="flex items-center gap-2 font-display text-sm font-bold" :style="{ color: tool.color }">
            Launch Tool
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Quick Launch Bar -->
    <GlassCard accent="cyan" class="mb-16">
      <p class="section-label mb-6 text-center">Quick Launch</p>
      <div class="flex flex-wrap gap-3 justify-center">
        <NuxtLink v-for="tool in quickLaunch" :key="tool.to" :to="tool.to" class="quick-btn">
          <span>{{ tool.emoji }}</span>
          <span class="font-display font-bold text-xs text-white">{{ tool.label }}</span>
        </NuxtLink>
      </div>
    </GlassCard>

    <!-- CTA -->
    <div class="text-center">
      <h2 class="font-display font-bold text-2xl md:text-3xl text-white mb-3">
        New tools dropping <span class="holo-text">every quarter</span>
      </h2>
      <p class="text-mx-muted mb-8">Get early access to every new tool before it launches publicly.</p>
      <button class="btn-primary mr-4">Get Early Access</button>
      <NuxtLink to="/about" class="btn-holo">About Musaix Pro</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Tools Suite — Professional AI Music Tools | Musaix Pro',
  description: 'Lyrical Lab, Spectral Processor, AI Battle Arena and more — professional AI music production tools.',
})

const tools = [
  {
    to: '/tools/lyrical',
    name: 'Lyrical Lab',
    description: 'AI-powered lyrical engineering. Generate rhyme schemes, analyze flow, co-write verses, and craft punchlines with an AI that understands cadence and wordplay at a professional level.',
    icon: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>',
    color: '#8B00FF',
    gradient: 'linear-gradient(90deg, #8B00FF, #FF007A)',
    tags: ['Rhyme Schemes', 'Flow Analysis', 'Co-Writing', 'Punchlines', 'Verse Structure'],
    badge: { text: 'AI', color: 'purple' as const },
  },
  {
    to: '/tools/spectral',
    name: 'Spectral Processor',
    description: 'Real-time spectral audio visualization and intelligent processing. See your audio in a new dimension — identify frequency conflicts, visualize dynamics, and get instant mix feedback.',
    icon: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>',
    color: '#00EAFF',
    gradient: 'linear-gradient(90deg, #00EAFF, #0080FF)',
    tags: ['FFT Analysis', 'EQ Visualization', 'Dynamics', 'Real-time', 'Mastering'],
    badge: { text: 'LIVE', color: 'cyan' as const },
  },
  {
    to: '/tools/battle',
    name: 'AI Battle Arena',
    description: 'The original Cipher.AI experience — now enhanced with Musaix Pro AI. Go head-to-head with an adaptive AI MC. Submit your bars, get scored on rhyme, wordplay, flow, and crowd reaction.',
    icon: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
    color: '#FF007A',
    gradient: 'linear-gradient(90deg, #FF007A, #FF6B00)',
    tags: ['Real-time Battle', 'AI Scoring', 'Hype Meter', 'Leaderboard', 'Community'],
    badge: { text: 'HOT', color: 'magenta' as const },
  },
  {
    to: '/alic3x',
    name: 'Alic3X PRO Assistant',
    description: 'Full-session AI creative assistant powered by Gemini 2.0. Ask anything — chord progressions, mix advice, release strategy, lyric co-writing, and more. Always on, always learning your style.',
    icon: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>',
    color: '#FFD600',
    gradient: 'linear-gradient(90deg, #FFD600, #FF6B00)',
    tags: ['Gemini 2.0', 'Multimodal', 'Audio Analysis', 'Strategy', 'Co-Writing'],
    badge: { text: 'PRO', color: 'gold' as const },
  },
]

const quickLaunch = [
  { to: '/tools/lyrical',  emoji: '✍️', label: 'Lyrical Lab' },
  { to: '/tools/spectral', emoji: '🎚️', label: 'Spectral' },
  { to: '/tools/battle',   emoji: '⚡', label: 'Battle' },
  { to: '/alic3x',        emoji: '🤖', label: 'Alic3X' },
  { to: '/research',       emoji: '📊', label: 'Research' },
]
</script>

<style scoped>
.tool-feature-card {
  @apply relative overflow-hidden rounded-2xl border border-mx-border transition-all duration-300;
  background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
  padding: 0;
}
.tool-feature-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255,255,255,0.14);
}
.tool-feat-icon {
  @apply w-14 h-14 rounded-2xl border flex items-center justify-center;
  background: rgba(255,255,255,0.04);
}
.quick-btn {
  @apply flex items-center gap-2 px-4 py-2.5 rounded-xl border border-mx-border transition-all;
  background: rgba(255,255,255,0.04);
}
.quick-btn:hover {
  background: rgba(0,234,255,0.08);
  border-color: rgba(0,234,255,0.3);
}
</style>
