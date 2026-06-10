"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  CORPUS_FILES,
  FOLDER_ROOTS,
  MASTER_ROOT,
  type FolderNode,
  type FolderRoot,
  type TreeNode,
} from "./corpus-data";
import styles from "./fragmentation-deck.module.css";

/** Local navigation state — the rootId is derived from the prop. */
type BrowserState =
  | { view: "folder"; path: string[] }
  | { view: "file"; path: string[]; fileKey: string };

type IntegrationBrowserProps = {
  /** When non-null, the browser is open at this root id. */
  openFolderId: string | null;
  onClose: () => void;
};

/**
 * Walk the root's tree to the folder at `path` (excluding root name itself).
 * Returns the folder node and its accumulated breadcrumb labels.
 */
function walkTo(
  root: FolderRoot,
  path: string[],
): { folder: FolderNode; crumbs: { label: string; index: number }[] } {
  let current: FolderNode = root.root;
  const crumbs: { label: string; index: number }[] = [
    { label: root.label, index: 0 },
  ];
  for (let i = 1; i < path.length; i += 1) {
    const name = path[i];
    const next = current.children.find(
      (child): child is FolderNode =>
        child.type === "folder" && child.name === name,
    );
    if (!next) break;
    current = next;
    crumbs.push({ label: name, index: i + 1 });
  }
  return { folder: current, crumbs };
}

function resolveRoot(rootId: string): FolderRoot {
  if (rootId === "root") return MASTER_ROOT;
  return FOLDER_ROOTS.find((r) => r.id === rootId) ?? FOLDER_ROOTS[0];
}

function FileIcon({ kind }: { kind: "json" | "md" }) {
  if (kind === "json") return <span className={styles.treeTwigJson}>{"{ }"}</span>;
  return <span className={styles.treeTwigMd}>M</span>;
}

function TreeRow({
  node,
  onOpenFolder,
  onOpenFile,
}: {
  node: TreeNode;
  onOpenFolder: (name: string) => void;
  onOpenFile: (fileKey: string) => void;
}) {
  if (node.type === "ellipsis") {
    return <div className={styles.treeEllipsis}>{node.text}</div>;
  }

  if (node.type === "folder") {
    return (
      <button
        type="button"
        className={styles.treeRowFolder}
        onClick={() => onOpenFolder(node.name)}
      >
        <span className={styles.treeTwigFolder} aria-hidden="true">
          ▸
        </span>
        <span className={styles.treeName}>{node.name}/</span>
        <span className={styles.treeMeta}>{node.meta ?? ""}</span>
      </button>
    );
  }

  const kind = node.name.endsWith(".json")
    ? "json"
    : node.name.endsWith(".md")
      ? "md"
      : "md";
  const rowClass = [
    styles.treeRowFile,
    node.featured ? styles.treeRowFeatured : "",
    node.dim ? styles.treeRowDim : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={rowClass}
      onClick={() => onOpenFile(node.fileKey)}
    >
      <FileIcon kind={kind} />
      <span className={styles.treeName}>{node.name}</span>
      <span className={styles.treeMeta}>{node.size ?? ""}</span>
    </button>
  );
}

export function IntegrationBrowser({
  openFolderId,
  onClose,
}: IntegrationBrowserProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [state, setState] = useState<BrowserState>({ view: "folder", path: [] });
  const [prevOpenFolderId, setPrevOpenFolderId] = useState<string | null>(
    openFolderId,
  );

  /* React-recommended pattern: reset derived state when a prop changes by
     comparing against a tracked previous value during render. */
  if (prevOpenFolderId !== openFolderId) {
    setPrevOpenFolderId(openFolderId);
    if (openFolderId) {
      setState({ view: "folder", path: [] });
    }
  }

  /* Show / hide the native <dialog> to match the prop. */
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (openFolderId) {
      if (!dlg.open) dlg.showModal();
    } else if (dlg.open) {
      dlg.close();
    }
  }, [openFolderId]);

  /* Forward native close events back to the parent. */
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const handle = () => onClose();
    dlg.addEventListener("close", handle);
    return () => dlg.removeEventListener("close", handle);
  }, [onClose]);

  const resolved = useMemo(() => {
    if (!openFolderId) return null;
    const root = resolveRoot(openFolderId);
    const fullPath = state.path.length ? [root.root.name, ...state.path] : [root.root.name];
    const { folder, crumbs } = walkTo(root, fullPath);
    return { root, folder, crumbs };
  }, [openFolderId, state.path]);

  const file =
    state.view === "file" ? CORPUS_FILES[state.fileKey] ?? null : null;

  const handleOpenFolder = (name: string) => {
    setState({ view: "folder", path: [...state.path, name] });
  };

  const handleOpenFile = (fileKey: string) => {
    setState({ view: "file", path: state.path, fileKey });
  };

  const handleCrumb = (index: number) => {
    if (!resolved) return;
    if (index === 0) {
      setState({ view: "folder", path: [] });
      return;
    }
    const newPath = state.path.slice(0, index - 1);
    setState({ view: "folder", path: newPath });
  };

  const handleBackToFolder = () => {
    setState({ view: "folder", path: state.path });
  };

  const handleUp = () => {
    if (state.path.length === 0) return;
    setState({ view: "folder", path: state.path.slice(0, -1) });
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="integration-browser-title"
    >
      <header className={styles.dialogHead}>
        <div className={styles.dialogHeadMeta}>
          <p className={styles.dialogKicker}>
            {resolved ? `${resolved.root.kicker}${resolved.root.root.name}` : "corpus/"}
          </p>
          <h2 id="integration-browser-title" className={styles.dialogTitle}>
            {state.view === "file" && file ? file.name : resolved?.root.label}
          </h2>
          {resolved && state.view === "folder" && (
            <nav className={styles.breadcrumbs} aria-label="Folder breadcrumbs">
              {resolved.crumbs.map((c, i) => (
                <span key={`${c.index}-${c.label}`} className={styles.crumb}>
                  <button
                    type="button"
                    onClick={() => handleCrumb(i)}
                    className={styles.crumbBtn}
                    disabled={i === resolved.crumbs.length - 1}
                  >
                    {c.label}
                  </button>
                  {i < resolved.crumbs.length - 1 && (
                    <span aria-hidden="true" className={styles.crumbSep}>
                      ›
                    </span>
                  )}
                </span>
              ))}
            </nav>
          )}
          {state.view === "file" && file?.kind === "md" && file.sub && (
            <p className={styles.dialogSub}>{file.sub}</p>
          )}
        </div>
        <button
          type="button"
          className={styles.dialogClose}
          aria-label="Close"
          onClick={() => dialogRef.current?.close()}
        >
          ×
        </button>
      </header>

      {state.view === "folder" && resolved && (
        <>
          <p
            className={styles.dialogLede}
            dangerouslySetInnerHTML={{ __html: resolved.root.context }}
          />
          <div className={styles.tree} role="tree" aria-label="Folder contents">
            {state.path.length > 0 && (
              <button
                type="button"
                className={styles.treeUpRow}
                onClick={handleUp}
              >
                <span className={styles.treeTwigFolder} aria-hidden="true">
                  ↑
                </span>
                <span className={styles.treeName}>..</span>
                <span className={styles.treeMeta}>up one level</span>
              </button>
            )}
            {resolved.folder.children.map((child, i) => (
              <TreeRow
                key={`${child.type}-${i}-${"name" in child ? child.name : "ellipsis"}`}
                node={child}
                onOpenFolder={handleOpenFolder}
                onOpenFile={handleOpenFile}
              />
            ))}
          </div>
          <p className={styles.dialogFineprint}>
            Click any <code>.json</code> or <code>.md</code> file to preview it, or drill into a
            subfolder to see how deep the ingest goes.
          </p>
        </>
      )}

      {state.view === "file" && file && (
        <div className={styles.filePane}>
          <div className={styles.fileToolbar}>
            <button
              type="button"
              className={styles.fileBack}
              onClick={handleBackToFolder}
            >
              ← Back to folder
            </button>
          </div>
          {file.kind === "json" ? (
            <pre className={styles.jsonBody}>
              {JSON.stringify(file.body, null, 2)}
            </pre>
          ) : (
            <article
              className={styles.mdBody}
              dangerouslySetInnerHTML={{ __html: file.html }}
            />
          )}
        </div>
      )}
    </dialog>
  );
}
