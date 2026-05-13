/**
 * Per-organization workspace nav density (see `organizations.settings.workspaceNavPreset`).
 * Staff set JSON on the org row — no separate MCP or nav host.
 */
export type WorkspaceNavPreset = "default" | "sandbox_live_focus";

/**
 * Reads `settings.workspaceNavPreset`. Unknown or missing → `"default"`.
 * Valid values: `"default"` | `"sandbox_live_focus"`.
 */
export function resolveWorkspaceNavPreset(settings: unknown): WorkspaceNavPreset {
  const raw =
    settings && typeof settings === "object" && settings !== null
      ? (settings as Record<string, unknown>).workspaceNavPreset
      : undefined;
  if (raw === "sandbox_live_focus") return "sandbox_live_focus";
  return "default";
}
