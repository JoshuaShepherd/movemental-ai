import Image from "next/image";

import { cn } from "@/lib/utils";
import {
  BOOK_COVER_IMAGE,
  BOOK_TITLE,
  FIELD_GUIDE_COVER_IMAGE,
} from "@/lib/book-meta";
import { SAFETY_FIELD_GUIDE_DISPLAY_TITLE } from "@/lib/safety-field-guide";

type BookCoverVariant = "book" | "field-guide";

type BookCoverProps = {
  className?: string;
  /** `book` — full manuscript cover; `field-guide` — alternate cover art (homepage block). */
  variant?: BookCoverVariant;
  priority?: boolean;
};

export function BookCover({ className, variant = "book", priority }: BookCoverProps) {
  const src = variant === "field-guide" ? FIELD_GUIDE_COVER_IMAGE : BOOK_COVER_IMAGE;
  const alt =
    variant === "field-guide"
      ? `${SAFETY_FIELD_GUIDE_DISPLAY_TITLE} — Movemental Safety Field Guide cover`
      : `Book cover: ${BOOK_TITLE}`;

  return (
    <div
      data-slot="book-cover"
      data-variant={variant}
      className={cn(
        "relative mx-auto w-full overflow-hidden rounded-xl shadow-ambient",
        variant === "field-guide" ? "aspect-video max-w-[420px]" : "aspect-[3/4] max-w-[320px]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={
          variant === "field-guide" ? "(max-width: 1024px) 90vw, 420px" : "(max-width: 1024px) 90vw, 320px"
        }
        className="object-cover"
      />
    </div>
  );
}
