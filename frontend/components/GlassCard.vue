<template>
  <div
    class="glass-card"
    :class="[
      glowColor && `glow-${glowColor}`,
      hoverable && 'cursor-pointer',
      padding,
    ]"
  >
    <!-- Top accent line -->
    <div v-if="accent" class="card-accent" :class="`accent-${accent}`" />
    <slot />
  </div>
</template>

<script setup lang="ts">
type GlowColor = 'cyan' | 'purple' | 'magenta' | 'gold'
type AccentColor = GlowColor

interface Props {
  glowColor?: GlowColor
  accent?: AccentColor
  hoverable?: boolean
  padding?: string
}

withDefaults(defineProps<Props>(), {
  padding: '',
})
</script>

<style scoped>
.glass-card { @apply relative overflow-hidden rounded-2xl border border-mx-border p-6; }
.glow-cyan:hover   { box-shadow: 0 0 30px rgba(0,234,255,0.2), 0 8px 32px rgba(0,0,0,0.4); }
.glow-purple:hover { box-shadow: 0 0 30px rgba(139,0,255,0.2), 0 8px 32px rgba(0,0,0,0.4); }
.glow-magenta:hover{ box-shadow: 0 0 30px rgba(255,0,122,0.2), 0 8px 32px rgba(0,0,0,0.4); }
.glow-gold:hover   { box-shadow: 0 0 30px rgba(255,214,0,0.2), 0 8px 32px rgba(0,0,0,0.4); }

.card-accent {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
}
.accent-cyan    { background: linear-gradient(90deg, transparent, #00EAFF, transparent); }
.accent-purple  { background: linear-gradient(90deg, transparent, #8B00FF, transparent); }
.accent-magenta { background: linear-gradient(90deg, transparent, #FF007A, transparent); }
.accent-gold    { background: linear-gradient(90deg, transparent, #FFD600, transparent); }
</style>
