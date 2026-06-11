import { EMERGENCE_PHASE_LABELS } from "./types";

export type EmergenceScene = {
  phase: number;
  title: string;
  lede: string;
  callout: string;
};

export function emergenceScenes(): EmergenceScene[] {
  return EMERGENCE_PHASE_LABELS.map((title, phase) => {
    switch (phase) {
      case 0:
        return {
          phase,
          title,
          lede:
            "Teaching lives in many formats, talks, drafts, PDFs, recordings, without a single spine that holds them together.",
          callout:
            "What is missing is not volume, but structure: a way for humans and systems to recognize what belongs to what.",
        };
      case 1:
        return {
          phase,
          title,
          lede:
            "Books and long-form works become anchor objects: stable references the rest of the ecosystem can orbit.",
          callout:
            "Canonicalization is the shift from scattered files to named, citable intellectual property.",
        };
      case 2:
        return {
          phase,
          title,
          lede:
            "Transcripts make spoken teaching legible to search, study, and responsible machine reasoning.",
          callout:
            "Accessibility and machine legibility move together, the same text serves readers and models.",
        };
      case 3:
        return {
          phase,
          title,
          lede:
            "Articles and essays become discoverable surfaces: entry points that still point back to deeper sources.",
          callout:
            "The public web sees a coherent trail, not a pile of disconnected pages.",
        };
      case 4:
        return {
          phase,
          title,
          lede:
            "Pathways arrange ideas into journeys, thematic synthesis for people who need formation, not only information.",
          callout:
            "This is where content becomes curriculum-shaped without pretending to be shallow growth hacks.",
        };
      case 5:
        return {
          phase,
          title,
          lede:
            "Courses add rhythm, practice, and accountability: the social and pedagogical frame around the corpus.",
          callout:
            "Formation capacity increases when structure exists beneath the experience.",
        };
      case 6:
        return {
          phase,
          title,
          lede:
            "An AI layer sits above the corpus as an interaction surface, grounded, bounded, and inspectable.",
          callout:
            "The model is not the product; disciplined access to what you already wrote is.",
        };
      case 7:
        return {
          phase,
          title,
          lede:
            "Translations multiply reach while reusing the same canonical spine, languages become parallel entry ramps.",
          callout:
            "Shared infrastructure lowers the marginal cost of faithful expansion.",
        };
      default:
        return {
          phase,
          title,
          lede: "",
          callout: "",
        };
    }
  });
}
