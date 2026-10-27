import { db } from "@/lib/db";
import {
  resolutions,
  resolutionVersions,
  resolutionInvitations,
  organizations,
} from "@/lib/db/schema";
import { eq, and, sql, desc, or } from "drizzle-orm";
import { randomBytes } from "crypto";

export type Result<T, E = Error> =
  | { ok: true; data: T }
  | { ok: false; error: E };

export function Ok<T>(data: T): Result<T, never> {
  return { ok: true, data };
}

export function Err<E = Error>(error: E): Result<never, E> {
  return { ok: false, error };
}

export interface SaveResolutionInput {
  email?: string | null;
  orgType?: string;
  orgLabel: string;
  visibility?: "private" | "link" | "public";
  researchConsent?: boolean;
  countInOrg?: boolean;
  displayName?: string | null;
  roleText?: string | null;
  orgRole?: string | null;
  /** Resolve v3 snapshot: picks by answer id, plus the readable lines. */
  v2: ResolutionV2Snapshot;
  acts?: string[];
  twoMinutes?: string;
  lines: string[];
}

export interface ResolutionLineData {
  label: string;
  text: string;
  others: string[];
}

export interface ResolutionV2Snapshot {
  sector: "church" | "nonprofit" | "school" | "network";
  picks: Record<string, { ticks: string[]; star: string | null; choice: string | null; none: boolean }>;
  hardest: string | null;
  hardestText: string;
  beliefs: ResolutionLineData[];
  parts: { name: string; rows: ResolutionLineData[] }[];
}

export interface SharedResolutionData {
  author: string;
  role: string;
  org: string;
  short: string;
  date: string;
  /** v2 records (fourteen questions). Empty for nine-theme records. */
  beliefs: ResolutionLineData[];
  parts: { name: string; rows: ResolutionLineData[] }[];
  /** Nine-theme records only: [theme, text]. */
  lines: [string, string][];
  hardest: string;
  acts: string[];
  two: string;
}

export interface PeopleSummaryData {
  unlocked: boolean;
  contributorCount: number;
  threshold: number;
  message: string;
  orgLabel: string;
}

function generateShareToken(): string {
  return randomBytes(6).toString("base64url").slice(0, 8).toLowerCase();
}

export class ResolutionService {
  /**
   * Save a resolution and its immutable version record.
   * Generates a share_token if visibility is link or public.
   */
  async saveResolution(input: SaveResolutionInput): Promise<
    Result<{ resolutionId: string; shareToken: string; savedAt: string }>
  > {
    try {
      let shareToken = generateShareToken();
      let existingId: string | null = null;

      // If email provided, check if user already has a resolution for this org
      if (input.email) {
        const [existing] = await db
          .select({ id: resolutions.id, share_token: resolutions.share_token })
          .from(resolutions)
          .where(
            and(
              eq(resolutions.email, input.email.trim().toLowerCase()),
              eq(resolutions.org_label, input.orgLabel.trim())
            )
          )
          .limit(1);

        if (existing) {
          existingId = existing.id;
          if (existing.share_token) shareToken = existing.share_token;
        }
      }

      let resolutionId = existingId;

      if (existingId) {
        await db
          .update(resolutions)
          .set({
            org_type: input.orgType ?? "Nonprofit",
            visibility: input.visibility ?? "private",
            research_consent: input.researchConsent ?? false,
            count_in_org: input.countInOrg ?? true,
            display_name: input.displayName ?? null,
            role_text: input.roleText ?? null,
            org_role: input.orgRole ?? "served",
            share_token: shareToken,
            updated_at: new Date().toISOString(),
          })
          .where(eq(resolutions.id, existingId));
      } else {
        const [inserted] = await db
          .insert(resolutions)
          .values({
            email: input.email ? input.email.trim().toLowerCase() : null,
            org_type: input.orgType ?? "Nonprofit",
            org_label: input.orgLabel.trim(),
            visibility: input.visibility ?? "private",
            share_token: shareToken,
            research_consent: input.researchConsent ?? false,
            count_in_org: input.countInOrg ?? true,
            display_name: input.displayName ?? null,
            role_text: input.roleText ?? null,
            org_role: input.orgRole ?? "served",
          })
          .returning({ id: resolutions.id });

        resolutionId = inserted!.id;
      }

      // Compute version number
      const existingVersions = await db
        .select({ version: resolutionVersions.version })
        .from(resolutionVersions)
        .where(eq(resolutionVersions.resolution_id, resolutionId!))
        .orderBy(desc(resolutionVersions.version))
        .limit(1);

      const nextVersion = (existingVersions[0]?.version ?? 0) + 1;

      // Append immutable version snapshot
      await db.insert(resolutionVersions).values({
        resolution_id: resolutionId!,
        version: nextVersion,
        selections: { v: 2, ...input.v2 },
        hardest_theme: null,
        acts: input.acts ?? [],
        two_minutes: input.twoMinutes ?? "",
        lines: input.lines,
      });

      return Ok({
        resolutionId: resolutionId!,
        shareToken,
        savedAt: new Date().toISOString(),
      });
    } catch (err) {
      return Err(err instanceof Error ? err : new Error(String(err)));
    }
  }

  /**
   * Look up a shared resolution by its unique revocable token.
   */
  async getByShareToken(
    token: string
  ): Promise<Result<SharedResolutionData | null>> {
    try {
      const [res] = await db
        .select({
          id: resolutions.id,
          org_label: resolutions.org_label,
          display_name: resolutions.display_name,
          role_text: resolutions.role_text,
          visibility: resolutions.visibility,
          share_token_revoked: resolutions.share_token_revoked,
          created_at: resolutions.created_at,
        })
        .from(resolutions)
        .where(
          and(
            eq(resolutions.share_token, token.toLowerCase()),
            eq(resolutions.share_token_revoked, false)
          )
        )
        .limit(1);

      if (!res || res.visibility === "private") {
        return Ok(null);
      }

      // Fetch the latest version
      const [ver] = await db
        .select({
          selections: resolutionVersions.selections,
          lines: resolutionVersions.lines,
          hardest_theme: resolutionVersions.hardest_theme,
          acts: resolutionVersions.acts,
          two_minutes: resolutionVersions.two_minutes,
          created_at: resolutionVersions.created_at,
        })
        .from(resolutionVersions)
        .where(eq(resolutionVersions.resolution_id, res.id))
        .orderBy(desc(resolutionVersions.version))
        .limit(1);

      if (!ver) return Ok(null);

      const sel = (ver.selections ?? {}) as Partial<ResolutionV2Snapshot> & { v?: number };
      const isV2 = sel.v === 2;
      const legacyLines: [string, string][] = isV2
        ? []
        : ((Array.isArray(ver.lines) ? ver.lines : []) as unknown[]).map((l) => {
            if (typeof l === "object" && l !== null && "theme" in l && "text" in l) {
              const obj = l as { theme: string; text: string };
              return [obj.theme, obj.text];
            }
            const str = String(l);
            const i = str.indexOf(": ");
            return i > 0 ? [str.slice(0, i), str.slice(i + 2)] : ["", str];
          });
      const acts = (Array.isArray(ver.acts) ? ver.acts : []).filter(
        (a): a is string => typeof a === "string",
      );

      return Ok({
        author: res.display_name || "Someone",
        role: res.role_text || "",
        org: res.org_label,
        short: res.org_label,
        date: new Date(ver.created_at).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        beliefs: isV2 ? (sel.beliefs ?? []) : [],
        parts: isV2 ? (sel.parts ?? []) : [],
        lines: legacyLines,
        hardest: isV2 ? (sel.hardestText ?? "") : "",
        acts,
        two: ver.two_minutes ?? "",
      });
    } catch (err) {
      return Err(err instanceof Error ? err : new Error(String(err)));
    }
  }

  /**
   * Get people summary enforcing the 5-contributor threshold rule:
   * Grouped views return nothing below five contributors.
   */
  async getPeopleSummary(orgLabel: string): Promise<Result<PeopleSummaryData>> {
    try {
      const cleanLabel = orgLabel.trim().toLowerCase();
      if (!cleanLabel) {
        return Ok({
          unlocked: false,
          contributorCount: 0,
          threshold: 5,
          message: "No organization specified.",
          orgLabel,
        });
      }

      const countResult = await db
        .select({ count: sql<number>`count(distinct ${resolutions.id})::int` })
        .from(resolutions)
        .where(
          and(
            eq(resolutions.count_in_org, true),
            sql`lower(trim(${resolutions.org_label})) = ${cleanLabel}`
          )
        );

      const count = countResult[0]?.count ?? 0;
      const threshold = 5;

      if (count < threshold) {
        return Ok({
          unlocked: false,
          contributorCount: count,
          threshold,
          message: `Grouped views unlock when 5 or more people write a Resolution for this organization (${count} of ${threshold} contributed).`,
          orgLabel,
        });
      }

      return Ok({
        unlocked: true,
        contributorCount: count,
        threshold,
        message: `${count} contributors have written Resolutions for ${orgLabel}.`,
        orgLabel,
      });
    } catch (err) {
      return Err(err instanceof Error ? err : new Error(String(err)));
    }
  }

  /**
   * Send an invitation to a colleague with a unique token.
   */
  async createInvitation(input: {
    inviterEmail: string;
    inviteeEmail: string;
    organizationLabel: string;
    note?: string;
  }): Promise<Result<{ token: string; inviteUrl: string }>> {
    try {
      const token = randomBytes(8).toString("base64url").toLowerCase();

      await db.insert(resolutionInvitations).values({
        inviter_email: input.inviterEmail.trim().toLowerCase(),
        invitee_email: input.inviteeEmail.trim().toLowerCase(),
        organization_label: input.organizationLabel.trim(),
        note: input.note || null,
        token,
      });

      return Ok({
        token,
        inviteUrl: `/resolve?invite=${token}`,
      });
    } catch (err) {
      return Err(err instanceof Error ? err : new Error(String(err)));
    }
  }
}

export const resolutionService = new ResolutionService();
