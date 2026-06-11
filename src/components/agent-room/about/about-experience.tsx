"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { DocumentPageShell } from "@/components/agent-room/document/document-page-shell";
import { AskAiPromptButton } from "@/components/agent-room/ink/ask-ai-prompt-button";
import { useScrollSpy } from "@/components/agent-room/institutions/use-scroll-spy";
import { MOVEMENTAL_FOUNDING } from "@/lib/agent-room/naming";

import { FoundersTeam } from "../screen/stub/founders-screen";
import {
  ABOUT_DOCK,
  ABOUT_NAV,
  ABOUT_SPY_SECTIONS,
  BABEL_PENTECOST,
} from "./about-data";
import styles from "./about.module.css";

const SPY_IDS = ABOUT_SPY_SECTIONS.map((s) => s.id);

/**
 * `/agent/about` — the why and the ethic: founders, authorship break,
 * fragmentation thesis, Babel vs. Pentecost, four layers, refusals, formation stakes.
 */
export function AboutExperience() {
  const spyIndex = useScrollSpy(SPY_IDS);
  const activeNavIndex = ABOUT_SPY_SECTIONS[spyIndex]?.navIndex ?? 0;

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

  const activeLabel = ABOUT_NAV[activeNavIndex]?.label ?? ABOUT_NAV[0].label;

  return (
    <DocumentPageShell
      voiceLine={ABOUT_DOCK.voiceLine}
      chips={ABOUT_DOCK.chips}
      highlightChipLabel={ABOUT_DOCK.highlightChipLabel}
      screenKey="about"
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
              aria-controls="about-mobile-menu"
              onClick={() => setMobileMenuOpen((o) => !o)}
            >
              Sections
            </button>
          </div>
          <nav
            id="about-mobile-menu"
            className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ""}`}
            aria-label="Page sections"
          >
            {ABOUT_NAV.map((entry, i) => (
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
              {ABOUT_NAV.map((entry, i) => (
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
            <section className={`${styles.section} ${styles.hero}`} id="who-we-are">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>About Movemental</p>
                <h1 className={styles.title}>Built by movement leaders, for the work that carries trust.</h1>
                <p className={styles.body}>
                  Three people started it — not a pitch deck, but a long argument about authorship,
                  credibility, and what AI was about to do to both. {MOVEMENTAL_FOUNDING.origin}
                </p>
                <div className={styles.foundersWrap}>
                  <FoundersTeam />
                </div>
              </div>
            </section>

            <section className={styles.section} id="why-we-exist">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>Why we exist</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>The authorship break.</h2>
                <p className={styles.body}>
                  A faithful reader opens the newest piece and, for the first time in the history of
                  reading, has to ask whether anyone still stands behind the words. The reader cannot
                  tell — and it does not help if the prose happens to be good. For five hundred years a
                  pen, a press, a typewriter — none of them could think the thought for you. This tool
                  can. That is what is new.
                </p>
                <p className={styles.body}>
                  Underneath that break sits a deeper problem: fragmentation. Work that was whole in a
                  person has been scattered into formats that do not speak to each other — books, talks,
                  articles, frameworks living in other people&apos;s paraphrases. What is known, and who
                  it is for, both broken in the same event.
                </p>
                <blockquote className={styles.pullQuote}>
                  AI is a mirror. Slop is fragmentation, reflected and multiplied.
                </blockquote>
                <p className={styles.body}>
                  People assume AI will pull the pieces together. By default it does the opposite — it
                  reflects back whatever it is given, and what it is given is almost always fragmentation.
                  Built on a fragmented foundation, AI amplifies dysfunction rather than reducing it.
                </p>
              </div>
            </section>

            <section className={`${styles.section} ${styles.bandSurface}`} id="what-we-believe">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>What we believe</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>Not all coherence heals.</h2>
                <p className={styles.body}>
                  Gathering scattered work into one place is not enough by itself. Not all coherence
                  heals — and integrity means naming the danger inside our own work before anyone else
                  does.
                </p>
                <div className={styles.beliefGrid}>
                  {BABEL_PENTECOST.map((item) => (
                    <article key={item.term} className={styles.beliefCard}>
                      <h3 className={styles.beliefTerm}>{item.term}</h3>
                      <p className={styles.beliefBody}>{item.body}</p>
                    </article>
                  ))}
                </div>
                <p className={styles.beliefTest}>
                  That is the test we apply to our own work — not whether it is coherent, but which
                  kind of coherence it is. Babel makes a name for itself and points at itself. Pentecost
                  honors difference and points away from itself.
                </p>
                <p className={styles.hand}>Both are coherence. Only one heals.</p>
              </div>
            </section>

            <section className={styles.section} id="what-movemental-is">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>What Movemental actually is</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>Four layers — kept distinct.</h2>
                <p className={styles.body}>
                  Movemental keeps four things separate so none collapses into the others: the{" "}
                  <strong>scenius</strong> (the shared intelligence of the scene — served, not owned), the{" "}
                  <strong>corpus</strong> (the authors&apos; own work, owned by them), the{" "}
                  <strong>platform</strong> (infrastructure that lets a distributed scene act like a
                  scene), and <strong>AI</strong> (the interpretive mirror — reflecting work back
                  coherently without inventing what was never said).
                </p>
                <p className={styles.body}>
                  The full story of the network — the authorship break, the hundred, the invitation — lives
                  on the{" "}
                  <Link className={styles.textLink} href="/agent/movement-voices">
                    Movement Voices
                  </Link>{" "}
                  page.
                </p>
              </div>
            </section>

            <section className={`${styles.section} ${styles.bandPaper}`} id="what-we-refuse">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>What we refuse</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>The extractive version is obvious. We are building against it.</h2>
                <p className={styles.body}>
                  We do not use AI to author anything under a human&apos;s name. We do not turn
                  practitioners into bloggers — the AI handles the work around the writing, never the
                  writing itself. We are not the platform; the voices are. We use the tools we sell, on
                  ourselves, first. The full account of what we refuse — and the green, yellow, and red
                  lights we apply — is on{" "}
                  <Link className={styles.textLink} href="/agent/how-we-use-ai">
                    How We Use AI
                  </Link>
                  .
                </p>
              </div>
            </section>

            <section className={styles.section} id="formation-stakes">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>Formation stakes</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>They are watching what we do.</h2>
                <p className={styles.body}>
                  Young adults are asking the machine the questions they used to ask a mentor — how to
                  make sense of their lives, how to actually disciple people, what the church is even for.
                  They are waiting to see whether the church has anything true to say in this moment, or
                  whether it will answer with fear, or with a shrug.
                </p>
                <p className={styles.body}>
                  That is the real question underneath everything else. It is a question about formation
                  before it is a question about technology — and they will decide from what they watch us
                  do whether the kingdom is real and the church is real.
                </p>
                <AskAiPromptButton
                  prompt={`I'm reading Movemental's About page (movemental.ai/agent/about) — the authorship break, the fragmentation thesis, the Babel vs. Pentecost ethic, and the formation stakes for young adults. Summarize what Movemental believes, what makes it different from a typical "AI for churches" vendor, and what questions I should ask them.`}
                />
              </div>
            </section>
          </main>
        </div>
      </>
    </DocumentPageShell>
  );
}
