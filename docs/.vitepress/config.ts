import { defineConfig } from 'vitepress'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { codeSnippetsPlugin } from './plugins/codeSnippets'

const __dirname = dirname(fileURLToPath(import.meta.url))
const __root = join(__dirname, '../..')
const packageJson = JSON.parse(
  readFileSync(join(__dirname, '../../package.json'), 'utf-8')
)

export default defineConfig({
  title: 'BANCS',
  description: 'Professional software development and consulting',
  base: '/',

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/bancs.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap', rel: 'stylesheet' }]
  ],

  themeConfig: {
    logo: '/bancs.png',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Projects', link: '/projects' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Contact', link: '/contact' }
    ],

    sidebar: {
      '/blog/': [
        {
          text: 'Blog Posts',
          items: [
            { text: 'All Posts', link: '/blog/' },
            // Blog posts will be added here
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/BANCS-Norway' },
      { icon: 'linkedin', link: 'https://linkedin.com/in/virtueme' }
    ],

    footer: {
      message: `Built with VitePress and Tailwind CSS • Developed with Claude by Anthropic • v${packageJson.version}`,
      copyright: `Copyright © ${new Date().getFullYear()} BANCS`
    },

    search: {
      provider: 'local'
    }
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  },

  vite: {
    css: {
      postcss: './postcss.config.js'
    },
    plugins: [
      codeSnippetsPlugin({ root: __root })
    ]
  }
})
