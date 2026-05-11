/**
 * Shape stored in `movement_leaders.movement_leader_data` (JSONB).
 * Populated incrementally by `scripts/sync-leader-corpus.ts` and future pipelines.
 */
export type MovementLeaderDataJson = {
  corpus?: {
    synced_at?: string;
    source_slug?: string;
    files?: Record<string, string>;
  };
  /** Markdown — full reflected-understanding essay */
  reflected_understanding?: string;
  calling?: string;
  work?: string;
  voice?: string;
  where_it_lives?: string;
  network?: string;
  gaps?: string;
  [key: string]: unknown;
};
