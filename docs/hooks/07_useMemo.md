# ⚛️ React Hook: `useMemo`

## 📖 Quick Summary
- `useMemo` memoizes the **result of a calculation** to avoid recomputing it on every render.  
- It only recomputes when its **dependencies change**.  
- Useful for **expensive calculations** and ensuring **reference stability** for objects/arrays.  
- Syntax:  
  ```tsx
  const memoizedValue = useMemo(() => computeSomething(a, b), [a, b]);
  ```

## 🧠 Mental Model
- Imagine `useMemo` as a **smart cache 🗃️** inside your component.  
- On re-render, React checks the dependencies:  
  - If unchanged → returns the cached value.  
  - If changed → recalculates and caches the new value.  

## 🔑 Key Concepts
1. **Expensive Calculations**
   - Prevents recomputing on every render if inputs didn’t change.

2. **Reference Stability**
   - Keeps stable references for arrays/objects passed as props, avoiding unnecessary re-renders in children.

3. **Dependencies**
   - `useMemo(fn, deps)` only runs `fn` again if any `deps` change.

4. **Optimization Tool**
   - Don’t prematurely use it everywhere → only where recomputation is costly or reference stability matters.

## 💻 Code Examples

### Example 1: Expensive Calculation
```tsx
import { useState, useMemo } from "react";

function slowFib(n: number): number {
  console.log("Running slowFib...");
  if (n <= 1) return n;
  return slowFib(n - 1) + slowFib(n - 2);
}

export default function Fibonacci() {
  const [num, setNum] = useState(20);
  const [count, setCount] = useState(0);

  const fibValue = useMemo(() => slowFib(num), [num]);

  return (
    <div>
      <p>fib({num}) = {fibValue}</p>
      <button onClick={() => setNum(num + 1)}>Next Number</button>
      <button onClick={() => setCount(count + 1)}>Re-render ({count})</button>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) On first render, `useMemo` runs `slowFib(20)` and caches result.  
2) Clicking **Re-render** changes `count` but not `num`.  
3) Because `num` didn’t change, cached fib result is returned (no recalculation).  
4) Changing `num` recomputes fib with new input.  

---

### Example 2: Stable Object Reference
```tsx
import { useState, useMemo } from "react";

function Child({ config }: { config: { theme: string } }) {
  console.log("Child rendered");
  return <p>Theme: {config.theme}</p>;
}

export default function Parent() {
  const [dark, setDark] = useState(false);

  const config = useMemo(() => ({ theme: dark ? "dark" : "light" }), [dark]);

  return (
    <div>
      <Child config={config} />
      <button onClick={() => setDark(d => !d)}>Toggle Theme</button>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) Without `useMemo`, `config = {theme:...}` creates a new object each render.  
2) Even if `dark` didn’t change, the `Child` would re-render due to new object reference.  
3) With `useMemo`, the object is cached until `dark` changes.  
4) Child only re-renders when theme actually changes.  

---

### Example 3: Filtering Large List
```tsx
import { useState, useMemo } from "react";

export default function FilteredList({ items }: { items: string[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => items.filter(item => item.toLowerCase().includes(query.toLowerCase())),
    [items, query]
  );

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ul>{filtered.map((item, i) => <li key={i}>{item}</li>)}</ul>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) On render, filter runs only if `items` or `query` changes.  
2) Avoids re-running filter unnecessarily when unrelated state updates.  
3) Improves performance for large lists.  

---

### Example 4: Memoized Derived State
```tsx
import { useState, useMemo } from "react";

export default function Cart() {
  const [items, setItems] = useState([
    { id: 1, name: "Book", price: 10 },
    { id: 2, name: "Pen", price: 5 },
  ]);

  const total = useMemo(() => items.reduce((sum, i) => sum + i.price, 0), [items]);

  return (
    <div>
      <h3>Total: ${total}</h3>
      <button onClick={() => setItems([...items, { id: Date.now(), name: "Pencil", price: 2 }])}>
        Add Item
      </button>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) `total` is derived from `items`.  
2) `useMemo` ensures recalculation only when `items` changes.  
3) Adding new item updates `items`, triggers recalculation of `total`.  

## ⚠️ Common Pitfalls & Gotchas
- ❌ Using `useMemo` for trivial computations → adds overhead without benefit.  
- ❌ Forgetting dependencies → cached value becomes stale.  
- ❌ Assuming `useMemo` guarantees memoization → React may discard cache in future optimizations.  
- ❌ Overusing for premature optimization.  

## ✅ Best Practices
- Use it for **expensive calculations** (CPU heavy).  
- Use it to **stabilize object/array references** passed to children.  
- Keep dependency arrays accurate.  
- Avoid using everywhere → measure performance first.  

## ❓ Interview Q&A

**Q1. What is `useMemo` used for?**  
A: To memoize the result of expensive computations or maintain stable references between renders.

---

**Q2. Difference between `useMemo` and `useCallback`?**  
A:  
- `useMemo` memoizes a **value** (result of a function).  
- `useCallback` memoizes a **function** itself.  

---

**Q3. Does `useMemo` run on every render?**  
A: Yes, React runs the function during render, but returns cached value if dependencies haven’t changed.

---

**Q4. What happens if dependency array is empty (`[]`)?**  
A: The value is computed once on mount and reused forever (unless component unmounts).  

---

**Q5. Can you use `useMemo` to prevent re-renders?**  
A: Not directly. It prevents **expensive recalculations** or stabilizes references, which may reduce re-renders indirectly.

---

**Q6. Is `useMemo` guaranteed to memoize?**  
A: No. It’s a performance hint. React may discard cached values to save memory, but generally reuses them if dependencies didn’t change.
