/**
 * Example: CounterBasic
 * What: Smallest possible useState example (number state).
 * Why: Shows initialization, reading state, and updating via setter.
 * Concepts: Primitive state, re-render on setState, direct vs functional form (intro).
 */
import { useState } from "react";

export default function CounterBasic() {
  // Initialize state with 0. useState returns [currentValue, setterFunction]
  const [count, setCount] = useState(0);
  
  return (
    <div>
      {/* Display current count value */}
      <p>Count: {count}</p>
      
      {/* Direct update: uses current count value directly */}
      <button onClick={() => setCount(count + 1)}>+1 (direct)</button>
      
      {/* Functional update: safer, uses previous value from React */}
      <button onClick={() => setCount(c => c + 1)}>+1 (functional)</button>
      
      {/* Reset counter to initial value */}
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

