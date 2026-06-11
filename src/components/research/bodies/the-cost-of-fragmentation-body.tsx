import type { ReactNode } from "react";
import Link from "next/link";

import styles from "../research.module.css";

function Cite({ n, title }: { n: number; title: string }) {
  return (
    <Link href="/research/sources" className={styles.citationSup} title={title}>
      [{n}]
    </Link>
  );
}

function ResearchLink({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <Link href={`/research/${slug}`} className={styles.textInkBlue}>
      {children}
    </Link>
  );
}

/** Paper — ported from `docs/articles/graded-high/85-99/the-cost-of-fragmentation.md`. */
export const theCostOfFragmentationBody: ReactNode = (
  <>
    <p className={styles.dropCap} id="section-summary">
      Fragmentation taxes every organization that carries meaning through time. Knowledge, relationships,
      decisions, and formation live in places that do not agree with each other — and the cost of that
      disagreement compounds.
    </p>

    <p>
      This piece names the tax <strong>by audience</strong>, because &ldquo;fragmentation is bad&rdquo; does
      not help anyone decide what to do. A movement leader pays in voice dilution and missed partnerships. A
      church pays in pastoral burnout and formation that never arrives. An institution pays in credentialing
      drift and handoff failure. A nonprofit pays in donor amnesia and mission drift. Different currencies,
      same underlying debt.
    </p>

    <p>
      <strong>What we claim:</strong> Eight cost vectors — memory, continuity, compounding, credibility,
      formation, coherence, AI-readiness, and risk exposure — show up in every audience, with different
      exchange rates.
    </p>

    <p>
      <strong>What we do not claim:</strong> A single dollar figure for &ldquo;the fragmentation tax,&rdquo;
      or proof that consolidation always beats a deliberate multi-platform strategy. The research synthesis on
      leader visibility lives elsewhere; this article is the <strong>human cost map</strong>.
    </p>

    <p>
      <strong>Sourced anchor:</strong> Institutional trust erodes slowly, then in step-changes when internal
      coherence fails public scrutiny — a pattern Edelman&rsquo;s Trust Barometer work tracks across sectors{" "}
      <Cite n={18} title="Edelman Trust Barometer · 2025" /> (see also{" "}
      <ResearchLink slug="trust-verification">Trust, verification, and digital identity</ResearchLink>).
    </p>

    <p>
      <strong>Honest limit:</strong> Examples name real leaders (Alan Hirsch, Brad Brisco) as illustrative
      patterns, not statistical samples. Your organization&rsquo;s exchange rates may differ.
    </p>

    <h3 id="section-universal">A universal tax, levied differently</h3>

    <p>
      What changes across audiences is not whether the tax is paid. It is what the tax is paid{" "}
      <strong>in</strong>.
    </p>

    <p>What helps is seeing your own costs named clearly enough that you cannot unsee them.</p>

    <h3 id="section-currencies">What fragmentation actually charges</h3>

    <p>Before walking through the four audiences, eight currencies the tax draws on:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>1.</span>
        <span>
          <strong>Memory</strong> — recall of what was learned, said, decided, or tried
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>2.</span>
        <span>
          <strong>Continuity</strong> — capacity to survive leadership transitions without amnesia
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>3.</span>
        <span>
          <strong>Compounding</strong> — new effort building on old effort instead of restarting near zero
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>4.</span>
        <span>
          <strong>Credibility</strong> — outsiders verifying what you are and what you have done
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>5.</span>
        <span>
          <strong>Formation</strong> — people actually shaped by the work over time
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>6.</span>
        <span>
          <strong>Coherence</strong> — decisions, messaging, and practice matching across surfaces
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>7.</span>
        <span>
          <strong>AI-readiness</strong> — tools extending the work faithfully instead of distorting it
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>8.</span>
        <span>
          <strong>Risk exposure</strong> — what happens when crisis, audit, or public scrutiny arrives
        </span>
      </li>
    </ul>

    <p>Every audience pays in every currency. The sections below trace the exchange rates.</p>

    <h3 id="section-leaders">The movement leader</h3>

    <p>
      The movement leader is someone whose work has produced formation for years — often decades — usually
      without matching infrastructure. Alan Hirsch and Brad Brisco are canonical examples in the missional
      space. The pattern holds across fields: frameworks, a network of practitioners, a partial institutional
      relationship, and an intuition that the work is bigger than its current container.
    </p>

    <h4>Voice dilution and mimetic collapse</h4>

    <p>
      The first acute cost is to <strong>voice</strong>. A movement leader&rsquo;s voice is the central asset
      — the thing quoted, paraphrased, taught, and reproduced downstream. When that voice is scattered across
      a publisher&rsquo;s backlist, talks on YouTube, old websites, a newsletter that lived and died on
      Substack, and a locked social account, the voice does not cohere anywhere.
    </p>

    <p>
      <strong>Synthesis:</strong> Generative AI makes this condition dangerous in a new way. A model can
      approximate many voices from a small sample, and there is often no provenance layer distinguishing
      original articulation from paraphrase or fabrication. A consolidated, authoritative corpus is not
      merely convenient — it is a <strong>credibility defense</strong>. See{" "}
      <ResearchLink slug="ai-credibility-crisis">The AI Credibility Crisis</ResearchLink> for the evidence
      limits on synthetic prevalence and detection.
    </p>

    <h4>Scenius collapse</h4>

    <p>
      Movement leaders rarely work alone. Credibility moves through peer networks. Brian Eno called this{" "}
      <strong>scenius</strong>: the intelligence of a scene, not a lone genius. When each leader&rsquo;s work
      lives in fragmented form, the scenius stops functioning as a network of verifiable reference. See{" "}
      <ResearchLink slug="scenius-network-credibility">Scenius as Credibility Mechanism</ResearchLink>.
    </p>

    <p>
      This is the quiet death of a movement. Not collapse exactly. Drift into illegibility.
    </p>

    <h4>Rented audience and captured margin</h4>

    <p>
      Most movement leaders operate on rented platforms. Collectively, audience, revenue, and data belong to
      platforms, not to the leader. Rented scaffolding does not transfer when the work moves to a successor
      or a different phase of ministry.
    </p>

    <h4>Apprenticeship failure and opportunity cost</h4>

    <p>
      Apprenticeship requires a legible body of work. A leader who does not consolidate before succession
      becomes the last person who understood the work in its wholeness. Partnerships, institutions, and
      funders that would have engaged coherent work pass by — fragmentation is a silent cap on trajectory.
    </p>

    <h3 id="section-churches">The church</h3>

    <p>
      Churches occupy a unique position: their explicit purpose is <strong>formation</strong>. Fragmentation&rsquo;s
      cost here is direct — what a church loses is largely the thing it exists to produce.
    </p>

    <h4>The formation gap</h4>

    <p>
      A church with fragmented intelligence produces attendance, not formation. Sermons, classes, and small
      groups are real events that do not link in a way the congregant can move through. Long-term attenders
      who cannot articulate formation received; leaders who sense entertainment outweighs formation and
      cannot find the lever — the gap between intent and outcome is, to a significant degree, a fragmentation
      gap.
    </p>

    <h4>Pastoral memory and the heroic operating model</h4>

    <p>
      Most pastoral care runs on the pastor&rsquo;s memory. When the pastor transitions or burns out, the
      memory evaporates. Burnout is often framed as personal failure; the structural reality is that the
      church asks the pastor to carry institutional memory the church never built a system to hold.
    </p>

    <h4>The Sunday-to-weekday fracture</h4>

    <p>
      Teaching happens overwhelmingly on Sundays. Formation that requires weekday engagement depends on
      infrastructure the church rarely has. A congregant who wanted to move through the church&rsquo;s
      teaching as a curriculum has no way to do so. AI deployed into a fragmented church becomes dangerous —
      because a model asked to summarize teaching will invent connections that do not exist in the actual body
      of work.
    </p>

    <h4>Generational handoff, governance, and stewardship</h4>

    <p>
      Pastoral succession and transmission to children both fail when ministry programs do not connect.
      Governance pressure on sexuality, politics, AI, and money requires coherent response — fragmentation
      means improvised answers. Giving structured as annual appeals becomes transactional when relational
      stewardship is impossible because the church does not remember the giver&rsquo;s story.
    </p>

    <h3 id="section-institutions">The institution</h3>

    <p>
      By <em>institutions</em> I mean seminaries, denominational offices, mission agencies, religious
      publishers, academic programs, and networks under shared oversight — scale across time and entities.
    </p>

    <h4>Credentialing drift</h4>

    <p>
      A credential is worth something only if the institution behind it is coherent. When formation
      architecture is fragmented, the credential&rsquo;s value erodes — slowly at first, then in a
      step-change when employers, congregations, or accreditors notice. AI accelerates this: when a model can
      produce what a degree&rsquo;s holder is expected to produce, the degree&rsquo;s value reduces to the
      formation behind it.
    </p>

    <h4>Cross-entity incoherence and intergenerational handoff</h4>

    <p>
      Fragmentation at scale looks like forty regional bodies running forty versions of ordination; thirty
      field offices with thirty donor-tracking systems. The promise at entry is not the promise at graduation
      — because the institution&rsquo;s memory of its own tradition was never operationally held.
    </p>

    <h4>Alumni drift, archival illegibility, accreditation risk</h4>

    <p>
      Constituencies become mailing-list addresses instead of living proof. Archival work becomes a backlog no
      one can navigate. Accreditors require coherent, auditable evidence — fragmented institutions assemble
      partial pictures through heroic staff effort before each site visit.
    </p>

    <h4>Public credibility with a long half-life</h4>

    <p>
      Edelman&rsquo;s Trust Barometer and related institutional-trust research describe a recurring pattern —
      trust accumulates over decades and can collapse quickly when claim and reality diverge{" "}
      <Cite n={18} title="Edelman Trust Barometer · 2025" />. Fragmentation widens that gap. When it is wide
      enough, a single public incident triggers collapse that looks sudden but was structurally prepared over
      years.
    </p>

    <h3 id="section-nonprofits">The nonprofit</h3>

    <p>
      Nonprofits are mission-driven, resource-constrained, accountable to donors, boards, beneficiaries, and
      regulators — usually too large for individual heroism and too small for enterprise infrastructure.
    </p>

    <h4>Donor amnesia and impact storytelling starvation</h4>

    <p>
      Mid-tier giving depends on whoever last sent a thank-you note. A significant fraction of sector
      financial pressure is not about generosity — it is about <strong>memory</strong>. Impact stories sit with
      field staff and do not reach the donor-facing team; the organization recycles three stories from last
      year&rsquo;s gala because those were the ones that made it through.
    </p>

    <h4>Program evaluation, turnover, and board asymmetry</h4>

    <p>
      Most nonprofits cannot produce a coherent account of which programs actually work under pressure. Staff
      turnover removes institutional memory no one else carried. Board packets are assembled through
      last-minute heroics because the data layer does not persist.
    </p>

    <h4>Volunteer continuity, compliance, and mission drift</h4>

    <p>
      Volunteers cycle through without deepening commitment. Scattered compliance policies surface only when a
      regulator asks. Over a decade, mission drifts several degrees without anyone explicitly deciding to
      change it.
    </p>

    <h3 id="section-thread">The common thread</h3>

    <p>
      Across all four audiences, intelligence, relationships, decisions, and formation live in places that
      do not agree. What differs is the form the tax takes.
    </p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Movement leaders</strong> — voice, scenius, succession
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Churches</strong> — formation, pastoral capacity, cultural coherence
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Institutions</strong> — credentialing, handoff, public credibility
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Nonprofits</strong> — memory, measurement, mission
        </span>
      </li>
    </ul>

    <p>
      In every case, the tax <strong>compounds</strong>. Each year fragmentation persists, debt grows.{" "}
      <strong>Synthesis:</strong> AI raises the interest rate — fluent, confident, fabricated outputs
      propagate faster than correction, and fragmented organizations cannot correct at the speed of their
      own distortions.
    </p>

    <p>
      For the public fragmentation narrative, see{" "}
      <Link href="/fragmentation" className={styles.textInkBlue}>
        the fragmentation story
      </Link>
      .
    </p>

    <h3 id="section-changes">What changes when fragmentation is addressed</h3>

    <p>
      Nothing dramatic happens at the moment fragmentation is addressed. The organization begins to compound
      in the directions it was supposed to compound all along — voices stabilize, formation arrives, credentials
      mean what they were meant to mean, donor relationships hold across transitions.
    </p>

    <p>
      The work is unglamorous. It is also among the highest-leverage investments any of these audiences can
      make.
    </p>

    <h3 id="section-counter">Counterarguments to keep in the margin</h3>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Deliberate multi-platform presence can be strategic.</strong> The problem is missing{" "}
          <strong>canonical identity and connective tissue</strong>, not Substack or YouTube by themselves.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Some fragmentation is protective.</strong> Local autonomy in federations exists for good
          reason. The cost is <strong>unmanaged</strong> divergence, not every regional variation.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Integration projects fail too.</strong> Consolidation without adaptive leadership becomes
          another shelf system. The tax lowers only when <strong>people and memory</strong> change, not when
          software alone arrives.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Heroic pastors and EDs sometimes succeed anyway.</strong> Exceptional individuals mask
          structural debt for years — which makes the tax harder to see until succession or crisis.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>AI can help fragmented orgs look coherent short-term.</strong> Generated summaries can{" "}
          <strong>simulate</strong> coherence without formation or memory underneath — a new failure mode,
          not a cure.
        </span>
      </li>
    </ul>

    <h3 id="section-recommendations">Practical recommendations</h3>

    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          <strong>Name your dominant currency</strong> — Which of the eight costs is bleeding fastest? Start
          there; do not boil the ocean.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          <strong>Audit one handoff</strong> — Pastoral succession, ED transition, program directorship, or
          board cycle. Where does memory die?
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>03.</span>
        <span>
          <strong>Pick one canonical surface</strong> — Not &ldquo;move everything tomorrow.&rdquo; One place
          where your voice, mission, or curriculum is authoritative and linkable.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>04.</span>
        <span>
          <strong>Before AI deployment, map sources of truth</strong> — If the model cannot point to your
          corpus, it will invent one.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>05.</span>
        <span>
          <strong>Measure compounding</strong> — Are this year&rsquo;s grants, sermons, or campaigns building
          on last year&rsquo;s learning, or rediscovering it?
        </span>
      </li>
    </ol>

    <h3 id="section-choice">The choice named plainly</h3>

    <p>
      Every organization reading this is already paying the fragmentation tax. The question is not whether to
      pay. It is whether to continue paying in voice dilution, pastoral burnout, credential drift, and donor
      amnesia — or to convert the debt into an integrated system whose tax is lower and whose return is
      higher.
    </p>

    <p>
      AI did not create the tax. Fragmentation has charged these audiences for decades in currencies they did
      not always name. What AI did was raise the interest rate, make the tax visible, and — in the same motion
      — make paying the debt down finally tractable for many organizations that could not afford integration
      before.
    </p>

    <p>
      <strong>The cost is old. The reckoning is new.</strong>
    </p>

    <p className={styles.marginNote}>
      <strong>Related research:</strong>{" "}
      <ResearchLink slug="trust-verification">Trust and verification</ResearchLink> ·{" "}
      <ResearchLink slug="credibility-thesis">The Credibility Thesis</ResearchLink> ·{" "}
      <ResearchLink slug="the-credibility-crisis">The Credibility Crisis</ResearchLink> ·{" "}
      <Link href="/fragmentation" className={styles.textInkBlue}>
        Fragmentation story
      </Link>
    </p>
  </>
);
