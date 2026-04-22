<template>
  <div :class="cn('flex h-10 w-full items-center rounded-md border border-input bg-background px-3 text-sm ring-offset-background transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2', className)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils'

interface Props {
  className?: string
}

withDefaults(defineProps<Props>(), {
  className: '',
})
</script>
