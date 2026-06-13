/**
 * Founder facts the agent may state — medium bios, roles, founding story.
 * Personal anchors and ownership split are excluded by design.
 */
import {
  FOUNDERS_AND_ROLES,
  FOUNDING_STORY,
  FOUNDER_PROFILES,
  type FounderSlug,
} from "./content";

export const FOUNDER_AGENT_ANSWERS = {
  whoAreFounders: [
    "Movemental has three founders: Alan Hirsch, Brad Brisco, and Josh Shepherd.",
    FOUNDERS_AND_ROLES.body[0],
  ],
  whoIsCeo: [
    "Brad Brisco is CEO.",
    FOUNDERS_AND_ROLES.body[1],
  ],
  whoIsJosh: [
    FOUNDER_PROFILES["josh-shepherd"].mediumBio,
    "He is Founder and CTO — the one who builds the platform, the agents, and the system underneath.",
  ],
  foundingStory: [
    FOUNDING_STORY.paragraphs[0],
    FOUNDING_STORY.paragraphs[1],
  ],
} as const;

/** Grounded lines keyed by founder slug — used by leader scenes and handoffs. */
export const FOUNDER_AGENT_LINES: Record<FounderSlug, readonly string[]> = {
  "alan-hirsch": [
    FOUNDER_PROFILES["alan-hirsch"].mediumBio,
    "He is Co-Founder and Chief Movement Officer — the movement thinker behind the network.",
  ],
  "brad-brisco": [
    FOUNDER_PROFILES["brad-brisco"].mediumBio,
    "He is Co-Founder and CEO — the trust seat, held on purpose.",
  ],
  "josh-shepherd": FOUNDER_AGENT_ANSWERS.whoIsJosh,
};
