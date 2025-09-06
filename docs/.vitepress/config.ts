import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'React Hooks Notes',
  description: 'Concise notes + runnable examples (Vite + VitePress)',
  lang: 'en-US',
  lastUpdated: true,
  head: [
    // favicon (drop a 32x32 png at docs/public/favicon.png if you want)
    ['link', { rel: 'icon', href: '/favicon.png' }],
    // social/seo basics (optional)
    ['meta', { property: 'og:title', content: 'React Hooks Notes' }],
    ['meta', { property: 'og:description', content: 'Concise notes + runnable examples' }],
  ],

  themeConfig: {
    logo: { src: '/logo.svg', alt: 'Hooks' }, 
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Hooks', link: '/hooks/' },
      { text: 'Repo', link: 'https://github.com/ayush-gupta07' } 
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ayush-gupta07' },
    ],
    sidebar: {
      '/hooks/': [
        { text: 'Overview', link: '/hooks/' },
        { text: 'Core', items: [
          { text: 'useState', link: '/hooks/01_useState' },
          { text: 'useEffect', link: '/hooks/02_useEffect' },
          { text: 'useLayoutEffect', link: '/hooks/03_useLayout' },
          { text: 'useRef', link: '/hooks/04_useRef' },
          { text: 'useContext', link: '/hooks/05_useContext' },
          { text: 'useReducer', link: '/hooks/06_useReducer' },
        ]},
        { text: 'Memoization & Perf', items: [
          { text: 'useMemo', link: '/hooks/07_useMemo' },
          { text: 'useCallback', link: '/hooks/08_useCallback' },
          { text: 'useId', link: '/hooks/10_useid' },
        ]},
        { text: 'Imperative & RSC', items: [
          { text: 'useImperativeHandle', link: '/hooks/09_useImperativeHandle' },
          { text: 'useTransition', link: '/hooks/11_useTransition' },
          { text: 'useDeferredValue', link: '/hooks/12_useDeferredValue' },
        ]},
        { text: 'Forms (React 19)', items: [
          { text: 'useActionState', link: '/hooks/13_useActionState' },
          { text: 'useFormStatus', link: '/hooks/14_useFormStatus' },
          { text: 'useOptimistic', link: '/hooks/15_useOptimistic' },
        ]},
        { text: 'Custom Hooks', link: '/hooks/16_customHooks' }
      ],
    },
    outline: { level: [2, 3], label: 'On this page' },
    search: { provider: 'local' },
    footer: {
      message: 'Made with ❤️ using VitePress',
      copyright: '© 2025 Ayush Gupta'
    }
  }
})