<template>
  <NuxtLink :to="to" class="tool-card group">
    <!-- Glow blob -->
    <div class="tool-glow" :style="{ background: glowBg }" />

    <!-- Icon -->
    <div class="tool-icon" :style="{ borderColor: accentColor, color: accentColor }">
      <span v-html="icon" />
    </div>

    <div class="flex-1">
      <div class="flex items-start justify-between mb-2">
        <h3 class="font-display font-bold text-base text-white group-hover:holo-text transition-all">{{ name }}</h3>
        <HoloBadge :color="color" size="sm" dot>{{ badge }}</HoloBadge>
      </div>
      <p class="text-mx-muted text-sm leading-relaxed">{{ description }}</p>
    </div>

    <!-- Arrow -->
    <div class="tool-arrow" :style="{ color: accentColor }">
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  to:          string
  name:        string
  description: string
  icon:        string
  badge:       string
  color:       'cyan' | 'purple' | 'magenta' | 'gold' | 'green'
}>()

const colorMap = {
  cyan:    { color: '#00EAFF', glow: 'rgba(0,234,255,0.15)' },
  purple:  { color: '#8B00FF', glow: 'rgba(139,0,255,0.15)' },
  magenta: { color: '#FF007A', glow: 'rgba(255,0,122,0.15)' },
  gold:    { color: '#FFD600', glow: 'rgba(255,214,0,0.15)' },
  green:   { color: '#00FF8C', glow: 'rgba(0,255,140,0.15)' },
}

const accentColor = computed(() => colorMap[props.color].color)
const glowBg = computed(() => `radial-gradient(circle at center, ${colorMap[props.color].glow} 0%, transparent 70%)`)
</script>

<style scoped>
.tool-card {
  @apply relative overflow-hidden rounded-2xl border border-mx-border flex items-start gap-4 p-5 transition-all duration-300;
  background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
  position: relative;
}
.tool-card:hover {
  transform: translateY(-3px);
  border-color: rgba(255,255,255,0.14);
}
.tool-glow {
  position: absolute; inset: 0; pointer-events: none;
  transition: opacity 0.3s;
  opacity: 0;
}
.tool-card:hover .tool-glow { opacity: 1; }

.tool-icon {
  @apply flex-shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center;
  background: rgba(255,255,255,0.04);
}
.tool-arrow {
  @apply flex-shrink-0 self-center opacity-0 translate-x-[-4px] transition-all duration-200;
}
.tool-card:hover .tool-arrow {
  @apply opacity-100 translate-x-0;
}
</style>
