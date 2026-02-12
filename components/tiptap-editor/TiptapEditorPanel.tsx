'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Link2,
  ChevronLeft,
  FileText,
  FolderOpen,
  Search,
  Send,
  Rss,
} from 'lucide-react'

const DEFAULT_CONTENT = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [{ type: 'text', text: 'Julian & Sarah Wedding' }],
    },
    {
      type: 'paragraph',
      content: [{ type: 'text', text: 'An excerpt of the wedding vows' }],
    },
    {
      type: 'blockquote',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "I promise to love you, to honor you, and to cherish you. I will stand beside you in good times and in bad, in sickness and in health. Wherever you go, I will go. Your people will be my people, and your God will be my God. I give you my heart, my faithfulness, and my devotion. From this day forward, you will never walk alone.",
            },
          ],
        },
      ],
    },
  ],
}

function ToolbarButton({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void
  active?: boolean
  children: React.ReactNode
  title: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-white/10"
      style={{
        color: active ? 'var(--color-bright-snow-50)' : 'var(--color-bright-snow-400)',
      }}
    >
      {children}
    </button>
  )
}

export function TiptapEditorPanel() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-2 border-white/20 pl-4 my-4',
          },
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[var(--color-velvet-orchid-400)] underline underline-offset-2 hover:text-[var(--color-velvet-orchid-300)]',
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing…',
      }),
    ],
    content: DEFAULT_CONTENT,
    editorProps: {
      attributes: {
        class:
          'tiptap-editor-content focus:outline-none min-h-[280px] px-1',
        style:
          'font-family: var(--font-inter), system-ui, sans-serif; color: var(--color-bright-snow-200); line-height: 1.7;',
      },
    },
  })

  if (!editor) return null

  return (
    <div className="flex h-full w-full min-h-0">
      {/* Left sidebar */}
      <aside
        className="flex w-14 shrink-0 flex-col items-center gap-6 border-r border-white/10 bg-[var(--color-sage-950)] py-4"
        style={{ background: 'var(--color-sage-950)' }}
      >
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-white/10"
          style={{ color: 'var(--color-bright-snow-400)' }}
          title="Documents"
        >
          <FileText size={20} />
        </button>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-white/10"
          style={{ color: 'var(--color-bright-snow-400)' }}
          title="Folders"
        >
          <FolderOpen size={20} />
        </button>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-white/10"
          style={{ color: 'var(--color-bright-snow-400)' }}
          title="Search"
        >
          <Search size={20} />
        </button>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-white/10"
          style={{ color: 'var(--color-bright-snow-400)' }}
          title="Share"
        >
          <Send size={20} />
        </button>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-white/10"
          style={{ color: 'var(--color-bright-snow-400)' }}
          title="Feed"
        >
          <Rss size={20} />
        </button>
        <div className="mt-auto flex flex-col items-center gap-2">
          <div
            className="h-8 w-8 rounded-full bg-white/20"
            title="Profile"
          />
          <span
            className="text-[10px]"
            style={{ color: 'var(--color-bright-snow-500)' }}
          >
            Edit profile
          </span>
        </div>
      </aside>

      {/* Main editor panel */}
      <div
        className="flex flex-1 flex-col min-w-0"
        style={{
          background: 'var(--color-sage-900)',
        }}
      >
        {/* Toolbar */}
        <div
          className="flex shrink-0 items-center gap-2 border-b border-white/10 px-4 py-3"
          style={{
            fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          }}
        >
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-white/10"
            style={{ color: 'var(--color-bright-snow-400)' }}
            title="Back"
          >
            <ChevronLeft size={20} />
          </button>
          <span
            className="rounded px-2.5 py-1 text-xs font-medium"
            style={{
              background: 'rgba(255,255,255,0.12)',
              color: 'var(--color-bright-snow-300)',
            }}
          >
            Draft
          </span>
          <div className="h-4 w-px bg-white/20" />
          <button
            type="button"
            className="rounded px-2 py-1 text-xs transition-colors hover:bg-white/10"
            style={{ color: 'var(--color-bright-snow-400)' }}
          >
            Turn into
          </button>
          <button
            type="button"
            className="rounded px-2 py-1 text-xs transition-colors hover:bg-white/10"
            style={{ color: 'var(--color-bright-snow-400)' }}
          >
            Insert
          </button>
          <div className="h-4 w-px bg-white/20" />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            title="Bold"
          >
            <Bold size={18} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            title="Italic"
          >
            <Italic size={18} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive('strike')}
            title="Strikethrough"
          >
            <Strikethrough size={18} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive('code')}
            title="Code"
          >
            <Code size={18} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleLink({ href: 'https://' }).run()}
            active={editor.isActive('link')}
            title="Link"
          >
            <Link2 size={18} strokeWidth={2} />
          </ToolbarButton>
        </div>

        {/* Content area */}
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-8">
            <EditorContent editor={editor} />
          </div>

          {/* Footer actions */}
          <div
            className="flex shrink-0 items-center justify-end gap-3 border-t border-white/10 px-6 py-4"
            style={{
              fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
            }}
          >
            <button
              type="button"
              className="text-sm transition-colors hover:opacity-80"
              style={{ color: 'var(--color-bright-snow-400)' }}
            >
              Close
            </button>
            <button
              type="button"
              className="rounded px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
              style={{
                background: 'var(--color-sage-700)',
                color: 'var(--color-bright-snow-50)',
              }}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
