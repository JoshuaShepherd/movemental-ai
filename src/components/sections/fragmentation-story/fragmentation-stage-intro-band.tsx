import { Container } from "@/components/primitives/container";
import { Display } from "@/components/primitives/display";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Section } from "@/components/primitives/section";
import { cn } from "@/lib/utils";

type Surface = "midnight" | "section";

type Props = {
  /** Stage number, 1–6. Drives the eyebrow label. */
  number: 1 | 2 | 3 | 4 | 5 | 6;
  /** Stage name — also becomes the headline. */
  name: string;
  /** Single lead sentence that sets the frame ("Your intelligence exists—but in pieces."). */
  lead: string;
  /** Parallel informational line ("Your knowledge …"). */
  knowledge: string;
  /** Parallel relational line ("Your relationships …"). */
  relationships: string;
  /** Short, punchy closing lines. Rendered as separate paragraphs. */
  conclusion: string[];
  /** Surface tone. `section` for light bands above reused stages; `midnight` for Stage 1. */
  surface?: Surface;
  /** Anchor id for wayfinding + deep-linking. */
  id?: string;
};

const surfaceClass: Record<Surface, { eyebrow: string; heading: string; body: string; accent: string; rule: string }> = {
  midnight: {
    eyebrow: "text-inverse-foreground/60",
    heading: "text-inverse-foreground",
    body: "text-inverse-foreground/80",
    accent: "text-pathway-accent",
    rule: "border-inverse-foreground/20",
  },
  section: {
    eyebrow: "text-muted-foreground",
    heading: "text-foreground",
    body: "text-muted-foreground",
    accent: "text-primary",
    rule: "border-border",
  },
};

/**
 * Canonical six-stage intro band.
 * Every stage on `/fragmentation-new` opens with the same shape so the parallel
 * structure is visible: Knowledge | Relationships | short conclusion.
 * Copy comes from the caller; the layout and rhythm are fixed here.
 */
export function FragmentationStageIntroBand({
  number,
  name,
  lead,
  knowledge,
  relationships,
  conclusion,
  surface = "section",
  id,
}: Props) {
  const tone = surfaceClass[surface];

  return (
    <Section
      id={id}
      variant={surface}
      spacing={surface === "midnight" ? "lg" : "sm"}
      className="scroll-mt-40 lg:scroll-mt-44"
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <Container>
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-start lg:gap-16">
          <div className="min-w-0">
            <Eyebrow className={cn("mb-3", tone.eyebrow)}>
              Stage {number}
            </Eyebrow>
            <Display
              id={id ? `${id}-heading` : undefined}
              as="h2"
              size="md"
              className={cn("text-balance", tone.heading)}
            >
              {name}
            </Display>
            <p className={cn("mt-5 max-w-[38ch] text-balance text-xl font-medium tracking-tight", tone.heading)}>
              {lead.includes("—") ? (
                renderWithEmphasisBeforeDash(lead, tone.accent)
              ) : (
                lead
              )}
            </p>
          </div>

          <div className="min-w-0 max-w-prose space-y-5">
            <dl className="space-y-3">
              <ParallelLine label="Knowledge" text={knowledge} tone={tone} />
              <ParallelLine label="Relationships" text={relationships} tone={tone} />
            </dl>
            <div className={cn("space-y-1.5 border-l pl-4", tone.rule)}>
              {conclusion.map((line, i) => (
                <p
                  key={i}
                  className={cn(
                    "text-lg font-medium leading-snug",
                    tone.heading
                  )}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ParallelLine({
  label,
  text,
  tone,
}: {
  label: "Knowledge" | "Relationships";
  text: string;
  tone: (typeof surfaceClass)[Surface];
}) {
  return (
    <div className="grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1">
      <dt
        className={cn(
          "text-xs font-semibold uppercase tracking-eyebrow",
          tone.accent
        )}
      >
        {label}
      </dt>
      <dd className={cn("text-base leading-relaxed sm:text-lg", tone.body)}>
        {text}
      </dd>
    </div>
  );
}

/**
 * Renders a lead sentence where the clause after an em-dash is emphasized —
 * e.g. "Your intelligence exists—but in pieces." with "but in pieces" accented.
 */
function renderWithEmphasisBeforeDash(text: string, accentClass: string) {
  const idx = text.indexOf("—");
  if (idx === -1) return text;
  const head = text.slice(0, idx);
  const tail = text.slice(idx);
  return (
    <>
      {head}
      <em className={cn("not-italic", accentClass)}>{tail}</em>
    </>
  );
}
