"use client";

import { useMemo, useState } from "react";
import { useAgentsList, useAgentsUpdate } from "@/hooks/simplified/agents.hooks";
import { useCorpusBindingsList } from "@/hooks/simplified/corpus-bindings.hooks";
import { usePromptPacksList } from "@/hooks/simplified/prompt-packs.hooks";
import type { Agents } from "@/lib/schemas";
import { Button } from "@/components/ui/button";

export default function AgentRuntimeStudioPage() {
  const agentsQuery = useAgentsList({ limit: 100 });
  const bindingsQuery = useCorpusBindingsList({ limit: 100 });
  const packsQuery = usePromptPacksList({ limit: 100 });
  const updateAgent = useAgentsUpdate();

  const [drafts, setDrafts] = useState<
    Record<string, { corpus_binding_id: string; prompt_pack_id: string }>
  >({});

  const agents = agentsQuery.data ?? [];
  const bindings = bindingsQuery.data ?? [];
  const packs = packsQuery.data ?? [];

  const bindingLabel = useMemo(() => {
    const m = new Map<string, string>();
    for (const b of bindings) {
      m.set(b.id, `${b.slug} (${b.provider})`);
    }
    return m;
  }, [bindings]);

  const packLabel = useMemo(() => {
    const m = new Map<string, string>();
    for (const p of packs) {
      m.set(p.id, `${p.slug} v${p.version}${p.label ? `, ${p.label}` : ""}`);
    }
    return m;
  }, [packs]);

  function draftFor(agent: Agents) {
    const existing = drafts[agent.id];
    if (existing) return existing;
    return {
      corpus_binding_id: agent.corpus_binding_id ?? "",
      prompt_pack_id: agent.prompt_pack_id ?? "",
    };
  }

  async function save(agent: Agents) {
    const d = draftFor(agent);
    await updateAgent.mutateAsync({
      id: agent.id,
      corpus_binding_id: d.corpus_binding_id ? d.corpus_binding_id : null,
      prompt_pack_id: d.prompt_pack_id ? d.prompt_pack_id : null,
    });
    setDrafts((prev) => {
      const next = { ...prev };
      delete next[agent.id];
      return next;
    });
  }

  const loading = agentsQuery.isLoading || bindingsQuery.isLoading || packsQuery.isLoading;
  const err =
    agentsQuery.error?.message ||
    bindingsQuery.error?.message ||
    packsQuery.error?.message ||
    null;

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Agent runtime</h1>
        <p className="max-w-prose text-muted-foreground text-sm leading-relaxed">
          Assign corpus bindings and prompt packs per agent for the active tenant. Values are stored in
          the database; retrieval still runs on the configured provider (for example OpenAI vector stores).
        </p>
      </header>

      {loading ? (
        <p className="text-muted-foreground text-sm">Loading…</p>
      ) : err ? (
        <p className="text-destructive text-sm" role="alert">
          {err}
        </p>
      ) : agents.length === 0 ? (
        <p className="text-muted-foreground text-sm">No agents returned for this tenant.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-border bg-section font-mono text-[0.75rem] uppercase tracking-[0.1em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Agent</th>
                <th className="px-4 py-3 font-medium">Corpus binding</th>
                <th className="px-4 py-3 font-medium">Prompt pack</th>
                <th className="px-4 py-3 font-medium w-[120px]" />
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => {
                const d = draftFor(agent);
                return (
                  <tr key={agent.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 align-top">
                      <div className="font-medium text-foreground">{agent.name}</div>
                      <div className="text-muted-foreground text-xs">{agent.slug}</div>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <select
                        className="w-full max-w-xs rounded-md border border-border bg-background px-2 py-2 text-foreground"
                        aria-label={`Corpus binding for ${agent.slug}`}
                        value={d.corpus_binding_id}
                        onChange={(e) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [agent.id]: { ...d, corpus_binding_id: e.target.value },
                          }))
                        }
                      >
                        <option value="">None , </option>
                        {bindings.map((b) => (
                          <option key={b.id} value={b.id}>
                            {bindingLabel.get(b.id) ?? b.id}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <select
                        className="w-full max-w-xs rounded-md border border-border bg-background px-2 py-2 text-foreground"
                        aria-label={`Prompt pack for ${agent.slug}`}
                        value={d.prompt_pack_id}
                        onChange={(e) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [agent.id]: { ...d, prompt_pack_id: e.target.value },
                          }))
                        }
                      >
                        <option value="">None , </option>
                        {packs.map((p) => (
                          <option key={p.id} value={p.id}>
                            {packLabel.get(p.id) ?? p.id}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <Button
                        type="button"
                        size="sm"
                        disabled={updateAgent.isPending}
                        onClick={() => void save(agent)}
                      >
                        Save
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
