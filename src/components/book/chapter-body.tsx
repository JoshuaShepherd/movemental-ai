import { BookRichText } from "@/components/book/book-rich-text";
import { cn } from "@/lib/utils";
import type { Paragraph } from "@/lib/book";

type ChapterBodyProps = {
  paragraphs: Paragraph[];
  className?: string;
};

/**
 * ChapterBody — renders the chapter's paragraphs as semantic HTML.
 *
 * Each paragraph gets a stable `id` for margin note anchoring and
 * text fragment linking. Markdown headings (##, ###) are rendered
 * as h2/h3; everything else as <p>.
 *
 * The `data-slot="chapter-body"` attribute lets HighlightShare
 * scope its selection listener to the reading content.
 */
export function ChapterBody({ paragraphs, className }: ChapterBodyProps) {
  return (
    <div
      data-slot="chapter-body"
      className={cn(
        "max-w-(--prose-max) text-base leading-[1.7] text-muted-foreground",
        "[&_strong]:text-foreground [&_em]:italic",
        className
      )}
    >
      {paragraphs.map((p) => {
        // ## Heading
        const h2Match = p.text.match(/^##\s+(.+)$/);
        if (h2Match) {
          return (
            <h2
              key={p.id}
              id={p.id}
              className="mb-4 mt-10 text-2xl font-semibold leading-tight tracking-[-0.02em] text-foreground first:mt-0"
            >
              <BookRichText markdown={h2Match[1]} />
            </h2>
          );
        }

        // ### Sub-heading
        const h3Match = p.text.match(/^###\s+(.+)$/);
        if (h3Match) {
          return (
            <h3
              key={p.id}
              id={p.id}
              className="mb-3 mt-8 text-xl font-semibold leading-tight text-foreground"
            >
              <BookRichText markdown={h3Match[1]} />
            </h3>
          );
        }

        // Blockquote
        if (p.text.startsWith("> ")) {
          return (
            <blockquote
              key={p.id}
              id={p.id}
              className="my-6 border-l-2 border-primary/20 pl-4 italic text-muted-foreground"
            >
              <BookRichText markdown={p.text.replace(/^>\s*/gm, "")} />
            </blockquote>
          );
        }

        // Unordered list
        if (p.text.match(/^[-*]\s/m)) {
          const items = p.text.split(/\n/).filter((l) => l.trim());
          return (
            <ul key={p.id} id={p.id} className="my-4 space-y-1.5 pl-5 list-disc marker:text-muted-foreground/55">
              {items.map((item, i) => (
                <li key={i}>
                  <BookRichText markdown={item.replace(/^[-*]\s+/, "")} />
                </li>
              ))}
            </ul>
          );
        }

        // Ordered list
        if (p.text.match(/^\d+\.\s/m)) {
          const items = p.text.split(/\n/).filter((l) => l.trim());
          return (
            <ol key={p.id} id={p.id} className="my-4 space-y-1.5 pl-5 list-decimal marker:text-muted-foreground/55">
              {items.map((item, i) => (
                <li key={i}>
                  <BookRichText markdown={item.replace(/^\d+\.\s+/, "")} />
                </li>
              ))}
            </ol>
          );
        }

        // Horizontal rule / separator
        if (p.text.match(/^---+$/)) {
          return <hr key={p.id} id={p.id} className="my-8 border-border/50" />;
        }

        // Regular paragraph — render inline markdown
        return (
          <p key={p.id} id={p.id} className="mb-4">
            <BookRichText markdown={p.text} />
          </p>
        );
      })}
    </div>
  );
}
