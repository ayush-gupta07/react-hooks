# ⚛️ React Hook: `useId`

## 📖 Quick Summary
- `useId` generates a **unique, stable ID string** for use in component markup.  
- Useful for associating form inputs with labels, accessibility attributes, and avoiding ID collisions.  
- IDs are **unique across the app** and **consistent between client and server** (important for SSR).  
- Syntax:  
  ```tsx
  const id = useId();
  ```

---

## 🧠 Mental Model
- Think of `useId` as a **ticket dispenser 🎟️**: each call returns a unique ticket (ID).  
- React guarantees uniqueness across components and renders.  
- IDs stay **stable** for the lifetime of the component.  

---

## 🔑 Key Concepts
1. **Unique per Component Instance**
   - Each call to `useId()` in a component instance returns a unique ID.

2. **Stable Across Renders**
   - The ID won’t change between re-renders.

3. **SSR Safe**
   - IDs match between server-rendered markup and client hydration, preventing mismatches.

4. **Accessibility**
   - Commonly used with `aria-*` attributes and `<label htmlFor>`.

5. **Prefixes**
   - React IDs look like `:r0:`, `:r1:`, etc.  
   - You can prepend your own prefix (e.g., `id={"username-" + id}`).

---

## 💻 Code Examples

### Example 1: Label and Input Association
```tsx
import { useId } from "react";

export default function NameField() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>Name:</label>
      <input id={id} type="text" />
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) `useId()` generates a unique ID (e.g., `:r0:`).  
2) The `<label>` uses `htmlFor={id}`, and `<input>` uses `id={id}`.  
3) Screen readers can associate the label and input correctly.  
4) If multiple `NameField` components exist, each one gets a different ID.  

---

### Example 2: Multiple IDs in One Component
```tsx
import { useId } from "react";

export default function LoginForm() {
  const emailId = useId();
  const passwordId = useId();

  return (
    <form>
      <label htmlFor={emailId}>Email:</label>
      <input id={emailId} type="email" />

      <label htmlFor={passwordId}>Password:</label>
      <input id={passwordId} type="password" />
    </form>
  );
}
```
**How it works (step‑by‑step):**
1) Each call to `useId()` returns a new unique ID (`:r1:`, `:r2:`).  
2) IDs remain stable across re-renders.  
3) Accessibility is maintained with correctly associated labels.  

---

### Example 3: Prefixing IDs for Clarity
```tsx
import { useId } from "react";

export default function SearchBox() {
  const id = useId();
  return (
    <div>
      <label htmlFor={`search-${id}`}>Search</label>
      <input id={`search-${id}`} type="text" />
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) `useId()` might return `:r3:`.  
2) We prepend `search-` → `id="search-:r3:"`.  
3) Helps debugging and makes IDs human-readable.  

---

### Example 4: useId with aria-describedby
```tsx
import { useId } from "react";

export default function PasswordInput() {
  const id = useId();
  return (
    <div>
      <input type="password" aria-describedby={`hint-${id}`} />
      <small id={`hint-${id}`}>Must be at least 8 characters</small>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) Input uses `aria-describedby` pointing to `small` element’s ID.  
2) Screen readers announce the hint text when focusing the input.  
3) Unique IDs prevent collisions when multiple password fields exist.  

---

## ⚠️ Common Pitfalls & Gotchas
- ❌ Using `Math.random()` or UUIDs in render → IDs change every render, breaking accessibility and hydration.  
- ❌ Forgetting to associate label and input properly.  
- ❌ Assuming IDs are globally predictable → they’re unique but not sequential across app boundaries.  

---

## ✅ Best Practices
- Use `useId` for **accessibility attributes** (`id`, `htmlFor`, `aria-*`).  
- Prepend a **semantic prefix** (`email-`, `search-`) for clarity.  
- Use one `useId` per unique field; multiple calls give multiple unique IDs.  
- Don’t misuse it as a general UUID generator (it’s only for React markup).  

---

## ❓ Interview Q&A

**Q1. Why do we need `useId` in React?**  
A: To generate unique, stable IDs that work consistently with SSR and across re-renders, avoiding collisions.

---

**Q2. How is `useId` different from `Math.random()`?**  
A: `useId` is stable between renders and consistent for SSR, while `Math.random()` generates a new ID every render, causing mismatches.

---

**Q3. When should you use `useId`?**  
A: For accessibility attributes like `id`, `htmlFor`, and `aria-*` that require stable, unique IDs.

---

**Q4. Can `useId` generate multiple IDs in the same component?**  
A: Yes, each call returns a new unique ID. They stay stable for the lifetime of the component instance.

---

**Q5. Is `useId` a replacement for database keys or UUIDs?**  
A: No. It’s only for **markup IDs** in React, not for identifying data objects.

---

**Q6. Does `useId` help with hydration mismatches in SSR?**  
A: Yes. It ensures IDs match between server-rendered HTML and client-side hydration.  

---