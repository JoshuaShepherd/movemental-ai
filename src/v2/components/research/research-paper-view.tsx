import { ResearchArticle } from "@/components/research/research-article";
import type { ResearchItem } from "@/lib/research/data";

interface ResearchPaperViewProps {
  item: ResearchItem;
}

/**
 * Staging view for Movemental Research Paper Detail.
 * Matches design specification in Movemental Research Paper.dc.html.
 */
export function ResearchPaperView({ item }: ResearchPaperViewProps) {
  return <ResearchArticle item={item} />;
}
