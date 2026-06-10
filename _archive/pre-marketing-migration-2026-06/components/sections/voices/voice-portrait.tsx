import Image from "next/image";

type Props = {
  imageSrc?: string;
  imageAlt: string;
  initials: string;
  /** Sizes hint passed to next/image — vary per layout. */
  sizes?: string;
};

/**
 * Editorial portrait used by `VoiceCard` and the per-voice detail page.
 */
export function VoicePortrait({
  imageSrc,
  imageAlt,
  initials,
  sizes = "(max-width: 1024px) 100vw, 33vw",
}: Props) {
  if (imageSrc) {
    return (
      <div className="relative aspect-4/5 w-full overflow-hidden bg-section">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          sizes={sizes}
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-4/5 w-full flex-col items-center justify-center gap-3 bg-section px-6 text-center">
      <span className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {initials}
      </span>
      <span className="max-w-[14ch] text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground">
        Editorial portrait in production
      </span>
    </div>
  );
}
