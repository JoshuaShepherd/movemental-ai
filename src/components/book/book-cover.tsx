import Image from "next/image";

import { cn } from "@/lib/utils";
import {
  BOOK_COVER_IMAGE,
  BOOK_TITLE,
  FIELD_GUIDE_COVER_IMAGE,
} from "@/lib/book-meta";

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
      ? `Alternate cover: ${BOOK_TITLE}`
      : `Book cover: ${BOOK_TITLE}`;

  return (
    <div
      data-slot="book-cover"
      data-variant={variant}
      className={cn(
        "relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-xl shadow-ambient",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 90vw, 320px"
        className="object-cover"
      />
    </div>
  );
}
