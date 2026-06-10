import { History, Lightbulb, MessageCircleQuestion, PenLine, ShieldAlert } from "lucide-react";

import { cn } from "@/lib/utils";

export type MarginNoteType =
  | "author_note"
  | "question"
  | "feedback"
  | "criticism"
  | "revision_credit";

type MarginNoteProps = {
  type: MarginNoteType;
  body: string;
  contributorName?: string;
  contributorTitle?: string;
  date?: string;
  className?: string;
};

const noteConfig: Record<
  MarginNoteType,
  { icon: typeof PenLine; label: string; className: string }
> = {
  author_note: {
    icon: PenLine,
    label: "Author note",
    className: "bg-section",
  },
  question: {
    icon: MessageCircleQuestion,
    label: "Reader question",
    className: "bg-card border-l-2 border-primary/20",
  },
  feedback: {
    icon: Lightbulb,
    label: "Reader feedback",
    className: "bg-card border-l-2 border-primary/20",
  },
  criticism: {
    icon: ShieldAlert,
    label: "Constructive critique",
    className: "bg-card border-l-2 border-primary/20",
  },
  revision_credit: {
    icon: History,
    label: "Revision credit",
    className: "bg-elevated",
  },
};

export function MarginNote({
  type,
  body,
  contributorName,
  contributorTitle,
  date,
  className,
}: MarginNoteProps) {
  const config = noteConfig[type];
  const Icon = config.icon;

  return (
    <div
      data-slot="margin-note"
      className={cn(
        "rounded-lg p-4 text-sm",
        config.className,
        className
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
        <span className="text-[0.7rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
          {config.label}
        </span>
      </div>
      <p className="leading-relaxed text-muted-foreground">{body}</p>
      {(contributorName || date) && (
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground/70">
          {contributorName && (
            <span className="font-medium text-foreground">
              {contributorName}
            </span>
          )}
          {contributorTitle && <span>{contributorTitle}</span>}
          {date && <span>&middot; {date}</span>}
        </div>
      )}
    </div>
  );
}
