"use client";

import { useCallback, useState } from "react";

import { DocumentPageChrome } from "@/components/agent-room/document/document-page-chrome";
import { DocumentPageShell } from "@/components/agent-room/document/document-page-shell";
import shell from "@/components/agent-room/document/document-shell.module.css";
import { useDocumentScrollProgress } from "@/components/agent-room/document/use-document-scroll-progress";
import { useScrollSpy } from "@/components/agent-room/document/use-scroll-spy";
import { AskAiPromptButton } from "@/components/agent-room/ink/ask-ai-prompt-button";

import {
  HOW_WE_USE_AI_DOCK,
  HOW_WE_USE_AI_NAV,
  HOW_WE_USE_AI_SPY_SECTIONS,
  COMPANY_COMMITMENTS,
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
  const scrollProgress = useDocumentScrollProgress();

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <DocumentPageShell
      voiceLine={HOW_WE_USE_AI_DOCK.voiceLine}
      chips={HOW_WE_USE_AI_DOCK.chips}
      highlightChipLabel={HOW_WE_USE_AI_DOCK.highlightChipLabel}
      screenKey="how-we-use-ai"
    >
      <DocumentPageChrome
        entries={HOW_WE_USE_AI_NAV}
        activeNavIndex={activeNavIndex}
        scrollTo={scrollTo}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollProgress={scrollProgress}
        menuId="how-we-use-ai-mobile-menu"
      >
            <section className={`${shell.section} ${shell.hero}`} id="hero">
              <div className={shell.sectionInner}>
                <p className={shell.eyebrow}>How we use AI</p>
                <h1 className={shell.title}>We use the tools we sell. On ourselves, first.</h1>
                <p className={shell.body}>
                  We do not ask organizations to do anything we have not done. Every guardrail we
                  ask a leader or a board to ratify, we have built into our own work first. This
                  page is where we name what we refuse, how we sort use cases, and what we will not
                  build, so anyone reading the site knows where we stand.
                </p>
                <p className={shell.body}>
                  Most public AI discourse splits into &ldquo;AI is a savior&rdquo; or &ldquo;AI is a
                  threat.&rdquo; We reject both. AI surfaces and amplifies what humans have already
                  produced, and how a person reacts to it often reveals their underlying view of human
                  nature. Our work starts from a simpler operational rule: if AI mirrors the humans
                  it is around, govern the humans, the corpus, and the relationships first.
                </p>
              </div>
            </section>

            <section className={`${shell.section} ${shell.bandPaper}`} id="our-commitments">
              <div className={shell.sectionInner}>
                <p className={shell.eyebrow}>Our commitments</p>
                <h2 className={`${shell.title} ${shell.titleSm}`}>
                  What we will not do, ever.
                </h2>
                <p className={shell.body}>
                  These are not preferences. They are the line. Breaking one would cost the
                  exact trust we exist to protect.
                </p>
                <ul className={styles.commitmentList}>
                  {COMPANY_COMMITMENTS.map((item) => (
                    <li key={item.lead} className={styles.commitmentItem}>
                      <strong>{item.lead}</strong> {item.rest}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className={shell.section} id="what-we-refuse">
              <div className={shell.sectionInner}>
                <p className={shell.eyebrow}>What we refuse</p>
                <h2 className={`${shell.title} ${shell.titleSm}`}>Three lines we do not cross.</h2>
                <p className={shell.body}>
                  These refusals are essential, not ethics bolted onto a product after the fact.
                  They shape every line of code we ship and every document we help produce.
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

            <section className={`${shell.section} ${shell.bandSurface}`} id="traffic-lights">
              <div className={shell.sectionInner}>
                <p className={shell.eyebrow}>Green / yellow / red</p>
                <h2 className={`${shell.title} ${shell.titleSm}`}>How we sort use cases.</h2>
                <p className={shell.body}>
                  Not all AI use is equivalent. This is the same framework we use in Safety and
                  Sandbox engagements, and how we evaluate our own use internally.
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

            <section className={shell.section} id="you-are-the-node">
              <div className={shell.sectionInner}>
                <p className={shell.eyebrow}>You stay in charge</p>
                <h2 className={`${shell.title} ${shell.titleSm}`}>AI supports your credibility, it does not replace you.</h2>
                <p className={shell.body}>
                  The sustainable pattern: you handle creation and authority, what you teach, what
                  you write, what you put your name on. AI handles discoverability and circulation:
                  structure, metadata, translation, formatting, linking. Your work becomes easier
                  to find and connect without the machine becoming you.
                </p>
                <p className={shell.body}>
                  AI is trained on the broad output of human writing, speech, and behavior. When you
                  interact with it, it mirrors and amplifies what it has been trained on, and it
                  mirrors and amplifies you specifically. That is why the most important operational
                  decision is not which model you pick. It is who you deliberately gather around the
                  work: the humans whose corpus, judgment, and vouching the system will reflect back.
                </p>
                <p className={shell.body}>
                  AI can help your work be legible and connected. It never becomes you. Only
                  people can vouch for you. Only you can mean what you say before God and stand
                  answerable for it as true.
                </p>
                <p className={shell.hand}>You out front. AI in the background.</p>
              </div>
            </section>

            <section className={`${shell.section} ${shell.bandPaper}`} id="scenius-refusals">
              <div className={shell.sectionInner}>
                <p className={shell.eyebrow}>The scenius refusals</p>
                <h2 className={`${shell.title} ${shell.titleSm}`}>What we will not build into the network.</h2>
                <p className={shell.body}>
                  The extractive version of this business is obvious, and we are building against
                  it. That includes product choices, not only policy statements.
                </p>
                <ul className={styles.sceniusList}>
                  {SCENIUS_REFUSALS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className={shell.body} style={{ marginTop: "1.15rem" }}>
                  If a feature would feel extractive to us as members, we don&apos;t ship it.
                </p>
                <AskAiPromptButton promptKey="howWeUseAi" />
              </div>
            </section>
      </DocumentPageChrome>
    </DocumentPageShell>
  );
}
