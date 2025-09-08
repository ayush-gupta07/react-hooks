/**
 * Example: WindowResizeListener
 *
 * Explanation:
 * - Demonstrates subscribing to global events (window resize) inside useEffect.
 * - Teaches why cleanup is required to prevent leaks.
 * - Common real-world pattern: resize listeners, keyboard shortcuts, scroll tracking.
 */
import { useEffect, useState } from "react";

export default function WindowResizeListener() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return <p>Window size: {size.w} × {size.h}</p>;
}