<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  src?: string
  alt: string
  blurred?: boolean
  gradient?: 'crystal' | 'workflow' | 'collective'
}

const props = withDefaults(defineProps<Props>(), {
  blurred: false,
  gradient: 'crystal'
})

// Gradient backgrounds for placeholder images
const gradientClasses = computed(() => {
  switch (props.gradient) {
    case 'crystal':
      return 'bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950'
    case 'workflow':
      return 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900'
    case 'collective':
      return 'bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900'
    default:
      return 'bg-gradient-to-br from-gray-800 to-gray-900'
  }
})

const containerClasses = computed(() => [
  'w-full h-64 md:h-80 rounded-lg mb-8 overflow-hidden',
  {
    'blur-md': props.blurred
  }
])

const imageClasses = computed(() => [
  'w-full h-full object-cover',
  {
    'blur-md': props.blurred
  }
])
</script>

<template>
  <div :class="containerClasses">
    <!-- Real image if src provided -->
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      :class="imageClasses"
      loading="lazy"
    />

    <!-- Gradient placeholder if no src -->
    <div
      v-else
      :class="[gradientClasses, 'w-full h-full flex items-center justify-center']"
    >
      <div class="text-center text-white/50 font-mono text-sm px-4">
        {{ alt }}
      </div>
    </div>
  </div>
</template>
