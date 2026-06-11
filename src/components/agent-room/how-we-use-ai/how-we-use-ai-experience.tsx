"use client";

import { useCallback, useEffect, useState } from "react";

import { DocumentPageShell } from "@/components/agent-room/document/document-page-shell";
import { AskAiPromptButton } from "@/components/agent-room/ink/ask-ai-prompt-button";
import { useScrollSpy } from "@/components/agent-room/institutions/use-scroll-spy";

import {
  HOW_WE_USE_AI_DOCK,
  HOW_WE_USE_AI_NAV,
  HOW_WE_USE_AI_SPY_SECTIONS,
  NAMED_REFUSALS,
  SCENIUS_REFUSALS,
  TRAFFIC_LIGHTS,
} from "./how-we-use-ai-data";
import styles from "./how-we-use-ai.module.css";

const SPY_IDS = HOW_WE_USE_AI_SPY_SECTIONS.map((s) => s.id);

const SIGNAL_DOT_CLASS = {
  green: styles.signalDotGreen,
  yellow: styles.signalDotYellow,
  red: styles.signalDotRed,
} as const;

/**
 * `/agent/how-we-use-ai` — transparency page: named refusals, traffic-light
 * framework, node posture, and scenius product refusals.
 */
export function HowWeUseAiExperience() {
  const spyIndex = useScrollSpy(SPY_IDS);
  const activeNavIndex = HOW_WE_USE_AI_SPY_SECTIONS[spyIndex]?.navIndex ?? 0;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeLabel = HOW_WE_USE_AI_NAV[activeNavIndex]?.label ?? HOW_WE_USE_AI_NAV[0].label;

  return (
    <DocumentPageShell
      voiceLine={HOW_WE_USE_AI_DOCK.voiceLine}
      chips={HOW_WE_USE_AI_DOCK.chips}
      highlightChipLabel={HOW_WE_USE_AI_DOCK.highlightChipLabel}
      screenKey="how-we-use-ai"
    >
      <>
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
              aria-controls="how-we-use-ai-mobile-menu"
              onClick={() => setMobileMenuOpen((o) => !o)}
            >
              Sections
            </button>
          </div>
          <nav
            id="how-we-use-ai-mobile-menu"
            className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ""}`}
            aria-label="Page sections"
          >
            {HOW_WE_USE_AI_NAV.map((entry, i) => (
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
              {HOW_WE_USE_AI_NAV.map((entry, i) => (
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
            <section className={`${styles.section} ${styles.hero}`} id="hero">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>How we use AI</p>
                <h1 className={styles.title}>We use the tools we sell — on ourselves, first.</h1>
                <p className={styles.body}>
                  We do not ask organizations to do anything we have not done. Every guardrail we
                  ask a leader or a board to ratify, we have built into our own work first. This
                  page is where we name what we refuse, how we sort use cases, and what we will not
                  build — so anyone reading the site knows where we stand.
                </p>
              </div>
            </section>

            <section className={styles.section} id="what-we-refuse">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>What we refuse</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>Three lines we do not cross.</h2>
                <p className={styles.body}>
                  These refusals are load-bearing — not ethics bolted onto a product after the fact.
                  They shape every line of code we ship and every artifact we facilitate.
                </p>
                <div className={styles.refusalList}>
                  {NAMED_REFUSALS.map((refusal) => (
                    <article key={refusal.term} className={styles.refusalRow}>
                      <h3 className={styles.refusalTerm}>{refusal.term}</h3>
                      <p className={styles.refusalBody}>{refusal.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className={`${styles.section} ${styles.bandSurface}`} id="traffic-lights">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>Green / yellow / red</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>How we sort use cases.</h2>
                <p className={styles.body}>
                  Not all AI use is equivalent. This is the same framework we use in Safety and
                  Sandbox engagements — and how we evaluate our own use internally.
                </p>
                <div className={styles.signalList}>
                  {TRAFFIC_LIGHTS.map((light) => (
                    <article key={light.label} className={styles.signalRow}>
                      <p className={styles.signalLabel}>
                        <span
                          className={`${styles.signalDot} ${SIGNAL_DOT_CLASS[light.signal]}`}
                          aria-hidden="true"
                        />
                        {light.label}
                      </p>
                      <div>
                        <h3 className={styles.signalHeading}>{light.heading}</h3>
                        <p className={styles.signalBody}>{light.body}</p>
                        <ul className={styles.exampleList}>
                          {light.examples.map((ex) => (
                            <li key={ex}>{ex}</li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className={styles.section} id="you-are-the-node">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>You are the node</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>AI is infrastructure for your credibility — not your substitute.</h2>
                <p className={styles.body}>
                  The sustainable pattern: you handle creation and authority — what you teach, what
                  you write, what you put your name on. AI handles discoverability and circulation:
                  structure, metadata, translation, formatting, linking. Your work becomes legible
                  and connected without the machine becoming you.
                </p>
                <p className={styles.body}>
                  AI can help the node be legible and connected. It never becomes the node. Only
                  people can vouch for you. Only you can mean what you say before God and stand
                  answerable for it as true.
                </p>
                <p className={styles.hand}>You in the foreground. AI in the background.</p>
              </div>
            </section>

            <section className={`${styles.section} ${styles.bandPaper}`} id="scenius-refusals">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>The scenius refusals</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>What we will not build into the network.</h2>
                <p className={styles.body}>
                  The extractive version of this business is obvious — and we are building against
                  it. That includes product choices, not only policy statements.
                </p>
                <ul className={styles.sceniusList}>
                  {SCENIUS_REFUSALS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className={styles.body} style={{ marginTop: "1.15rem" }}>
                  If a feature would feel extractive to us as members, we don&apos;t ship it.
                </p>
                <AskAiPromptButton
                  prompt={`I'm reading Movemental's "How We Use AI" page (movemental.ai/agent/how-we-use-ai) — their named refusals, green/yellow/red framework, and scenius product refusals. Summarize what Movemental commits to refuse, how they sort AI use cases, and what questions I should ask before trusting an AI vendor in the church/nonprofit space.`}
                />
              </div>
            </section>
          </main>
        </div>
      </>
    </DocumentPageShell>
  );
}
