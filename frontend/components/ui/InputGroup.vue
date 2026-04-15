<template>
  <div
    :class="[
      'rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center',
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
