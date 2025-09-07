/**
 * Example: ControlledFormMinimal
 * What: Multi-field controlled form with reset.
 * Why: Shows how to manage form state as a single object via useState.
 * Concepts: Controlled inputs, updater by key, type-narrowing for selects.
 */
import { useState } from "react";

type Form = { name: string; email: string; role: "user" | "admin" };

export default function ControlledFormMinimal() {
  // Store all form fields in a single state object
  const initial: Form = { name: "", email: "", role: "user" };
  const [form, setForm] = useState<Form>(initial);

  // Generic updater function: updates any field by key
  // Uses computed property names [key] to dynamically set the field
  const update = (key: keyof Form, value: string) => {
    setForm(f => ({ ...f, [key]: value }));
  };

  return (
    <form onSubmit={e => e.preventDefault()}>
      {/* Controlled input: value from state, updates on change */}
      <input 
        placeholder="name" 
        value={form.name} 
        onChange={e => update("name", e.target.value)} 
      />
      
      <input 
        placeholder="email" 
        value={form.email} 
        onChange={e => update("email", e.target.value)} 
      />
      
      {/* Controlled select: works same as input */}
      <select 
        value={form.role} 
        onChange={e => update("role", e.target.value)}
      >
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>
      
      {/* Reset form to initial values */}
      <button type="button" onClick={() => setForm(initial)}>Reset</button>
      
      {/* Display current form state as JSON */}
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </form>
  );
}

