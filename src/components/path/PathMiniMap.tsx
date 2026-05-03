import { stageMeta } from "./data/shared";

/**
 * PathMiniMap — horizontal 4-stage map for the closing CTA. Inline flex with
 * hairline dashes between items. Variant `inverse` is the only supported
 * tone today (the closing CTA is always a midnight band).
 */
export function PathMiniMap() {
  return (
    <ol
      aria-label="The four stages"
      className="flex flex-wrap items-baseline gap-x-3 gap-y-2 m-0 p-0 list-none mb-7 pb-5 border-b border-inverse-border"
    >
      {stageMeta.map((stage, i) => (
        <li
          key={stage.num}
          className="inline-flex items-baseline gap-3 text-inverse-foreground/85"
        >
          {i > 0 && (
            <span
              aria-hidden="true"
              className="inline-block w-5 h-px bg-inverse-foreground/30"
            />
          )}
          <span className="font-serif italic text-inverse-muted text-[0.95rem]">
            {stage.num}
          </span>
          <span className="font-serif italic text-inverse-foreground text-[1.1rem]">
            {stage.name}
          </span>
        </li>
      ))}
    </ol>
  );
}
