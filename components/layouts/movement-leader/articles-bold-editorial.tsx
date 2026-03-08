"use client";

import { cn } from "@/lib/utils";

interface ArticlesBoldEditorialProps {
  className?: string;
}

/**
 * Bold Editorial Article — Bleacher Report style (ref-08)
 * Dark background, full-bleed hero with neon ALL-CAPS text, editorial body
 */
export function ArticlesBoldEditorial({ className }: ArticlesBoldEditorialProps) {
  return (
    <section
      className={cn("relative w-full bg-mvmt-surface-dark", className)}
    >
      {/* Full-bleed hero */}
      <div className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--mvmt-surface-dark) 0%, transparent 30%, transparent 70%, var(--mvmt-surface-dark) 100%)",
          }}
        />
        {/* Background texture placeholder */}
        <div
          className="absolute inset-0 opacity-20 bg-mvmt-surface-dark-elevated"
        />

        {/* Neon headline */}
        <h1
          className="relative z-10 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-center uppercase text-mvmt-accent font-mvmt-heading"
          style={{ textShadow: "0 0 40px var(--mvmt-accent)" }}
        >
          WHO WE ARE
        </h1>
      </div>

      {/* Body content */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          {/* Subheading */}
          <h2
            className="text-sm sm:text-base font-bold uppercase tracking-widest mb-10 pb-3 text-mvmt-on-dark-primary"
            style={{ borderBottom: "2px solid var(--mvmt-on-dark-primary)",
              display: "inline-block" }}
          >
            IGNITE THE POWER OF MOVEMENT CULTURE TO MAKE MOMENTS THAT MATTER
          </h2>

          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-mvmt-on-dark-secondary">
            <p>
              Movement leadership is not a job title. It is a posture, a commitment to the belief
              that culture shifts when ordinary people are empowered to act with extraordinary
              purpose. From the missional communities pioneered by Alan Hirsch to the multiplication
              frameworks championed by Exponential, the lineage of movement thinking runs deep.
            </p>
            <p>
              We exist to amplify that lineage. Our mission is to resource, connect, and celebrate
              the leaders who are shaping the future of faith-driven cultural impact. Whether you
              are planting your first community or coaching your hundredth cohort, this platform
              was built for the bold.
            </p>
            <p>
              Creative expression is at the heart of every movement. The civil rights movement had
              its freedom songs. The early church had its letters. Today&apos;s multiplication
              leaders need tools that honor both the art and the architecture of transformation.
              Movemental is that tool.
            </p>
            <p>
              Brad Brisco writes that the missional impulse is not a program but a posture — an
              orientation toward the world that refuses to separate discipleship from cultural
              engagement. We believe the same is true of leadership development. It cannot be
              reduced to a curriculum. It must be lived, practiced, and multiplied in community.
            </p>
            <p>
              At Movemental, cultural impact is not a byproduct. It is the objective. Every
              feature, every pathway, every coaching conversation is designed to move leaders
              from consumption to creation, from attendance to agency, from isolated effort to
              networked multiplication.
            </p>
            <p className="font-semibold text-lg sm:text-xl text-mvmt-on-dark-primary">
              This is not content management. This is movement infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

ArticlesBoldEditorial.displayName = "ArticlesBoldEditorial";
