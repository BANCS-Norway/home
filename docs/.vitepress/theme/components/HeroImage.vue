<script setup lang="ts">
/**
 * HeroImage Component
 *
 * Displays hero images with automatic responsive image support.
 * Follows naming conventions to generate picture elements with WebP and @2x variants.
 *
 * Convention:
 * - Base image: /path/to/image.jpg
 * - WebP variant: /path/to/image.webp
 * - Retina JPEG: /path/to/image@2x.jpg
 * - Retina WebP: /path/to/image@2x.webp
 *
 * The component automatically generates a <picture> element with all variants.
 * Browser gracefully falls back if variants don't exist.
 *
 * @example
 * <HeroImage
 *   src="/images/blog/my-post.jpg"
 *   alt="Description"
 *   blurred
 * >
 *   <ImageAttribution author="..." />
 * </HeroImage>
 */
import { computed } from 'vue'

interface Props {
  /** Path to the base image file (e.g., /images/photo.jpg) */
  src?: string
  /** Alternative text for accessibility */
  alt: string
  /** Apply blur effect to the image */
  blurred?: boolean
  /** Gradient background for placeholder (when no src provided) */
  gradient?: 'crystal' | 'workflow' | 'collective'
}

const props = withDefaults(defineProps<Props>(), {
  blurred: false,
  gradient: 'crystal'
})

/**
 * Generate responsive image sources based on naming conventions.
 * Always generates responsive sources when src is provided.
 *
 * Convention:
 * - filename.jpg → filename.webp, filename@2x.jpg, filename@2x.webp
 */
const imageSources = computed(() => {
  if (!props.src) {
    return null
  }

  // Extract base path and extension
  const lastDotIndex = props.src.lastIndexOf('.')
  const basePath = props.src.substring(0, lastDotIndex)
  const ext = props.src.substring(lastDotIndex) // includes the dot

  return {
    webp: `${basePath}.webp`,
    webp2x: `${basePath}@2x.webp`,
    base: props.src,
    base2x: `${basePath}@2x${ext}`
  }
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
  'w-full h-64 md:h-80 rounded-lg overflow-hidden',
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
  <div class="mb-8">
    <div :class="containerClasses">
      <!-- Responsive picture element with WebP and @2x support -->
      <picture v-if="imageSources">
        <source
          :srcset="`${imageSources.webp} 1x, ${imageSources.webp2x} 2x`"
          type="image/webp"
        />
        <img
          :src="imageSources.base"
          :srcset="`${imageSources.base} 1x, ${imageSources.base2x} 2x`"
          :alt="alt"
          :class="imageClasses"
          loading="lazy"
        />
      </picture>

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

    <!-- Attribution slot -->
    <div v-if="$slots.default" class="text-xs text-gray-500 dark:text-gray-400 italic mt-2 text-center">
      <slot />
    </div>
  </div>
</template>
