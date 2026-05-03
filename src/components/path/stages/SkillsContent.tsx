import {
  formationMarkers,
  formationWeeks,
  lessonTypes,
  skillsDoneWatch,
} from "../data/shared";
import { StageDetail } from "../StageDetail";

/**
 * SkillsContent — Stage 03 panel body.
 *
 * Renders: AI Wisdom & Maturity course meta → 8-week 2x4 arc → lesson types
 * (5-row hairline list) → "What people walk away with" markers.
 */
export function SkillsContent() {
  return (
    <div className="mt-10 sm:mt-14 max-w-[38rem]">
      <p className="inline-flex items-center gap-2.5 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground mb-3">
        <span aria-hidden="true" className="inline-block w-[22px] h-px bg-foreground" />
        The deliverable
      </p>
      <h4 className="font-serif italic font-normal text-foreground text-[clamp(1.7rem,2.8vw,2.25rem)] leading-[1.1] mb-2.5">
        AI Wisdom &amp; Maturity
      </h4>
      <p className="text-[0.92rem] leading-[1.5] text-muted-foreground tracking-tight mb-7 [&_strong]:text-foreground [&_strong]:font-medium">
        <strong>Eight weeks</strong> · Live cohort · Customizable for your
        organization
      </p>

      <p className="text-base leading-[1.65] text-muted-foreground max-w-[56ch] mb-6 [&_strong]:text-foreground [&_strong]:font-medium">
        Training teaches people how to use tools. Formation teaches people
        how to carry responsibility when the tool is in the room.{" "}
        <strong>
          This course gives staff practical AI skills while forming the
          judgment, review habits, and shared language needed to use AI
          responsibly.
        </strong>
      </p>

      <p className="font-serif italic font-normal text-foreground text-[clamp(1.2rem,1.8vw,1.45rem)] leading-[1.4] max-w-[44ch] pl-5 border-l border-foreground mb-10 sm:mb-12">
        What you are building is not a faster team. It is a wiser one.
      </p>

      {/* 8-week arc */}
      <p className="inline-flex items-center gap-2.5 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground mb-3">
        <span aria-hidden="true" className="inline-block w-[22px] h-px bg-foreground" />
        The eight-week arc
      </p>
      <ol className="m-0 mb-10 sm:mb-12 p-0 list-none border-t border-border">
        {formationWeeks.map((week) => (
          <li
            key={week.num}
            className="grid grid-cols-[4.5rem_1fr] gap-4 items-start py-4 border-b border-border"
          >
            <span className="font-serif italic text-ink-soft text-base pt-0.5">
              {week.num}
            </span>
            <div>
              <p className="font-serif italic font-normal text-foreground text-[1.2rem] leading-[1.2] mb-1.5">
                {week.name}
              </p>
              <p className="text-[0.95rem] leading-[1.55] text-muted-foreground max-w-[50ch]">
                {week.desc}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Lesson types */}
      <p className="inline-flex items-center gap-2.5 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground mb-3">
        <span aria-hidden="true" className="inline-block w-[22px] h-px bg-foreground" />
        Inside each week
      </p>
      <ul className="m-0 p-0 list-none border-t border-border">
        {lessonTypes.map((lesson) => (
          <li
            key={lesson.label}
            className="grid grid-cols-[1.75rem_1fr] gap-3 items-start py-3 border-b border-border text-[0.97rem] leading-[1.5] text-muted-foreground"
          >
            <span aria-hidden="true" className="text-ink-soft leading-[1.5]">
              —
            </span>
            <span>
              <strong className="font-medium text-foreground">
                {lesson.label}
              </strong>{" "}
              {lesson.desc}
            </span>
          </li>
        ))}
      </ul>

      <hr aria-hidden="true" className="w-9 h-px bg-ink-soft border-0 my-10" />

      {/* What people walk away with */}
      <p className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground mb-6">
        What people walk away with
      </p>
      <ul className="m-0 p-0 list-none">
        {formationMarkers.map((marker, i) => (
          <li
            key={i}
            className="text-[1.1rem] leading-[1.5] text-foreground tracking-tight max-w-[44ch] mb-4 last:mb-0 [&_em]:font-serif [&_em]:italic [&_em]:font-normal [&_em]:text-[1.04em]"
            dangerouslySetInnerHTML={{ __html: marker }}
          />
        ))}
      </ul>

      <StageDetail data={skillsDoneWatch} />
    </div>
  );
}
