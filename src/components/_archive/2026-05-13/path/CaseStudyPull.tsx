/**
 * CaseStudyPull — italic-serif drop-quote with curly opening pseudo-quote.
 * Uses border-l-2 ink and a `before:` curly quote glyph.
 */
export function CaseStudyPull({ children }: { children: string }) {
  return (
    <p
      className="
        relative font-serif italic font-normal text-foreground
        text-[clamp(1.3rem,2.2vw,1.65rem)] leading-[1.4]
        max-w-[50ch] pl-5 my-6 border-l-2 border-foreground tracking-tight
        before:content-['\\201C'] before:absolute before:-left-1 before:-top-3
        before:font-serif before:text-[2.2em] before:leading-none before:text-foreground/30
      "
    >
      {children}
    </p>
  );
}
