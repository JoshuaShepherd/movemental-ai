"use client";

import Link from "next/link";
import { Fragment } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLink } from "@/components/primitives";

import type { FaqItem, FaqSectionData, FaqSegment } from "./faq/faq-data";

function renderSegments(segments: readonly FaqSegment[]) {
  return segments.map((seg, i) => {
    if (seg.kind === "text") {
      return <Fragment key={i}>{seg.text}</Fragment>;
    }
    return (
      <Link
        key={i}
        href={seg.href}
        className="font-medium text-primary underline-offset-4 hover:underline"
      >
        {seg.text}
      </Link>
    );
  });
}

export function FaqAccordion({ sections }: { sections: readonly FaqSectionData[] }) {
  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <div key={section.num} id={`faq-${section.num}`} className="scroll-mt-28">
          <div className="mb-4 flex items-baseline gap-3">
            <span className="text-sm font-semibold text-muted-foreground">{section.num}</span>
            <h2 className="text-xl font-medium text-foreground">{section.title}</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {section.items.map((item: FaqItem) => (
              <AccordionItem key={item.slug} id={item.slug} value={item.slug}>
                <AccordionTrigger className="text-left text-base font-medium text-foreground">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{renderSegments(item.segments)}</p>
                  {item.relatedLinks && item.relatedLinks.length > 0 ? (
                    <div className="mt-4 flex flex-col gap-2 border-t border-border pt-3">
                      {item.relatedLinks.map((rl) => (
                        <ArrowLink key={rl.href} href={rl.href} size="sm" tone="primary">
                          {rl.label}
                        </ArrowLink>
                      ))}
                    </div>
                  ) : null}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
