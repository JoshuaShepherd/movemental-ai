/**
 * Idempotently creates (or replaces) the Sandbox AI for Nonprofits course:
 * courses + course_weeks + course_lessons per docs/articles/COURSE_STRATEGY.md.
 *
 * Prerequisites: DATABASE_URL in .env.local
 * Optional: SANDBOX_AI_NONPROFITS_ORG_ID, SANDBOX_AI_NONPROFITS_AUTHOR_ID
 *            (defaults: first organization, first user_profile)
 *
 * Content: reads content-library/courses/sandbox-ai-nonprofits/week-*.md
 *         sections delimited by "## {section_type}" line headers.
 *
 * Usage: pnpm exec tsx scripts/scaffold-sandbox-ai-nonprofits-course.ts
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { config as loadEnv } from "dotenv";
import { eq } from "drizzle-orm";
import {
  SANDBOX_AI_NONPROFITS_SLUG,
  extractSectionNth,
  sectionsForWeek,
  weekFileName,
} from "./lib/sandbox-ai-nonprofits-course-spec";

loadEnv({ path: path.join(process.cwd(), ".env.local") });

async function main() {
  const { db } = await import("../src/lib/db/index");
  const { courses, courseWeeks, courseLessons, organizations, userProfiles } = await import(
    "../src/lib/db/schema",
  );

  const orgRow = await db.select({ id: organizations.id }).from(organizations).limit(1);
  const authorRow = await db.select({ id: userProfiles.id }).from(userProfiles).limit(1);

  const orgId = process.env.SANDBOX_AI_NONPROFITS_ORG_ID ?? orgRow[0]?.id;
  const authorId = process.env.SANDBOX_AI_NONPROFITS_AUTHOR_ID ?? authorRow[0]?.id;

  if (!orgId) {
    console.error("No organization found. Set SANDBOX_AI_NONPROFITS_ORG_ID or seed organizations.");
    process.exit(1);
  }
  if (!authorId) {
    console.error("No user_profiles found. Set SANDBOX_AI_NONPROFITS_AUTHOR_ID.");
    process.exit(1);
  }

  const slug = SANDBOX_AI_NONPROFITS_SLUG;
  const contentDir = path.join(process.cwd(), "content-library", "courses", slug);

  const existing = await db.select({ id: courses.id }).from(courses).where(eq(courses.slug, slug)).limit(1);

  if (existing[0]) {
    const courseId = existing[0].id;
    await db.delete(courseLessons).where(eq(courseLessons.course_id, courseId));
    await db.delete(courseWeeks).where(eq(courseWeeks.course_id, courseId));
    await db.delete(courses).where(eq(courses.id, courseId));
    console.log("Removed existing course row and children for slug:", slug);
  }

  const weekThemes = [
    "Introduction & Orientation — Charter, roles, boundaries",
    "Eight-pattern discovery",
    "Value under constraint and taxonomy",
    "Structured experiments I",
    "Scoring I — honest evidence",
    "Second experiment cycle",
    "Ethical and relational flag",
    "Synthesis & Sending — portfolio and stewardship",
  ];

  const [course] = await db
    .insert(courses)
    .values({
      title: "Sandbox AI for Nonprofits",
      slug,
      subtitle:
        "Train your team from safety and boundaries through pattern discovery, experiments, honest scoring, ethical flags, and a use-case portfolio.",
      description:
        "An eight-week formation course aligned to Movemental's Sandbox canon and the Sandbox Season Playbook—compressed from a twelve-week operational season while preserving the full argument arc.",
      author_id: authorId,
      organization_id: orgId,
      status: "draft",
      course_type: "formation",
      duration_weeks: 8,
      estimated_hours: 36,
      portal_themes: ["movemental"],
      learning_outcomes: [
        "Name a Safety Owner, data classes in/out of scope, and no-fly workflows before experiments begin.",
        "Run an eight-pattern scan and filter to a small set of bounded experiment briefs.",
        "Design and score structured sandbox experiments without theater.",
        "Write ethical and relational flags that reroute harmful use cases.",
        "Assemble a board-ready portfolio and a 30/60/90-day stewardship plan.",
      ],
      price_usd: "0",
    })
    .returning();

  const courseId = course!.id;

  const insertedWeeks = await db
    .insert(courseWeeks)
    .values(
      weekThemes.map((title, i) => ({
        course_id: courseId,
        week_number: i + 1,
        title,
        order_index: i + 1,
        organization_id: orgId,
        slug: `week-${String(i + 1).padStart(2, "0")}`,
        theme: title,
      })),
    )
    .returning({
      id: courseWeeks.id,
      week_number: courseWeeks.week_number,
    });

  const weekIdByNumber = new Map<number, string>();
  for (const w of insertedWeeks) {
    weekIdByNumber.set(w.week_number, w.id);
  }

  let globalOrder = 1;
  for (let w = 1; w <= 8; w++) {
    const weekId = weekIdByNumber.get(w);
    if (!weekId) throw new Error(`Missing week id for week ${w}`);
    const spec = sectionsForWeek(w);
    const mdPath = path.join(contentDir, weekFileName(w));
    const markdown = fs.existsSync(mdPath) ? fs.readFileSync(mdPath, "utf-8") : "";

    const typeOccurrence = new Map<string, number>();
    let lessonInWeek = 0;
    for (const row of spec) {
      lessonInWeek += 1;
      const occ = typeOccurrence.get(row.section_type) ?? 0;
      typeOccurrence.set(row.section_type, occ + 1);
      const body = extractSectionNth(markdown, row.section_type, occ);
      const lessonSlug = `${slug}-w${w}-${row.section_type}-${lessonInWeek}`;

      await db.insert(courseLessons).values({
        course_id: courseId,
        week_id: weekId,
        week_number: w,
        title: humanTitle(w, row.section_type),
        slug: lessonSlug,
        module_number: w,
        lesson_number: lessonInWeek,
        content_type: "section",
        section_type: row.section_type,
        section_order: globalOrder,
        nav_title: row.nav_title,
        content: body || null,
        organization_id: orgId,
        status: "draft",
      });
      globalOrder += 1;
    }
  }

  const lessonCount = globalOrder - 1;
  await db.update(courses).set({ lessons_count: lessonCount }).where(eq(courses.id, courseId));

  console.log("Scaffolded course", slug, "course_id=", courseId, "lessons=", lessonCount);
  process.exit(0);
}

function humanTitle(weekNum: number, sectionType: string): string {
  const labels: Record<string, string> = {
    video: "Video",
    reading: "Reading",
    chat_dissonance: "Dissonance / context",
    chat_action: "Action (AI companion)",
    chat_reflection: "Reflection (AI companion)",
    case_study: "Witness (case study)",
    discussion: "Cohort discussion",
    reflection: "Exit ticket",
    looking_ahead: "Looking ahead",
    integration: "Integration",
    field_experiment: "Field experiment — written plan",
    lordship_opening: "Sending liturgy — stewardship",
  };
  return `Week ${weekNum} — ${labels[sectionType] ?? sectionType}`;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
