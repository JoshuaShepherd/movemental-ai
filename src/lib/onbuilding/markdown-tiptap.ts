import { marked } from "marked";
import TurndownService from "turndown";

marked.setOptions({ gfm: true, breaks: true });

const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
});

turndown.addRule("strikethrough", {
  filter: (node) =>
    node.nodeName === "DEL" || node.nodeName === "S" || node.nodeName === "STRIKE",
  replacement: (content) => `~~${content}~~`,
});

const tableAlignments: Record<string, string> = {
  left: ":---",
  center: ":---:",
  right: "---:",
};

function isHeadingRow(node: TurndownService.Node): boolean {
  const parent = node.parentNode;
  if (parent && parent.nodeName === "THEAD") return true;
  const row = node as HTMLTableRowElement;
  if (!row.querySelector("th")) return false;
  const table = row.closest("table");
  if (!table) return false;
  return table.querySelector("tr") === row;
}

turndown.addRule("tableSection", {
  filter: ["thead", "tbody", "tfoot"],
  replacement: (content) => content,
});

turndown.addRule("tableCell", {
  filter: ["th", "td"],
  replacement: (content) => ` ${content.trim().replace(/\|/g, "\\|")} |`,
});

turndown.addRule("tableRow", {
  filter: "tr",
  replacement(content, node) {
    let borderCells = "";
    if (isHeadingRow(node)) {
      const row = node as HTMLTableRowElement;
      for (let i = 0; i < row.childNodes.length; i += 1) {
        const cell = row.childNodes[i] as HTMLElement | undefined;
        const align = cell?.getAttribute("align") ?? "";
        const border = tableAlignments[align] ?? "---";
        borderCells += `| ${border} `;
      }
      borderCells += "|";
    }
    return `\n|${content}|${borderCells ? `\n${borderCells}` : ""}`;
  },
});

turndown.addRule("table", {
  filter: "table",
  replacement: (content) => `\n\n${content.trim()}\n\n`,
});

export function markdownToEditorHtml(markdown: string): string {
  const trimmed = markdown.trim();
  if (!trimmed) return "<p></p>";
  const html = marked.parse(trimmed, { async: false }) as string;
  return html.trim() || "<p></p>";
}

export function editorHtmlToMarkdown(html: string): string {
  const trimmed = html.trim();
  if (!trimmed || trimmed === "<p></p>") return "";
  return turndown.turndown(trimmed).trim();
}
