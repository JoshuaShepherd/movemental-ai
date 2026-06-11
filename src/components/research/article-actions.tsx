"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot, Printer, Quote } from "lucide-react";

import { cn } from "@/lib/utils";

import styles from "./research.module.css";

/**
 * Footer actions for a paper. Print opens the browser dialog; Cite copies a
 * formatted citation; "Ask your AI" hands off to the agent room.
 * PDF downloads are deferred (RL-90) until assets exist.
 */
export function ArticleActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  function handleCite() {
    const citation = `Movemental. "${title}." Movemental Research Library, 2026.`;
    void navigator.clipboard?.writeText(citation);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={cn(styles.articleActions, styles.hairlineTop)}>
      <button
        type="button"
        className={styles.articleActionsBtn}
        onClick={() => window.print()}
      >
        <Printer className={styles.iconSm} aria-hidden />
        Print this page
      </button>
      <span className={styles.articleActionsDivider} aria-hidden />
      <button type="button" className={styles.articleActionsBtn} onClick={handleCite}>
        <Quote className={styles.iconSm} aria-hidden />
        {copied ? "Citation copied" : "Cite this paper"}
      </button>
      <span className={styles.articleActionsDivider} aria-hidden />
      <Link href="/agent" className={styles.articleActionsBtn}>
        <Bot className={styles.iconSm} aria-hidden />
        Ask your AI about this
      </Link>
    </div>
  );
}
