"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import type { LayoutNode } from "./useNetworkLayout";

type NodeModalProps = {
  node: LayoutNode | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NodeModal({ node, open, onOpenChange }: NodeModalProps) {
  if (!node) return null;

  const typeLabel =
    node.type === "persona" ? "Persona (synthetic)" : "Known connection";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">{node.label}</SheetTitle>
          <SheetDescription className="text-left text-muted-foreground">
            {typeLabel} · Tier {node.tier}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-3 text-sm text-foreground/90">
          <p>
            Nodes in this visualization represent people and personas in the scenius network around
            the anchor. Tiers measure relational distance from the center; edges show trust and
            collaboration.
          </p>
          <p className="text-muted-foreground">
            This is a demonstration graph with generated data for narrative purposes.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
