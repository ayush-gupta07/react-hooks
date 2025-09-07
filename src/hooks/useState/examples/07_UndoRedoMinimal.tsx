/**
 * Example: UndoRedoMinimal
 * What: Basic undo/redo using three pieces of state (past/present/future).
 * Why: Shows modeling complex behavior *only with useState* (no reducer).
 * Concepts: History stacks, pushing/popping with functional updates.
 */
import { useState } from "react";

export default function UndoRedoMinimal() {
  // Three state pieces for undo/redo:
  const [past, setPast] = useState<number[]>([]);     // Stack of previous values
  const [present, setPresent] = useState(0);          // Current value
  const [future, setFuture] = useState<number[]>([]); // Stack of "undone" values

  // Set new value: save current to past, clear future
  const set = (val: number) => {
    setPast(p => [...p, present]); // Push current value to past stack
    setPresent(val);               // Set new current value
    setFuture([]);                 // Clear future (can't redo after new change)
  };
  
  // Undo: move current to future, pop from past to current
  const undo = () => {
    setPast(p => {
      if (!p.length) return p; // Nothing to undo
      
      const prev = p[p.length - 1];           // Get last past value
      setFuture(f => [present, ...f]);        // Push current to future stack
      setPresent(prev);                       // Restore previous value
      return p.slice(0, -1);                  // Remove last item from past
    });
  };
  
  // Redo: move current to past, pop from future to current
  const redo = () => {
    setFuture(f => {
      if (!f.length) return f; // Nothing to redo
      
      const next = f[0];                    // Get first future value
      setPast(p => [...p, present]);       // Push current to past stack
      setPresent(next);                     // Restore next value
      return f.slice(1);                    // Remove first item from future
    });
  };

  return (
    <div>
      <p>Value: {present}</p>
      
      {/* Change value buttons */}
      <button onClick={() => set(present - 1)}>-1</button>
      <button onClick={() => set(present + 1)}>+1</button>
      
      {/* Undo/Redo buttons - disabled when stacks are empty */}
      <button onClick={undo} disabled={!past.length}>
        Undo
      </button>
      <button onClick={redo} disabled={!future.length}>
        Redo
      </button>
    </div>
  );
}

