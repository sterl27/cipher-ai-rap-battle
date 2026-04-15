<template>
  <p :class="['text-sm', className]">
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
