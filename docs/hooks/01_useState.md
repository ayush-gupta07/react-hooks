# ⚛️ React Hook: `useState`

## 📖 Quick Summary
- `useState` is a **React hook** that lets you add **state variables** to functional components.  
- State is **data that changes over time** and triggers a re-render when updated.  
- Syntax:  
  ```tsx
  const [state, setState] = useState(initialValue);
  ```

## 🧠 Mental Model
- Think of state as a **box 📦** inside your component that React watches.  
- When you update the box using the setter (`setState`), React **repaints the UI** with the new data.  
- Updating state does **not mutate** the variable directly — it schedules a re-render.  

## 🔑 Key Concepts
1. **Initialization**
   ```tsx
   const [count, setCount] = useState(0);
   ```
   - `count` → current state value  
   - `setCount` → function to update state  
   - `0` → initial value  

2. **State Updates Trigger Re-renders**
   - Direct assignment (`count = 5`) won’t re-render.
   - Must use setter (`setCount(5)`).

3. **Asynchronous Updates**
   - React may batch multiple state updates.
   - Always use the **functional form** when the new state depends on the old:
     ```tsx
     setCount(prev => prev + 1);
     ```

4. **Lazy Initialization**
   - Pass a function for expensive initializations:
     ```tsx
     const [value, setValue] = useState(() => computeExpensiveValue());
     ```

5. **Multiple State Variables**
   - You can call `useState` multiple times in a component.
   - Each call manages a separate piece of state.

## 💻 Code Examples

### Example 1: Basic Counter
```tsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) Component renders with `count = 0` (initial value).  
2) When you click **Increment**, React calls `setCount(count + 1)`.  
3) React schedules a re-render; on the next render, `count` becomes `1`.  
4) The `<p>` shows the updated `count`.  
5) Same flow for **Decrement** (value decreases and UI re-renders).

---

### Example 2: Functional Updates
```tsx
import { useState } from "react";

export default function DoubleIncrement() {
  const [count, setCount] = useState(0);

  const handleDouble = () => {
    // Ensures both increments see the latest value
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleDouble}>+2</button>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) Initial render with `count = 0`.  
2) Click **+2** → `handleDouble` runs two `setCount` calls.  
3) Because we use the **functional form**, the 2nd update reads the value from the 1st update.  
4) React batches both updates in one tick → new state becomes `count + 2`.  
5) Component re-renders with the final value.

---

### Example 3: Managing Objects/Arrays
```tsx
import { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([{ id: 1, text: "Learn React" }]);

  const addTodo = () => {
    setTodos(prev => [...prev, { id: prev.length + 1, text: "New Task" }]);
  };

  return (
    <>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      <button onClick={addTodo}>Add Todo</button>
    </>
  );
}
```
**How it works (step‑by‑step):**
1) `todos` starts with one item.  
2) On **Add Todo**, we create a **new array** using the spread (`[...]`) to avoid mutating state.  
3) We append the new item with an incremented `id`.  
4) React detects a new reference, re-renders, and the list shows the added item.

---

### Example 4: Lazy Initialization
```tsx
function computeExpensiveValue() {
  console.log("Expensive calculation running...");
  return 42;
}

export default function ExpensiveComponent() {
  const [value, setValue] = useState(() => computeExpensiveValue());
  return <p>Expensive value: {value}</p>;
}
```
**How it works (step‑by‑step):**
1) On the very first render, React calls the initializer function **once** → `computeExpensiveValue()`.  
2) The returned value `42` is stored as the initial state.  
3) Subsequent re-renders **do not** re-run the expensive function.  
4) UI displays the current `value`.

## ⚠️ Common Pitfalls & Gotchas
- ❌ Updating state directly (`count = count + 1`) → won’t re-render.  
- ❌ Forgetting that updates are async → `console.log(count)` after `setCount` shows old value.  
- ❌ Overwriting object/array state instead of copying → use spread operator (`{...}` / `[...arr]`).  
- ❌ Using state inside loops/conditions → hooks must be called in the same order every render.  

## ✅ Best Practices
- Use **descriptive names** (`isOpen`, `todos`, `count`).  
- When new state depends on old state → always use **functional updates**.  
- Group related values into objects, but keep unrelated values separate.  
- Prefer **lazy initialization** for expensive calculations.  
- Keep state as **minimal as possible** — derive values where you can.  

## ❓ Interview Q&A

**Q1. What is the purpose of `useState` in React?**  
A: It adds state to functional components. State is preserved between renders, and updating it triggers a re-render.  

---

**Q2. Why can’t we update state variables directly?**  
A: Direct assignment doesn’t notify React. Only calling the setter function (`setState`) schedules a re-render.  

---

**Q3. Why use functional updates (`setCount(prev => prev + 1)`)?**  
A: Because React batches state updates. Functional form ensures each update uses the latest value, avoiding stale state.  

---

**Q4. What is lazy initialization in `useState`?**  
A: If initial value calculation is expensive, pass a function:  
```tsx
const [value, setValue] = useState(() => heavyComputation());
```
This function runs only once on initial render.  

---

**Q5. Can we use multiple `useState` calls in a single component?**  
A: Yes. Each call manages independent state. Hooks are tracked in order, so calls must not be inside loops/conditions.  

---

**Q6. What happens when we update state in React?**  
A: React schedules a re-render. During reconciliation, the Virtual DOM is updated, then efficiently synced with the real DOM.  

---

**Q7. Difference between state and props?**  
- **State**: managed within a component, can be updated with `setState`.  
- **Props**: passed from parent to child, read-only in the child.  

