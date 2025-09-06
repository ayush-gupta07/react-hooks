import CounterBasic from "./examples/CounterBasic";
import LazyInit from "./examples/LazyInit";

function Demo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article style={{ border: "1px solid #ddd", padding: 16, marginBottom: 16 }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {children}
    </article>
  );
}

export default function UseStateShowcase() {
  return (
    <section>
      <h1>useState — Examples</h1>
      <Demo title="Basic Counter"><CounterBasic /></Demo>
      <Demo title="Lazy Initialization"><LazyInit /></Demo>
    </section>
  );
}