"use client";

import { cn } from "@/lib/utils";

interface LeadMagnetChecklistProps {
  className?: string;
}

/**
 * Visual checklist lead magnet — checklist preview with
 * opt-in form alongside. Clean and actionable.
 */
export function LeadMagnetChecklist({ className }: LeadMagnetChecklistProps) {
  const items = [
    { text: "Define your multiplication metric", checked: true },
    { text: "Identify 3 potential sent-ones in your congregation", checked: true },
    { text: "Schedule monthly pipeline review meetings", checked: true },
    { text: "Allocate 10% of budget to external mission", checked: false },
    { text: "Create a 6-month sending timeline", checked: false },
    { text: "Build a prayer team for your sent-ones", checked: false },
    { text: "Establish a coaching relationship for each planter", checked: false },
    { text: "Set up quarterly sending celebrations", checked: false },
  ];

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light py-16 px-6", className)}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left: Checklist preview */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-mvmt-accent mb-3">Free checklist</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-mvmt-text-primary font-mvmt-heading mb-4">
            The Sending Church Readiness Checklist
          </h1>
          <p className="text-sm text-mvmt-text-secondary mb-8">
            8 essential steps to prepare your church for its first send. Download the complete checklist with detailed action items for each step.
          </p>

          <div className="rounded-xl p-6 bg-mvmt-surface-light-muted border border-mvmt-border-light">
            <p className="text-xs font-bold uppercase tracking-widest text-mvmt-text-muted mb-4">Preview</p>
            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={cn(
                    "w-5 h-5 rounded flex items-center justify-center text-xs flex-shrink-0",
                    item.checked ? "bg-mvmt-accent text-mvmt-cta-text" : "border border-mvmt-border-medium text-mvmt-text-muted"
                  )}>
                    {item.checked ? "✓" : ""}
                  </span>
                  <span className={cn("text-sm", item.checked ? "text-mvmt-text-primary" : "text-mvmt-text-muted")}>{item.text}</span>
                  {!item.checked && i === 3 && <span className="ml-auto text-xs text-mvmt-accent">+ 5 more</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Opt-in form */}
        <div className="rounded-xl p-8 bg-mvmt-surface-light border border-mvmt-border-light shadow-sm sticky top-20">
          <h2 className="text-xl font-bold text-mvmt-text-primary mb-2">Download the full checklist</h2>
          <p className="text-sm text-mvmt-text-muted mb-6">Get all 8 steps with detailed action items, timelines, and templates.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-mvmt-text-muted mb-1">Name</label>
              <input type="text" className="w-full px-3 py-2.5 rounded-md text-sm border border-mvmt-border-light text-mvmt-text-primary" />
            </div>
            <div>
              <label className="block text-xs font-medium text-mvmt-text-muted mb-1">Email</label>
              <input type="email" className="w-full px-3 py-2.5 rounded-md text-sm border border-mvmt-border-light text-mvmt-text-primary" />
            </div>
            <div>
              <label className="block text-xs font-medium text-mvmt-text-muted mb-1">Church name</label>
              <input type="text" className="w-full px-3 py-2.5 rounded-md text-sm border border-mvmt-border-light text-mvmt-text-primary" />
            </div>
            <button className="w-full py-3 rounded-md text-sm font-semibold bg-mvmt-accent text-mvmt-cta-text">
              Download checklist →
            </button>
            <p className="text-xs text-center text-mvmt-text-muted">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

LeadMagnetChecklist.displayName = "LeadMagnetChecklist";
