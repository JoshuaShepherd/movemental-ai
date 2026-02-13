"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FormationCompanionChat } from "./formation-companion-chat";

interface CoursesChapterBuilderProps {
  className?: string;
}

/** Course flow item: either a lesson or an agent block (e.g. Formation Companion) */
export type CourseFlowItem =
  | { type: "lesson"; id: string; title: string; date: string; status: "published" | "draft" | "scheduled" }
  | { type: "agent"; id: string; agentKind: "formation-companion"; title: string };

export interface CourseWeek {
  id: string;
  title: string;
  items: CourseFlowItem[];
}

const initialWeeks: CourseWeek[] = [
  {
    id: "w1",
    title: "Introduction",
    items: [
      { type: "lesson", id: "l1", title: "Course Overview", date: "Jan 5", status: "published" },
      { type: "lesson", id: "l2", title: "What You'll Learn", date: "Jan 5", status: "published" },
    ],
  },
  {
    id: "w2",
    title: "Sending Church Foundations",
    items: [
      { type: "lesson", id: "l3", title: "The Multiplication Mindset", date: "Jan 8", status: "published" },
      { type: "agent", id: "a1", agentKind: "formation-companion", title: "Formation Companion" },
      { type: "lesson", id: "l4", title: "Building a Sending Pipeline", date: "Jan 8", status: "draft" },
    ],
  },
  {
    id: "w3",
    title: "Leader Development",
    items: [
      { type: "lesson", id: "l5", title: "Identifying Potential Leaders", date: "Jan 12", status: "scheduled" },
    ],
  },
];

function isAgentItem(item: CourseFlowItem): item is Extract<CourseFlowItem, { type: "agent" }> {
  return item.type === "agent";
}

export function CoursesChapterBuilder({ className }: CoursesChapterBuilderProps) {
  const [weeks, setWeeks] = useState<CourseWeek[]>(initialWeeks);
  const [expandedWeek, setExpandedWeek] = useState<string>(initialWeeks[0].id);
  const [selectedItem, setSelectedItem] = useState<{ weekId: string; item: CourseFlowItem }>(() => ({
    weekId: initialWeeks[0].id,
    item: initialWeeks[0].items[0],
  }));

  const addLesson = (weekId: string) => {
    const week = weeks.find((w) => w.id === weekId);
    if (!week) return;
    const newLesson: CourseFlowItem = {
      type: "lesson",
      id: `l-${Date.now()}`,
      title: "New Lesson",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      status: "draft",
    };
    setWeeks((prev) =>
      prev.map((w) => (w.id === weekId ? { ...w, items: [...w.items, newLesson] } : w))
    );
    setSelectedItem({ weekId, item: newLesson });
  };

  const addAgent = (weekId: string) => {
    const week = weeks.find((w) => w.id === weekId);
    if (!week) return;
    const newAgent: CourseFlowItem = {
      type: "agent",
      id: `a-${Date.now()}`,
      agentKind: "formation-companion",
      title: "Formation Companion",
    };
    setWeeks((prev) =>
      prev.map((w) => (w.id === weekId ? { ...w, items: [...w.items, newAgent] } : w))
    );
    setSelectedItem({ weekId, item: newAgent });
  };

  const selectedWeek = weeks.find((w) => w.id === selectedItem.weekId);
  const selectedIsAgent = isAgentItem(selectedItem.item);

  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light flex", className)}>
      {/* Left panel — course content / week flow */}
      <aside className="w-72 border-r border-r-mvmt-border-light bg-mvmt-surface-light flex flex-col hidden lg:flex">
        <div className="p-4 border-b border-b-mvmt-border-light flex items-center justify-between">
          <h2 className="text-base font-bold text-mvmt-text-primary">Course Content</h2>
          <button className="w-6 h-6 rounded-full bg-mvmt-surface-light-muted flex items-center justify-center text-mvmt-text-muted text-lg">
            +
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {weeks.map((week) => (
            <div key={week.id}>
              <button
                onClick={() => setExpandedWeek(expandedWeek === week.id ? "" : week.id)}
                className="w-full text-left px-4 py-3 flex items-center justify-between border-b border-b-mvmt-border-light"
              >
                <div>
                  <p className="text-sm font-bold text-mvmt-text-primary">{week.title}</p>
                  <p className="text-xs text-mvmt-text-muted">
                    {week.items.length} item{week.items.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <span
                  className={cn(
                    "text-mvmt-text-muted text-sm transition-transform",
                    expandedWeek === week.id && "rotate-180"
                  )}
                >
                  ▾
                </span>
              </button>
              {expandedWeek === week.id &&
                week.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem({ weekId: week.id, item })}
                    className={cn(
                      "w-full text-left px-4 py-3 flex items-center gap-3 border-b border-b-mvmt-border-light transition-colors",
                      selectedItem.weekId === week.id &&
                        selectedItem.item.id === item.id &&
                        "bg-mvmt-surface-light-muted"
                    )}
                  >
                    {item.type === "lesson" ? (
                      <>
                        <div className="w-10 h-7 rounded bg-mvmt-surface-light-muted flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-mvmt-text-primary">{item.title}</p>
                          <div className="flex items-center gap-2">
                            {item.status !== "published" && (
                              <span
                                className={cn(
                                  "text-xs font-bold uppercase px-1.5 py-0.5 rounded",
                                  item.status === "draft"
                                    ? "bg-mvmt-surface-light-muted text-mvmt-text-muted"
                                    : "bg-mvmt-accent/10 text-mvmt-accent"
                                )}
                              >
                                {item.status}
                              </span>
                            )}
                            <span className="text-xs text-mvmt-text-muted">{item.date}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="w-10 h-7 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold text-mvmt-cta-text"
                          style={{ background: "var(--mvmt-accent)" }}
                        >
                          FC
                        </div>
                        <div>
                          <p className="text-sm font-medium text-mvmt-text-primary">{item.title}</p>
                          <span className="text-xs text-mvmt-text-muted">Chat in unit</span>
                        </div>
                      </>
                    )}
                  </button>
                ))}
              {expandedWeek === week.id && (
                <div className="flex flex-wrap gap-1 px-4 py-2 border-b border-b-mvmt-border-light">
                  <button
                    onClick={() => addLesson(week.id)}
                    className="text-sm font-medium text-mvmt-accent flex items-center gap-2"
                  >
                    <span>+</span> Add Lesson
                  </button>
                  <span className="text-mvmt-text-tertiary">·</span>
                  <button
                    onClick={() => addAgent(week.id)}
                    className="text-sm font-medium text-mvmt-accent flex items-center gap-2"
                  >
                    <span>+</span> Add agent
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-t-mvmt-border-light px-4 py-3 flex items-center gap-4">
          <button className="text-xs font-bold uppercase text-mvmt-text-primary">Select All</button>
          <button className="text-xs font-bold uppercase text-mvmt-text-muted">Set Status</button>
          <button className="text-xs font-bold uppercase text-mvmt-accent">Delete</button>
        </div>
      </aside>

      {/* Right panel — lesson preview or Formation Companion chat */}
      <div className="flex-1 flex flex-col items-center justify-center bg-mvmt-surface-light-muted p-6">
        {selectedIsAgent ? (
          <div className="w-full max-w-2xl">
            <h2 className="text-xl font-bold text-mvmt-text-primary mb-2">
              {selectedItem.item.title}
            </h2>
            <p className="text-sm text-mvmt-text-muted mb-4">
              Reflect and apply what you've learned in this section. The conversation is part of this
              course unit.
            </p>
            <FormationCompanionChat
              courseContext={{
                courseId: "sending-church-sample",
                moduleId: selectedWeek?.id,
                lessonIndex: selectedWeek?.items.findIndex((i) => i.id === selectedItem.item.id),
              }}
            />
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-mvmt-text-primary mb-2">
              {selectedItem.item.title}
            </h2>
            <p className="text-sm text-mvmt-text-muted">Lesson preview</p>
            <button className="mt-6 px-6 py-3 rounded-lg bg-mvmt-cta-bg text-mvmt-cta-text font-medium text-sm">
              Complete &amp; Continue
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

CoursesChapterBuilder.displayName = "CoursesChapterBuilder";
