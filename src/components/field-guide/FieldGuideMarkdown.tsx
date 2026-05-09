import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { slugifyHeading } from "@/lib/articles";

function childrenToText(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(childrenToText).join("");
  if (children && typeof children === "object" && "props" in children) {
    const node = children as { props: { children?: React.ReactNode } };
    return childrenToText(node.props.children);
  }
  return "";
}

const components: Components = {
  h1() {
    // The page renders the title in the cover section; suppress the duplicate H1 in the body.
    return null;
  },
  h2({ children, ...props }) {
    const id = props.id ?? slugifyHeading(childrenToText(children));
    return (
      <h2 id={id} className="field-guide-prose__h2">
        {children}
      </h2>
    );
  },
  h3({ children, ...props }) {
    const id = props.id ?? slugifyHeading(childrenToText(children));
    return (
      <h3 id={id} className="field-guide-prose__h3">
        {children}
      </h3>
    );
  },
  h4({ children, ...props }) {
    const id = props.id ?? slugifyHeading(childrenToText(children));
    return (
      <h4 id={id} className="field-guide-prose__h4">
        {children}
      </h4>
    );
  },
  hr() {
    return <hr className="field-guide-prose__rule" />;
  },
  a({ href, children }) {
    const isExternal = Boolean(href?.startsWith("http"));
    const isFootnoteRef = typeof href === "string" && href.startsWith("#user-content-fn");
    return (
      <a
        href={href}
        target={isExternal && !isFootnoteRef ? "_blank" : undefined}
        rel={isExternal && !isFootnoteRef ? "noreferrer" : undefined}
      >
        {children}
      </a>
    );
  },
};

/**
 * Editorial long-form markdown renderer for the Field Guide. Typography rules
 * live in the `.field-guide-prose` block in globals.css.
 */
export function FieldGuideMarkdown({ markdown }: { markdown: string }) {
  return (
    <div className="field-guide-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components} skipHtml>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
