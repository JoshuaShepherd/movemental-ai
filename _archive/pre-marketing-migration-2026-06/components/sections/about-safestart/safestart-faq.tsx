"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { SAFESTART_FAQ_ITEMS } from "./faq-data";

export function SafeStartFaq() {
  return (
    <Accordion type="single" collapsible className="w-full border-t border-border">
      {SAFESTART_FAQ_ITEMS.map((item) => (
        <AccordionItem
          key={item.slug}
          id={item.slug}
          value={item.slug}
          className="scroll-mt-28 border-b border-border"
        >
          <AccordionTrigger className="py-5 text-left text-base font-medium text-foreground md:text-lg">
            {item.q}
          </AccordionTrigger>
          <AccordionContent>
            <div className="max-w-[60ch] pb-5 text-[15px] leading-relaxed text-muted-foreground md:text-base">
              {item.answer}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
