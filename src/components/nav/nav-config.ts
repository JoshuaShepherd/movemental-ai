/**
 * Primary navigation as a guided decision framework.
 *
 *   1. What is this?         → The Path
 *   2. Is this for me?       → Who It's For (dropdown)
 *   3. Who else sees this?   → Voices
 *   4. Can I trust it?       → Evidence
 *   5. Who is behind this?   → About
 *   6. What do I do next?    → Start a Conversation (CTA)
 *
 * Voices vs. Evidence: Voices is leaders joining the conversation; Evidence is
 * proof of the framework, problem, and practice. Distinct surfaces.
 *
 * The Path (/pathway) carries both the four-stage overview and the engagement
 * options, so the old "How It Works" link is folded into it.
 */

export type NavLeaf = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup =
  | { kind: "link"; label: string; href: string }
  | {
      kind: "dropdown";
      label: string;
      items: readonly NavLeaf[];
      activeWhenPathMatches: readonly string[];
    };

export const PRIMARY_NAV: readonly NavGroup[] = [
  { kind: "link", label: "The Path", href: "/pathway" },
  {
    kind: "dropdown",
    label: "Who It's For",
    activeWhenPathMatches: ["/churches", "/nonprofits", "/institutions"],
    items: [
      {
        label: "Churches",
        href: "/churches",
        description: "Lead with theological clarity",
      },
      {
        label: "Nonprofits",
        href: "/nonprofits",
        description: "Protect trust while scaling",
      },
      {
        label: "Institutions",
        href: "/institutions",
        description: "Form leaders for an AI-shaped world",
      },
    ],
  },
  { kind: "link", label: "Voices", href: "/voices" },
  { kind: "link", label: "Evidence", href: "/evidence" },
  { kind: "link", label: "About", href: "/about" },
];

export const PRIMARY_CTA: NavLeaf = {
  label: "Start a Conversation",
  href: "/contact",
};

export function isHrefActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isGroupActive(pathname: string, group: NavGroup): boolean {
  if (group.kind === "link") return isHrefActive(pathname, group.href);
  return group.activeWhenPathMatches.some((prefix) =>
    isHrefActive(pathname, prefix),
  );
}
