"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface AssessmentsDarkIntroProps {
  className?: string;
}

export function AssessmentsDarkIntro({ className }: AssessmentsDarkIntroProps) {
  return (
    <section
      className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col bg-mvmt-surface-dark", className)}
    >
      {/* Nav Bar */}
      <div className="flex items-center justify-between px-6 sm:px-8 lg:px-12 py-5">
        <span className="text-sm font-bold tracking-wide text-mvmt-on-dark-primary">
          Movemental
        </span>
        <span className="text-sm font-semibold tracking-wider uppercase text-mvmt-on-dark-primary font-mvmt-heading">
          Movement Leadership Index
        </span>
        <button className="flex flex-col gap-1">
          <span className="block w-5 h-0.5 bg-mvmt-on-dark-primary" />
          <span className="block w-5 h-0.5 bg-mvmt-on-dark-primary" />
          <span className="block w-5 h-0.5 bg-mvmt-on-dark-primary" />
        </button>
      </div>

      {/* Centered Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight max-w-3xl mb-8 text-mvmt-on-dark-primary font-mvmt-heading"
        >
          Which Movement Leadership Style is best for you?
        </h1>
        <p
          className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed text-mvmt-on-dark-secondary"
        >
          Take a stroll through ten highly strategic, multiple-choice questions to find out which leadership approach fits your calling.
        </p>
        <Link
          href="/fit-check"
          className="inline-block px-8 py-4 text-sm font-medium transition-colors text-mvmt-on-dark-primary rounded-mvmt-md border border-mvmt-border-on-dark-medium"
        >
          Begin Your Leadership Assessment
        </Link>
      </div>
    </section>
  );
}

AssessmentsDarkIntro.displayName = "AssessmentsDarkIntro";
