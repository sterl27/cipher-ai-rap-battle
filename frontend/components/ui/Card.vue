<template>
  <div
    :class="[
      'rounded-xl border border-input/30 bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow',
      className,
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  className?: string
}

withDefaults(defineProps<Props>(), {
  className: '',
})
</script>
