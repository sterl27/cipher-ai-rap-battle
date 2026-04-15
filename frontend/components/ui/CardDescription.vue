<template>
  <p :class="['text-sm md:text-base text-muted-foreground/80 leading-relaxed', className]">
    <slot />
  </p>
</template>

<script setup lang="ts">
interface Props {
  className?: string
}

withDefaults(defineProps<Props>(), {
  className: '',
})
</script>
