import type { EntityType } from "@/lib/knowledge-graph/types";

/** Tailwind classes for SVG / UI — semantic tokens only */
export function entityFillClass(type: EntityType): string {
  switch (type) {
    case "leader":
      return "fill-primary";
    case "book":
    case "publication":
      return "fill-foreground";
    case "article":
      return "fill-muted-foreground";
    case "video":
    case "audio":
    case "series":
      return "fill-primary/80";
    case "transcript":
    case "concept":
    case "topic":
      return "fill-secondary-foreground";
    case "pathway":
      return "fill-primary";
    case "course":
      return "fill-foreground";
    case "ai_layer":
      return "fill-primary";
    case "translation":
    case "language":
      return "fill-muted-foreground";
    case "organization":
      return "fill-muted-foreground";
    default:
      return "fill-muted-foreground";
  }
}

export function entityStrokeClass(type: EntityType): string {
  if (type === "ai_layer") return "stroke-primary stroke-2";
  return "stroke-border";
}
