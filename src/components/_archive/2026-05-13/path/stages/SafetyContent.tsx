import {
  safetyChecklistRows,
  safetyDoneWatch,
  safetyQuickItems,
} from "../data/shared";
import { StageDetail } from "../StageDetail";

/**
 * SafetyContent — Stage 01 panel body.
 *
 * Renders the 6 quick "governance baseline" items, then a native
 * `<details>` disclosure that expands to the full 14-item checklist with
 * "An A grade looks like" examples in each row.
 */
export function SafetyContent() {
  return (
    <div className="mt-10 sm:mt-14 max-w-[38rem]">
      <p className="inline-flex items-center gap-3 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground mb-2">
        <span aria-hidden="true" className="inline-block w-7 h-px bg-foreground" />
        Safety checklist
      </p>
      <h4 className="font-sans font-medium tracking-tight text-foreground text-[1.5rem] leading-[1.2] mb-3">
        The governance baseline.
      </h4>
      <p className="text-[0.95rem] leading-[1.55] text-muted-foreground max-w-[48ch] mb-6">
        Before staff use AI on real work, leadership needs a clear governance
        baseline. These are the essential pieces that make AI use safe enough
        to begin.
      </p>

      {/* The 6 quick items */}
      <ol className="m-0 p-0 list-none border-t border-border mb-6">
        {safetyQuickItems.map((item, i) => (
          <li
            key={item}
            className="grid grid-cols-[1.75rem_1fr] gap-3 items-baseline py-3 border-b border-border text-foreground text-base leading-[1.4] tracking-tight"
          >
            <span className="font-serif italic text-ink-soft text-[0.9rem]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>

      {/* Disclosure: full 14-item checklist */}
      <details className="group border-t border-border">
        <summary className="list-none cursor-pointer flex items-center gap-3 py-4 text-[0.92rem] font-medium tracking-tight text-muted-foreground hover:text-foreground transition-colors marker:hidden [&::-webkit-details-marker]:hidden">
          <span className="flex-1">View full 14-item checklist</span>
          <span className="font-serif italic text-ink-soft text-[0.95rem]">
            14 items
          </span>
          <span
            aria-hidden="true"
            className="w-6 h-6 rounded-full border border-border inline-flex items-center justify-center text-[0.85rem] text-foreground transition-[transform,background-color,color,border-color] duration-200 group-open:bg-foreground group-open:text-background group-open:border-foreground group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <div role="list" className="border-t border-border">
          {safetyChecklistRows.map((row) => (
            <details
              key={row.index}
              role="listitem"
              className="group/row border-b border-border"
            >
              <summary className="list-none cursor-pointer grid grid-cols-[1.5rem_18px_1fr_26px] items-center gap-4 py-4 text-foreground text-[1.02rem] leading-[1.35] tracking-tight marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="font-serif italic text-ink-soft text-[0.9rem]">
                  {row.index}
                </span>
                <span
                  aria-hidden="true"
                  className="relative w-4 h-4 border-[1.5px] border-foreground rounded-[3px] bg-transparent transition-colors group-open/row:bg-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-[3px] top-[6px] w-[7px] h-[3px] -rotate-45 border-l-[1.5px] border-b-[1.5px] border-background opacity-0 transition-opacity group-open/row:opacity-100"
                  />
                </span>
                <span className="font-medium text-foreground">{row.name}</span>
                <span
                  aria-hidden="true"
                  className="w-[26px] h-[26px] rounded-full border border-border inline-flex items-center justify-center text-[0.85rem] text-foreground transition-[transform,background-color,color,border-color] duration-200 group-open/row:bg-foreground group-open/row:text-background group-open/row:border-foreground group-open/row:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="pl-10 pr-2 pb-6">
                <p className="text-[0.72rem] font-medium uppercase tracking-eyebrow text-muted-foreground mb-2.5">
                  An{" "}
                  <em className="font-serif italic font-normal text-foreground normal-case tracking-normal text-[1.15em]">
                    “A”
                  </em>{" "}
                  grade looks like
                </p>
                <p
                  className="text-[0.98rem] leading-[1.6] text-muted-foreground max-w-[52ch] border-l-2 border-foreground pl-4 m-0 [&_strong]:text-foreground [&_strong]:font-medium [&_em]:font-serif [&_em]:italic [&_em]:font-normal [&_em]:text-foreground"
                  dangerouslySetInnerHTML={{ __html: row.example }}
                />
              </div>
            </details>
          ))}
        </div>
      </details>

      <StageDetail data={safetyDoneWatch} />
    </div>
  );
}
