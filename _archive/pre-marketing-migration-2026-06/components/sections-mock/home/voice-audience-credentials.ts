/**
 * Audience-segment credentials for trusted voices on the credibility graph.
 * Editorial source: docs/movement_leader_research/site-voices-eeat-audience-credentials.md
 *
 * Strength levels align with the cross-voice matrix (●●● strong, ●● moderate, ● light).
 */

export type AudienceSegment = "churches" | "nonprofits" | "institutions";

export type AudienceCredentialStrength =
  | "none"
  | "light"
  | "moderate"
  | "strong";

export interface VoiceAudienceCredentials {
  slug: string;
  segments: Partial<Record<AudienceSegment, AudienceCredentialStrength>>;
  summaryBySegment?: Partial<Record<AudienceSegment, string>>;
  /** When true, segment strengths are intentionally omitted (awaiting research dossier). */
  researchPending?: boolean;
}

export const AUDIENCE_SEGMENTS: readonly AudienceSegment[] = [
  "churches",
  "nonprofits",
  "institutions",
] as const;

export const AUDIENCE_SEGMENT_LABEL: Record<AudienceSegment, string> = {
  churches: "Churches",
  nonprofits: "Nonprofits",
  institutions: "Institutions",
};

export const CREDENTIAL_STRENGTH_LABEL: Record<AudienceCredentialStrength, string> =
  {
    none: "—",
    light: "Light",
    moderate: "Moderate",
    strong: "Strong",
  };

const ORDER: AudienceCredentialStrength[] = [
  "none",
  "light",
  "moderate",
  "strong",
];

/** Minimum strength to count as “relevant” when an audience filter is active. */
export const AUDIENCE_FILTER_THRESHOLD: AudienceCredentialStrength = "moderate";

export function strengthMeetsThreshold(
  s: AudienceCredentialStrength | undefined,
  threshold: AudienceCredentialStrength = AUDIENCE_FILTER_THRESHOLD,
): boolean {
  if (!s) return false;
  return ORDER.indexOf(s) >= ORDER.indexOf(threshold);
}

/** Voice is emphasized when any active segment meets threshold. */
export function voiceMatchesAudienceFilters(
  row: VoiceAudienceCredentials | undefined,
  active: ReadonlySet<AudienceSegment>,
): boolean {
  if (active.size === 0) return true;
  if (!row || row.researchPending) return true;
  for (const seg of active) {
    const st = row.segments[seg];
    if (strengthMeetsThreshold(st)) return true;
  }
  return false;
}

const BY_SLUG: Record<string, VoiceAudienceCredentials> = {
  "alan-hirsch": {
    slug: "alan-hirsch",
    segments: {
      churches: "strong",
      nonprofits: "moderate",
      institutions: "strong",
    },
    summaryBySegment: {
      churches:
        "Decades leading and planting congregations; Forge, 100Movements, and movement mentorship at national scale.",
      nonprofits:
        "Embedded consulting and mission-organizational change (e.g. Redeemer City to City, CRM lineage).",
      institutions:
        "Co-founded Wheaton’s M.A. in Missional Church Movements; multi-seminary faculty across years.",
    },
  },
  "brad-brisco": {
    slug: "brad-brisco",
    segments: {
      churches: "strong",
      nonprofits: "light",
      institutions: "moderate",
    },
    summaryBySegment: {
      churches:
        "National multiplication leadership (Send Network / NAMB); Forge Kansas City; covocational planting expertise.",
      nonprofits:
        "Primary documented lane is denominations and networks rather than secular-style NGOs.",
      institutions:
        "Long college-level teaching and D.Min. trajectory; training-network authority for cohort leaders.",
    },
  },
  "josh-shepherd": {
    slug: "josh-shepherd",
    segments: {
      churches: "strong",
      nonprofits: "strong",
      institutions: "moderate",
    },
    summaryBySegment: {
      churches:
        "United Methodist pastoral ministry; years leading communal formation alongside ~100 young adults at a time (Mission House Network), per public /about founder narrative.",
      nonprofits:
        "Founder and director of Mission House Network; assistant director at QuadW Missional Outreach (multi-city cohorts and LMS). Co-founder Brad Brisco served on the nonprofit board.",
      institutions:
        "Leadership Formation Program (Kansas Leadership Center); scaled cohort and digital systems for mission organizations — formation-facing depth, not seminary faculty or accrediting committee roles.",
    },
  },
  "tim-catchim": {
    slug: "tim-catchim",
    segments: {
      churches: "strong",
      nonprofits: "moderate",
      institutions: "light",
    },
    summaryBySegment: {
      churches:
        "Movemental church leadership and planting; IVP co-author on APEST and organizational design.",
      nonprofits:
        "Early nonprofit and social-enterprise formation; community development and youth-facing work.",
      institutions:
        "Publisher-backed authority; seminary faculty / accrediting depth not documented in research files.",
    },
  },
  "jr-woodward": {
    slug: "jr-woodward",
    segments: {
      churches: "strong",
      nonprofits: "moderate",
      institutions: "strong",
    },
    summaryBySegment: {
      churches:
        "National V3 church-planting leadership; decades planting and polycentric movement culture.",
      nonprofits:
        "International development posture (e.g. Solis Foundation era) adjacent to ecclesial networks.",
      institutions:
        "Ph.D.; adjunct across multiple seminaries; doctoral cohort leadership and society memberships.",
    },
  },
  "rowland-smith": {
    slug: "rowland-smith",
    segments: {
      churches: "strong",
      nonprofits: "light",
      institutions: "strong",
    },
    summaryBySegment: {
      churches:
        "Forge America national director; Pando microchurch network; missional culture in large congregational context.",
      nonprofits:
        "Community / BAM-adjacent initiatives; not primarily secular NGO board service on file.",
      institutions:
        "DMiss and adjunct teaching across seminaries; doctoral cohort design for leaders.",
    },
  },
  "liz-rios": {
    slug: "liz-rios",
    segments: {
      churches: "strong",
      nonprofits: "strong",
      institutions: "strong",
    },
    summaryBySegment: {
      churches:
        "Ordained ministry, denominational commission work, and national Passion2Plant / Púlpito Fellows leadership.",
      nonprofits:
        "Board and consulting depth across justice-facing faith nonprofits and grant-funded programs.",
      institutions:
        "Higher-ed teaching and advancement; doctoral credentials; seminary adjunct and publisher-backed scholarship.",
    },
  },
  "lucas-pulley": {
    slug: "lucas-pulley",
    segments: {
      churches: "strong",
      nonprofits: "moderate",
      institutions: "light",
    },
    summaryBySegment: {
      churches:
        "Underground Network movements director; microchurch operator and national movement-facing teaching.",
      nonprofits:
        "Chartered campus ministry formation (InterVarsity) and nonprofit-style network operations.",
      institutions:
        "Graduate credential without seminary faculty seat on file; practitioner credibility vs accreditation committees.",
    },
  },
  "rob-wegner": {
    slug: "rob-wegner",
    segments: {
      churches: "strong",
      nonprofits: "moderate",
      institutions: "moderate",
    },
    summaryBySegment: {
      churches:
        "Rare bridge: years in large teaching-pastor roles plus founding decentralized microchurch infrastructure.",
      nonprofits:
        "Mission-agency and national association leadership (Exponential / NewThing lineage).",
      institutions:
        "Training-network institutionality and conference-scale authority vs traditional seminary chair.",
    },
  },
};

export function getVoiceAudienceCredentials(
  slug: string,
): VoiceAudienceCredentials | undefined {
  return BY_SLUG[slug];
}

/** Stable iteration order for UI and generators. */
export function listVoiceAudienceCredentialRows(): VoiceAudienceCredentials[] {
  return Object.values(BY_SLUG).sort((a, b) => a.slug.localeCompare(b.slug));
}
