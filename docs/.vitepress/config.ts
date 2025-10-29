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
  title: 'BANCS AS',
  description: 'Professional software development and consulting',
  base: '/',
  ignoreDeadLinks: [
    // Example READMEs reference files outside docs/ (LICENSE, CONTRIBUTING.md, etc.)
    // These are meant for developers viewing in the repo, not the built site
    /\/LICENSE$/,
    /\/CONTRIBUTING$/,
    /\.vitepress\/plugins\/README$/,
  ],

  head: [
    ['link', { rel: 'icon', type: 'image/webp', href: '/bancs.webp' }],
    ['link', { rel: 'alternate icon', type: 'image/png', href: '/bancs.png' }],
    // Security headers (meta tag fallback - GitHub Pages doesn't support custom HTTP headers)
    // Note: X-Frame-Options removed - it has no effect when set via meta tag (must be HTTP header)
    ['meta', {
      'http-equiv': 'Content-Security-Policy',
      content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none';"
    }],
    ['meta', { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' }],
    ['meta', { 'http-equiv': 'Referrer-Policy', content: 'strict-origin-when-cross-origin' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap', rel: 'stylesheet', media: 'print', onload: "this.media='all'" }],
    ['noscript', {}, '<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">'],
    [
      'script',
      { defer: '' },
      `
      // Fix VitePress theme toggle accessibility
      (function() {
        if (typeof window === 'undefined') return;

        function addAriaLabel() {
          const themeToggle = document.querySelector('.VPSwitchAppearance');
          if (themeToggle) {
            themeToggle.setAttribute('aria-label', 'Toggle dark mode');
            themeToggle.setAttribute('title', 'Toggle dark mode');
          } else {
            // Retry if not found
            setTimeout(addAriaLabel, 100);
          }
        }

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', addAriaLabel);
        } else {
          addAriaLabel();
        }
      })();
      `
    ]
  ],

  themeConfig: {
    logo: {
      src: '/bancs.webp',
      alt: 'BANCS Logo'
    },
    siteTitle: 'BANCS AS',

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
      { icon: 'github', link: 'https://github.com/BANCS-Norway', ariaLabel: 'Visit BANCS on GitHub' },
      { icon: 'linkedin', link: 'https://linkedin.com/in/virtueme', ariaLabel: 'Connect with BANCS on LinkedIn' }
    ],

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
    ],
    resolve: {
      alias: [
        {
          find: /^.*\/VPNavBarTitle\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/BancsNavBarTitle.vue', import.meta.url)
          )
        }
      ]
    },
    build: {
      // Increase chunk size warning limit (VitePress bundles can be large)
      chunkSizeWarningLimit: 1000,
      // Enable CSS code splitting for better caching
      cssCodeSplit: true
    }
  }
})
