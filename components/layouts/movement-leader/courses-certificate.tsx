"use client";

import { cn } from "@/lib/utils";

interface CoursesCertificateProps {
  className?: string;
}

export function CoursesCertificate({ className }: CoursesCertificateProps) {
  return (
    <section className={cn("relative w-full min-h-screen bg-mvmt-surface-light py-12 px-6", className)}>
      <div className="max-w-5xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-mvmt-accent">Course Certificate</p>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-lg border border-mvmt-border-light text-sm font-medium text-mvmt-text-primary">Go to Home</button>
            <button className="px-4 py-2 rounded-lg bg-mvmt-cta-bg text-mvmt-cta-text text-sm font-medium">Share on LinkedIn</button>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-mvmt-text-primary mb-8">Sending Church Leadership Mastery</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Certificate */}
          <div className="flex-1 border-2 border-mvmt-border-light rounded-xl p-10 text-center bg-mvmt-surface-light">
            <p className="text-xs uppercase tracking-widest text-mvmt-text-muted mb-6">Course Certificate</p>
            <h2 className="text-2xl font-bold text-mvmt-text-primary font-mvmt-heading mb-8">
              Sending Church Leadership Mastery
            </h2>
            <div className="w-20 h-20 rounded-full border-2 border-mvmt-border-light mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
            <p className="text-xs uppercase tracking-wider text-mvmt-text-muted mb-2">Issued To</p>
            <p className="text-lg font-bold text-mvmt-text-primary mb-8">Pastor Sarah Johnson</p>
            <div className="flex items-center justify-center gap-8 text-xs text-mvmt-text-muted">
              <span>Powered by Movemental</span>
              <span>Issued May 7, 2026</span>
            </div>
            <div className="mt-8 flex items-center justify-center gap-3">
              <button className="px-4 py-2 rounded-lg bg-mvmt-cta-bg text-mvmt-cta-text text-xs font-medium">Share on LinkedIn</button>
              <button className="px-4 py-2 rounded-lg border border-mvmt-border-light text-xs font-medium text-mvmt-text-primary">Download Certificate</button>
              <button className="px-4 py-2 rounded-lg border border-mvmt-border-light text-xs font-medium text-mvmt-text-primary">Add to LinkedIn</button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-72 flex-shrink-0 space-y-6">
            {/* Rating */}
            <div className="rounded-xl border border-mvmt-border-light p-5">
              <h3 className="text-sm font-bold text-mvmt-text-primary mb-2">Rate this course</h3>
              <p className="text-xs text-mvmt-text-muted mb-3">Your feedback helps us improve.</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} className="w-8 h-8 rounded border border-mvmt-border-light text-xs text-mvmt-text-muted">{n}</button>
                ))}
              </div>
            </div>

            {/* Issued to */}
            <div className="rounded-xl border border-mvmt-border-light p-5">
              <h3 className="text-sm font-bold text-mvmt-text-primary mb-3">Issued to</h3>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-mvmt-accent/20 flex items-center justify-center text-xs font-bold text-mvmt-accent">SJ</div>
                <div>
                  <p className="text-sm font-medium text-mvmt-text-primary">Pastor Sarah Johnson</p>
                  <p className="text-xs text-mvmt-accent">Completed certification</p>
                </div>
              </div>
              <p className="text-xs text-mvmt-text-muted mt-3">This certificate does not expire.</p>
            </div>

            {/* Course completed */}
            <div className="rounded-xl border border-mvmt-border-light p-5">
              <h3 className="text-sm font-bold text-mvmt-text-primary mb-3">Course completed</h3>
              <p className="text-sm font-medium text-mvmt-text-primary">Sending Church Leadership Mastery</p>
              <p className="text-xs text-mvmt-text-muted">Beginner · 2 hours</p>
              <p className="text-xs text-mvmt-text-muted mt-3">Issued on May 7, 2026</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

CoursesCertificate.displayName = "CoursesCertificate";
