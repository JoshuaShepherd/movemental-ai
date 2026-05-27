"use client";

import { cn } from "@/lib/utils";

interface SpecialCheckInboxProps {
  className?: string;
}

export function SpecialCheckInbox({ className }: SpecialCheckInboxProps) {
  return (
    <section
      className={cn(
        "min-h-[80vh] flex items-center justify-center bg-mvmt-surface-light px-6",
        className
      )}
    >
      <div className="flex flex-col items-center text-center max-w-sm">
        {/* Mail icon */}
        <div className="w-12 h-12 rounded-lg bg-mvmt-accent flex items-center justify-center mb-6">
          <span className="text-mvmt-cta-text text-xl">✉</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold font-mvmt-heading text-mvmt-text-primary mb-3">
          Check Your Inbox
        </h1>

        {/* Description */}
        <p className="text-mvmt-text-secondary text-sm mb-6">
          We sent you an activation link. Please be sure to check your spam folder too.
        </p>

        {/* Resend link */}
        <button className="text-mvmt-accent text-sm font-medium">
          Resend Email
        </button>
      </div>
    </section>
  );
}

SpecialCheckInbox.displayName = "SpecialCheckInbox";
