"use client";

import Link from "next/link";

import { Container } from "@/components/primitives/container";
import { cn } from "@/lib/utils";

export type NewChapterId =
  | "fragmentation"
  | "integration"
  | "activation"
  | "formation"
  | "multiplication"
  | "movement";

const ITEMS: { id: NewChapterId; label: string; href: string }[] = [
  { id: "fragmentation", label: "Fragmentation", href: "#stage-fragmentation" },
  { id: "integration", label: "Integration", href: "#stage-integration" },
  { id: "activation", label: "Activation", href: "#stage-activation" },
  { id: "formation", label: "Formation", href: "#stage-formation" },
  { id: "multiplication", label: "Multiplication", href: "#stage-multiplication" },
  { id: "movement", label: "Movement", href: "#stage-movement" },
];

export function FragmentationStoryNewWayfinding({
  active,
}: {
  active: NewChapterId;
}) {
  return (
    <nav
      aria-label="Fragmentation story progress"
      className="border-b border-border bg-background/92 backdrop-blur-sm"
    >
      <Container className="flex min-w-0 items-center gap-4 overflow-x-auto py-2">
        <span
          aria-hidden
          className="shrink-0 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground"
        >
          Six stages
        </span>
        <ol className="flex min-w-0 items-center gap-1 text-xs">
          {ITEMS.map((item, i) => {
            const isActive = item.id === active;
            return (
              <li key={item.id} className="flex items-center gap-1 whitespace-nowrap">
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-full px-2.5 py-1 font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {i + 1}. {item.label}
                </Link>
                {i < ITEMS.length - 1 ? (
                  <span aria-hidden className="text-muted-foreground/55">
                    ·
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}
