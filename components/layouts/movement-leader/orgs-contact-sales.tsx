"use client";

import { cn } from "@/lib/utils";

interface OrgsContactSalesProps {
  className?: string;
}

/**
 * Enterprise contact/demo request page — dark background,
 * split layout with benefits left and form right.
 */
export function OrgsContactSales({ className }: OrgsContactSalesProps) {
  const benefits = [
    { icon: "🎯", title: "Custom onboarding", description: "Dedicated specialist to migrate your existing content and train your team." },
    { icon: "🔒", title: "Enterprise security", description: "SSO, SAML, SOC2 compliance, and custom data retention policies." },
    { icon: "📊", title: "Advanced analytics", description: "Network-wide dashboards, leader progress tracking, and custom reports." },
    { icon: "🤝", title: "Dedicated support", description: "Named account manager with guaranteed response times and quarterly reviews." },
  ];

  return (
    <section className={cn("relative w-full bg-mvmt-surface-dark py-20 px-6", className)}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Left: benefits */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-mvmt-accent mb-3">
            For networks &amp; organizations
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-mvmt-on-dark-primary font-mvmt-heading mb-4">
            Let&rsquo;s build your multiplication engine
          </h2>
          <p className="text-base text-mvmt-on-dark-secondary mb-10">
            Get a custom plan tailored to your network&rsquo;s size, goals, and training pipeline.
          </p>

          <div className="space-y-6">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-mvmt-accent/20 flex items-center justify-center text-xl flex-shrink-0">
                  {b.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-mvmt-on-dark-primary">{b.title}</p>
                  <p className="text-sm text-mvmt-on-dark-secondary">{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: contact form */}
        <div className="rounded-xl p-8 bg-mvmt-surface-dark-elevated border border-mvmt-border-on-dark">
          <h3 className="text-lg font-bold text-mvmt-on-dark-primary mb-6">Request a demo</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-mvmt-on-dark-muted mb-1">Full name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2.5 rounded-lg text-sm bg-mvmt-surface-dark border border-mvmt-border-on-dark text-mvmt-on-dark-primary placeholder:text-mvmt-on-dark-muted"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-mvmt-on-dark-muted mb-1">Work email</label>
              <input
                type="email"
                placeholder="you@organization.org"
                className="w-full px-4 py-2.5 rounded-lg text-sm bg-mvmt-surface-dark border border-mvmt-border-on-dark text-mvmt-on-dark-primary placeholder:text-mvmt-on-dark-muted"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-mvmt-on-dark-muted mb-1">Organization</label>
              <input
                type="text"
                placeholder="Your network or organization"
                className="w-full px-4 py-2.5 rounded-lg text-sm bg-mvmt-surface-dark border border-mvmt-border-on-dark text-mvmt-on-dark-primary placeholder:text-mvmt-on-dark-muted"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-mvmt-on-dark-muted mb-1">Team size</label>
              <select className="w-full px-4 py-2.5 rounded-lg text-sm bg-mvmt-surface-dark border border-mvmt-border-on-dark text-mvmt-on-dark-primary">
                <option>1–10 leaders</option>
                <option>11–50 leaders</option>
                <option>51–200 leaders</option>
                <option>200+ leaders</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-mvmt-on-dark-muted mb-1">How can we help?</label>
              <textarea
                rows={3}
                placeholder="Tell us about your goals..."
                className="w-full px-4 py-2.5 rounded-lg text-sm bg-mvmt-surface-dark border border-mvmt-border-on-dark text-mvmt-on-dark-primary placeholder:text-mvmt-on-dark-muted resize-none"
              />
            </div>
            <button className="w-full py-3 rounded-lg text-sm font-semibold bg-mvmt-accent text-mvmt-cta-text">
              Request demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

OrgsContactSales.displayName = "OrgsContactSales";
