/**
 * Example: LazyInit
 * What: Run an expensive init only once using a lazy initializer.
 * Why: Avoids recomputing heavy initial value on every render.
 * Concepts: Lazy initialization, avoiding unnecessary work, first-render semantics.
 */
import { useState } from "react";

// Simulate an expensive calculation (like reading from localStorage, complex math, etc.)
function expensiveInit() {
  console.log("expensive init (runs once)"); // This should only log once!
  return 42;
}

export default function LazyInit() {
  // Pass a FUNCTION to useState instead of calling expensiveInit() directly
  // This ensures expensiveInit only runs on the first render, not every render
  const [value, setValue] = useState(() => expensiveInit());
  
  return (
    <div>
      <p>value = {value}</p>
      {/* Each click re-renders the component, but expensiveInit won't run again */}
      <button onClick={() => setValue(v => v + 1)}>inc</button>
    </div>
  );
}

