# Movemental's Course Platform vs. Thinkific — An Honest Benchmark

*Written for a movement leader (the kind of practitioner Michael Cooper of Ephesiology is) who is already moving books, articles, site, and AI onto Movemental's stack — and who has to decide what to do with an **existing** course setup (Thinkific, or any mature hosted LMS).*

*Prepared May 2026. Grounded in the actual code and source material across three repositories (`movemental-ai`, `movemental-visual-editor`, `alan-hirsch`), Movemental's published pricing model, and a direct reading of Thinkific's current pricing, features, help docs, and reviews.*

> **Note on Cooper specifically:** Cooper runs an **accredited** Master Classes / Seminary@YourChurch LMS (Kairos degree ladder), not Thinkific. The Thinkific comparison below is the right frame for *hosted LMS vs. Movemental courses*; for Cooper, the accredited pipeline is a **do-not-migrate** boundary — see §7.

---

## 0. The one-paragraph version (if you read nothing else)

Movemental's **full custom platform** — site, books, articles, AI companions, checkout, and course *capability* — costs **$1,000 upfront + 10% of platform revenue**, with Movemental's team deploying and operating it. **Course migration is optional.** You can move everything else onto Movemental and keep Thinkific (or another LMS) for course delivery indefinitely.

The real question is not "Thinkific vs. Movemental as standalone products." It is: **given that you're already on the Movemental stack, should your courses live there too?**

**Migrate courses to Movemental when** formation-shaped pedagogy (cohort loop, in-lesson AI, enforced 8-week design) is load-bearing for what you sell, and you want one owned domain, one login, and one revenue/analytics story.

**Keep Thinkific (or your existing LMS) when** your courses are working as information delivery, accredited credentials, or institutional cohorts that must not be disturbed — especially while Movemental's community board, certificates, and instructor analytics are still unfinished.

Thinkific remains the rational choice for **course-only, rent-a-platform, ship-this-week** economics (~**$50–100/mo** nonprofit). Movemental wins on **owned, formation-shaped course design** bundled into a platform you're already buying — not on replicating Thinkific's LMS furniture on day one.

---

## 0.5. The decision you're actually making

| What you're doing | Required? |
|---|---|
| Move site, books, articles, podcast surface, AI agents to Movemental ($1,000 + 10%) | **Yes** — that's the deal |
| Migrate existing Thinkific (or other LMS) courses into Movemental | **No** — explicitly optional |

So this document is **not** "should Michael buy Movemental?" (that's a separate question; the course module is **included** in the $1,000 build). It is: **once he's on Movemental for everything else, what do we do about courses?**

Three live architectures:

1. **Split stack (valid default)** — Movemental for public hub + owned audience + books/articles/AI; Thinkific (or existing LMS) for course delivery. Link out; accept two logins until/unless migration pays off.
2. **Unified stack** — Rebuild or port courses into Movemental's learn experience. One brand, one checkout, formation AI in the loop.
3. **Hybrid** — Keep legacy/accredited courses on the old LMS; launch **new** formation courses on Movemental only.

The rest of this doc gives you an honest comparison to choose among those three.

---

## 1. What Movemental has actually built (in plain terms)

Think of it as **three connected pieces**, not one product. This matters, because most LMS platforms (Thinkific included) are a single thing you log into. Movemental is a **multi-app system** (delivery app + authoring dashboard + shared database) that Movemental deploys for you — included in the $1,000 build, not a separate LMS subscription.

### Piece 1 — A pedagogy, baked into the software (the real differentiator)

Most course tools are *neutral* about what a course is. You can put a video and a quiz in any order; the tool doesn't care whether anyone is actually changed. Movemental took the opposite stance and wrote its teaching philosophy *into the structure of the software*.

Every course is built on **four non-negotiables** — what the docs call the **Four Necessities**:

1. **Dissonance** — a productive tension that unsettles an assumption ("You say X — but what about Y?").
2. **Action** — one concrete, time-boxed step the learner takes *in real life*, named to a real person.
3. **Reflection** — looking back at what happened when they acted, turning experience into insight.
4. **Community** — a cohort that provides mirror, witness, and accountability.

Courses are a **fixed 8-week shape**: Week 1 orients, Weeks 2–7 each run the full loop on one idea, Week 8 sends. Each core week follows the same rhythm — *opening video → dissonance → main teaching → a real story → action step → reflection → cohort meeting → exit ticket.* This is enforced: there are tools (`course-validate`) that will flag a week that's missing dissonance or action or community.

**Why a teacher should care:** This is the difference between "I posted my lectures online" and "I designed an experience that changes how people live." For someone whose whole concern is disciple-making and movements — not information transfer — this is not a feature. It's the thesis. Thinkific has no opinion about any of this and never will.

### Piece 2 — The learner's experience (the "delivery app," `alan-hirsch`)

This is what a student actually sees. It is **genuinely built and working** in its core:

- A real course player: chapter/week sidebar, progress tracking per section and per lesson, mark-complete, previous/next navigation, mobile-responsive layout.
- **24 distinct kinds of lesson section** already coded as real components — not just video and text, but scripture, case study, field experiment, guided practice, covenant/commitment, exit ticket, and more.
- **The AI companion is real and wired in.** Three conversations sit *inside* the weekly loop — one to provoke (dissonance), one to land a concrete next step (action), one to integrate after the learner acts (reflection). In Week 1 the learner fills in their context (their role, city, ministry setting, gifting), and that context personalizes every later AI conversation. This is the standout. I want to be precise: it is *built and functioning*, not a mockup.
- Sign-in, access-gating (you can't reach `/learn` without enrolling), and **Stripe checkout for paid courses** all work.

### Piece 3 — The authoring tool (the "dashboard," `movemental-visual-editor`)

This is where a creator builds the course. It's a real, production-deployed dashboard with:

- A **drag-to-format rich text editor** (Tiptap — the same engine behind many modern editors) with a visual mode and an HTML mode.
- A **media library** that uploads images/video to cloud storage and gives you a URL to embed.
- Course/week/lesson creation, draft→published status, learner preview, and an **AI sidebar** that can help draft content *in the author's voice*.
- Custom content blocks (callouts, embedded quizzes, video-with-annotations, assignments, resource cards, data visualizations).

> **Important honesty note:** An earlier read of only the *delivery* app concluded "there's no course editor — you have to edit the database directly." That's wrong once you include the dashboard repo. The editor exists. The platform is **split across separate apps that share one database** — invisible to learners, operated by Movemental, not a single SaaS seat you rent.

---

## 2. Where Movemental is honestly *not yet* finished

I am deliberately listing these plainly, because a benchmark that hides them is useless to you.

| Capability | Honest status today |
|---|---|
| Live cohort discussion board | **Schema exists; UI shows placeholder/sample threads.** Real-time threaded discussion is not wired. This is significant because *Community* is one of the Four Necessities — the design depends on it, and it's the least finished part. |
| Certificates | **Templates can be stored; automatic issuance on completion is not wired.** |
| Quizzes / graded assessments | **Tables and a section component exist; scoring, feedback, and gating-on-score are not connected in the UI.** |
| Drip scheduling & prerequisites | **Schema is ready; the rules aren't enforced in code yet.** |
| Instructor/cohort analytics dashboard | **Stubbed.** A learner sees their own progress; an instructor can't yet see cohort-wide analytics in a finished screen. |
| Enrollment management screen | **Stubbed** (code literally notes "will be wired when the endpoint is available"). |
| Drag-and-drop reordering of weeks/lessons | **Not built** — you edit in place. |
| Native video hosting/streaming | **Not built** — you bring video URLs (YouTube/Vimeo/etc.). No built-in CDN, no upload-and-stream. |
| Learner mobile app | **None.** (It's mobile-*responsive web*, which is good, but not an app store app.) |
| SCORM, advanced exam engine | **None.** |

So: the **core learn loop + AI conversations + checkout** are real and working. A lot of the *surrounding* LMS furniture (community board, certificates, grading, drip enforcement, admin analytics) is **designed and schema-ready but not finished**. "What you'd ship today" is narrower than "what's designed."

---

## 3. What Thinkific gives you (honest profile, nonprofit lens)

Thinkific is a mature, hosted SaaS. For a nonprofit it offers a **50% discount on the Start or Grow plans** (registered nonprofits only; educational institutions excluded; applies to the monthly price). Realistically:

- **Start** ≈ **$50/mo** after nonprofit discount: unlimited courses, custom domain, 1 community, 10,000-student cap. *No branding removal on Start.*
- **Grow** ≈ **$100/mo** after discount: adds branding removal, 3 communities, better analytics, priority support.
- **No free-forever plan** anymore (30-day trial). **No dedicated nonprofit tier** — just the discount on standard plans.

What you get for that, immediately and supported:

- **A finished course builder**: drag-and-drop, Courses→Chapters→Lessons, lesson types for video, audio, text, PDF/downloads, multimedia/embeds (H5P, Storyline, Google Docs), quizzes, surveys, assignments, and live lessons.
- **Native video hosting** with bandwidth included per tier.
- **Certificates** generated automatically on completion.
- **Drip scheduling and prerequisites**, working out of the box.
- **A free learner mobile app** (iOS + Android).
- **Real commerce**: one-time, subscriptions, payment plans, memberships, bundles, coupons, order bumps — and crucially, **built-in sales tax / VAT calculation and remittance** in the US and Canada. Thinkific handles the payment-compliance headache.
- **AI helpers**: course-outline generator, multiple-choice quiz generator, landing-page/email copy, auto-captions, and (top tier) a "Thinker" support assistant.
- **A company behind it**: support staff, uptime, PCI compliance, backups, a published API.

Thinkific's honest weaknesses (from reviews): **design customization is rigid** (the #1 complaint), **native quizzes are multiple-choice only** (real exams need a paid third-party add-on, Brillium), **communities are newer/less mature**, slow video uploads, and **pricing creep** plus a **10,000-student cap** until the enterprise tier. Its AI is *assistive* (helps you build), not *pedagogical* (it doesn't run formation conversations inside the lesson).

---

## 4. Head to head (no thumb on the scale)

| Dimension | Thinkific (nonprofit) | Movemental (bundled in $1,000 platform) |
|---|---|---|
| **Time to launch** | Days. Sign up, build, publish. | Platform: 2–4 weeks. **Course migration:** additional content work — porting, re-shaping to 8-week loop, or net-new authoring. |
| **Cost — cash (courses only)** | ~$50–100/mo ongoing (~$600–1,200/yr), *on top of* Movemental if you split-stack. | **$0 incremental license** for course capability — included in the $1,000 build. Ongoing: 10% of course revenue through the platform + infra (hosting, AI usage per conversation). |
| **Cost — labor** | Near zero ops. | **Movemental team** finishes gaps and runs ops — not "hire your own engineer." Leader labor = authoring + facilitation, not DevOps. |
| **Cost — total stack** | Two bills, two brands, two support channels if split. | One platform fee structure; optional Thinkific bill if you keep it. |
| **Course builder** | Finished, drag-and-drop, polished. | Real editor (Tiptap), but no drag-reorder; some blocks half-built. |
| **Video** | Native hosting + CDN included. | Bring-your-own URL. No native streaming. |
| **Quizzes/exams** | Working (MC only natively; exams via paid add-on). | Designed, not wired for scoring/gating. |
| **Certificates** | Automatic. | Schema-ready, issuance not wired. |
| **Cohorts** | Communities exist (tiered add-on; newer). | **Cohort is the default design** — but the live discussion board is the least-finished piece. |
| **AI in the learning experience** | Assistive (outline/quiz/copy/support bot). | **Formation conversations inside every week, personalized to the learner, in the author's voice.** Genuinely differentiated and actually working. |
| **Pedagogy** | Neutral. You can build anything, good or bad. | **Opinionated and enforced** — Four Necessities, fixed 8-week loop, voice fidelity. |
| **Design control / branding** | Limited (top complaint). Branding removal from Grow up. | Total — it's your codebase. |
| **Data & platform ownership** | Hosted SaaS; export + API, but it lives on Thinkific. | You own everything — data, design, the model. |
| **Per-student economics** | 10,000-student cap until enterprise. | No per-seat cap; your infrastructure cost scales, not a license. |
| **Payments & tax** | Built-in, compliant, tax remitted (US/CA). | Stripe is wired; **tax/refund/dunning/compliance is on you.** |
| **Support / reliability** | A company with SLAs and a mobile app. | Movemental as ongoing partner (10% rev share); not Thinkific-grade LMS SLAs, but not DIY either. |
| **Mobile** | Native apps. | Responsive web only. |

---

## 5. The honest verdict (for someone already buying Movemental)

### If you were choosing *only* an LMS from scratch

**Thinkific wins.** Cheaper to start, complete, supported, compliant, teaching-this-week. Paying Movemental engineering time to replicate Thinkific's LMS furniture would be a bad trade versus $50/month rental.

**That is not Cooper's question.** He's already paying **$1,000 + 10%** for the full platform. Course capability comes with the build. The marginal question is **migration labor and operational risk**, not "should we build an LMS from scratch."

### Reframed: migrate courses or keep Thinkific?

| Signal | Lean **keep Thinkific / existing LMS** | Lean **migrate (or hybrid: new courses only)** |
|---|---|---|
| Course shape | Video + PDF + quiz; self-paced info transfer | Cohort formation: dissonance → action → reflection → community |
| Credentials | Certificates, drip, grades, mobile app are load-bearing today | Formation outcome matters more than LMS table-stakes |
| Existing enrollments | Active students mid-course; accredited paths; institutional partners | Greenfield courses or willing to run a transition cohort |
| Integration pain | Two logins acceptable; Thinkific checkout is fine | One domain, one Stripe, one analytics story is worth the port |
| Movemental gaps | Need discussion board, auto-certificates, instructor dashboard *now* | Can ship without those for v1, or Movemental finishes them on your timeline |
| Revenue | Course revenue already flowing; 10% on *all* platform revenue is the shared model either way | New formation product where AI-in-the-loop is the differentiator |

**Default recommendation for a leader like Cooper moving the rest of the stack:** **Split stack first, hybrid second, full migration last.**

- **Split stack:** Movemental = canonical public hub, books, articles, podcast surface, owned audience, AI agents. Existing LMS = accredited Master Classes, Seminary@YourChurch, Kairos ladder, anything with live enrollments. *Do not compete with or cannibalize the accredited pipeline.*
- **Hybrid:** Keep degree/certificate tracks on the LMS; pilot **one** new 8-week formation course on Movemental when community + certificates are wired — prove the differentiated loop before porting legacy catalog.
- **Full migration:** Only when (a) formation pedagogy is the product, (b) Movemental's community/cert/analytics gaps are closed, and (c) the cost of two systems (leader confusion, split data, double monthly bill) exceeds the one-time porting cost.

### When Movemental courses are clearly worth it (even with Thinkific available)

1. **The pedagogy is the product.** Formation — not "here are my lectures." The in-lesson AI companion (dissonance / action / reflection) is built and working; Thinkific cannot replicate it at any price. For Ephesiology-shaped teaching, the fit is unusually strong — *for net-new formation products*, not necessarily for re-platforming every existing certificate module.
2. **Unified ownership.** One codebase, one domain, no 10,000-student cap, no Thinkific branding constraints — already paid for in the $1,000 build.
3. **Engineering is already covered.** Movemental deploys and maintains the stack. The old verdict's "if #3 is shaky, stay on Thinkific" assumed DIY ops; that condition is largely met for Movemental clients.

If **pedagogy isn't load-bearing** for a given course, keeping it on Thinkific (or the existing LMS) is honest and cheap — **even after** the Movemental platform is live.

---

## 6. Migration economics (rough)

| Item | Keep Thinkific | Migrate courses |
|---|---|---|
| Extra cash (year 1) | ~$600–1,200 Thinkific + $0 incremental Movemental course fee | Drop Thinkific when fully migrated; AI usage scales with conversation volume |
| Leader labor | Low — keep editing where you edit today | **High one-time:** re-author or port into 8-week section types; re-test checkout/enrollment |
| Learner disruption | None | Re-enrollment, new URLs, email comms, possible dual-login during transition |
| Strategic upside | Status quo | Formation AI, tonal unity with site/books, single analytics, no per-seat cap |

**Break-even intuition:** Migration pays off when you're launching **new** formation products or when split-stack friction (two brands, no cross-linking in the learn loop, can't embed AI in legacy courses) costs more than a focused porting sprint — not when you're merely avoiding $50/month.

---

## 7. Decision tree (copy-paste for the buying conversation)

```
Already committing to Movemental platform ($1,000 + 10%)?
├─ NO  → Thinkific (or any mature LMS) for courses; this doc is premature.
└─ YES → Course migration required?
         ├─ NO (default OK) → Split stack. Link LMS from Movemental site.
         │                    Revisit when launching formation-native courses.
         └─ YES → Which courses?
                  ├─ Accredited / institutional / mid-enrollment → KEEP on existing LMS
                  ├─ Legacy info courses, working fine → KEEP unless unified brand is urgent
                  └─ New formation / cohort / AI-in-the-loop → BUILD on Movemental
                       └─ Wait for community board + certs if facilitators need them day one
```

**For Michael Cooper specifically:** Movemental consolidates dispersion and builds the owned-audience layer; the Master Classes / Kairos accredited LMS **stays**. Movemental should gate *into* those cohorts, not replace them. Migrate only net-new formation experiences — or nothing at all in year one — if the split stack is operationally tolerable.

---

## 8. What would change this verdict

Movemental's case gets decisively stronger the moment these three are *finished and running*, because they're the parts that are both differentiating and currently incomplete:

1. **The live cohort discussion board** — because Community is load-bearing in the pedagogy and is the least-finished piece.
2. **Certificate issuance + completion tracking** — table-stakes a teacher will expect on day one.
3. **An instructor/cohort analytics view** — so a facilitator can actually run a cohort, not just observe one learner.

Finish those, keep the AI formation loop (already the crown jewel), and the recommendation shifts from **"split stack by default"** toward **"migrate formation courses; keep accredited/legacy on old LMS"** for leaders already on the Movemental platform.

---

*Sources: direct code review of `movemental-ai`, `movemental-visual-editor`, and `alan-hirsch` (schema, section components, learn experience, editor, Stripe, AI chat); Movemental's own `COURSE_STRATEGY.md`, the Four Necessities doc, course skills, and pricing docs (`$1,000 + 10%` model in `docs/business-docs/`). Thinkific facts from thinkific.com pricing/features/nonprofit pages, support docs, and G2/Capterra reviews (May 2026). Cooper context from `docs/movement_leader_research/michael-cooper/` (accredited Master Classes LMS, complement-not-cannibalize playbook).*
