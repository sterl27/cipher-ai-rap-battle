<template>
  <span class="holo-badge" :class="sizeClass">
    <span v-if="dot" class="badge-dot" :class="`dot-${color}`" />
    <slot />
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  color?: 'cyan' | 'purple' | 'magenta' | 'gold' | 'green'
  size?:  'sm' | 'md'
  dot?:   boolean
}>()

const sizeClass = computed(() => props.size === 'sm' ? 'badge-sm' : 'badge-md')
</script>

<style scoped>
.holo-badge {
  @apply inline-flex items-center gap-1.5 font-mono tracking-wider border rounded-full;
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(8px);
}
.badge-sm { @apply px-2.5 py-0.5 text-xs; }
.badge-md { @apply px-3 py-1 text-sm; }

.badge-dot {
  @apply w-1.5 h-1.5 rounded-full animate-pulse;
}
.dot-cyan    { @apply bg-mx-cyan;    box-shadow: 0 0 6px #00EAFF; }
.dot-purple  { @apply bg-mx-purple;  box-shadow: 0 0 6px #8B00FF; }
.dot-magenta { @apply bg-mx-magenta; box-shadow: 0 0 6px #FF007A; }
.dot-gold    { @apply bg-mx-gold;    box-shadow: 0 0 6px #FFD600; }
.dot-green   { @apply bg-mx-green;   box-shadow: 0 0 6px #00FF8C; }
</style>
