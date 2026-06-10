import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders manuscript markdown (emphasis, strong, links, GFM extras) with
 * Movemental reading-surface tokens. Used anywhere chapter prose needs inline
 * markdown — paragraphs, blockquotes, list items, and substrings in headings.
 *
 * Headings are disallowed here because this component is often nested inside
 * `<p>`, `<li>`, or `<h2>`; embedded `##` lines would otherwise produce invalid HTML.
 */
const bookMarkdownComponents = {
  p({ children }) {
    return <>{children}</>;
  },
  strong({ children }) {
    return <strong className="font-semibold text-foreground">{children}</strong>;
  },
  em({ children }) {
    return <em className="italic text-foreground/95">{children}</em>;
  },
  a({ href, children }) {
    return (
      <a
        href={href}
        className="text-primary underline decoration-primary/40 underline-offset-[3px] transition-opacity hover:opacity-80"
      >
        {children}
      </a>
    );
  },
  code({ className, children, ...props }) {
    const isFence = Boolean(className?.startsWith("language-"));
    if (isFence) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded bg-muted px-1 py-0.5 font-mono text-[0.875em] text-foreground"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre({ children }) {
    return (
      <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 text-sm leading-relaxed text-foreground">
        {children}
      </pre>
    );
  },
  del({ children }) {
    return <del className="text-muted-foreground line-through">{children}</del>;
  },
} satisfies Components;

export function BookRichText({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={bookMarkdownComponents}
      disallowedElements={["h1", "h2", "h3", "h4", "h5", "h6"]}
      unwrapDisallowed
      skipHtml
    >
      {markdown}
    </ReactMarkdown>
  );
}
