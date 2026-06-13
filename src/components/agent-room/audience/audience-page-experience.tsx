"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import { DocumentPageShell } from "@/components/agent-room/document/document-page-shell";
import { DeckSection } from "@/components/agent-room/deck/deck-section";
import { AskAiPromptButton } from "@/components/agent-room/ink/ask-ai-prompt-button";
import { PATH_STAGE_LABELS } from "@/lib/agent-room/naming";

import { AudienceAssessmentPreview } from "./assessment-preview";
import styles from "./audience-page.module.css";
import { FoundationDiagram } from "./foundation-diagram";
import { getLetterEmbedParagraphs, getLetterFullText } from "./letter-utils";
import { PATH_STAGES } from "./institutions-config";
import type { AudiencePageConfig } from "./types";
import { useScrollSpy } from "./use-scroll-spy";

type AudiencePageExperienceProps = {
  config: AudiencePageConfig;
  letterMarkdown: string;
};

/** Anchor id + seam-out target for the embedded "Why a platform" deck. */
const DECK_ANCHOR_ID = "why-a-platform";
const DECK_SKIP_TO_ID = "formation";

function renderWithHighlight(text: string, phrase: string | undefined): ReactNode {
  if (!phrase) return text;
  const idx = text.indexOf(phrase);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className={styles.hl}>{phrase}</span>
      {text.slice(idx + phrase.length)}
    </>
  );
}

/**
 * Shared long-form audience document — churches, nonprofits, institutions.
 * Left sticky sidebar, you-first narrative arc, embedded letter (trimmed
 * on-page; full text for download). Assessment preview lives in The build.
 */
export function AudiencePageExperience({ config, letterMarkdown }: AudiencePageExperienceProps) {
  const claimFirstHero = Boolean(config.hero.claim);

  // Insert the deck's nav anchor after "The build" when a deck is present, so
  // churches / institutions (no deck) keep the original eight-item nav.
  const navEntries = useMemo(() => {
    if (!config.deck) return config.nav;
    const entries = [...config.nav];
    const at = entries.findIndex((entry) => entry.id === "the-build");
    const insertAt = at === -1 ? entries.length : at + 1;
    entries.splice(insertAt, 0, { id: DECK_ANCHOR_ID, label: config.deck.navLabel });
    return entries;
  }, [config.nav, config.deck]);

  const spyIds = useMemo(() => navEntries.map((entry) => entry.id), [navEntries]);
  const spyIndex = useScrollSpy(spyIds);
  const activeNavIndex = spyIndex;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const letterEmbed = useMemo(
    () => getLetterEmbedParagraphs(letterMarkdown, config.letterEmbedStart),
    [letterMarkdown, config.letterEmbedStart],
  );
  const letterFull = useMemo(() => getLetterFullText(letterMarkdown), [letterMarkdown]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const downloadLetter = useCallback(() => {
    const blob = new Blob([letterFull], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = config.start.downloadFilename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [letterFull, config.start.downloadFilename]);

  const sendToBoard = useCallback(() => {
    const subject = encodeURIComponent(config.start.sendToBoardSubject);
    const body = encodeURIComponent(
      letterFull.length > 1800
        ? `${letterFull.slice(0, 1600)}\n\n[… download the full letter from movemental.ai …]`
        : letterFull,
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }, [letterFull, config.start.sendToBoardSubject]);

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeLabel = navEntries[activeNavIndex]?.label ?? navEntries[0].label;
  const mobileMenuId = `${config.slug}-mobile-menu`;
  const pathHeadline = config.thePath.headline ?? "It all goes in one order.";

  return (
    <DocumentPageShell
      voiceLine={config.dock.voiceLine}
      chips={config.dock.chips}
      highlightChipLabel={config.dock.highlightChipLabel}
      screenKey={config.slug}
      audience={config.slug}
    >
      <div className={styles.mobileNav}>
        <div className={styles.mobileProgress} aria-hidden="true">
          <div className={styles.mobileProgressBar} style={{ width: `${scrollProgress}%` }} />
        </div>
        <div className={styles.mobileNavRow}>
          <span className={styles.mobileNavCurrent}>{activeLabel}</span>
          <button
            type="button"
            className={styles.mobileMenuBtn}
            aria-expanded={mobileMenuOpen}
            aria-controls={mobileMenuId}
            onClick={() => setMobileMenuOpen((o) => !o)}
          >
            Sections
          </button>
        </div>
        <nav
          id={mobileMenuId}
          className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ""}`}
          aria-label="Page sections"
        >
          {navEntries.map((entry, i) => (
            <button
              key={entry.id}
              type="button"
              className={i === activeNavIndex ? styles.mobileMenuLinkActive : styles.mobileMenuLink}
              onClick={() => {
                scrollTo(entry.id);
                setMobileMenuOpen(false);
              }}
            >
              {entry.label}
            </button>
          ))}
        </nav>
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Page sections">
          <p className={styles.sidebarLabel}>On this page</p>
          <nav className={styles.sidebarNav}>
            {navEntries.map((entry, i) => (
              <button
                key={entry.id}
                type="button"
                className={`${styles.sidebarLink} ${i === activeNavIndex ? styles.sidebarLinkActive : ""}`}
                aria-current={i === activeNavIndex ? "true" : undefined}
                onClick={() => scrollTo(entry.id)}
              >
                {entry.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className={styles.main}>
          {!claimFirstHero ? (
            <section className={`${styles.section} ${styles.hero}`} id="hero">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>{config.hero.eyebrow}</p>
                <h1 className={styles.title}>{config.hero.title}</h1>
                <p className={styles.sub}>{config.hero.sub}</p>
              </div>
            </section>
          ) : null}

          <section
            className={`${styles.section} ${claimFirstHero ? styles.whereYouStand : ""}`}
            id="where-you-stand"
          >
            <div className={`${styles.sectionInner} ${styles.sectionInnerWide}`}>
              {claimFirstHero ? (
                <>
                  <p className={styles.eyebrow}>{config.hero.eyebrow}</p>
                  {config.hero.rhetoricalTitle ? (
                    <h1 className={styles.title}>
                      {renderWithHighlight(
                        config.hero.rhetoricalTitle,
                        config.hero.highlightPhrase,
                      )}
                    </h1>
                  ) : null}
                  {config.hero.framing ? (
                    <p className={styles.framing}>{config.hero.framing}</p>
                  ) : null}
                  {config.hero.claim ? <p className={styles.claim}>{config.hero.claim}</p> : null}
                  {config.hero.segue ? <p className={styles.segue}>{config.hero.segue}</p> : null}
                </>
              ) : (
                <p className={styles.eyebrow}>Where you stand</p>
              )}

              <div className={claimFirstHero ? styles.evidenceBlock : undefined}>
                {!claimFirstHero ? (
                  <p className={styles.eyebrow}>Where you stand</p>
                ) : null}
                <h2 className={`${styles.title} ${styles.titleSm}`}>{config.painSection.title}</h2>
                <p className={styles.intro}>{config.painSection.intro}</p>
                <div className={styles.cardGrid} role="list">
                  {config.painSection.cards.map((card) => (
                    <article key={card.title} className={styles.card} role="listitem">
                      <h3 className={styles.cardTitle}>{card.title}</h3>
                      <p className={styles.cardBody}>{card.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.bandSurface}`} id="deeper-problem">
            <div className={styles.sectionInner}>
              <p className={styles.eyebrow}>The deeper problem</p>
              <h2 className={`${styles.title} ${styles.titleSm}`}>{config.deeperProblem.title}</h2>
              {config.deeperProblem.paragraphs.map((para) => (
                <p key={para.slice(0, 48)} className={styles.body}>
                  {para}
                </p>
              ))}
            </div>
          </section>

          <section className={styles.section} id="the-case">
            <div className={`${styles.sectionInner} ${styles.sectionInnerWide}`}>
              <p className={styles.eyebrow}>The case</p>
              <h2 className={`${styles.title} ${styles.titleSm}`}>{config.theCase.title}</h2>
              <p className={styles.intro}>{config.theCase.intro}</p>
              <article className={styles.letterPanel} aria-label={config.theCase.letterAriaLabel}>
                <div className={styles.letterProse}>
                  {letterEmbed.map((para) => (
                    <p key={para.slice(0, 48)}>{para}</p>
                  ))}
                </div>
              </article>
              <div className={styles.letterActions}>
                <button type="button" className={styles.btnSecondary} onClick={downloadLetter}>
                  Download the letter
                </button>
                <button type="button" className={styles.btnSecondary} onClick={sendToBoard}>
                  Send to your board
                </button>
              </div>
              <AskAiPromptButton promptKey={config.theCase.askAiPromptKey} />
            </div>
          </section>

          <section className={styles.section} id="what-we-build">
            <div className={`${styles.sectionInner} ${styles.sectionInnerWide}`}>
              <p className={styles.eyebrow}>The foundation</p>
              <h2 className={`${styles.title} ${styles.titleSm}`}>{config.foundation.title}</h2>
              {config.foundation.paragraphs.map((para) => (
                <p key={para.slice(0, 48)} className={styles.body}>
                  {para}
                </p>
              ))}
              <div className={styles.fixRows} aria-label="How the foundation addresses each pain">
                {config.foundation.fixRows.map((row) => (
                  <div key={row.pain} className={styles.fixRow}>
                    <span className={styles.fixPain}>{row.pain}</span>
                    <span className={styles.fixArrow} aria-hidden="true">
                      →
                    </span>
                    <span className={styles.fixGain}>{row.gain}</span>
                  </div>
                ))}
              </div>
              <FoundationDiagram centerLabel={config.foundation.diagramCenterLabel} />
            </div>
          </section>

          <section className={`${styles.section} ${styles.bandPaper}`} id="the-build">
            <div className={`${styles.sectionInner} ${styles.sectionInnerWide}`}>
              <p className={styles.eyebrow}>The build</p>
              <h2 className={`${styles.title} ${styles.titleSm}`}>{config.theBuild.title}</h2>
              {config.theBuild.paragraphs.map((para) => (
                <p key={para.slice(0, 48)} className={styles.body}>
                  {para}
                </p>
              ))}
              <div className={styles.toolList}>
                {config.theBuild.toolExamples.map((tool) => (
                  <p key={tool.label} className={styles.toolItem}>
                    <span className={styles.toolLabel}>{tool.label}</span> {tool.text}
                  </p>
                ))}
              </div>
              <AudienceAssessmentPreview />
              {config.theBuild.bridgeQuestion ? (
                <p className={`${styles.body} ${styles.bridgeQuestion}`}>
                  {config.theBuild.bridgeQuestion}
                </p>
              ) : null}
            </div>
          </section>

          {config.deck ? (
            <DeckSection
              data={config.deck}
              foot={`Movemental · For ${config.slug}`}
              anchorId={DECK_ANCHOR_ID}
              skipToId={DECK_SKIP_TO_ID}
            />
          ) : null}

          <section className={`${styles.section} ${styles.bandSurface}`} id="formation">
            <div className={styles.sectionInner}>
              <p className={styles.eyebrow}>Formation</p>
              <h2 className={`${styles.title} ${styles.titleSm}`}>{config.formation.title}</h2>
              {config.formation.paragraphs.map((para) => (
                <p key={para.slice(0, 48)} className={styles.body}>
                  {para}
                </p>
              ))}
              {config.formation.handLine ? (
                <p className={styles.hand}>{config.formation.handLine}</p>
              ) : null}
            </div>
          </section>

          <section className={styles.section} id="the-path">
            <div className={`${styles.sectionInner} ${styles.sectionInnerWide}`}>
              <p className={styles.eyebrow}>The path</p>
              <h2 className={`${styles.title} ${styles.titleSm}`}>{pathHeadline}</h2>
              <p className={styles.body}>{config.thePath.intro}</p>
              {config.thePath.closing ? (
                <p className={styles.body}>{config.thePath.closing}</p>
              ) : null}
              <div
                className={styles.stageRail}
                aria-label={`Four stages: ${PATH_STAGE_LABELS.safety}, ${PATH_STAGE_LABELS.sandbox}, ${PATH_STAGE_LABELS.training}, ${PATH_STAGE_LABELS.tech}`}
              >
                {PATH_STAGES.map((stage) => (
                  <div
                    key={stage.title}
                    className={`${styles.stage} ${stage.here ? styles.stageHere : ""}`}
                  >
                    <span className={styles.stageNum}>{stage.n}</span>
                    <p className={styles.stageTitle}>{stage.title}</p>
                    {stage.here ? <span className={styles.stageNote}>You are here</span> : null}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.bandPaper}`} id="start">
            <div className={styles.sectionInner}>
              <p className={styles.eyebrow}>Start</p>
              <h2 className={`${styles.title} ${styles.titleSm}`}>{config.start.title}</h2>
              <p className={styles.body}>{config.start.body}</p>
              <div className={styles.startCtas}>
                <a className={styles.btnPrimary} href={config.start.mailtoHref}>
                  Talk to us
                </a>
                <a className={styles.btnSecondary} href="/assess">
                  Map your organization in depth
                </a>
                <button type="button" className={styles.btnSecondary} onClick={downloadLetter}>
                  Download the letter
                </button>
              </div>
              <AskAiPromptButton promptKey={config.start.askAiPromptKey} />
            </div>
          </section>
        </main>
      </div>
    </DocumentPageShell>
  );
}
