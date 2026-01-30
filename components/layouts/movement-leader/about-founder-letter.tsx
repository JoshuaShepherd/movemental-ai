"use client";

import { cn } from "@/lib/utils";

interface AboutFounderLetterProps {
  className?: string;
}

export function AboutFounderLetter({ className }: AboutFounderLetterProps) {
  return (
    <section className={cn("relative w-full", className)}>
      {/* Warm Header */}
      <div className="px-6 sm:px-12 lg:px-20 py-20 text-center bg-[var(--mvmt-surface-light)]">
        <p className="text-xs font-bold tracking-widest uppercase mb-4 text-[var(--mvmt-accent)]">
          A Letter From Our Founder
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-[var(--mvmt-text-primary)] font-mvmt-heading">
          Why I Built Movemental
        </h1>
      </div>

      {/* Letter Body */}
      <div className="px-6 sm:px-12 lg:px-20 py-16 bg-[var(--mvmt-surface-light-muted)]">
        <article className="max-w-2xl mx-auto space-y-6 text-base leading-relaxed text-[var(--mvmt-text-secondary)]">
          <p className="text-[var(--mvmt-text-primary)]">
            Dear friend,
          </p>
          <p>
            I&rsquo;ve spent the better part of two decades in the field — planting communities, training leaders, making mistakes, and slowly learning what actually works when it comes to starting movements that last.
          </p>
          <p>
            Along the way, I kept running into the same problem: the best insights were trapped in conference talks, scattered across academic journals, or locked inside the heads of practitioners too busy doing the work to write it down. There was no single place where a movement leader could go to find proven frameworks, connect with peers, and get the kind of support that actually moves the needle.
          </p>
          <p>
            That&rsquo;s why I built Movemental.
          </p>
          <p>
            This platform is the tool I wish I&rsquo;d had when I started. It&rsquo;s a place where research meets practice, where AI helps surface exactly what you need, and where a global community of practitioners has your back. Whether you&rsquo;re planting your first community or scaling a network across continents, Movemental is here to help you do the work with more clarity, more confidence, and more support.
          </p>
          <p>
            I&rsquo;m glad you&rsquo;re here. Let&rsquo;s build something that matters — together.
          </p>

          {/* Signature */}
          <div className="pt-8 border-t border-[var(--mvmt-border-light)]">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold text-[var(--mvmt-on-dark-primary)] bg-[var(--mvmt-surface-dark)]">
                BB
              </div>
              <div>
                <p className="text-lg font-bold text-[var(--mvmt-text-primary)] font-mvmt-heading">
                  Brad Brisco
                </p>
                <p className="text-sm text-[var(--mvmt-text-muted)]">
                  Founder &amp; Lead Catalyst, Movemental
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 sm:px-12 lg:px-20 py-10 flex flex-col sm:flex-row items-center justify-center gap-6 bg-[var(--mvmt-surface-dark)]">
        <p className="text-sm text-[var(--mvmt-on-dark-secondary)]">
          Explore the platform Brad built for leaders like you
        </p>
        <a
          href="/pricing"
          className="px-8 py-3 text-xs font-bold uppercase tracking-widest rounded-md transition-colors text-[var(--mvmt-cta-text)] bg-[var(--mvmt-accent)] hover:bg-[var(--mvmt-accent-hover)]"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}

AboutFounderLetter.displayName = "AboutFounderLetter";
