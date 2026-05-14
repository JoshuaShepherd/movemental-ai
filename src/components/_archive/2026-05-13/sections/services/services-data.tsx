import { BookOpen, Compass, FileText, Hammer, Mic2 } from "lucide-react";

export const staticReality = [
  {
    icon: <BookOpen className="size-10" aria-hidden />,
    eyebrow: "Books",
    title: "Read once, then shelved",
    description:
      "Valuable ideas trapped in formats that do not compound online or connect to what you teach next.",
  },
  {
    icon: <FileText className="size-10" aria-hidden />,
    eyebrow: "PDFs",
    title: "Rarely revisited or discovered",
    description:
      "Static files that search engines, learners, and AI cannot treat as a living part of your system.",
  },
  {
    icon: <Mic2 className="size-10" aria-hidden />,
    eyebrow: "Talks",
    title: "Not structured for ongoing engagement",
    description:
      "Teaching that stays episodic instead of becoming pathways, resources, and durable authority.",
  },
] as const;

export const modularSprints = [
  {
    icon: <Compass className="size-10" aria-hidden />,
    eyebrow: "Entry sprint",
    title: "Discovery Lab",
    description:
      "Prioritized AI use cases, experiment briefs, and measurement notes — bounded experimentation before deeper builds.",
  },
  {
    icon: <Hammer className="size-10" aria-hidden />,
    eyebrow: "Vertical builds",
    title: "Content & fundraising",
    description:
      "Four-week installs for structured libraries, pathways, donor visibility, and stewardship workflows — scoped in conversation.",
  },
  {
    icon: <BookOpen className="size-10" aria-hidden />,
    eyebrow: "Spine",
    title: "Foundation layer",
    description:
      "Governance, ethics posture, and decision maps as operating infrastructure before scale.",
  },
] as const;
