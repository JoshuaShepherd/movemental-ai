import type { ProgramFixtureBase } from "@/lib/program/types/stitch-screen-family";

type SandboxGroup = {
  label: string;
  links: Array<{ label: string; badge?: string; icon?: string }>;
};

type SandboxSidebar = {
  engagementTitle?: string;
  phaseCaption?: string;
  groups?: SandboxGroup[];
};

type PhaseNavItem = { label: string; state?: string; icon?: string };

type PhaseSidebar = {
  journeyTitle?: string;
  journeySubtitle?: string;
  phaseNav?: PhaseNavItem[];
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

/** SandboxLive-style sidebar (groups + phase links). */
type NavSidebar = {
  title?: string;
  subtitle?: string;
  nav?: Array<{ label: string; icon?: string; state?: string }>;
};

export function ProgramNavSidebar({ sidebar }: { sidebar: NavSidebar }) {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-sandbox-border bg-sandbox-sidebar text-sandbox-sidebar-ink md:block">
      <div className="flex h-full flex-col gap-4 p-5">
        {sidebar.title ? <p className="font-headline text-lg italic">{sidebar.title}</p> : null}
        {sidebar.subtitle ? <p className="font-body text-xs text-sandbox-muted">{sidebar.subtitle}</p> : null}
        <ul className="mt-2 flex flex-col gap-1 font-body text-sm">
          {(sidebar.nav ?? []).map((item) => (
            <li key={item.label}>
              <button
                type="button"
                className={`w-full rounded-md px-2 py-2 text-left ${
                  item.state === "active"
                    ? "bg-pathway-accent/15 font-semibold text-pathway-accent"
                    : "hover:bg-sandbox-sidebar-ink/5"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export function ProgramSandboxSidebar({ sidebar }: { sidebar: SandboxSidebar }) {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-sandbox-border bg-sandbox-sidebar text-sandbox-sidebar-ink lg:block">
      <div className="flex h-full flex-col gap-6 p-6">
        {sidebar.engagementTitle ? (
          <div>
            <p className="font-body text-[10px] font-bold uppercase tracking-widest text-sandbox-muted">
              Engagement
            </p>
            <p className="mt-1 font-headline text-xl italic text-pathway-accent">{sidebar.engagementTitle}</p>
            {sidebar.phaseCaption ? (
              <p className="mt-2 font-body text-xs text-sandbox-muted">{sidebar.phaseCaption}</p>
            ) : null}
          </div>
        ) : null}
        <nav className="flex flex-col gap-6 overflow-y-auto font-body text-sm">
          {(sidebar.groups ?? []).map((g) => (
            <div key={g.label}>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-sandbox-muted">{g.label}</p>
              <ul className="flex flex-col gap-1">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sandbox-sidebar-ink hover:bg-sandbox-sidebar-ink/5"
                    >
                      <span>{l.label}</span>
                      {l.badge ? (
                        <span className="text-[9px] font-bold uppercase text-pathway-accent">{l.badge}</span>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}

/** Phase workspace sidebar (internal journey nav). */
export function ProgramPhaseSidebar({ sidebar }: { sidebar: PhaseSidebar }) {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-sandbox-border bg-sandbox-sidebar text-sandbox-sidebar-ink md:block">
      <div className="flex h-full flex-col gap-4 p-5">
        {sidebar.journeyTitle ? (
          <div>
            <p className="font-body text-[10px] font-bold uppercase tracking-widest text-sandbox-muted">Journey</p>
            <p className="mt-1 font-headline text-lg italic">{sidebar.journeyTitle}</p>
            {sidebar.journeySubtitle ? (
              <p className="mt-1 font-body text-xs text-sandbox-muted">{sidebar.journeySubtitle}</p>
            ) : null}
          </div>
        ) : null}
        <ul className="flex flex-col gap-1 font-body text-sm">
          {(sidebar.phaseNav ?? []).map((p) => (
            <li key={p.label}>
              <button
                type="button"
                className={`w-full rounded-md px-2 py-2 text-left ${
                  p.state === "active"
                    ? "bg-pathway-accent/15 font-semibold text-pathway-accent"
                    : "text-sandbox-sidebar-ink hover:bg-sandbox-sidebar-ink/5"
                }`}
              >
                {p.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export function ProgramSidebarRouter({ fixture }: { fixture: ProgramFixtureBase }) {
  const sb = fixture.sidebar;
  if (!isRecord(sb)) return null;
  if (Array.isArray(sb.nav) && !Array.isArray(sb.groups)) {
    return <ProgramNavSidebar sidebar={sb as unknown as NavSidebar} />;
  }
  if (Array.isArray(sb.groups)) {
    return <ProgramSandboxSidebar sidebar={sb as unknown as SandboxSidebar} />;
  }
  if (Array.isArray(sb.phaseNav)) {
    return <ProgramPhaseSidebar sidebar={sb as unknown as PhaseSidebar} />;
  }
  return null;
}
