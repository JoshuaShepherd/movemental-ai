"use client"

import { cn } from "@/lib/utils"

interface SpecialCourseTranscriptProps {
  className?: string
}

export function SpecialCourseTranscript({ className }: SpecialCourseTranscriptProps) {
  const annotations = [
    { time: "01:38", link: "www.notion.so" },
    { time: "04:12", link: "www.exponential.org" },
    { time: "07:55", link: "www.forgemission.com" },
  ]

  const transcriptBlocks = [
    {
      time: "00:01",
      text: "Welcome to the First Website Course. Today we're going to explore how movement leaders like Alan Hirsch and Dave Ferguson have used digital platforms to scale their missional communities across networks like Forge and NewThing.",
    },
    {
      time: "01:38",
      text: "Brad Brisco often talks about the importance of decentralized leadership. When we look at how V3 and Missio operate, we see networks that empower local leaders rather than centralizing control. This is the foundation of organic multiplication.",
    },
    {
      time: "04:12",
      text: "Neil Cole pioneered the idea of simple, reproducible church structures. His work with Exponential helped thousands of leaders understand that multiplication isn't about programs — it's about people and the relational fabric that holds movements together.",
    },
    {
      time: "07:55",
      text: "Mike Breen brought the language of discipleship and mission together in a way that resonated across denominations. His framework gave movement leaders a shared vocabulary and set of practices that could travel across cultural boundaries.",
    },
  ]

  return (
    <div className={cn("bg-mvmt-surface-light", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_280px] gap-0 min-h-[80vh]">
        {/* Left sidebar */}
        <div className="bg-mvmt-surface-light-muted border-r border-mvmt-border-light p-6">
          <h3 className="text-mvmt-text-primary text-sm font-semibold mb-4">
            Annotations
          </h3>
          <ul className="space-y-3">
            {annotations.map((a, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-mvmt-text-muted text-xs font-mono">
                  {a.time}
                </span>
                <a href="#" className="text-mvmt-accent text-sm underline">
                  {a.link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Main content */}
        <div className="p-8">
          <h1 className="text-mvmt-text-primary text-2xl font-bold font-mvmt-heading">
            First Website Course
          </h1>
          <p className="text-mvmt-text-secondary text-sm mt-1">
            Catalog &gt; About
          </p>

          <h2 className="text-mvmt-text-primary text-lg font-semibold mt-8 mb-4">
            Transcript
          </h2>

          {transcriptBlocks.map((block, i) => (
            <div key={i} className="flex gap-4 mb-6">
              <span className="text-mvmt-text-muted text-xs font-mono w-12 shrink-0 pt-1">
                {block.time}
              </span>
              <p className="text-mvmt-text-primary text-sm leading-relaxed">
                {block.text}
              </p>
            </div>
          ))}
        </div>

        {/* Right sidebar */}
        <div className="p-6 border-l border-mvmt-border-light">
          <h3 className="text-mvmt-text-primary text-sm font-semibold">
            Details, features &amp; support
          </h3>
          <p className="text-mvmt-text-secondary text-xs mt-2">
            Remember, there&rsquo;s no such thing as a silly question&hellip;
          </p>
          <div className="flex flex-col gap-2 mt-4">
            <button className="bg-mvmt-accent text-mvmt-cta-text rounded px-4 py-1.5 text-sm">
              Email us
            </button>
            <button className="border border-mvmt-border-light text-mvmt-text-primary rounded px-4 py-1.5 text-sm">
              Discord
            </button>
          </div>
          <div className="mt-6 space-y-2">
            <a href="#" className="text-mvmt-text-secondary text-sm block">
              Cart
            </a>
            <a href="#" className="text-mvmt-text-secondary text-sm block">
              Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

SpecialCourseTranscript.displayName = "SpecialCourseTranscript"
