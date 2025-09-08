/**
 * UseEffect Showcase
 *
 * Renders a curated progression of `useEffect` examples,
 * from beginner → advanced scenarios.
 * Each demo is isolated in its own file inside `examples/`.
 */

import BasicLog from "./examples/01_BasicLog";
// import EffectCleanup from "./examples/EffectCleanup";
// import DependencyArray from "./examples/DependencyArray";
// import WindowResizeListener from "./examples/WindowResizeListener";
// import FetchData from "./examples/FetchData";
// import MultipleEffects from "./examples/MultipleEffects";
// import EffectVsLayoutEffect from "./examples/EffectVsLayoutEffect";
// import DebouncedInput from "./examples/DebouncedInput";
// import IntervalCounter from "./examples/IntervalCounter";
// import RaceConditionFix from "./examples/RaceConditionFix";

function Demo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article
      style={{
        border: "1px solid #e5e7eb",
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        background: "#fafafa",
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {children}
    </article>
  );
}

export default function UseEffectShowcase() {
  return (
    <section>
      <h1>useEffect — Curated Examples</h1>

      <Demo title="1) BasicLog — log after render">
        <BasicLog />
      </Demo>

      {/* <Demo title="2) EffectCleanup — cleanup on unmount">
        <EffectCleanup />
      </Demo> */}

      {/* <Demo title="3) DependencyArray — [] vs deps vs no deps">
        <DependencyArray />
      </Demo> */}

      {/* <Demo title="4) WindowResizeListener — global event subscription">
        <WindowResizeListener />
      </Demo> */}

      {/* <Demo title="5) FetchData — async request with cleanup">
        <FetchData />
      </Demo> */}
{/* 
      <Demo title="6) MultipleEffects — separate concerns">
        <MultipleEffects />
      </Demo> */}

      {/* <Demo title="7) EffectVsLayoutEffect — timing differences">
        <EffectVsLayoutEffect />
      </Demo> */}

      {/* <Demo title="8) DebouncedInput — debounce with setTimeout">
        <DebouncedInput />
      </Demo> */}

      {/* <Demo title="9) IntervalCounter — timer with cleanup">
        <IntervalCounter />
      </Demo> */}

      {/* <Demo title="10) RaceConditionFix — async abort pattern">
        <RaceConditionFix />
      </Demo> */}
    </section>
  );
}