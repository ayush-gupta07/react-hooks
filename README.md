# 🎯 React Hooks - Complete Learning Resource

> **A comprehensive learning resource for React Hooks with beautiful documentation, practical examples, and interactive demos. Perfect for developers preparing for interviews or mastering React fundamentals.**

---

## 📖 Project Overview

This repository is a **dual-purpose learning platform** that combines:

1. **📚 Beautiful Documentation Site** - Built with VitePress featuring comprehensive notes on all React Hooks
2. **⚛️ Interactive React Application** - Built with Vite + React 19 + TypeScript for hands-on examples

### 🎯 Purpose & Goals

- **Educational Resource**: Master all React Hooks from basic to advanced
- **Interview Preparation**: Concise notes with common Q&A patterns
- **Practical Examples**: Runnable code examples for each hook
- **Modern Setup**: Latest React 19 features with TypeScript support
- **Beautiful UI**: Custom-styled documentation with responsive design

---

## 🚀 Quick Start

### Development

```bash
# Start React application (Interactive examples)
npm run dev
# → http://localhost:5173

# Start documentation site
npm run docs:dev
# → http://localhost:5174

# Run both simultaneously (recommended)
npm run dev & npm run docs:dev
```
---

## 📚 Documentation Features

### 📖 Content Structure

Each hook documentation includes:

- **📋 Quick Summary**: Concise overview with key points
- **🧠 Mental Model**: Conceptual understanding of how the hook works
- **🔑 Key Concepts**: Essential patterns and use cases
- **💻 Code Examples**: Practical, runnable examples with explanations
- **⚠️ Common Pitfalls**: What to avoid and why
- **✅ Best Practices**: Professional patterns and recommendations
- **❓ Interview Q&A**: Common interview questions with detailed answers

---

## 🔗 Quick Navigation - Direct Links to Hook Documentation

### 🎯 Core Hooks
| Hook | Description | Documentation Link |
|------|-------------|-------------------|
| `useState` | State management | [📄 useState.md](./docs/hooks/01_useState.md) |
| `useEffect` | Side effects & lifecycle | [📄 useEffect.md](./docs/hooks/02_useEffect.md) |
| `useLayoutEffect` | Synchronous DOM effects | [📄 useLayoutEffect.md](./docs/hooks/03_useLayout.md) |
| `useRef` | References & imperatives | [📄 useRef.md](./docs/hooks/04_useRef.md) |
| `useContext` | Context consumption | [📄 useContext.md](./docs/hooks/05_useContext.md) |
| `useReducer` | Complex state logic | [📄 useReducer.md](./docs/hooks/06_useReducer.md) |

### ⚡ Performance & Optimization
| Hook | Description | Documentation Link |
|------|-------------|-------------------|
| `useMemo` | Value memoization | [📄 useMemo.md](./docs/hooks/07_useMemo.md) |
| `useCallback` | Function memoization | [📄 useCallback.md](./docs/hooks/08_useCallback.md) |
| `useId` | Unique identifier generation | [📄 useId.md](./docs/hooks/10_useId.md) |

### 🔧 Advanced & Imperative
| Hook | Description | Documentation Link |
|------|-------------|-------------------|
| `useImperativeHandle` | Imperative APIs | [📄 useImperativeHandle.md](./docs/hooks/09_useImperativeHandle.md) |
| `useTransition` | Concurrent rendering | [📄 useTransition.md](./docs/hooks/11_useTransition.md) |
| `useDeferredValue` | Deferred updates | [📄 useDeferredValue.md](./docs/hooks/12_useDeferredValue.md) |

### 🆕 React 19 Form Hooks
| Hook | Description | Documentation Link |
|------|-------------|-------------------|
| `useActionState` | Form action state management | [📄 useActionState.md](./docs/hooks/13_useActionState.md) |
| `useFormStatus` | Form submission status | [📄 useFormStatus.md](./docs/hooks/14_useFormStatus.md) |
| `useOptimistic` | Optimistic UI updates | [📄 useOptimistic.md](./docs/hooks/15_useOptimistic.md) |

### 🛠️ Custom Hooks
| Topic | Description | Documentation Link |
|-------|-------------|-------------------|
| Custom Hooks | Patterns for reusable logic | [📄 customHooks.md](./docs/hooks/16_customHooks.md) |

### 📚 Additional Resources
| Resource | Description | Link |
|----------|-------------|------|
| Overview | All hooks with beautiful cards | [📄 Hooks Overview](./docs/hooks/index.md) |
| Homepage | Documentation site homepage | [📄 Homepage](./docs/index.md) |

---

## 🏗️ Repository Structure

```
react-hooks/
├── 📁 docs/                          # VitePress Documentation Site
│   ├── 📁 .vitepress/                # VitePress configuration
│   │   ├── 📄 config.ts              # Site config, navigation, SEO
│   │   └── 📁 theme/                 # Custom theme
│   │       ├── 📄 index.ts           # Theme entry point
│   │       └── 📄 custom.css         # Custom styling (cards, gradients, etc.)
│   ├── 📁 hooks/                     # Hook documentation
│   │   ├── 📄 index.md               # Hooks overview with beautiful cards
│   │   ├── 📄 01_useState.md         # State management hook
│   │   ├── 📄 02_useEffect.md        # Side effects hook
│   │   ├── 📄 03_useLayout.md        # Layout effect hook
│   │   ├── 📄 04_useRef.md           # Reference hook
│   │   ├── 📄 05_useContext.md       # Context consumption hook
│   │   ├── 📄 06_useReducer.md       # State reducer hook
│   │   ├── 📄 07_useMemo.md          # Memoization hook
│   │   ├── 📄 08_useCallback.md      # Callback memoization hook
│   │   ├── 📄 09_useImperativeHandle.md  # Imperative API hook
│   │   ├── 📄 10_useId.md            # Unique ID generation hook
│   │   ├── 📄 11_useTransition.md    # Concurrent rendering hook
│   │   ├── 📄 12_useDeferredValue.md # Deferred value hook
│   │   ├── 📄 13_useActionState.md   # Form action state hook (React 19)
│   │   ├── 📄 14_useFormStatus.md    # Form status hook (React 19)
│   │   ├── 📄 15_useOptimistic.md    # Optimistic updates hook (React 19)
│   │   └── 📄 16_customHooks.md      # Custom hooks patterns
│   ├── 📁 public/                    # Static assets for docs
│   │   └── 📄 logo.svg               # React logo
│   └── 📄 index.md                   # Homepage with hero section
├── 📁 src/                           # React Application Source
│   ├── 📁 hooks/                     # Hook implementations & examples
│   │   └── 📁 useState/              # useState examples
│   │       ├── 📄 UseState.tsx       # Main useState component
│   │       └── 📁 examples/          # Practical examples
│   │           ├── 📄 CounterBasic.tsx    # Basic counter
│   │           └── 📄 LazyInit.tsx        # Lazy initialization
│   ├── 📄 App.tsx                    # Main React application
│   ├── 📄 App.css                    # Application styles
│   ├── 📄 main.tsx                   # React app entry point
│   ├── 📄 index.css                  # Global styles
│   └── 📄 vite-env.d.ts             # Vite type definitions
├── 📁 public/                        # React app static assets
│   └── 📄 vite.svg                   # Vite logo
├── 📄 package.json                   # Dependencies & scripts
├── 📄 vite.config.ts                 # Vite configuration
├── 📄 tsconfig.json                  # TypeScript configuration
├── 📄 tsconfig.app.json              # App-specific TypeScript config
├── 📄 tsconfig.node.json             # Node.js TypeScript config
├── 📄 eslint.config.js               # ESLint configuration
├── 📄 index.html                     # React app HTML template
└── 📄 README.md                      # This file
```

---

## 👨‍💻 Author

**Ayush Gupta**
- GitHub: [@ayush-gupta07](https://github.com/ayush-gupta07)
- LinkedIn: [ayushgupta001](https://www.linkedin.com/in/ayushgupta001/)

---

<div align="center">

**Made with ❤️ for the React community**

*Star ⭐ this repository if it helped you learn React Hooks!*

</div>
