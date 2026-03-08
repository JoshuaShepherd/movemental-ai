/**
 * Site-wide banner: under construction / preview mode.
 * Fixed at top; layout uses --preview-banner-height for nav offset.
 * Styled per design system: muted, border, typography.
 */
export function PreviewBanner() {
  return (
    <div
      role="region"
      aria-label="Site notice"
      className="fixed left-0 right-0 top-0 z-[100] flex h-[var(--preview-banner-height)] items-center justify-center border-b border-border bg-muted px-4 text-center"
    >
      <p className="text-sm font-medium text-muted-foreground">
        This site is under construction and in preview. Content and features may change.
      </p>
    </div>
  );
}
