<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  date: string
  text?: string
  variant?: 'default' | 'banner' | 'minimal' | 'vintage'
  relative?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  text: 'WILL BE REVEALED',
  variant: 'default',
  relative: false,
})

// Base classes for all stamps
const positionType = props.relative ? 'absolute' : 'fixed'
const baseClasses = `${positionType} left-1/2 z-20 pointer-events-none text-center`
const topPosition = 'top-1/2'

// Variant-specific classes
const variantClasses = computed(() => {
  switch (props.variant) {
    case 'banner':
      return [
        baseClasses,
        topPosition,
        '-translate-x-1/2 -translate-y-1/2 -rotate-[15deg]',
        'bg-red-600 px-16 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.3)]',
      ].join(' ')

    case 'minimal':
      return [
        baseClasses,
        topPosition,
        '-translate-x-1/2 -translate-y-1/2',
        'border-4 border-gray-800 bg-white/[0.98] px-10 py-6 rounded',
      ].join(' ')

    case 'vintage':
      return [
        baseClasses,
        topPosition,
        '-translate-x-1/2 -translate-y-1/2 -rotate-[8deg]',
        'border-[5px] border-double border-[#8B4513] bg-[#FFF8DC] px-12 py-8',
        'shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]',
      ].join(' ')

    default: // 'default' red stamp
      return [
        baseClasses,
        topPosition,
        '-translate-x-1/2 -translate-y-1/2 -rotate-[15deg]',
        'border-[6px] border-red-600 rounded-xl px-12 py-8 bg-white/95',
        'shadow-[0_8px_32px_rgba(0,0,0,0.2)]',
        'ring-[3px] ring-red-600 ring-inset ring-offset-[-12px]',
      ].join(' ')
  }
})

// Text styling based on variant
const textClasses = computed(() => {
  const baseText = 'font-bold uppercase tracking-[2px] mb-2'

  switch (props.variant) {
    case 'banner':
      return `${baseText} font-mono text-3xl text-white md:text-2xl md:tracking-normal`
    case 'minimal':
      return `${baseText} text-3xl text-gray-800 md:text-2xl md:tracking-normal`
    case 'vintage':
      return `${baseText} text-3xl text-[#8B4513] md:text-2xl md:tracking-normal`
    default:
      return `${baseText} font-mono text-3xl text-red-600 md:text-2xl md:tracking-normal`
  }
})

const dateClasses = computed(() => {
  const baseDate = 'font-bold tracking-wide'

  switch (props.variant) {
    case 'banner':
      return `${baseDate} font-mono text-xl text-white md:text-base`
    case 'minimal':
      return `${baseDate} text-xl text-gray-800 md:text-base`
    case 'vintage':
      return `${baseDate} text-xl text-[#8B4513] md:text-base`
    default:
      return `${baseDate} font-mono text-xl text-red-600 md:text-base`
  }
})

// Responsive adjustments for mobile
const stampResponsiveClasses = computed(() => {
  if (props.variant === 'default') {
    return 'md:border-[4px] md:px-8 md:py-6 md:ring-[2px]'
  }
  return ''
})
</script>

<template>
  <div :class="[variantClasses, stampResponsiveClasses]">
    <div :class="textClasses">{{ text }}</div>
    <div :class="dateClasses">{{ date }}</div>
  </div>
</template>
