"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

import { DocumentPageChrome } from "@/components/agent-room/document/document-page-chrome";
import { DocumentPageShell } from "@/components/agent-room/document/document-page-shell";
import shell from "@/components/agent-room/document/document-shell.module.css";
import { useDocumentScrollProgress } from "@/components/agent-room/document/use-document-scroll-progress";
import { useScrollSpy } from "@/components/agent-room/document/use-scroll-spy";
import { AskAiPromptButton } from "@/components/agent-room/ink/ask-ai-prompt-button";

import { CharterTabs } from "./charter-tabs";
import type { ChurchesEditionConfig } from "./churches-edition-types";
import styles from "./churches-edition.module.css";
import { EvidenceCardGrid } from "./evidence-card-grid";
import { PathOrderGrid } from "./path-order-grid";
import { PlatformCarousel } from "./platform-carousel";
import { RevealOnScroll } from "./reveal-on-scroll";
import { SolutionStack } from "./solution-stack";

type ChurchesEditionExperienceProps = {
  config: ChurchesEditionConfig;
};

export function ChurchesEditionExperience({ config }: ChurchesEditionExperienceProps) {
  const spyIds = useMemo(() => config.nav.map((entry) => entry.id), [config.nav]);
  const spyIndex = useScrollSpy(spyIds);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollProgress = useDocumentScrollProgress();

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const mobileMenuId = `${config.slug}-edition-mobile-menu`;

  return (
    <DocumentPageShell
      voiceLine={config.dock.voiceLine}
      chips={config.dock.chips}
      highlightChipLabel={config.dock.highlightChipLabel}
      screenKey={`${config.slug}-edition`}
      audience={config.slug}
    >
      <DocumentPageChrome
        entries={config.nav}
        activeNavIndex={spyIndex}
        scrollTo={scrollTo}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollProgress={scrollProgress}
        menuId={mobileMenuId}
      >
        <section className={`${shell.section} ${shell.hero}`} id="hero">
          <div className={`${shell.sectionInner} ${shell.sectionInnerWide}`}>
            <div className={styles.sheet}>
              <RevealOnScroll>
                <p className={shell.eyebrow}>{config.hero.eyebrow}</p>
                <h1 className={styles.leadClaim}>{config.hero.leadClaim}</h1>
                <p className={styles.prose}>{config.hero.intro}</p>
              </RevealOnScroll>
              <EvidenceCardGrid cards={config.evidenceCards} />
              <RevealOnScroll>
                <p className={styles.cardsNote}>{config.hero.cardsNote}</p>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <section className={shell.section} id="the-path">
          <div className={`${shell.sectionInner} ${shell.sectionInnerWide}`}>
            <div className={styles.sheet}>
              <RevealOnScroll>
                <p className={shell.eyebrow}>{config.path.eyebrow}</p>
                <h2 className={`${shell.title} ${shell.titleSm} ${styles.sectionTitle}`}>
                  {config.path.title}
                </h2>
                <p className={styles.prose}>{config.path.intro}</p>
              </RevealOnScroll>
              <PathOrderGrid stages={config.path.stages} />
              <RevealOnScroll>
                <p className={styles.orderNote}>{config.path.note}</p>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <section className={shell.section} id="stage-one">
          <div className={`${shell.sectionInner} ${shell.sectionInnerWide}`}>
            <div className={styles.sheet}>
              <RevealOnScroll>
                <p className={shell.eyebrow}>{config.safety.eyebrow}</p>
                <h2 className={`${shell.title} ${shell.titleSm} ${styles.sectionTitle}`}>
                  {config.safety.title}
                </h2>
                {config.safety.paragraphs.map((para, i) => (
                  <p key={para.slice(0, 48)} className={styles.prose}>
                    {para}
                    {i === config.safety.paragraphs.length - 1 ? (
                      <>
                        {" "}
                        <span className={styles.margin}>{config.safety.marginalia}</span>
                      </>
                    ) : null}
                  </p>
                ))}
              </RevealOnScroll>
              <CharterTabs parts={config.safety.charterParts} />
            </div>
          </div>
        </section>

        <section className={`${shell.section} ${shell.bandPaper}`} id="stage-four">
          <div className={`${shell.sectionInner} ${shell.sectionInnerWide}`}>
            <div className={styles.sheet}>
              <RevealOnScroll>
                <p className={shell.eyebrow}>{config.solutions.eyebrow}</p>
                <h2 className={`${shell.title} ${shell.titleSm} ${styles.sectionTitle}`}>
                  {config.solutions.title}
                </h2>
                <p className={styles.prose}>{config.solutions.intro}</p>
              </RevealOnScroll>
              <SolutionStack
                layers={config.solutions.layers}
                charterMini={config.solutions.charterMini}
              />
            </div>
          </div>
        </section>

        <section
          className={`${shell.section} ${styles.darkSection}`}
          id="why-a-platform"
        >
          <div className={styles.darkWrap}>
            <RevealOnScroll>
              <p className={styles.eyebrowDark}>{config.platform.eyebrow}</p>
              <h2 className={`${shell.title} ${shell.titleSm} ${styles.darkTitle} ${styles.sectionTitle}`}>
                {config.platform.title}
              </h2>
            </RevealOnScroll>
            <PlatformCarousel slides={config.platform.slides} />
          </div>
        </section>

        <section className={`${shell.section} ${shell.bandSurface}`} id="the-limit">
          <div className={shell.sectionInner}>
            <div className={styles.sheet}>
              <RevealOnScroll>
                <p className={shell.eyebrow}>{config.limit.eyebrow}</p>
                <h2 className={`${shell.title} ${shell.titleSm} ${styles.sectionTitle}`}>
                  {config.limit.title}
                </h2>
                {config.limit.paragraphs.map((para, i) => (
                  <p key={para.slice(0, 48)} className={styles.prose}>
                    {para}
                    {i === config.limit.paragraphs.length - 1 ? (
                      <>
                        {" "}
                        <span className={styles.margin}>{config.limit.marginalia}</span>
                      </>
                    ) : null}
                  </p>
                ))}
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <section className={`${shell.section} ${shell.bandPaper}`} id="start">
          <div className={shell.sectionInner}>
            <div className={styles.sheet}>
              <RevealOnScroll>
                <p className={shell.eyebrow}>{config.start.eyebrow}</p>
                <h2 className={`${shell.title} ${shell.titleSm} ${styles.sectionTitle}`}>
                  {config.start.title}
                </h2>
                <p className={styles.prose}>{config.start.body}</p>
                <div className={styles.ctaRow}>
                  {config.start.ctas.map((cta) =>
                    cta.variant === "solid" ? (
                      <a
                        key={cta.label}
                        className={styles.btnSolid}
                        href={cta.href}
                      >
                        {cta.label}
                      </a>
                    ) : (
                      <Link key={cta.label} className={styles.btnGhost} href={cta.href}>
                        {cta.label}
                      </Link>
                    ),
                  )}
                </div>
              </RevealOnScroll>
              <AskAiPromptButton promptKey={config.start.askAiPromptKey} />
            </div>
          </div>
        </section>
      </DocumentPageChrome>
    </DocumentPageShell>
  );
}
