/**
 * Example: DependencyArray
 *
 * Explanation:
 * - Demonstrates effect behavior with different dependency arrays.
 * - [] → run once (on mount).
 * - [count] → run on mount + when count changes.
 * - No deps → run after every render.
 */
import { useEffect, useState } from "react";

export default function DependencyArray() {
  const [count, setCount] = useState(0);

  useEffect(() => console.log("No deps: runs every render"));
  useEffect(() => console.log("Empty deps: runs once"), []);
  useEffect(() => console.log("Deps: runs on count change →", count), [count]);

  return (
    <div>
      <p>count = {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}