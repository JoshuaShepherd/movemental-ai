import { cn } from "@/lib/utils";

import {
  IntelView,
  IvAvatar,
  IvBar,
  IvBookSpine,
  IvChatTail,
  IvChip,
  IvCol,
  IvEyebrow,
  IvGlyph,
  IvMailHeader,
  IvMeter,
  IvNode,
  IvNodeGroup,
  IvPdfBadge,
  IvPlayGlyph,
  IvRow,
  IvRule,
  IvSticky,
  IvSvgHubNode,
  IvType,
  IvWaveform,
} from "./primitives";
import type { IntelArtifactBaseProps } from "./types";

type P = IntelArtifactBaseProps;

function isRel(field: P["field"]) {
  return field === "rel";
}

/** Act I — order of service / structured bulletin */
export function OrderOfServiceStructuredUnitsIntel({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "Structured order of service with numbered units",
}: P) {
  const isThumb = variant === "thumb";
  const allItems = [
    "Gathering · call to worship",
    "Song — Steadfast",
    "Scripture · Psalm 27",
    "Teaching — Formation in tension",
    "Communion · shared table",
    "Sending · shared benediction",
  ];
  const items = isThumb ? allItems.slice(0, 4) : allItems;
  return (
    <IntelView
      field={field}
      variant={variant}
      className={className}
      embedded={embedded}
      aria-label={ariaLabel}
    >
      <IvEyebrow warm>Sunday · Mar 24</IvEyebrow>
      {!isThumb ? (
        <IvType as="h3" variant="title" className="mt-1">
          Gathered practice
        </IvType>
      ) : null}
      <IvRule className="my-2" />
      <IvCol className="flex-1 gap-2">
        {items.map((label, i) => (
          <IvRow key={label} className="items-start gap-2">
            <span className="inline-flex w-6 shrink-0 justify-center rounded bg-primary/15 py-0.5 text-[0.65rem] font-semibold tabular-nums text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <IvType variant="subtitle" className="min-w-0 truncate">
              {label}
            </IvType>
          </IvRow>
        ))}
      </IvCol>
      {isRel(field) && !isThumb ? (
        <IvRow className="mt-2 gap-1">
          <IvAvatar initials="JD" size="sm" />
          <IvAvatar initials="AK" size="sm" />
          <IvChip className="ml-auto">Leads · block 3</IvChip>
        </IvRow>
      ) : null}
    </IntelView>
  );
}

/** Act I — session card */
export function SessionEssentialStructuresCardIntel({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "Session card with essential structures",
}: P) {
  const dense = variant !== "full";
  const sections = [
    { label: "Land the question", meta: "5 min" },
    { label: "Teach one frame", meta: "15 min" },
    { label: "Work it in pairs", meta: "18 min" },
    { label: "Name what held", meta: "7 min" },
  ];
  return (
    <IntelView
      field={field}
      variant={variant}
      className={className}
      embedded={embedded}
      aria-label={ariaLabel}
    >
      <IvRow between>
        <IvEyebrow>Session 04</IvEyebrow>
        <IvChip>45 min</IvChip>
      </IvRow>
      <IvCol className="gap-1">
        <IvType as="h3" variant="title">
          Essential structures
        </IvType>
        {!dense ? (
          <IvType variant="subtitle">Four moves a formation session has to hold</IvType>
        ) : null}
      </IvCol>
      <IvRule className="my-2" />
      <IvCol className={cn("flex-1 gap-2", dense && "gap-1")}>
        {sections.map((s, i) => (
          <IvRow key={s.label} className="items-start gap-2">
            <span className="w-4 shrink-0 text-[0.65rem] font-semibold tabular-nums text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <IvCol className="min-w-0 flex-1 gap-0.5">
              <IvType variant="subtitle" className="truncate">
                {s.label}
              </IvType>
              {!dense ? <IvType variant="meta">{s.meta}</IvType> : null}
            </IvCol>
          </IvRow>
        ))}
      </IvCol>
      <IvMeter fillPct={28} />
      {isRel(field) ? (
        <IvRow className="mt-2 gap-1">
          <IvAvatar initials="FC" accent />
          <IvChip accent>Shared artifact</IvChip>
        </IvRow>
      ) : (
        <IvRow className="mt-2">
          <IvChip>Prerequisite · Module 01</IvChip>
        </IvRow>
      )}
    </IntelView>
  );
}

/** Act II — split flow diagram */
export function FormalDesignSystemsSplitFlowIntel({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "Formal design systems branching from one source",
}: P) {
  return (
    <IntelView
      field={field}
      variant={variant}
      className={cn("relative justify-center", className)}
      embedded={embedded}
      aria-label={ariaLabel}
    >
      <svg
        viewBox="0 0 160 100"
        className="h-full w-full max-h-[min(100%,12rem)] text-foreground"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <title>Split flow</title>
        <IvSvgHubNode cx={24} cy={50} r={10} primary />
        <line
          x1="34"
          y1="50"
          x2="72"
          y2="50"
          className="stroke-foreground/45"
          strokeWidth="1.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx="80"
          cy="50"
          r="8"
          className="fill-card stroke-foreground/55"
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
        />
        <IvSvgHubNode cx={80} cy={50} r={2.5} />
        {[
          { x: 84, y: 46, tx: 118, ty: 22 },
          { x: 88, y: 50, tx: 120, ty: 50 },
          { x: 84, y: 54, tx: 118, ty: 78 },
        ].map((e) => (
          <line
            key={`${e.tx}-${e.ty}`}
            x1={e.x}
            y1={e.y}
            x2={e.tx}
            y2={e.ty}
            className="stroke-foreground/38"
            strokeWidth="1.4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {[22, 50, 78].map((cy) => (
          <g key={cy}>
            <circle
              cx="128"
              cy={cy}
              r="7"
              className="fill-card stroke-foreground/45"
              strokeWidth="1.4"
              vectorEffect="non-scaling-stroke"
            />
            <IvSvgHubNode cx={128} cy={cy} r={2} />
            <line
              x1="136"
              y1={cy}
              x2="150"
              y2={cy}
              className="stroke-foreground/30"
              strokeWidth="1"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
        <text
          x="14"
          y="92"
          className="fill-muted-foreground text-[6px] font-sans font-semibold uppercase tracking-[0.12em]"
        >
          Formal · design · systems
        </text>
      </svg>
      {isRel(field) && variant === "full" ? (
        <IvRow className="absolute bottom-2 right-2 gap-1">
          <IvAvatar initials="v2" />
          <IvChip className="text-[0.55rem]">Slack draft</IvChip>
        </IvRow>
      ) : null}
    </IntelView>
  );
}

/** Act III — book */
export function BookFragmentsOfFormIntel({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "Book cover, fragments of form",
}: P) {
  const isThumb = variant === "thumb";
  return (
    <IntelView
      field={field}
      variant={variant}
      className={cn(
        "justify-between",
        "bg-[linear-gradient(155deg,color-mix(in_srgb,var(--primary)_6%,var(--card))_0%,var(--card)_60%)]",
        className,
      )}
      embedded={embedded}
      aria-label={ariaLabel}
    >
      <IvBookSpine />
      <IvRow between className="pl-3">
        <IvEyebrow warm>A formation primer</IvEyebrow>
        {!isThumb ? <IvGlyph kind="book" className="text-primary/55" /> : null}
      </IvRow>
      <IvCol className="mt-3 flex-1 gap-2 pl-3">
        <IvType as="h3" variant="title" className="text-[0.95rem] leading-[1.05] sm:text-base">
          Fragments of Form
        </IvType>
        <IvType variant="subtitle">Recovering the shape of shared practice</IvType>
      </IvCol>
      <IvCol className="mt-auto gap-2 pl-3">
        {!isRel(field) && !isThumb ? (
          <IvType variant="byline">by Alan Hirsch &amp; Brad Brisco</IvType>
        ) : null}
        <IvRule />
        {isRel(field) ? (
          <IvRow between>
            <IvChip>Book club · Tue</IvChip>
            <IvAvatar initials="BC" size="sm" />
          </IvRow>
        ) : (
          <IvRow between>
            <IvType variant="byline">Alan Hirsch</IvType>
            <IvChip>ISBN · 2024</IvChip>
          </IvRow>
        )}
      </IvCol>
    </IntelView>
  );
}

/** Act III — module */
export function ModuleFormalSystemsIntroIntel({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "Course module introduction card",
}: P) {
  const isThumb = variant === "thumb";
  return (
    <IntelView field={field} variant={variant} className={className} embedded={embedded} aria-label={ariaLabel}>
      <IvRow between>
        <IvEyebrow>Module 01</IvEyebrow>
        <span
          className="relative size-8 shrink-0 overflow-hidden rounded-md bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_28%,var(--card))_0%,var(--card)_100%)] ring-1 ring-border"
          aria-hidden
        >
          <IvGlyph kind="module" className="absolute inset-0 m-auto size-4 text-primary/70" />
        </span>
      </IvRow>
      <IvCol className="gap-1">
        <IvType as="h3" variant="title">
          Formal systems, introduced
        </IvType>
        {!isThumb ? (
          <IvType variant="subtitle">
            A shared vocabulary for the shapes your work already takes.
          </IvType>
        ) : null}
      </IvCol>
      {!isThumb ? (
        <IvCol className="gap-0.5">
          <IvType variant="meta">4 sessions · 3 hrs</IvType>
          <IvType variant="meta">Next: Essential structures</IvType>
        </IvCol>
      ) : null}
      <IvCol className="mt-auto gap-2">
        <IvMeter fillPct={45} />
        <IvRow between>
          {isRel(field) ? (
            <IvChip>Cohort vs median</IvChip>
          ) : (
            <IvChip>Prerequisite · none</IvChip>
          )}
          <IvChip accent>Continue</IvChip>
        </IvRow>
      </IvCol>
    </IntelView>
  );
}

/** Cover — principles */
export function CoverPrinciplesDesignFragmentationIntel({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "Cover principles of design fragmentation",
}: P) {
  return (
    <IntelView
      field={field}
      variant={variant}
      className={cn("justify-between", className)}
      embedded={embedded}
      aria-label={ariaLabel}
    >
      <IvEyebrow>Principles</IvEyebrow>
      <IvCol className="gap-1">
        <IvType as="h3" variant="title" className="text-[0.95rem] leading-[1.05]">
          Principles of Design
        </IvType>
        <IvType variant="subtitle">
          Why fragmentation happens — and what to do first.
        </IvType>
      </IvCol>
      {!isRel(field) ? (
        <IvCol className="gap-1.5">
          {["Name the break before you fix it", "Give canon a single home", "Practice beats publishing"].map((p) => (
            <IvRow key={p} className="items-start gap-2">
              <span
                aria-hidden
                className="mt-1 inline-block size-1.5 shrink-0 rounded-full bg-primary/70"
              />
              <IvType variant="meta" className="min-w-0 truncate">
                {p}
              </IvType>
            </IvRow>
          ))}
        </IvCol>
      ) : null}
      <IvCol className="gap-2">
        <IvRule />
        {isRel(field) ? (
          <IvRow className="gap-1">
            <IvAvatar initials="DR" size="sm" />
            <IvAvatar initials="LM" size="sm" />
            <IvType variant="byline" className="ml-2 truncate">
              Deb Ryan &amp; Len McCarty
            </IvType>
          </IvRow>
        ) : (
          <IvRow between>
            <IvType variant="byline">Deb Ryan</IvType>
            <IvChip>ISBN · 2024</IvChip>
          </IvRow>
        )}
      </IvCol>
    </IntelView>
  );
}

/** Cover — research */
export function CoverStructuralFragmentsInvestigationIntel({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "Research cover with abstract and metrics",
}: P) {
  return (
    <IntelView field={field} variant={variant} className={className} embedded={embedded} aria-label={ariaLabel}>
      <IvRow between>
        <IvEyebrow warm>Research</IvEyebrow>
        <IvChip>2024</IvChip>
      </IvRow>
      <IvCol className="gap-1">
        <IvType as="h3" variant="title" className="text-[0.95rem] leading-[1.05]">
          Structural Fragments
        </IvType>
        <IvType variant="subtitle">
          A field investigation of how formation work gets scattered.
        </IvType>
      </IvCol>
      <IvRule className="my-2" />
      <IvCol className="flex-1 gap-1">
        <IvType variant="chapter">Abstract</IvType>
        <IvType variant="meta" className="leading-snug">
          Across 42 organizations, we traced how knowledge and relationship
          drift out of alignment during the third year of leadership work.
        </IvType>
      </IvCol>
      <IvRow className="mt-2 items-end gap-0.5" aria-hidden>
        {[50, 75, 40, 90, 60].map((h, i) => (
          <span
            key={i}
            className={cn(
              "flex-1 rounded-t-sm bg-foreground/20",
              i === 3 && "bg-primary",
            )}
            style={{ height: `${h}%`, maxHeight: "2rem" }}
          />
        ))}
      </IvRow>
      {isRel(field) ? (
        <IvRow className="mt-2 gap-1">
          <IvAvatar initials="A1" />
          <IvAvatar initials="A2" />
          <IvChip accent>Revise requested</IvChip>
        </IvRow>
      ) : (
        <IvChip className="mt-2 w-fit">Citations · 128</IvChip>
      )}
    </IntelView>
  );
}

/** Podcast tile */
export function PodcastCardAbstractStructuresIntel({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "Podcast episode card",
}: P) {
  const isThumb = variant === "thumb";
  return (
    <IntelView field={field} variant={variant} className={className} embedded={embedded} aria-label={ariaLabel}>
      <div
        className="relative mx-auto aspect-square w-2/5 shrink-0 overflow-hidden rounded-md bg-[radial-gradient(120%_80%_at_30%_30%,color-mix(in_srgb,var(--primary)_32%,var(--card))_0%,var(--card)_70%)] ring-1 ring-border"
        aria-hidden
      >
        <IvGlyph
          kind="podcast"
          className="absolute inset-0 m-auto size-1/2 text-primary/65"
        />
      </div>
      <IvRow between className="mt-2">
        <IvEyebrow>Ep. 12</IvEyebrow>
        {!isThumb ? <IvType variant="date">42 min</IvType> : null}
      </IvRow>
      <IvCol className="gap-0.5">
        <IvType as="h3" variant="title">
          Rhythms of shared practice
        </IvType>
        {!isThumb ? (
          <IvType variant="byline">with Brad Brisco &amp; JR Woodward</IvType>
        ) : null}
      </IvCol>
      <IvWaveform bars={22} activeIndex={7} className="mt-auto" />
      {isRel(field) ? (
        <IvRow className="mt-2 gap-1">
          <IvChip>Listener Q</IvChip>
          <IvAvatar initials="LQ" size="sm" />
        </IvRow>
      ) : (
        <IvChip className="mt-2 w-fit">Chapters · timestamps</IvChip>
      )}
    </IntelView>
  );
}

/** Mobile chat skeleton */
export function MobileChatSkeletonBubblesIntel({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "Mobile chat thread with skeleton bubbles",
}: P) {
  return (
    <IntelView field={field} variant={variant} className={className} embedded={embedded} aria-label={ariaLabel}>
      <IvRow between className="text-[0.65rem] text-muted-foreground">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <span className="size-1 rounded-full bg-muted-foreground/40" />
          <IvBar widthPct={20} className="h-1.5" />
        </span>
      </IvRow>
      <IvRow className="border-b border-border pb-2">
        <IvAvatar initials="TM" />
        <IvCol className="min-w-0 gap-0.5">
          <IvType variant="subtitle" className="truncate font-semibold">
            Tim Meyer
          </IvType>
          <IvType variant="meta">Cohort · active now</IvType>
        </IvCol>
      </IvRow>
      <IvCol className="mt-auto flex-1 justify-end gap-1.5">
        <div className="relative ml-auto max-w-[85%] rounded-2xl bg-muted px-3 py-2 text-muted-foreground">
          <IvChatTail side="right" />
          <IvType variant="meta" className="block leading-snug text-foreground/75">
            Did you ever send the formation primer? Alan wanted the §4 frame.
          </IvType>
        </div>
        <div className="relative mr-auto max-w-[80%] rounded-2xl bg-primary/10 px-3 py-2 text-primary">
          <IvChatTail side="left" />
          <IvType variant="meta" className="block leading-snug text-primary/85">
            Pulling it now — same version as the board packet.
          </IvType>
        </div>
        <div className="relative ml-auto max-w-[75%] rounded-2xl bg-muted px-3 py-2 text-muted-foreground">
          <IvChatTail side="right" />
          <IvType variant="meta" className="block leading-snug text-foreground/75">
            Perfect. Brad&apos;s bringing Tim Catchim on Thursday.
          </IvType>
        </div>
        <div className="relative mr-auto inline-flex items-center gap-0.5 rounded-2xl bg-primary/10 px-3 py-2 text-primary">
          <IvChatTail side="left" />
          <span className="size-1 animate-pulse rounded-full bg-primary/60 motion-reduce:animate-none [animation-delay:0ms]" aria-hidden />
          <span className="size-1 animate-pulse rounded-full bg-primary/60 motion-reduce:animate-none [animation-delay:150ms]" aria-hidden />
          <span className="size-1 animate-pulse rounded-full bg-primary/60 motion-reduce:animate-none [animation-delay:300ms]" aria-hidden />
        </div>
        {isRel(field) ? (
          <IvRow className="gap-1 pt-1">
            <IvChip className="text-[0.55rem]">Typing…</IvChip>
            <IvAvatar initials="A" />
            <IvAvatar initials="B" />
          </IvRow>
        ) : (
          <IvChip className="w-fit text-[0.55rem]">System · pinned policy</IvChip>
        )}
      </IvCol>
      <IvRow className="mt-2 rounded-full bg-muted/80 px-2 py-1">
        <IvBar widthPct={50} faint className="h-2" />
        <span className="ml-auto size-2 rounded-full bg-primary" aria-hidden />
      </IvRow>
    </IntelView>
  );
}

/** Email thread */
export function EmailThreadMultiParticipantIntel({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "Multi-participant email thread",
}: P) {
  const isThumb = variant === "thumb";
  const rows = [
    { indent: 0, unread: true, initials: "JS", name: "Josh Shepherd", time: "9:41 AM", preview: "Pulled the formation primer from last quarter — the frame still holds." },
    { indent: 1, unread: false, initials: "AK", name: "Alan Hirsch", time: "Fri", preview: "Agreed. Let's keep §4 as the canonical entry." },
    { indent: 0, unread: false, initials: "MR", name: "Mandy Rodgers", time: "Thu", preview: "Adding the board packet so accreditation lines up." },
    { indent: 1, unread: false, initials: "TN", name: "Tim Nichols", time: "Wed", preview: "Re-sent the Brisco thread for context." },
  ];
  return (
    <IntelView field={field} variant={variant} className={className} embedded={embedded} aria-label={ariaLabel}>
      <IvCol className="gap-1">
        <IvRow between className="items-baseline">
          <IvCol className="min-w-0 gap-0.5">
            <IvType as="h3" variant="title" className="truncate">
              Re: Formation primer · canonical version?
            </IvType>
            <IvType variant="meta">7 participants · 12 replies</IvType>
          </IvCol>
          {isRel(field) && !isThumb ? (
            <IvRow className="gap-1">
              <IvChip>To / CC</IvChip>
              <IvAvatar initials="+4" size="sm" />
            </IvRow>
          ) : null}
        </IvRow>
      </IvCol>
      <IvRule className="my-2" />
      <IvCol className="flex-1 gap-2">
        {rows.map((m, i) => (
          <div
            key={i}
            className="flex min-w-0 items-start gap-2"
            style={{ paddingLeft: `${m.indent * 8}%` }}
          >
            <IvAvatar initials={m.initials} size="sm" unread={m.unread} />
            <div className="min-w-0 flex-1">
              <IvMailHeader
                from={m.name}
                subject={isThumb ? "" : m.preview}
                time={m.time}
                unread={m.unread}
              />
            </div>
          </div>
        ))}
      </IvCol>
      {isRel(field) ? null : (
        <IvRow className="mt-2 gap-1">
          <IvChip>
            <IvGlyph kind="attachment" className="mr-1 size-2.5" />2 attached
          </IvChip>
          <IvChip className="text-[0.55rem]">Policy footer</IvChip>
        </IvRow>
      )}
    </IntelView>
  );
}

/** Staggered message thread */
export function MessageThreadStaggeredFragmentsIntel({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "Staggered message thread with misaligned replies",
}: P) {
  return (
    <IntelView field={field} variant={variant} className={className} embedded={embedded} aria-label={ariaLabel}>
      <IvRow between>
        <IvType variant="subtitle" className="truncate font-semibold">
          Re: Fragments of Form — publisher notes
        </IvType>
        <IvChip>Re:</IvChip>
      </IvRow>
      <IvRule className="my-2" />
      <IvCol className="flex-1 gap-2">
        <div className="ml-0">
          <IvRow>
            <IvAvatar initials="Q1" />
            <IvBar widthPct={40} className="ml-2 h-2" />
          </IvRow>
          <IvCol className="mt-1 gap-1 pl-9">
            <IvBar widthPct={90} />
            <IvBar widthPct={70} />
          </IvCol>
        </div>
        <div className="ml-[12%] transform-[rotate(-0.5deg)]">
          <IvRow>
            <IvAvatar initials="Q2" accent size="sm" />
            <IvBar widthPct={30} className="ml-2 h-2" />
          </IvRow>
          <IvBar widthPct={80} className="mt-1" />
        </div>
        <div className="ml-[4%] transform-[rotate(0.3deg)]">
          <IvRow>
            <IvAvatar initials="Q3" size="sm" />
            <IvBar widthPct={40} className="ml-2 h-2" />
          </IvRow>
          <IvCol className="mt-1 gap-1 pl-9">
            <IvBar widthPct={90} />
            <IvBar widthPct={60} />
          </IvCol>
        </div>
        <div className="ml-[18%] transform-[rotate(-0.8deg)]">
          <IvRow>
            <IvAvatar initials="??" size="sm" />
            <IvBar widthPct={30} className="ml-2 h-2" />
          </IvRow>
          <IvBar widthPct={70} className="mt-1" />
        </div>
      </IvCol>
      {isRel(field) ? (
        <span className="mt-2 inline-flex w-fit rounded-full border border-destructive/25 bg-destructive/5 px-2 py-0.5 text-[0.65rem] font-medium text-destructive">
          Mis-attribution risk
        </span>
      ) : (
        <IvChip className="mt-2 w-fit">Quote depth · 4</IvChip>
      )}
    </IntelView>
  );
}

/** Hub to fragments */
export function CoreHubToFragmentNodesIntel({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "Central hub connected to fragment nodes",
}: P) {
  return (
    <IntelView field={field} variant={variant} className={className} embedded={embedded} aria-label={ariaLabel}>
      <IvEyebrow>System</IvEyebrow>
      <div className="relative mt-2 flex-1 min-h-[8rem]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full text-foreground" aria-hidden>
          <defs>
            <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.14" className="text-primary" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-primary" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="22" fill="url(#hub-glow)" />
          {[
            [20, 20], [80, 20], [90, 50], [80, 80], [20, 80], [10, 50], [50, 12],
          ].map(([tx, ty]) => (
            <line
              key={`${tx}-${ty}`}
              x1="50"
              y1="50"
              x2={tx}
              y2={ty}
              className="stroke-foreground/35"
              strokeWidth="1.2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <IvSvgHubNode cx={50} cy={50} r={6} primary />
        </svg>
        {[
          { t: 20, l: 20 },
          { t: 20, l: 80 },
          { t: 50, l: 90 },
          { t: 80, l: 80 },
          { t: 80, l: 20 },
          { t: 50, l: 10 },
          { t: 12, l: 50 },
        ].map((p, i) => (
          <span
            key={i}
            className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-card ring-1 ring-border"
            style={{ top: `${p.t}%`, left: `${p.l}%` }}
          />
        ))}
      </div>
      {isRel(field) ? (
        <IvRow className="mt-1 flex-wrap gap-1">
          <IvChip className="text-[0.55rem]">Last sync · 2m</IvChip>
        </IvRow>
      ) : (
        <IvRow className="mt-1 flex-wrap gap-1">
          {["md", "thread", "podcast"].map((t) => (
            <IvChip key={t} className="text-[0.55rem]">
              {t}
            </IvChip>
          ))}
        </IvRow>
      )}
    </IntelView>
  );
}

/** Sketch converge / diverge */
export function SketchConvergeDivergeFlowIntel({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "Sketch of converge and diverge flow",
}: P) {
  return (
    <IntelView
      field={field}
      variant={variant}
      className={cn("justify-center", className)}
      embedded={embedded}
      aria-label={ariaLabel}
    >
      <svg viewBox="0 0 100 100" className="size-full max-h-[min(100%,14rem)] fill-none stroke-current text-foreground" aria-hidden>
        <circle cx="18" cy="26" r="4" className="fill-foreground/80 stroke-none" />
        <circle cx="18" cy="50" r="4" className="fill-foreground/80 stroke-none" />
        <circle cx="18" cy="74" r="4" className="fill-foreground/80 stroke-none" />
        <path d="M 24 26 Q 38 30, 48 48 Q 52 52, 52 52" className="stroke-foreground/35" strokeWidth="1" />
        <path d="M 24 50 Q 36 50, 48 50" className="stroke-foreground/35" strokeWidth="1" />
        <path d="M 24 74 Q 38 70, 48 52" className="stroke-foreground/35" strokeWidth="1" />
        <circle cx="52" cy="50" r="6" className="stroke-foreground/40" strokeWidth="1.5" />
        <path d="M 60 50 Q 70 44, 82 30" className="stroke-foreground/30" strokeWidth="1" />
        <path d="M 60 50 Q 72 50, 84 50" className="stroke-foreground/30" strokeWidth="1" />
        <path d="M 60 50 Q 70 56, 82 70" className="stroke-foreground/30" strokeWidth="1" />
        <circle cx="84" cy="30" r="3" className="fill-primary/40 stroke-foreground/30" strokeWidth="0.8" />
        <circle cx="86" cy="50" r="3" className="fill-primary/40 stroke-foreground/30" strokeWidth="0.8" />
        <circle cx="84" cy="70" r="3" className="fill-primary/40 stroke-foreground/30" strokeWidth="0.8" />
        <path d="M 78 28 L 82 30 L 80 34" className="fill-none stroke-foreground/35" strokeWidth="1" />
        <path d="M 80 48 L 86 50 L 82 54" className="fill-none stroke-foreground/35" strokeWidth="1" />
        <path d="M 78 72 L 84 70 L 82 66" className="fill-none stroke-foreground/35" strokeWidth="1" />
        <text x="20" y="92" className="fill-muted-foreground text-[5px] font-sans tracking-wide">
          {isRel(field) ? "COMMUNITY NODES" : "CONVERGE → DIVERGE"}
        </text>
      </svg>
    </IntelView>
  );
}

/** Stage presentation */
export function StagePresentationThreeShapesIntel({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "Stage presentation with three shapes on screen",
}: P) {
  return (
    <IntelView
      field={field}
      variant={variant}
      className={cn("relative justify-end", className)}
      embedded={embedded}
      aria-label={ariaLabel}
    >
      <div className="absolute inset-x-[8%] top-[6%] bottom-[36%] rounded-md bg-inverse-surface/90 p-[6%]">
        <IvRow className="h-full items-center justify-center gap-[6%]">
          <span className="aspect-square w-[18%] rounded bg-primary/80" />
          <span className="aspect-square w-[16%] rounded-full bg-muted-foreground/30" />
          <span
            className="w-0 border-x-[9%] border-b-[16%] border-x-transparent border-b-muted-foreground/35"
            aria-hidden
          />
        </IvRow>
        {isRel(field) ? (
          <div className="absolute bottom-1 right-1 w-[35%] rounded bg-card/95 p-1 shadow-ambient">
            <IvBar widthPct={100} faint className="h-1" />
            <IvBar widthPct={70} faint className="mt-0.5 h-1" />
          </div>
        ) : (
          <IvRow className="absolute bottom-2 left-2 right-2">
            <IvBar widthPct={50} className="h-1.5" />
          </IvRow>
        )}
      </div>
      <span
        className="absolute bottom-[6%] left-[14%] size-[10%] rounded-full bg-foreground/20"
        aria-hidden
      />
      <span className="absolute bottom-[4%] left-[8%] right-[8%] h-0.5 rounded-full bg-inverse-foreground/15" aria-hidden />
    </IntelView>
  );
}

/** Generic doc / PDF (informational) */
export function DocPdfGenericIntel({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "Generic PDF brief with paragraph skeleton",
}: P) {
  const isThumb = variant === "thumb";
  return (
    <IntelView field={field} variant={variant} className={className} embedded={embedded} aria-label={ariaLabel}>
      <IvRow between>
        <IvEyebrow>Brief · 6 pages</IvEyebrow>
        <IvPdfBadge />
      </IvRow>
      <IvCol className="gap-1.5">
        <IvBar widthPct={80} strong height="lg" />
        <IvBar widthPct={50} faint />
      </IvCol>
      <IvRule className="my-2" />
      <IvRow className="min-h-0 flex-1 items-stretch gap-2">
        <IvCol className="min-w-0 flex-1 gap-1">
          {[100, 90, 85, 95, 70].map((w, i) => (
            <IvBar key={i} widthPct={w} faint />
          ))}
        </IvCol>
        {!isThumb ? (
          <IvCol className="w-[18%] shrink-0 gap-0.5">
            {[60, 80, 50, 70, 40].map((w, i) => (
              <IvBar key={i} widthPct={w} faint height="xs" />
            ))}
          </IvCol>
        ) : null}
      </IvRow>
      {isRel(field) && !isThumb ? (
        <IvRow className="mt-2 gap-1">
          <IvAvatar initials="RV" size="sm" />
          <IvAvatar initials="MA" size="sm" />
          <IvChip className="ml-auto text-[0.55rem]">Comments · 4</IvChip>
        </IvRow>
      ) : (
        <IvRow className="mt-2 gap-1">
          <IvChip className="text-[0.55rem]">v3 · Mar</IvChip>
          <IvChip className="text-[0.55rem]">42 KB</IvChip>
        </IvRow>
      )}
    </IntelView>
  );
}

/** Video frame with timestamp (informational) */
export function VideoFrameTimestampedIntel({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "Video frame with play glyph and timestamp",
}: P) {
  return (
    <IntelView
      field={field}
      variant={variant}
      className={cn("relative aspect-video max-h-none", className)}
      embedded={embedded}
      aria-label={ariaLabel}
    >
      <div className="absolute inset-[6%] overflow-hidden rounded-md bg-inverse-surface ring-1 ring-inverse-foreground/10">
        <span className="absolute left-2 top-2 rounded bg-inverse-foreground/10 px-1.5 py-0.5 text-[0.55rem] font-medium uppercase tracking-[0.08em] text-inverse-foreground/70">
          Chapters · 7
        </span>
        {isRel(field) ? (
          <div className="absolute right-2 top-2 flex gap-0.5">
            <IvAvatar initials="W1" size="sm" className="ring-1 ring-inverse-foreground/10" />
            <IvAvatar initials="W2" size="sm" className="ring-1 ring-inverse-foreground/10" />
            <IvAvatar initials="+3" size="sm" accent className="ring-1 ring-inverse-foreground/10" />
          </div>
        ) : (
          <span className="absolute right-2 top-2 rounded bg-inverse-foreground/10 px-1.5 py-0.5 text-[0.55rem] font-medium uppercase tracking-[0.08em] text-inverse-foreground/70">
            1080p
          </span>
        )}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <IvPlayGlyph size={variant === "thumb" ? "sm" : "md"} />
        </span>
        <div className="absolute inset-x-3 bottom-2 flex items-center gap-2">
          <span className="rounded bg-primary/90 px-1.5 py-0.5 text-[0.55rem] font-semibold text-primary-foreground">
            04:12
          </span>
          <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-inverse-foreground/20">
            <span className="absolute inset-y-0 left-0 w-[38%] rounded-full bg-primary" />
          </span>
        </div>
      </div>
      {isRel(field) ? (
        <span className="absolute bottom-2 left-3 inline-flex items-center gap-1 rounded-full bg-card px-2 py-0.5 text-[0.55rem] font-medium text-muted-foreground shadow-ambient">
          <span className="size-1 rounded-full bg-primary" /> 12 comments
        </span>
      ) : null}
    </IntelView>
  );
}

/** Notes / sticky sketch (informational) */
export function NotesStickySketchIntel({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "Sticky note with sketch and bar chart",
}: P) {
  return (
    <IntelView
      field={field}
      variant={variant}
      className={cn("bg-transparent p-0 shadow-none", className)}
      embedded={embedded}
      aria-label={ariaLabel}
    >
      <IvSticky className="flex h-full flex-col gap-2">
        <IvRow between>
          <IvEyebrow warm>Field notes</IvEyebrow>
          <IvChip className="text-[0.55rem]">12 Mar</IvChip>
        </IvRow>
        <IvBar widthPct={50} strong />
        <IvCol className="gap-1">
          <IvBar widthPct={90} faint />
          <IvBar widthPct={70} faint />
          <IvBar widthPct={80} faint />
        </IvCol>
        <IvRow className="mt-auto items-end gap-0.5" aria-hidden>
          {[45, 65, 85, 55, 35].map((h, i) => (
            <span
              key={i}
              className={cn(
                "flex-1 rounded-t-sm bg-foreground/20",
                i === 2 && "bg-primary",
              )}
              style={{ height: `${h}%`, maxHeight: "1.75rem" }}
            />
          ))}
        </IvRow>
        {isRel(field) ? (
          <IvRow between className="mt-1">
            <IvChip className="text-[0.55rem]">— D.R.</IvChip>
            <IvRow className="gap-0.5">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              <span className="size-1.5 rounded-full bg-muted-foreground/30" aria-hidden />
            </IvRow>
          </IvRow>
        ) : (
          <IvChip className="mt-1 w-fit text-[0.55rem]">Sample · n=28</IvChip>
        )}
      </IvSticky>
    </IntelView>
  );
}

/** CRM person card (relational) */
export function CrmPersonCardIntel({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "CRM person card with relationship state",
}: P) {
  const warmth = isRel(field) ? 72 : 54;
  return (
    <IntelView field={field} variant={variant} className={className} embedded={embedded} aria-label={ariaLabel}>
      <IvRow className="items-center gap-3">
        <IvAvatar initials="PS" size="lg" accent />
        <IvCol className="min-w-0 flex-1 gap-1">
          <IvBar widthPct={70} strong height="lg" />
          <IvBar widthPct={45} faint />
        </IvCol>
      </IvRow>
      <IvRow className="mt-2 flex-wrap gap-1">
        <IvChip>Pastor</IvChip>
        <IvChip>Cohort 4</IvChip>
        {!isRel(field) ? <IvChip className="text-[0.55rem]">Tenure · 4y</IvChip> : null}
      </IvRow>
      <IvRule className="my-2" />
      <IvCol className="gap-2">
        <IvRow between className="text-[0.65rem] text-muted-foreground">
          <span>{isRel(field) ? "Relationship warmth" : "Engagement"}</span>
          <span>{warmth}%</span>
        </IvRow>
        <IvMeter fillPct={warmth} />
      </IvCol>
      <IvCol className="mt-auto gap-2 pt-3">
        {isRel(field) ? (
          <>
            <IvRow className="items-center gap-1 text-[0.6rem] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              <span className="size-1.5 rounded-full bg-primary/60" />
              <span className="size-1.5 rounded-full bg-primary/30" />
              <span className="ml-1">Last touch · 9d ago</span>
            </IvRow>
            <IvChip accent className="w-fit">Warm intro pending</IvChip>
          </>
        ) : (
          <IvRow between>
            <IvChip className="text-[0.55rem]">Role</IvChip>
            <IvChip className="text-[0.55rem]">ID · P-204</IvChip>
          </IvRow>
        )}
      </IvCol>
    </IntelView>
  );
}

/** Single constellation node (relational primitive) */
export function NodeSingleIntel({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "Single constellation node",
}: P) {
  return (
    <IntelView
      field={field}
      variant={variant}
      className={cn("items-center justify-center bg-transparent p-2 shadow-none", className)}
      embedded={embedded}
      aria-label={ariaLabel}
    >
      <div className="flex flex-col items-center gap-1">
        <IvNode size="lg" tone={isRel(field) ? "filled" : "outline"} />
        <span className="text-[0.55rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {isRel(field) ? "P" : "A-12"}
        </span>
      </div>
    </IntelView>
  );
}

/** Grouped constellation node with +N badge (relational primitive) */
export function NodeGroupIntel({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "Grouped constellation node",
}: P) {
  return (
    <IntelView
      field={field}
      variant={variant}
      className={cn("items-center justify-center bg-transparent p-2 shadow-none", className)}
      embedded={embedded}
      aria-label={ariaLabel}
    >
      <div className="relative flex flex-col items-center gap-1">
        <IvNodeGroup count={5} tone={isRel(field) ? "primary" : "muted"} />
        {isRel(field) ? (
          <div className="pointer-events-none absolute -left-1 top-1 flex gap-0.5">
            <IvAvatar initials="A" size="sm" className="-mr-2 ring-1 ring-card" />
            <IvAvatar initials="B" size="sm" className="ring-1 ring-card" />
          </div>
        ) : null}
        <span className="text-[0.55rem] font-medium uppercase tracking-[0.08em] text-muted-foreground">
          {isRel(field) ? "Peers" : "Cluster · 5"}
        </span>
      </div>
    </IntelView>
  );
}
