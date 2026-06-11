export type MastAuthRole = "org" | "leader" | "assess";

export type MastAuthMenuLink = {
  href: string;
  text: string;
};

export type MastAuthMenu = {
  label: string;
  links: MastAuthMenuLink[];
};

/** Workspace menus — parity with `docs/html/home/home.js` AUTH_MENUS. */
export const MAST_AUTH_MENUS: Record<MastAuthRole, MastAuthMenu> = {
  org: {
    label: "Organization workspace",
    links: [
      { href: "/dashboard/onboarding", text: "Onboarding" },
      { href: "/dashboard/ai-reality", text: "AI Reality dashboard" },
      { href: "/assess", text: "Integrity diagnostic" },
    ],
  },
  leader: {
    label: "Leader workspace",
    links: [
      { href: "/dashboard/onboarding/leader", text: "Leader onboarding" },
      { href: "/dashboard/ai-reality", text: "AI Reality dashboard" },
      { href: "/welcome", text: "Welcome letter" },
    ],
  },
  assess: {
    label: "Assessment workspace",
    links: [
      { href: "/dashboard/ai-reality", text: "Your AI Reality map" },
      { href: "/share/ai-reality", text: "Shared results" },
    ],
  },
};
