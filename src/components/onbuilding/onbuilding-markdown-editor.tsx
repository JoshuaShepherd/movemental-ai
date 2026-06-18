"use client";

import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Bold, Italic, Link2, List, ListOrdered, Quote, Redo2, Undo2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createOnbuildingMarkdownEditorExtensions } from "@/lib/onbuilding/onbuilding-editor-extensions";
import { editorHtmlToMarkdown, markdownToEditorHtml } from "@/lib/onbuilding/markdown-tiptap";
import { cn } from "@/lib/utils";

const PROSE =
  "onbuilding-markdown-editor w-full rounded-lg border border-border bg-background " +
  "[&_.ProseMirror]:min-h-[280px] [&_.ProseMirror]:px-4 [&_.ProseMirror]:py-3 [&_.ProseMirror]:outline-none " +
  "[&_.ProseMirror_p]:mb-4 [&_.ProseMirror_p:last-child]:mb-0 " +
  "[&_.ProseMirror_h1]:font-serif [&_.ProseMirror_h1]:text-2xl [&_.ProseMirror_h1]:font-medium [&_.ProseMirror_h1]:mb-4 " +
  "[&_.ProseMirror_h2]:font-serif [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-medium [&_.ProseMirror_h2]:mb-3 " +
  "[&_.ProseMirror_h3]:font-serif [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-medium [&_.ProseMirror_h3]:mb-2 " +
  "[&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ul]:mb-4 " +
  "[&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_ol]:mb-4 " +
  "[&_.ProseMirror_blockquote]:border-l-2 [&_.ProseMirror_blockquote]:border-border [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic " +
  "[&_.ProseMirror_a]:text-primary [&_.ProseMirror_a]:underline [&_.ProseMirror_a]:underline-offset-2 " +
  "[&_.ProseMirror_table]:w-full [&_.ProseMirror_table]:border-collapse [&_.ProseMirror_table]:my-4 " +
  "[&_.ProseMirror_th]:border [&_.ProseMirror_th]:border-border [&_.ProseMirror_th]:px-3 [&_.ProseMirror_th]:py-2 [&_.ProseMirror_th]:text-left " +
  "[&_.ProseMirror_td]:border [&_.ProseMirror_td]:border-border [&_.ProseMirror_td]:px-3 [&_.ProseMirror_td]:py-2 [&_.ProseMirror_td]:align-top [&_.ProseMirror_td]:text-sm";

function ToolbarBtn({
  onClick,
  active,
  title,
  children,
  disabled,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8", active && "bg-muted")}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      aria-label={title}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

export type OnbuildingMarkdownEditorProps = {
  markdown: string;
  onMarkdownChange: (markdown: string) => void;
  placeholder?: string;
  className?: string;
};

export function OnbuildingMarkdownEditor({
  markdown,
  onMarkdownChange,
  placeholder = "Write section markdown…",
  className,
}: OnbuildingMarkdownEditorProps) {
  const onChangeRef = React.useRef(onMarkdownChange);
  const initialHtml = React.useMemo(() => markdownToEditorHtml(markdown), [markdown]);
  const editorKey = React.useMemo(
    () => `${markdown.length}:${markdown.slice(0, 48)}`,
    [markdown],
  );

  React.useEffect(() => {
    onChangeRef.current = onMarkdownChange;
  }, [onMarkdownChange]);

  const editor = useEditor(
    {
      immediatelyRender: false,
      extensions: createOnbuildingMarkdownEditorExtensions(placeholder),
      content: initialHtml,
      editorProps: {
        attributes: { class: "text-base leading-relaxed text-foreground" },
      },
      onUpdate: ({ editor: ed }) => {
        onChangeRef.current(editorHtmlToMarkdown(ed.getHTML()));
      },
    },
    [editorKey],
  );

  const setLink = React.useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", prev ?? "https://");
    if (url === null) return;
    const t = url.trim();
    if (t === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: t }).run();
  }, [editor]);

  if (!editor) {
    return (
      <div className={cn(PROSE, className)}>
        <div className="h-[280px] animate-pulse bg-muted/40" />
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap items-center gap-0.5 rounded-lg border border-border bg-muted/30 px-1 py-1">
        <ToolbarBtn
          title="Undo"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 className="size-4" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Redo"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 className="size-4" />
        </ToolbarBtn>
        <span className="mx-1 h-5 w-px bg-border" aria-hidden />
        <ToolbarBtn
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="size-4" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="size-4" />
        </ToolbarBtn>
        <span className="mx-1 h-5 w-px bg-border" aria-hidden />
        <ToolbarBtn
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="size-4" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="size-4" />
        </ToolbarBtn>
        <ToolbarBtn
          title="Blockquote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="size-4" />
        </ToolbarBtn>
        <ToolbarBtn title="Link" active={editor.isActive("link")} onClick={setLink}>
          <Link2 className="size-4" />
        </ToolbarBtn>
      </div>
      <EditorContent editor={editor} className={PROSE} />
    </div>
  );
}
