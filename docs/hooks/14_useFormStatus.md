# ⚛️ React Hook: `useFormStatus`

## 📖 Quick Summary
- `useFormStatus` is a React 19+ hook that lets you check the **status of the nearest parent `<form>` submission**.  
- It provides useful flags like `pending`, `data`, and `method` to build responsive and accessible form UIs.  
- Typically used inside **form components** (e.g., a `SubmitButton`) to disable/indicate pending states automatically.  
- Signature:  
  ```tsx
  const { pending, data, method, action } = useFormStatus();
  ```

---

## 🧠 Mental Model
- Think of `useFormStatus` as a **contextual status checker** 📡 for the form it’s inside.  
- When a form is submitted, the nearest `useFormStatus` hook re-runs with updated values.  
- It **does not** provide the entire state of the form — only metadata about the current submission.

---

## 🔑 Key Concepts
1. **Must be called inside a `<form>` descendant**  
   - It only works in components nested under a form element.

2. **Returned values**
   - `pending`: boolean → true while the form is being submitted.  
   - `data`: the `FormData` object from the submission.  
   - `method`: the HTTP method (GET/POST) used.  
   - `action`: the form’s action reference.

3. **Granularity**
   - Each `<form>` boundary gets its own status context.  
   - Nested forms have independent statuses.

4. **Combine with `useActionState`**
   - `useActionState` manages state from an action; `useFormStatus` helps with **per-button UI feedback**.

---

## 💻 Code Examples

### Example 1: Disable submit button while pending
```tsx
import { useActionState, useFormStatus } from "react";

async function save(prev: string, formData: FormData) {
  return formData.get("name") as string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Saving…" : "Save"}
    </button>
  );
}

export default function ProfileForm() {
  const [name, action] = useActionState(save, "");

  return (
    <form action={action}>
      <input name="name" defaultValue={name} />
      <SubmitButton />
    </form>
  );
}
```
**How it works (step‑by‑step):**
1) `<ProfileForm>` uses `useActionState` to handle form data.  
2) Inside, `SubmitButton` calls `useFormStatus()` → gets `{ pending }`.  
3) On submit, `pending = true` → button shows “Saving…” and disables itself.  
4) When action resolves, `pending = false` and button resets.

---

### Example 2: Showing submitted data (FormData)
```tsx
import { useActionState, useFormStatus } from "react";

async function signup(prev: any, formData: FormData) {
  return { email: formData.get("email") };
}

function Status() {
  const { pending, data } = useFormStatus();
  return (
    <p>
      {pending ? "Submitting…" : data ? `Submitted: ${data.get("email")}` : "Idle"}
    </p>
  );
}

export default function SignupForm() {
  const [state, action] = useActionState(signup, {});
  return (
    <form action={action}>
      <input name="email" type="email" required />
      <button type="submit">Sign up</button>
      <Status />
    </form>
  );
}
```
**How it works (step‑by‑step):**
1) Submitting the form triggers the `signup` action.  
2) `useFormStatus` exposes `pending` and the actual submitted `FormData`.  
3) While pending, it shows “Submitting…”; afterwards, shows the submitted email.

---

### Example 3: Different buttons in the same form
```tsx
import { useActionState, useFormStatus } from "react";

async function process(prev: string, formData: FormData) {
  return formData.get("intent") as string;
}

function SubmitButton({ label }: { label: string }) {
  const { pending, data } = useFormStatus();
  const intent = data?.get("intent");
  const isThisButton = pending && intent === label;
  return (
    <button type="submit" name="intent" value={label} disabled={pending}>
      {isThisButton ? "Working…" : label}
    </button>
  );
}

export default function MultiActionForm() {
  const [result, action] = useActionState(process, "");

  return (
    <form action={action}>
      <SubmitButton label="Save" />
      <SubmitButton label="Delete" />
      <p>Result: {result}</p>
    </form>
  );
}
```
**How it works (step‑by‑step):**
1) Both buttons submit the same form but with different `intent` values.  
2) `useFormStatus` exposes the `FormData` being submitted.  
3) Each button checks if it matches the submitted `intent`.  
4) Only the active button shows “Working…”.

---

### Example 4: Nested forms with independent statuses
```tsx
import { useActionState, useFormStatus } from "react";

async function saveName(prev: string, formData: FormData) {
  return formData.get("name") as string;
}
async function saveEmail(prev: string, formData: FormData) {
  return formData.get("email") as string;
}

function PendingLabel({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return <span>{pending ? `${label}…` : label}</span>;
}

export default function AccountSettings() {
  const [name, nameAction] = useActionState(saveName, "");
  const [email, emailAction] = useActionState(saveEmail, "");

  return (
    <div>
      <form action={nameAction}>
        <input name="name" defaultValue={name} />
        <button type="submit"><PendingLabel label="Save name" /></button>
      </form>

      <form action={emailAction}>
        <input name="email" defaultValue={email} />
        <button type="submit"><PendingLabel label="Save email" /></button>
      </form>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) There are two forms, each with its own `useActionState`.  
2) Each form has its own `useFormStatus` context.  
3) Submitting one form shows pending only for that form’s button.

---

## ⚠️ Common Pitfalls & Gotchas
- ❌ Calling it **outside a `<form>`** → always returns idle state.  
- ❌ Expecting it to return entire form state/validation → it only returns **status metadata**.  
- ❌ Using one `useFormStatus` across multiple forms → each must have its own context.  
- ❌ Forgetting accessibility → always announce pending/submitted states (e.g., `aria-live`).

---

## ✅ Best Practices
- Use `useFormStatus` in **small components** like `SubmitButton` or `StatusLabel`.  
- Pair with `useActionState` to manage server results and `useOptimistic` for optimistic UI.  
- Keep feedback **accessible** (aria‑live, role="status").  
- Keep logic **close to the form**; don’t centralize form statuses unnecessarily.

---

## ❓ Interview Q&A

**Q1. What does `useFormStatus` return?**  
A: An object `{ pending, data, method, action }` describing the nearest form submission.

**Q2. Can `useFormStatus` work outside a form?**  
A: No, it must be used inside a form or its descendants.

**Q3. Difference between `useFormStatus` and `useActionState`?**  
A: `useActionState` manages local state updates from a form action. `useFormStatus` gives **submission metadata** (pending, FormData, etc.) for UI feedback.

**Q4. How can you show different pending states for different buttons in the same form?**  
A: Check the `FormData` returned by `useFormStatus` to see which button submitted.

**Q5. Does `useFormStatus` handle validation?**  
A: No. Validation should happen in the action (server/client); `useFormStatus` just shows pending/submission info.

---
