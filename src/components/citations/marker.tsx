import type { ReactNode } from "react";

/**
 * `<Marker />` — paints a 38%-tall amber underline behind the wrapped phrase.
 * Use sparingly: at most one marker per paragraph, and only on the single
 * most editorially important phrase. It is a spotlight, not a background.
 */

export function Marker({
  children,
  as: Tag = "span",
  className,
}: {
  children: ReactNode;
  as?: "span" | "em" | "strong";
  className?: string;
}) {
  return (
    <Tag className={`marker${className ? ` ${className}` : ""}`}>
      {children}
    </Tag>
  );
}
