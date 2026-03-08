"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface ReaderDocsSidebarProps {
  className?: string;
}

export function ReaderDocsSidebar({ className }: ReaderDocsSidebarProps) {
  const chapters = [
    { num: "01", title: "How to structure a winning movement", done: true, active: false, subs: [] },
    {
      num: "02",
      title: "How to design a movement that shines",
      done: false,
      active: true,
      subs: [
        "Templates vs. styles: What's the difference?",
        "5 essential principles for designing better movements",
        "Elevate your movement's design with some simple rules",
      ],
    },
  ];

  return (
    <section className={cn("relative w-full flex flex-col bg-mvmt-surface-light", className)} >
      {/* Nav */}
      <div className="flex items-center justify-between px-6 sm:px-12 py-3 border-b border-b-mvmt-border-light">
        <span className="text-sm font-bold text-mvmt-text-primary">Movemental</span>
        <div className="hidden sm:flex items-center gap-6">
          {["Product", "Templates", "Resources", "Pricing"].map((item) => (
            <span key={item} className="text-sm text-mvmt-text-secondary">{item}</span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm px-4 py-1.5 rounded-md text-mvmt-text-primary border border-mvmt-border-medium"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-sm px-4 py-1.5 rounded-md font-medium text-mvmt-cta-text bg-mvmt-accent"
          >
            Sign up
          </Link>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 grid md:grid-cols-[320px_1fr] gap-0">
        {/* Left Sidebar */}
        <div className="px-6 py-10 border-r border-r-mvmt-border-light">
          <h2
            className="text-2xl font-bold mb-4 leading-tight text-mvmt-text-primary font-mvmt-heading"
          >
            Movement<br />best practices
          </h2>
          {/* Progress */}
          <div className="w-full h-1 rounded-full mb-1 bg-mvmt-border-light" >
            <div className="h-full w-1/4 rounded-full bg-mvmt-accent"  />
          </div>
          <p className="text-xs mb-8 text-mvmt-accent">25% of guide read</p>

          {/* Chapters */}
          <div className="space-y-4">
            {chapters.map((ch) => (
              <div
                key={ch.num}
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: ch.active ? "var(--mvmt-surface-light-muted)" : "transparent",
                  border: ch.active ? "1px solid var(--mvmt-border-light)" : "none",
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-sm font-medium text-mvmt-text-muted">{ch.num}.</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-mvmt-text-primary">{ch.title}</p>
                    {ch.subs.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {ch.subs.map((sub) => (
                          <li key={sub} className="text-xs leading-relaxed text-mvmt-text-secondary">
                            • {sub}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                    style={{
                      backgroundColor: ch.done ? "var(--mvmt-accent)" : "transparent",
                      color: ch.done ? "var(--mvmt-cta-text)" : "var(--mvmt-text-muted)",
                      border: ch.done ? "none" : "1.5px solid var(--mvmt-border-medium)",
                    }}
                  >
                    {ch.done ? "✓" : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="relative px-8 sm:px-12 py-10 max-w-3xl">
          <h1
            className="text-4xl sm:text-5xl font-black leading-tight mb-8 text-mvmt-text-primary font-mvmt-heading"
          >
            How to design a movement that shines
          </h1>
          <p className="text-base leading-relaxed mb-6 text-mvmt-text-primary">
            <strong>Have you ever spent hours perfecting the content of your movement strategy, only to realize that your materials look a little... uninspiring?</strong> It&rsquo;s easy to fall into the trap of delaying the design aspect until the last minute, but aesthetics are a huge part of effective movements. In fact, great design can be the key to amplifying your message and leaving a mark on your audience.
          </p>
          <p className="text-sm leading-relaxed mb-8 text-mvmt-text-secondary">
            In this guide chapter, we&rsquo;ll explore the essential principles of movement design. You&rsquo;ll learn how to select the right templates, maintain a consistent style, apply color theory, and choose the perfect fonts. With these design strategies in hand, you&rsquo;ll be equipped to create materials that have a lasting impact.
          </p>

          <h2
            className="text-xl sm:text-2xl font-bold mb-4 text-mvmt-text-primary font-mvmt-heading"
          >
            Templates vs. styles: What&rsquo;s the difference?
          </h2>
          <p className="text-sm leading-relaxed mb-4 text-mvmt-text-secondary">
            Visual consistency is paramount when it comes to creating a compelling movement. It helps your audience follow along and understand the content of your materials without getting distracted by jarring design elements.
          </p>
          <p className="text-sm leading-relaxed text-mvmt-text-secondary">
            You can maintain this consistency in two ways: templates and styles. Let&rsquo;s look at their main differences, and when to use each one.
          </p>

          {/* Social Share Buttons */}
          <div className="absolute right-0 top-10 hidden lg:flex flex-col gap-3">
            {["f", "t", "in"].map((icon) => (
              <div
                key={icon}
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-mvmt-cta-text bg-mvmt-accent"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

ReaderDocsSidebar.displayName = "ReaderDocsSidebar";
