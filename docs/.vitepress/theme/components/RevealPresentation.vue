<script setup lang="ts">
/* eslint-disable no-undef */
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

interface RevealInstance {
  initialize: (config?: RevealConfig) => Promise<void>
  destroy: () => void
}

interface RevealConfig {
  embedded?: boolean
  width?: number | string
  height?: number | string
  margin?: number
  controls?: boolean
  progress?: boolean
  slideNumber?: boolean
  hash?: boolean
  center?: boolean
  transition?: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom'
  [key: string]: unknown
}

declare global {
  interface Window {
    Reveal?: {
      new (element: HTMLElement): RevealInstance
    }
  }
}

const props = withDefaults(defineProps<{
  theme?: 'black' | 'white' | 'league' | 'beige' | 'sky' | 'night' | 'serif' | 'simple' | 'solarized' | 'moon'
  transition?: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom'
  controls?: boolean
  progress?: boolean
  slideNumber?: boolean
  hash?: boolean
  center?: boolean
  width?: number | string
  height?: number | string
  backgroundImage?: string
  backgroundSize?: string
  backgroundPosition?: string
  backgroundRepeat?: string
  backgroundOpacity?: number
}>(), {
  theme: 'white',
  transition: 'slide',
  controls: true,
  progress: true,
  slideNumber: true,
  hash: true,
  center: true,
  width: 1600,
  height: 1100,
  backgroundImage: '',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundOpacity: 1
})

const revealEl = ref<HTMLElement | null>(null)
const isFullscreen = ref(false)
let revealInstance: RevealInstance | null = null

const enterFullscreen = () => {
  const container = revealEl.value?.parentElement
  if (!container) return

  if (container.requestFullscreen) {
    container.requestFullscreen()
  } else if ((container as HTMLElement & { webkitRequestFullscreen?: () => void }).webkitRequestFullscreen) {
    (container as HTMLElement & { webkitRequestFullscreen: () => void }).webkitRequestFullscreen()
  } else if ((container as HTMLElement & { msRequestFullscreen?: () => void }).msRequestFullscreen) {
    (container as HTMLElement & { msRequestFullscreen: () => void }).msRequestFullscreen()
  }
}

const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.head.appendChild(script)
  })
}

const loadStylesheet = (href: string): void => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
}

onMounted(async () => {
  // Ensure we're in the browser
  if (typeof window === 'undefined') return

  // Listen for fullscreen changes
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.addEventListener('msfullscreenchange', handleFullscreenChange)

  try {
    // Load Reveal.js CSS
    loadStylesheet('https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.css')
    loadStylesheet(`https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/theme/${props.theme}.css`)

    // Load Reveal.js script
    await loadScript('https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.js')

    // Wait for next tick and a bit more for DOM and styles to be ready
    await nextTick()
    await new Promise(resolve => window.setTimeout(resolve, 200))

    // Apply background attributes to all slides if background props are provided
    if (revealEl.value && props.backgroundImage) {
      const slides = revealEl.value.querySelectorAll('.slides > section')
      slides.forEach((slide) => {
        if (!slide.hasAttribute('data-background-image')) {
          slide.setAttribute('data-background-image', props.backgroundImage)
        }
        if (!slide.hasAttribute('data-background-size')) {
          slide.setAttribute('data-background-size', props.backgroundSize)
        }
        if (!slide.hasAttribute('data-background-position')) {
          slide.setAttribute('data-background-position', props.backgroundPosition)
        }
        if (!slide.hasAttribute('data-background-repeat')) {
          slide.setAttribute('data-background-repeat', props.backgroundRepeat)
        }
        if (!slide.hasAttribute('data-background-opacity')) {
          slide.setAttribute('data-background-opacity', String(props.backgroundOpacity))
        }
      })
    }

    // Initialize Reveal.js
    if (window.Reveal && revealEl.value) {
      console.log('Initializing Reveal.js...', revealEl.value)
      console.log('Slides found:', revealEl.value.querySelectorAll('section').length)

      revealInstance = new window.Reveal(revealEl.value)
      await revealInstance.initialize({
        embedded: true,
        width: props.width,
        height: props.height,
        margin: 0.04,
        controls: props.controls,
        progress: props.progress,
        slideNumber: props.slideNumber,
        hash: props.hash,
        center: props.center,
        transition: props.transition
      })
      console.log('Reveal.js initialized successfully')
    } else {
      console.error('Reveal.js not loaded or element not found', {
        hasReveal: !!window.Reveal,
        hasElement: !!revealEl.value
      })
    }
  } catch (error) {
    console.error('Error initializing Reveal.js:', error)
  }
})

onUnmounted(() => {
  // Remove fullscreen listeners
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.removeEventListener('msfullscreenchange', handleFullscreenChange)

  // Destroy Reveal instance
  if (revealInstance) {
    revealInstance.destroy()
  }
})
</script>

<template>
  <div class="reveal-container">
    <button
      v-if="!isFullscreen"
      class="fullscreen-button"
      aria-label="Show presentation"
      title="Show presentation (F)"
      @click="enterFullscreen"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
      Show presentation
    </button>
    <div
      ref="revealEl"
      class="reveal"
    >
      <div class="slides">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.reveal-container {
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;
  position: relative;
}

.fullscreen-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #333;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.fullscreen-button:hover {
  background: #333;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.fullscreen-button:active {
  transform: translateY(0);
}

.fullscreen-button svg {
  flex-shrink: 0;
}

/* Ensure Reveal.js takes full width */
.reveal {
  width: 100%;
  min-height: 600px;
}

/* Add padding to all slides for better spacing */
.reveal .slides section {
  padding-bottom: 3rem;
}

/* Remove borders and top spacing from headings in slides */
.reveal-container .reveal h1,
.reveal-container .reveal h2 {
  border: none !important;
  margin-top: 0 !important;
  padding-top: 0 !important;
}

/* Background is now applied directly to slides via data attributes */
.reveal {
  position: relative;
}

/* Fullscreen mode fixes */
.reveal-container:fullscreen {
  background: white;
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
}

.reveal-container:fullscreen .reveal {
  width: 100%;
  height: 100%;
}

/* Webkit browsers (Safari, older Chrome) */
.reveal-container:-webkit-full-screen {
  background: white;
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
}

.reveal-container:-webkit-full-screen .reveal {
  width: 100%;
  height: 100%;
}

/* Microsoft Edge */
.reveal-container:-ms-fullscreen {
  background: white;
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
}

.reveal-container:-ms-fullscreen .reveal {
  width: 100%;
  height: 100%;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .reveal-container {
    min-height: 400px;
  }
}
</style>
