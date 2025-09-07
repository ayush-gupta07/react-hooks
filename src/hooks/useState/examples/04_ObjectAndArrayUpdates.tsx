/**
 * Example: ObjectAndArrayUpdates
 * What: Update nested structures immutably (object + array).
 * Why: React state must be treated as immutable to trigger correct re-renders.
 * Concepts: Spread syntax, map/filter, structural sharing.
 */
import { useState } from "react";

type Todo = { id: string; text: string; done: boolean };
type User = { name: string; city: string };

export default function ObjectAndArrayUpdates() {
  // Object state: must create new object when updating
  const [user, setUser] = useState<User>({ name: "Ava", city: "Pune" });
  
  // Array state: must create new array when updating
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "Learn useState", done: true },
    { id: "2", text: "Practice examples", done: false },
  ]);

  // Update object immutably: spread existing user, override city
  const moveCity = () => setUser(u => ({ ...u, city: "Bangalore" }));

  // Update array immutably: spread existing todos, add new item at end
  const addTodo = () => setTodos(ts => [...ts, { 
    id: crypto.randomUUID(), 
    text: "New item", 
    done: false 
  }]);

  // Update specific array item: map through, update matching id, keep others same
  const toggle = (id: string) => setTodos(ts => 
    ts.map(t => (t.id === id ? { ...t, done: !t.done } : t))
  );

  // Remove array item: filter out the item with matching id
  const remove = (id: string) => setTodos(ts => ts.filter(t => t.id !== id));

  return (
    <div>
      {/* Display current user info */}
      <p>User: {user.name} — {user.city}</p>
      <button onClick={moveCity}>Move city</button>
      <hr />
      <button onClick={addTodo}>Add todo</button>
      
      {/* Render each todo with toggle and remove functionality */}
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            <label>
              <input 
                type="checkbox" 
                checked={t.done} 
                onChange={() => toggle(t.id)} 
              /> 
              {t.text}
            </label>
            <button onClick={() => remove(t.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

