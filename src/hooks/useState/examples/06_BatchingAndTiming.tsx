/**
 * Example: BatchingAndTiming
 * What: Observe how React batches state updates across the same tick and microtasks.
 * Why: Helps reason about when UI updates happen and why functional updates are safer.
 * Concepts: React 18+ automatic batching, microtask (Promise) boundary.
 */
import { useState } from "react";

export default function BatchingAndTiming() {
  const [n, setN] = useState(0);

  const click = async () => {
    // These two updates happen in the same tick - React batches them
    // Only ONE re-render happens after both updates complete
    setN(v => v + 1); // Update 1: n becomes n+1
    setN(v => v + 1); // Update 2: n becomes n+2 (uses result from update 1)

    // Wait for next microtask (Promise resolves)
    await Promise.resolve();
    
    // Even after microtask boundary, React 18+ still batches this
    // Still part of the same event, so batched with the above updates
    setN(v => v + 1); // Update 3: n becomes n+3
    
    // Result: UI updates once with final value (n+3)
  };

  return (
    <div>
      <p>n = {n}</p>
      {/* Click to see batching: all 3 increments happen together */}
      <button onClick={click}>Increment 3</button>
    </div>
  );
}
