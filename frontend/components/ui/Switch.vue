<template>
  <div
    :class="[
      'inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      modelValue ? 'bg-primary' : 'bg-input',
      className,
    ]"
    role="switch"
    :aria-checked="modelValue"
    :tabindex="disabled ? -1 : 0"
    @click="!disabled && $emit('update:modelValue', !modelValue)"
    @keydown.space.prevent="!disabled && $emit('update:modelValue', !modelValue)"
  >
    <div
      :class="[
        'inline-block h-4 w-4 transform rounded-full bg-background transition-transform',
        modelValue ? 'translate-x-5' : 'translate-x-1',
      ]"
    />
  </div>
</template>

<script setup lang="ts">
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
