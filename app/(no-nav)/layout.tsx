/**
 * Layout for pages that provide their own chrome (e.g. not-a-fit, auth modals).
 * No PublicNavigation or PublicFooter.
 */
export default function NoNavLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
