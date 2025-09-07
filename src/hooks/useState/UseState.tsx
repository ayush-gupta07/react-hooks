/**
 * UseState Showcase
 * Renders a curated path from beginner → advanced `useState` scenarios.
 * Add/remove examples here as you grow.
 */
import CounterBasic from "./examples/01_CounterBasics";
import FunctionalUpdateVsStale from "./examples/02_FunctionalUpdateVsStale";
import LazyInit from "./examples/03_LazyInit";
import ObjectAndArrayUpdates from "./examples/04_ObjectAndArrayUpdates";
import ControlledFormMinimal from "./examples/05_ControlledFormMinimal";
import BatchingAndTiming from "./examples/06_BatchingAndTiming";
import UndoRedoMinimal from "./examples/07_UndoRedoMinimal";
import PersistLocalStorage from "./examples/08_PersistLocalStorage";

function Demo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article style={{ border: "1px solid #e5e7eb", padding: 16, marginBottom: 16, borderRadius: 8 }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {children}
    </article>
  );
}

export default function UseStateShowcase() {
  return (
    <section>
      <h1>useState — Curated Examples</h1>
      <Demo title="1) CounterBasic"><CounterBasic /></Demo>
      <Demo title="2) FunctionalUpdateVsStale"><FunctionalUpdateVsStale /></Demo>
      <Demo title="3) LazyInit"><LazyInit /></Demo>
      <Demo title="4) ObjectAndArrayUpdates"><ObjectAndArrayUpdates /></Demo>
      <Demo title="5) ControlledFormMinimal"><ControlledFormMinimal /></Demo>
      <Demo title="6) BatchingAndTiming"><BatchingAndTiming /></Demo>
      <Demo title="7) UndoRedoMinimal"><UndoRedoMinimal /></Demo>
      <Demo title="8) PersistLocalStorage"><PersistLocalStorage /></Demo>
    </section>
  );
}