<template>
  <h2 :class="['text-lg font-semibold', className]">
    <slot />
  </h2>
</template>

<script setup lang="ts">
interface Props {
  className?: string
}

withDefaults(defineProps<Props>(), {
  className: '',
})
</script>
