"use client";

import { cn } from "@/lib/utils";

interface OrgsCaseStudyCardsProps {
  className?: string;
}

const caseStudies = [
  {
    org: "Exponential",
    title: "How Exponential equipped 5,000 leaders in 12 months",
    stat: "5,000+",
    statLabel: "leaders trained",
    description: "Exponential used Movemental's cohort tools and assessment builder to scale their annual conference content into year-round leadership development.",
  },
  {
    org: "Forge Mission Training",
    title: "Forge's shift from in-person to hybrid training",
    stat: "300%",
    statLabel: "engagement increase",
    description: "Forge transitioned their apprenticeship model to a hybrid format using Movemental courses, maintaining relational depth while reaching 3x more leaders.",
  },
  {
    org: "NewThing Network",
    title: "NewThing's multiplication dashboard",
    stat: "85",
    statLabel: "churches planted",
    description: "NewThing used Movemental analytics and coaching tools to track planter readiness, accelerating their pipeline from assessment to launch.",
  },
];

/**
 * Enterprise case study highlight cards — dark background,
 * 3 case study cards with org name, stat, and description.
 */
export function OrgsCaseStudyCards({ className }: OrgsCaseStudyCardsProps) {
  return (
    <section className={cn("relative w-full bg-mvmt-surface-dark py-20 px-6", className)}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-mvmt-accent mb-3">
            Case studies
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-mvmt-on-dark-primary font-mvmt-heading">
            Real results from real networks
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((cs) => (
            <div
              key={cs.org}
              className="rounded-xl p-6 border border-mvmt-border-on-dark bg-mvmt-surface-dark-elevated flex flex-col"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-mvmt-accent mb-4">{cs.org}</p>
              <h3 className="text-lg font-bold text-mvmt-on-dark-primary mb-4 font-mvmt-heading">{cs.title}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-mvmt-accent">{cs.stat}</span>
                <span className="ml-2 text-sm text-mvmt-on-dark-muted">{cs.statLabel}</span>
              </div>
              <p className="text-sm leading-relaxed text-mvmt-on-dark-secondary flex-1">{cs.description}</p>
              <button className="mt-6 text-sm font-medium text-mvmt-accent">
                Read full case study →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

OrgsCaseStudyCards.displayName = "OrgsCaseStudyCards";
