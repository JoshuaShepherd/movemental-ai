import { cn } from "@/lib/utils";

import { BookFragmentsOfFormIntel } from "./narrative-artifacts";
import {
  IntelView,
  IvAvatar,
  IvBar,
  IvChip,
  IvCol,
  IvEyebrow,
  IvMeter,
  IvRow,
  IvRule,
} from "./primitives";
import type { IntelArtifactBaseProps } from "./types";

type P = IntelArtifactBaseProps;

function isRel(field: P["field"]) {
  return field === "rel";
}

/** SEO + SERP preview surface */
export function IntelSeoSurface({
  field,
  variant = "full",
  className,
  embedded,
  title = "Fragments of Form — formation primer",
  urlSlug = "fragments-of-form",
  "aria-label": ariaLabel = "Search and social preview for published content",
}: P & { title?: string; urlSlug?: string }) {
  return (
    <IntelView
      field={field}
      variant={variant}
      className={cn("aspect-video max-h-none", className)}
      embedded={embedded}
      aria-label={ariaLabel}
      role="region"
    >
      <IvRow className="gap-2 border-b border-border pb-2">
        <span className="flex gap-1" aria-hidden>
          <span className="size-2 rounded-full bg-destructive/60" />
          <span className="size-2 rounded-full bg-muted-foreground/30" />
          <span className="size-2 rounded-full bg-muted-foreground/30" />
        </span>
        <IvBar widthPct={70} faint className="h-2 flex-1" />
      </IvRow>
      <IvCol className="mt-3 gap-2">
        <IvBar widthPct={90} strong className="h-2.5" />
        <IvBar widthPct={100} faint />
        <IvBar widthPct={85} faint />
      </IvCol>
      <IvCol className="mt-4 gap-1 rounded-md bg-muted/50 p-3">
        <p className="text-sm font-semibold text-primary">{title}</p>
        <p className="text-xs text-primary/80">movemental.org · {urlSlug}</p>
        <IvBar widthPct={100} faint />
        <IvBar widthPct={90} faint />
      </IvCol>
      <IvRow className="mt-auto flex-wrap gap-1 pt-3">
        <IvChip>canonical</IvChip>
        <IvChip>hreflang</IvChip>
        <IvChip>sitemap</IvChip>
        <IvChip>robots</IvChip>
        {field === "info" ? (
          <>
            <IvChip className="text-[0.55rem]">Article</IvChip>
            <IvChip className="text-[0.55rem]">Course</IvChip>
            <IvChip className="text-[0.55rem]">FAQ</IvChip>
          </>
        ) : (
          <>
            <IvChip accent>A/B title</IvChip>
            <IvAvatar initials="S" />
            <IvAvatar initials="M" />
            <IvChip className="text-[0.55rem]">Shared by</IvChip>
          </>
        )}
      </IvRow>
    </IntelView>
  );
}

/** GEO / entity card for machine-readable identity */
export function IntelGeoEntityCard({
  field,
  variant = "full",
  className,
  embedded,
  canonicalName = "Movemental",
  "aria-label": ariaLabel = "Entity card with facts and same-as links",
}: P & { canonicalName?: string }) {
  return (
    <IntelView
      field={field}
      variant={variant}
      className={className}
      embedded={embedded}
      aria-label={ariaLabel}
      role="region"
    >
      <IvEyebrow>Entity</IvEyebrow>
      <p className="text-base font-semibold tracking-tight text-foreground">{canonicalName}</p>
      <IvRow className="mt-2 gap-1">
        {["W", "O", "G"].map((x) => (
          <span
            key={x}
            className="inline-flex size-8 items-center justify-center rounded-md bg-muted text-xs font-medium text-muted-foreground"
            aria-hidden
          >
            {x}
          </span>
        ))}
      </IvRow>
      <IvRule className="my-3" />
      <IvCol className="gap-2 text-sm">
        <IvRow between>
          <span className="text-muted-foreground">Founded</span>
          <IvBar widthPct={35} className="h-2 max-w-[40%]" />
        </IvRow>
        <IvRow between>
          <span className="text-muted-foreground">Jurisdiction</span>
          <IvBar widthPct={45} className="h-2 max-w-[45%]" />
        </IvRow>
        <IvRow between className="items-center">
          <span className="text-muted-foreground">Topic</span>
          {isRel(field) ? (
            <IvChip accent>Needs confirm</IvChip>
          ) : (
            <IvBar widthPct={50} className="h-2 max-w-[50%]" />
          )}
        </IvRow>
      </IvCol>
      <IvRow className="mt-auto flex-wrap gap-1 pt-3">
        <IvChip>formation</IvChip>
        <IvChip>architecture</IvChip>
        <IvChip>movement</IvChip>
      </IvRow>
    </IntelView>
  );
}

/** Translation memory + locale stack */
export function IntelTranslationLocaleStack({
  field,
  variant = "full",
  className,
  embedded,
  "aria-label": ariaLabel = "Stacked locale versions with translation memory",
}: P) {
  const locales = [
    { code: "EN", hash: "a3f9c2", offset: "translate(0,0)", z: 30 },
    { code: "ES", hash: "b1e44a", offset: "translate(6%,4%) rotate(-1deg)", z: 20 },
    { code: "PT-BR", hash: "c80211", offset: "translate(12%,8%) rotate(1.5deg)", z: 10 },
  ];
  return (
    <IntelView
      field={field}
      variant={variant}
      className={cn("aspect-[1312/816] max-h-none min-h-[12rem]", className)}
      embedded={embedded}
      aria-label={ariaLabel}
      role="region"
    >
      <IvRow between>
        <IvEyebrow>Locales</IvEyebrow>
        <IvChip>TM match · 94%</IvChip>
      </IvRow>
      <div className="relative mt-2 flex-1">
        {locales.map((L, i) => (
          <div
            key={L.code}
            className="absolute inset-x-0 top-0 overflow-hidden rounded-md bg-card shadow-ambient ring-1 ring-border"
            style={{
              transform: L.offset,
              zIndex: L.z,
              height: "72%",
              marginTop: i * 4,
            }}
          >
            <IvRow between className="p-2">
              <IvChip accent>{L.code}</IvChip>
              <span className="font-mono text-[0.55rem] text-muted-foreground">{L.hash}</span>
            </IvRow>
            <IvCol className="gap-1 px-2 pb-2">
              <IvBar widthPct={90} />
              <IvBar widthPct={75} faint />
            </IvCol>
            {L.code === "ES" && isRel(field) ? (
              <IvRow className="absolute bottom-2 right-2 gap-0.5">
                <IvAvatar initials="RV" />
              </IvRow>
            ) : null}
            {L.code === "PT-BR" && isRel(field) ? (
              <IvChip className="absolute bottom-2 left-2 text-[0.55rem]">Comment</IvChip>
            ) : null}
          </div>
        ))}
      </div>
      <IvRow className="mt-auto justify-between pt-2">
        {field === "info" ? (
          <>
            <IvChip>Glossary · 42 hits</IvChip>
            <IvChip>Parity · 98%</IvChip>
          </>
        ) : (
          <IvChip>Reviewer queue · 3</IvChip>
        )}
      </IvRow>
    </IntelView>
  );
}

/** E-commerce shelf row */
export function IntelEcommerceShelf({
  field,
  variant = "full",
  className,
  embedded,
  productTitle = "Fragments of Form · digital",
  price = "$28",
  "aria-label": ariaLabel = "Product shelf with variants and trust signals",
}: P & { productTitle?: string; price?: string }) {
  return (
    <IntelView
      field={field}
      variant={variant}
      className={cn("aspect-[16/10] max-h-none", className)}
      embedded={embedded}
      aria-label={ariaLabel}
      role="region"
    >
      <IvRow className="items-stretch gap-3">
        <div className="w-1/3 shrink-0 overflow-hidden rounded-md bg-muted">
          <div className="aspect-[4/5] w-full min-h-[6rem]">
            <BookFragmentsOfFormIntel field={field} variant="thumb" embedded />
          </div>
        </div>
        <IvCol className="min-w-0 flex-1 gap-2">
          <p className="text-sm font-semibold leading-snug">{productTitle}</p>
          <IvRow className="items-center gap-2">
            <span className="text-lg font-semibold text-foreground">{price}</span>
            <IvRow className="gap-1">
              {["A", "B", "C"].map((c) => (
                <span
                  key={c}
                  className="size-5 rounded-full border border-border bg-muted"
                  aria-hidden
                />
              ))}
            </IvRow>
          </IvRow>
          <IvRow className="gap-1 text-primary" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
              <svg key={i} className="size-3.5" viewBox="0 0 12 12" fill="currentColor">
                <path
                  d="M6 0.5l1.5 3.5h3.5l-2.8 2.2 1 3.8-3.2-2.4-3.2 2.4 1-3.8-2.8-2.2h3.5z"
                  className={i < 4 ? "opacity-100" : "opacity-30"}
                />
              </svg>
            ))}
            <IvChip className="ml-1 text-[0.55rem]">Fulfillment · 24h</IvChip>
          </IvRow>
          <IvMeter fillPct={62} />
          {isRel(field) ? (
            <IvRow className="gap-1">
              <IvChip accent>Gift · cohort</IvChip>
              <IvAvatar initials="G1" />
              <IvAvatar initials="G2" />
            </IvRow>
          ) : (
            <IvRow className="gap-1">
              <IvChip>SKU · FOF-DIG-01</IvChip>
              <IvChip className="text-[0.55rem]">Variants · 3</IvChip>
            </IvRow>
          )}
        </IvCol>
      </IvRow>
    </IntelView>
  );
}

/** Subscription + usage ledger */
export function IntelSubscriptionLedger({
  field,
  variant = "full",
  className,
  embedded,
  plan = "Pro",
  "aria-label": ariaLabel = "Subscription plan, usage, and billing timeline",
}: P & { plan?: string }) {
  return (
    <IntelView
      field={field}
      variant={variant}
      className={className}
      embedded={embedded}
      aria-label={ariaLabel}
      role="region"
    >
      <IvRow between>
        <span className="text-sm font-semibold">{plan}</span>
        <IvChip accent>Active</IvChip>
      </IvRow>
      <IvCol className="mt-3 gap-3">
        <IvRow between className="text-xs text-muted-foreground">
          <span>Seats</span>
          <IvMeter fillPct={64} className="max-w-[55%]" />
        </IvRow>
        <IvRow between className="text-xs text-muted-foreground">
          <span>API</span>
          <IvMeter fillPct={38} className="max-w-[55%]" />
        </IvRow>
        <IvRow between className="text-xs text-muted-foreground">
          <span>Storage</span>
          <IvMeter fillPct={72} className="max-w-[55%]" />
        </IvRow>
      </IvCol>
      <IvCol className="mt-4 gap-2 border-l-2 border-primary/30 pl-3">
        {["Renewal", "Invoice sent", "Payment OK"].map((t) => (
          <IvRow key={t} className="items-center gap-2 text-xs text-muted-foreground">
            <span className="size-2 shrink-0 rounded-full bg-primary" aria-hidden />
            <span className="w-24 shrink-0 font-medium text-foreground">{t}</span>
            <IvBar widthPct={55} faint className="h-2 min-w-0 flex-1" />
          </IvRow>
        ))}
      </IvCol>
      <IvRow className="mt-auto items-end justify-between pt-4">
        <IvCol className="gap-0.5">
          <span className="text-xs text-muted-foreground">MRR (demo)</span>
          <span className="text-xl font-semibold tracking-tight">$4,280</span>
        </IvCol>
        {isRel(field) ? (
          <IvRow className="gap-1">
            <IvAvatar initials="OW" />
            <IvAvatar initials="BL" />
          </IvRow>
        ) : (
          <IvCol className="items-end gap-1">
            <IvBar widthPct={40} faint className="h-2" />
            <IvChip className="text-[0.55rem]">INV-2048</IvChip>
          </IvCol>
        )}
      </IvRow>
    </IntelView>
  );
}

/** AI agent tools + grounded answer */
export function IntelAiAgentWorkpack({
  field,
  variant = "full",
  className,
  embedded,
  query = "How do we frame formation for a bi-vocational team?",
  "aria-label": ariaLabel = "Agent tools, run, and citations",
}: P & { query?: string }) {
  const tools = ["search", "retrieve", "summarize", "draft"] as const;
  const cites = ["Book · Ch.4", "Module 3", "Ep.12 · 04:12", "Email · 7 Mar"] as const;
  return (
    <IntelView
      field={field}
      variant={variant}
      className={cn("aspect-[16/10] max-h-none", className)}
      embedded={embedded}
      aria-label={ariaLabel}
      role="region"
    >
      <IvRow className="min-h-0 flex-1 items-stretch gap-2">
        <IvCol className="w-[22%] shrink-0 gap-1 rounded-md bg-muted/50 p-2">
          <IvEyebrow className="text-[0.55rem]">Tools</IvEyebrow>
          {tools.map((t) => (
            <IvRow key={t} className="gap-1 rounded px-1 py-0.5 hover:bg-muted">
              <span className="size-2 rounded-sm bg-primary/50" aria-hidden />
              <span className="text-[0.65rem] capitalize text-muted-foreground">{t}</span>
            </IvRow>
          ))}
        </IvCol>
        <IvCol className="min-w-0 flex-1 gap-2 rounded-md bg-muted/30 p-2">
          <IvChip className="w-fit text-[0.55rem]">Run</IvChip>
          <p className="text-xs font-medium leading-snug text-foreground">{query}</p>
          <IvCol className="gap-1">
            <IvBar widthPct={100} />
            <IvBar widthPct={95} faint />
            <IvBar widthPct={88} faint />
          </IvCol>
        </IvCol>
        <IvCol className="w-[28%] shrink-0 gap-1 rounded-md bg-muted/50 p-2">
          <IvEyebrow className="text-[0.55rem]">Citations</IvEyebrow>
          {cites.map((c, i) => (
            <IvRow key={c} between className="gap-1">
              <IvChip className="max-w-full truncate text-[0.55rem]">{c}</IvChip>
              {field === "rel" && i === 1 ? (
                <span className="shrink-0 rounded-full bg-primary px-1.5 text-[0.5rem] font-semibold text-primary-foreground">
                  Approve
                </span>
              ) : null}
            </IvRow>
          ))}
        </IvCol>
      </IvRow>
      <IvRow className="mt-2 items-center justify-between gap-2 border-t border-border pt-2">
        <IvMeter fillPct={58} className="max-w-[40%]" />
        <IvRow className="gap-1">
          <IvChip className="text-[0.55rem]">Grounded only</IvChip>
          <span
            className="relative inline-flex h-5 w-9 cursor-default rounded-full bg-primary/25"
            aria-hidden
          >
            <span className="absolute left-0.5 top-0.5 size-4 rounded-full bg-primary" />
          </span>
        </IvRow>
      </IvRow>
      {field === "info" ? (
        <IvChip className="mt-1 w-fit text-[0.55rem]">Trace · 4 tool calls</IvChip>
      ) : null}
    </IntelView>
  );
}
