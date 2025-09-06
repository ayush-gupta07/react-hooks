# ⚛️ React: Building **Custom Hooks**

## 📖 Quick Summary
- A **custom hook** is a reusable function prefixed with `use` that **encapsulates stateful logic** using other hooks.  
- Custom hooks **share logic, not state**. Each use creates an **independent instance**.  
- Great for **abstracting effects, subscriptions, forms, fetching**, and **cross‑cutting concerns** (analytics, focus, media).

---

## 🧠 Mental Model
- Think of custom hooks as **lego bricks of behavior**.  
- Components remain small and declarative; hooks do the imperative work (fetch, subscribe, measure, cache).  
- Hooks must follow the **Rules of Hooks**: call at the **top level**, not inside loops/conditions; **only call hooks** from React functions (components or other hooks).

---

## 🔑 Key Concepts
1. **`use` Prefix & Return Shape**
   - Must start with `use` for lint rules to detect it (e.g., `useOnlineStatus`).  
   - Return **values + callbacks** that the component needs (keep the surface minimal).

2. **Encapsulate, Don’t Centralize**
   - Hooks **encapsulate logic** but don’t create global singletons; each call has its own state/effects.

3. **Parameters**
   - Accept inputs to customize behavior (e.g., `url`, `intervalMs`, `enabled`). Provide sane defaults.

4. **Effect Cleanup & Lifecycles**
   - Inside hooks, manage subscriptions, timers, and event listeners with **cleanups** to prevent leaks.

5. **Composability**
   - Hooks can call other hooks; build **higher-level hooks** from basic ones (e.g., `useAuth` built from `useLocalStorage` + `useEffect`).

6. **SSR / Environment Safety**
   - Check for browser APIs (e.g., `typeof window !== "undefined"`) before accessing them in universal apps.

7. **TypeScript Ergonomics**
   - Export clear types; prefer **tuples** for simple hooks and **objects** for multiple return values.

---

## 💻 Code Examples

### Example 1: `useLocalStorage` — persistent state
```tsx
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  return [value, setValue] as const;
}
```
**How it works (step‑by‑step):**
1) On first render, **lazy initialization** reads from `localStorage` once.  
2) When `value` changes, an effect serializes it back to storage.  
3) The hook returns a stable tuple `[value, setValue]` like `useState`, but persisted.

---

### Example 2: `useEventListener` — add/remove listeners safely
```tsx
import { useEffect, useRef } from "react";

export function useEventListener<K extends keyof WindowEventMap>(
  target: Window | Document | HTMLElement | null,
  type: K,
  handler: (ev: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions
) {
  const savedHandler = useRef<typeof handler>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!target) return;
    const listener = (e: any) => savedHandler.current?.(e);
    target.addEventListener(type, listener as any, options);
    return () => target.removeEventListener(type, listener as any, options);
  }, [target, type, options]);
}
```
**How it works (step‑by‑step):**
1) We keep the latest `handler` in a ref so the listener **doesn’t reattach** on every render.  
2) On mount/when dependencies change, attach the listener and **cleanup** on unmount.  
3) Consumers call `useEventListener(window, "resize", fn)` without worrying about leaks.

---

### Example 3: `useFetch` — basic data fetching with abort
```tsx
import { useEffect, useRef, useState } from "react";

type Options = RequestInit & { enabled?: boolean };

export function useFetch<T = unknown>(url: string | null, options?: Options) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!url || options?.enabled === false) return;
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setError(null);

    fetch(url, { ...options, signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(res.statusText);
        return (await res.json()) as T;
      })
      .then(setData, setError)
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url, JSON.stringify(options)]); // stringify for simple equality; consider useMemo upstream

  return { data, error, loading, cancel: () => abortRef.current?.abort() } as const;
}
```
**How it works (step‑by‑step):**
1) When `url/options` change, start a fetch with an **AbortController**.  
2) On unmount or change, the controller aborts the in‑flight request.  
3) Exposes `{ data, error, loading, cancel }`, making components simple.

---

### Example 4: `usePrevious` — track previous value
```tsx
import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T) {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => { ref.current = value; }, [value]);
  return ref.current;
}
```
**How it works (step‑by‑step):**
1) A ref holds the last value.  
2) After each render, effect updates the ref.  
3) Next render returns the previous value.

---

### Example 5: `useToggle` — tiny boolean helper
```tsx
import { useCallback, useState } from "react";

export function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn(o => !o), []);
  const setTrue = useCallback(() => setOn(true), []);
  const setFalse = useCallback(() => setOn(false), []);
  return { on, toggle, setTrue, setFalse } as const;
}
```
**How it works (step‑by‑step):**
1) Manages a boolean state with stable helpers.  
2) Returns an object for ergonomic usage in components (`on`, `toggle`, `setTrue`, `setFalse`).

---

## 🧩 Composition Example — Building `useAuth`
```tsx
import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

type User = { id: string; email: string } | null;

export function useAuth() {
  const [token, setToken] = useLocalStorage<string | null>("token", null);
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) { setUser(null); return; }
    let cancelled = false;
    setLoading(true);
    (async () => {
      // fetch current user
      const res = await fetch("/api/me", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!cancelled) setUser(data);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/login", { method: "POST", body: JSON.stringify({ email, password }) });
    const { token: tk } = await res.json();
    setToken(tk);
  };
  const logout = () => setToken(null);

  return useMemo(() => ({ user, token, loading, login, logout }), [user, token, loading]);
}
```
**How it works (step‑by‑step):**
1) Persists the auth token via `useLocalStorage`.  
2) When token changes, fetch the user; cancel safely on unmount.  
3) Exposes `login/logout` and derived state, memoized for stable references.

---

## 🧪 Testing Custom Hooks
- Use **`@testing-library/react`**’s `renderHook` (or React Testing Library + component harness) to mount hooks.  
- Mock **browser APIs** (e.g., `localStorage`) and **fetch**.  
- Test **effects & cleanups** (e.g., event listeners removed on unmount).

---

## ⚠️ Common Pitfalls & Gotchas
- ❌ Violating the **Rules of Hooks** (calling conditionally/in loops).  
- ❌ Leaking subscriptions/timers by forgetting **cleanup**.  
- ❌ Overly broad dependency arrays in effects → unnecessary work; too narrow → stale closures.  
- ❌ Returning unstable function references; use `useCallback`/`useMemo` when needed.  
- ❌ Conflating UI with logic: hooks should be **UI-agnostic** and reusable.

---

## ✅ Best Practices
- Name hooks with a clear **verb or domain** (`useOnlineStatus`, `useHover`, `useIntersection`).  
- Keep APIs small and focused; **document return shapes**.  
- Accept **config objects** instead of many positional args.  
- Provide **sensible defaults** and `enabled` flags to pause behavior.  
- Consider **SSR checks** for browser-only APIs.  
- Prefer **TypeScript** for DX and safety.

---

## ❓ Interview Q&A

**Q1. What is a custom hook and why use it?**  
A: A function starting with `use` that reuses stateful logic across components, improving **DRYness**, **testability**, and **separation of concerns**.

**Q2. Do custom hooks share state between components?**  
A: No. They share **logic**, not state. Each call has independent state.

**Q3. Where can hooks be called from?**  
A: From React function components or **other hooks** — never from regular functions, classes, loops, or conditionals.

**Q4. How do you avoid stale closures in custom hooks?**  
A: Use correct dependency arrays, `useRef` for mutable references, and `useCallback`/`useMemo` to stabilize callbacks/values.

**Q5. How do you clean up side effects in hooks?**  
A: Return a function from `useEffect`/`useLayoutEffect` to remove listeners/timers/subscriptions.

**Q6. How to design the return API of a hook?**  
A: Prefer a minimal surface; use tuples for simple patterns and objects for multiple properties. Document the contract.

---