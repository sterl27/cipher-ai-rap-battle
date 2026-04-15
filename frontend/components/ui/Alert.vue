<template>
  <div
    :class="[
      'rounded-lg border border-input/30 bg-background p-4',
      className,
    ]"
    role="alert"
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
