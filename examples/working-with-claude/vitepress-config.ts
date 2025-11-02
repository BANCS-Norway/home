/**
 * Complete VitePress Configuration Example
 *
 * This file demonstrates a production-ready VitePress configuration
 * with TypeScript, custom theme, and optimal settings.
 */

import { defineConfig } from 'vitepress'

export default defineConfig({
  // Site metadata
  title: 'BANCS',
  description: 'Professional software development and consulting',
  base: '/',

  // HTML head configuration
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/bancs.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', {
      href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap',
      rel: 'stylesheet'
    }],
    // Open Graph metadata for social sharing
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'BANCS - Professional Software Development' }],
    ['meta', { property: 'og:description', content: 'Building tomorrow\'s solutions today' }],
  ],

  // Theme configuration
  themeConfig: {
    logo: '/bancs.png',

    // Navigation menu
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Projects', link: '/projects' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Contact', link: '/contact' }
    ],

    // Sidebar configuration
    sidebar: {
      '/blog/': [
        {
          text: 'Blog Posts',
          items: [
            { text: 'All Posts', link: '/blog/' },
            { text: 'Working with Claude', link: '/blog/working-with-claude' },
          ]
        },
        {
          text: 'Topics',
          items: [
            { text: 'AI & ML', link: '/blog/topics/ai' },
            { text: 'Web Development', link: '/blog/topics/web-dev' },
          ]
        }
      ]
    },

    // Social links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/bancs' },
      { icon: 'linkedin', link: 'https://linkedin.com/company/bancs' }
    ],

    // Footer
    footer: {
      message: 'Built with VitePress and Tailwind CSS',
      copyright: `Copyright © ${new Date().getFullYear()} BANCS`
    },

    // Search
    search: {
      provider: 'local',
      options: {
        detailedView: true
      }
    },

    // Edit link
    editLink: {
      pattern: 'https://github.com/BANCS-Norway/home/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    // Last updated timestamp
    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    }
  },

  // Markdown configuration
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true,

    // Code block configuration
    config: (_md) => {
      // Custom markdown-it plugins can be added here
    }
  },

  // Vite configuration
  vite: {
    css: {
      postcss: './postcss.config.js'
    },
    build: {
      chunkSizeWarningLimit: 1000
    }
  },

  // Build hooks
  async buildEnd(_siteConfig) {
    // Custom build logic can be added here
    console.log('Build completed successfully!')
  }
})
