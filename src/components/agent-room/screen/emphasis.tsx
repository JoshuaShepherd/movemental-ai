/**
 * Renders agent-supplied display text that may contain `<em>…</em>` (and nothing
 * else). Splits on the em tags and builds React nodes — no dangerouslySetInnerHTML,
 * so arbitrary markup can never execute.
 */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/(<em>[\s\S]*?<\/em>)/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^<em>([\s\S]*?)<\/em>$/);
        return m ? <em key={i}>{m[1]}</em> : <span key={i}>{part}</span>;
      })}
    </>
  );
}
