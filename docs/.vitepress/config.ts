import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'React Hooks by AKG',
  description: 'Complete React Hooks learning resource by AKG - Concise notes + runnable examples',
  lang: 'en-US',
  lastUpdated: true,
  cleanUrls: true,
  base: '/react-hooks/', // This should match your GitHub repository name
  head: [
    // Enhanced favicon and icons
    ['link', { rel: 'icon', href: '/favicon.png', sizes: '32x32' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }],
    
    // Enhanced SEO meta tags
    ['meta', { name: 'keywords', content: 'React, Hooks, useState, useEffect, JavaScript, TypeScript, Frontend, Web Development, Tutorial, AKG' }],
    ['meta', { name: 'author', content: 'AKG (Ayush Gupta)' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    
    // Open Graph / Social Media
    ['meta', { property: 'og:title', content: 'React Hooks by AKG - Complete Learning Resource' }],
    ['meta', { property: 'og:description', content: 'Master React Hooks with AKG\'s comprehensive notes, practical examples, and interactive demos. Perfect for interviews and learning.' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://ayush-gupta07.github.io/react-hooks/' }],
    ['meta', { property: 'og:image', content: 'https://ayush-gupta07.github.io/react-hooks/og-image.png' }],
    
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'React Hooks by AKG' }],
    ['meta', { name: 'twitter:description', content: 'Master React Hooks with AKG\'s practical examples and concise notes' }],
    ['meta', { name: 'twitter:image', content: 'https://ayush-gupta07.github.io/react-hooks/twitter-image.png' }],
    
    // Performance and PWA hints
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    
    // Enhanced viewport for better mobile experience
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
  ],

  themeConfig: {
    logo: { src: '/logo.svg', alt: 'React Hooks by AKG', width: 24, height: 24 }, 
    siteTitle: 'React Hooks by AKG',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Hooks Guide', link: '/hooks/' },
      { text: 'AKG', link: 'https://github.com/ayush-gupta07' }
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ayush-gupta07' },
    ],
    
    sidebar: {
      '/hooks/': [
        { 
          text: 'Overview', 
          link: '/hooks/',
          items: []
        },
        { 
          text: '🎯 Core Hooks', 
          collapsed: false,
          items: [
            { text: 'useState', link: '/hooks/01_useState' },
            { text: 'useEffect', link: '/hooks/02_useEffect' },
            { text: 'useLayoutEffect', link: '/hooks/03_useLayout' },
            { text: 'useRef', link: '/hooks/04_useRef' },
            { text: 'useContext', link: '/hooks/05_useContext' },
            { text: 'useReducer', link: '/hooks/06_useReducer' },
          ]
        },
        { 
          text: '⚡ Performance & Optimization', 
          collapsed: false,
          items: [
            { text: 'useMemo', link: '/hooks/07_useMemo' },
            { text: 'useCallback', link: '/hooks/08_useCallback' },
            { text: 'useId', link: '/hooks/10_useid' },
          ]
        },
        { 
          text: '🔧 Advanced & Imperative', 
          collapsed: false,
          items: [
            { text: 'useImperativeHandle', link: '/hooks/09_useImperativeHandle' },
            { text: 'useTransition', link: '/hooks/11_useTransition' },
            { text: 'useDeferredValue', link: '/hooks/12_useDeferredValue' },
          ]
        },
        { 
          text: '🆕 React 19 Form Hooks', 
          collapsed: false,
          items: [
            { text: 'useActionState', link: '/hooks/13_useActionState' },
            { text: 'useFormStatus', link: '/hooks/14_useFormStatus' },
            { text: 'useOptimistic', link: '/hooks/15_useOptimistic' },
          ]
        },
        { 
          text: '🛠️ Custom Hooks', 
          link: '/hooks/16_customHooks',
          items: []
        }
      ],
    },
    
    // Enhanced outline configuration
    outline: { 
      level: [2, 3], 
      label: 'On this page' 
    },
    
    // Enhanced search
    search: { 
      provider: 'local'
    },
    
    // Enhanced footer
    footer: {
      message: 'Made with ❤️ by AKG using VitePress • Learn React Hooks with confidence',
      copyright: '© 2025 AKG (Ayush Kumar Gupta) • Open source learning resource'
    },
    
    // Edit link configuration
    editLink: {
      pattern: 'https://github.com/ayush-gupta07/react-hooks/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    
    // Last updated configuration
    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    
    // Enhanced navigation
    docFooter: {
      prev: 'Previous Hook',
      next: 'Next Hook'
    },
    
    // Return to top
    returnToTopLabel: 'Return to top',
    
    // Dark mode toggle
    darkModeSwitchLabel: 'Appearance',
    lightModeSwitchTitle: 'Switch to light theme',
    darkModeSwitchTitle: 'Switch to dark theme'
  }
})