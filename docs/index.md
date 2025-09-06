---
layout: home
title: React Hooks by AKG
hero:
  name: React Hooks
  text: "by AKG"
  tagline: "Master every React Hook • From basics to advanced patterns • Interactive examples • Interview-ready notes"
  image:
    src: /logo.svg
    alt: React Hooks by AKG
  actions:
    - theme: brand
      text: Start Learning →
      link: /hooks/
    - theme: alt
      text: View Examples
      link: https://github.com/ayush-gupta07/react-hooks
    - theme: alt
      text: Quick Reference
      link: /hooks/01_useState

features:
  - icon: ⚡
    title: Lightning Fast Learning
    details: Concise explanations with clear mental models. Each hook broken down into digestible concepts with real-world examples.
  
  - icon: 🧩
    title: Interactive Examples
    details: Runnable .tsx components for every hook. Import them into your Vite app and experiment hands-on.
  
  - icon: 🧠
    title: Interview Ready
    details: Common questions, gotchas, and best practices. Quick revision notes to ace your React interviews.
  
  - icon: 🆕
    title: React 19 Features
    details: Latest form hooks (useActionState, useFormStatus, useOptimistic) and concurrent features explained.
  
  - icon: 🎯
    title: Practical Patterns
    details: Custom hooks, performance optimization, and real-world patterns you'll actually use in production.
  
  - icon: 📱
    title: Modern & Responsive
    details: Beautiful documentation that works perfectly on all devices. Dark mode included.
---

<div class="home-content">

## 🚀 Quick Start

<div class="cards">
  <div class="card highlight-box">
    <h3>🌟 New to React Hooks?</h3>
    <p>Start with useState and useEffect to build a solid foundation</p>
    <a href="/hooks/01_useState">Begin with useState →</a>
  </div>
  
  <div class="card highlight-box success">
    <h3>💪 Ready for Advanced?</h3>
    <p>Dive into performance optimization and custom hooks</p>
    <a href="/hooks/07_useMemo">Explore Performance →</a>
  </div>
  
  <div class="card highlight-box warning">
    <h3>🔥 React 19 Features</h3>
    <p>Learn the newest form and concurrent features</p>
    <a href="/hooks/13_useActionState">Discover React 19 →</a>
  </div>
</div>

## 📚 Learning Path

<div class="learning-path">

### 🎯 **Phase 1: Foundation** (Essential)
Master these core hooks first - they're used in 90% of React applications.

- **[useState](/hooks/01_useState)** - Local component state
- **[useEffect](/hooks/02_useEffect)** - Side effects and lifecycle
- **[useRef](/hooks/04_useRef)** - DOM references and mutable values

### ⚡ **Phase 2: Intermediate** (Performance)
Level up with optimization and context management.

- **[useMemo](/hooks/07_useMemo)** - Expensive computation caching
- **[useCallback](/hooks/08_useCallback)** - Function reference stability
- **[useContext](/hooks/05_useContext)** - Global state without prop drilling

### 🚀 **Phase 3: Advanced** (Expert Level)
Master complex patterns and cutting-edge features.

- **[useReducer](/hooks/06_useReducer)** - Complex state management
- **[Custom Hooks](/hooks/16_customHooks)** - Reusable logic patterns
- **[React 19 Hooks](/hooks/13_useActionState)** - Modern form handling

</div>

## 🎨 Code Examples

Each hook comes with multiple examples you can run locally:

```bash
# Clone and run the examples
git clone https://github.com/ayush-gupta07/react-hooks
cd react-hooks
npm install
npm run dev
```

```tsx
// Example: Counter with useState
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}
```

## 🔗 Quick Reference

<div class="cards">
  <div class="card">
    <h3>State Management</h3>
    <p>useState, useReducer, useContext</p>
    <a href="/hooks/01_useState">Learn More →</a>
  </div>
  
  <div class="card">
    <h3>Side Effects</h3>
    <p>useEffect, useLayoutEffect</p>
    <a href="/hooks/02_useEffect">Learn More →</a>
  </div>
  
  <div class="card">
    <h3>Performance</h3>
    <p>useMemo, useCallback, useTransition</p>
    <a href="/hooks/07_useMemo">Learn More →</a>
  </div>
  
  <div class="card">
    <h3>React 19</h3>
    <p>useActionState, useFormStatus, useOptimistic</p>
    <a href="/hooks/13_useActionState">Learn More →</a>
  </div>
</div>

---

<div class="footer-note">
💡 **Tip**: This documentation is designed for active learning. Read the notes, then run the examples in your development environment for the best learning experience.
</div>

</div>

<style>
.home-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.learning-path {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
  border: 1px solid var(--card-border);
}

.learning-path h3 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--vp-c-brand-1);
}

.learning-path h3:first-of-type {
  margin-top: 0;
}

.footer-note {
  text-align: center;
  background: var(--brand-gradient-soft);
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 3rem 0;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .home-content {
    padding: 1rem;
  }
  
  .learning-path {
    padding: 1.5rem;
  }
}
</style>