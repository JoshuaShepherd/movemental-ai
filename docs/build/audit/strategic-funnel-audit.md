# Movemental Strategic Funnel & Site Architecture Audit

**Date:** 2026-04-13
**Auditor perspective:** Conversion strategy, lead generation, site hierarchy, navigation, and funnel architecture

---

## Executive Summary

Movemental has built a theologically coherent, problem-first, segment-aware marketing site that attracts qualified leads through clarity and specificity rather than volume plays. The site architecture is strong — 27 routes, 4 distinct audience paths, transparent economics, and a relationship-first contact philosophy.

However, the site currently operates as a **closed loop with no intake valve.** Every path leads to a contact page with no functional form, no email capture, and no low-friction entry point. The absence of lead magnets is philosophically aligned (selective, relationship-first), but it caps early-stage growth and provides zero mechanism to nurture interested-but-not-ready prospects.

**Critical finding:** The site has a conversion architecture problem, not a content problem. The content is excellent. The funnel has no floor.

---

## 1. Sitemap & Information Architecture

### Current Route Map (27 routes)

| Category | Route | Purpose | Funnel Stage |
|----------|-------|---------|--------------|
| **Home** | `/` | Problem statement + segment routing | Awareness |
| **Audience** | `/movement-leaders` | Segment: thought leaders | Interest |
| | `/churches` | Segment: churches & ministries | Interest |
| | `/nonprofits` | Segment: mission-driven orgs | Interest |
| | `/who-is-a-movement-leader` | Qualification framework | Interest |
| **Product** | `/how-it-works` | 3-step mechanism | Consideration |
| | `/system` | 6-layer architecture | Consideration |
| | `/platform` | Platform narrative + honest bounds | Consideration |
| **Services** | `/services` | Overview + two tracks | Evaluation |
| | `/services/discovery-lab` | Entry sprint | Evaluation |
| | `/services/system-builds` | Hub for vertical builds | Evaluation |
| | `/services/system-builds/foundation` | Governance & ethics build | Evaluation |
| | `/services/system-builds/content` | Content system build | Evaluation |
| | `/services/system-builds/fundraising` | Fundraising systems build | Evaluation |
| | `/services/organizational-systems` | Org depth strategy | Evaluation |
| **Proof** | `/evidence` | Platform depth claims | Consideration |
| | `/pricing` | 90/10 economics + sprint pricing | Evaluation |
| | `/faq` | 85+ Q&A items, 7 sections | Evaluation |
| **Company** | `/about` | Origin story + values | Trust |
| | `/vision` | Mission & orientation | Trust |
| | `/manifesto` | Conviction statement | Trust |
| | `/movemental-at-100` | Capacity thesis + projections | Trust |
| **Conversion** | `/contact` | Lead capture (non-functional) | Decision |
| **Legal** | `/privacy` | Privacy policy | Compliance |
| | `/terms` | Terms of service | Compliance |
| | `/cookies` | Cookie policy | Compliance |

### Architecture Assessment

**Strengths:**
- Clean separation of audience paths (4 verticals)
- Product understanding builds progressively (how-it-works → system → platform)
- Services are properly nested (`/services/system-builds/foundation`)
- Proof cluster (evidence + pricing + FAQ) removes friction before contact

**Gaps:**
- No `/blog` or `/resources` — zero organic traffic entry points
- No `/case-studies` — social proof relies entirely on claims, not stories
- No `/demo` or `/walkthrough` — no self-serve product understanding
- No `/methodology` — process remains opaque between "start a conversation" and "your platform is live"
- `/movemental-at-100` is not linked in navigation — orphaned strategic content

---

## 2. Navigation Audit

### Desktop Navigation (5 dropdown groups)

| Group | Items | Assessment |
|-------|-------|------------|
| **Who it's for** | Movement leaders, Churches, Nonprofits, Who is a movement leader? | Good segment routing. "Who is a movement leader?" is a qualifier, not an audience — could confuse. |
| **How it works** | How it works, The system, Platform | Clean progressive disclosure. |
| **Services** | Overview, System builds, Organizational systems, Discovery Lab | Correct hierarchy. Discovery Lab (entry sprint) should be more prominent. |
| **Proof** | Evidence, Pricing, FAQ | Unusual grouping. "Proof" as a label is defensive — implies needing to prove something. |
| **Company** | About, Vision, Manifesto | Standard. Missing "Contact" (only in header CTA). |

### Header CTA
- "Start a conversation" → `/contact` (primary blue button)
- Present on desktop and mobile
- Good: persistent, clear action
- Problem: leads to a non-functional form

### Navigation Issues

1. **"Proof" label is defensive.** The word "proof" suggests you're on trial. Consider "Evaluate" or "Learn more" — still captures the intent but positions Movemental as confident, not defensive.

2. **Discovery Lab is buried.** It's the lowest-friction entry point for organizations but sits inside a Services dropdown alongside higher-commitment builds. It should be elevated — either a standalone nav item or called out with a badge/indicator.

3. **No "Resources" or "Learn" section.** Once a blog or resource hub exists, navigation needs a content-first entry point for top-of-funnel visitors.

4. **Contact is only a CTA button, not a nav item.** Some visitors scan nav links to orient themselves. "Contact" should appear in footer and be findable via nav, not only via the CTA button.

5. **Mobile nav mirrors desktop structure.** This works well for the current 17-item nav. At 20+ items, consider prioritizing audience paths and collapsing product/services.

6. **Footer has inconsistent grouping.** The "Evaluate" column (Evidence, Pricing, FAQ, How it works) mixes proof with product education. Group by user intent, not internal taxonomy.

7. **Orphaned pages:** `/movemental-at-100` is not linked from any navigation element. Either link it (under Company or Proof) or consider it an internal/pre-launch document.

---

## 3. Funnel Architecture

### Current Funnel Flow

```
Awareness          Interest           Consideration        Evaluation          Decision
─────────────────────────────────────────────────────────────────────────────────────────
Home page    →  Audience pages   →  How it works     →  Pricing          →  Contact
(problem       (segment self)      System              Services             (NO FORM)
 statement)                        Platform             FAQ
                                   Evidence             Sprint details
```

### Funnel Assessment

**Stage 1: Awareness (Home page) — STRONG**
- Problem-first framing ("The work is real. The system is missing.") is excellent
- Four audience cards provide clear self-segmentation
- Dual hero CTA ("Start a conversation" + "See how it works") addresses both ready and curious visitors
- 13-section home page tells the complete story without requiring any other page

**Stage 2: Interest (Audience pages) — STRONG**
- Each page reframes the problem for its specific audience
- Pain points are concrete and recognizable
- Qualification frameworks signal selectivity (good for quality, risky for volume)
- CTAs appropriately graduate: "Apply to join" for leaders, "Talk with Movemental" for orgs

**Stage 3: Consideration (Product pages) — STRONG**
- Progressive disclosure works: how-it-works → system → platform
- Evidence page is technically grounded without being inaccessible
- "What we're still building" section on Evidence page builds trust through honesty
- AI ethics framing is sophisticated and addresses real concerns for this audience

**Stage 4: Evaluation (Pricing/Services/FAQ) — ADEQUATE**
- 90/10 model is clear, memorable, and differentiating
- FAQ is comprehensive (85+ items across 7 categories)
- Organization pricing is opaque — 4-week builds are described but not priced
- No comparison to alternatives (what does this cost vs. doing it yourself or using competitors?)

**Stage 5: Decision (Contact) — BROKEN**
- Contact form is not functional ("Coming soon")
- No email address provided on the page
- No calendar scheduling link
- No phone number
- The entire funnel delivers visitors to a dead end

### Funnel Diagnosis

The funnel has **excellent architecture and content** but **no conversion mechanism.** It's a beautifully curated museum with no gift shop and locked exits.

Additionally, the funnel is **single-path** — every visitor must eventually "start a conversation." There is no:
- Self-serve path (free trial, freemium tier, sandbox)
- Low-commitment path (newsletter, resource download, webinar)
- Passive nurture path (email sequence, drip content)
- Community path (forum, Slack/Discord, peer network)

This means every visitor who isn't ready to talk right now is lost forever.

---

## 4. Lead Magnet & Capture Strategy

### Current State: Zero Lead Capture

| Mechanism | Status | Impact |
|-----------|--------|--------|
| Contact form | Not functional | Critical — funnel dead end |
| Email newsletter | Does not exist | No passive nurture |
| Gated content (PDFs, guides) | Does not exist | No value-before-commitment |
| Webinar/demo signups | Does not exist | No scheduled touchpoints |
| Free trial/sandbox | Does not exist | No self-serve exploration |
| Community signup | Does not exist | No peer validation path |

### Philosophy vs. Growth Tension

The contact page explicitly signals a relationship-first, slow, selective model. This is **philosophically coherent** with Movemental's positioning ("formation over growth," "humans over hacks"). However, it creates a binary: visitors either commit to a sales conversation or leave with nothing.

**The fix is not to abandon the philosophy but to create low-friction ways for aligned prospects to stay connected:**

### Recommended Lead Magnet Strategy (Aligned with Brand)

**Tier 1 — Awareness (No commitment required)**
- **Formation Assessment:** A self-serve diagnostic that helps leaders evaluate their current system maturity. Output: personalized score + recommendations. Capture: email for results delivery. This is the highest-value, lowest-friction lead magnet for this audience.
- **"What's Missing" Calculator:** For organizations — input your current tool stack, see what's fragmented. Not a product pitch; a genuine diagnostic.

**Tier 2 — Interest (Email exchange)**
- **Monthly Formation Letter:** Not a newsletter. A single, substantive letter from the team on what they're seeing in formation work. Positions Movemental as thought leaders. Capture: email signup in footer + dedicated `/subscribe` page.
- **Implementation Playbook (PDF):** "The 90-Day Formation System Audit" — a genuine guide leaders can use with or without Movemental. Builds trust, demonstrates expertise.

**Tier 3 — Consideration (Calendar commitment)**
- **Discovery Lab Preview Call:** 30-minute call specifically for organizations considering a Discovery Lab sprint. Lower commitment than "start a conversation." Calendar scheduling via Calendly or Cal.com.
- **Platform Walkthrough (Recorded):** A 10-minute video tour of a real Movemental platform. No login required. Available on `/walkthrough` page.

**Tier 4 — Evaluation (Application)**
- **Leader Application Form:** For movement leaders — structured application (not just contact). Signals selectivity. Collects qualifying information. Creates mutual evaluation dynamic.
- **Organization Inquiry Form:** For churches/nonprofits — structured intake that captures needs, current stack, timeline, budget range. Routes to appropriate sprint recommendation.

---

## 5. Conversion Points Audit

### All CTAs Across the Site

| Page | CTA Text | Destination | Type | Assessment |
|------|----------|-------------|------|------------|
| Home hero | "Start a conversation" | `/contact` | Primary | Good placement, broken destination |
| Home hero | "See how it works" | `/how-it-works` | Secondary | Good — serves curious visitors |
| Home audiences | "Apply" | `/movement-leaders` | Card link | Confusing — "Apply" links to info page, not application |
| Home proof | "Continue the proof" | `/evidence` | Text link | Good progressive disclosure |
| How it works | "Start a conversation" | `/contact` | Primary | Good mid-funnel capture |
| How it works | "Talk with Movemental" | `/contact` | Arrow link | Softer variant, good |
| Movement leaders | "Apply to join" | `/contact` | Primary | Strong — but destination has no application form |
| Churches | "Talk with Movemental" | `/contact` | Arrow link | Appropriate for org audience |
| Nonprofits | "Talk with Movemental" | `/contact` | Arrow link | Appropriate for org audience |
| Services | "Start a conversation" | `/contact` | Primary | Expected |
| Pricing | "Start a conversation" | `/contact` | Arrow link | Expected |
| Evidence | "Talk with Movemental" | `/contact` | Arrow link | Good — proof → action |
| FAQ | "Start a conversation" | `/contact` | Primary | Good — FAQ answers objections, then converts |
| FAQ | "Back to home" | `/` | Secondary | Unusual — why send them backward? |
| Contact | "See the system" | `/system` | Text link | Good — pre-contact exploration |
| Contact | "Services overview" | `/services` | Text link | Good — pre-contact exploration |
| Movemental at 100 | "Start a conversation" | `/contact` | Primary | Good — but page is orphaned |
| Movemental at 100 | "See the evidence" | `/evidence` | Arrow link | Good progressive flow |

### CTA Issues

1. **All roads lead to a broken page.** Every primary CTA targets `/contact`, which has no functional form.

2. **"Apply" on home page links to `/movement-leaders`, not an application.** This sets an expectation of an application process but delivers an information page.

3. **No mid-funnel capture.** Between "I'm interested" and "I'm ready to talk," there's nothing. No email signup, no resource download, no "save for later."

4. **FAQ's secondary CTA goes backward.** "Back to home" after FAQ is a regression in the funnel. Replace with a forward action: "See pricing" or "Start a conversation."

5. **No exit-intent or scroll-triggered CTAs.** Every CTA is static. For visitors about to leave, there's no last-chance capture.

6. **Contact page has no clear action.** The page says "Contact form coming soon" and suggests email, but provides no email address.

---

## 6. Content Strategy & SEO Assessment

### Current Content Architecture

All content is **product/marketing content** — pages that describe what Movemental is, does, and costs. There is zero **editorial content** — no blog posts, articles, guides, or thought leadership that would attract organic search traffic.

### SEO Gaps

| Factor | Status | Impact |
|--------|--------|--------|
| Blog/articles | Missing | No organic traffic path |
| Resource hub | Missing | No keyword-targeted landing pages |
| Meta descriptions | Unknown (not audited) | May affect click-through from search |
| Structured data | Unknown | May affect rich snippet eligibility |
| Internal linking | Moderate | Pages link to each other but no content web |
| Backlink strategy | No content to attract links | Growth ceiling |

### Content Opportunities (High-Value, Low-Effort)

1. **"Formation vs. Growth" essay series** — 3-5 articles defining the formation-first philosophy. Targets keywords like "church digital strategy," "nonprofit technology stack," "movement leader platform."

2. **Case studies** — Even 2-3 early stories would transform the Evidence page from claims to proof. Structure: problem → approach → outcome → leader quote.

3. **"What is a formation system?" definitive guide** — A long-form piece that owns the category definition. This is Movemental's to claim.

4. **Comparison content** — "Movemental vs. Kajabi," "Movemental vs. Church Online Platform," "Movemental vs. building it yourself." These are high-intent search queries.

5. **Implementation guides** — "How to audit your current digital stack," "What to prepare before a Discovery Lab." These serve prospects and build SEO authority.

---

## 7. Social Proof & Trust Architecture

### Current Trust Elements

| Element | Status | Strength |
|---------|--------|----------|
| Transparent pricing (90/10) | Present | Strong — unique and memorable |
| FAQ (85+ items) | Present | Strong — addresses objections proactively |
| Evidence page | Present | Moderate — claims without customer proof |
| "What we're still building" honesty | Present | Strong — builds trust through candor |
| Legal pages | Present | Standard — complete and professional |
| Customer testimonials | Missing | Critical gap |
| Case studies | Missing | Critical gap |
| Logos/partner badges | Missing | Would strengthen credibility |
| Team/founder bios | Missing | Humanizes the brand |
| Metrics/data | Missing | "X leaders, Y organizations" would anchor claims |

### Trust Gap Analysis

The site asks visitors to trust a **philosophical argument** without **empirical evidence.** The Evidence page is well-named but contains only architectural claims ("we built a multi-tenant system") rather than outcome evidence ("leaders using this system saw X").

For a high-touch, relationship-first model, this is a significant gap. The people most likely to "start a conversation" are those who've seen proof that the conversation is worth having.

---

## 8. Audience Segmentation Assessment

### Segment Clarity: STRONG

Four distinct paths with audience-specific messaging:

| Segment | Page | Problem Frame | CTA | Assessment |
|---------|------|---------------|-----|------------|
| Movement leaders | `/movement-leaders` | "Credibility is real. Online, it's fragmented." | "Apply to join" | Excellent — selective framing attracts serious leaders |
| Churches | `/churches` | "Sunday content =/= ongoing formation." | "Talk with Movemental" | Excellent — speaks formation language |
| Nonprofits | `/nonprofits` | "Tools weren't built for formation." | "Talk with Movemental" | Strong — frames problem systemically |
| Qualification | `/who-is-a-movement-leader` | "Movement leadership is defined by what you've built." | (Implicit) | Good — but no CTA on this page |

### Segmentation Issues

1. **No segment-specific conversion paths.** All four audiences funnel to the same `/contact` page with the same (non-functional) form. Leaders should apply; organizations should inquire. Different processes, different forms.

2. **"Who is a movement leader?" is a dead-end page.** It defines the concept but doesn't route the reader anywhere. Add a CTA: "If this describes you, apply" or "If this describes someone you know, share this page."

3. **No segment-specific proof.** Evidence page is generic. Churches want to see church examples. Nonprofits want to see nonprofit outcomes. Leaders want to see leader platforms.

4. **Media/research segment has no page.** Contact page lists "Media/research" as an audience tag, but there's no page explaining what Movemental offers journalists or researchers.

---

## 9. Pricing & Economics Assessment

### Movement Leaders Track: CLEAR

The 90/10 model is the site's strongest differentiator:
- Simple to understand
- Visually presented
- Example provided ($100k → you keep $90k)
- Philosophically grounded ("aligned economics, not extraction")

**Issues:**
- No information about minimum viable scale ("Is this worth it if I make $10k/year?")
- No comparison to alternatives ("Kajabi takes X%, Teachable takes Y%")
- No information about what happens at scale ("Does the 90/10 hold at $1M?")
- Startup costs unclear — is there an upfront investment for platform setup?

### Organization Track: OPAQUE

4-week modular builds are described but not priced:
- Discovery Lab: described, not priced
- Foundation Layer: described, not priced
- Content System: described, not priced
- Fundraising System: described, not priced

**Issues:**
- "Conversational scoping" means every prospect must talk to someone before knowing if they can afford this
- No ballpark ranges ("builds typically range from $X to $Y")
- No comparison to alternatives ("vs. hiring a dev agency")
- No ROI framing ("churches that implement formation systems see X% improvement in Y")

---

## 10. Mobile & Accessibility Considerations

### Mobile Navigation
- Hamburger menu with Sheet component
- All 5 groups rendered as flat sections
- Auto-closes on link tap
- Header CTA persists

**Issues:**
- 17 nav items in a flat list is manageable but approaching the limit
- No search functionality for deep-funnel visitors looking for specific answers
- No sticky CTA on scroll (header CTA scrolls away on long pages)

---

## 11. Priority Recommendations

### P0 — Critical (Funnel is broken without these)

1. **Build the contact form.** The entire funnel dead-ends. At minimum: name, email, audience segment, message. Route submissions to email + store in Supabase.

2. **Add an email address to the contact page.** Until the form works, visitors need a way to reach you. This is a one-line fix.

3. **Implement basic email capture.** Footer newsletter signup ("Monthly Formation Letter"). This is the minimum viable nurture path.

### P1 — High Priority (Significant growth unlocks)

4. **Create a leader application form.** Separate from general contact. Structured fields: name, website/platform, audience size, content types, what they need. This is the "Apply to join" destination.

5. **Create an organization inquiry form.** Separate from general contact. Fields: org name, type (church/nonprofit/other), current tools, team size, timeline, budget range.

6. **Build a Formation Assessment.** Self-serve diagnostic tool. 10-15 questions. Output: score + recommendations + "talk to us if you scored X." Email capture for results delivery. This is the highest-value lead magnet.

7. **Write 2-3 case studies.** Even early/pilot stories. Structure: problem → approach → outcome → quote. Add to nav under "Proof" (or new label).

### P2 — Important (Strengthens funnel and SEO)

8. **Launch a blog or resources section.** Start with 3-5 articles: "What is a formation system?", "Formation vs. growth: why the difference matters," "The leader's guide to digital platform economics." Target high-intent keywords.

9. **Add a recorded platform walkthrough.** 10-minute video on a `/walkthrough` page. Shows a real platform. No login required.

10. **Add founder/team section to About page.** Humanize the brand. Names, photos, 2-sentence bios.

11. **Rename "Proof" nav group.** "Evaluate" or "Learn more" — confident, not defensive.

12. **Elevate Discovery Lab in navigation.** It's the lowest-friction entry point. Give it a nav-level presence, not just a Services sub-item.

### P3 — Nice to Have (Polish and optimization)

13. **Add segment-specific CTAs to audience pages.** Leaders → application form. Churches → inquiry form. Nonprofits → inquiry form.

14. **Add exit-intent email capture.** Triggered when cursor moves toward browser chrome. Offer the Formation Letter or Assessment.

15. **Add "Who is a movement leader?" CTA.** Route to leader application or `/movement-leaders`.

16. **Add comparison content.** "Movemental vs. X" pages for high-intent search.

17. **Add pricing ballparks for organization builds.** Even ranges ("typically $15k-$40k depending on scope") would reduce friction.

18. **Fix FAQ secondary CTA.** Replace "Back to home" with "See pricing" or "Start a conversation."

19. **Link `/movemental-at-100` in navigation.** Under Company or as a standalone "Vision" sub-page.

20. **Add search to the site.** FAQ alone has 85+ items. A site-wide search would help deep-funnel visitors find specific answers.

---

## 12. Funnel Metrics Framework (For When Analytics Are Implemented)

### Key Metrics to Track

| Metric | What It Measures | Target |
|--------|-----------------|--------|
| Segment click-through | Which audience card gets clicked on home page | Understand demand distribution |
| Depth of visit | Pages per session by entry point | >3 pages = qualified |
| Contact form submissions | Raw conversion rate | Baseline, then improve |
| Form-to-conversation rate | How many submissions become real conversations | >50% |
| Time on Evidence page | Are visitors reading the proof? | >2 min |
| FAQ section expansion rate | Which questions get opened? | Prioritize answers |
| Assessment completion rate | Lead magnet effectiveness | >60% start, >40% complete |
| Newsletter signup rate | Passive nurture capture | >2% of visitors |
| Audience segment distribution | Who's actually coming? | Informs content investment |

---

## Conclusion

Movemental's site is **content-rich and architecturally sound** but **conversion-incomplete.** The philosophy of selectivity and relationship-first engagement is a legitimate strategic choice — but it must be paired with functional mechanisms for capturing interest at every commitment level.

The single most impactful change is building the contact form. The highest-leverage strategic addition is a Formation Assessment lead magnet. The largest growth unlock is launching content marketing (blog + resources) to create organic traffic entry points.

The site doesn't need more pages about what Movemental is. It needs infrastructure to capture the interest of people who already understand what it is and want to go further.
