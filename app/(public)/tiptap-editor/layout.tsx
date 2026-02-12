import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editor | Movemental',
  description: 'Clean, zen-like writing composition environment.',
}

export default function TiptapEditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
