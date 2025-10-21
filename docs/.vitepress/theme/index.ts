import DefaultTheme from 'vitepress/theme'
import './custom.css'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // App level enhancements can be added here
  }
} satisfies Theme
