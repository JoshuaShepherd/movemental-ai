"use client";

import { cn } from "@/lib/utils";

interface ContentInstructorCoursesProps {
  className?: string;
}

/**
 * Instructor Courses — Kajabi-style course cards with level badges
 * Light bg, heading, grid of course cards with instructor, title, lessons, level badge
 */
export function ContentInstructorCourses({ className }: ContentInstructorCoursesProps) {
  const courses = [
    { instructor: "Alan Hirsch", title: "Teaches Missional Leadership", lessons: 12, duration: "4.5 hours", level: "Advanced", color: "#EEF2FF", badgeColor: "#DC2626" },
    { instructor: "Dave Ferguson", title: "The Hero Maker Framework", lessons: 8, duration: "3 hours", level: "Intermediate", color: "#F0FDF4", badgeColor: "#D97706" },
    { instructor: "Brad Brisco", title: "Incarnational Community Practices", lessons: 10, duration: "3.5 hours", level: "Beginner", color: "#FFF7ED", badgeColor: "#059669" },
    { instructor: "Kara Powell", title: "Leading the Next Generation", lessons: 9, duration: "2.5 hours", level: "Intermediate", color: "#FDF2F8", badgeColor: "#D97706" },
    { instructor: "Tod Bolsinger", title: "Navigating Uncharted Territory", lessons: 7, duration: "2 hours", level: "Advanced", color: "#F5F3FF", badgeColor: "#DC2626" },
    { instructor: "Rich Villodas", title: "Deeply Formed Leadership", lessons: 11, duration: "4 hours", level: "Beginner", color: "#ECFDF5", badgeColor: "#059669" },
  ];

  return (
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: "var(--mvmt-accent)" }}>
            Courses
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
            Learn from movement leaders
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--mvmt-text-secondary)" }}>
            In-depth courses taught by the practitioners shaping the future of missional movements.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.title} className="rounded-xl overflow-hidden cursor-pointer group" style={{ border: "1px solid var(--mvmt-border-light)", backgroundColor: "var(--mvmt-surface-light)" }}>
              <div className="h-44 w-full relative" style={{ backgroundColor: course.color }}>
                <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-bold rounded-full" style={{ backgroundColor: course.badgeColor, color: "#FFFFFF" }}>
                  {course.level}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "var(--mvmt-text-muted)" }}>{course.instructor}</p>
                <h3 className="text-lg font-bold mb-3 leading-snug" style={{ color: "var(--mvmt-text-primary)" }}>{course.title}</h3>
                <div className="flex items-center gap-3 text-xs" style={{ color: "var(--mvmt-text-secondary)" }}>
                  <span>{course.lessons} lessons</span>
                  <span>•</span>
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ContentInstructorCourses.displayName = "ContentInstructorCourses";
