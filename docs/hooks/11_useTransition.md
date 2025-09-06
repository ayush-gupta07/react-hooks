# ⚛️ React Hook: `useTransition`

## 📖 Quick Summary
- `useTransition` lets you mark some state updates as **non‑urgent** so React can **keep the UI responsive** while rendering them in the background.  
- It returns `[isPending, startTransition]`. Use `startTransition(() => setState(...))` for **low‑priority** updates; leave urgent updates (like text input value) as normal `setState(...)`.  
- Great for **filtering large lists**, **navigating tabs/routes**, or any update that could momentarily block typing/scrolling.  
- Signature:  
  ```tsx
  const [isPending, startTransition] = useTransition();
  startTransition(() => {
    // one or more state updates here are marked non‑urgent
  });
  ```

---

## 🧠 Mental Model
- Think of React 18 rendering as a **priority scheduler**.  
- Urgent updates (typing, clicks) should stay **snappy**. Heavy updates (filter, recompute, big tree) can be **deferred**.  
- `useTransition` = “do this **soon** but **don’t block** the user right now.” While transition work is rendering, `isPending` is `true` so you can show a spinner/skeleton and **keep the previous UI visible** until the new one is ready.

---

## 🔑 Key Concepts
1. **Urgent vs Non‑Urgent Updates**
   - Urgent: should feel immediate (input’s `value`, button press).  
   - Non‑urgent: can lag slightly (filter results, complex layout).

2. **API**
   - `const [isPending, startTransition] = useTransition()`  
   - Call `startTransition(() => { setState(...) })` to mark those updates as low‑priority.

3. **UI Behavior**
   - While the transition is rendering, React keeps the **previous UI on screen** and `isPending === true`.

4. **Interruptible Rendering**
   - If new urgent updates arrive, React can **interrupt** the in‑progress transition and restart with latest data.

5. **Where to Call**
   - Call `startTransition` **inside event handlers or effects**, **not** during render.

6. **Transitions vs `useDeferredValue`**
   - `useTransition`: you **schedule** the non‑urgent setState.  
   - `useDeferredValue`: you **derive** a deferred version of a value and render from that.

---

## 💻 Code Examples

### Example 1: Keep typing responsive while filtering a big list
```tsx
import { useMemo, useState, useTransition } from "react";

function filterItems(items: string[], query: string) {
  // simulate heavy filtering
  const q = query.toLowerCase();
  const start = performance.now();
  while (performance.now() - start < 5) {/* burn 5ms per call */}
  return items.filter(i => i.toLowerCase().includes(q));
}

export default function Search({ items }: { items: string[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>(items);
  const [isPending, startTransition] = useTransition();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;        // URGENT update (keep input snappy)
    setQuery(next);

    startTransition(() => {              // NON‑URGENT update
      const filtered = filterItems(items, next);
      setResults(filtered);
    });
  };

  return (
    <div>
      <input value={query} onChange={onChange} placeholder="Search..." />
      {isPending && <p>Updating results…</p>}
      <ul>
        {results.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) User types → we immediately `setQuery(next)` so the input stays responsive.  
2) We wrap the heavy filtering and `setResults` in `startTransition`.  
3) React keeps showing the previous results while computing the new ones.  
4) `isPending` becomes `true` → we show a small hint/spinner.  
5) When the transition finishes, the list updates at once.

---

### Example 2: Tab switch that renders a heavy component
```tsx
import { useState, useTransition } from "react";

function HeavyTab() {
  // Pretend this renders a huge tree or runs heavy calculations
  const start = performance.now();
  while (performance.now() - start < 50) {/* 50ms work */}
  return <div>Very heavy content</div>;
}

export default function Tabs() {
  const [tab, setTab] = useState<"home" | "stats">("home");
  const [isPending, startTransition] = useTransition();

  const selectTab = (next: "home" | "stats") => {
    startTransition(() => setTab(next)); // non‑urgent: don’t freeze the click
  };

  return (
    <div>
      <button onClick={() => selectTab("home")}>Home</button>
      <button onClick={() => selectTab("stats")}>Stats</button>
      {isPending && <p>Loading tab…</p>}
      <div style={{ marginTop: 8 }}>
        {tab === "home" ? <div>Welcome!</div> : <HeavyTab />}
      </div>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) Clicking a tab triggers `startTransition(() => setTab(next))`.  
2) React can keep the old tab visible while preparing the new one.  
3) `isPending` shows a hint; UI remains interactive.  
4) Once ready, React swaps the content with minimal jank.

---

### Example 3: Transition + Suspense (show old screen until data is ready)
```tsx
import { Suspense, useState, useTransition } from "react";

// imagine <RepoList query={q}/> suspends while fetching
function RepoList({ query }: { query: string }) {
  // ... data fetching with a Suspense‑enabled cache
  return <div>/* list of repos for {query} */</div>;
}

export default function Explorer() {
  const [query, setQuery] = useState("react");
  const [isPending, startTransition] = useTransition();

  const onSearch = (q: string) => {
    startTransition(() => setQuery(q));
  };

  return (
    <div>
      <button onClick={() => onSearch("react")}>React</button>
      <button onClick={() => onSearch("redux")}>Redux</button>
      {isPending && <p>Fetching…</p>}
      <Suspense fallback={<p>Loading…</p>}>
        <RepoList query={query} />
      </Suspense>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) Clicking a button wraps `setQuery` in a transition.  
2) Current `RepoList` stays visible; `isPending` is true.  
3) When Suspense resolves for the new query, React swaps the list.  
4) User never sees a blank screen in between.

---

### Example 4: Combining urgent and non‑urgent updates
```tsx
import { useState, useTransition } from "react";

export default function MixedUpdates() {
  const [text, setText] = useState("");
  const [mirrored, setMirrored] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setText(next); // urgent

    startTransition(() => {
      // derived or heavy mirror update
      setMirrored(next.split("").reverse().join(""));
    });
  };

  return (
    <div>
      <input value={text} onChange={handleChange} />
      {isPending && <small>Updating mirror…</small>}
      <p>Mirror: {mirrored}</p>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) Input stays responsive via urgent `setText`.  
2) Mirroring (pretend heavy) is done inside the transition.  
3) Old mirror is shown until the new one is ready; `isPending` exposes progress.

---

## ⚠️ Common Pitfalls & Gotchas
- ❌ Wrapping **controlled input value** updates in a transition → typing feels laggy. Keep input `setState` **urgent**.  
- ❌ Calling `startTransition` during render → must be in an **event handler or effect**.  
- ❌ Expecting transitions to fix **CPU‑bound blocking** by themselves. Heavy synchronous work still blocks the main thread; consider **web workers** or optimizing logic.  
- ❌ Forgetting loading feedback — use `isPending` to show progress/skeleton.  
- ❌ Using transitions for everything — they are for **non‑urgent** updates only.

---

## ✅ Best Practices
- Keep **urgent UI** (typing, clicks) as normal `setState`.  
- Wrap **derivations / heavy recomputations / big tree switches** in `startTransition`.  
- Pair with **Suspense** for data fetching so the previous UI stays while new data loads.  
- Consider **`useDeferredValue`** when you can’t control where state changes, but need a deferred version for rendering.  
- Profile first; add transitions where they actually improve responsiveness.

---

## ❓ Interview Q&A

**Q1. What problem does `useTransition` solve?**  
A: It prevents heavy renders from blocking urgent interactions by marking some updates as non‑urgent and letting React keep the previous UI visible.

---

**Q2. What does `isPending` indicate?**  
A: That a transition is currently in progress (React is rendering non‑urgent work). Use it to show progress indicators.

---

**Q3. How is `useTransition` different from `useDeferredValue`?**  
A: `useTransition` schedules **setState** at low priority. `useDeferredValue` gives a **lagging copy** of a value for rendering, without changing how the original is updated.

---

**Q4. Can transitions be interrupted?**  
A: Yes. If a newer urgent update arrives, React can interrupt the in‑flight transition and restart with the latest inputs.

---

**Q5. Where should `startTransition` be called?**  
A: Inside user event handlers or effects (never during render).

---

**Q6. Do transitions make code run in a different thread?**  
A: No. They are still on the main thread; React just schedules work with different priority.

---