/**
 * `(site)` route group — URLs are unchanged; shared chrome lives in the root
 * `src/app/layout.tsx` (`SiteNav` + `SiteFooter`) so there is one layout to check.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
