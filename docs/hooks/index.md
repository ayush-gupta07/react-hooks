# Hooks Overview

A curated map of everything in this repo. Click a hook to read notes; open your Vite app and import the corresponding `UseXxxShowcase` to run examples.

<div class="cards">

<div class="card">
  <h3><a href="/hooks/01_useState">useState</a></h3>
  <p>Local state, functional updates, batching, lazy init.</p>
  <a href="/hooks/01_useState">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/02_useEffect">useEffect</a></h3>
  <p>Side effects, cleanup, dependencies, common footguns.</p>
  <a href="/hooks/02_useEffect">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/03_useLayoutEffect">useLayoutEffect</a></h3>
  <p>Sync after DOM mutation; measure layouts before paint.</p>
  <a href="/hooks/03_useLayoutEffect">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/04_useRef">useRef</a></h3>
  <p>DOM refs, mutable boxes, instance variables without re-render.</p>
  <a href="/hooks/04_useRef">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/05_useContext">useContext</a></h3>
  <p>Share values without prop drilling; splitting contexts.</p>
  <a href="/hooks/05_useContext">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/06_useReducer">useReducer</a></h3>
  <p>Complex updates with pure reducers and actions.</p>
  <a href="/hooks/06_useReducer">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/07_useMemo">useMemo</a></h3>
  <p>Expensive computations and stable references.</p>
  <a href="/hooks/07_useMemo">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/08_useCallback">useCallback</a></h3>
  <p>Stable function identities; pair with React.memo.</p>
  <a href="/hooks/08_useCallback">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/09_useImperativeHandle">useImperativeHandle</a></h3>
  <p>Expose a minimal imperative API via refs (with forwardRef).</p>
  <a href="/hooks/09_useImperativeHandle">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/10_useId">useId</a></h3>
  <p>Stable, SSR-safe IDs for accessibility and associations.</p>
  <a href="/hooks/10_useId">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/11_useTransition">useTransition</a></h3>
  <p>Non-urgent updates for responsive UI.</p>
  <a href="/hooks/11_useTransition">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/12_useDeferredValue">useDeferredValue</a></h3>
  <p>Lagging copies of fast-changing values for smooth rendering.</p>
  <a href="/hooks/12_useDeferredValue">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/13_useActionState">useActionState</a></h3>
  <p>Wire form action results into state; pending flags.</p>
  <a href="/hooks/13_useActionState">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/14_useFormStatus">useFormStatus</a></h3>
  <p>Per-form submission metadata for pending UI.</p>
  <a href="/hooks/14_useFormStatus">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/15_useOptimistic">useOptimistic</a></h3>
  <p>Optimistic UI patches and reconciliation.</p>
  <a href="/hooks/15_useOptimistic">Read notes →</a>
</div>

<div class="card">
  <h3><a href="/hooks/16_useCustomhook">Custom Hooks</a></h3>
  <p>Reusable logic patterns (useLocalStorage, useFetch, etc.).</p>
  <a href="/hooks/16_useCustomhook">Read notes →</a>
</div>

</div>

> 💡 Tip: In your examples app, import `<UseStateShowcase />`, `<UseEffectShowcase />`, etc. into `app/src/App.tsx` to practice live.