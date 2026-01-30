"use client";

import { cn } from "@/lib/utils";

interface ChatPanelSidebarProps {
  className?: string;
}

/**
 * Chat Panel Sidebar — ClickUp-style three-panel layout (ref-chat-03)
 * Dark left sidebar, center dashboard with greeting/recents/tasks, right AI chat panel
 */
export function ChatPanelSidebar({ className }: ChatPanelSidebarProps) {
  const sidebarNav = [
    { icon: "\u2302", label: "Home" },
    { icon: "\u2709", label: "Inbox" },
    { icon: "\u2630", label: "Docs" },
    { icon: "\u25A6", label: "Dashboards" },
    { icon: "\u25B6", label: "Clips" },
    { icon: "\u23F1", label: "Timesheets" },
    { icon: "\u22EF", label: "More" },
  ];

  const recentItems = [
    { title: "Cohort A - in Leadership V.2.0", tag: "Active" },
    { title: "Product V.2.0 - in Design Team", tag: "Review" },
    { title: "Missional Community Guide Draft", tag: "Draft" },
    { title: "Q4 Multiplication Metrics", tag: "Complete" },
  ];

  const tasks = [
    { title: "Finalize coaching curriculum for Cohort B", priority: "High" },
    { title: "Review Alan Hirsch foreword edits", priority: "Medium" },
    { title: "Schedule multiplication workshop recording", priority: "Medium" },
  ];

  const aiPrompts = [
    "Summarize my overdue tasks",
    "Draft a cohort welcome email",
    "What are my priorities this week?",
  ];

  return (
    <section className={cn("relative w-full min-h-screen flex bg-mvmt-surface-light", className)} >
      {/* Left sidebar (dark) */}
      <aside className="w-56 flex-shrink-0 flex flex-col px-3 py-4 bg-mvmt-surface-dark">
        <div className="flex items-center gap-2 px-2 mb-5">
          <div className="w-6 h-6 rounded bg-mvmt-accent"  />
          <span className="text-sm font-semibold text-mvmt-on-dark-primary">Sam&apos;s Workspace</span>
        </div>

        <nav className="space-y-0.5 mb-6">
          {sidebarNav.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm cursor-pointer text-mvmt-on-dark-secondary">
              <span className="text-xs w-4 text-center">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="mb-4">
          <span className="text-2xs font-semibold uppercase tracking-wider px-2" style={{ color: "var(--mvmt-on-dark-tertiary)" }}>Favorites</span>
          <div className="mt-1 px-2 py-1 text-xs text-mvmt-on-dark-secondary">Church Planting Playbook</div>
        </div>

        <div>
          <span className="text-2xs font-semibold uppercase tracking-wider px-2" style={{ color: "var(--mvmt-on-dark-tertiary)" }}>Spaces</span>
          <div className="mt-1 space-y-0.5 text-xs text-mvmt-on-dark-secondary">
            <div className="px-2 py-1">Everything</div>
            <div className="px-4 py-1">Team Space</div>
            <div className="px-6 py-1">Projects</div>
            <div className="px-8 py-1">Project Notes</div>
          </div>
        </div>
      </aside>

      {/* Center dashboard */}
      <main className="flex-1 px-8 py-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-mvmt-text-primary">Good afternoon, Brad</h1>

        {/* Recents card */}
        <div className="border rounded-xl p-5 mb-6" style={{ borderColor: "var(--mvmt-border-light)" }}>
          <h2 className="text-sm font-semibold mb-3 text-mvmt-text-primary">Recents</h2>
          <div className="space-y-2">
            {recentItems.map((item) => (
              <div key={item.title} className="flex items-center justify-between py-1.5 text-sm">
                <span className="text-mvmt-text-secondary">{item.title}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-mvmt-surface-light-muted" style={{ color: "var(--mvmt-text-tertiary)" }}>
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* My Work card */}
        <div className="border rounded-xl p-5" style={{ borderColor: "var(--mvmt-border-light)" }}>
          <h2 className="text-sm font-semibold mb-3 text-mvmt-text-primary">My Work</h2>
          <div className="flex gap-4 mb-4 text-xs font-medium" style={{ color: "var(--mvmt-text-tertiary)" }}>
            <span className="pb-1 text-mvmt-text-primary" style={{ borderBottom: "2px solid var(--mvmt-accent)" }}>To Do</span>
            <span className="pb-1 cursor-pointer">Done</span>
            <span className="pb-1 cursor-pointer">Delegated</span>
          </div>
          <div className="space-y-2">
            {tasks.map((task) => (
              <div key={task.title} className="flex items-center justify-between py-1.5 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded border" style={{ borderColor: "var(--mvmt-border-light)" }} />
                  <span className="text-mvmt-text-secondary">{task.title}</span>
                </div>
                <span className="text-xs" style={{ color: task.priority === "High" ? "var(--mvmt-status-urgent)" : "var(--mvmt-text-tertiary)" }}>{task.priority}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Right AI panel */}
      <aside className="w-80 flex-shrink-0 border-l flex flex-col" style={{ borderColor: "var(--mvmt-border-light)" }}>
        <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: "var(--mvmt-border-light)" }}>
          <span className="text-sm text-mvmt-accent">&#10024;</span>
          <span className="text-sm font-semibold text-mvmt-text-primary">Movemental AI</span>
        </div>

        <div className="flex-1 px-5 py-5 space-y-6 overflow-y-auto">
          <h3 className="text-base font-semibold text-mvmt-text-primary">Ask anything or write with AI</h3>

          <div className="rounded-lg p-3 bg-mvmt-surface-light-muted">
            <p className="text-xs font-medium mb-1 text-mvmt-text-primary">Enhance Movemental AI&apos;s knowledge with Docs</p>
            <p className="text-xs" style={{ color: "var(--mvmt-text-tertiary)" }}>Connect your coaching documents, curriculum guides, and community playbooks.</p>
          </div>

          <div>
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--mvmt-text-tertiary)" }}>Ask about your tasks</p>
            <div className="space-y-1.5">
              {aiPrompts.map((prompt) => (
                <div key={prompt} className="px-3 py-2 text-xs rounded-lg border cursor-pointer text-mvmt-text-secondary" style={{ borderColor: "var(--mvmt-border-light)" }}>
                  {prompt}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--mvmt-text-tertiary)" }}>Ideas for writing: Content</p>
            <div className="px-3 py-2 text-xs rounded-lg border text-mvmt-text-secondary" style={{ borderColor: "var(--mvmt-border-light)" }}>
              Draft a blog post on incarnational leadership for missional communities
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="px-4 py-3 border-t" style={{ borderColor: "var(--mvmt-border-light)" }}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border" style={{ borderColor: "var(--mvmt-border-light)" }}>
            <span className="text-sm flex-1" style={{ color: "var(--mvmt-text-tertiary)" }}>Ask Movemental AI...</span>
            <span className="text-xs text-mvmt-accent">&uarr;</span>
          </div>
        </div>
      </aside>
    </section>
  );
}

ChatPanelSidebar.displayName = "ChatPanelSidebar";
