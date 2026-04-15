<template>
  <textarea
    :class="[
      'flex min-h-[100px] w-full rounded-lg border border-input/40 bg-background px-3.5 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none',"
      className,
    ]"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
interface Props {
  className?: string
}

withDefaults(defineProps<Props>(), {
  className: '',
})
</script>
