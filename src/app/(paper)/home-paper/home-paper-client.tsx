"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./home-paper.module.css";

/**
 * Inline-anchored Bic-blue ballpoint marginalia.
 *
 * Each <InkAnnotation> is rendered as a child of an inline `<span
 * className={styles.anchor}>` wrapped around the target word(s). The note
 * floats absolutely from that anchor, so the arrow tip lands on the
 * underlying glyphs no matter how the line wraps (which the legacy version
 * could not guarantee — its notes were positioned from leaf coords).
 *
 * Each ArrowSVG uses `pathLength="1"` so the stroke-dasharray draw-in
 * animation works no matter the curve's actual computed length.
 */
type ArrowProps = {
  viewBox: string;
  d: string;
};

function ArrowSVG({ viewBox, d }: ArrowProps) {
  return (
    <svg
      className={styles["ink-arrow"]}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <path d={d} pathLength={1} strokeDasharray={1} strokeDashoffset={1} />
    </svg>
  );
}

/* ============================================================ */

type Citation = {
  num: 1 | 2 | 3;
  title: string;
  meta: string;
};

const CITATIONS: Citation[] = [
  {
    num: 1,
    title: "State of AI in Business 2025",
    meta: "MIT NANDA · 2025 · §4.2",
  },
  {
    num: 2,
    title: "Cohort-based learning vs. self-paced video",
    meta: "Reach Capacity · 2025",
  },
  {
    num: 3,
    title: "Nonprofit AI Readiness Report",
    meta: "Virtuous · 2026",
  },
];

export function HomePaperClient() {
  const dockRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const [dockLoaded, setDockLoaded] = useState(false);
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [activeCite, setActiveCite] = useState<number | null>(null);

  /* ---- dock entrance + reduced-motion-aware animation triggers ----
     Selecting on `[data-anim]` directly (not scoped by the CSS-module-hashed
     paper-root class) keeps the selector stable. The ink notes are small
     absolutely-positioned elements, so `threshold: 0` (any overlap counts)
     is more reliable than a percentage threshold which can fail to trigger
     for sliver-sized targets. A 700-ms safety timer commits any element
     still unmarked — so a hostile combination of layout reflows + StrictMode
     can never leave a marginalia note stuck at opacity 0. */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const raf = requestAnimationFrame(() => setDockLoaded(true));

    const drawTargets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-anim]"),
    );
    const drawnClass = styles["is-drawn"];

    if (!("IntersectionObserver" in window) || reduced) {
      drawTargets.forEach((el) => el.classList.add(drawnClass));
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(drawnClass);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 10% 0px" },
    );
    drawTargets.forEach((el) => io.observe(el));

    const safetyTimer = window.setTimeout(() => {
      drawTargets.forEach((el) => {
        if (!el.classList.contains(drawnClass)) {
          el.classList.add(drawnClass);
        }
      });
    }, 700);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(safetyTimer);
      io.disconnect();
    };
  }, []);

  /* ---- hero coffee-stain parallax ---- */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parallax = parallaxRef.current;
    const hero = heroRef.current;
    if (!parallax || !hero || reduced) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = hero.getBoundingClientRect();
      const viewH = window.innerHeight || document.documentElement.clientHeight;
      const progress = (viewH - rect.top) / (viewH + rect.height);
      const clamped = Math.min(1, Math.max(0, progress));
      const offset = (clamped - 0.5) * 36;
      parallax.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const highlightCite = useCallback((num: number) => {
    setActiveCite(num);
  }, []);
  const clearCite = useCallback(() => setActiveCite(null), []);

  const handleFootrefClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, num: number) => {
      e.preventDefault();
      setActiveCite(num);
      const target = document.querySelector<HTMLElement>(
        `[data-dock-cite="${num}"]`,
      );
      target?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      window.setTimeout(() => setActiveCite(null), 2200);
    },
    [],
  );

  return (
    <>
      {/* ===== Masthead ===== */}
      <header className={styles.mast} role="banner">
        <span className={styles["mast-folio-l"]}>Vol. 01 · Field Edition</span>
        <span className={styles["mast-wordmark"]}>
          <Link href="/home-paper">Movemental.</Link>
        </span>
        <span className={styles["mast-folio-r"]}>2026 · Set in Fraunces</span>
        <nav className={styles["mast-nav"]} aria-label="Primary">
          <Link href="/home-paper" aria-current="page">
            Home
          </Link>
          <a href="#path">Path</a>
          <a href="#audience">Audiences</a>
          <a href="#safestart">SafeStart</a>
          <a href="#voices">About</a>
          <a href="#close">Contact</a>
        </nav>
      </header>

      <div className={styles.sheet}>
        {/* ===== HERO LEAF ===== */}
        <article
          ref={heroRef}
          className={`${styles.leaf} ${styles.hero}`}
          id="hero"
        >
          {/* Coffee-cup stain — parallaxed */}
          <div className={styles["hero-texture"]} aria-hidden="true">
            <div ref={parallaxRef} className={styles["hero-texture-parallax"]}>
              <Image
                src="/home-paper/hero-coffee-stain.webp"
                alt=""
                width={960}
                height={960}
                priority
              />
            </div>
            <div className={styles["hero-texture-veil"]} />
          </div>

          {/* Blue-ink "the real question is who decides." — lives in the
              right margin of the hero leaf so it does not collide with the
              200-px masthead above. The SVG arrow's `overflow: visible`
              lets the path extend far outside the container, back-left to
              the highlighted "already" in the H1. */}
          <span
            className={styles.ink + " " + styles["ink-hero"]}
            aria-hidden="true"
            data-anim="ink"
          >
            <ArrowSVG
              viewBox="0 0 272 72"
              d="M 254 18 C 120 -8, -150 24, -498 56 M -498 56 L -480 48 M -498 56 L -484 62"
            />
            <span
              className={`${styles["ink-note"]} ${styles["ink-note--rotate"]}`}
            >
              the real question is who decides.
            </span>
          </span>

          <p className={styles["hero-meta"]}>
            <span>For organizational leaders</span>
            <span className={styles["hero-meta-dot"]} aria-hidden="true" />
            <span>Nonprofits · Churches · Institutions</span>
          </p>

          <h1 className={styles.h1}>
            AI is{" "}
            <span className={styles.hl} data-anim="hl">
              already
            </span>{" "}
            inside your organization
            <button
              type="button"
              className={styles.footref}
              data-ref="1"
              onMouseEnter={() => highlightCite(1)}
              onMouseLeave={clearCite}
              onFocus={() => highlightCite(1)}
              onBlur={clearCite}
              onClick={(e) => handleFootrefClick(e, 1)}
            >
              1
            </button>
            .
          </h1>

          <p className={styles.lede}>
            It&apos;s being used by people inside your organization right now —
            in drafts, in correspondence, in counsel given. Most leaders have
            not yet decided what is safe, valuable, or ethical for their work.
            The four-stage Path below is how you decide, in writing, before you
            build anything else.
          </p>

          <ol
            className={styles["path-strip"]}
            aria-label="The Movemental Path — four stages, in order"
          >
            <li
              className={`${styles["path-strip-item"]} ${styles["is-active"]}`}
            >
              <span className={styles.num}>01.</span>
              <span className={styles.name}>Safety</span>
              <span className={styles.kicker}>Start here</span>
            </li>
            <li className={styles["path-strip-item"]}>
              <span className={styles.num}>02.</span>
              <span className={styles.name}>Sandbox</span>
              <span className={styles.kicker}>Stage 2</span>
            </li>
            <li className={styles["path-strip-item"]}>
              <span className={styles.num}>03.</span>
              <span className={styles.name}>Skills</span>
              <span className={styles.kicker}>Stage 3</span>
            </li>
            <li className={styles["path-strip-item"]}>
              <span className={styles.num}>04.</span>
              <span className={styles.name}>Solutions</span>
              <span className={styles.kicker}>Stage 4</span>
            </li>
          </ol>

          <p className={styles["path-note"]}>
            <a href="#safestart">Start with Safety. The path is sequential. →</a>
          </p>

          <div className={styles["hero-ctas"]}>
            <div className={styles["cta-wrap"]}>
              <Link
                href="/start-with-safety"
                className={`${styles.btn} ${styles["btn-primary"]}`}
              >
                Start SafeStart →
              </Link>
              <span className={styles["cta-helper"]}>
                $1,000 · two weeks · ratifiable Guidebook
              </span>
            </div>
            <div className={styles["cta-wrap"]}>
              <Link
                href="/field-guides/safety"
                className={`${styles.btn} ${styles["btn-secondary"]}`}
              >
                ↓ Download the Field Guide
              </Link>
              <span className={styles["cta-helper"]}>
                Free · 40 pages · the full method
              </span>
            </div>
          </div>

          <p className={styles.scarcity}>
            17 of 100 leader seats committed. Network capped at 100.
          </p>

          <p className={styles["cohort-line"]}>
            Two weeks.{" "}
            <span className={styles.hl} data-anim="hl">
              $1,000.
            </span>{" "}
            A board-ratifiable Guidebook by Friday of week two.
          </p>

          <div className={styles["hero-footnote-band"]}>
            <span className={styles["footnote-num"]}>
              <span className={styles["hl-num"]}>1.</span>
            </span>
            <span>
              MIT NANDA · Microsoft Work Trend Index 2025 · Pew Research,
              &ldquo;AI and the American Worker,&rdquo; 2025. <b>Hover the
              marker</b> to see the dock cite them.
            </span>
          </div>
        </article>

        {/* ===== THE PATH LEAF ===== */}
        <article className={styles.leaf} id="path">
          <p className={styles.eyebrow}>The Path</p>
          <h2 className={styles.h2}>
            Four ordered products. <em>Begin at Safety.</em>
          </h2>
          <p className={styles.prose}>
            <span>
              A charter, a sandbox, a course, and a built system — in order,
              each earning the next. Most organizations get exactly one stage
              right and call the work done. The order is the work.
            </span>
          </p>

          <ol className={styles["path-list"]} aria-label="The Movemental Path">
            {/* 01 Safety */}
            <li className={styles["path-row"]}>
              <span className={styles["path-num"]}>01.</span>
              <div>
                <Link
                  href="/safety"
                  className={styles["path-name"]}
                >
                  <span className={styles.anchor}>
                    <span className={styles.hl} data-anim="hl">
                      Safety
                    </span>
                    <span
                      className={`${styles.ink} ${styles["ink-begin-here"]}`}
                      aria-hidden="true"
                      data-anim="ink"
                    >
                      <ArrowSVG
                        viewBox="0 0 192 60"
                        d="M 178 28 C 130 12, 80 14, 14 38 M 14 38 L 28 30 M 14 38 L 26 42"
                      />
                      <span
                        className={`${styles["ink-note"]} ${styles["ink-note--rotate-r"]}`}
                      >
                        Begin here.
                      </span>
                    </span>
                  </span>
                </Link>
              </div>
              <span className={styles["path-sub"]}>
                A board-ratifiable Guidebook in five layers.
              </span>
            </li>

            {/* 02 Sandbox */}
            <li className={styles["path-row"]}>
              <span className={styles["path-num"]}>02.</span>
              <Link href="/the-path" className={styles["path-name"]}>
                Sandbox
              </Link>
              <span className={styles["path-sub"]}>
                Eight phases. A Future Plan your board can read.
              </span>
            </li>

            {/* 03 Skills */}
            <li className={styles["path-row"]}>
              <span className={styles["path-num"]}>03.</span>
              <Link href="/the-path" className={styles["path-name"]}>
                Skills
              </Link>
              <span className={styles["path-sub"]}>
                Eight-week formation cohort.{" "}
                <button
                  type="button"
                  className={styles.footref}
                  data-ref="2"
                  onMouseEnter={() => highlightCite(2)}
                  onMouseLeave={clearCite}
                  onFocus={() => highlightCite(2)}
                  onBlur={clearCite}
                  onClick={(e) => handleFootrefClick(e, 2)}
                >
                  2
                </button>
              </span>
            </li>

            {/* 04 Solutions */}
            <li className={styles["path-row"]}>
              <span className={styles["path-num"]}>04.</span>
              <Link href="/the-path" className={styles["path-name"]}>
                Solutions
              </Link>
              <span className={styles["path-sub"]}>
                From $30,000. Scoped per engagement.
              </span>
            </li>
          </ol>

          <p
            className={`${styles.ink} ${styles["ink-inline"]} ${styles["ink-inline--path"]} ${styles["ink-note"]} ${styles["ink-note--small"]} ${styles["ink-note--rotate"]}`}
            aria-hidden="true"
          >
            ← formation, not training. the cohort <em>is</em> the curriculum.
          </p>

          <div className={styles.footnote}>
            <div className={styles["footnote-row"]}>
              <span className={styles["footnote-num"]}>
                <span className={styles["hl-num"]}>2.</span>
              </span>
              <span>
                Skills is the only stage with no self-paced version. Formation
                requires people in conversation with people. Recorded courses
                teach information; cohorts form judgment.
              </span>
            </div>
          </div>
        </article>

        {/* ===== AUDIENCE LEAF ===== */}
        <article className={styles.leaf} id="audience">
          <p className={styles.eyebrow}>Three contexts. One method.</p>
          <h2 className={styles.h2}>Is this for you?</h2>
          <p className={styles.prose}>
            <span>
              Churches, nonprofits, and theological institutions face different
              stakes — pastoral, fiduciary, accreditational. The underlying
              decisions are the same. The Path adapts to your situation.
            </span>
          </p>

          <div className={styles.audience}>
            <article className={styles["audience-card"]}>
              <h3>Churches</h3>
              <p>
                For executive pastors and elder teams navigating AI in pastoral
                work, communications, and ministry — without losing what makes
                the church a church.
              </p>
              <Link
                className={styles["audience-card-link"]}
                href="/churches"
              >
                Read the church playbook →
              </Link>
            </article>
            <article className={styles["audience-card"]}>
              <h3>Nonprofits</h3>
              <p>
                For executive directors and boards facing AI as a fiduciary
                responsibility — donor trust, beneficiary protection, regulatory
                exposure — not just an operational question.
              </p>
              <Link
                className={styles["audience-card-link"]}
                href="/nonprofits"
              >
                Read the nonprofit playbook →
              </Link>
            </article>
            <article className={styles["audience-card"]}>
              <h3>Institutions</h3>
              <p>
                For seminary presidents, denominational executives, and
                training networks managing AI across faculty, students, and
                accreditation simultaneously.
              </p>
              <Link
                className={styles["audience-card-link"]}
                href="/institutions"
              >
                Read the institution playbook →
              </Link>

              <span
                className={`${styles["ink-note"]} ${styles["ink-note--small"]} ${styles["ink-note--rotate-r"]} ${styles["ink-accreditors"]}`}
                aria-hidden="true"
              >
                (accreditors notice.)
              </span>
            </article>
          </div>

          <p className={styles["audience-fallback"]}>
            Not sure which fits?{" "}
            <Link href="/field-guides/safety">Start with the Field Guide. ↗</Link>
          </p>
        </article>

        {/* ===== SAFESTART LEAF ===== */}
        <article className={styles.leaf} id="safestart">
          <div className={styles["ss-split"]}>
            <div>
              <p className={styles.eyebrow}>The Stage-1 engagement</p>
              <h2 className={styles.h2}>
                SafeStart. <em>$1,000.</em> Two weeks. Ratifiable.
              </h2>
              <p className={styles.prose}>
                <span>
                  Two weeks of facilitated work that produces a
                  board-ratifiable AI Organizational Guidebook in five layers
                  your leadership can sign and your team can follow.{" "}
                  <span className={styles["ink-underline"]} data-anim="ink-u">
                    The order is the work.
                  </span>
                </span>
              </p>
              <p className={styles.prose}>
                <span>
                  $1,000. Two cohort weeks. Five Guidebook layers — Statement,
                  Policy, Context, Rules, Response Plans. One document your
                  board can ratify and your staff can use.
                </span>
              </p>
              <p className={styles.prose}>
                <span>
                  This is the entry point to Movemental. Most organizations
                  begin here. The full four-stage path (Safety → Sandbox →
                  Skills → Solutions) builds from this foundation.
                </span>
              </p>
              <p className={styles.prose}>
                <span>
                  Movemental drafts the Guidebook against your specific context
                  inside your private organizational dashboard. Your team
                  reviews, revises, ratifies. You walk out with a print-quality
                  PDF and rollout supports that turn ratification into
                  adoption.
                </span>
              </p>
              <div
                className={styles["hero-ctas"]}
                style={{ marginTop: "2rem" }}
              >
                <div className={styles["cta-wrap"]}>
                  <Link
                    href="/about-safestart"
                    className={`${styles.btn} ${styles["btn-primary"]}`}
                  >
                    Start SafeStart →
                  </Link>
                  <span className={styles["cta-helper"]}>
                    $1,000 · two weeks · ratifiable Guidebook
                  </span>
                </div>
                <div className={styles["cta-wrap"]}>
                  <a
                    href="#path"
                    className={`${styles.btn} ${styles["btn-secondary"]}`}
                  >
                    See the full four-stage path →
                  </a>
                  <span className={styles["cta-helper"]}>
                    Safety · Sandbox · Skills · Solutions
                  </span>
                </div>
              </div>
            </div>

            <aside
              className={styles["ss-aside"]}
              aria-label="Movemental AI · What this produces"
            >
              <div className={styles["ss-aside-head"]}>
                <div className={styles["ss-aside-brand"]}>
                  <span className={styles["dock-dot"]} aria-hidden="true" />
                  <span>movemental.ai</span>
                </div>
                <span className={styles["ss-aside-status"]}>Citing</span>
              </div>
              <p className={styles["ss-aside-title"]}>
                The five-layer Guidebook SafeStart produces:
              </p>
              <ol className={styles["ss-aside-list"]}>
                <li>
                  <span className={styles.num}>i.</span>
                  <span>
                    <b className={styles.label}>Statement</b> — what we believe
                    about AI in our mission.
                  </span>
                </li>
                <li>
                  <span className={styles.num}>ii.</span>
                  <span>
                    <b className={styles.label}>Policy</b> — what we will do,
                    and refuse to do, operationally.
                  </span>
                </li>
                <li>
                  <span className={styles.num}>iii.</span>
                  <span>
                    <b className={styles.label}>Context</b> — what is actually
                    true in our environment.
                  </span>
                </li>
                <li>
                  <span className={styles.num}>iv.</span>
                  <span>
                    <b className={styles.label}>Rules</b> — what governs AI use
                    in specific domains.
                  </span>
                </li>
                <li>
                  <span className={styles.num}>v.</span>
                  <span>
                    <b className={styles.label}>Response Plans</b> — what we do
                    when something goes wrong.
                  </span>
                </li>
              </ol>
            </aside>
          </div>
        </article>

        {/* ===== CREDIBILITY LEAF ===== */}
        <article className={styles.leaf} id="voices">
          <p className={styles.eyebrow}>Built with</p>
          <h2 className={styles.h2}>
            Trusted voices whose work and credibility{" "}
            <em>predate AI.</em>
          </h2>
          <p className={styles.prose}>
            <span>
              Movemental was built by missional practitioners with decades of
              work that predates AI. The network around us is the credibility
              infrastructure for this category — trusted movement voices whose
              names carry weight in the world your organization works in.
              <button
                type="button"
                className={styles.footref}
                data-ref="3"
                onMouseEnter={() => highlightCite(3)}
                onMouseLeave={clearCite}
                onFocus={() => highlightCite(3)}
                onBlur={clearCite}
                onClick={(e) => handleFootrefClick(e, 3)}
              >
                3
              </button>
            </span>
          </p>
          <p
            className={styles.prose}
            style={{ fontStyle: "italic", color: "var(--ink-soft)" }}
          >
            Credibility in an AI-saturated world is increasingly relational.
          </p>

          <p className={styles["voices-subhead"]}>Founders</p>
          <div className={`${styles.voices} ${styles["voices--founders"]}`}>
            <div className={styles.voice}>
              <span className={styles["voice-name"]}>Dr. Brad Brisco</span>
              <span className={styles["voice-role"]}>
                CEO &amp; Co-founder
              </span>
            </div>
            <div className={styles.voice}>
              <span className={styles["voice-name"]}>Alan Hirsch</span>
              <span className={styles["voice-role"]}>
                Chief Missiologist &amp; Co-founder
              </span>
            </div>
            <div className={styles.voice}>
              <span className={styles["voice-name"]}>Joshua Shepherd</span>
              <span className={styles["voice-role"]}>CTO &amp; Founder</span>
            </div>
          </div>

          <p className={styles["voices-subhead"]}>Named voices</p>
          <div className={styles.voices}>
            <div className={styles.voice}>
              <span className={styles["voice-name"]}>Tim Catchim</span>
              <span className={styles["voice-role"]}>
                APE practitioner · <em>The Permanent Revolution</em>
              </span>
            </div>
            <div className={styles.voice}>
              <span className={styles["voice-name"]}>Dr. JR Woodward</span>
              <span className={styles["voice-role"]}>
                National Director, V3 Church Planting
              </span>
            </div>
            <div className={styles.voice}>
              <span className={styles.anchor}>
                <span className={styles["voice-name"]}>Dr. Rowland Smith</span>
                <span
                  className={`${styles.ink} ${styles["ink-voice-scale"]}`}
                  aria-hidden="true"
                  data-anim="ink"
                >
                  <ArrowSVG
                    viewBox="0 0 176 48"
                    d="M 152 30 C 100 32, 64 28, 18 6 M 18 6 L 28 18 M 18 6 L 4 12"
                  />
                  <span
                    className={`${styles["ink-note"]} ${styles["ink-note--small"]} ${styles["ink-note--rotate"]}`}
                  >
                    knows what scales.
                  </span>
                </span>
              </span>
              <span className={styles["voice-role"]}>
                National Director, Forge America
              </span>
            </div>
            <div className={styles.voice}>
              <span className={styles["voice-name"]}>Dr. Liz Rios</span>
              <span className={styles["voice-role"]}>
                Founder, Passion2Plant
              </span>
            </div>
            <div className={styles.voice}>
              <span className={styles["voice-name"]}>Lucas Pulley</span>
              <span className={styles["voice-role"]}>
                Movements Director, Underground Network
              </span>
            </div>
            <div className={styles.voice}>
              <span className={styles["voice-name"]}>Rob Wegner</span>
              <span className={styles["voice-role"]}>
                Founding Leader, Kansas City Underground
              </span>
            </div>
          </div>

          <div className={styles.footnote}>
            <div className={styles["footnote-row"]}>
              <span className={styles["footnote-num"]}>
                <span className={styles["hl-num"]}>3.</span>
              </span>
              <span>
                Movement Voices are paid in cash and royalties, not logos and
                exposure. The full Participation Agreement is on the pricing
                page.
              </span>
            </div>
          </div>
        </article>

        {/* ===== CLOSING LEAF ===== */}
        <article
          className={`${styles.leaf} ${styles.closing}`}
          id="close"
        >
          <div
            className={`${styles.ink} ${styles["ink-only-sentence"]}`}
            aria-hidden="true"
            data-anim="ink"
          >
            <span
              className={`${styles["ink-note"]} ${styles["ink-note--small"]} ${styles["ink-note--rotate"]}`}
            >
              ↓ the only sentence on the page that matters.
            </span>
          </div>

          <div className={styles["ink-box"]} data-anim="ink-box">
            <svg viewBox="0 0 600 220" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M 12 18 Q 8 8, 22 8 L 580 12 Q 592 10, 590 24 L 588 200 Q 590 212, 576 210 L 22 212 Q 10 214, 12 200 Z"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
              />
            </svg>

            <h2 className={styles["closing-h"]}>
              Start with Safety.{" "}
              <em>The path takes care of the order.</em>
            </h2>
            <p className={styles["closing-prose"]}>
              Most leaders have not yet decided what is safe, valuable, or
              ethical for their work. The four-stage path is how you decide,
              in writing, before you build anything else.
            </p>
            <div className={styles["closing-ctas"]}>
              <div
                className={styles["cta-wrap"]}
                style={{ alignItems: "center" }}
              >
                <Link
                  href="/start-with-safety"
                  className={`${styles.btn} ${styles["btn-primary"]}`}
                >
                  Start SafeStart →
                </Link>
                <span className={styles["cta-helper"]}>
                  $1,000 · two weeks · ratifiable Guidebook
                </span>
              </div>
              <div
                className={styles["cta-wrap"]}
                style={{ alignItems: "center" }}
              >
                <Link
                  href="/field-guides/safety"
                  className={`${styles.btn} ${styles["btn-secondary"]}`}
                >
                  ↓ Download the Field Guide
                </Link>
                <span className={styles["cta-helper"]}>
                  Free · 40 pages · the full method
                </span>
              </div>
            </div>
          </div>

          <p className={`${styles.scarcity} ${styles["scarcity--center"]}`}>
            17 of 100 leader seats committed. Network capped at 100.
          </p>
        </article>
      </div>

      {/* Colophon */}
      <footer className={styles.colophon}>
        <p>
          <em>Movemental — Volume One · Field Edition.</em> Set in Fraunces
          (display) and Inter (body). Marginalia in Nothing You Could Do. The
          AI dock runs IBM Plex Mono. Printed for the screen.
        </p>
        <div className={styles["colophon-row"]}>
          <span>© 2026 Movemental, Inc.</span>
          <span>
            <Link href="/pricing">Pricing</Link> ·{" "}
            <Link href="/privacy">Privacy</Link> ·{" "}
            <Link href="/terms">Terms</Link>
          </span>
        </div>
      </footer>

      {/* ===== AI DOCK ===== */}
      <aside
        ref={dockRef}
        className={[
          styles.dock,
          dockLoaded ? styles["is-loaded"] : "",
          dockCollapsed ? styles["is-collapsed"] : "",
          activeCite != null ? styles["is-active"] : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label="Movemental AI"
      >
        <button
          type="button"
          className={styles["dock-head"]}
          aria-expanded={!dockCollapsed}
          onClick={() => setDockCollapsed((v) => !v)}
        >
          <div className={styles["dock-brand"]}>
            <span className={styles["dock-dot"]} aria-hidden="true" />
            <span>movemental.ai</span>
          </div>
          <span className={styles["dock-head-right"]}>
            <span className={styles["dock-status"]}>Citing · 3 sources</span>
            <span className={styles["dock-collapse"]} aria-hidden="true">
              ⌄
            </span>
          </span>
        </button>
        <div className={styles["dock-body"]}>
          {CITATIONS.map((c) => (
            <article
              key={c.num}
              data-dock-cite={c.num}
              className={[
                styles["dock-citation"],
                activeCite === c.num ? styles["is-highlighted"] : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className={styles["dock-citation-num"]}>{c.num}.</span>
              <div>
                <div className={styles["dock-citation-title"]}>{c.title}</div>
                <div className={styles["dock-citation-meta"]}>{c.meta}</div>
              </div>
            </article>
          ))}
        </div>
        <div className={styles["dock-footer"]}>
          <span>Verified · paper-of-record</span>
          <span className={styles["dock-typing"]} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </div>
      </aside>
    </>
  );
}
