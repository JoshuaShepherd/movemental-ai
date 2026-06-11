/**
 * Sync agent-room public corpus files to an OpenAI vector store.
 *
 * Reads docs/build/agents/agent-room/files/MANIFEST.json, uploads changed
 * public markdown + PDF files, attaches them with per-file attributes + chunking.
 *
 *   pnpm agent-room:corpus:sync -- --dry-run
 *   OPENAI_VECTOR_STORE_ID=vs_xxx pnpm agent-room:corpus:sync
 *   OPENAI_VECTOR_STORE_ID=vs_xxx pnpm agent-room:corpus:sync -- --force
 */
import { createHash } from "node:crypto";
import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
} from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadEnv({ path: join(__dirname, "..", ".env.local") });
loadEnv({ path: join(__dirname, "..", ".env") });

const REPO_ROOT = resolve(__dirname, "..");
const FILES_DIR = resolve(REPO_ROOT, "docs/build/agents/agent-room/files");
const MANIFEST_PATH = join(FILES_DIR, "MANIFEST.json");
const STATE_PATH = join(FILES_DIR, ".corpus-sync-state.json");

const OPENAI_API = "https://api.openai.com/v1";

type ManifestDoc = {
  path: string;
  document_id: string;
  format?: "markdown" | "pdf";
  upload: boolean;
  reason?: string;
  openai_attributes?: Record<string, string | number | boolean>;
  chunking_override?: {
    type: "static" | "auto";
    static?: { max_chunk_size_tokens: number; chunk_overlap_tokens: number };
  };
};

function fileFormat(doc: ManifestDoc, absPath: string): "markdown" | "pdf" {
  if (doc.format) return doc.format;
  return absPath.toLowerCase().endsWith(".pdf") ? "pdf" : "markdown";
}

function uploadFilename(documentId: string, format: "markdown" | "pdf"): string {
  return format === "pdf" ? `${documentId}.pdf` : `${documentId}.md`;
}

function uploadMimeType(format: "markdown" | "pdf"): string {
  return format === "pdf" ? "application/pdf" : "text/markdown";
}

type Manifest = {
  corpus_id: string;
  binding_slug: string;
  version: string;
  documents: ManifestDoc[];
};

type SyncState = {
  version: string;
  files: Record<
    string,
    { sha256: string; openai_file_id: string; vector_store_file_id?: string }
  >;
};

function parseArgs(argv: string[]) {
  return {
    dryRun: argv.includes("--dry-run"),
    force: argv.includes("--force"),
  };
}

function sha256File(absPath: string): string {
  const buf = readFileSync(absPath);
  return createHash("sha256").update(buf).digest("hex");
}

function loadManifest(): Manifest {
  return JSON.parse(readFileSync(MANIFEST_PATH, "utf8")) as Manifest;
}

function loadState(): SyncState {
  if (!existsSync(STATE_PATH)) {
    return { version: "1", files: {} };
  }
  return JSON.parse(readFileSync(STATE_PATH, "utf8")) as SyncState;
}

function saveState(state: SyncState) {
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + "\n");
}

async function openaiFetch(
  apiKey: string,
  path: string,
  init: RequestInit & { body?: BodyInit | null } = {},
): Promise<Response> {
  const res = await fetch(`${OPENAI_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      ...(init.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(init.headers as Record<string, string> | undefined),
    },
  });
  return res;
}

async function uploadFile(
  apiKey: string,
  absPath: string,
  documentId: string,
  format: "markdown" | "pdf",
): Promise<string> {
  const form = new FormData();
  const blob = new Blob([readFileSync(absPath)], { type: uploadMimeType(format) });
  form.append("file", blob, uploadFilename(documentId, format));
  form.append("purpose", "assistants");

  const res = await openaiFetch(apiKey, "/files", { method: "POST", body: form });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`File upload failed (${res.status}): ${err}`);
  }
  const json = (await res.json()) as { id: string };
  return json.id;
}

async function attachToVectorStore(
  apiKey: string,
  vectorStoreId: string,
  fileId: string,
  doc: ManifestDoc,
): Promise<string> {
  const body: Record<string, unknown> = { file_id: fileId };
  if (doc.openai_attributes) body.attributes = doc.openai_attributes;
  if (doc.chunking_override) body.chunking_strategy = doc.chunking_override;

  const res = await openaiFetch(apiKey, `/vector_stores/${vectorStoreId}/files`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Vector store attach failed (${res.status}): ${err}`);
  }
  const json = (await res.json()) as { id: string };
  return json.id;
}

async function main() {
  const { dryRun, force } = parseArgs(process.argv.slice(2));
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID?.trim();

  if (!apiKey && !dryRun) {
    console.error("OPENAI_API_KEY is required (set in .env.local)");
    process.exit(1);
  }
  if (!vectorStoreId && !dryRun) {
    console.error("OPENAI_VECTOR_STORE_ID is required (create store in OpenAI Platform)");
    process.exit(1);
  }

  const manifest = loadManifest();
  const state = loadState();
  const uploadDocs = manifest.documents.filter((d) => d.upload);

  console.log(`Corpus: ${manifest.corpus_id} v${manifest.version}`);
  console.log(`Binding slug: ${manifest.binding_slug}`);
  console.log(`Documents to sync: ${uploadDocs.length}`);
  if (dryRun) console.log("(dry run — no API calls)\n");

  let uploaded = 0;
  let skipped = 0;

  for (const doc of uploadDocs) {
    const absPath = join(FILES_DIR, doc.path);
    if (!existsSync(absPath)) {
      console.error(`Missing file: ${doc.path}`);
      process.exit(1);
    }

    const hash = sha256File(absPath);
    const prev = state.files[doc.document_id];

    if (!force && prev?.sha256 === hash && prev.openai_file_id) {
      console.log(`skip  ${doc.document_id}  (unchanged)`);
      skipped++;
      continue;
    }

    console.log(`${force ? "force" : "sync"}  ${doc.document_id}  ${doc.path}`);
    if (dryRun) {
      uploaded++;
      continue;
    }

    const format = fileFormat(doc, absPath);
    const fileId = await uploadFile(apiKey!, absPath, doc.document_id, format);
    const vsFileId = await attachToVectorStore(apiKey!, vectorStoreId!, fileId, doc);

    state.files[doc.document_id] = {
      sha256: hash,
      openai_file_id: fileId,
      vector_store_file_id: vsFileId,
    };
    uploaded++;
    console.log(`  → file ${fileId}, vector_store_file ${vsFileId}`);
  }

  if (!dryRun) {
    saveState(state);
  }

  console.log(`\nDone: ${uploaded} uploaded, ${skipped} skipped`);
  if (!dryRun && uploaded > 0) {
    console.log(
      "\nNext: register binding in Postgres (movemental-ai-agents):\n" +
        `  CORPUS_BINDING_SLUG=${manifest.binding_slug} OPENAI_VECTOR_STORE_ID=${vectorStoreId} pnpm seed:corpus-binding`,
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
