<template>
  <div :class="['inline-flex items-center text-xs font-medium px-2 py-1 rounded-md bg-secondary text-secondary-foreground', className]">
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
