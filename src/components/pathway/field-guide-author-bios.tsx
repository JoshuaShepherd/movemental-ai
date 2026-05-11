import { cn } from "@/lib/utils";

export type FieldGuideAuthor = {
  name: string;
  role: string;
};

const DEFAULT_AUTHORS: ReadonlyArray<FieldGuideAuthor> = [
  {
    name: "Brad Brisco",
    role:
      "Co-author of Missional Essentials; Send Network leader. Three decades equipping churches for missional practice.",
  },
  {
    name: "Alan Hirsch",
    role:
      "Author of The Forgotten Ways. Founder of 5Q, Forge, and 100Movements. One of the most influential voices on missional church renewal worldwide.",
  },
  {
    name: "Joshua Shepherd",
    role:
      "Founder and CTO of Movemental. Former pastor; builder of the platform. Leads the field guide series and the engagements that draw on it.",
  },
];

export function FieldGuideAuthorBios({
  authors = DEFAULT_AUTHORS,
  className,
  heading = "Authors",
}: {
  authors?: ReadonlyArray<FieldGuideAuthor>;
  className?: string;
  heading?: string;
}) {
  return (
    <div className={cn("border-t border-border/40 pt-10", className)}>
      <p className="mb-6 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
        {heading}
      </p>
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
        {authors.map((a) => (
          <li key={a.name}>
            <h4 className="font-serif-display text-xl italic text-foreground">{a.name}</h4>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
