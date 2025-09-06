# ⚛️ React Hook: `useActionState`

## 📖 Quick Summary
- `useActionState` lets a component **update local state from the result of a form action** and track its **pending** status.  
- Signature (React 19+):  
  ```tsx
  const [state, formAction, isPending] = useActionState(action, initialState, permalink?);
  ```
- The **action function** gets an extra first argument: the **previous (or initial) state**, followed by the usual action args (e.g., `FormData`).  
- Use it with `<form action={formAction}>` or `<button formAction={formAction}>`. It also works when you **call the action manually** inside `startTransition`. 

## 🧠 Mental Model
- Think of `useActionState` as a **stateful wrapper around a form action**.  
- Each submit calls your action → returns a value → that value becomes the **new local state**.  
- While the action is running, `isPending` is `true` so you can show **progress UI**.  
- With Server Functions (RSC/Next.js), the returned state can show **even before hydration**; without RSC it behaves like regular local state. 

## 🔑 Key Concepts
1. **Return tuple**
   - `[state, formAction, isPending]` → current state, the action you pass to the form, and a pending flag. 
2. **Action signature**
   - When wrapped by `useActionState`, your function receives `(previousState, ...args)` (e.g., `(prev, formData)`). The submitted data shifts to **second** argument. 
3. **Initial State**
   - `initialState` is used until the first successful submit; thereafter `state` comes from the action’s return value. 
4. **Permalink (optional)**
   - For progressive enhancement with Server Functions: if JS isn’t loaded yet, the browser navigates to the `permalink` URL; React passes state through once hydrated. 

## 💻 Code Examples

### Example 1: Minimal counter with a form button
```tsx
import { useActionState } from "react";

// note the first argument is *previous state*
async function increment(previous: number, formData: FormData) {
  // do work (could call a server function)
  return previous + 1;
}

export default function CounterForm() {
  const [count, formAction, isPending] = useActionState(increment, 0);

  return (
    <form>
      <p>Count: {count}</p>
      <button type="submit" formAction={formAction} disabled={isPending}>
        {isPending ? "Incrementing…" : "Increment"}
      </button>
    </form>
  );
}
```
**How it works (step‑by‑step):**
1) First render: `count = 0` (initial).  
2) On submit, React calls `increment(prevState=0, formData)` and sets `isPending = true`.  
3) The returned value (`1`) becomes the new `count`.  
4) `isPending` flips back to `false`; the UI re-renders with the latest count. 

---

### Example 2: Displaying validation errors returned by an action
```tsx
import { useActionState } from "react";

type FormState = { ok: boolean; message: string };

async function save(prev: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get("name") || "");
  if (name.trim().length < 3) {
    return { ok: false, message: "Name must be at least 3 characters." };
  }
  // pretend to persist...
  return { ok: true, message: `Saved ${name}!` };
}

export default function ProfileForm() {
  const [state, action, isPending] = useActionState<FormState>(save, {
    ok: false,
    message: "",
  });

  return (
    <form action={action}>
      <label>
        Name: <input name="name" />
      </label>
      <button type="submit" disabled={isPending}>
        {isPending ? "Saving…" : "Save"}
      </button>
      {state.message && (
        <p role="status" style={{ color: state.ok ? "green" : "crimson" }}>
          {state.message}
        </p>
      )}
    </form>
  );
}
```
**How it works (step‑by‑step):**
1) The form submits to `action` (the wrapper React returned).  
2) `save(prev, formData)` runs and **returns structured state** (success + message).  
3) The returned object becomes the new `state` and is rendered; `isPending` covers the busy time. 

---

### Example 3: Server Function + `useActionState` (Next.js / RSC)
```tsx
// actions.ts
"use server";

import { z } from "zod";

type FormState = { ok: boolean; message: string };

export async function createUser(prev: FormState, formData: FormData): Promise<FormState> {
  const schema = z.object({ email: z.string().email() });
  const parsed = schema.safeParse({ email: String(formData.get("email") || "") });
  if (!parsed.success) return { ok: false, message: "Invalid email." };
  // perform server-side mutation...
  return { ok: true, message: "User created!" };
}
```
```tsx
// Client component
"use client";
import { useActionState } from "react";
import { createUser } from "./actions";

export default function Signup() {
  const [state, formAction, isPending] = useActionState(createUser, { ok: false, message: "" });

  return (
    <form action={formAction}>
      <input name="email" type="email" placeholder="you@example.com" required />
      <button type="submit" disabled={isPending}>{isPending ? "Creating…" : "Create account"}</button>
      {state.message && <p aria-live="polite">{state.message}</p>}
    </form>
  );
}
```
**How it works (step‑by‑step):**
1) The **server function** `createUser(prev, formData)` runs on submit (signature includes `prev`).  
2) Its **return value** is streamed back and shown as `state` (even before hydration).  
3) The client component renders `state.message`; `isPending` reflects the request status. 

---

### Example 4: Calling the action manually inside a transition
```tsx
import { startTransition, useActionState } from "react";

async function remove(prev: string[], formData: FormData) {
  const id = String(formData.get("id"));
  return prev.filter(x => x !== id);
}

export default function Remover() {
  const [items, action, isPending] = useActionState<string[]>(remove, ["a", "b", "c"]);

  // You can also call the action yourself:
  const removeItem = (id: string) => {
    const data = new FormData();
    data.set("id", id);
    startTransition(() => action(data)); // schedules at lower priority
  };

  return (
    <div>
      <ul>
        {items.map(id => (
          <li key={id}>
            {id} <button onClick={() => removeItem(id)} disabled={isPending}>x</button>
          </li>
        ))}
      </ul>
      {/* Or a regular form: <form action={action}>…</form> */}
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) `useActionState` returns a callable `action`.  
2) We build a `FormData` and call it inside `startTransition` for non‑urgent updates.  
3) The returned array becomes the new `items`; `isPending` covers progress. 

## ⚠️ Common Pitfalls & Gotchas
- ❌ **Wrong action signature** when wrapped: remember `prevState` is **first** and submitted data moves to **second** argument.   
- ❌ Expecting it to work without the form wrapper/action prop: pass `formAction` to `<form>` or a `<button>` with `formAction`.   
- ❌ Ignoring progressive enhancement on dynamic pages: if you use `permalink`, ensure the same form/action exists at the destination.   
- ❌ Treating it as global state: `useActionState` updates **component-local** state; for shared state, lift or use context.  

## ✅ Best Practices
- Return **structured state** (e.g., `{ok, message, data}`) to simplify UI rendering after submit.   
- Combine with **`useFormStatus`** for per-button pending/disabled states inside forms, and with **`useOptimistic`** for optimistic UI while waiting.   
- Validate on the **server** for security; surface errors by returning them via state (or throwing and catching if your framework supports it). 
- For big updates, consider wrapping manual calls in a **transition** (`startTransition`) to keep the UI responsive. 

## ❓ Interview Q&A

**Q1. What does `useActionState` return and how do you use it?**  
A: `[state, formAction, isPending]`. You pass `formAction` to `<form action={…}>` or `<button formAction={…}>`, render `state` from the last submit, and show feedback with `isPending`. 

**Q2. How does the action’s function signature change with `useActionState`?**  
A: It becomes `(previousState, ...args)` (e.g., `(prev, formData)`), so the submitted data is the **second** parameter. 

**Q3. What’s the purpose of the optional `permalink` argument?**  
A: It supports **progressive enhancement** on dynamic pages: before JS loads, the browser can navigate to a stable URL while React preserves state across hydration. 

**Q4. How is `useActionState` different from `useTransition` or `useDeferredValue`?**  
A: `useActionState` wires **form submit results** into local state. `useTransition` changes **priority** of updates; `useDeferredValue` renders from a **lagging copy** of a value.

**Q5. Do you need React Server Components to use `useActionState`?**  
A: No. Without RSC it behaves like local state; with RSC it can render server-returned state **before hydration**. 
