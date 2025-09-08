/**
 * Example: BasicLog
 *
 * Explanation:
 * - Simplest useEffect example: log after render.
 * - Demonstrates that effects run *after* paint.
 * - Useful for learning that useEffect is asynchronous relative to rendering.
 */
import { useEffect, useState } from "react";

export default function BasicLog() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect: count changed →", count);
  }, [count]);

  return (
    <div>
      <p>Count = {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}