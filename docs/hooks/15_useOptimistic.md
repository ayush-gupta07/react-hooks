# ⚛️ React Hook: `useOptimistic`

## 📖 Quick Summary
- `useOptimistic` lets you **optimistically update the UI** before an async action finishes, then reconcile with the real result.  
- It returns a tuple:  
  ```tsx
  const [optimisticState, addOptimisticUpdate] = useOptimistic(baseState, updateFn);
  ```
  - `optimisticState` → the UI state including any pending optimistic patches  
  - `addOptimisticUpdate(patch)` → enqueue an optimistic patch; React derives a new optimistic state via `updateFn(prev, patch)`  
- Works great with **Server Actions / forms** and pairs naturally with `useActionState` & `useFormStatus` in React 19+.  

---

## 🧠 Mental Model
- Think of your state as a **ledger**. When the user does something, you immediately **append a provisional entry** (optimistic patch) so the UI feels instant.  
- When the server confirms, you **reconcile** (keep it) or **roll back** (remove/adjust) based on the real result.  
- Multiple optimistic patches can be queued; React folds them into the derived `optimisticState`.  

---

## 🔑 Key Concepts
1. **Base vs Optimistic State**
   - `baseState` is your canonical source (from props/state/server).  
   - `optimisticState` is what you render — `baseState` + all optimistic patches.

2. **Update Function**
   - `updateFn(draft, patch)` takes the previous optimistic value and returns a **new optimistic value**.  
   - Must be **pure** and **immutable**: never mutate inputs.

3. **Patches**
   - `patch` is arbitrary data describing the intended change (e.g., `{ type: "add", item }`).  
   - You choose the shape; keep it small and explicit.

4. **Reconciliation**
   - When the real action completes, update your actual state (or re-fetch).  
   - Optimistic patches are cleared; `optimisticState` falls back to the confirmed base state.

5. **Error Handling**
   - If the action fails, show an error and **roll back** (do not apply the failed patch to base state).  

---

## 💻 Code Examples

### Example 1: Optimistic add to a list
```tsx
import { useState, useOptimistic } from "react";

type Todo = { id: string; text: string; done: boolean };

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (current, patch: { type: "add"; todo: Todo }) => {
      if (patch.type === "add") {
        return [...current, patch.todo];
      }
      return current;
    }
  );

  async function createTodoOnServer(text: string) {
    // fake server latency
    await new Promise(r => setTimeout(r, 800));
    return { id: crypto.randomUUID(), text, done: false } as Todo;
  }

  async function handleAdd(text: string) {
    const temp: Todo = { id: "temp-" + Date.now(), text, done: false };
    addOptimistic({ type: "add", todo: temp }); // 1) Optimistic patch

    try {
      const saved = await createTodoOnServer(text); // 2) Real mutation
      setTodos(prev => [...prev, saved]);           // 3) Reconcile base
    } catch (e) {
      // 4) Failure: rollback is automatic because temp isn't in base
      console.error(e);
    }
  }

  return (
    <div>
      <button onClick={() => handleAdd(prompt("Todo?") || "New todo")}>Add</button>
      <ul>
        {optimisticTodos.map(t => (
          <li key={t.id}>{t.text}{t.id.startsWith("temp-") ? " (…saving)" : ""}</li>
        ))}
      </ul>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) User clicks **Add** → we enqueue an optimistic patch adding a temporary item.  
2) UI updates **immediately** using `optimisticTodos` (it includes the temp item).  
3) We perform the real server call; on success we update `todos` (base).  
4) Once `todos` includes the real item, the temporary entry naturally disappears from the optimistic projection (or you can reconcile IDs).  
5) On error, since base wasn’t changed, UI **rolls back** to base (optimistic temp item vanishes).  

---

### Example 2: Optimistic toggle (update) with rollback on error
```tsx
import { useState, useOptimistic } from "react";

type Todo = { id: string; text: string; done: boolean };

export default function ToggleTodos({ initial }: { initial: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(initial);

  const [optimistic, apply] = useOptimistic(
    todos,
    (current, patch: { type: "toggle"; id: string }) => {
      if (patch.type !== "toggle") return current;
      return current.map(t => (t.id === patch.id ? { ...t, done: !t.done } : t));
    }
  );

  async function toggleOnServer(id: string) {
    await new Promise(r => setTimeout(r, 600));
    // throw new Error("Random failure"); // uncomment to test rollback
    return id;
  }

  async function toggle(id: string) {
    apply({ type: "toggle", id }); // optimistic toggle
    try {
      await toggleOnServer(id);
      setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
    } catch {
      // On error do nothing to base → optimistic change disappears
      // Optionally show a toast/error message
    }
  }

  return (
    <ul>
      {optimistic.map(t => (
        <li key={t.id}>
          <label>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
            {t.text} {t.done ? "✅" : ""}
          </label>
        </li>
      ))}
    </ul>
  );
}
```
**How it works (step‑by‑step):**
1) `apply({type:"toggle", id})` flips the item in the optimistic projection instantly.  
2) Server call confirms; we apply the same change to base.  
3) If server fails, base remains unchanged → projection reverts automatically.  

---

### Example 3: With `useActionState` in a form
```tsx
import { useActionState, useOptimistic } from "react";

type State = { items: string[] };
async function addItem(prev: State, fd: FormData): Promise<State> {
  const text = String(fd.get("text") || "");
  await new Promise(r => setTimeout(r, 500));
  return { items: [...prev.items, text] };
}

export default function FormWithOptimistic() {
  const [state, formAction] = useActionState(addItem, { items: [] });

  const [optimistic, addOpt] = useOptimistic(
    state.items,
    (current, patch: { type: "add"; text: string }) =>
      patch.type === "add" ? [...current, patch.text] : current
  );

  return (
    <form
      action={async (fd) => {
        const text = String(fd.get("text") || "");
        addOpt({ type: "add", text });   // optimistic append
        await formAction(fd);            // real action updates base state
      }}
    >
      <input name="text" placeholder="Item" />
      <button type="submit">Add</button>
      <ul>{optimistic.map((t, i) => <li key={i}>{t}</li>)}</ul>
    </form>
  );
}
```
**How it works (step‑by‑step):**
1) On submit we first push an optimistic patch so the list updates instantly.  
2) We then run the real action via `formAction(fd)` which returns the confirmed state.  
3) When `state.items` updates, optimistic patches are cleared; UI reflects the confirmed base.  

---

### Example 4: Optimistic pagination cursor (advanced)
```tsx
import { useOptimistic } from "react";

type Page = { cursor: string; items: string[] };

export default function CursorViewer({ base }: { base: Page }) {
  const [page, expect] = useOptimistic(
    base,
    (current, patch: { type: "advance"; nextCursor: string }) =>
      patch.type === "advance" ? { ...current, cursor: patch.nextCursor } : current
  );

  const loadNext = async () => {
    expect({ type: "advance", nextCursor: "cursor-" + Math.random().toString(16).slice(2) });
    // fetch real page with server using last known cursor; then update base page
  };

  return (
    <div>
      <p>Cursor: {page.cursor}</p>
      <button onClick={loadNext}>Next</button>
    </div>
  );
}
```
**How it works (step‑by‑step):**
1) We optimistically advance the cursor for immediate UI responsiveness.  
2) After fetching, we replace base with the real page (items/cursor).  
3) If fetch fails, base remains, so optimistic cursor rolls back.  

---

## ⚠️ Common Pitfalls & Gotchas
- ❌ **Mutating** state in `updateFn` → always return new objects/arrays.  
- ❌ Forgetting to update **base state** when the server confirms success → UI will snap back.  
- ❌ Not handling **errors** → users won’t know why optimistic UI reverted.  
- ❌ Overly large patches → keep patch payloads minimal and focused.  
- ❌ Assuming it replaces caching or syncing — you still need a source of truth (server or store).

---

## ✅ Best Practices
- Keep `updateFn` **pure and deterministic**.  
- Use temporary client IDs (`temp-...`) for optimistic entries; reconcile to server IDs when confirmed.  
- Pair with **`useActionState`** for forms and **`useFormStatus`** for pending indicators.  
- Surface errors with toasts/status regions and **explain rollbacks**.  
- Re-fetch or confirm on success for **eventual consistency** in complex flows.  

---

## ❓ Interview Q&A

**Q1. What problem does `useOptimistic` solve?**  
A: It gives users instant feedback by updating the UI immediately while the real server mutation is in flight, then reconciles success or failure.

**Q2. How does it differ from `useTransition`?**  
A: `useTransition` changes **update priority**; `useOptimistic` changes the **rendered value** by layering patches on top of base until confirmation.

**Q3. What do `optimisticState` and `addOptimisticUpdate` represent?**  
A: The current projected UI state and a function to enqueue patches that transform that state.

**Q4. How do you roll back on error?**  
A: Don’t apply the failed change to base state; when optimistic patches clear, UI reverts automatically. Optionally show an error message.

**Q5. Can multiple optimistic updates be queued?**  
A: Yes; they’re applied in order to produce the optimistic projection.

---