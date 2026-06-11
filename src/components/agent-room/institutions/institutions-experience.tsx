"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { Mast } from "@/components/agent-room/shell/mast";

import {
  FIX_ROWS,
  getLetterEmbedParagraphs,
  getLetterFullText,
  INSTITUTIONS_NAV,
  INSTITUTIONS_SPY_SECTIONS,
  PAIN_CARDS,
  PATH_STAGES,
  TOOL_EXAMPLES,
} from "./institutions-data";
import styles from "./institutions.module.css";
import { FoundationDiagram } from "./foundation-diagram";
import { useScrollSpy } from "./use-scroll-spy";

const SPY_IDS = INSTITUTIONS_SPY_SECTIONS.map((s) => s.id);

/**
 * `/agent/institutions` — long-form document surface for seminaries and
 * institutions. Left sticky sidebar, you-first narrative arc, embedded letter
 * (trimmed on-page; full text for download). Shares the agent mast; Institutions
 * is highlighted in the topbar when this page is active.
 */
export function InstitutionsExperience({ letterMarkdown }: { letterMarkdown: string }) {
  const spyIndex = useScrollSpy(SPY_IDS);
  const activeNavIndex = INSTITUTIONS_SPY_SECTIONS[spyIndex]?.navIndex ?? 0;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const letterEmbed = useMemo(() => getLetterEmbedParagraphs(letterMarkdown), [letterMarkdown]);
  const letterFull = useMemo(() => getLetterFullText(letterMarkdown), [letterMarkdown]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const downloadLetter = useCallback(() => {
    const blob = new Blob([letterFull], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "letter-to-a-seminary-president.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [letterFull]);

  const sendToBoard = useCallback(() => {
    const subject = encodeURIComponent("AI and our seminary — a letter for the board");
    const body = encodeURIComponent(
      letterFull.length > 1800
        ? `${letterFull.slice(0, 1600)}\n\n[… download the full letter from movemental.ai …]`
        : letterFull,
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }, [letterFull]);

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeLabel = INSTITUTIONS_NAV[activeNavIndex]?.label ?? INSTITUTIONS_NAV[0].label;

  return (
    <div className={styles.page}>
      <Mast homeHref="/agent" />

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
            aria-controls="institutions-mobile-menu"
            onClick={() => setMobileMenuOpen((o) => !o)}
          >
            Sections
          </button>
        </div>
        <nav
          id="institutions-mobile-menu"
          className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ""}`}
          aria-label="Page sections"
        >
          {INSTITUTIONS_NAV.map((entry, i) => (
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
            {INSTITUTIONS_NAV.map((entry, i) => (
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
              <p className={styles.eyebrow}>For seminaries &amp; institutions</p>
              <h1 className={styles.title}>AI is already inside your seminary.</h1>
              <p className={styles.sub}>
                No one decided that. It just arrived. Here&apos;s what it means — and what to do
                first.
              </p>
            </div>
          </section>

          <section className={styles.section} id="where-you-stand">
            <div className={`${styles.sectionInner} ${styles.sectionWide}`}>
              <p className={styles.eyebrow}>Where you stand</p>
              <h2 className={`${styles.title} ${styles.titleSm}`}>Here&apos;s what&apos;s already happening.</h2>
              <p className={styles.intro}>None of this was planned. It&apos;s just true right now.</p>
              <div className={styles.cardGrid} role="list">
                {PAIN_CARDS.map((card) => (
                  <article key={card.title} className={styles.card} role="listitem">
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardBody}>{card.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.bandSurface}`} id="deeper-problem">
            <div className={styles.sectionInner}>
              <p className={styles.eyebrow}>The deeper problem</p>
              <h2 className={`${styles.title} ${styles.titleSm}`}>These aren&apos;t six problems. They&apos;re one.</h2>
              <p className={styles.body}>
                Underneath all of it is one thing: your seminary is scattered. Your people, your work,
                and your record sit in pieces that don&apos;t connect. AI built on top of that
                doesn&apos;t fix the mess — it makes more of it, faster.
              </p>
              <p className={styles.body}>
                And for a seminary, the thing most at risk is the thing you can&apos;t replace. A
                business that makes an AI mistake loses a client. You&apos;d lose trust in the degree
                itself — and that trust is the whole product.
              </p>
              <p className={styles.body}>
                You also carry a weight other places don&apos;t. Whatever you decide about AI becomes
                the example every church your graduates lead will follow. Doing nothing is still a
                choice. It teaches them that no one needs to think about this carefully.
              </p>
            </div>
          </section>

          <section className={styles.section} id="the-case">
            <div className={`${styles.sectionInner} ${styles.sectionWide}`}>
              <p className={styles.eyebrow}>The case</p>
              <h2 className={`${styles.title} ${styles.titleSm}`}>The full case, in one letter.</h2>
              <p className={styles.intro}>
                Here&apos;s the whole argument in plain words — written to share with your board. Read
                it here, or download it to send.
              </p>
              <article className={styles.letterPanel} aria-label="Letter to a seminary president">
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
            </div>
          </section>

          <section className={styles.section} id="what-we-build">
            <div className={`${styles.sectionInner} ${styles.sectionWide}`}>
              <p className={styles.eyebrow}>The foundation</p>
              <h2 className={`${styles.title} ${styles.titleSm}`}>We gather what&apos;s scattered into one place.</h2>
              <p className={styles.body}>
                This is where Movemental comes in. We take your people, your work, and your record and
                gather them into one connected foundation — a single source of truth your seminary
                owns. It&apos;s visible. It&apos;s verifiable. And it&apos;s built from what&apos;s
                actually yours.
              </p>
              <div className={styles.fixRows} aria-label="How the foundation addresses each pain">
                {FIX_ROWS.map((row) => (
                  <div key={row.pain} className={styles.fixRow}>
                    <span className={styles.fixPain}>{row.pain}</span>
                    <span className={styles.fixArrow} aria-hidden="true">
                      →
                    </span>
                    <span className={styles.fixGain}>{row.gain}</span>
                  </div>
                ))}
              </div>
              <FoundationDiagram />
            </div>
          </section>

          <section className={`${styles.section} ${styles.bandPaper}`} id="the-build">
            <div className={`${styles.sectionInner} ${styles.sectionWide}`}>
              <p className={styles.eyebrow}>The build</p>
              <h2 className={`${styles.title} ${styles.titleSm}`}>Then we build the tools on top of it.</h2>
              <p className={styles.body}>
                Once the foundation is real, we build the things your seminary actually needs on top
                of it — search that knows your work, an assistant that can speak for you accurately,
                and ways to make your scholarship findable for the next generation who are asking the
                machine instead of the library. Built on what you already have. Owned by you.
              </p>
              <div className={styles.toolList}>
                {TOOL_EXAMPLES.map((tool) => (
                  <p key={tool.label} className={styles.toolItem}>
                    <strong>{tool.label}</strong> — {tool.text}
                  </p>
                ))}
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.bandSurface}`} id="formation">
            <div className={styles.sectionInner}>
              <p className={styles.eyebrow}>Formation</p>
              <h2 className={`${styles.title} ${styles.titleSm}`}>But tools alone aren&apos;t the answer.</h2>
              <p className={styles.body}>
                Here&apos;s the part most people skip. Technology without formed people isn&apos;t
                progress — it&apos;s replacement. It&apos;s also how most AI projects fail.
              </p>
              <p className={styles.body}>
                A foundation only holds if your people can steward it. So the tools come with
                formation. We form a group inside your seminary in the three things AI demands:
                discernment — knowing what&apos;s wise; authorship — keeping a real human behind the
                words; and stewardship — caring for what&apos;s been entrusted to you.
              </p>
              <p className={styles.body}>
                For a seminary, this isn&apos;t an add-on. Forming people is what you already do.
                It&apos;s the part you, of all places, should lead with. The technology and the
                training are linked on purpose. One without the other doesn&apos;t work.
              </p>
              <p className={styles.hand}>Formation isn&apos;t extra. It&apos;s the point.</p>
            </div>
          </section>

          <section className={styles.section} id="the-path">
            <div className={`${styles.sectionInner} ${styles.sectionWide}`}>
              <p className={styles.eyebrow}>The path</p>
              <h2 className={`${styles.title} ${styles.titleSm}`}>It all goes in one order.</h2>
              <p className={styles.body}>
                We don&apos;t do this all at once, and we don&apos;t start with the tech. There&apos;s
                an order. <span className={styles.hl}>Safety first</span> — decide, in writing, what
                you will and won&apos;t do with AI. Then Sandbox — test it against real work. Then
                Skills — form your people. Then Solutions — build the tools. Each step earns the next.
                Your first move is Safety.
              </p>
              <div className={styles.stageRail} aria-label="Four stages: Safety, Sandbox, Skills, Solutions">
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
              <h2 className={`${styles.title} ${styles.titleSm}`}>Start with a conversation.</h2>
              <p className={styles.body}>
                Institutions don&apos;t start this with a checkout button. They start with a talk. Tell
                us where your seminary is, and we&apos;ll show you the first step. The letter above
                is yours to share with your board while you decide.
              </p>
              <div className={styles.startCtas}>
                <a
                  className={styles.btnPrimary}
                  href="mailto:hello@movemental.ai?subject=Our%20seminary%20%E2%80%94%20first%20conversation"
                >
                  Talk to us
                </a>
                <button type="button" className={styles.btnSecondary} onClick={downloadLetter}>
                  Download the letter
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
