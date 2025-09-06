# ⚛️ React Hook: `useReducer`

## 📖 Quick Summary
- `useReducer` is an alternative to `useState` for **complex state logic** or **multiple related updates**.  
- You provide a **pure reducer function** `(state, action) => newState` and get back `[state, dispatch]`.  
- Great for **predictable updates**, **testability**, and **moving logic out of components**.  
- Signature:  
  ```tsx
  const [state, dispatch] = useReducer(reducer, initialArg, init?);
  ```

---

## 🧠 Mental Model
- Think of `useReducer` as a tiny **Redux-like** state container per component.  
- You **dispatch** an `action` → the **reducer** calculates the **next state** → React re-renders if the state reference changes.  
- Reducers must be **pure**: no side-effects (no fetch, no timers), no mutation of inputs.

---

## 🔑 Key Concepts
1. **Reducer**
   ```tsx
   type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" };
   function reducer(state: number, action: Action): number {
     switch (action.type) {
       case "increment": return state + 1;
       case "decrement": return state - 1;
       case "reset":     return 0;
     }
   }
   ```

2. **Dispatch**
   - Call `dispatch({ type: "increment" })` to trigger the reducer.

3. **Initial State**
   - Pass primitive/object directly, or use **lazy init** with `init` function for expensive setup.

4. **Purity & Immutability**
   - Reducer must **not mutate** `state` or perform side-effects. Always return a **new object** when state changes.

5. **Re-render semantics**
   - React re-renders when the returned **state reference** is different. Returning the **same reference** skips re-render.

6. **Type Safety (TS)**
   - Prefer a **discriminated union** for `Action` and strongly-typed state to catch errors at compile time.

---

## 💻 Code Examples

### Example 1: Basic Counter (TypeScript)
```tsx
import { useReducer } from "react";

type Action = 
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return 0;
    default:
      return state;
  }
}

export default function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+1</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) `useReducer(reducer, 0)` initializes `count = 0`.  
2) Clicking **+1** dispatches `{ type: "increment" }`.  
3) React calls `reducer(0, {type:'increment'})` → returns `1`.  
4) New state reference (`1`) triggers a re-render showing updated count.  
5) **Reset** returns `0`, similarly causing a re-render.

---

### Example 2: Todo List (Object State + Payload)
```tsx
import { useReducer } from "react";

type Todo = { id: number; text: string; done: boolean };

type Action = 
  | { type: "add"; payload: { text: string } }
  | { type: "toggle"; payload: { id: number } }
  | { type: "remove"; payload: { id: number } };

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "add":
      return [...state, { id: Date.now(), text: action.payload.text, done: false }];
    case "toggle":
      return state.map(t => t.id === action.payload.id ? { ...t, done: !t.done } : t);
    case "remove":
      return state.filter(t => t.id !== action.payload.id);
    default:
      return state;
  }
}

export default function Todos() {
  const [todos, dispatch] = useReducer(reducer, []);

  function handleAdd() {
    const text = prompt("Todo?");
    if (text) dispatch({ type: "add", payload: { text } });
  }

  return (
    <div>
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            <label style={{ textDecoration: t.done ? "line-through" : "none" }}>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => dispatch({ type: "toggle", payload: { id: t.id } })}
              />
              {t.text}
            </label>
            <button onClick={() => dispatch({ type: "remove", payload: { id: t.id } })}>
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) Start with empty `todos`.  
2) **Add** dispatch creates a **new array** with appended todo (immutability).  
3) **Toggle** maps to a **new array**, flipping `done` for a specific item.  
4) **Remove** filters out a todo by id.  
5) Each action returns a **new array reference**, so React re-renders the list.

---

### Example 3: Lazy Initialization + LocalStorage
```tsx
import { useReducer, useEffect } from "react";

type State = { theme: "light" | "dark"; fontSize: number };
type Action = 
  | { type: "toggleTheme" }
  | { type: "setFont"; payload: { size: number } }
  | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "toggleTheme":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case "setFont":
      return { ...state, fontSize: action.payload.size };
    case "reset":
      return { theme: "light", fontSize: 16 };
    default:
      return state;
  }
}

function init(initialArg: State): State {
  const raw = localStorage.getItem("prefs");
  return raw ? JSON.parse(raw) as State : initialArg;
}

export default function Preferences() {
  const [state, dispatch] = useReducer(reducer, { theme: "light", fontSize: 16 }, init);

  useEffect(() => {
    localStorage.setItem("prefs", JSON.stringify(state));
  }, [state]);

  return (
    <div data-theme={state.theme} style={{ fontSize: state.fontSize }}>
      <p>Theme: {state.theme} | Font: {state.fontSize}px</p>
      <button onClick={() => dispatch({ type: "toggleTheme" })}>Toggle Theme</button>
      <button onClick={() => dispatch({ type: "setFont", payload: { size: state.fontSize + 1 } })}>A+</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) `init` runs **once** on mount to hydrate from `localStorage` if present; otherwise uses provided initial state.  
2) Any state change is persisted by the `useEffect` that watches `state`.  
3) Toggling theme/setting font returns **new objects** (no mutations).  
4) UI reflects the latest preferences immediately.

---

### Example 4: `useReducer` + `useContext` (Simple Global Store)
```tsx
import { createContext, useContext, useMemo, useReducer } from "react";

type State = { user: { name: string } | null };
type Action = { type: "login"; payload: { name: string } } | { type: "logout" };

const initialState: State = { user: null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "login":
      return { ...state, user: { name: action.payload.name } };
    case "logout":
      return { ...state, user: null };
    default:
      return state;
  }
}

type Store = { state: State; dispatch: React.Dispatch<Action> };
const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  // stable value to avoid re-renders of all consumers on unrelated state changes
  const store = useMemo(() => ({ state, dispatch }), [state]);
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
```
**How it works (step‑by‑step):**
1) `StoreProvider` creates a reducer-backed store and memoizes `{ state, dispatch }`.  
2) Children call `useStore()` to access `state`/`dispatch` anywhere without prop drilling.  
3) Dispatching actions updates state in provider → consumers re-render with new values.

---

## ⚠️ Common Pitfalls & Gotchas
- ❌ **Mutating** state inside reducer (e.g., `state.count++`) → breaks predictability, may not re-render correctly.  
- ❌ Doing **side-effects** in the reducer (fetching, timers) → reducers must stay pure; use `useEffect` instead.  
- ❌ Returning the **same object reference** when something actually changed → UI won’t update.  
- ❌ Creating a new **dispatch wrapper** on every render and passing it via context without memoization → needless re-renders.  
- ❌ Massive, monolithic reducers → split by domain or use multiple reducers in different components.

---

## ✅ Best Practices
- Model actions with **clear types & payloads**; use **discriminated unions** in TypeScript.  
- Keep reducers **pure & small**; move side-effects to `useEffect` or to calling code.  
- Prefer **immutable updates** (spread, map, filter).  
- Use **lazy init** (`init`) for expensive initial state.  
- Memoize context `value` (`useMemo`) if exposing reducer through context.  
- When state is simple or independent → `useState` is perfectly fine (don’t overcomplicate).

---

## ❓ Interview Q&A

**Q1. When would you choose `useReducer` over `useState`?**  
A: When state updates are **complex**, **related**, or need to be **centralized** with explicit actions (e.g., forms, lists, wizards), or when you want a **Redux-like** flow inside a component.

---

**Q2. What makes a reducer “pure”?**  
A: Given the same `(state, action)`, it always returns the same `newState` with **no side-effects** and **no external mutations**.

---

**Q3. How do you initialize state with `useReducer` from persisted storage?**  
A: Use the 3rd `init` argument for **lazy initialization** and hydrate from `localStorage/sessionStorage/URL`.

---

**Q4. Does `dispatch` identity change between renders?**  
A: No. `dispatch` is **stable** (reference doesn’t change), so safe to pass down without wrappers.

---

**Q5. How does React decide to re-render when using `useReducer`?**  
A: If the **returned state reference** from the reducer differs from the previous one, React re-renders the component.

---

**Q6. Can you split reducers?**  
A: Yes—create multiple `useReducer` instances per component or compose reducers and pass combined state through context.

---

**Q7. How do you prevent re-renders of consumers when exposing state via context?**  
A: Memoize the provider `value` and/or split contexts (e.g., separate `StateContext` and `DispatchContext`).

---