import { TableKit } from "@tiptap/extension-table";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import { StarterKit } from "@tiptap/starter-kit";

export function createOnbuildingMarkdownEditorExtensions(placeholder: string) {
  return [
    StarterKit.configure({
      heading: { levels: [1, 2, 3, 4] },
      link: {
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-2",
        },
      },
      bulletList: { HTMLAttributes: { class: "list-disc pl-6" } },
      orderedList: { HTMLAttributes: { class: "list-decimal pl-6" } },
    }),
    TableKit.configure({}),
    Placeholder.configure({ placeholder }),
    Highlight.configure({ multicolor: false }),
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    Subscript,
    Superscript,
  ];
}
