import DefaultTheme from 'vitepress/theme'
import './custom.css'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import Footer from './components/Footer.vue'
import NotFound from './components/NotFound.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // App level enhancements can be added here
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(Footer),
      'not-found': () => h(NotFound)
    })
  }
} satisfies Theme
