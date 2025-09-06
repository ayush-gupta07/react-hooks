# ⚛️ React Hook: `useRef`

## 📖 Quick Summary
- `useRef` returns a **mutable ref object** whose `.current` property persists across renders.  
- It does **not trigger a re-render** when updated.  
- Common use cases: accessing DOM elements, storing mutable values, caching values between renders.  
- Syntax:  
  ```tsx
  const ref = useRef(initialValue);
  ```

---

## 🧠 Mental Model
- Think of `useRef` as a **sticky note 📝** attached to your component.  
- It survives re-renders without causing re-renders itself.  
- `.current` is like a box where you can store data that React won’t track for rendering.

---

## 🔑 Key Concepts
1. **Persistent Across Renders**
   - The object returned by `useRef` is stable across renders.  
   - Unlike state, updating `.current` does not trigger re-render.

2. **Accessing DOM Elements**
   - Attach `ref` to a DOM element using the `ref` attribute.  
   - Useful for focusing inputs, measuring elements, controlling animations.

3. **Storing Mutable Values**
   - Keep any mutable value (like interval IDs, previous values) without re-rendering.  

4. **Difference vs `useState`**
   - `useState` triggers a re-render on change.  
   - `useRef` just stores the value silently.

---

## 💻 Code Examples

### Example 1: Accessing a DOM Element
```tsx
import { useRef } from "react";

export default function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Type here..." />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) `useRef(null)` creates a ref object with `.current = null`.  
2) React assigns `inputRef.current` to the `<input>` DOM node after rendering.  
3) Clicking the button calls `handleFocus`, which invokes `.focus()` on the input DOM element.  
4) The input gets focus programmatically without re-rendering.

---

### Example 2: Storing Mutable Values (Timer ID)
```tsx
import { useRef, useState } from "react";

export default function Timer() {
  const [count, setCount] = useState(0);
  const timerRef = useRef<number | null>(null);

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = window.setInterval(() => {
        setCount(c => c + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) `timerRef.current` starts as `null`.  
2) Clicking **Start** sets an interval and stores its ID in `timerRef.current`.  
3) Because refs don’t cause re-renders, this update doesn’t refresh the UI.  
4) Clicking **Stop** clears the interval using the stored ID and resets `.current`.  

---

### Example 3: Storing Previous State Value
```tsx
import { useState, useRef, useEffect } from "react";

export default function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef<number | null>(null);

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      <p>Now: {count}, Before: {prevCountRef.current}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) On first render, `prevCountRef.current = null`.  
2) Every time `count` changes, the `useEffect` updates `prevCountRef.current` to the latest value.  
3) UI shows both current and previous count values.  

---

### Example 4: Avoiding Re-Creation of Objects
```tsx
import { useRef } from "react";

export default function CounterRef() {
  const renderCount = useRef(0);
  renderCount.current++;

  return <p>Component rendered {renderCount.current} times</p>;
}
```
**How it works (step‑by‑step):**
1) On first render, `renderCount.current = 0`.  
2) Each render increments `renderCount.current`.  
3) Because ref persists between renders, the count continues across renders.  
4) Unlike state, updating this value does not cause another render → avoids infinite loops.

---

## ⚠️ Common Pitfalls & Gotchas
- ❌ Expecting ref updates to trigger re-renders → they don’t.  
- ❌ Using refs when state is needed (e.g., UI updates).  
- ❌ Forgetting cleanup when storing things like timers or subscriptions.  

---

## ✅ Best Practices
- Use refs for **DOM access** and **non-UI mutable values**.  
- Use state when the UI must update in response to value changes.  
- Combine with `useEffect` to update refs based on state changes.  
- Keep refs minimal; don’t overuse them for general data storage.  

---

## ❓ Interview Q&A

**Q1. What is `useRef` used for?**  
A: To persist values across renders without causing re-renders. Commonly used for DOM access, storing mutable values, or caching.

---

**Q2. How is `useRef` different from `useState`?**  
A:  
- `useState` updates trigger a re-render.  
- `useRef` updates don’t trigger re-render; it just stores the value.  

---

**Q3. Can you store a previous state value with `useRef`?**  
A: Yes. By updating the ref in `useEffect`, you can capture the previous value between renders.

---

**Q4. How do you access a DOM node with `useRef`?**  
A: Attach it to an element using the `ref` attribute. Example:  
```tsx
const inputRef = useRef(null);
<input ref={inputRef} />
```  

---

**Q5. Does updating `useRef.current` trigger a re-render?**  
A: No. That’s the main difference from state. It only changes the stored value.

---

**Q6. Can you use multiple refs in a component?**  
A: Yes, you can call `useRef` multiple times for different DOM nodes or values.

---