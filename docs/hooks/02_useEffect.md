# ⚛️ React Hook: `useEffect`

## 📖 Quick Summary
- `useEffect` lets you perform **side effects** in functional components.  
- Side effects = things outside React’s rendering process (e.g., fetching data, DOM manipulation, subscriptions).  
- Syntax:  
  ```tsx
  useEffect(() => {
    // effect code
    return () => {
      // optional cleanup
    };
  }, [dependencies]);
  ```

## 🧠 Mental Model
- Think of `useEffect` as React’s way of saying:  
  “Run this code **after the render** and again whenever dependencies change.”  
- Cleanup runs like housekeeping 🧹 before the effect re-runs or when the component unmounts.

## 🔑 Key Concepts
1. **Default Behavior**
   - Runs after every render if no dependency array is provided.

2. **Dependency Array**
   - Controls when the effect runs.  
   - `[]` → run only once (on mount).  
   - `[var1, var2]` → re-run whenever `var1` or `var2` changes.

3. **Cleanup Function**
   - Return a function from `useEffect` to clean up resources (e.g., event listeners, timers).  
   - Runs before component unmount or before the effect re-runs.

4. **Multiple Effects**
   - A component can have many `useEffect` hooks.  
   - Each handles a separate concern (e.g., data fetch, subscription).

5. **Execution Order**
   - Effects run after the DOM is updated.  
   - Cleanup runs before next effect execution.

## 💻 Code Examples

### Example 1: Run Once on Mount
```tsx
import { useEffect } from "react";

export default function Hello() {
  useEffect(() => {
    console.log("Component mounted");
  }, []);

  return <h1>Hello World</h1>;
}
```
**How it works (step‑by‑step):**
1) Component renders the first time.  
2) React commits DOM updates.  
3) Because the dependency array is `[]`, the effect runs **once** after mount and logs the message.  
4) It will not run again unless the component unmounts/remounts.

---

### Example 2: Re-run on Dependency Change
```tsx
import { useState, useEffect } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Count updated: ${count}`);
  }, [count]);

  return (
    <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
  );
}
```
**How it works (step‑by‑step):**
1) On initial render, effect runs once after paint and logs with `count = 0`.  
2) Clicking the button updates `count` → triggers a re-render.  
3) After React updates the DOM, the effect runs again because `count` in the dependency array changed.  
4) The log always reflects the latest `count` value.

---

### Example 3: Cleanup with Event Listener
```tsx
import { useEffect } from "react";

export default function WindowResizeLogger() {
  useEffect(() => {
    const handleResize = () => console.log("Window width:", window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <p>Resize the window and check the console</p>;
}
```
**How it works (step‑by‑step):**
1) On mount, effect adds a `resize` event listener.  
2) The listener logs width whenever the window resizes.  
3) When the component unmounts, React calls the cleanup to remove the listener, preventing leaks.  
4) If the effect re‑ran (with deps), cleanup would run **before** setting the new listener.

---

### Example 4: Fetching Data
```tsx
import { useState, useEffect } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    }
    fetchData();
  }, []);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```
**How it works (step‑by‑step):**
1) Initial render shows an empty list.  
2) After mount, the effect runs and kicks off the async `fetch`.  
3) When the data arrives, `setUsers` updates state → triggers a re-render.  
4) The list renders with the fetched users.

## ⚠️ Common Pitfalls & Gotchas
- ❌ Forgetting the dependency array → effect runs after every render (may cause infinite loops).  
- ❌ Incorrect dependencies → stale data or missed updates.  
- ❌ Running expensive operations without memoization.  
- ❌ Forgetting cleanup → memory leaks from unremoved listeners/timers.  

## ✅ Best Practices
- Always declare dependencies explicitly in the array.  
- Extract reusable logic into **custom hooks**.  
- Keep effects focused — one effect per concern.  
- Use cleanup to prevent leaks.  
- Use libraries like React Query for complex data fetching.  

## ❓ Interview Q&A

**Q1. What is `useEffect` used for?**  
A: To handle side effects in React functional components (e.g., API calls, subscriptions, timers, DOM manipulation).  

---

**Q2. Difference between `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` vs `useEffect`?**  
A: In class components, those lifecycle methods are separate. In functional components, `useEffect` combines them:  
- `[]` → `componentDidMount`  
- `[deps]` → `componentDidUpdate`  
- `return () => {}` → `componentWillUnmount`  

---

**Q3. Why does `useEffect` run after render?**  
A: To ensure the DOM is updated first, so side effects don’t block the UI rendering.  

---

**Q4. How does cleanup work in `useEffect`?**  
A: Return a function from the effect. React calls it before unmounting or before re-running the effect.  

---

**Q5. What happens if we omit the dependency array?**  
A: The effect runs after **every render**, which may lead to performance issues or infinite loops.  

---

**Q6. How to prevent infinite loops with `useEffect`?**  
A: Ensure dependency arrays are correct. Don’t include non-stable references (like inline functions/objects) unless memoized.  

---

**Q7. Can we use multiple `useEffect` hooks in a component?**  
A: Yes, React encourages splitting unrelated logic into separate effects.  
