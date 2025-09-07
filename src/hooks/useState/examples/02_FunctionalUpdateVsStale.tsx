/**
 * Example: FunctionalUpdateVsStale
 * What: Demonstrates stale reads when batching multiple updates.
 * Why: Two direct updates can read the same old value; functional updates chain correctly.
 * Concepts: Batching, stale closure, functional updater pattern.
 */
import { useState } from "react";

export default function FunctionalUpdateVsStale() {
  const [n, setN] = useState(0);

  // WRONG: Both setN calls read the same "n" value from render time
  // If n=5, both calls do setN(5+1), so final result is 6, not 7
  const wrong = () => {
    setN(n + 1); // reads current "n" (e.g., 5 -> 6)
    setN(n + 1); // reads the SAME "n" (5 -> 6 again!)
  };
  
  // RIGHT: Each setN gets the latest value from React's state
  // First call: v=5 -> returns 6, Second call: v=6 -> returns 7
  const right = () => {
    setN(v => v + 1); // v is the most current value
    setN(v => v + 1); // v is updated from previous call
  };

  return (
    <div>
      <p>n = {n}</p>
      {/* This will only add 1 instead of 2 due to stale closure */}
      <button onClick={wrong}>+2 (wrong)</button>
      {/* This correctly adds 2 by chaining updates */}
      <button onClick={right}>+2 (right)</button>
    </div>
  );
}

