import { cn } from "@/lib/utils";

export type Endorsement = {
  id: string;
  quote: string;
  endorserName: string;
  endorserTitle: string;
  endorserOrg?: string;
  endorserAvatarUrl?: string;
  featured?: boolean;
  /** When set, used for wall filtering and chapter-specific margin placement */
  audienceLens?: "movement-leaders" | "churches" | "nonprofits" | "institutions" | "other";
  chapterSlug?: string;
};

type EndorsementCardProps = {
  endorsement: Endorsement;
  className?: string;
};

export function EndorsementCard({ endorsement, className }: EndorsementCardProps) {
  return (
    <figure
      data-slot="endorsement-card"
      className={cn("rounded-xl bg-card p-6", className)}
    >
      <blockquote className="text-sm leading-relaxed text-muted-foreground">
        &ldquo;{endorsement.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        {endorsement.endorserAvatarUrl ? (
          <img
            src={endorsement.endorserAvatarUrl}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-section text-sm font-semibold text-foreground">
            {endorsement.endorserName.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-foreground">
            {endorsement.endorserName}
          </p>
          <p className="text-xs text-muted-foreground">
            {endorsement.endorserTitle}
            {endorsement.endorserOrg && `, ${endorsement.endorserOrg}`}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
