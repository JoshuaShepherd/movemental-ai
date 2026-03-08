"use client";

import { cn } from "@/lib/utils";

interface PricingPartnerStepsProps {
  className?: string;
}

const steps = [
  {
    icon: "🤝",
    title: "Partner up",
    description:
      "Fill out a short form to join the partner program. After verification, you\u2019ll receive a unique link and a promo code.",
  },
  {
    icon: "🔗",
    title: "Share link",
    description:
      "Promote Movemental online to get the word out. Add your unique link to a website, social media bio, or share it in blog posts, tweets, tutorials, and videos. Add the promo code to get your audience to subscribe to Movemental.",
  },
  {
    icon: "💰",
    title: "Get paid",
    description:
      "You earn 50% of all subscription payments for 12 months. Every leader, team, or network plan you bring in counts, and there is no limit on your referrals. Partners get login details so they can keep track and manage payouts.",
  },
];

/**
 * Framer-style dark partner/affiliate page with bold headline,
 * 3-step icon cards, and join CTA.
 * Based on pricing-partner-steps-04.png reference.
 */
export function PricingPartnerSteps({ className }: PricingPartnerStepsProps) {
  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-dark py-16 px-6", className)}>
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-mvmt-on-dark-primary font-mvmt-heading leading-tight mb-6">
          Partner with Movemental and earn 50% of every subscription you bring in for 12 months.
        </h1>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
        {steps.map((step) => (
          <div
            key={step.title}
            className="rounded-xl p-6 border border-mvmt-border-on-dark bg-mvmt-surface-dark-elevated"
          >
            <div className="w-12 h-12 rounded-xl bg-mvmt-accent/20 flex items-center justify-center text-2xl mb-5">
              {step.icon}
            </div>
            <h3 className="text-lg font-bold text-mvmt-on-dark-primary mb-3">{step.title}</h3>
            <p className="text-sm leading-relaxed text-mvmt-on-dark-secondary">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="px-8 py-3 rounded-lg text-sm font-semibold bg-mvmt-accent text-mvmt-cta-text">
          Join today
        </button>
      </div>
    </section>
  );
}

PricingPartnerSteps.displayName = "PricingPartnerSteps";
