/**
 * One-way helper: converts pdf-parse plaintext dumps (see playbook) into
 * structured markdown under docs/markdown/SSOT/movemental-full-path/.
 * Run after refreshing raw-extraction/*.txt.
 *
 * Usage: node scripts/ssot-raw-txt-to-markdown.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const ssotDir = path.join(repoRoot, "docs/markdown/SSOT/movemental-full-path");
const rawDir = path.join(ssotDir, "raw-extraction");

const SHA_PATH = path.join(
  repoRoot,
  "docs/source-artifacts/movemental-full-path/SHA256SUMS.txt",
);

function readHashes() {
  if (!fs.existsSync(SHA_PATH)) return {};
  const m = {};
  for (const line of fs.readFileSync(SHA_PATH, "utf8").split("\n")) {
    const [hash, ...rest] = line.trim().split(/\s+/);
    if (hash?.length === 64) m[rest.join(" ").replace(/^\*/, "")] = hash;
  }
  return m;
}

const PDF_HASH = readHashes();

function isNoiseLine(line) {
  const t = line.trim();
  if (!t) return false;
  if (/^Page \d+ of \d+$/.test(t)) return true;
  if (/^The Movemental AI Path\s*·\s*(Full Source of Truth|Parts Nine and Ten)$/.test(t))
    return true;
  if (t === "The Movemental AI Path") return true;
  return false;
}

function flushParagraph(buf, out) {
  if (!buf.length) return;
  const text = buf.join(" ").replace(/\s+/g, " ").trim();
  if (text) out.push(text);
  buf.length = 0;
}

/** Subsection labels like `Nine-A: Title` → markdown heading. */
function isSubsectionHeading(t) {
  return /^[A-Za-z]+-[A-Z]:\s+\S/.test(t) || /^\d+[A-Za-z]:\s+\S/.test(t);
}

/** PDF often sets major segment titles as a lone line (e.g. `Churches`). */
function isMajorSectionTitle(t) {
  if (t === "Churches" || t === "Nonprofits") return true;
  if (/^Institutions:/.test(t)) return true;
  if (t === "What is true across all three segments") return true;
  return false;
}

/** Turn a raw extract chunk into markdown-ish paragraphs and bullet lines. */
function chunkToMarkdownBody(chunk) {
  const lines = chunk.split("\n");
  const buf = [];
  const out = [];

  const isBulletStart = (t) =>
    /^[•]\s*/.test(t) || /^Item \d+\./.test(t);

  const appendContinuation = (trim) => {
    if (buf.length) {
      buf.push(trim);
      return true;
    }
    if (out.length > 0) {
      const last = out[out.length - 1];
      if (last.startsWith("### ") || last.startsWith("- ")) {
        out[out.length - 1] = `${last} ${trim}`;
      } else {
        out[out.length - 1] = `${last} ${trim}`;
      }
      return true;
    }
    return false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isNoiseLine(line)) continue;

    const t = line.trimEnd();
    if (!t.trim()) {
      flushParagraph(buf, out);
      continue;
    }

    const trim = t.trim();

    // "… State of AI in" + newline + "Nonprofits Benchmark…"
    if (
      buf.length === 0 &&
      out.length > 0 &&
      !isSubsectionHeading(trim) &&
      !isBulletStart(trim) &&
      !isMajorSectionTitle(trim)
    ) {
      const last = out[out.length - 1];
      if (
        typeof last === "string" &&
        !last.startsWith("### ") &&
        !last.startsWith("## ") &&
        !last.startsWith("- ") &&
        /\b(in|of|for|the|and|with|to|on|at|from)\s*$/i.test(last) &&
        /^[A-Z]/.test(trim)
      ) {
        out[out.length - 1] = `${last} ${trim}`;
        continue;
      }
    }

    // PDF line wraps often break before a lowercase continuation fragment.
    if (/^[a-z(]/.test(trim) || /^skew:/i.test(trim)) {
      if (appendContinuation(trim)) continue;
    }

    if (isMajorSectionTitle(trim)) {
      flushParagraph(buf, out);
      out.push(`## ${trim}`);
      continue;
    }

    if (isSubsectionHeading(trim)) {
      flushParagraph(buf, out);
      out.push(`### ${trim}`);
      continue;
    }

    if (isBulletStart(trim)) {
      flushParagraph(buf, out);
      const cleaned = trim.replace(/^•\s*/, "- ");
      out.push(cleaned.replace(/^Item (\d+)\.\s*/, "- **Item $1.** "));
      continue;
    }

    // Hyphenated line break from PDF column wrap
    if (/\w[-—]\s*$/.test(t)) {
      buf.push(t.replace(/[-—]\s*$/, ""));
      continue;
    }

    buf.push(trim);
  }
  flushParagraph(buf, out);

  return out
    .map((line) => {
      if (
        line.startsWith("- ") ||
        line.startsWith("### ") ||
        line.startsWith("## ")
      )
        return line;
      return line.split(/\s+/).join(" ");
    })
    .join("\n\n");
}

const PART_SLUGS = {
  one: "part-01-reality-ai-organizations-2026",
  two: "part-02-minimum-viable-safety-checklist",
  three: "part-03-working-source-of-truth-safety-stage",
  four: "part-04-productization-strategy-cross-walk",
  five: "part-05-sandbox-discovery",
  six: "part-06-skills-development",
  seven: "part-07-solutions-deployment",
  eight: "part-08-cross-stage-productization",
  nine: "part-09-movemental-technological-foundation",
  ten: "part-10-consolidated-pricing",
};

function splitMainDoc(text) {
  const re = /\n(?=Part (one|two|three|four|five|six|seven|eight):)/gi;
  const parts = text.split(re);
  const intro = parts[0]?.trim() ?? "";
  const segments = [];
  for (let i = 1; i < parts.length; i += 2) {
    const key = parts[i].toLowerCase();
    const body = (parts[i + 1] ?? "").trim();
    segments.push({ key, body });
  }
  return { intro, segments };
}

function splitExtensionDoc(text) {
  // Cover block repeats Part nine / Part ten titles; real Part nine begins after Stage marker.
  const stageRe = /\nStage 04 \(continued\): Solutions\r?\n/i;
  const m = stageRe.exec(text);
  const head = m ? text.slice(0, m.index).trim() : text.trim();
  const rest = m ? text.slice(m.index + m[0].length).trim() : "";

  const tenNeedle = /\n(?=Part ten: consolidated pricing across the path\r?\n)/i;
  const splitTen = rest.split(tenNeedle);
  const nineBody = (splitTen[0] ?? "").trim();
  const tenBody = (splitTen[1] ?? "").trim();

  return {
    preface: head,
    nine: nineBody,
    ten: tenBody,
  };
}

function frontMatter({
  sourcePdf,
  slug,
  title,
  status = "draft",
}) {
  const hash =
    sourcePdf === "movemental_full_path_source_of_truth_v2.pdf"
      ? PDF_HASH["movemental_full_path_source_of_truth_v2.pdf"]
      : PDF_HASH["movemental_parts_nine_and_ten.pdf"];

  const lines = [
    "---",
    "ssot: movemental-full-path",
    `source_pdf: ${sourcePdf}`,
    "extracted_at: 2026-05-07",
    "extract_tool: pdf-parse 1.1.1 (Node, one-off npm install in /tmp)",
    `pdf_sha256: ${hash ?? "<run sha256sum in docs/source-artifacts/movemental-full-path/>"}`,
    "supersedes: []",
    `status: ${status}`,
    "---",
    "",
    `# ${title}`,
    "",
  ];
  return lines.join("\n");
}

/** First line of a part chunk is always `Part <word>: …`. */
function partHeading(rawChunk) {
  const head = rawChunk.split("\n").find((l) => l.trim().length > 0) ?? "";
  return head.trim() || "Untitled part";
}

/** Body without the opening `Part x: title` heading line (title is only in `# …`). */
function stripPartLeadLine(rawChunk) {
  return rawChunk.replace(/^Part\s+(?:one|two|three|four|five|six|seven|eight|nine|ten):\s*.+?\r?\n+/, "").trim();
}

function writePart(fileSlug, sourcePdf, headingLine, rawChunk) {
  const inner = stripPartLeadLine(rawChunk);
  const body = chunkToMarkdownBody(inner || rawChunk.trim());
  const md =
    frontMatter({
      sourcePdf,
      slug: fileSlug,
      title: headingLine.replace(/\s+/g, " ").trim(),
    }) +
    body +
    "\n";
  const fp = path.join(ssotDir, `${fileSlug}.md`);
  fs.writeFileSync(fp, md, "utf8");
  return fp;
}

function main() {
  const mainRaw = fs.readFileSync(
    path.join(rawDir, "full-path-source-of-truth-v2.txt"),
    "utf8",
  );
  const extRaw = fs.readFileSync(
    path.join(rawDir, "parts-nine-and-ten.txt"),
    "utf8",
  );

  const { intro, segments } = splitMainDoc(mainRaw);
  const ext = splitExtensionDoc(extRaw);

  fs.mkdirSync(ssotDir, { recursive: true });

  // 00 overview
  const overviewMd =
    frontMatter({
      sourcePdf: "movemental_full_path_source_of_truth_v2.pdf",
      slug: "part-00-document-overview",
      title: "Document overview (cover + how to use)",
    }) +
    chunkToMarkdownBody(intro) +
    "\n";
  fs.writeFileSync(path.join(ssotDir, "part-00-document-overview.md"), overviewMd, "utf8");

  for (const seg of segments) {
    const slug = PART_SLUGS[seg.key];
    if (!slug) continue;
    writePart(
      slug,
      "movemental_full_path_source_of_truth_v2.pdf",
      partHeading(seg.body),
      seg.body,
    );
  }

  // Extension preface (parts 9–10 PDF only)
  const prefaceMd =
    frontMatter({
      sourcePdf: "movemental_parts_nine_and_ten.pdf",
      slug: "part-00-extension-preface",
      title: "Extension preface (Parts Nine and Ten)",
    }) +
    chunkToMarkdownBody(ext.preface) +
    "\n";
  fs.writeFileSync(path.join(ssotDir, "part-00-extension-preface.md"), prefaceMd, "utf8");

  writePart(
    PART_SLUGS.nine,
    "movemental_parts_nine_and_ten.pdf",
    partHeading(ext.nine),
    ext.nine,
  );
  writePart(
    PART_SLUGS.ten,
    "movemental_parts_nine_and_ten.pdf",
    partHeading(ext.ten),
    ext.ten,
  );

  console.log("Wrote markdown under", ssotDir);
}

main();
