import DefaultTheme from 'vitepress/theme'
import './custom.css'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import LayoutWithMain from './LayoutWithMain.vue'
import Footer from './components/Footer.vue'
import NotFound from './components/NotFound.vue'
import ProjectCard from './components/ProjectCard.vue'
import BlogCard from './components/BlogCard.vue'
import CustomButton from './components/CustomButton.vue'
import DisclaimerBox from './components/DisclaimerBox.vue'
import GradientCTA from './components/GradientCTA.vue'
import BlogHeading from './components/BlogHeading.vue'
import InfoSection from './components/InfoSection.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(LayoutWithMain, null, {
      'layout-bottom': () => h(Footer),
      'not-found': () => h(NotFound)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // Register global components
    app.component('ProjectCard', ProjectCard)
    app.component('BlogCard', BlogCard)
    app.component('CustomButton', CustomButton)
    app.component('DisclaimerBox', DisclaimerBox)
    app.component('GradientCTA', GradientCTA)
    app.component('BlogHeading', BlogHeading)
    app.component('InfoSection', InfoSection)
  }
} satisfies Theme
