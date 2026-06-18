"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

import { OnbuildingMarkdownEditor } from "@/components/onbuilding/onbuilding-markdown-editor";
import { Button } from "@/components/ui/button";
import {
  useOnbuildingAdminLeaders,
  useOnbuildingAdminMutations,
  useOnbuildingAdminSections,
} from "@/hooks/onbuilding/use-onbuilding-admin";
import type { OnbuildingAdminSection } from "@/lib/schemas/onbuilding-admin";
import { cn } from "@/lib/utils";

function StatusChip({ status }: { status: string }) {
  const tone =
    status === "ratified"
      ? "bg-emerald-100 text-emerald-900"
      : status === "edited"
        ? "bg-amber-100 text-amber-900"
        : "bg-muted text-muted-foreground";

  return (
    <span className={cn("rounded-full px-2 py-0.5 text-[0.65rem] font-mono uppercase tracking-wide", tone)}>
      {status}
    </span>
  );
}

function formatTimestamp(value: string | null) {
  if (!value) return "Never";
  return new Date(value).toLocaleString();
}

export function OnbuildingCompositionEditor() {
  const leadersQuery = useOnbuildingAdminLeaders();
  const [leaderFilter, setLeaderFilter] = React.useState("");
  const [selectedLeaderId, setSelectedLeaderId] = React.useState<string | null>(null);
  const [selectedSectionId, setSelectedSectionId] = React.useState<string | null>(null);

  const sectionsQuery = useOnbuildingAdminSections(selectedLeaderId);
  const mutations = useOnbuildingAdminMutations(selectedLeaderId);

  const sections = sectionsQuery.data?.sections ?? [];
  const selectedSection = sections.find((s) => s.id === selectedSectionId) ?? null;

  const [draftTitle, setDraftTitle] = React.useState("");
  const [draftBodyMd, setDraftBodyMd] = React.useState("");
  const [clearRatification, setClearRatification] = React.useState(false);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newSectionKey, setNewSectionKey] = React.useState("");
  const [newSectionTitle, setNewSectionTitle] = React.useState("");
  const [actionError, setActionError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!selectedSection) {
      setDraftTitle("");
      setDraftBodyMd("");
      setClearRatification(false);
      return;
    }
    setDraftTitle(selectedSection.title);
    setDraftBodyMd(selectedSection.bodyMd);
    setClearRatification(false);
  }, [selectedSection?.id, selectedSection?.title, selectedSection?.bodyMd]);

  React.useEffect(() => {
    if (sections.length === 0) {
      setSelectedSectionId(null);
      return;
    }
    if (!selectedSectionId || !sections.some((s) => s.id === selectedSectionId)) {
      setSelectedSectionId(sections[0]!.id);
    }
  }, [sections, selectedSectionId]);

  const leaders = leadersQuery.data?.leaders ?? [];
  const filteredLeaders = leaders.filter((leader) => {
    const q = leaderFilter.trim().toLowerCase();
    if (!q) return true;
    return leader.fullName.toLowerCase().includes(q) || leader.slug.toLowerCase().includes(q);
  });

  const isDirty =
    selectedSection != null &&
    (draftTitle !== selectedSection.title || draftBodyMd !== selectedSection.bodyMd);

  async function handleSave() {
    if (!selectedSection) return;
    setActionError(null);
    try {
      await mutations.updateSection.mutateAsync({
        id: selectedSection.id,
        patch: {
          title: draftTitle,
          bodyMd: draftBodyMd,
          clearRatification: clearRatification || undefined,
        },
      });
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Save failed.");
    }
  }

  async function handleDelete(section: OnbuildingAdminSection) {
    const confirmCopy =
      section.status === "ratified"
        ? `Delete ratified section "${section.title}"? This cannot be undone.`
        : `Delete section "${section.title}"?`;
    if (!window.confirm(confirmCopy)) return;
    setActionError(null);
    try {
      await mutations.deleteSection.mutateAsync(section.id);
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Delete failed.");
    }
  }

  async function handleCreateSection(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedLeaderId) return;
    setActionError(null);
    try {
      const result = await mutations.createSection.mutateAsync({
        movementLeaderId: selectedLeaderId,
        sectionKey: newSectionKey.trim(),
        title: newSectionTitle.trim(),
        bodyMd: "",
      });
      setShowAddForm(false);
      setNewSectionKey("");
      setNewSectionTitle("");
      setSelectedSectionId(result.section.id);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Create failed.");
    }
  }

  async function moveSection(sectionId: string, direction: "up" | "down") {
    const ids = sections.map((s) => s.id);
    const index = ids.indexOf(sectionId);
    if (index < 0) return;
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= ids.length) return;
    [ids[index], ids[target]] = [ids[target]!, ids[index]!];
    setActionError(null);
    try {
      await mutations.reorderSections.mutateAsync(ids);
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Reorder failed.");
    }
  }

  async function handleReseed() {
    setActionError(null);
    try {
      const result = await mutations.reseedSections.mutateAsync();
      if (result.inserted === 0) {
        setActionError("No new sections inserted — corpus may be empty or sections already exist.");
      }
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Reseed failed.");
    }
  }

  const loading = leadersQuery.isLoading;
  const err = leadersQuery.error?.message ?? sectionsQuery.error?.message ?? actionError;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
          Staff ops · Onbuilding composition
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Profile sections</h1>
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
          Full CRUD over onbuilding profile markdown for any movement leader. Changes write directly to
          `onbuilding_profile_sections`.
        </p>
      </header>

      {err ? (
        <p className="text-sm text-destructive" role="alert">
          {err}
        </p>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[minmax(200px,1fr)_minmax(220px,1fr)_minmax(0,2fr)]">
        {/* Leader list */}
        <section className="rounded-xl border border-border bg-card p-3">
          <div className="mb-3 space-y-2">
            <h2 className="text-sm font-medium">Leaders</h2>
            <input
              type="search"
              value={leaderFilter}
              onChange={(e) => setLeaderFilter(e.target.value)}
              placeholder="Filter by name or slug"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : (
            <ul className="max-h-[520px] space-y-1 overflow-y-auto">
              {filteredLeaders.map((leader) => (
                <li key={leader.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLeaderId(leader.id);
                      setSelectedSectionId(null);
                    }}
                    className={cn(
                      "w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                      selectedLeaderId === leader.id ? "bg-muted" : "hover:bg-muted/60",
                    )}
                  >
                    <div className="font-medium">{leader.fullName}</div>
                    <div className="text-xs text-muted-foreground">
                      {leader.slug} · {leader.sectionCount} sections
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Section list */}
        <section className="rounded-xl border border-border bg-card p-3">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-sm font-medium">Sections</h2>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={!selectedLeaderId}
              onClick={() => setShowAddForm((v) => !v)}
            >
              <Plus className="mr-1 size-3.5" />
              Add
            </Button>
          </div>

          {!selectedLeaderId ? (
            <p className="text-sm text-muted-foreground">Select a leader to view sections.</p>
          ) : sectionsQuery.isLoading ? (
            <p className="text-sm text-muted-foreground">Loading sections…</p>
          ) : sections.length === 0 ? (
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>No sections yet.</p>
              <Button type="button" size="sm" variant="secondary" onClick={() => setShowAddForm(true)}>
                Add section
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={mutations.reseedSections.isPending}
                onClick={handleReseed}
              >
                Reseed from corpus
              </Button>
            </div>
          ) : (
            <ul className="max-h-[520px] space-y-1 overflow-y-auto">
              {sections.map((section, index) => (
                <li
                  key={section.id}
                  className={cn(
                    "flex items-start gap-1 rounded-md border border-transparent p-1",
                    selectedSectionId === section.id && "border-border bg-muted/50",
                  )}
                >
                  <div className="flex flex-col gap-0.5 pt-1">
                    <button
                      type="button"
                      aria-label="Move up"
                      disabled={index === 0 || mutations.reorderSections.isPending}
                      onClick={() => moveSection(section.id, "up")}
                      className="rounded p-0.5 text-muted-foreground hover:bg-muted disabled:opacity-30"
                    >
                      <ArrowUp className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Move down"
                      disabled={index === sections.length - 1 || mutations.reorderSections.isPending}
                      onClick={() => moveSection(section.id, "down")}
                      className="rounded p-0.5 text-muted-foreground hover:bg-muted disabled:opacity-30"
                    >
                      <ArrowDown className="size-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedSectionId(section.id)}
                    className="min-w-0 flex-1 rounded-md px-2 py-1.5 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium">{section.title}</span>
                      <StatusChip status={section.status} />
                    </div>
                    <div className="truncate text-xs text-muted-foreground">{section.sectionKey}</div>
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${section.title}`}
                    onClick={() => handleDelete(section)}
                    className="rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {showAddForm && selectedLeaderId ? (
            <form onSubmit={handleCreateSection} className="mt-4 space-y-2 border-t border-border pt-3">
              <input
                required
                value={newSectionKey}
                onChange={(e) => setNewSectionKey(e.target.value)}
                placeholder="section_key"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
              <input
                required
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
                placeholder="Title"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
              <div className="flex gap-2">
                <Button type="submit" size="sm" disabled={mutations.createSection.isPending}>
                  Create
                </Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          ) : null}
        </section>

        {/* Editor + preview */}
        <section className="rounded-xl border border-border bg-card p-4">
          {!selectedSection ? (
            <p className="text-sm text-muted-foreground">Select a section to edit markdown.</p>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wide text-muted-foreground">
                  Title
                </label>
                <input
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <StatusChip status={selectedSection.status} />
                  <span>Last edited {formatTimestamp(selectedSection.lastEditedAt)}</span>
                </div>
                {selectedSection.status === "ratified" ? (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={clearRatification}
                      onChange={(e) => setClearRatification(e.target.checked)}
                    />
                    Clear ratification on save
                  </label>
                ) : null}
              </div>

              <OnbuildingMarkdownEditor markdown={draftBodyMd} onMarkdownChange={setDraftBodyMd} />

              <div className="rounded-lg border border-border bg-muted/20 p-4">
                <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                  Preview
                </p>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{draftBodyMd || "_Empty section_"}</ReactMarkdown>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={!isDirty || mutations.updateSection.isPending}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={!isDirty}
                  onClick={() => {
                    setDraftTitle(selectedSection.title);
                    setDraftBodyMd(selectedSection.bodyMd);
                    setClearRatification(false);
                  }}
                >
                  Discard
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
