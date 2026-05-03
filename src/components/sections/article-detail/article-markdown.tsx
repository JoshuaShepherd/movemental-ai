import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { slugifyHeading } from "@/lib/articles";

/**
 * Extract plain text from a react-markdown children prop so we can derive a
 * stable heading id for scroll-spy + anchor links.
 */
function childrenToText(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(childrenToText).join("");
  if (children && typeof children === "object" && "props" in children) {
    const node = children as { props: { children?: React.ReactNode } };
    return childrenToText(node.props.children);
  }
  return "";
}

/**
 * Minimal element map — heading ids for anchoring, safer links, image captions.
 * All visual typography lives in `.article-prose` CSS (src/app/globals.css).
 */
const components: Components = {
  h2({ children, ...props }) {
    const id = props.id ?? slugifyHeading(childrenToText(children));
    return <h2 id={id}>{children}</h2>;
  },
  h3({ children, ...props }) {
    const id = props.id ?? slugifyHeading(childrenToText(children));
    return <h3 id={id}>{children}</h3>;
  },
  a({ href, children }) {
    const isExternal = Boolean(href?.startsWith("http"));
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
      >
        {children}
      </a>
    );
  },
  img({ src, alt }) {
    return (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} />
        {alt ? <figcaption>{alt}</figcaption> : null}
      </figure>
    );
  },
};

/**
 * Server-rendered long-form prose. Pinned to `--prose-max` (680px).
 * Typography rules live in the `.article-prose` block in `globals.css` so the
 * component tree stays a Server Component and the CSS stays inspectable.
 */
export function ArticleMarkdown({ markdown }: { markdown: string }) {
  return (
    <div className="article-prose max-w-(--prose-max)">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components} skipHtml>
        {markdown}
      </ReactMarkdown>
      <p aria-hidden="true" className="article-prose__end" />
    </div>
  );
}
