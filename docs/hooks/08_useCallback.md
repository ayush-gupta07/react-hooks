# ⚛️ React Hook: `useCallback`

## 📖 Quick Summary
- `useCallback` memoizes a **function definition** so that it keeps the same reference across renders unless dependencies change.  
- Useful when passing callbacks to child components that depend on reference equality (e.g., wrapped in `React.memo`).  
- Syntax:  
  ```tsx
  const memoizedFn = useCallback(() => { /* logic */ }, [deps]);
  ```

## 🧠 Mental Model
- Think of `useCallback` as a **function factory** with a memory.  
- Without it, every render creates a **new function reference** → may trigger unnecessary child re-renders.  
- With it, React reuses the same function reference if dependencies haven’t changed.

## 🔑 Key Concepts
1. **Function Identity**
   - Functions are objects in JS → new render = new function reference.  
   - `useCallback` preserves identity until deps change.

2. **When to Use**
   - Passing callbacks to memoized children (`React.memo`).  
   - Event handlers that don’t need to change every render.

3. **Dependencies**
   - If dependencies change, new function is created.  
   - If `[]`, function is stable forever (like `componentDidMount`).

4. **Relation to `useMemo`**
   - `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.  
   - Difference is **semantic intent**: `useMemo` → values, `useCallback` → functions.

## 💻 Code Examples

### Example 1: Stable Callback for Child Component
```tsx
import { useState, useCallback, memo } from "react";

const Child = memo(({ onClick }: { onClick: () => void }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click Me</button>;
});

export default function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) `Parent` re-renders when `count` changes.  
2) Without `useCallback`, `handleClick` would be a new function each time → `Child` would re-render unnecessarily.  
3) With `useCallback`, `handleClick` keeps the same reference, so `Child` doesn’t re-render unless needed.  

---

### Example 2: Callback with Dependencies
```tsx
import { useState, useCallback } from "react";

export default function SearchBox() {
  const [query, setQuery] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  return (
    <input value={query} onChange={handleChange} placeholder="Search..." />
  );
}
```
**How it works (step‑by‑step):**
1) `handleChange` is created once with `useCallback`.  
2) Each keystroke calls the same function reference.  
3) If dependencies were added, the function would be recreated when they change.  

---

### Example 3: Passing Stable Callback with Dependency
```tsx
import { useState, useCallback, memo } from "react";

const ExpensiveList = memo(({ filter }: { filter: (item: string) => boolean }) => {
  console.log("ExpensiveList rendered");
  const items = ["apple", "banana", "cherry"];
  return (
    <ul>{items.filter(filter).map((i, idx) => <li key={idx}>{i}</li>)}</ul>
  );
});

export default function Parent() {
  const [letter, setLetter] = useState("a");

  const filterFn = useCallback((item: string) => item.startsWith(letter), [letter]);

  return (
    <div>
      <ExpensiveList filter={filterFn} />
      <button onClick={() => setLetter("b")}>Show B</button>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) Parent renders with `letter = "a"`.  
2) `filterFn` created with dependency `letter`.  
3) `ExpensiveList` only re-renders when `letter` changes → stable function identity otherwise.  

---

### Example 4: useCallback vs useMemo
```tsx
const fn1 = useCallback(() => compute(), [deps]);
const fn2 = useMemo(() => () => compute(), [deps]);
```
- Both are equivalent → `fn1` and `fn2` are memoized functions.  
- Use `useCallback` for **functions**, `useMemo` for **computed values**.

---

## ⚠️ Common Pitfalls & Gotchas
- ❌ Using `useCallback` everywhere → unnecessary complexity.  
- ❌ Forgetting dependencies → stale closures (function uses outdated variables).  
- ❌ Passing inline functions to memoized children → defeats memoization.  

---

## ✅ Best Practices
- Use it with `React.memo` or heavy child components.  
- Keep dependency arrays accurate.  
- Avoid premature optimization: measure before adding.  
- Don’t wrap every function in `useCallback` blindly.  

## ❓ Interview Q&A

**Q1. Why do we need `useCallback`?**  
A: To memoize function references so they don’t change on every render, preventing unnecessary re-renders in memoized children.

---

**Q2. Difference between `useCallback` and `useMemo`?**  
A:  
- `useCallback` → memoizes a **function**.  
- `useMemo` → memoizes a **value**.  
Implementation-wise, `useCallback(fn, deps)` is `useMemo(() => fn, deps)`.

---

**Q3. Does `useCallback` guarantee no re-render of child?**  
A: No. It only guarantees the function reference is stable. Child still re-renders if its other props or state change.

---

**Q4. When should you not use `useCallback`?**  
A: For simple inline event handlers in non-memoized children. Wrapping them adds unnecessary complexity.

---

**Q5. What’s a stale closure issue in `useCallback`?**  
A: When a callback captures outdated state/props due to missing dependencies in its dependency array.

---

**Q6. Is `useCallback` just performance optimization?**  
A: Yes. It doesn’t add new functionality, only helps optimize renders and reference stability.
