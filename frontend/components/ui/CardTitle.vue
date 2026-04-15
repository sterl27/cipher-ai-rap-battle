<template>
  <h1 :class="['text-2xl md:text-3xl font-bold tracking-tight', className]">
    <slot />
  </h1>
</template>

<script setup lang="ts">
interface Props {
  className?: string
}

withDefaults(defineProps<Props>(), {
  className: '',
})
</script>
