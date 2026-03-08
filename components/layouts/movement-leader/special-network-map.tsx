"use client";

import { cn } from "@/lib/utils";

interface SpecialNetworkMapProps {
  className?: string;
}

const avatars = [
  { initials: "BB", top: "5%", left: "50%", ring: 1 },
  { initials: "AH", top: "20%", left: "85%", ring: 2 },
  { initials: "DF", top: "50%", left: "95%", ring: 3 },
  { initials: "NC", top: "80%", left: "80%", ring: 2 },
  { initials: "MB", top: "90%", left: "45%", ring: 3 },
  { initials: "JR", top: "75%", left: "10%", ring: 2 },
  { initials: "TS", top: "40%", left: "2%", ring: 3 },
  { initials: "KL", top: "10%", left: "20%", ring: 1 },
  { initials: "PW", top: "30%", left: "12%", ring: 2 },
  { initials: "RG", top: "60%", left: "90%", ring: 3 },
];

export function SpecialNetworkMap({ className }: SpecialNetworkMapProps) {
  return (
    <section
      className={cn(
        "relative w-full min-h-[80vh] flex flex-col items-center justify-center py-20 px-6 bg-mvmt-surface-light",
        className
      )}
    >
      {/* Concentric circles container */}
      <div className="relative h-96 w-96 flex items-center justify-center">
        {/* Ring 3 - outermost */}
        <div className="absolute inset-1/2 w-[28rem] h-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-mvmt-border-light" />

        {/* Ring 2 */}
        <div className="absolute inset-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-mvmt-border-light" />

        {/* Ring 1 */}
        <div className="absolute inset-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-mvmt-border-light" />

        {/* Center badge */}
        <div className="relative z-10 w-20 h-20 rounded-full bg-mvmt-accent flex items-center justify-center">
          <span className="text-mvmt-cta-text text-2xl font-bold">M</span>
        </div>

        {/* Avatar bubbles */}
        {avatars.map((a) => (
          <div
            key={a.initials}
            className="absolute w-10 h-10 rounded-full bg-mvmt-surface-light-muted border border-mvmt-border-light flex items-center justify-center"
            style={{ top: a.top, left: a.left, transform: "translate(-50%, -50%)" }}
          >
            <span className="text-mvmt-text-secondary text-xs font-medium">
              {a.initials}
            </span>
          </div>
        ))}
      </div>

      {/* Text below */}
      <div className="mt-16 text-center max-w-lg">
        <h2 className="text-3xl font-bold font-mvmt-heading text-mvmt-text-primary mb-3">
          Our Network
        </h2>
        <p className="text-mvmt-text-secondary text-sm leading-relaxed">
          Connecting movement leaders like Brad Brisco, Alan Hirsch, Dave Ferguson, Neil Cole,
          and Mike Breen across networks including Exponential, Forge, NewThing, V3, Missio,
          Saturate, and 3DM to catalyze movements everywhere.
        </p>
      </div>
    </section>
  );
}

SpecialNetworkMap.displayName = "SpecialNetworkMap";
