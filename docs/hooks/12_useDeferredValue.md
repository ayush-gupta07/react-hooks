# ⚛️ React Hook: `useDeferredValue`

## 📖 Quick Summary
- `useDeferredValue` lets you render a **lagging (deferred) version** of a value so the UI can stay **responsive** during heavy re-renders.  
- It **doesn’t schedule** updates itself (unlike `useTransition`); it returns a **deferred copy** you can render from.  
- Ideal when you **can’t control** where state updates happen but you want to **defer** parts of the UI that are expensive.  
- Signature:  
  ```tsx
  const deferred = useDeferredValue(value, { timeoutMs? });
  ```

## 🧠 Mental Model
- Think of `useDeferredValue` as a **“lagging mirror”** of some state.  
- The **original value** updates immediately (for input, cursor, etc.).  
- The **deferred value** trails behind until React can render it without blocking the UI.  
- While deferred, you can show a spinner/skeleton and keep the **previous expensive UI** visible.

## 🔑 Key Concepts
1. **Lagging Copy**
   - `deferred` stays equal to the previous value during busy rendering, then eventually “catches up”.

2. **No Scheduling**
   - Unlike `useTransition`, it doesn’t mark work as low priority. It simply **defers the value used by part of the tree**.

3. **When to Use**
   - You need the **latest input** to feel instant, but **rendering results** can lag (e.g., search/filter results).

4. **Pair with `memo`**
   - Use `React.memo` on heavy child components that consume the deferred value so they only re-render when the deferred value changes.

5. **`timeoutMs` (optional)**
   - A hint for how long React may delay updating the deferred value before making it urgent (not a hard guarantee).

## 💻 Code Examples

### Example 1: Responsive search input with deferred query
```tsx
import { useDeferredValue, useMemo, useState } from "react";

function heavyFilter(items: string[], query: string) {
  // simulate expensive work
  const start = performance.now();
  while (performance.now() - start < 5) {/* burn ~5ms */}
  return items.filter(i => i.toLowerCase().includes(query.toLowerCase()));
}

export default function Search({ items }: { items: string[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => heavyFilter(items, deferredQuery), [items, deferredQuery]);

  const isStale = query !== deferredQuery;

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." />
      {isStale && <p>Updating results…</p>}
      <ul>
        {results.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) User types → `query` updates **immediately** (keeps typing snappy).  
2) `deferredQuery` **lags** behind while React is busy.  
3) Heavy list filtering uses `deferredQuery`, so it only recomputes when the deferred value catches up.  
4) `isStale` indicates that the UI is temporarily showing results for an older query; show a hint/spinner.  
5) When React is free, `deferredQuery` becomes `query` and `results` update.

---

### Example 2: Expensive child renders only when deferred value changes
```tsx
import { memo, useDeferredValue, useMemo, useState } from "react";

const HeavyList = memo(function HeavyList({ items, query }: { items: string[], query: string }) {
  // simulate heavy render
  const start = performance.now();
  while (performance.now() - start < 15) {/* 15ms work */}

  const filtered = useMemo(
    () => items.filter(i => i.toLowerCase().includes(query.toLowerCase())),
    [items, query]
  );

  return <ul>{filtered.map((i, idx) => <li key={idx}>{i}</li>)}</ul>;
});

export default function Container({ items }: { items: string[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <HeavyList items={items} query={deferredQuery} />
      {query !== deferredQuery && <small>Rendering heavy list in background…</small>}
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) `HeavyList` is memoized; it re-renders only if `items` or `query` prop changes.  
2) Passing `deferredQuery` means `HeavyList` doesn’t re-render on every keystroke.  
3) It re-renders only when the deferred value catches up → smoother typing.

---

### Example 3: Comparing `useTransition` vs `useDeferredValue`
```tsx
// useTransition: schedule non-urgent updates (you control setState timing)
const [isPending, startTransition] = useTransition();
const onChange = (next: string) => {
  setQuery(next);                 // urgent
  startTransition(() => setResults(expensiveCompute(next))); // non-urgent
};

// useDeferredValue: render from a lagging copy when you can't schedule
const deferredQuery = useDeferredValue(query);
const results = useMemo(() => expensiveCompute(deferredQuery), [deferredQuery]);
```
**Takeaway:**  
- Use **`useTransition`** when you **own the setState** and want to mark it non‑urgent.  
- Use **`useDeferredValue`** when you **don’t control** the updates (or want only part of the tree to lag).  

---

### Example 4: Optional timeout hint
```tsx
import { useDeferredValue } from "react";

export default function DeferredWithTimeout({ value }: { value: string }) {
  const deferred = useDeferredValue(value, { timeoutMs: 200 });
  const isStale = deferred !== value;

  return (
    <p>
      Current: {value} — Deferred: {deferred}
      {isStale && " (catching up…)"}
    </p>
  );
}
```
**How it works (step‑by‑step):**
1) React may delay updating `deferred` up to ~200ms under load (not guaranteed).  
2) While stale, you can show lightweight progress UI.

## ⚠️ Common Pitfalls & Gotchas
- ❌ Expecting `useDeferredValue` to **schedule** updates — it doesn’t; it just returns a deferred copy.  
- ❌ Using it for **small/light** components — adds complexity without benefit.  
- ❌ Forgetting memoization (`memo`/`useMemo`) in heavy children — they may still re-render for other prop changes.  
- ❌ Assuming `timeoutMs` is exact — it’s a hint; React may update earlier or later.

## ✅ Best Practices
- Use for **heavy subtrees** fed by fast-changing inputs (search, filters, visualizations).  
- Combine with **`React.memo`** and **`useMemo`** for best results.  
- Keep a simple **staleness indicator**: `value !== deferredValue`.  
- Prefer **`useTransition`** when you can; reach for `useDeferredValue` when you can’t control state updates or only want part of the UI to lag.

## ❓ Interview Q&A

**Q1. What problem does `useDeferredValue` solve?**  
A: It keeps the UI responsive by letting you render from a **lagging copy** of a fast-changing value, so heavy parts don’t re-render on every change.

---

**Q2. How is it different from `useTransition`?**  
A: `useTransition` **schedules** low-priority updates; `useDeferredValue` **defers consumption** of a value by parts of the UI without changing how it’s produced.

---

**Q3. When would you prefer `useDeferredValue`?**  
A: When updates are driven elsewhere (e.g., third-party state, uncontrolled input) or you want only a **subset** of the UI to lag.

---

**Q4. How do you detect that the deferred value is stale?**  
A: Compare `value !== deferredValue` to show a spinner/skeleton.

---

**Q5. Does `useDeferredValue` reduce CPU cost by itself?**  
A: No; it spreads work over time. Optimize heavy computations with memoization, virtualization, or workers.
