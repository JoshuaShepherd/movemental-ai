"use client";

import Image from "next/image";

import { IMAGES } from "@/lib/visual-style-finder/data/images";

import { copyImageSrc } from "./clipboard";
import { SelectableTile } from "./selectable-tile";
import { StepLead } from "./step-lead";
import { stepKey } from "@/lib/visual-style-finder/constants";

type ImagesStepProps = {
  selected: Set<string>;
  onToggle: (id: string) => void;
  onCopied: (label: string) => void;
};

export function ImagesStep({ selected, onToggle, onCopied }: ImagesStepProps) {
  const copyImage = async (id: string) => {
    const im = IMAGES.find((x) => x.id === id);
    if (!im) return;
    try {
      const result = await copyImageSrc(im.src, im.id);
      onCopied(result === "copied" ? "Image copied — paste into Stitch" : "Image downloaded");
    } catch {
      onCopied("Copy failed");
    }
  };

  return (
    <div>
      <StepLead
        kicker={stepKey("images")}
        title="Now — the images."
        description="Same idea: tap the ones you love. Look for what keeps catching your eye, not what you think you should pick."
      />

      <div className="columns-2 gap-2.5 md:columns-3 xl:columns-4">
        {IMAGES.map((im) => (
          <SelectableTile
            key={im.id}
            selected={selected.has(im.id)}
            onToggle={() => onToggle(im.id)}
            onCopy={() => void copyImage(im.id)}
            copyLabel="Copy image"
            ariaLabel={im.alt}
            indexLabel={String(im.n).padStart(2, "0")}
          >
            <Image
              src={im.src}
              alt={im.alt}
              width={im.w}
              height={im.h}
              className="block h-auto w-full"
              sizes="(max-width:640px) 50vw, (max-width:1080px) 33vw, 25vw"
            />
          </SelectableTile>
        ))}
      </div>
    </div>
  );
}
