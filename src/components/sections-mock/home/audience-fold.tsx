import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface AudienceCard {
  href: string;
  title: string;
  body: string;
  bullets: readonly string[];
  ctaLabel: string;
  icon: React.ReactNode;
}

const NonprofitIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    width="40"
    height="40"
    fill="none"
  >
    <circle cx="20" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="26" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="28" cy="26" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M20 16.5v5M17 21l-3 2.5M23 21l3 2.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ChurchIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    width="40"
    height="40"
    fill="none"
  >
    <path
      d="M20 7l9 10H11l9-10z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <rect
      x="13"
      y="17"
      width="14"
      height="16"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M20 22v6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const InstitutionIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    width="40"
    height="40"
    fill="none"
  >
    <rect
      x="9"
      y="11"
      width="5"
      height="18"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="17.5"
      y="8"
      width="5"
      height="21"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="26"
      y="11"
      width="5"
      height="18"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M7 33h26"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const AUDIENCE_CARDS: readonly AudienceCard[] = [
  {
    href: "/nonprofits",
    title: "Nonprofit Leaders",
    body: "Adopt AI across your team without risking trust, alignment, or mission drift.",
    bullets: [
      "Clarify safe use before staff habits harden",
      "Build capability without chasing every new tool",
      "Protect the mission while improving capacity",
    ],
    ctaLabel: "See the nonprofit path",
    icon: NonprofitIcon,
  },
  {
    href: "/churches",
    title: "Church Leaders",
    body: "Lead your staff and congregation through AI without compromising formation, theology, or trust.",
    bullets: [
      "Establish wise guardrails for ministry use",
      "Keep formation ahead of efficiency",
      "Help your team lead with clarity, not fear",
    ],
    ctaLabel: "Explore the church path",
    icon: ChurchIcon,
  },
  {
    href: "/institutions",
    title: "Institutional / Seminary Leaders",
    body: "Prepare leaders for an AI-shaped world with clarity, discernment, and theological depth.",
    bullets: [
      "Move beyond scattered policy conversations",
      "Equip faculty, students, and staff with shared language",
      "Form leaders who can use AI without being formed by it",
    ],
    ctaLabel: "View the institutional approach",
    icon: InstitutionIcon,
  },
];

export function AudienceFold() {
  return (
    <section
      className="band-default audience-section"
      aria-labelledby="audience-heading"
    >
      <div className="container audience-section__inner">
        <header className="audience-section__header">
          <p className="section-eyebrow">Who this is for</p>
          <h2 className="audience-section__title" id="audience-heading">
            For leaders responsible for people, mission, and outcomes.
          </h2>
          <p className="audience-section__intro">
            AI is not just a technology decision. It is a leadership
            responsibility. Movemental helps mission-driven organizations move
            from scattered experimentation to a clear, safe, and human-centered
            path.
          </p>
        </header>

        <div className="grid gap-x-12 gap-y-14 md:grid-cols-3">
          {AUDIENCE_CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col gap-5 rounded-md p-2 -m-2 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <span className="text-foreground" aria-hidden="true">
                {card.icon}
              </span>
              <h3 className="font-serif text-3xl italic leading-tight tracking-tight text-foreground">
                {card.title}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {card.body}
              </p>
              <ul className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
                {card.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <span className="mt-4 flex items-center justify-between gap-4">
                <span className="text-xs font-medium uppercase tracking-eyebrow text-foreground">
                  {card.ctaLabel}
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
