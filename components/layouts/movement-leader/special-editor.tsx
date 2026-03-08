"use client";

import { cn } from "@/lib/utils";

interface SpecialEditorProps {
  className?: string;
}

const toolbarButtons = ["B", "I", "U", "🔗", "Style", "Buttons", "More"];

export function SpecialEditor({ className }: SpecialEditorProps) {
  return (
    <section
      className={cn(
        "relative w-full min-h-[80vh] flex flex-col bg-mvmt-surface-light",
        className
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-mvmt-border-light">
        <div className="flex items-center gap-2">
          <button className="text-mvmt-text-secondary px-2 py-1">←</button>
          {toolbarButtons.map((btn) => (
            <button
              key={btn}
              className="text-mvmt-text-secondary bg-mvmt-surface-light-muted rounded px-2 py-1 text-sm"
            >
              {btn}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="border border-mvmt-border-light rounded px-3 py-1 text-mvmt-text-primary text-sm">
            Preview
          </button>
          <button className="bg-mvmt-accent text-mvmt-cta-text rounded px-4 py-1.5 font-medium text-sm">
            Publish
          </button>
        </div>
      </div>

      {/* Breadcrumb chip */}
      <div className="px-6 py-3">
        <span className="bg-mvmt-surface-light-muted text-mvmt-text-secondary rounded-full px-3 py-1 text-xs">
          Edit email header and footer ×
        </span>
      </div>

      {/* Main layout */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6 px-6 pb-12">
        {/* Editor area */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-mvmt-text-primary">First of many</h1>
          <p className="text-mvmt-text-secondary text-lg">Welcome everyone</p>

          {/* Guest chips */}
          <div className="flex items-center gap-2 py-2">
            <span className="bg-mvmt-surface-light-muted rounded-full px-3 py-1 text-sm text-mvmt-text-primary">
              Jane Smith ×
            </span>
            <button className="text-mvmt-accent text-sm font-medium">+ Add Guest</button>
          </div>

          {/* Body content */}
          <div className="flex flex-col gap-4">
            <p className="text-mvmt-text-primary text-sm leading-relaxed">
              We believe that movements are the most powerful force for transformation in our world
              today. When leaders like Brad Brisco, Alan Hirsch, and Dave Ferguson come together
              across networks like Exponential, Forge, and NewThing, something extraordinary happens.
              The gospel moves forward through multiplication rather than addition.
            </p>
            <p className="text-mvmt-text-primary text-sm leading-relaxed">
              This is your space to write, reflect, and share with your community. Neil Cole reminds
              us that organic movements start small and grow through the power of the Spirit. Mike
              Breen and the 3DM team have shown us that discipleship is the engine of every
              movement. As leaders across V3, Missio, and Saturate continue to pioneer, we are
              seeing an unprecedented convergence of movement thinking.
            </p>
          </div>
        </div>

        {/* Right sidebar panel */}
        <div className="border border-mvmt-border-light rounded-lg p-4 h-fit">
          <h3 className="text-mvmt-text-primary text-sm font-semibold mb-1">Add voiceover</h3>
          <p className="text-mvmt-text-secondary text-xs mb-4">
            Record or upload audio to accompany your post.
          </p>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button className="text-sm text-mvmt-text-primary border-b-2 border-mvmt-accent pb-1">
              Record Audio
            </button>
            <button className="text-sm text-mvmt-text-secondary pb-1">Upload Audio</button>
          </div>

          {/* Record button */}
          <div className="flex flex-col items-center gap-3 mb-6">
            <button className="w-12 h-12 rounded-full bg-mvmt-accent" aria-label="Record" />
            <span className="text-mvmt-text-secondary text-sm">0:00</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="text-mvmt-text-secondary text-sm">Cancel</button>
            <button className="bg-mvmt-accent text-mvmt-cta-text rounded px-4 py-1.5 text-sm font-medium">
              Insert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

SpecialEditor.displayName = "SpecialEditor";
