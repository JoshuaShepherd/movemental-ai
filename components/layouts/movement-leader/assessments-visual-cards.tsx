"use client";

import { cn } from "@/lib/utils";

interface AssessmentsVisualCardsProps {
  className?: string;
}

export function AssessmentsVisualCards({ className }: AssessmentsVisualCardsProps) {
  const cards = [
    {
      label: "The Shepherd",
      icon: (
        <svg viewBox="0 0 48 48" className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M24 8C18 8 14 12 14 18C14 24 18 28 24 28C30 28 34 24 34 18C34 12 30 8 24 8Z" />
          <path d="M16 26L12 40H36L32 26" />
          <path d="M20 18L22 22L26 18" />
        </svg>
      ),
    },
    {
      label: "The Catalyst",
      icon: (
        <svg viewBox="0 0 48 48" className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M24 6C24 6 18 14 18 24C18 30 20 36 24 42C28 36 30 30 30 24C30 14 24 6 24 6Z" />
          <path d="M20 22C20 22 22 18 24 22C26 18 28 22 28 22" />
        </svg>
      ),
    },
    {
      label: "The Strategist",
      icon: (
        <svg viewBox="0 0 48 48" className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="24" cy="24" r="16" />
          <path d="M24 8V24L34 34" />
          <path d="M24 14L24 24" strokeWidth="2" />
          <circle cx="24" cy="24" r="2" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center bg-mvmt-surface-light-muted", className)}
    >
      <h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 max-w-xl px-6 text-mvmt-text-primary font-mvmt-heading"
      >
        What type of leader<br />are you?
      </h1>

      <div className="flex gap-6 px-6">
        {cards.map((card) => (
          <button
            key={card.label}
            className="flex flex-col items-center w-44 sm:w-52 rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] shadow-mvmt-sm border border-mvmt-border-light"
          >
            <div
              className="w-full py-8 flex items-center justify-center text-mvmt-text-primary bg-[var(--assess-card-muted)]"
            >
              {card.icon}
            </div>
            <div className="w-full py-4 text-center bg-mvmt-surface-light">
              <span className="text-sm font-medium text-mvmt-text-primary">{card.label}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

AssessmentsVisualCards.displayName = "AssessmentsVisualCards";
