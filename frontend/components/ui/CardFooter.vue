<template>
  <div :class="['px-6 py-4 border-t border-input', className]">
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
