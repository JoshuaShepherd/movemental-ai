import type { ReactNode } from "react";

import { FieldGuideMarkdown } from "@/components/field-guide/FieldGuideMarkdown";
import { Display } from "@/components/primitives/display";
import { Prose } from "@/components/primitives/prose";
import { Section } from "@/components/primitives/section";
import type { PublicLeaderPageModel, PublicPageSectionId } from "@/lib/movement-leaders/public-page-model";

import { cn } from "@/lib/utils";

type MovementLeaderPublicPageViewProps = {
  model: PublicLeaderPageModel;
  sectionActions?: Partial<Record<PublicPageSectionId, ReactNode>>;
  /** When true, outer Section uses default site chrome; when false, caller supplies background. */
  wrapWithSection?: boolean;
  className?: string;
};

function SectionBlock({
  id,
  title,
  children,
  action,
}: {
  id: string;
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <div className="flex flex-col gap-3 border-b border-border-soft pb-10 last:border-b-0 md:flex-row md:items-start md:justify-between md:gap-8">
        <div className="min-w-0 flex-1 space-y-4">
          <h2 className="font-serif text-xl font-medium italic tracking-tight text-foreground">{title}</h2>
          {children}
        </div>
        {action ? (
          <div className="shrink-0 pt-1 md:w-40 md:text-right">{action}</div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Shared body for `/movement-leaders/[slug]` and the authenticated ratification preview.
 * Keep layout aligned with the public route so the preview stays pixel-faithful.
 */
export function MovementLeaderPublicPageView({
  model,
  sectionActions,
  wrapWithSection = true,
  className,
}: MovementLeaderPublicPageViewProps) {
  const inner = (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--container-max)] px-[clamp(1.25rem,4vw,2.5rem)]",
        className,
      )}
    >
      <header className="mb-10 space-y-4">
        <Display as="h1" size="md" className="text-balance">
          {model.full_name}
        </Display>
        {model.primary_role || model.primary_organization ? (
          <p className="text-sm uppercase tracking-[0.08em] text-muted-foreground">
            {[model.primary_role, model.primary_organization].filter(Boolean).join(" · ")}
          </p>
        ) : null}
      </header>
      {model.photo_url ? (
        // eslint-disable-next-line @next/next/no-img-element -- arbitrary external storage URLs
        <img
          src={model.photo_url}
          alt={model.full_name}
          className="mb-10 max-h-80 w-auto rounded-lg object-cover shadow-ambient"
        />
      ) : null}

      <div className="flex flex-col gap-12">
        <SectionBlock
          id="public-bio"
          title="Bio"
          action={sectionActions?.bio}
        >
          <Prose as="div" className="max-w-none">
            {model.bio_long ? (
              <div className="whitespace-pre-wrap text-muted-foreground">{model.bio_long}</div>
            ) : model.bio_short ? (
              <p>{model.bio_short}</p>
            ) : (
              <p className="text-muted-foreground">Bio coming soon.</p>
            )}
          </Prose>
        </SectionBlock>

        <SectionBlock id="public-personal-piece" title="Personal piece" action={sectionActions?.personal_piece}>
          {model.personal_piece ? (
            <Prose as="div" className="max-w-none">
              <div className="whitespace-pre-wrap text-muted-foreground">{model.personal_piece}</div>
            </Prose>
          ) : (
            <p className="text-sm text-muted-foreground">No personal piece yet.</p>
          )}
        </SectionBlock>

        <SectionBlock id="public-frameworks" title="Frameworks" action={sectionActions?.frameworks}>
          {model.frameworks_markdown ? (
            <Prose>
              <FieldGuideMarkdown markdown={model.frameworks_markdown} />
            </Prose>
          ) : (
            <p className="text-sm text-muted-foreground">Frameworks will appear here when provided.</p>
          )}
        </SectionBlock>

        <SectionBlock
          id="public-organizational-footprint"
          title="Organizational footprint"
          action={sectionActions?.organizational_footprint}
        >
          {model.organizational_footprint_markdown ? (
            <Prose>
              <FieldGuideMarkdown markdown={model.organizational_footprint_markdown} />
            </Prose>
          ) : (
            <p className="text-sm text-muted-foreground">Organizational footprint will appear here when provided.</p>
          )}
        </SectionBlock>

        <SectionBlock id="public-endorsements" title="Endorsements" action={sectionActions?.endorsements}>
          {model.endorsements_markdown ? (
            <Prose>
              <FieldGuideMarkdown markdown={model.endorsements_markdown} />
            </Prose>
          ) : (
            <p className="text-sm text-muted-foreground">Endorsements will appear here when provided.</p>
          )}
        </SectionBlock>
      </div>
    </div>
  );

  if (wrapWithSection) {
    return (
      <Section variant="default" spacing="lg" className="flex-1">
        {inner}
      </Section>
    );
  }

  return <div className="flex-1">{inner}</div>;
}
