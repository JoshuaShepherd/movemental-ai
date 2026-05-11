#!/usr/bin/env node
/**
 * Generates docs/html/toolkit-text-review.html — plain HTML/CSS/JS proofreading view
 * of all Movemental Safety toolkit copy (landing, modal/form, web field guide).
 *
 * Run: node scripts/generate-toolkit-text-review-html.mjs
 *
 * Structured arrays are parsed from toolkit-read-content.tsx; Section 1 paragraphs
 * are scraped from the WhySafetyIsFirst JSX block so citation chip positions stay aligned.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const tsxPath = path.join(
  repoRoot,
  "src/components/sections-mock/toolkit-read/toolkit-read-content.tsx",
);
const outPath = path.join(repoRoot, "docs/html/toolkit-text-review.html");

const tsx = fs.readFileSync(tsxPath, "utf8");

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function decodeJsString(s) {
  return s.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, "\n");
}

function extractArtifacts(src) {
  const start = src.indexOf("const ARTIFACTS:");
  const end = src.indexOf("];", src.indexOf("const ASSESSMENT_QUESTIONS"));
  const block = src.slice(start, end + 2);
  const arts = [];
  const entryRe =
    /\{\s*number:\s*"([^"]+)",\s*title:\s*"((?:[^"\\]|\\.)*)",\s*definition:\s*"((?:[^"\\]|\\.)*)",\s*body:\s*\[([\s\S]*?)\],\s*inPractice:\s*"((?:[^"\\]|\\.)*)",\s*\}/g;
  let m;
  while ((m = entryRe.exec(block)) !== null) {
    const bodies = [];
    const bodyChunk = m[4];
    const strRe = /"((?:[^"\\]|\\.)*)"/g;
    let bm;
    while ((bm = strRe.exec(bodyChunk)) !== null) {
      bodies.push(decodeJsString(bm[1]));
    }
    arts.push({
      number: m[1],
      title: decodeJsString(m[2]),
      definition: decodeJsString(m[3]),
      body: bodies,
      inPractice: decodeJsString(m[5]),
    });
  }
  return arts;
}

function extractAssessment(src) {
  const start = src.indexOf("const ASSESSMENT_QUESTIONS:");
  const end = src.indexOf("];", src.indexOf("const COMMON_MISTAKES"));
  const block = src.slice(start, end + 2);
  const qs = [];
  const entryRe =
    /\{\s*number:\s*"([^"]+)",\s*question:\s*"((?:[^"\\]|\\.)*)",\s*tension:\s*"((?:[^"\\]|\\.)*)",\s*positionA:\s*"((?:[^"\\]|\\.)*)",\s*positionB:\s*"((?:[^"\\]|\\.)*)",\s*\}/gs;
  let m;
  while ((m = entryRe.exec(block)) !== null) {
    qs.push({
      number: m[1],
      question: decodeJsString(m[2]),
      tension: decodeJsString(m[3]),
      positionA: decodeJsString(m[4]),
      positionB: decodeJsString(m[5]),
    });
  }
  return qs;
}

function extractMistakes(src) {
  const start = src.indexOf("const COMMON_MISTAKES:");
  const end = src.indexOf("];", src.indexOf("const NAMED_REFUSALS"));
  const block = src.slice(start, end + 2);
  const ms = [];
  const entryRe =
    /\{\s*number:\s*"([^"]+)",\s*title:\s*"((?:[^"\\]|\\.)*)",\s*body:\s*"((?:[^"\\]|\\.)*)",\s*\}/gs;
  let m;
  while ((m = entryRe.exec(block)) !== null) {
    ms.push({
      number: m[1],
      title: decodeJsString(m[2]),
      body: decodeJsString(m[3]),
    });
  }
  return ms;
}

function extractRefusals(src) {
  const start = src.indexOf("const NAMED_REFUSALS:");
  const endMarker = "/* -------------------------------------------------------------------------- */\n/*  Page composition";
  const end = src.indexOf(endMarker, start);
  const block = src.slice(start, end);
  const rs = [];
  const entryRe =
    /\{\s*number:\s*"([^"]+)",\s*refusal:\s*(?:\(\s*)?\s*"((?:[^"\\]|\\.)*)"\s*\)?\s*,\s*rationale:\s*"((?:[^"\\]|\\.)*)",\s*alternative:\s*"((?:[^"\\]|\\.)*)",\s*\}/gs;
  let m;
  while ((m = entryRe.exec(block)) !== null) {
    rs.push({
      number: m[1],
      refusal: decodeJsString(m[2]),
      rationale: decodeJsString(m[3]),
      alternative: decodeJsString(m[4]),
    });
  }
  return rs;
}

/** Pull <p> blocks from WhySafetyIsFirst inner prose container */
function extractWhySafetyParagraphsHtml(src) {
  const fnStart = src.indexOf("function WhySafetyIsFirst()");
  const marker = 'className="space-y-6 text-lg leading-relaxed text-muted-foreground"';
  const divStart = src.indexOf(marker, fnStart);
  const innerStart = src.indexOf(">", divStart) + 1;
  const innerEnd = src.indexOf("</div>\n          </div>\n        </Reveal>", innerStart);
  const chunk = src.slice(innerStart, innerEnd);
  const out = [];
  const pRe = /<p>([\s\S]*?)<\/p>/g;
  let m;
  while ((m = pRe.exec(chunk)) !== null) {
    let inner = m[1]
      .replace(/<Cite\s+claimId="([^"]+)"\s*\/>/g, '<span class="cite-chip">⟨$1⟩</span>')
      .replace(/<span>\s*&nbsp;\s*<\/span>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    inner = inner.replace(/&rsquo;/g, "'").replace(/&lsquo;/g, "'").replace(/&rdquo;/g, '"').replace(/&ldquo;/g, '"');
    inner = inner.replace(/&mdash;/g, "—").replace(/&ndash;/g, "–");
    inner = inner.replace(/&times;/g, "×");
    inner = inner.replace(/&nbsp;/g, " ");
    inner = inner.replace(/\u00a0/g, " ");
    out.push(inner);
  }
  return out;
}

const artifacts = extractArtifacts(tsx);
const assessment = extractAssessment(tsx);
const mistakes = extractMistakes(tsx);
const refusals = extractRefusals(tsx);
const section1Paragraphs = extractWhySafetyParagraphsHtml(tsx);

if (artifacts.length !== 7) throw new Error(`Expected 7 decisions, got ${artifacts.length}`);
if (assessment.length !== 15) throw new Error(`Expected 15 questions, got ${assessment.length}`);
if (mistakes.length !== 5) throw new Error(`Expected 5 mistakes, got ${mistakes.length}`);
if (refusals.length !== 7) throw new Error(`Expected 7 refusals, got ${refusals.length}`);
if (section1Paragraphs.length !== 8) throw new Error(`Expected 8 §1 paragraphs, got ${section1Paragraphs.length}`);

const landingInside = [
  {
    title: "Why Safety is first",
    body: "The argument for governance preceding deployment, in plain terms a board can ratify in one sitting.",
  },
  {
    title: "The seven decisions named",
    body: "Acceptable Use, Care Boundaries, Disclosure Standards, Vendor Inventory, Data Handling, Incident Response, and Named Refusals.",
  },
  {
    title: "The self-assessment",
    body: "A 30-minute exercise your leadership team can complete together. Surfaces the questions you didn't realize you hadn't answered.",
  },
  {
    title: "Common mistakes",
    body: "The four ways organizations stall after deciding AI matters. Each one is preventable; each one is endemic.",
  },
  {
    title: "The two-week MVP preview",
    body: "What the $1,000 facilitated engagement looks like, week-by-week. Use it to decide whether the work is yours to run alone.",
  },
  {
    title: "Named refusals",
    body: "How to write the list of applications your organization commits to refuse on principle, regardless of pressure.",
  },
];

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Toolkit — exact copy review (Movemental)</title>
  <style>
    :root {
      --bg: #fafaf9;
      --card: #fff;
      --muted: #57534e;
      --ink: #1c1917;
      --border: #e7e5e4;
      --accent: #0053db;
      --max: 44rem;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
      font-size: 1rem;
      line-height: 1.6;
      color: var(--ink);
      background: var(--bg);
    }
    header.site {
      position: sticky;
      top: 0;
      z-index: 20;
      background: rgba(250, 250, 249, 0.92);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--border);
      padding: 0.75rem 1.25rem;
    }
    header.site h1 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.02em;
    }
    header.site p {
      margin: 0.25rem 0 0;
      font-size: 0.8rem;
      color: var(--muted);
    }
    .layout {
      display: grid;
      grid-template-columns: minmax(200px, 240px) 1fr;
      gap: 0;
      max-width: 1200px;
      margin: 0 auto;
      min-height: calc(100vh - 52px);
    }
    @media (max-width: 880px) {
      .layout { grid-template-columns: 1fr; }
      nav.toc { position: relative; border-right: none; border-bottom: 1px solid var(--border); max-height: none; }
    }
    nav.toc {
      position: sticky;
      top: 52px;
      align-self: start;
      max-height: calc(100vh - 52px);
      overflow: auto;
      padding: 1rem 1rem 2rem;
      border-right: 1px solid var(--border);
      background: var(--card);
      font-size: 0.8rem;
    }
    nav.toc strong {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--muted);
    }
    nav.toc a {
      display: block;
      padding: 0.2rem 0;
      color: var(--accent);
      text-decoration: none;
    }
    nav.toc a:hover { text-decoration: underline; }
    main {
      padding: 1.5rem 1.5rem 4rem;
      max-width: calc(var(--max) + 3rem);
    }
    section.doc-section {
      margin-bottom: 3rem;
      scroll-margin-top: 4rem;
    }
    section.doc-section > h2 {
      font-family: Georgia, "Times New Roman", serif;
      font-style: italic;
      font-weight: 400;
      font-size: 1.75rem;
      margin: 0 0 1rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.5rem;
    }
    .eyebrow {
      display: block;
      font-size: 0.65rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--muted);
      margin-bottom: 0.35rem;
    }
    .prose {
      max-width: var(--max);
      color: var(--muted);
    }
    .prose p { margin: 0 0 1rem; }
    .prose strong.label { color: var(--ink); }
    .mono-block {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.78rem;
      background: var(--card);
      border: 1px solid var(--border);
      padding: 0.75rem 1rem;
      border-radius: 6px;
      white-space: pre-wrap;
      color: var(--ink);
    }
    .grid-cards {
      display: grid;
      gap: 1.25rem;
    }
    @media (min-width: 600px) {
      .grid-cards.two { grid-template-columns: 1fr 1fr; }
    }
    .card {
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1rem 1.1rem;
      background: var(--card);
    }
    .card .num { font-family: Georgia, serif; font-style: italic; font-size: 1.5rem; color: #a8a29e; }
    .card h3 { margin: 0.35rem 0; font-size: 1.15rem; color: var(--ink); font-family: Georgia, serif; }
    .positions {
      display: grid;
      gap: 0.75rem;
    }
    @media (min-width: 640px) {
      .positions { grid-template-columns: 1fr 1fr; }
    }
    .position-box {
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 0.75rem;
      font-size: 0.9rem;
      color: var(--ink);
      background: #fafafa;
    }
    .cite-chip {
      font-family: ui-monospace, monospace;
      font-size: 0.72em;
      font-style: normal;
      color: var(--accent);
      white-space: nowrap;
    }
    .note {
      font-size: 0.8rem;
      color: var(--muted);
      border-left: 3px solid var(--border);
      padding-left: 0.75rem;
      margin: 1rem 0;
    }
    table.meta td { padding: 0.2rem 0.75rem 0.2rem 0; vertical-align: top; font-size: 0.85rem; }
    table.meta td:first-child { color: var(--muted); white-space: nowrap; }
    button#expand-all, button#collapse-all {
      margin-right: 0.5rem;
      margin-top: 0.5rem;
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      cursor: pointer;
      border: 1px solid var(--border);
      border-radius: 4px;
      background: var(--card);
    }
    details.section-details {
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 0 1rem;
      margin-bottom: 1rem;
      background: var(--card);
    }
    details.section-details > summary {
      cursor: pointer;
      padding: 0.75rem 0;
      font-weight: 600;
      list-style: none;
    }
    details.section-details > summary::-webkit-details-marker { display: none; }
    details.section-details[open] > summary { border-bottom: 1px solid var(--border); margin-bottom: 0.75rem; }
    .raw-string {
      font-family: ui-monospace, monospace;
      font-size: 0.82rem;
      background: #f5f5f4;
      padding: 0.1rem 0.35rem;
      border-radius: 4px;
      color: var(--ink);
    }
  </style>
</head>
<body>
  <header class="site">
    <h1>Movemental Safety toolkit — copy review sheet</h1>
    <p>Plain HTML export for proofreading. Sources: <span class="raw-string">src/app/(site)/toolkit/page.tsx</span>, <span class="raw-string">src/components/toolkit/*</span>, <span class="raw-string">src/components/sections-mock/toolkit-read/toolkit-read-content.tsx</span>. Regenerate with <span class="raw-string">node scripts/generate-toolkit-text-review-html.mjs</span>.</p>
    <button type="button" id="expand-all">Expand all</button>
    <button type="button" id="collapse-all">Collapse all</button>
  </header>
  <div class="layout">
    <nav class="toc" aria-label="Page sections">
      <strong>On this page</strong>
      <a href="#meta">Metadata</a>
      <a href="#landing">/toolkit landing</a>
      <a href="#modal">Modal &amp; form</a>
      <a href="#cover">Cover component</a>
      <a href="#read-meta">/toolkit/read metadata</a>
      <a href="#read-hero">Read · Hero &amp; intros</a>
      <a href="#read-s1">Read · §1 Why Safety</a>
      <a href="#read-s2">Read · §2 Decisions</a>
      <a href="#read-s3">Read · §3 Assessment</a>
      <a href="#read-s4">Read · §4 Mistakes</a>
      <a href="#read-s5">Read · §5 MVP</a>
      <a href="#read-s6">Read · §6 Refusals</a>
      <a href="#read-back">Read · Back matter</a>
    </nav>
    <main>
      <section id="meta" class="doc-section">
        <h2>Metadata (Next.js)</h2>
        <p class="eyebrow">/toolkit</p>
        <table class="meta">
          <tr><td>title</td><td>${escapeHtml("It Starts With Safety — the free toolkit")}</td></tr>
          <tr><td>description</td><td>${escapeHtml("A 16-page Movemental field guide for organizational leaders navigating AI. Names the seven Safety decisions, walks through why governance precedes deployment, and includes a 30-minute self-assessment for your leadership team.")}</td></tr>
          <tr><td>openGraph.title</td><td>${escapeHtml("It Starts With Safety — Movemental")}</td></tr>
        </table>
        <p class="eyebrow">/toolkit/read</p>
        <table class="meta">
          <tr><td>title</td><td>${escapeHtml("It Starts With Safety — read the toolkit")}</td></tr>
          <tr><td>description</td><td>${escapeHtml("The full Movemental Safety field guide on the web: why governance precedes deployment, the seven decisions, the 15-question self-assessment your leadership team takes together, the named refusals, and the two-week facilitated engagement.")}</td></tr>
          <tr><td>openGraph.title</td><td>${escapeHtml("It Starts With Safety — Movemental field guide")}</td></tr>
        </table>
      </section>

      <section id="landing" class="doc-section">
        <h2>/toolkit landing page — visible copy</h2>
        <div class="prose">
          <span class="eyebrow">Hero</span>
          <p><strong class="label">Eyebrow:</strong> A free field guide</p>
          <p><strong class="label">H1:</strong> It Starts With <em>Safety.</em></p>
          <p><strong class="label">Subhead (italic):</strong> A field guide for organizational leaders navigating AI.</p>
          <p>Sixteen pages. Read it in an evening. Run the 30-minute self-assessment with your leadership team before you commit to a vendor, a tool, or a policy. The toolkit names the seven governance decisions that come out of a Safety engagement, walks through why governance precedes deployment, and gives your team a shared vocabulary for the conversations you're already having.</p>

          <span class="eyebrow">What's inside</span>
          <p><strong class="label">Eyebrow:</strong> What's inside</p>
          <p><strong class="label">H2:</strong> Six sections. Sixteen pages.</p>
          ${landingInside
            .map(
              (s, i) => `
          <div class="card" style="margin:1rem 0;">
            <span class="num">${String(i + 1).padStart(2, "0")}</span>
            <h3 style="margin:0.25rem 0;">${escapeHtml(s.title)}</h3>
            <p style="margin:0;color:var(--muted);">${escapeHtml(s.body)}</p>
          </div>`,
            )
            .join("")}

          <span class="eyebrow">Download</span>
          <p><strong class="label">Eyebrow:</strong> Send it to your inbox</p>
          <p><strong class="label">H2:</strong> Download the toolkit.</p>
          <p>We'll send the PDF immediately and follow up once over the following week. That's it.</p>

          <span class="eyebrow">Or skip ahead</span>
          <p><strong class="label">Eyebrow:</strong> Or skip ahead</p>
          <p><strong class="label">H2:</strong> If you already know Safety is your next move.</p>
          <p>The Safety stage page details the seven decisions, the two-week process, and the $1,000 fee. You can read the full field guide in your browser, or start a conversation directly — the toolkit will follow if it's useful.</p>
          <p><strong class="label">Buttons:</strong> Read the field guide · See the Safety stage · Start a conversation</p>

          <span class="eyebrow">After download</span>
          <p><strong class="label">H3 (eyebrow style):</strong> What happens after you download</p>
          <p><strong class="label">Day 0.</strong> The toolkit PDF lands in your inbox immediately. Read it on your own time.</p>
          <p><strong class="label">Day 3.</strong> A short note offering a 30-minute conversation if you have questions on what you read.</p>
          <p><strong class="label">Day 7.</strong> Context on the $1,000 facilitated MVP and how to begin if it's right for you.</p>
          <p>After day 7, no further automated emails. We don't share your address. Unsubscribe at any time from any email.</p>
        </div>
      </section>

      <section id="modal" class="doc-section">
        <h2>Toolkit modal &amp; form strings</h2>
        <div class="prose">
          <p><strong class="label">Backdrop:</strong> aria-label "Close toolkit dialog"</p>
          <p><strong class="label">Close button:</strong> aria-label "Close"</p>
          <p><strong class="label">Modal H2:</strong> Send the toolkit to your inbox.</p>
          <p>We'll send the PDF immediately and follow up once over the following week. That's it.</p>
          <p><strong class="label">Form labels:</strong> Email address · Organization (optional)</p>
          <p><strong class="label">Placeholders:</strong> name@organization.org · Your organization</p>
          <p><strong class="label">Submit:</strong> Send me the toolkit · Sending…</p>
          <p><strong class="label">Errors (code):</strong> Email is required. · Something went wrong. Please try again. · Network error. Please try again.</p>
          <p>By submitting your email, you'll receive the toolkit immediately and a brief three-email sequence over the following week. Unsubscribe at any time.</p>
          <p><strong class="label">Link:</strong> Read more about the toolkit first →</p>
          <p><strong class="label">Success H2:</strong> On its way.</p>
          <p>Check your inbox in the next few minutes. If you don't see it, check spam — the email will be from josh@movemental.ai.</p>
          <p><strong class="label">Button:</strong> Close</p>
          <p class="note"><strong>Page form success</strong> (inline on /toolkit, same as modal success body).</p>
        </div>
      </section>

      <section id="cover" class="doc-section">
        <h2>ToolkitCover — text</h2>
        <div class="prose">
          <p><strong class="label">aria-label:</strong> "It Starts With Safety" — a 16-page Movemental field guide</p>
          <p><strong class="label">Eyebrow:</strong> Movemental Field Guide</p>
          <p><strong class="label">Title:</strong> It Starts<br />With Safety</p>
          <p><strong class="label">Subtitle:</strong> A sixteen-page protocol for organizational leaders.</p>
          <p><strong class="label">Footer:</strong> Stage 01</p>
        </div>
      </section>

      <section id="read-meta" class="doc-section">
        <h2>/toolkit/read — composition note</h2>
        <p class="prose">Citation chips in production resolve from <span class="raw-string">TOOLKIT_CLAIMS</span> in the TSX source. Below, ⟨claim-id⟩ markers show where a chip appears in §1; refusals ⟨fbi-ic3-893m⟩ and ⟨barna-gloo-spiritual-trust-1-in-3⟩ are appended in §6 in the React tree.</p>
      </section>

      <section id="read-hero" class="doc-section">
        <h2>Read · Hero, author note, how to use</h2>
        <div class="prose">
          <p><strong class="label">Eyebrow:</strong> A Movemental Field Guide · Version 1.0 · 2026</p>
          <p><strong class="label">H1:</strong> It Starts With Safety.</p>
          <p><strong class="label">Subhead:</strong> A field guide for organizational leaders navigating AI.</p>
          <p>Brad Brisco · Alan Hirsch · Joshua Shepherd</p>
          <p>Sixteen pages. About a thirty-minute read on your own; about ninety minutes if you take the self-assessment with your leadership team, which is what we'd actually recommend. The disagreement that surfaces in that ninety minutes is the work this field guide exists to start.</p>
          <p><strong class="label">CTAs:</strong> Download the PDF · Start a conversation</p>

          <span class="eyebrow">From the authors</span>
          <p><strong class="label">H2:</strong> A note before you read.</p>
          <p>We wrote this field guide because the public material on AI for mission-driven organizations is, at present, mostly two kinds of writing. The first is vendor copy — useful for what it is, but written from the inside of a sales motion. The second is speculative theology — valuable, but written from outside the daily work of leading an organization through a transition.</p>
          <p>This document is neither. It is a field guide written from the seat of the senior leader who has to hold the organization together through a season the technology will keep moving. We are also a company; we sell facilitation of exactly this work. We have tried to make the guide useful whether or not your organization ever engages us.</p>
          <p>Most of the value here is unlocked by reading it with your leadership team rather than alone. The self-assessment in Section 3 is the load-bearing part: it is calibrated to produce disagreement among thoughtful leaders, and that disagreement is what reveals where the actual governance work needs to happen. Read the sections in order, mark the parts that surprise you, and bring the marks to the next conversation your senior team has.</p>

          <span class="eyebrow">How to use this field guide</span>
          <p><strong class="label">H2:</strong> Read it with the team that will live with the answers.</p>
          <p>Most of the value in this document comes from reading it with the leadership team that will be responsible for AI governance at your organization. That is usually some combination of the senior leader, the executive team, the board chair, the staff lead for technology, and one or two trusted longtime members.</p>
          <p>The arc is straightforward. Section 1 makes the argument for putting Safety first. Section 2 names the seven decisions a Safety engagement produces. Section 3 is the self-assessment — the part you take together. Section 4 names the patterns of failure most organizations stumble into. Section 5 describes the two-week facilitated engagement Movemental offers, and is honest about when you should not hire us. Section 6 names refusals — the AI applications we believe mission-driven organizations should refuse on principle.</p>
          <p><em>Disagreement among your team is the point of the self-assessment, not a problem with it. If your team aligns easily on all fifteen questions, either you are unusually well-formed or the questions need to be taken more seriously.</em></p>
        </div>
      </section>

      <section id="read-s1" class="doc-section">
        <h2>Read · Section 1 — Why Safety is first</h2>
        <p class="eyebrow">Section 1</p>
        <p class="prose" style="font-family:Georgia,serif;font-style:italic;font-size:1.4rem;margin-bottom:1rem;">Why Safety is first.</p>
        <div class="prose">
          ${section1Paragraphs.map((p) => `<p>${p}</p>`).join("\n          ")}
        </div>
      </section>

      <section id="read-s2" class="doc-section">
        <h2>Read · Section 2 — The seven decisions</h2>
        <div class="prose">
          <p class="eyebrow">Section 2</p>
          <p style="font-family:Georgia,serif;font-style:italic;font-size:1.4rem;color:var(--ink);">The seven decisions.</p>
          <p>A Safety engagement produces seven concrete decisions, each written and scoped for ratification. Each one is short. Each one is signed and ratified. Together they make up the foundation any later AI deployment can stand on. The descriptions below are substantively richer than the public landing page's; they are written so a senior team can begin drafting their own first versions.</p>
        </div>
        ${artifacts
          .map(
            (a) => `
        <details class="section-details" open>
          <summary>${escapeHtml(a.number)} — ${escapeHtml(a.title)}</summary>
          <div class="prose">
            <p style="font-style:italic;color:var(--ink);">${escapeHtml(a.definition)}</p>
            ${a.body.map((para) => `<p>${escapeHtml(para)}</p>`).join("")}
            <p class="eyebrow" style="margin-top:1rem;">In practice</p>
            <p>${escapeHtml(a.inPractice)}</p>
          </div>
        </details>`,
          )
          .join("")}
      </section>

      <section id="read-s3" class="doc-section">
        <h2>Read · Section 3 — Self-assessment</h2>
        <div class="prose">
          <p class="eyebrow">Section 3 — The self-assessment</p>
          <p style="font-family:Georgia,serif;font-style:italic;font-size:1.4rem;color:var(--ink);">Take this together.</p>
          <p>This is not a quiz. It is not a diagnostic. It is not a marketing tool. It is fifteen questions calibrated to produce disagreement among thoughtful leaders, written so that the disagreement that surfaces is the part that matters.</p>
          <p><em>How to take it.</em> Each member of the leadership team writes their own answer first — literally writes it — before any conversation happens. Then you compare. Most teams who take the assessment seriously discover that they disagreed on three to five questions they would not have predicted in advance. That discovery is what reveals where the governance work is actually needed.</p>
          <p><em>What to expect.</em> The two example positions under each question are not right and wrong. They are competing reasonable views, and serious leaders hold both. If your team aligns easily on all fifteen, either you are unusually well-formed (and probably ready for the next stage of the path) or you have not yet engaged the questions seriously enough.</p>
        </div>
        ${assessment
          .map(
            (q) => `
        <details class="section-details" open>
          <summary>Q${escapeHtml(q.number)} — ${escapeHtml(q.question)}</summary>
          <div class="prose">
            <p>${escapeHtml(q.tension)}</p>
            <div class="positions">
              <div class="position-box">${escapeHtml(q.positionA)}</div>
              <div class="position-box">${escapeHtml(q.positionB)}</div>
            </div>
            <p class="eyebrow" style="margin-top:0.75rem;">Where your team landed</p>
            <p style="font-style:italic;font-size:0.9rem;">Note the position, the disagreement, and what the next conversation needs to resolve.</p>
          </div>
        </details>`,
          )
          .join("")}
        <div class="prose" style="margin-top:2rem;">
          <p class="eyebrow">What to do with what you discovered</p>
          <p style="font-family:Georgia,serif;font-style:italic;font-size:1.25rem;color:var(--ink);">Read the disagreement, then decide.</p>
          <p><em>If your team disagreed on three to five questions:</em> this is the typical pattern, and it indicates that the team is ready to do Safety work but has not yet aligned. The facilitated Safety engagement is designed for exactly this situation: two weeks, seven ratifiable decisions, the disagreement adjudicated and recorded.</p>
          <p><em>If your team disagreed on six or more questions:</em> this indicates significant fragmentation in the organization's posture. Safety is essential, and the Sandbox engagement that follows is likely to surface use-case-specific disagreements that need facilitation as well.</p>
          <p><em>If your team disagreed on fewer than three:</em> this indicates either unusual alignment (in which case you may be ready for Sandbox directly) or that the team has not engaged the questions seriously. Re-take the assessment with each member writing their honest answer privately first; the disagreement that emerges is usually larger than the in-person conversation suggested.</p>
          <p>In all cases the next step is the same: have the conversation about what you discovered. With your team if you want to do the work yourselves. With Movemental if you want help.</p>
          <p><strong class="label">CTAs:</strong> Start a conversation · See the Safety stage</p>
        </div>
      </section>

      <section id="read-s4" class="doc-section">
        <h2>Read · Section 4 — Common mistakes</h2>
        <div class="prose">
          <p class="eyebrow">Section 4</p>
          <p style="font-family:Georgia,serif;font-style:italic;font-size:1.4rem;color:var(--ink);">Common mistakes.</p>
          <p>Five named patterns of failure. Each one is endemic. Each one is preventable. Most organizations stumble into at least two of the five before recognizing the pattern.</p>
        </div>
        ${mistakes
          .map(
            (x) => `
        <details class="section-details" open>
          <summary>${escapeHtml(x.number)} — ${escapeHtml(x.title)}</summary>
          <div class="prose"><p>${escapeHtml(x.body)}</p></div>
        </details>`,
          )
          .join("")}
      </section>

      <section id="read-s5" class="doc-section">
        <h2>Read · Section 5 — Two-week MVP</h2>
        <div class="prose">
          <p class="eyebrow">Section 5</p>
          <p style="font-family:Georgia,serif;font-style:italic;font-size:1.4rem;color:var(--ink);">The two-week facilitated Safety engagement.</p>
          <p>This is the only openly promotional section of the field guide. We have tried to make it useful even if you decide to do the work yourselves.</p>
          <p><strong class="label">What we do</strong><br />Two weeks. Four working sessions, roughly eight hours of synchronous facilitation, plus asynchronous drafting and editing. The output is the seven decisions named in Section 2 — fully drafted, ready for board ratification — plus a Sandbox Readiness Assessment that names what the next stage of the path looks like for your specific organization.</p>
          <p><strong class="label">What it costs</strong><br />$1,000. Net 15 from signing. No retainers. No success fees. The flat fee is part of the design: pricing is not the place we hide misalignment about scope.</p>
          <p><strong class="label">When you should work with us</strong><br />When the leadership team has been unable to make progress on the seven decisions on their own. When internal disagreement on the assessment questions would benefit from external facilitation. When the timeline to a board meeting, an audit, or a major deployment decision means six months of intermittent internal drafting is not available. When the cost of getting this wrong is larger than the engagement fee.</p>
          <p><strong class="label">When you should do this yourselves</strong><br />When you have the team capacity to dedicate to drafting. When the senior team is already in alignment and the work is to write down what is already known. When there is no external timeline pressure. When you would rather invest the engagement fee in formation or staff time. The toolkit, taken seriously, is enough. We mean that.</p>
          <p><strong class="label">CTAs:</strong> Start a conversation · See the Safety stage page</p>
        </div>
      </section>

      <section id="read-s6" class="doc-section">
        <h2>Read · Section 6 — Named refusals</h2>
        <div class="prose">
          <p class="eyebrow">Section 6</p>
          <p style="font-family:Georgia,serif;font-style:italic;font-size:1.4rem;color:var(--ink);">Named refusals.</p>
          <p>Most organizations have refusals already. They live in the unwritten norms a senior leader applies on a Tuesday without remarking on it: this letter does not get generated; this conversation does not get summarized; this category is human-only because it always has been. Writing them down is the moment they become institutional rather than personal.</p>
          <p>Below are seven refusals Movemental believes mission-driven organizations should hold. The list is opinionated. It is intended to be quoted, debated, and adapted to your specific context. Yours will probably differ in one or two places. The point is not that these are the only refusals worth holding; the point is that refusals on the record outlast the leader who held them privately.</p>
          <p>Below each refusal is the rationale — what the refusal protects — and the alternative, the category of work that does the same job without the harm.</p>
        </div>
        ${refusals
          .map((r) => {
            let rat = escapeHtml(r.rationale);
            if (r.number === "05") rat += ' <span class="cite-chip">⟨fbi-ic3-893m⟩</span>';
            if (r.number === "06") rat += ' <span class="cite-chip">⟨barna-gloo-spiritual-trust-1-in-3⟩</span>';
            return `
        <details class="section-details" open>
          <summary>${escapeHtml(r.number)} — ${escapeHtml(r.refusal)}</summary>
          <div class="prose">
            <p class="eyebrow">Rationale</p>
            <p>${rat}</p>
            <p class="eyebrow">Alternative</p>
            <p>${escapeHtml(r.alternative)}</p>
          </div>
        </details>`;
          })
          .join("")}
        <div class="prose" style="margin-top:2rem;">
          <p style="font-style:italic;">The act of publicly committing to specific refusals is itself a formative practice. The Vatican's 2025 note Antiqua et Nova frames the same instinct in magisterial terms: AI "should be used only as a tool to complement human intelligence rather than replace its richness" <span class="cite-chip">⟨antiqua-et-nova-complement⟩</span>. The organization that names what it will not do is the organization that has decided what it stands for.</p>
        </div>
      </section>

      <section id="read-back" class="doc-section">
        <h2>Read · Back matter</h2>
        <div class="prose">
          <p class="eyebrow">How to start a conversation</p>
          <p style="font-family:Georgia,serif;font-style:italic;font-size:1.4rem;color:var(--ink);">When you're ready to talk.</p>
          <p>Email Josh directly at josh@movemental.ai, or use the contact form. A first conversation is thirty minutes. We will tell you in that time whether the Safety engagement is a fit, and whether the timing is.</p>
          <p><strong class="label">CTAs:</strong> Start a conversation · Send me the PDF</p>
          <p style="margin-top:2rem;font-size:0.9rem;color:var(--muted);"><em>It Starts With Safety · Version 1.0 · 2026</em></p>
          <p style="font-size:0.9rem;color:var(--muted);">Brad Brisco · Alan Hirsch · Joshua Shepherd. The full source list for every research claim cited above is rendered in the references rail below.</p>
        </div>
      </section>
    </main>
  </div>
  <script>
    (function () {
      var details = document.querySelectorAll("details.section-details");
      document.getElementById("expand-all").addEventListener("click", function () {
        details.forEach(function (d) { d.open = true; });
      });
      document.getElementById("collapse-all").addEventListener("click", function () {
        details.forEach(function (d) { d.open = false; });
      });
    })();
  </script>
</body>
</html>`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, html, "utf8");
console.log("Wrote", path.relative(repoRoot, outPath));
