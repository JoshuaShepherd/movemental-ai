import {
  sandboxBridge,
  sandboxDoneWatch,
  sandboxLights,
  sandboxOutcome,
  sandboxRules,
  sandboxSteps,
} from "../data/shared";
import { StageDetail } from "../StageDetail";

/**
 * SandboxContent — Stage 02 panel body.
 *
 * Renders: pact intro + 2 rules → italic-serif bridge → 5-step process →
 * 3-up green/yellow/red traffic lights → italic-serif outcome.
 *
 * Status dot colors come from the semantic --color-status-{go,caution,stop}
 * tokens defined in globals.css (warm Concept Modern signal palette).
 */
export function SandboxContent() {
  return (
    <div className="mt-10 sm:mt-14 max-w-[38rem]">
      {/* The Sandbox pact + 2 rules */}
      <div className="mb-10 sm:mb-12">
        <p className="inline-flex items-center gap-3 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground mb-3">
          <span aria-hidden="true" className="inline-block w-7 h-px bg-foreground" />
          The Sandbox pact
        </p>
        <p className="text-base leading-[1.6] text-muted-foreground max-w-[56ch] mb-6">
          Sandbox is not “everyone try whatever you want.” It is structured
          experimentation inside boundaries. Two rules make it safe enough to
          actually learn from. If either one is missing, the experiment
          doesn’t run yet.
        </p>

        <div className="border-t border-border">
          {sandboxRules.map((rule) => (
            <div
              key={rule.num}
              className="border-b border-border py-6"
            >
              <p className="font-serif italic text-ink-soft text-[0.95rem] mb-1.5">
                {rule.num}
              </p>
              <h4 className="font-serif italic font-normal text-foreground text-[clamp(1.3rem,2.2vw,1.6rem)] leading-[1.25] mb-3 max-w-[32ch]">
                {rule.title}
              </h4>
              <p className="text-base leading-[1.6] text-muted-foreground max-w-[56ch]">
                {rule.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Italic-serif bridge */}
      <p className="font-serif italic font-normal text-foreground text-[clamp(1.2rem,1.9vw,1.5rem)] leading-[1.4] max-w-[50ch] pl-5 border-l-2 border-foreground mb-10 sm:mb-12">
        {sandboxBridge}
      </p>

      {/* The 5-step process */}
      <div className="mb-10 sm:mb-12">
        <p className="inline-flex items-center gap-3 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground mb-3">
          <span aria-hidden="true" className="inline-block w-7 h-px bg-foreground" />
          How the experiment runs
        </p>
        <p className="text-base leading-[1.6] text-muted-foreground max-w-[56ch] mb-6">
          An eight-week structured process for finding, documenting, and
          reviewing AI use cases that fit your organization.
        </p>
        <ol className="m-0 p-0 list-none border-t border-border">
          {sandboxSteps.map((step, i) => (
            <li
              key={step.num}
              className="border-b border-border py-6"
            >
              <p className="font-serif italic text-ink-soft text-[0.95rem] mb-1.5">
                {step.num}
              </p>
              <h4 className="font-serif italic font-normal text-foreground text-[clamp(1.2rem,2vw,1.5rem)] leading-[1.2] mb-3">
                {step.name}
              </h4>
              <p className="text-base leading-[1.6] text-muted-foreground max-w-[56ch]">
                {step.body}
              </p>

              {/* Traffic lights — only on the last (governance review) step */}
              {i === sandboxSteps.length - 1 && (
                <div className="mt-5 pt-3.5 border-t border-dashed border-border">
                  {sandboxLights.map((light) => {
                    const dot =
                      light.tone === "green"
                        ? "bg-status-go"
                        : light.tone === "yellow"
                          ? "bg-status-caution"
                          : "bg-status-stop";
                    return (
                      <div
                        key={light.tone}
                        className="grid grid-cols-[auto_1fr] gap-4 py-3 border-b border-dashed border-border last:border-b-0 items-start"
                      >
                        <span
                          aria-hidden="true"
                          className={`mt-2 w-[11px] h-[11px] rounded-full shrink-0 ${dot}`}
                        />
                        <div>
                          <p className="font-semibold text-[0.78rem] uppercase tracking-eyebrow text-foreground mb-1">
                            {light.name}
                          </p>
                          <p
                            className="text-[0.97rem] leading-[1.55] text-muted-foreground max-w-[52ch] [&_em]:font-serif [&_em]:italic [&_em]:font-normal [&_em]:text-foreground"
                            dangerouslySetInnerHTML={{ __html: light.desc }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Italic-serif outcome */}
      <p className="font-serif italic font-normal text-foreground text-[clamp(1.2rem,1.9vw,1.5rem)] leading-[1.4] max-w-[50ch] pl-5 border-l-2 border-foreground">
        {sandboxOutcome}
      </p>

      <StageDetail data={sandboxDoneWatch} />
    </div>
  );
}
