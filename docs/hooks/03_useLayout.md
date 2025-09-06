# ⚛️ React Hook: `useLayoutEffect`

## 📖 Quick Summary
- `useLayoutEffect` is similar to `useEffect`, but it runs **synchronously after all DOM mutations** and **before the browser paints**.  
- Use it when you need to **read layout values** or **synchronously re-render** before the browser updates the screen.  
- Syntax:  
  ```tsx
  useLayoutEffect(() => {
    // effect code
    return () => {
      // optional cleanup
    };
  }, [dependencies]);
  ```

---

## 🧠 Mental Model
- Think of `useEffect` as running **after painting** 🎨 (async, non-blocking).  
- Think of `useLayoutEffect` as running **before painting** 🛠 (blocking).  
- Use it only when the DOM **measurement or mutation** must be done before the browser visually updates.

---

## 🔑 Key Concepts
1. **Execution Timing**
   - `useLayoutEffect` fires synchronously after DOM updates but **before paint**.
   - `useEffect` fires asynchronously after paint.

2. **When to Use**
   - Measuring DOM nodes (width, height, position).  
   - Mutating DOM styles synchronously.  
   - Avoiding flicker by making adjustments before the user sees the UI.

3. **Cleanup**
   - Same as `useEffect`, cleanup runs before next effect or component unmount.

4. **Performance Warning**
   - Blocks the paint process → overuse may cause performance issues.

---

## 💻 Code Examples

### Example 1: Basic Usage (DOM measurement)
```tsx
import { useLayoutEffect, useRef } from "react";

export default function Box() {
  const boxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (boxRef.current) {
      console.log("Box width:", boxRef.current.getBoundingClientRect().width);
    }
  }, []);

  return <div ref={boxRef} style={{ width: "200px", height: "100px", background: "skyblue" }}>Box</div>;
}
```
**How it works (step‑by‑step):**
1) React renders the `<div>` and commits it to the DOM.  
2) Before the browser paints, `useLayoutEffect` runs synchronously.  
3) We read measurements (`getBoundingClientRect`) while layout is up‑to‑date.  
4) The browser then paints, ensuring no visible flicker between measurement and paint.

---

### Example 2: Avoiding Flicker (synchronous style tweak)
```tsx
import { useState, useLayoutEffect } from "react";

export default function FlickerExample() {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    // synchronously adjust width before paint
    setWidth(window.innerWidth / 2);
  }, []);

  return <div style={{ width, background: "lightcoral" }}>Width adjusted before paint</div>;
}
```
**How it works (step‑by‑step):**
1) Initial render sets `width = 0`.  
2) `useLayoutEffect` runs before paint and updates `width` to `window.innerWidth / 2`.  
3) React immediately re-renders synchronously with the new width.  
4) The user only ever sees the **final** width → no flashing/flicker.

---

### Example 3: Comparing `useEffect` vs `useLayoutEffect`
```tsx
import { useEffect, useLayoutEffect } from "react";

export default function Comparison() {
  useEffect(() => {
    console.log("useEffect: runs after paint");
  });

  useLayoutEffect(() => {
    console.log("useLayoutEffect: runs before paint");
  });

  return <p>Check console logs</p>;
}
```
**How it works (step‑by‑step):**
1) Component renders and commits to the DOM.  
2) `useLayoutEffect` logs **first** (before the browser paints).  
3) Browser paints the UI.  
4) `useEffect` logs **after** paint.  

---

## ⚠️ Common Pitfalls & Gotchas
- ❌ Overusing `useLayoutEffect` → blocks painting, can cause jank.  
- ❌ Using it when `useEffect` is enough.  
- ❌ Forgetting cleanup when adding DOM listeners or styles.  

---

## ✅ Best Practices
- Prefer `useEffect` for most side effects.  
- Use `useLayoutEffect` **only when DOM measurements/updates must happen before paint**.  
- Keep logic inside `useLayoutEffect` minimal to avoid blocking rendering.  
- Clean up listeners/timers to avoid memory leaks.  

---

## ❓ Interview Q&A

**Q1. Difference between `useEffect` and `useLayoutEffect`?**  
A:  
- `useEffect` → runs asynchronously after paint (non-blocking).  
- `useLayoutEffect` → runs synchronously before paint (blocking).  

---

**Q2. When should you use `useLayoutEffect`?**  
A: For reading layout (DOM size/position) or synchronously applying style changes before the browser repaints.  

---

**Q3. What happens if you overuse `useLayoutEffect`?**  
A: It delays painting → poor performance and laggy UI.  

---

**Q4. Can you use multiple `useLayoutEffect` hooks in one component?**  
A: Yes, just like `useEffect`. They run in the order they are declared.  

---

**Q5. Is `useLayoutEffect` SSR-friendly?**  
A: No. On the server, React will warn you to use `useEffect` instead because layout-related APIs (like `getBoundingClientRect`) are not available on the server.  

---