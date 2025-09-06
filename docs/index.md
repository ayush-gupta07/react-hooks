---
layout: home
title: React Hooks Notes
hero:
  name: React Hooks Notes
  text: "Clear explanations. Practical examples. Interview-ready."
  tagline: "Study notes + runnable .tsx demos you can import into your Vite app."
  actions:
    - theme: brand
      text: Start with Hooks Overview →
      link: /hooks/
    - theme: alt
      text: Open the examples app
      link: https://github.com/your/repo#running-examples
features:
  - icon: ⚡
    title: Concise, Deep Notes
    details: Each hook page covers mental models, pitfalls, best practices, and interview Q&A.
  - icon: 🧩
    title: Runnable Examples
    details: Every hook has a set of .tsx demos—import them in app/src/App.tsx to practice.
  - icon: 🧠
    title: Interview Focused
    details: Quick refreshers and Q&A make revision easy before interviews.
  - icon: 🛠️
    title: Modern React (18/19)
    details: Includes React 19 form hooks (useActionState, useFormStatus, useOptimistic).
---

## Quick Start

```bash
# Run the examples app
npm run -w app dev

# Run docs (this site)
npm run docs:dev

---

# 4) Hooks Overview (cards + quick links)

**`docs/hooks/index.md`**
```md
# Hooks Overview

A curated map of everything in this repo. Click a hook to read notes; open your Vite app and import the corresponding `UseXxxShowcase` to run examples.

<div class="cards">

<div class="card">
  <h3><a href="/hooks/useState">useState</a></h3>
  <p>Local state, functional updates, batching, lazy init.</p>
  <a href="/hooks/useState">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/useEffect">useEffect</a></h3>
  <p>Side effects, cleanup, dependencies, common footguns.</p>
  <a href="/hooks/useEffect">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/useLayoutEffect">useLayoutEffect</a></h3>
  <p>Sync after DOM mutation; measure layouts before paint.</p>
  <a href="/hooks/useLayoutEffect">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/useRef">useRef</a></h3>
  <p>DOM refs, mutable boxes, instance variables without re-render.</p>
  <a href="/hooks/useRef">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/useContext">useContext</a></h3>
  <p>Share values without prop drilling; splitting contexts.</p>
  <a href="/hooks/useContext">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/useReducer">useReducer</a></h3>
  <p>Complex updates with pure reducers and actions.</p>
  <a href="/hooks/useReducer">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/useMemo">useMemo</a></h3>
  <p>Expensive computations and stable references.</p>
  <a href="/hooks/useMemo">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/useCallback">useCallback</a></h3>
  <p>Stable function identities; pair with React.memo.</p>
  <a href="/hooks/useCallback">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/useImperativeHandle">useImperativeHandle</a></h3>
  <p>Expose a minimal imperative API via refs (with forwardRef).</p>
  <a href="/hooks/useImperativeHandle">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/useId">useId</a></h3>
  <p>Stable, SSR-safe IDs for accessibility and associations.</p>
  <a href="/hooks/useId">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/useTransition">useTransition</a></h3>
  <p>Non-urgent updates for responsive UI.</p>
  <a href="/hooks/useTransition">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/useDeferredValue">useDeferredValue</a></h3>
  <p>Lagging copies of fast-changing values for smooth rendering.</p>
  <a href="/hooks/useDeferredValue">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/useActionState">useActionState</a></h3>
  <p>Wire form action results into state; pending flags.</p>
  <a href="/hooks/useActionState">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/useFormStatus">useFormStatus</a></h3>
  <p>Per-form submission metadata for pending UI.</p>
  <a href="/hooks/useFormStatus">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/useOptimistic">useOptimistic</a></h3>
  <p>Optimistic UI patches and reconciliation.</p>
  <a href="/hooks/useOptimistic">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/useCustomhook">Custom Hooks</a></h3>
  <p>Reusable logic patterns (useLocalStorage, useFetch, etc.).</p>
  <a href="/hooks/useCustomhook">Read notes →</a>
</div>

</div>

> 💡 Tip: In your examples app, import `<UseStateShowcase />`, `<UseEffectShowcase />`, etc. into `app/src/App.tsx` to practice live.