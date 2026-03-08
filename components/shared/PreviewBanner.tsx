/**
 * Site-wide banner indicating the application is under construction and in preview.
 * Rendered at the root layout so it appears on every page.
 * Best practice: persistent, accessible, non-dismissible so all users see the notice.
 */
export function PreviewBanner() {
  return (
    <div
      role="region"
      aria-label="Site notice"
      className="relative z-50 w-full border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm font-medium text-amber-900 dark:border-amber-800 dark:bg-amber-950/90 dark:text-amber-100"
    >
      <span className="inline-flex items-center gap-2">
        <span aria-hidden className="text-amber-600 dark:text-amber-400">
          ◆
        </span>
        This site is under construction and in preview. Content and features may change.
      </span>
    </div>
  );
}
