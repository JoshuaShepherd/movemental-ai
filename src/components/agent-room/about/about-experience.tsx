/* eslint-disable @next/next/no-img-element -- small static founder/voice
   portraits with the canon grayscale→color hover filter; same rationale as
   founders-screen / leader-band. */
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { DocumentPageShell } from "@/components/agent-room/document/document-page-shell";
import { useScrollSpy } from "@/components/agent-room/institutions/use-scroll-spy";
import { LEADERS } from "@/lib/agent-room/data/leaders";

import {
  ABOUT_DOCK,
  ABOUT_FOUNDERS,
  ABOUT_NAV,
  ABOUT_NETWORK_INDICES,
  ABOUT_NETWORK_LIT_INDEX,
  ABOUT_PAPERS,
  ABOUT_REFUSALS,
  ABOUT_SPY_SECTIONS,
} from "./about-data";
import styles from "./about.module.css";

const SPY_IDS = ABOUT_SPY_SECTIONS.map((s) => s.id);

/** Hand off into the room carrying a question. */
function ask(question: string): string {
  return `/agent?ask=${encodeURIComponent(question)}`;
}

/**
 * `/agent/about` — the public "About Movemental" document on the Ink Band
 * surface. Who we are, why we exist, the story, how we use AI, what we refuse,
 * the founders (real portraits), the network, research, and a way in.
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
                  <span className={styles.sidebarNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {entry.label}
                </button>
              ))}
            </nav>
          </aside>

          <main className={styles.main}>
            {/* 01 — WHO WE ARE */}
            <section className={`${styles.section} ${styles.hero}`} id="who-we-are">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>About Movemental</p>
                <h1 className={styles.title}>
                  We help you meet AI without losing the{" "}
                  <span className={styles.mark}>trust</span> your work depends on.
                </h1>
                <p className={styles.body}>
                  Movemental builds the platform mission-driven organizations need to meet AI
                  with their integrity intact. We gather your scattered work into one place,
                  make it verifiable, build the tools on top of it, and help you govern the
                  whole thing. We go in order, and the order starts with Safety.
                </p>
                <p className={styles.body}>
                  We serve churches, nonprofits, seminaries, and the individual leaders whose
                  body of work is worth protecting.
                </p>
                <p className={styles.heroStamp}>
                  <b>Movemental, founded 2026.</b> Built out of a two-year conversation among
                  three people who could not stop talking about what AI was doing to the
                  institutions, and the trust, they love.
                </p>
              </div>
            </section>

            {/* 02 — WHY WE EXIST */}
            <section className={`${styles.section} ${styles.bandSurface}`} id="why-we-exist">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>Why we exist</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>
                  The problem underneath the problem is fragmentation.
                </h2>
                <p className={styles.body}>
                  A leader&apos;s life-work, or an institution&apos;s, was whole in the living
                  of it. Then it scattered. Into books and talks and decks and inboxes and a few
                  people&apos;s memories. Most of it is real, and almost none of it is gathered.
                  That is fragmentation, and it was a quiet problem until AI arrived.
                </p>
                <p className={styles.body}>
                  AI did not cause the scatter. It is a mirror. Pointed at fragmented work, it
                  multiplies the fragments. It fills the gaps with something fluent and wrong,
                  faster than anyone can correct it. The result is a world where a reader can no
                  longer tell what is real, who actually said it, or whether it is trustworthy
                  at all.
                </p>
                <p className={styles.body}>
                  So the work now is credibility. Not louder marketing. The ability to be
                  believed, and to be the answer the machine returns when someone asks about
                  you. That is downstream of one thing: having gathered your real work into
                  something coherent and verifiable. Coherence is the task, but not all
                  coherence heals. We build toward the kind that does.
                </p>
              </div>
            </section>

            {/* 03 — THE STORY */}
            <section className={styles.section} id="the-story">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>The story</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>
                  It started as a conversation.
                </h2>
                <p className={styles.body}>
                  For two years, Alan, Brad, and Josh kept circling the same worry. AI was
                  arriving in churches, nonprofits, and seminaries faster than anyone was
                  deciding how to meet it. The people most exposed were the ones whose entire
                  work rests on trust, and they had the least time to think it through.
                </p>
                <p className={styles.body}>
                  We did not want to add to the noise. We wanted to build the thing we wished
                  existed: a way for a mission-driven organization to meet this moment in order,
                  without faking its way through, and without losing the human core of the work.
                  In 2026, the conversation became Movemental.
                </p>
              </div>
            </section>

            {/* 04 — HOW WE USE AI */}
            <section className={styles.section} id="how-we-use-ai">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>How we use AI</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>
                  We use the tools on ourselves first.
                </h2>
                <p className={styles.body}>
                  We do not sell anything we will not use. This site, our research, and our own
                  agents are built the way we would build yours. We hold ourselves to the same
                  Safety standard we ask of you, and we write our own AI Charter before we help
                  you write yours.
                </p>
                <p className={styles.body}>
                  When we get it wrong, we say so. When we are early, we say that too. The point
                  is not to look more finished than we are. It is to be the kind of organization
                  you can actually trust with this. The full account is on{" "}
                  <Link className={styles.textLink} href="/agent/how-we-use-ai">
                    How We Use AI
                  </Link>
                  .
                </p>
                <div className={styles.trust}>
                  <p className={styles.trustHead}>Your data</p>
                  <p className={styles.trustBody}>
                    We treat your work as yours. We do not train models on it, we are clear
                    about where it lives and who can see it, and the data-handling standards we
                    help you ratify are the ones we hold ourselves. Trust is the product, so the
                    way we handle your data is the proof.
                  </p>
                </div>
              </div>
            </section>

            {/* 05 — WHAT WE REFUSE */}
            <section className={`${styles.section} ${styles.bandPaper}`} id="what-we-refuse">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>What we refuse</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>
                  Some things we won&apos;t do, ever.
                </h2>
                <p className={`${styles.body} ${styles.bodyMuted}`}>
                  These are not preferences. They are the line. Breaking one would cost the
                  exact trust we exist to protect.
                </p>
                <ul className={styles.refuse}>
                  {ABOUT_REFUSALS.map((item) => (
                    <li key={item.lead} className={styles.refuseItem}>
                      <span className={styles.refuseMark} aria-hidden="true">
                        —
                      </span>
                      <span className={styles.refuseText}>
                        {item.lead} <span className={styles.refuseRest}>{item.rest}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 06 — THE FOUNDERS */}
            <section className={styles.section} id="the-founders">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>The founders</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>
                  Three people who couldn&apos;t stop talking about it.
                </h2>
                <div className={styles.founders}>
                  {ABOUT_FOUNDERS.map((founder) => {
                    const leader = LEADERS[founder.leaderIndex];
                    return (
                      <article key={leader.name} className={styles.fcard}>
                        <span className={styles.fphoto}>
                          <img src={leader.img} alt={leader.name} loading="lazy" />
                        </span>
                        <h3 className={styles.fname}>{leader.name}</h3>
                        <p className={styles.frole}>{founder.role}</p>
                        <p className={styles.fbio}>{founder.bio}</p>
                        <Link className={styles.fmore} href={ask(founder.profileAsk)}>
                          Read profile →
                        </Link>
                        <p className={styles.fverify}>
                          <span className={styles.verifyMark} aria-hidden="true">
                            ✓
                          </span>
                          Verified · {founder.verify}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 07 — THE NETWORK */}
            <section className={`${styles.section} ${styles.bandSurface}`} id="the-network">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>The network</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>
                  We&apos;re holding a network, not a roster.
                </h2>
                <p className={styles.body}>
                  Movemental is not one company serving customers one at a time. It is a network
                  of senior movement leaders whose work we gather, make legible, and connect.
                  When one Voice cites another, both grow more credible. That mutual credibility
                  is something no website builder can give you, and it is the deepest reason to
                  be here.
                </p>
                <p className={`${styles.body} ${styles.bodyMuted}`}>
                  It starts with one platform, built well. Then a second. Then a hundred, each a
                  node that makes the others stronger.
                </p>
                <div className={styles.voices}>
                  {ABOUT_NETWORK_INDICES.map((idx) => {
                    const leader = LEADERS[idx];
                    const lit = idx === ABOUT_NETWORK_LIT_INDEX;
                    return (
                      <span
                        key={leader.name}
                        className={`${styles.voice} ${lit ? styles.voiceLit : ""}`}
                      >
                        {leader.name}
                      </span>
                    );
                  })}
                  <Link href="/agent/movement-voices" className={styles.voiceMore}>
                    + more
                  </Link>
                </div>
                <p className={styles.hand}>one voice, then a hundred</p>
              </div>
            </section>

            {/* 08 — RESEARCH */}
            <section className={styles.section} id="research">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>Research</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>
                  We publish what we&apos;re learning.
                </h2>
                <p className={styles.body}>
                  We do our own thinking in the open, sourced and cited, so you can check it. If
                  we are going to argue that being verifiable is the work, our own claims have to
                  be verifiable first.
                </p>
                <div className={styles.papers}>
                  {ABOUT_PAPERS.map((paper) => (
                    <Link key={paper.slug} className={styles.paper} href={`/research/${paper.slug}`}>
                      <span className={styles.paperNum}>{paper.num}</span>
                      <span className={styles.paperText}>
                        <b>{paper.title}</b>
                        <span>{paper.sub}</span>
                      </span>
                      <span className={styles.paperTag}>Cited</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* 09 — TALK TO US */}
            <section className={styles.section} id="talk-to-us">
              <div className={styles.sectionInner}>
                <p className={styles.eyebrow}>Talk to us</p>
                <h2 className={`${styles.title} ${styles.titleSm}`}>
                  Start with a conversation.
                </h2>
                <p className={styles.body}>
                  No checkout button. No pressure. Tell us where your organization is, and we
                  will show you the first step, which is almost always Safety, and almost always
                  free to begin.
                </p>
                <div className={styles.doors}>
                  <Link className={styles.btn} href={ask("I'd like to talk to Movemental.")}>
                    Talk to us
                  </Link>
                  <button
                    type="button"
                    className={styles.btnGhost}
                    onClick={() => scrollTo("why-we-exist")}
                  >
                    Read the thesis
                  </button>
                  <Link
                    className={styles.btnGhost}
                    href={ask("Map where my organization actually stands with AI.")}
                  >
                    Map your organization
                  </Link>
                </div>
                <p className={styles.verifyRow}>
                  <span className={styles.verifyMark} aria-hidden="true">
                    ✓
                  </span>
                  Everything on this page is sourced, attributed, and verifiable. That is the
                  point.
                </p>
              </div>
            </section>
          </main>
        </div>
      </>
    </DocumentPageShell>
  );
}
