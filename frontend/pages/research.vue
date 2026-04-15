<template>
  <div class="px-4 md:px-6 py-12 md:py-16 max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="text-center mb-12 md:mb-20">
      <HoloBadge color="cyan" dot class="mb-3">Musaix Research</HoloBadge>
      <h1 class="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white mb-4">
        Data-Driven<br/>
        <span class="holo-text">Music Intelligence</span>
      </h1>
      <p class="text-mx-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
        Advanced analytics and research tools for music professionals. Understand your
        catalog, track industry trends, and make smarter creative decisions backed by data.
      </p>
    </div>

    <!-- Dashboard Preview -->
    <GlassCard accent="cyan" class="mb-12 md:mb-16 p-0 overflow-hidden">
      <div class="p-4 border-b border-mx-border flex items-center gap-3">
        <div class="flex gap-1.5">
          <div class="w-3 h-3 rounded-full bg-red-500/60" />
          <div class="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div class="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span class="text-mx-muted text-xs font-mono">musaix-research / dashboard</span>
      </div>
      <div class="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Metric cards -->
        <div v-for="metric in metrics" :key="metric.label" class="metric-card">
          <div class="flex items-start justify-between mb-3">
            <span class="text-mx-muted text-xs uppercase tracking-wider">{{ metric.label }}</span>
            <span class="text-xs px-2 py-0.5 rounded" :class="metric.trend > 0 ? 'text-mx-green bg-mx-green/10' : 'text-mx-magenta bg-mx-magenta/10'">
              {{ metric.trend > 0 ? '+' : '' }}{{ metric.trend }}%
            </span>
          </div>
          <div class="stat-number text-3xl font-black mb-2">{{ metric.value }}</div>
          <!-- Mini bar chart -->
          <div class="flex items-end gap-1 h-12">
            <div
              v-for="(bar, i) in metric.bars"
              :key="i"
              class="flex-1 rounded-t-sm transition-all"
              :style="{ height: bar + '%', background: metric.color }"
              :class="i === metric.bars.length - 1 ? 'opacity-100' : 'opacity-40'"
            />
          </div>
        </div>

        <!-- Waveform visualization -->
        <div class="lg:col-span-3 relative h-24 flex items-center">
          <div class="waveform-display">
            <div
              v-for="i in 80"
              :key="i"
              class="waveform-bar"
              :style="{ height: waveformHeight(i) + '%', animationDelay: (i * 0.02) + 's' }"
            />
          </div>
          <div class="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-mx-cyan">LIVE</div>
        </div>
      </div>
    </GlassCard>

    <!-- Feature Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
      <GlassCard
        v-for="feature in features"
        :key="feature.title"
        :accent="feature.accent"
        hoverable
      >
        <div class="feature-icon mb-4" :style="{ color: feature.color }">
          <span v-html="feature.icon" />
        </div>
        <h3 class="font-display font-bold text-lg text-white mb-2">{{ feature.title }}</h3>
        <p class="text-mx-muted text-sm leading-relaxed">{{ feature.desc }}</p>
      </GlassCard>
    </div>

    <!-- Use Cases -->
    <div class="mb-12 md:mb-16">
      <h2 class="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-white text-center mb-8 md:mb-10">
        Built for Every <span class="holo-text">Music Professional</span>
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="role in roles" :key="role.title" class="role-card">
          <div class="text-3xl mb-3">{{ role.emoji }}</div>
          <h4 class="font-display font-bold text-sm text-white mb-1">{{ role.title }}</h4>
          <p class="text-mx-muted text-xs leading-relaxed">{{ role.desc }}</p>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="text-center">
      <NuxtLink to="/tools" class="btn-primary mr-4">Start Researching</NuxtLink>
      <NuxtLink to="/about" class="btn-holo">Learn More</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Musaix Research — Data-Driven Music Intelligence',
  description: 'Advanced analytics and research tools for music professionals.',
})

function waveformHeight(i: number) {
  return 20 + Math.sin(i * 0.3) * 30 + Math.random() * 40
}

const metrics = [
  {
    label: 'Tracks Analyzed',
    value: '12,847',
    trend: 18.4,
    color: '#00EAFF',
    bars: [40, 55, 45, 65, 58, 72, 80],
  },
  {
    label: 'Avg Stream Score',
    value: '94.2',
    trend: 6.1,
    color: '#8B00FF',
    bars: [70, 65, 75, 80, 78, 88, 94],
  },
  {
    label: 'Trend Accuracy',
    value: '98.7%',
    trend: 2.3,
    color: '#FFD600',
    bars: [85, 88, 90, 92, 94, 96, 99],
  },
]

const features = [
  {
    title: 'Catalog Intelligence',
    desc: 'Deep analysis of your full music catalog — BPM distribution, key signatures, mood mapping, and release patterns.',
    icon: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',
    color: '#00EAFF', accent: 'cyan' as const,
  },
  {
    title: 'Trend Forecasting',
    desc: 'AI-powered genre trend forecasting. Know what sounds will dominate before they hit the charts.',
    icon: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>',
    color: '#8B00FF', accent: 'purple' as const,
  },
  {
    title: 'Competitor Analysis',
    desc: 'Compare your production style against industry leaders and discover gaps in your creative signature.',
    icon: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
    color: '#FF007A', accent: 'magenta' as const,
  },
  {
    title: 'Release Optimizer',
    desc: 'Data-driven release timing recommendations based on audience activity, competition, and platform algorithms.',
    icon: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
    color: '#FFD600', accent: 'gold' as const,
  },
  {
    title: 'Audio DNA',
    desc: 'Unique sonic fingerprinting — understand the audio characteristics that define your sound signature.',
    icon: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>',
    color: '#00FF8C', accent: 'cyan' as const,
  },
  {
    title: 'Market Intelligence',
    desc: 'Real-time streaming data, sync licensing opportunities, and monetization insights across all platforms.',
    icon: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>',
    color: '#8B00FF', accent: 'purple' as const,
  },
]

const roles = [
  { emoji: '🎹', title: 'Producers',       desc: 'Track production patterns, BPM trends, and sound palette evolution.' },
  { emoji: '🎤', title: 'Artists',         desc: 'Catalog analytics, audience insights, and release performance.' },
  { emoji: '🎚️', title: 'Engineers',      desc: 'Technical audio metrics, mastering benchmarks, and quality scores.' },
  { emoji: '📊', title: 'Label Managers', desc: 'Portfolio analytics, ROI tracking, and market positioning.' },
]
</script>

<style scoped>
.metric-card {
  @apply relative overflow-hidden rounded-2xl border border-mx-border p-5;
  background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.03);
}
.feature-icon {
  @apply w-12 h-12 rounded-xl flex items-center justify-center border border-mx-border;
  background: rgba(255,255,255,0.04);
}
.role-card {
  @apply relative overflow-hidden rounded-2xl border border-mx-border p-6 text-center hover:border-mx-cyan/20 transition-colors;
  background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
}
.waveform-display {
  @apply flex items-center gap-0.5 w-full h-full;
}
.waveform-bar {
  @apply flex-1 rounded-full;
  min-height: 4px;
  background: linear-gradient(to top, #00EAFF, #8B00FF);
  animation: waveAnim 1.2s ease-in-out infinite alternate;
}
@keyframes waveAnim {
  from { transform: scaleY(0.4); }
  to   { transform: scaleY(1); }
}
</style>
