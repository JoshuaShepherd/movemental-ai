import {
  SAFETY_FIELD_GUIDE_DISPLAY_TITLE,
  SAFETY_FIELD_GUIDE_DOWNLOAD_FILENAME,
  SAFETY_FIELD_GUIDE_PDF_PATH,
  SAFETY_HANDBOOK_DISPLAY_TITLE,
} from "@/lib/safety-field-guide";
import {
  SANDBOX_FIELD_GUIDE_DISPLAY_TITLE,
  SANDBOX_FIELD_GUIDE_DOWNLOAD_FILENAME,
  SANDBOX_FIELD_GUIDE_PDF_PATH,
} from "@/lib/sandbox-field-guide";

export type FieldGuideKind = "safety" | "sandbox";

export type FieldGuideInsideItem = {
  label: string;
  title: string;
  body: string;
};

export type FieldGuidePageCopy = {
  kind: FieldGuideKind;
  eyebrow: string;
  title: string;
  lede: string;
  meta: string[];
  insideHeading: string;
  inside: FieldGuideInsideItem[];
  success: string;
  pdfPath: string;
  pdfFilename: string;
  otherGuide: { kind: FieldGuideKind; href: string; label: string };
};

const SAFETY_INSIDE: FieldGuideInsideItem[] = [
  {
    label: "Layer 01",
    title: "Statement",
    body: "The values and posture your board can ratify in public — what you believe about AI in your mission.",
  },
  {
    label: "Layer 02",
    title: "Policy",
    body: "Operational guidance staff actually read: sanctioned tools, welcomed tasks, constraints, and refusals.",
  },
  {
    label: "Layer 03",
    title: "Context",
    body: "Where you name the relational and pastoral situations AI cannot enter — specific to your ministry.",
  },
  {
    label: "Layer 04",
    title: "Rules",
    body: "Day-to-day standards for data handling and how AI involvement is disclosed to constituents.",
  },
  {
    label: "Layer 05",
    title: "Response Plans",
    body: "Pre-written playbooks for when something goes wrong — calm, fast, and consistent, not improvised.",
  },
  {
    label: "Plus",
    title: "Self-assessment",
    body: "A 30-minute diagnostic your leadership team takes together to see which layers are weak.",
  },
];

const SANDBOX_INSIDE: FieldGuideInsideItem[] = [
  {
    label: "Setting up",
    title: "Constitute a sandbox",
    body: "A constrained, instrumented environment — named owners, exit criteria, and a cadence of what you learned.",
  },
  {
    label: "Evaluating",
    title: "Read vendor claims aggressively",
    body: "Ask for the system prompt, eval suite, data residency, and tenant boundaries before any pilot.",
  },
  {
    label: "Portfolio",
    title: "Assemble proof a board will accept",
    body: "Document what worked, what failed, and what Training will need: the artifact that earns Stage Three.",
  },
];

export const FIELD_GUIDE_PAGE_COPY: Record<FieldGuideKind, FieldGuidePageCopy> = {
  safety: {
    kind: "safety",
    eyebrow: "Field guide · Volume One",
    title: SAFETY_HANDBOOK_DISPLAY_TITLE,
    lede: "The practical first-stage field guide for leaders who need to move on AI without eroding the trust they spent decades earning.",
    meta: ["33 pages", "Free", "Self-assessment included", "No drip campaign"],
    insideHeading: "Five layers. Seven deliverables. One ratifiable framework.",
    inside: SAFETY_INSIDE,
    success: `Check your inbox — your ${SAFETY_HANDBOOK_DISPLAY_TITLE} is on its way.`,
    pdfPath: SAFETY_FIELD_GUIDE_PDF_PATH,
    pdfFilename: SAFETY_FIELD_GUIDE_DOWNLOAD_FILENAME,
    otherGuide: {
      kind: "sandbox",
      href: "/field-guide?guide=sandbox",
      label: "Volume Two — It Continues With Exploration",
    },
  },
  sandbox: {
    kind: "sandbox",
    eyebrow: "Field guide · Volume Two",
    title: SANDBOX_FIELD_GUIDE_DISPLAY_TITLE,
    lede: "The second-stage field guide: how to run real experiments with AI once your guardrails are in place.",
    meta: ["Volume Two", "Free", "Sandbox stage", "No drip campaign"],
    insideHeading: "What disciplined experimentation looks like after Safety.",
    inside: SANDBOX_INSIDE,
    success: "Check your inbox — It Continues With Exploration is on its way.",
    pdfPath: SANDBOX_FIELD_GUIDE_PDF_PATH,
    pdfFilename: SANDBOX_FIELD_GUIDE_DOWNLOAD_FILENAME,
    otherGuide: {
      kind: "safety",
      href: "/field-guide",
      label: "Volume One — It Starts With Safety",
    },
  },
};

export function resolveFieldGuideKind(value: string | null | undefined): FieldGuideKind {
  return value === "sandbox" ? "sandbox" : "safety";
}
