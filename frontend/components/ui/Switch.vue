<template>
  <button
    type="button"
    :class="cn('peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50', modelValue ? 'bg-primary' : 'bg-input', className)"
    role="switch"
    :aria-checked="modelValue"
    :disabled="disabled"
    @click="!disabled && $emit('update:modelValue', !modelValue)"
    @keydown.space.prevent="!disabled && $emit('update:modelValue', !modelValue)"
  >
    <div
      :class="cn('pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform', modelValue ? 'translate-x-5' : 'translate-x-0')"
    />
  </button>
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils'

interface Props {
  modelValue?: boolean
  disabled?: boolean
  className?: string
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  className: '',
})

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>
