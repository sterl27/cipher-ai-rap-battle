<template>
  <div
    :class="cn(alertVariants({ variant }), className)"
    role="alert"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { cn } from '~/lib/utils'

interface Props {
  variant?: 'default' | 'destructive'
  className?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  className: '',
})

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'border-destructive/50 text-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)
</script>
