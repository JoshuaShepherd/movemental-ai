import type { StageDoneAndWatch } from "./data/shared";

/**
 * StageDetail — the "Done when" + "Watch for" pair at the bottom of each
 * stage panel. Done items render with a hollow square checkbox marker;
 * the warning paragraph supports `<em>` for italic-serif emphasis.
 */
export function StageDetail({ data }: { data: StageDoneAndWatch }) {
  return (
    <div className="mt-10 max-w-[40rem]">
      <div className="border-t border-border py-6">
        <p className="inline-flex items-center gap-2.5 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground mb-4">
          <span aria-hidden="true" className="inline-block w-[22px] h-px bg-foreground" />
          Done when
        </p>
        <ul className="m-0 p-0 list-none">
          {data.done.map((item) => (
            <li
              key={item}
              className="grid grid-cols-[1.5rem_1fr] gap-3 items-start py-2 text-foreground text-base leading-[1.5] tracking-tight"
            >
              <span
                aria-hidden="true"
                className="mt-1.5 w-[13px] h-[13px] border-[1.5px] border-foreground rounded-[2px] bg-transparent"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-y border-border py-6">
        <p className="inline-flex items-center gap-2.5 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground mb-4">
          <span aria-hidden="true" className="inline-block w-[22px] h-px bg-foreground" />
          Watch for
        </p>
        <p
          className="text-base leading-[1.6] text-foreground tracking-tight max-w-[56ch] m-0 [&_em]:font-serif [&_em]:italic [&_em]:font-normal [&_em]:text-[1.04em]"
          dangerouslySetInnerHTML={{ __html: data.watch }}
        />
      </div>
    </div>
  );
}
