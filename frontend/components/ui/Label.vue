<template>
  <label
    :class="[
      'text-xs md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className,
    ]"
    v-bind="$attrs"
  >
    <slot />
  </label>
</template>

<script setup lang="ts">
interface Props {
  className?: string
}

withDefaults(defineProps<Props>(), {
  className: '',
})
</script>
