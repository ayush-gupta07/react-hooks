/**
 * Example: PersistLocalStorage
 * What: Persist a piece of state to localStorage using lazy init.
 * Why: Demonstrates persistence + correct first-render initialization pattern.
 * Concepts: Lazy initializer, side-effect persistence (tiny useEffect), toggles.
 */
import { useEffect, useState } from "react";

export default function PersistLocalStorage() {
  // Lazy init: read from localStorage on first render only
  // If no saved value exists, default to "light"
  const [theme, setTheme] = useState<string>(() => 
    localStorage.getItem("theme") || "light"
  );
  
  // Save to localStorage whenever theme changes
  // This runs after every render where theme is different
  useEffect(() => { 
    localStorage.setItem("theme", theme); 
  }, [theme]);

  return (
    <div>
      {/* Toggle between light and dark themes */}
      <button onClick={() => setTheme(t => (t === "light" ? "dark" : "light"))}>
        Toggle theme (current: {theme})
      </button>
    </div>
  );
}
