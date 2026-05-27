"use client";

import { cn } from "@/lib/utils";

interface ContentDarkRecordingsProps {
  className?: string;
}

/**
 * Dark Recordings — MasterClass live recordings 3-col cards
 * Dark bg, heading, 6 recording cards with image, title, speaker, date, watch badge
 */
export function ContentDarkRecordings({ className }: ContentDarkRecordingsProps) {
  const recordings = [
    { title: "The Future of Missional Movements", speaker: "Alan Hirsch", date: "March 22, 2024", duration: "1h 12m", color: "#1E293B" },
    { title: "Coaching Conversations That Catalyze Change", speaker: "Dave Ferguson", date: "March 8, 2024", duration: "58m", color: "#1E1B2E" },
    { title: "Neighborhood as Parish: A Live Workshop", speaker: "Brad Brisco", date: "February 15, 2024", duration: "1h 30m", color: "#1B2E1E" },
    { title: "Leading Through Liminal Seasons", speaker: "Tod Bolsinger", date: "January 28, 2024", duration: "47m", color: "#2E1B1B" },
    { title: "Planting in Post-Christian Contexts", speaker: "Tim Keller", date: "January 12, 2024", duration: "1h 05m", color: "#1B2A2E" },
    { title: "Discipleship Pathways for Gen Z", speaker: "Kara Powell", date: "December 18, 2023", duration: "52m", color: "#2E2B1B" },
  ];

  return (
    <section className={cn("relative w-full bg-mvmt-surface-dark", className)} >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest mb-2 text-mvmt-accent">
              Live Recordings
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-mvmt-on-dark-primary font-mvmt-heading">
              Watch past sessions
            </h1>
          </div>
          <button className="hidden sm:block px-4 py-2 text-sm font-medium rounded-lg text-mvmt-on-dark-secondary border border-mvmt-border-on-dark">
            View All
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recordings.map((rec) => (
            <div key={rec.title} className="rounded-xl overflow-hidden cursor-pointer group bg-mvmt-surface-dark-elevated">
              <div className="h-44 w-full relative" style={{ backgroundColor: rec.color }}>
                <span className="absolute bottom-3 right-3 px-3 py-1 text-xs font-bold rounded-full text-mvmt-cta-text bg-mvmt-accent">
                  {rec.duration}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold mb-2 leading-snug text-mvmt-on-dark-primary">{rec.title}</h3>
                <p className="text-sm mb-1 text-mvmt-on-dark-secondary">{rec.speaker}</p>
                <p className="text-xs text-mvmt-on-dark-muted">{rec.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ContentDarkRecordings.displayName = "ContentDarkRecordings";
