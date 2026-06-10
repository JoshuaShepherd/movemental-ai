"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Building2, Church, Landmark, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import type { AudienceLens } from "@/lib/book-types";

type LensSelectorProps = {
  /** Currently active lens (from URL or cookie) */
  activeLens?: AudienceLens;
  /** Show inline email capture below the selector */
  showEmailCapture?: boolean;
  className?: string;
};

const lensOptions: {
  value: AudienceLens;
  label: string;
  icon: typeof Users;
}[] = [
  { value: "movement-leaders", label: "Movement Leaders", icon: Users },
  { value: "churches", label: "Church Leaders", icon: Church },
  { value: "nonprofits", label: "Nonprofit Leaders", icon: Building2 },
  { value: "institutions", label: "Institutions", icon: Landmark },
];

export function LensSelector({
  activeLens = "movement-leaders",
  showEmailCapture = false,
  className,
}: LensSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<AudienceLens>(activeLens);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSelect = useCallback(
    (lens: AudienceLens) => {
      setSelected(lens);
      const params = new URLSearchParams(searchParams.toString());
      if (lens === "movement-leaders") {
        params.delete("lens");
      } else {
        params.set("lens", lens);
      }
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitError(false);
    try {
      const res = await fetch("/api/book/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          lens: selected,
          source: "lens_selector",
        }),
      });
      if (!res.ok) throw new Error("bad");
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    }
  };

  return (
    <div data-slot="lens-selector" className={cn("space-y-4", className)}>
      <fieldset>
        <legend className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
          Choose your edition
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {lensOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = selected === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-section text-muted-foreground hover:bg-elevated hover:text-foreground"
                )}
                aria-pressed={isActive}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {opt.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {showEmailCapture && !submitted && (
        <form onSubmit={handleEmailSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email — get notified of updates"
            className="flex-1 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            required
          />
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Notify me
          </button>
        </form>
      )}

      {showEmailCapture && submitted && (
        <p className="text-sm text-muted-foreground">
          You&apos;re in. We&apos;ll notify you when your edition gets new material.
        </p>
      )}
      {showEmailCapture && submitError && (
        <p className="text-sm text-destructive">Could not save your email. Try again in a moment.</p>
      )}
    </div>
  );
}
