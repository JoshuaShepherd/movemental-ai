"use client";

import { cn } from "@/lib/utils";

interface ArticlesBlockquoteEditorialProps {
  className?: string;
}

/**
 * Blockquote Editorial — Dropbox Blog-style with large pull-quote (ref-blockquote-editorial)
 * Light background, body paragraphs, full-width accent quote, two-column continuation
 */
export function ArticlesBlockquoteEditorial({ className }: ArticlesBlockquoteEditorialProps) {
  return (
    <section className={cn("relative w-full bg-mvmt-surface-light", className)} >
      {/* Top bar */}
      <div className="border-b" style={{ borderColor: "var(--mvmt-border-light)" }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-wide text-mvmt-text-primary">Movemental Journal</span>
          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: "var(--mvmt-border-light)" }} />
        </div>
      </div>

      {/* Opening section */}
      <div className="max-w-2xl mx-auto px-6 py-12 space-y-6 text-base leading-relaxed text-mvmt-text-primary">
        <p>
          Creativity in movement organizations does not happen by accident. It requires
          the kind of team health that most leaders talk about but few cultivate with
          intention. When Alan Hirsch describes the apostolic genius that fueled the early
          church, he is pointing to something deeper than strategy — he is naming a
          culture where risk-taking, experimentation, and honest failure were not only
          tolerated but expected.
        </p>
        <p>
          For leaders building missional communities today, the question is not whether
          your team has creative people. Every team does. The question is whether your
          culture is healthy enough to let creativity breathe. Dave Ferguson often says
          that the best ideas in a room belong to the quietest person. But that person
          will only speak up if the room feels safe — if vulnerability has been modeled
          from the top down and disagreement is treated as a gift rather than a threat.
        </p>
        <p>
          At Exponential conferences, we see this principle at work in the best
          multiplication networks. The ones producing the most innovative church planting
          models are not the ones with the biggest budgets. They are the ones where
          leaders practice radical transparency about what is working and what is not.
        </p>
      </div>

      {/* Full-width pull-quote block */}
      <div className="w-full py-16 px-8 bg-mvmt-accent">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-2xl md:text-4xl leading-snug text-mvmt-cta-text"
            style={{ fontStyle: "italic" }}
          >
            &ldquo;When you put everything on the table, it creates a lot of space for
            creative problem-solving and blue sky thinking.&rdquo;
          </p>
        </div>
      </div>

      {/* Two-column continuation */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left column */}
          <div className="space-y-5 text-base leading-relaxed text-mvmt-text-primary">
            <p>
              In practice, this looks like building rhythms that protect space for
              imagination. Brad Brisco encourages the leaders he coaches to block one
              afternoon each week — no meetings, no emails, no urgent fires to put out.
              He calls it &ldquo;neighborhood time,&rdquo; but it functions as creative
              incubation. When you slow down enough to notice what God is doing in your
              context, ideas surface that no brainstorming session could manufacture.
            </p>
            <p>
              Some Forge hubs have adopted a Friday creative time where apprentices
              prototype new expressions of community — pop-up prayer stations, art
              installations in public parks, dinner churches in laundromats. The rule is
              simple: try something, debrief it honestly, and let the learning compound.
              Most of these experiments fail by conventional metrics. But the culture they
              create is priceless. Leaders learn that failure is not career-ending; it is
              formational.
            </p>
            <p>
              The daily discipline matters too. Journaling, walking prayer, even
              collaborative whiteboard sessions where no idea is dismissed — these small
              practices accumulate into a posture of openness that shapes everything a
              team produces.
            </p>
          </div>

          {/* Right column */}
          <div className="space-y-5 text-base leading-relaxed text-mvmt-text-primary">
            <h3 className="text-lg font-bold font-mvmt-heading">
              Welcome tough conversations
            </h3>
            <p>
              Healthy teams do not avoid conflict — they steward it. In multiplication
              networks, where leaders are constantly being released into new contexts,
              unresolved tension can silently fracture relationships that took years to
              build. The NewThing network has learned this the hard way. Their most
              resilient church planting teams are the ones that established conflict
              resolution rhythms early: weekly check-ins where leaders ask each other
              &ldquo;What is unsaid between us?&rdquo;
            </p>
            <p>
              This practice draws from the reconciliation theology that undergirds
              missional ecclesiology. When we treat disagreement as an opportunity for
              deeper understanding rather than a problem to be managed, teams develop the
              kind of trust that makes bold action possible. Alan Hirsch calls this
              &ldquo;communitas&rdquo; — the bond forged not in comfort but in shared
              ordeal.
            </p>
            <p>
              For leaders on the Movemental platform, we encourage embedding these
              rhythms into your coaching cohorts. The tools are there — reflection
              prompts, guided debriefs, structured feedback loops. But the tools only
              work if the culture is willing to use them honestly.
            </p>

            {/* Share link */}
            <div className="pt-4 text-right">
              <a
                href="#"
                className="text-sm font-semibold text-mvmt-accent"
              >
                Share &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

ArticlesBlockquoteEditorial.displayName = "ArticlesBlockquoteEditorial";
