"use client";

import { useCallback, useEffect, useState } from "react";

import { DocumentPageShell } from "@/components/agent-room/document/document-page-shell";
import { AskAiPromptButton } from "@/components/agent-room/ink/ask-ai-prompt-button";
import { useScrollSpy } from "@/components/agent-room/institutions/use-scroll-spy";

import {
  FOUR_LAYERS,
  MOVEMENT_VOICES_DOCK,
  MOVEMENT_VOICES_NAV,
  MOVEMENT_VOICES_SPY_SECTIONS,
  TRANSLATION_LANGUAGES,
} from "./movement-voices-data";
import styles from "./movement-voices.module.css";
import { VoicesGrid } from "./voices-grid";

const SPY_IDS = MOVEMENT_VOICES_SPY_SECTIONS.map((s) => s.id);

/**
 * `/agent/movement-voices` — the leader-facing front door: authorship break,
 * scenius thesis, four layers, the hundred, voice grid, and invitation.
 */
export function MovementVoicesExperience() {
  const spyIndex = useScrollSpy(SPY_IDS);
  const activeNavIndex = MOVEMENT_VOICES_SPY_SECTIONS[spyIndex]?.navIndex ?? 0;

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

  const activeLabel = MOVEMENT_VOICES_NAV[activeNavIndex]?.label ?? MOVEMENT_VOICES_NAV[0].label;

  return (
    <DocumentPageShell
      voiceLine={MOVEMENT_VOICES_DOCK.voiceLine}
      chips={MOVEMENT_VOICES_DOCK.chips}
      highlightChipLabel={MOVEMENT_VOICES_DOCK.highlightChipLabel}
      screenKey="movement-voices"
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
              aria-controls="movement-voices-mobile-menu"
              onClick={() => setMobileMenuOpen((o) => !o)}
            >
              Sections
            </button>
          </div>
          <nav
            id="movement-voices-mobile-menu"
            className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ""}`}
            aria-label="Page sections"
          >
            {MOVEMENT_VOICES_NAV.map((entry, i) => (
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
              {MOVEMENT_VOICES_NAV.map((entry, i) => (
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
                <p className={styles.eyebrow}>Movement Voices</p>
                <h1 className={styles.title}>The reader who can no longer tell.</h1>
                <p className={styles.sub}>
                  Begin with a faithful reader. Someone who has followed a writer for years — read
                  every book, taught the frameworks, been changed by the work. That reader opens the
                  newest piece and, for the first time in the history of reading, has to ask a
                  question that never had to be asked before. Is this still them? Or is it a model,
                  lightly supervised, wearing the author&apos;s name?
                </p>
                <p className={`${styles.body} ${styles.sub}`} style={{ marginTop: "1rem" }}>
                  The reader cannot tell. And it does not help if the prose happens to be good. A
                  person can admire the sentences and still be wounded by not knowing whether anyone
                  stands behind them. For five hundred years a pen, a press, a typewriter — none of
                  them could think the thought for you. This tool can. That is what is new.
                </p>
              </div>
            </section>

            <section className={styles.section} id="breaking">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>What&apos;s breaking</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>One scattering. Two faces.</h2>
                <p className={styles.body}>
                  Take one real person. Alan Hirsch has spent more than thirty years planting,
                  training, teaching, and writing. The work is real and it is vast. But ask a simple
                  question: where is it? Thirteen books locked in formats that do not speak to each
                  other. Articles on old websites. Talks that survive as unindexed videos, or not at
                  all. Frameworks he originated that now live more in other people&apos;s paraphrases
                  than in any home of his own.
                </p>
                <p className={styles.body}>
                  There is a second face to that scattering. Because his work is in pieces, he cannot
                  see the people moving through it — the reader who found one idea in a blog post,
                  then bought a book, then took a course, then started teaching it in her own church.
                  That journey, which is the entire point, is invisible to him, because the work the
                  journey runs through is itself shattered.
                </p>
                <p className={styles.body}>
                  What is known, and who it is for — both broken, in the same event.
                </p>
              </div>
            </section>

            <section className={`${styles.section} ${styles.bandSurface}`} id="scenius">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>What we&apos;re building</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>The scenius.</h2>
                <p className={styles.body}>
                  The word comes from Brian Eno. Not genius — the lone brilliant individual — but{" "}
                  <em>scenius</em>, the shared intelligence of a whole scene, the thing a community
                  knows together that no single member could produce alone. You cannot manufacture a
                  scenius. You can only host one.
                </p>
                <p className={styles.body}>
                  So we start with one leader — Alan — and build the full apparatus his public work
                  actually requires. Not a website. His whole body of work made navigable. Then we build
                  a second, for Brad Brisco, and we do the thing that was impossible with only one: we
                  link them.
                </p>
                <p className={styles.body}>
                  When Alan&apos;s work cites Brad&apos;s, and Brad&apos;s cites Alan&apos;s, and they
                  use the same definitions for the same words, that is not decoration. Two linked
                  platforms are not two websites. They are two voices that publicly back each other up.
                </p>
                <p className={styles.body}>
                  Then toward a hundred — senior voices on shared infrastructure, speaking one
                  vocabulary, citing each other honestly, linked as a network the systems mediating the
                  internet can finally recognize as one coherent field with a hundred named contributors.
                </p>
                <div className={styles.langList} aria-label="Translation languages">
                  {TRANSLATION_LANGUAGES.map((lang) => (
                    <span key={lang} className={styles.langChip}>
                      {lang}
                    </span>
                  ))}
                </div>
                <p className={styles.hand}>
                  So a pastor in Bogotá finds the deepest thinking — in her own language — not the
                  loudest voice.
                </p>
              </div>
            </section>

            <section className={styles.section} id="four-layers">
              <div className={`${styles.sectionInner} ${styles.sectionWide}`}>
                <p className={styles.eyebrow}>What Movemental actually is</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>Four layers — kept distinct.</h2>
                <p className={styles.body}>
                  Movemental keeps four things separate so none of them collapses into the others.
                </p>
                <div className={styles.layerList}>
                  {FOUR_LAYERS.map((layer) => (
                    <div key={layer.term} className={styles.layerRow}>
                      <h3 className={styles.layerTerm}>{layer.term}</h3>
                      <p className={styles.layerBody}>{layer.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className={`${styles.section} ${styles.bandPaper}`} id="the-hundred">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>The hundred</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>The seed.</h2>
                <p className={styles.body}>
                  Movemental gathers roughly one hundred senior movement leaders — not a directory or
                  a conference, but the seed of a working ecosystem in which a leader&apos;s work and
                  the work of ninety-nine peers can find each other, link, deepen each other, and
                  present coherently to the world and to the AI systems the world increasingly asks.
                </p>
                <p className={styles.body}>
                  Four-week onboarding remediates each leader&apos;s life-work — the books, articles,
                  sermons, talks, and scattered fragments — into a coherent home. For most leaders that
                  looks like roughly fifty evergreen articles and five thematic pathway courses, one
                  for each major stream of their work, plus guided pathways through their core thinking.
                </p>
                <p className={styles.body}>
                  Courses run in cohort, not self-served — because formation needs community, not just
                  content. The network is capped at one hundred by design: past a certain size you
                  cannot actually care for people, and the care is the point.
                </p>
              </div>
            </section>

            <section className={styles.section} id="voices">
              <div className={`${styles.sectionInner} ${styles.sectionWide}`}>
                <p className={styles.eyebrow}>The Voices</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>The credibility substrate, made visible.</h2>
                <p className={styles.body}>
                  Each Voice is a node in the network — not a testimonial, not an advisor badge, but a
                  leader whose real work stands gathered and verifiable. Tap a portrait to open their
                  profile.
                </p>
                <VoicesGrid />
              </div>
            </section>

            <section className={`${styles.section} ${styles.bandSurface}`} id="invitation">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>The invitation</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>What a Movement Voice says yes to.</h2>
                <article className={styles.invitationPanel}>
                  <p className={styles.body}>
                    If you are reading this, you have probably spent decades doing work that matters —
                    and watching it scatter. A Movement Voice says yes to a four-week onboarding in
                    which that life-work is remediated into a coherent home you own.
                  </p>
                  <ul className={styles.invitationList}>
                    <li>
                      Roughly fifty evergreen articles and five thematic pathway courses — anchored in
                      your actual corpus, at the depth you would have written yourself.
                    </li>
                    <li>
                      About three to four hours per week, including one session with us — we carry the
                      heavy lifting; you carry the judgment.
                    </li>
                    <li>
                      A place among roughly one hundred peers who cite each other honestly — every
                      tribe and tongue, so the scene actually looks like the Kingdom.
                    </li>
                  </ul>
                  <p className={styles.body} style={{ marginTop: "1.15rem" }}>
                    A Voice does <strong>not</strong> say yes to becoming a content creator, or to
                    outsourcing their voice. We do not use AI to author anything under a human&apos;s
                    name. The AI handles the work around the writing — never the writing itself.
                  </p>
                  <p className={styles.hand}>
                    We will use AI to do this. We will not use AI to author it.
                  </p>
                </article>
                <div className={styles.startCtas}>
                  <a
                    className={styles.btnPrimary}
                    href="mailto:josh@movemental.ai?subject=Movement%20Voice%20%E2%80%94%20first%20conversation"
                  >
                    Start a conversation
                  </a>
                  <a className={styles.btnSecondary} href="/agent">
                    Back to the agent room
                  </a>
                </div>
                <AskAiPromptButton
                  prompt={`I'm reading Movemental's Movement Voices page (movemental.ai/agent/movement-voices) — the scenius thesis, the authorship break, and the invitation to become a Voice. Summarize what a Movement Voice is agreeing to, what they are not agreeing to, and how this differs from a typical "creator platform."`}
                />
              </div>
            </section>
          </main>
        </div>
      </>
    </DocumentPageShell>
  );
}
