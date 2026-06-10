import { cn } from "@/lib/utils";

import {
  isNarrativeIntelSlug,
  isOperationalIntelSlug,
  NARRATIVE_INTEL_REGISTRY,
  OPERATIONAL_INTEL_REGISTRY,
} from "./registry";
import type { IntelArtifactBaseProps, NarrativeIntelSlug, OperationalIntelSlug } from "./types";

type Common = Omit<IntelArtifactBaseProps, "field"> & {
  /** Defaults to `info`. */
  field?: IntelArtifactBaseProps["field"];
};

export type IntelNarrativeArtifactProps = Common & {
  slug: NarrativeIntelSlug;
};

export type IntelOperationalArtifactProps = Common & {
  slug: OperationalIntelSlug;
};

const defaultField = "info" as const;

function baseProps(
  field: IntelArtifactBaseProps["field"],
  props: Omit<Common, "field">,
): IntelArtifactBaseProps {
  const { variant, audience, embedded, className, "aria-label": ariaLabel } = props;
  return {
    field,
    variant,
    audience,
    embedded,
    className,
    "aria-label": ariaLabel,
  };
}

/** Renders a narrative artifact view by slug (matches fragmentation story image basenames). */
export function IntelNarrativeArtifact({ slug, field = defaultField, ...rest }: IntelNarrativeArtifactProps) {
  const C = NARRATIVE_INTEL_REGISTRY[slug];
  return <C {...baseProps(field, rest)} />;
}

/** Renders an operational intelligence surface (SEO, GEO, agents, …). */
export function IntelOperationalArtifact({ slug, field = defaultField, ...rest }: IntelOperationalArtifactProps) {
  const C = OPERATIONAL_INTEL_REGISTRY[slug];
  return <C {...baseProps(field, rest)} />;
}

export type IntelArtifactBySlugProps = Common & {
  slug: NarrativeIntelSlug | OperationalIntelSlug;
};

/** Dispatches to narrative or operational registry. Unknown slugs render nothing. */
export function IntelArtifactBySlug({ slug, field = defaultField, ...rest }: IntelArtifactBySlugProps) {
  if (isNarrativeIntelSlug(slug)) {
    return <IntelNarrativeArtifact slug={slug} field={field} {...rest} />;
  }
  if (isOperationalIntelSlug(slug)) {
    return <IntelOperationalArtifact slug={slug} field={field} {...rest} />;
  }
  if (process.env.NODE_ENV === "development") {
    console.warn(`[IntelArtifactBySlug] unknown slug: ${slug}`);
  }
  return (
    <div
      className={cn(
        "flex min-h-[6rem] items-center justify-center rounded-[var(--radius-md)] bg-muted text-xs text-muted-foreground",
        rest.className,
      )}
    >
      Unknown artifact: {slug}
    </div>
  );
}
