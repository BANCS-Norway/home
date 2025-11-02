/**
 * Custom VitePress Theme Configuration
 *
 * This demonstrates how to extend the default VitePress theme
 * with custom components and styling.
 */

import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'

// Custom Vue components (can be added as needed)
// import CustomButton from './components/CustomButton.vue'
// import CodeExample from './components/CodeExample.vue'

/**
 * BANCS Color Palette
 * Based on the design system from ../design/color-palettes.md
 */
export const bancsColors = {
  // Primary colors from logo
  dark: '#0f172a',        // slate-900
  darkAlt: '#1e1b4b',     // indigo-950
  accent: '#6366f1',      // indigo-500
  accentAlt: '#8b5cf6',   // purple-500
  light: '#ffffff',
  text: '#e2e8f0',        // slate-200

  // Extended palette
  cyan: '#06b6d4',        // cyan-500
  purple: '#8b5cf6',      // purple-500

  // UI colors
  bgLight: '#f8fafc',
  bgDark: '#0f172a',
  borderLight: '#e5e7eb',
  borderDark: '#334155',
}

/**
 * Custom theme enhancement
 */
export default {
  extends: DefaultTheme,

  enhanceApp({ app, router }) {
    // Register custom global components
    // app.component('CustomButton', CustomButton)
    // app.component('CodeExample', CodeExample)

    // Add global properties
    app.config.globalProperties.$bancsColors = bancsColors

    // Router hooks
    router.onBeforeRouteChange = (to) => {
      console.log('Navigating to:', to)
      // Analytics tracking can be added here
    }

    router.onAfterRouteChanged = (_to) => {
      // Scroll to top on route change
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0)
      }
    }
  }
} satisfies Theme

/**
 * Type augmentation for global properties
 */
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $bancsColors: typeof bancsColors
  }
}

/**
 * Custom CSS Variables Setup
 * These are applied in custom.css but defined here for reference
 */
export const cssVariables = {
  light: {
    '--vp-c-brand': bancsColors.accent,
    '--vp-c-brand-light': bancsColors.accentAlt,
    '--vp-c-bg': bancsColors.light,
    '--vp-c-bg-alt': bancsColors.bgLight,
    '--vp-c-text-1': bancsColors.dark,
  },
  dark: {
    '--vp-c-brand': bancsColors.accent,
    '--vp-c-brand-light': bancsColors.accentAlt,
    '--vp-c-bg': bancsColors.bgDark,
    '--vp-c-bg-alt': bancsColors.darkAlt,
    '--vp-c-text-1': bancsColors.text,
  }
}

/**
 * Utility function to generate gradient backgrounds
 */
export function generateGradient(
  color1: string,
  color2: string,
  angle: number = 135
): string {
  return `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`
}

/**
 * Example: Custom button gradient
 */
export const buttonGradient = generateGradient(
  bancsColors.accent,
  bancsColors.accentAlt
)

/**
 * Example: Hero section gradient
 */
export const heroGradient = generateGradient(
  bancsColors.dark,
  bancsColors.darkAlt
)
