"use client";

import { cn } from "@/lib/utils";

interface ChatHeroOverlayProps {
  className?: string;
}

/**
 * Chat Hero Overlay — Intercom-style hero with floating chat widget (ref-chat-05)
 * Full-bleed gradient hero, announcement bar, nav, large headline, floating chat card on right
 */
export function ChatHeroOverlay({ className }: ChatHeroOverlayProps) {
  const navLinks = ["Product", "Resources", "Pricing"];

  return (
    <section className={cn("relative w-full min-h-screen flex flex-col bg-mvmt-gradient-hero-brand", className)} >
      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-mvmt-gradient-overlay-hero"  />

      {/* Announcement bar */}
      <div className="relative z-10 text-center py-2 text-xs text-mvmt-on-dark-secondary bg-mvmt-surface-dark">
        Increase leader effectiveness by 31% with AI Coaching.{" "}
        <span className="underline cursor-pointer text-mvmt-on-dark-primary">Learn more</span>
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-8">
          <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center border-mvmt-on-dark-primary" >
            <span className="text-xs font-bold text-mvmt-on-dark-primary">M</span>
          </div>
          {navLinks.map((link) => (
            <span key={link} className="text-sm cursor-pointer text-mvmt-on-dark-secondary">
              {link}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm cursor-pointer text-mvmt-on-dark-secondary">Contact sales</span>
          <span className="text-sm cursor-pointer text-mvmt-on-dark-secondary">Sign in</span>
          <span className="text-sm cursor-pointer text-mvmt-on-dark-primary">View demo</span>
          <button className="px-4 py-2 text-sm font-medium rounded-lg text-mvmt-cta-text bg-mvmt-cta-bg">
            Start free trial
          </button>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex items-center px-8 py-16">
        {/* Left side — text */}
        <div className="flex-1 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-mvmt-on-dark-primary">
            The new age of discipleship is AI-first
          </h1>
          <p className="text-lg mb-8 max-w-lg leading-relaxed text-mvmt-on-dark-secondary">
            Movemental combines missional intelligence with AI coaching to help movement leaders multiply disciples,
            launch communities, and scale Kingdom impact — all from one platform built for the church planting ecosystem.
          </p>
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 text-sm font-medium rounded-lg border text-mvmt-on-dark-primary border-mvmt-on-dark-primary" >
              View demo
            </button>
            <button className="px-6 py-3 text-sm font-medium rounded-lg text-mvmt-cta-text bg-mvmt-cta-bg">
              Start free trial
            </button>
          </div>
        </div>

        {/* Right side — floating chat widget */}
        <div className="w-80 flex-shrink-0 ml-8 rounded-xl overflow-hidden bg-mvmt-surface-light shadow-mvmt-lg">
          {/* Chat header */}
          <div className="px-4 py-3 flex items-center gap-3 border-b border-mvmt-border-light" >
            <span className="text-sm cursor-pointer text-mvmt-text-tertiary" >&larr;</span>
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full border-2 bg-mvmt-accent-muted border-mvmt-surface-light"  />
              <div className="w-6 h-6 rounded-full border-2 bg-mvmt-accent border-mvmt-surface-light"  />
              <div className="w-6 h-6 rounded-full border-2 bg-mvmt-surface-light-muted border-mvmt-surface-light"  />
            </div>
            <div>
              <p className="text-xs font-semibold text-mvmt-text-primary">Movemental</p>
              <p className="text-2xs text-mvmt-text-tertiary" >Within a day</p>
            </div>
          </div>

          {/* Messages */}
          <div className="px-4 py-4 space-y-3">
            {/* Bot message */}
            <div className="flex justify-start">
              <div className="max-w-[85%] px-3 py-2 rounded-xl rounded-bl-sm text-xs leading-relaxed text-mvmt-text-primary bg-mvmt-surface-light-muted">
                Hey there! Thanks for your interest in Movemental. We help movement leaders like Brad Brisco and Alan Hirsch equip communities for multiplication. How can we help?
              </div>
            </div>

            {/* User reply */}
            <div className="flex justify-end">
              <div className="max-w-[85%] px-3 py-2 rounded-xl rounded-br-sm text-xs leading-relaxed text-mvmt-cta-text bg-mvmt-accent">
                I&apos;m interested in trying Movemental
              </div>
            </div>

            {/* Bot follow-up */}
            <div className="flex justify-start">
              <div className="max-w-[85%] px-3 py-2 rounded-xl rounded-bl-sm text-xs leading-relaxed text-mvmt-text-primary bg-mvmt-surface-light-muted">
                Awesome! You can start a free trial right away, or chat with one of our coaches to find the right plan for your missional community.
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="px-4 pb-4 space-y-2">
            <button className="w-full py-2.5 text-xs font-medium rounded-lg text-mvmt-cta-text bg-mvmt-accent">
              Start a free trial
            </button>
            <button className="w-full py-2.5 text-xs font-medium rounded-lg border text-mvmt-text-primary border-mvmt-border-light" >
              Chat with a coach
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

ChatHeroOverlay.displayName = "ChatHeroOverlay";
