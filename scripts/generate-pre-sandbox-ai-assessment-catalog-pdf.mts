/**
 * Compiles every Movemental **code-backed** organizational AI assessment item
 * used before / alongside Sandbox — with full answer scales — into one PDF.
 *
 * Source of truth (this repo, not Supabase `assessment_questions`):
 * - Safety Self-Assessment: `src/components/sections-mock/start-with-safety/safety-self-assessment.tsx`
 * - Path Integrity Diagnostic (22 Q): `src/lib/integrity-diagnostic/questions.ts` → POST `/api/assess`
 * - SSSS Path Integrity (18 Likert items): `src/lib/ssss-integrity-assessment/` → GET `/api/assess/ssss-integrity`
 *
 *   pnpm docs:pre-sandbox-ai-assessment-catalog-pdf
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import PDFDocument from "pdfkit";

import {
  DIMENSIONS,
  INTEGRITY_DIAGNOSTIC_VERSION,
  QUESTIONS_BY_DIMENSION,
  type DimensionId,
} from "../src/lib/integrity-diagnostic/questions";
import {
  AUDIENCE_CONTEXT_OPTIONS,
  LIKERT_LABELS,
  SSSS_INTEGRITY_ITEMS,
  SSSS_INTEGRITY_VERSION,
} from "../src/lib/ssss-integrity-assessment/index";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const outDir = path.join(repoRoot, "docs/build/artifacts");
const outPath = path.join(outDir, "pre-sandbox-ai-assessment-questions-full-catalog.pdf");

type PdfDoc = InstanceType<typeof PDFDocument>;

const PRIMARY = "#0053db";
const INK = "#1a1f24";
const MUTED = "#4a5560";

/** Must match `QUESTIONS` in safety-self-assessment.tsx (client UI). */
const SAFETY_SELF_ASSESSMENT = {
  route: "/start-with-safety",
  options: ["Yes", "Mostly", "Partially", "Not yet"] as const,
  questions: [
    {
      id: "tool-inventory",
      text: "Do you know which AI tools your staff are already using?",
    },
    {
      id: "written-guidance",
      text: "Do you have written guidance for acceptable and unacceptable use?",
    },
    {
      id: "data-boundaries",
      text: "Have you defined what information should never enter AI tools?",
    },
    {
      id: "human-review",
      text: "Do leaders agree on when human review is required?",
    },
    {
      id: "sensitive-handling",
      text: "Do staff know how to handle confidential, pastoral, donor, student, or client information?",
    },
    {
      id: "use-case-review",
      text: "Do you have a process for reviewing new AI use cases?",
    },
    {
      id: "articulation",
      text: "Can your team explain why your AI boundaries exist?",
    },
  ] as const,
};

const PRE_SANDBOX_DIMENSIONS: DimensionId[] = [
  "sequence-integrity",
  "posture-clarity",
  "refusal-capacity",
];

let doc: PdfDoc;

function textW() {
  return doc.page.width - doc.page.margins.left - doc.page.margins.right;
}

function leftM() {
  return doc.page.margins.left;
}

function stripMdBold(s: string) {
  return s.replaceAll("**", "");
}

function ensureSpace(needed: number) {
  const bottom = doc.page.height - doc.page.margins.bottom;
  if (doc.y + needed > bottom) doc.addPage();
}

function h1(title: string) {
  ensureSpace(56);
  doc.fontSize(16).fillColor(PRIMARY).font("Helvetica-Bold").text(title, leftM(), doc.y, {
    width: textW(),
  });
  doc.moveDown(0.35);
  doc
    .moveTo(leftM(), doc.y)
    .lineTo(leftM() + textW(), doc.y)
    .strokeColor("#e0e4e8")
    .lineWidth(0.55)
    .stroke();
  doc.moveDown(0.55);
}

function h2(title: string) {
  ensureSpace(40);
  doc.fontSize(11).fillColor(INK).font("Helvetica-Bold").text(title, { width: textW() });
  doc.moveDown(0.35);
}

function bodyPara(s: string, oblique = false) {
  ensureSpace(36);
  doc
    .fontSize(9)
    .fillColor(INK)
    .font(oblique ? "Helvetica-Oblique" : "Helvetica")
    .text(s, { width: textW(), lineGap: 2.2, align: "left" });
  doc.moveDown(0.45);
}

function bulletList(lines: string[]) {
  for (const line of lines) {
    ensureSpace(22);
    doc.fontSize(9).fillColor(INK).font("Helvetica");
    doc.text(`• ${line}`, { width: textW(), indent: 10, lineGap: 2 });
  }
  doc.moveDown(0.4);
}

function numberedOptions(opts: readonly string[]) {
  doc.font("Helvetica").fontSize(8.8).fillColor(INK);
  opts.forEach((o, i) => {
    ensureSpace(20);
    doc.text(`${i + 1}. ${o}`, leftM() + 8, doc.y, { width: textW() - 8, lineGap: 1.5 });
  });
  doc.moveDown(0.35);
}

function footerOnAllPages(total: number) {
  const range = doc.bufferedPageRange();
  for (let i = 0; i < range.count; i++) {
    doc.switchToPage(i);
    const m = 48;
    doc
      .fontSize(7.5)
      .fillColor(MUTED)
      .font("Helvetica")
      .text(
        `Movemental — Pre-Sandbox AI assessment catalog · page ${i + 1} of ${total}`,
        m,
        doc.page.height - 32,
        { align: "center", width: doc.page.width - 2 * m },
      );
  }
}

function cover() {
  doc.fontSize(20).fillColor(INK).font("Helvetica-Bold").text("Pre-Sandbox AI Assessment", {
    align: "center",
  });
  doc.moveDown(0.25);
  doc
    .fontSize(13)
    .fillColor(MUTED)
    .font("Helvetica")
    .text("Full question & answer catalog (code-backed sources)", { align: "center" });
  doc.moveDown(1.2);
  doc.fontSize(9).fillColor(INK).font("Helvetica");
  doc.text(`Generated: ${new Date().toISOString().slice(0, 10)}`, { align: "center" });
  doc.moveDown(1);
  bodyPara(
    "This document consolidates every organizational assessment item in this repository that informs Safety and pre-Sandbox readiness, including Likert scales and multiple-choice option text exactly as implemented in application code. Submissions for the Path Integrity Diagnostic are stored in Postgres (integrity_diagnostic_submissions), but the question bank itself is defined only in TypeScript — not in the generic assessment_questions table.",
    true,
  );
}

function sectionWhereDataLives() {
  doc.addPage();
  h1("Where the lists live");
  h2("In this repository (canonical)");
  bulletList([
    `Safety Self-Assessment (7) — ${SAFETY_SELF_ASSESSMENT.route} — src/components/sections-mock/start-with-safety/safety-self-assessment.tsx`,
    `Path Integrity Diagnostic (${String(Object.values(QUESTIONS_BY_DIMENSION).flat().length)} questions) — /assess — src/lib/integrity-diagnostic/questions.ts (version ${INTEGRITY_DIAGNOSTIC_VERSION})`,
    `SSSS Path Integrity diagnostic (${String(SSSS_INTEGRITY_ITEMS.length)} items) — /api/assess/ssss-integrity — src/lib/ssss-integrity-assessment/items.ts + options.ts (version ${SSSS_INTEGRITY_VERSION})`,
  ]);
  h2("Supabase (Movemental project)");
  bodyPara(
    "The assessment_questions table holds hundreds of rows for other instrument types (mDNA, APEST, organizational maturity, etc.) keyed by assessments.slug — not the public web Integrity Diagnostic or Safety Self-Assessment banks above. Query assessments.assessment_type for mdna | apest | organizational | personality | current_reality_map.",
    true,
  );
}

function sectionSafetySelf() {
  doc.addPage();
  h1("Part A — Safety Self-Assessment");
  bodyPara(
    `Public route: ${SAFETY_SELF_ASSESSMENT.route}. Four ordered choices per question (stored client-side only; nothing is POSTed).`,
  );
  h2("Answer scale (all seven questions)");
  numberedOptions(SAFETY_SELF_ASSESSMENT.options);
  SAFETY_SELF_ASSESSMENT.questions.forEach((q, idx) => {
    doc.addPage();
    h2(`Question ${String(idx + 1).padStart(2, "0")} · ${q.id}`);
    doc.fontSize(10).fillColor(INK).font("Helvetica-Bold").text(q.text, { width: textW() });
    doc.moveDown(0.45);
    h2("Choices");
    numberedOptions(SAFETY_SELF_ASSESSMENT.options);
  });
}

function sectionIntegrityDiagnostic() {
  doc.addPage();
  h1("Part B — Path Integrity Diagnostic (full bank)");
  bodyPara(
    `Version ${INTEGRITY_DIAGNOSTIC_VERSION}. Submitted answers: array of ${String(Object.values(QUESTIONS_BY_DIMENSION).flat().length)} integers (0–3) in question order via POST /api/assess.`,
  );

  h2('Subset: "pre–Sandbox truth" dimensions only (01–03)');
  bodyPara(
    "Dimensions 01–03 (Path integrity, Posture clarity, Refusal capacity) contain twelve questions that do not ask about sandbox environments. Dimension 04 (Sandbox truth) and later dimensions still concern pre-production discipline but explicitly reference sandboxes.",
    true,
  );

  for (const dimId of PRE_SANDBOX_DIMENSIONS) {
    const dim = DIMENSIONS.find((d) => d.id === dimId)!;
    doc.addPage();
    h2(`Dimension ${dim.num} — ${dim.title} (${dim.id})`);
    doc.fontSize(8.8).fillColor(MUTED).font("Helvetica-Oblique").text(dim.description, {
      width: textW(),
      lineGap: 2,
    });
    doc.moveDown(0.5);
    const qs = QUESTIONS_BY_DIMENSION[dimId];
    qs.forEach((q, i) => {
      h2(`${q.id.toUpperCase()} (${i + 1}/${qs.length} in this dimension)`);
      doc.fontSize(9.8).fillColor(INK).font("Helvetica-Bold").text(q.prompt, { width: textW() });
      doc.moveDown(0.35);
      h2("Answer options (indices 0–3 for API)");
      numberedOptions(q.options);
      doc.moveDown(0.25);
    });
  }

  doc.addPage();
  h1("Part B (continued) — remaining dimensions");
  const rest = DIMENSIONS.filter((d) => !PRE_SANDBOX_DIMENSIONS.includes(d.id));
  for (const dim of rest) {
    doc.addPage();
    h2(`Dimension ${dim.num} — ${dim.title} (${dim.id})`);
    doc.fontSize(8.8).fillColor(MUTED).font("Helvetica-Oblique").text(dim.description, {
      width: textW(),
      lineGap: 2,
    });
    doc.moveDown(0.5);
    const qs = QUESTIONS_BY_DIMENSION[dim.id];
    qs.forEach((q, i) => {
      h2(`${q.id.toUpperCase()} (${i + 1}/${qs.length} in this dimension)`);
      doc.fontSize(9.8).fillColor(INK).font("Helvetica-Bold").text(q.prompt, { width: textW() });
      doc.moveDown(0.35);
      h2("Answer options (indices 0–3 for API)");
      numberedOptions(q.options);
      doc.moveDown(0.25);
    });
  }
}

function sectionSsss() {
  doc.addPage();
  h1("Part C — SSSS Path Integrity diagnostic (Likert)");
  bodyPara(
    `Version ${SSSS_INTEGRITY_VERSION}. Each item uses the same five-point truth scale (scores map to positions 0–4). Optional metadata: audience context and email — see POST /api/assess/ssss-integrity.`,
  );
  h2("Likert labels (positions 0–4)");
  numberedOptions(LIKERT_LABELS);

  doc.addPage();
  h2("Audience context options (metadata, not scored)");
  AUDIENCE_CONTEXT_OPTIONS.forEach((o) => {
    ensureSpace(18);
    doc.fontSize(9).fillColor(INK).font("Helvetica").text(`• ${o.id} — ${o.label}`, { width: textW() });
  });
  doc.moveDown(0.6);

  h2("Item bank (all stages)");
  bodyPara(
    'Items with stage "Safety" are the strict pre-Sandbox stage gate in the four-stage Movemental Path framing. Later stages include Sandbox, Skills, Solutions, and Cross.',
    true,
  );

  SSSS_INTEGRITY_ITEMS.forEach((item, idx) => {
    doc.addPage();
    h2(`Item ${String(idx + 1).padStart(2, "0")} — ${item.id} · ${item.stage}`);
    doc
      .fontSize(8.5)
      .fillColor(MUTED)
      .font("Helvetica")
      .text(`category: ${item.category} · weight: ${String(item.weight)}`, { width: textW() });
    doc.moveDown(0.4);
    doc.fontSize(10).fillColor(INK).font("Helvetica-Bold").text(stripMdBold(item.prompt), {
      width: textW(),
      lineGap: 2,
    });
    doc.moveDown(0.45);
    h2("Likert scale (same labels for every item)");
    numberedOptions(LIKERT_LABELS);
  });
}

function main() {
  fs.mkdirSync(outDir, { recursive: true });

  doc = new PDFDocument({
    size: "A4",
    margin: 48,
    bufferPages: true,
    info: {
      Title: "Movemental — Pre-Sandbox AI assessment — full catalog",
      Author: "movemental-ai repo (generated)",
      Subject: "Safety, Path Integrity, SSSS assessment items",
      Keywords: "AI assessment, Safety, Sandbox, integrity diagnostic, SSSS",
      CreationDate: new Date(),
    },
  });

  const stream = fs.createWriteStream(outPath);
  doc.pipe(stream);

  cover();
  sectionWhereDataLives();
  sectionSafetySelf();
  sectionIntegrityDiagnostic();
  sectionSsss();

  const range = doc.bufferedPageRange();
  footerOnAllPages(range.count);
  doc.end();

  stream.on("finish", () => {
    console.log(`Wrote ${outPath} (${range.count} pages)`);
  });
  stream.on("error", (e) => {
    console.error(e);
    process.exit(1);
  });
}

main();
