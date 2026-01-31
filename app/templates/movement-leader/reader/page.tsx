"use client";

import { useState , useEffect } from "react";
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
import { useTemplateVariant } from "@/app/templates/template-variant-context";

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

  const { setVariant } = useTemplateVariant();
  useEffect(() => { setVariant(activeTemplate); }, [activeTemplate, setVariant]);

  return (
    <>
      <div className="sticky top-14 z-40 bg-background border-b">
        <ReaderTemplateSwitcher activeTemplate={activeTemplate} onTemplateChange={setActiveTemplate} />
      </div>
      <ActiveComponent />
    </>
  );
}
