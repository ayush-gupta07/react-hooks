import { useState } from "react";

function computeInitial() {
  console.log("expensive init");
  return 42;
}

export default function LazyInit() {
  const [n, setN] = useState(() => computeInitial());
  return (
    <div>
      <p>n = {n}</p>
      <button onClick={() => setN(n + 1)}>inc</button>
    </div>
  );
}