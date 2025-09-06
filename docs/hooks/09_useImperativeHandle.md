# ⚛️ React Hook: `useImperativeHandle`

## 📖 Quick Summary
- `useImperativeHandle` lets a component **customize the ref value it exposes** to its parent.  
- It’s always used **together with** `forwardRef`.  
- Enables a parent to call specific methods on a child component instead of exposing raw DOM or implementation details.  
- Syntax:  
  ```tsx
  useImperativeHandle(ref, () => handleObject, [deps?]);
  ```

## 🧠 Mental Model
- Think of `ref` as a **remote control 🎮** given to the parent.  
- By default, the remote points to the DOM node (or class instance).  
- With `useImperativeHandle`, you **decide what buttons** (methods/properties) appear on the remote.  

## 🔑 Key Concepts
1. **Works with `forwardRef`**
   - Needed to forward the parent’s ref into the child.

2. **Custom Handle**
   - Defines what the parent can access on `ref.current`.

3. **Dependencies**
   - Optional dependency array ensures handle is recomputed only when needed.

4. **Escape Hatch**
   - Use it only when declarative props aren’t enough (focus, scroll, animations).

## 💻 Code Examples

### Example 1: Expose `focus()` and `clear()` on an Input
```tsx
import { forwardRef, useImperativeHandle, useRef } from "react";

export type InputHandle = {
  focus: () => void;
  clear: () => void;
};

const FancyInput = forwardRef<InputHandle>(function FancyInput(_, ref) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },
    clear() {
      if (inputRef.current) inputRef.current.value = "";
    },
  }), []);

  return <input ref={inputRef} placeholder="Type here" />;
});

export default FancyInput;
```
**How it works (step‑by‑step):**
1) Parent passes a ref to `FancyInput`.  
2) Inside child, `useImperativeHandle` maps that ref to a **custom object** `{ focus, clear }`.  
3) Parent can now call `ref.current.focus()` or `ref.current.clear()`.  
4) Parent does not get direct access to the raw DOM element.  

---

### Example 2: Parent Using the Custom API
```tsx
import { useRef } from "react";
import FancyInput, { InputHandle } from "./FancyInput";

export default function App() {
  const inputRef = useRef<InputHandle>(null);

  return (
    <div>
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
      <button onClick={() => inputRef.current?.clear()}>Clear</button>
      <FancyInput ref={inputRef} />
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) `App` creates a ref of type `InputHandle`.  
2) The ref is attached to `<FancyInput />`.  
3) Clicking buttons calls the custom methods exposed by the child.  

---

### Example 3: Media Player Controls
```tsx
import { forwardRef, useImperativeHandle, useRef, useCallback } from "react";

type PlayerHandle = {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
};

const VideoPlayer = forwardRef<PlayerHandle>(function VideoPlayer(_, ref) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = useCallback(() => videoRef.current?.play(), []);
  const pause = useCallback(() => videoRef.current?.pause(), []);
  const seek = useCallback((t: number) => {
    if (videoRef.current) videoRef.current.currentTime = t;
  }, []);

  useImperativeHandle(ref, () => ({ play, pause, seek }), [play, pause, seek]);

  return <video ref={videoRef} src="/video.mp4" width="400" />;
});

export default VideoPlayer;
```
**How it works (step‑by‑step):**
1) Internal `videoRef` points to the `<video>` element.  
2) Stable callbacks (`play`, `pause`, `seek`) are created with `useCallback`.  
3) `useImperativeHandle` exposes those methods to parent.  
4) Parent can now control video imperatively (`ref.current.play()`).  

---

### Example 4: Restrict Access (Hiding Internals)
```tsx
import { forwardRef, useImperativeHandle, useRef } from "react";

type ScrollHandle = { scrollToTop: () => void };

const ScrollBox = forwardRef<ScrollHandle>(function ScrollBox(_, ref) {
  const divRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    scrollToTop() {
      divRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    },
  }));

  return (
    <div ref={divRef} style={{ overflow: "auto", height: 200 }}>
      {/* Large content */}
    </div>
  );
});

export default ScrollBox;
```
**How it works (step‑by‑step):**
1) Internal `divRef` points to the scrollable container.  
2) Instead of exposing `divRef` directly, only a `scrollToTop()` method is exposed.  
3) Parent cannot manipulate DOM directly → reduces coupling.  

## ⚠️ Common Pitfalls & Gotchas
- ❌ Forgetting to wrap child with `forwardRef`.  
- ❌ Exposing entire DOM refs → defeats the purpose of hiding internals.  
- ❌ Not memoizing functions → causes handle object to change each render.  
- ❌ Overusing it when declarative props suffice.  

## ✅ Best Practices
- Keep the exposed API **minimal and stable**.  
- Use `useCallback` for stable functions.  
- Prefer declarative props; use imperative handle only for focus, scroll, media, or 3rd‑party APIs.  
- Type the handle (`InputHandle`, `PlayerHandle`) in TypeScript for safety.  

## ❓ Interview Q&A

**Q1. Why do we need `useImperativeHandle`?**  
A: To expose a controlled, custom API to the parent via ref, instead of exposing raw DOM or implementation details.

---

**Q2. Can `useImperativeHandle` work without `forwardRef`?**  
A: No. You need `forwardRef` to pass parent’s ref into the child.

---

**Q3. When should you avoid `useImperativeHandle`?**  
A: When a declarative prop/state can achieve the same goal. Overusing imperative APIs increases coupling.

---

**Q4. How do you keep the handle stable across renders?**  
A: Wrap functions in `useCallback` and use a proper dependency array in `useImperativeHandle`.

---

**Q5. Can you expose values as well as methods?**  
A: Yes, but methods are safer for dynamic values (they always read the latest state).  
