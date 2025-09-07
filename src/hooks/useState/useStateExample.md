# 🧩 useState Examples Guide

This folder contains a curated set of **8 progressively complex examples** that demonstrate how to use React's `useState` hook effectively.  

The goal is to **cover all major scenarios you'll encounter in real-world projects** — from the simplest counter to advanced undo/redo and persistence.

---

## 📚 Why these examples?

- ⚡ **Incremental learning**: Start with a simple counter and gradually move to complex state management.  
- 🧠 **Key mental models**: Functional updates, batching, immutability.  
- 🛠️ **Real-world patterns**: Forms, arrays, objects, persistence, history.  
- 🚨 **Pitfalls included**: Stale state bugs, unnecessary recomputation, derived state anti-patterns.  

By the end, you'll have hands-on practice with **all scenarios where `useState` shines**.

---

## 📂 Examples Overview

### 1. 🔢 [`CounterBasic.tsx`](./examples/01_CounterBasics.tsx)
**What it shows:** The simplest possible useState example  
**Why it matters:** This is your first step into React state management  
**Key concepts:**
- How to initialize state with a starting value (0)
- How to read the current state value
- Two ways to update state: direct (`count + 1`) vs functional (`c => c + 1`)
- Why functional updates are often safer

**Real-world use:** Any time you need a number that goes up/down (likes, cart items, page numbers)

---

### 2. ⚠️ [`FunctionalUpdateVsStale.tsx`](./examples/02_FunctionalUpdateVsStale.tsx)
**What it shows:** A common bug where updates don't work as expected  
**Why it matters:** This bug happens in real apps and is confusing for beginners  
**The problem:** When you click "+2 (wrong)", it only adds 1 instead of 2  
**Why it happens:** Both `setN(n + 1)` calls read the same old value of `n`  
**The solution:** Use `setN(v => v + 1)` - React gives you the latest value each time

**Real-world use:** Any time you need multiple updates in one function (like increment counters multiple times)

---

### 3. 🚀 [`LazyInit.tsx`](./examples/03_LazyInit.tsx)
**What it shows:** How to avoid expensive calculations on every render  
**Why it matters:** Improves performance when initial state is costly to compute  
**The trick:** Pass a function `useState(() => expensiveInit())` instead of calling it directly  
**What happens:** The expensive function only runs once, not on every render

**Real-world use:** Reading from localStorage, complex calculations, API calls for initial data

---

### 4. 📝 [`ObjectAndArrayUpdates.tsx`](./examples/04_ObjectAndArrayUpdates.tsx)
**What it shows:** How to update complex data (objects and arrays) correctly  
**Why it matters:** React only re-renders when it detects state changes  
**Key rule:** Never mutate (directly change) state - always create new objects/arrays  
**Techniques shown:**
- Object updates: `{...user, city: "Bangalore"}` (spread operator)
- Array additions: `[...todos, newTodo]`
- Array updates: `todos.map(t => t.id === id ? {...t, done: !t.done} : t)`
- Array removals: `todos.filter(t => t.id !== id)`

**Real-world use:** Todo lists, shopping carts, user profiles, any complex data

---

### 5. 📋 [`ControlledFormMinimal.tsx`](./examples/05_ControlledFormMinimal.tsx)
**What it shows:** How to manage form inputs with React state  
**Why it matters:** Forms are everywhere in web apps  
**Key concept:** "Controlled components" - React controls the input values  
**Pattern shown:** Store all form fields in one state object  
**Benefits:** Easy to reset, validate, and submit form data

**Real-world use:** Login forms, registration, settings pages, any user input

---

### 6. ⏱️ [`BatchingAndTiming.tsx`](./examples/06_BatchingAndTiming.tsx)
**What it shows:** How React groups multiple state updates together  
**Why it matters:** Understanding when your component re-renders  
**Key insight:** Multiple `setState` calls in the same event only cause one re-render  
**What you'll see:** All 3 increments happen at once, not one by one

**Real-world use:** Understanding performance and when side effects run

---

### 7. ↩️ [`UndoRedoMinimal.tsx`](./examples/07_UndoRedoMinimal.tsx)
**What it shows:** How to build undo/redo functionality with just useState  
**Why it matters:** Shows advanced state management without external libraries  
**The pattern:** Three state pieces - past (history), present (current), future (undone actions)  
**How it works:**
- New action → save current to past, clear future
- Undo → move current to future, restore from past
- Redo → move current to past, restore from future

**Real-world use:** Text editors, drawing apps, any app where users make mistakes

---

### 8. 💾 [`PersistLocalStorage.tsx`](./examples/08_PersistLocalStorage.tsx)
**What it shows:** How to save state so it survives page reloads  
**Why it matters:** Users expect their settings/data to persist  
**Two key parts:**
- Lazy init: `useState(() => localStorage.getItem("theme") || "light")`
- Save on change: `useEffect(() => localStorage.setItem("theme", theme), [theme])`

**Real-world use:** User preferences, shopping cart, draft content, any data that should persist

---

## ⚠️ Common Pitfalls with `useState`

- **Stale closures** → always prefer functional updates inside async code or multiple updates.  
- **Mutating state directly** → React won't detect changes if reference doesn't change.  
- **Derived state duplication** → don't store something in state if it can be computed from props/other state.  
- **Heavy initialization** → use lazy init to avoid recomputing on every render.  

---

## 🤔 When NOT to use `useState`

- When state transitions become complex (e.g., undo/redo with multiple branches, async workflows) → prefer `useReducer`.  
- When global/shared state is needed → use `useContext` or state libraries.  
- When you need to derive data from other sources (props, memoization) → use `useMemo` instead of duplicating state.  

---

## 🏆 Next Steps

1. Open [`UseState.tsx`](./UseState.tsx).  
2. Uncomment examples one by one to practice.  
3. Observe re-renders, console logs, and experiment.  
4. Compare your intuition with actual React behavior.  

> 💡 Mastering these patterns will make hooks like `useReducer`, `useEffect`, and `useRef` much easier to learn — since they often build on these foundations.