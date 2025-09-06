# ⚛️ React Hook: `useContext`

## 📖 Quick Summary
- `useContext` provides a way to **share values** (state, functions, objects) across the component tree **without prop drilling**.  
- Works with the **Context API** (`React.createContext`).  
- Syntax:  
  ```tsx
  const value = useContext(MyContext);
  ```

---

## 🧠 Mental Model
- Imagine React context as a **broadcast station 📡**.  
- The `Provider` is the broadcaster that sends values.  
- Any child with `useContext` is a radio tuned in to receive those values.  
- No need to pass props down manually through multiple layers.

---

## 🔑 Key Concepts
1. **Creating Context**
   - `const MyContext = React.createContext(defaultValue);`

2. **Provider**
   - `<MyContext.Provider value={something}>`  
   - Wraps components and provides them access to the value.

3. **Consumer**
   - `useContext(MyContext)` → retrieves the current value.  
   - Renders with the value provided by the nearest Provider above in the tree.

4. **Reactivity**
   - If the Provider’s value changes, all consuming components re-render.

5. **Default Value**
   - Used when no Provider is found higher in the tree.

---

## 💻 Code Examples

### Example 1: Basic Context
```tsx
import { createContext, useContext } from "react";

const ThemeContext = createContext("light");

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>I am {theme} themed</button>;
}

export default function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}
```
**How it works (step‑by‑step):**
1) Create context with default `"light"`.  
2) Wrap `<ThemedButton>` with `<ThemeContext.Provider value="dark">`.  
3) Inside `ThemedButton`, `useContext(ThemeContext)` returns `"dark"`.  
4) Button renders with `"dark"` theme.  

---

### Example 2: Avoiding Prop Drilling
```tsx
import { createContext, useContext } from "react";

const UserContext = createContext(null);

function Profile() {
  const user = useContext(UserContext);
  return <h2>User: {user.name}</h2>;
}

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Profile />
    </div>
  );
}

export default function App() {
  const currentUser = { name: "Ayush", role: "Admin" };

  return (
    <UserContext.Provider value={currentUser}>
      <Dashboard />
    </UserContext.Provider>
  );
}
```
**How it works (step‑by‑step):**
1) `UserContext` created.  
2) Provider supplies `currentUser` object.  
3) `Profile` consumes `user` using `useContext`.  
4) No need to pass user props through `App → Dashboard → Profile`.  

---

### Example 3: Nested Providers (Multiple Contexts)
```tsx
import { createContext, useContext } from "react";

const ThemeContext = createContext("light");
const AuthContext = createContext(false);

function StatusBar() {
  const theme = useContext(ThemeContext);
  const isAuthenticated = useContext(AuthContext);
  return (
    <div className={theme}>
      {isAuthenticated ? "Logged in" : "Guest"} user
    </div>
  );
}

export default function App() {
  return (
    <ThemeContext.Provider value="dark">
      <AuthContext.Provider value={true}>
        <StatusBar />
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}
```
**How it works (step‑by‑step):**
1) Two contexts created (`ThemeContext`, `AuthContext`).  
2) Providers nested, each supplies its own value.  
3) `StatusBar` consumes both using separate `useContext` calls.  
4) Renders `"Logged in user"` with `"dark"` theme.  

---

### Example 4: Updating Context Value
```tsx
import { createContext, useContext, useState } from "react";

const CounterContext = createContext(null);

function CounterDisplay() {
  const { count, increment } = useContext(CounterContext);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}

export default function App() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(c => c + 1);

  return (
    <CounterContext.Provider value={{ count, increment }}>
      <CounterDisplay />
    </CounterContext.Provider>
  );
}
```
**How it works (step‑by‑step):**
1) Provider supplies `{ count, increment }`.  
2) `CounterDisplay` consumes both.  
3) Clicking `+1` updates state in parent.  
4) Provider sends updated value down.  
5) Consumer re-renders with new count.  

---

## ⚠️ Common Pitfalls & Gotchas
- ❌ Overusing context for all state → can cause unnecessary re-renders.  
- ❌ Forgetting to wrap with Provider → consumers receive default value.  
- ❌ Updating context with large objects → all consumers re-render even if they don’t use the updated part.  

---

## ✅ Best Practices
- Use context for **global state** (auth, theme, language).  
- Keep context values **minimal** (store only what’s needed).  
- Consider splitting contexts if values update at different frequencies.  
- Combine with memoization (`useMemo`) to avoid unnecessary re-renders.  

---

## ❓ Interview Q&A

**Q1. What problem does `useContext` solve?**  
A: It removes the need for prop drilling by allowing values to be shared across the component tree.  

---

**Q2. What happens if a component using `useContext` is not wrapped with a Provider?**  
A: It will use the default value provided when creating the context.  

---

**Q3. Can we have multiple contexts in one component?**  
A: Yes, you can call `useContext` multiple times for different contexts.  

---

**Q4. Does updating context re-render all consumers?**  
A: Yes, all components that consume that context will re-render when the value changes.  

---

**Q5. When should you avoid using `useContext`?**  
A: For frequently changing state (like input values), since it causes all consumers to re-render. Use local state or state libraries instead.  

---

**Q6. Difference between `useContext` and Redux?**  
- `useContext`: Good for small to medium global state, simple to use, built-in.  
- Redux: More powerful for complex state, debugging, middlewares, time-travel debugging.  

---