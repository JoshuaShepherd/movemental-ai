"use client";

import { useState } from "react";
import {
  BooksProductShowcase,
  BooksSpecCards,
  BooksFilteredGrid,
  BooksDetailCart,
  BooksMinimalGrid,
  BooksRelatedProducts,
  BooksDetailClean,
  BooksDetailSplit,
  BooksDetailModal,
  BooksTemplateSwitcher,
} from "@/components/layouts/movement-leader";
import type { BooksVariant } from "@/components/layouts/movement-leader";

const templateComponents: Record<BooksVariant, React.ComponentType> = {
  "books-product-showcase": BooksProductShowcase,
  "books-spec-cards": BooksSpecCards,
  "books-filtered-grid": BooksFilteredGrid,
  "books-detail-cart": BooksDetailCart,
  "books-minimal-grid": BooksMinimalGrid,
  "books-related-products": BooksRelatedProducts,
  "books-detail-clean": BooksDetailClean,
  "books-detail-split": BooksDetailSplit,
  "books-detail-modal": BooksDetailModal,
};

export default function BooksTemplatePage() {
  const [activeTemplate, setActiveTemplate] =
    useState<BooksVariant>("books-product-showcase");
  const ActiveComponent = templateComponents[activeTemplate];

  return (
    <div className="template-movement-leader" data-variant={activeTemplate}>
      <div className="sticky top-14 z-40 bg-background border-b">
        <BooksTemplateSwitcher
          activeTemplate={activeTemplate}
          onTemplateChange={setActiveTemplate}
        />
      </div>
      <ActiveComponent />
    </div>
  );
}
