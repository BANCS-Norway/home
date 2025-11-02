<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  blurred?: boolean
  revealed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  blurred: false,
  revealed: false,
})

const outerContainerClasses = computed(() => [
  'relative my-8',
  {
    'animate-reveal': props.revealed,
  }
])

const contentClasses = computed(() => [
  'p-8 rounded-lg border-2 border-gray-200 bg-gray-50',
  {
    'blur-[5px] select-none pointer-events-none': props.blurred,
  }
])

const badgeClasses = computed(() => [
  'absolute -top-3 right-5 bg-emerald-500 text-white px-4 py-1 rounded text-xs font-bold tracking-wide z-20',
  {
    'hidden': !props.revealed
  }
])
</script>

<template>
  <div :class="outerContainerClasses">
    <!-- "JUST PUBLISHED" badge for revealed posts -->
    <div :class="badgeClasses">
      JUST PUBLISHED
    </div>

    <!-- Stamp slot (rendered outside blurred content) -->
    <slot name="stamp"></slot>

    <!-- Content wrapper with blur -->
    <div :class="contentClasses">
      <slot></slot>
    </div>
  </div>
</template>
