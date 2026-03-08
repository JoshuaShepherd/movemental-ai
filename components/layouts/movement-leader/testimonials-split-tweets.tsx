"use client";

import { cn } from "@/lib/utils";

interface TestimonialsSplitTweetsProps {
  className?: string;
}

const tweets = [
  {
    initials: "BB",
    name: "Brad Brisco",
    handle: "@bradbrisco",
    text: "This platform has completely transformed how we equip and send missional leaders. The tools are intuitive and the community is thriving.",
  },
  {
    initials: "DF",
    name: "Dave Ferguson",
    handle: "@daveferguson",
    text: "NewThing has seen incredible growth since adopting these resources. Every church planter in our network benefits from this work.",
  },
  {
    initials: "NC",
    name: "Neil Cole",
    handle: "@neilcole",
    text: "Simple, organic, and multiplying — exactly how movement tools should be. This reflects the DNA of grassroots church planting.",
  },
];

/**
 * Testimonials Split Tweets — Left heading + right tweet-style cards
 */
export function TestimonialsSplitTweets({ className }: TestimonialsSplitTweetsProps) {
  return (
    <section className={cn("relative w-full bg-mvmt-surface-light py-16 md:py-24", className)}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — Heading */}
          <div className="md:sticky md:top-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mvmt-heading text-mvmt-text-primary leading-tight">
              What Movement Leaders Say
            </h2>
            <p className="mt-4 text-lg text-mvmt-text-secondary max-w-md">
              Hear from pastors, planters, and network leaders who are building
              movements that matter.
            </p>
          </div>

          {/* Right — Tweet Cards */}
          <div className="flex flex-col gap-5">
            {tweets.map((tweet) => (
              <div
                key={tweet.handle}
                className="rounded-xl border border-mvmt-border bg-mvmt-surface-light p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-mvmt-accent flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-mvmt-on-dark-primary">
                      {tweet.initials}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-mvmt-text-primary">{tweet.name}</p>
                    <p className="text-xs text-mvmt-text-tertiary">{tweet.handle}</p>
                  </div>
                </div>
                <p className="text-mvmt-text-secondary leading-relaxed">{tweet.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

TestimonialsSplitTweets.displayName = "TestimonialsSplitTweets";
