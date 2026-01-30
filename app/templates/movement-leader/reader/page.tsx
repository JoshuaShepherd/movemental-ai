"use client";

import { useState } from "react";
import {
  ReaderDocsSidebar,
  ReaderEbookDark,
  ReaderArticleClean,
  ReaderHighlightTools,
  ReaderMinimalScroll,
  ReaderPaginatedBook,
  ReaderChapterNav,
  ReaderSplitReference,
  ReaderImmersiveDark,
  ReaderNewsletterDigest,
  ReaderTemplateSwitcher,
} from "@/components/layouts/movement-leader";
import type { ReaderVariant } from "@/components/layouts/movement-leader";

const templateComponents: Record<ReaderVariant, React.ComponentType> = {
  "reader-docs-sidebar": ReaderDocsSidebar,
  "reader-ebook-dark": ReaderEbookDark,
  "reader-article-clean": ReaderArticleClean,
  "reader-highlight-tools": ReaderHighlightTools,
  "reader-minimal-scroll": ReaderMinimalScroll,
  "reader-paginated-book": ReaderPaginatedBook,
  "reader-chapter-nav": ReaderChapterNav,
  "reader-split-reference": ReaderSplitReference,
  "reader-immersive-dark": ReaderImmersiveDark,
  "reader-newsletter-digest": ReaderNewsletterDigest,
};

export default function ReaderTemplatePage() {
  const [activeTemplate, setActiveTemplate] = useState<ReaderVariant>("reader-docs-sidebar");
  const ActiveComponent = templateComponents[activeTemplate];

  return (
    <div className="template-movement-leader" data-variant={activeTemplate}>
      <div className="sticky top-14 z-40 bg-background border-b">
        <ReaderTemplateSwitcher activeTemplate={activeTemplate} onTemplateChange={setActiveTemplate} />
      </div>
      <ActiveComponent />
    </div>
  );
}
