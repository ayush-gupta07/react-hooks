/**
 * Example: EffectCleanup
 *
 * Explanation:
 * - Shows how to return a cleanup function from useEffect.
 * - Common for unsubscribing from events, canceling timers, or cleaning resources.
 * - Demonstrates mount → effect → cleanup → unmount lifecycle.
 */
import { useEffect, useState } from "react";

export default function EffectCleanup() {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setVisible(v => !v)}>
        {visible ? "Hide" : "Show"} Timer
      </button>
      {visible && <Timer />}
    </div>
  );
}

function Timer() {
  useEffect(() => {
    const id = setInterval(() => console.log("tick"), 1000);
    return () => {
      console.log("cleanup: clearing interval");
      clearInterval(id);
    };
  }, []);

  return <p>Timer running (check console)…</p>;
}