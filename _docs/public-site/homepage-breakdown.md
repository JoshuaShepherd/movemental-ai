# Homepage Alignment Breakdown
## Movemental.ai Public Homepage Diagnostic

**Generated**: January 2026  
**Route**: `/` (root)  
**Entry Point**: `app/page.tsx`  
**Primary Component**: `components/homepage/HomepageContainer.tsx`

---

## 1. Snapshot Summary

### Current Homepage "Pitch" (As Implied)

The homepage currently pitches Movemental as: **An affordable alternative to expensive custom development or traditional publishing**, emphasizing platform ownership, revenue retention (90% vs 10-15%), and low cost ($1,000 vs $50K-$150K). The primary value proposition centers on **economics and ownership**, not credibility, network effects, or the AI-era authenticity crisis.

### Who the Homepage Appears to Be Written For

Based on copy and structure, the homepage targets:
- **Content creators seeking to monetize** — heavy emphasis on revenue retention
- **Budget-conscious publishers** — "$1,000 vs $50K-$150K" framing repeated 4+ times
- **Platform ownership seekers** — "Own your platform. Keep your revenue."
- **Generic "movement leaders"** — the term appears but without specificity about what kind of movement or what qualifies someone

The copy implies someone who is primarily motivated by **economic concerns** and platform independence, not necessarily someone wrestling with credibility, AI-generated noise, or the deeper formation vs. growth tension.

### Primary Misalignment Diagnosis

The homepage **leads with Frame 3 (The Math of Amplification/Data-Driven)** from the core narrative docs, but positions economics as the primary value instead of network amplification math. It largely **ignores Frames 2 (Credibility Crisis) and 4 (Solo to Scenius)**, which represent Movemental's most differentiated positioning.

**The core tension**: Movemental's foundational documents describe a credibility network for AI-age authenticity, scenius over genius, formation over growth, and a curated community of verified peers. The homepage describes a cheaper publishing platform that lets you keep more money. These are different products for different people.

The intended audience (movement leaders with decades of credibility facing the AI authenticity crisis) would not recognize themselves in homepage copy that emphasizes "$1,000 platform build" and "85-90% revenue loss." The soul of Movemental—peer verification, network credibility, scenius, "content that moves"—is almost entirely absent.

---

## 2. Homepage Section Inventory (Exact Render Order)

### Section 0: Navigation
**File**: `components/homepage/Navigation.tsx`  
**Also used**: Homepage has its own `Navigation.tsx` (dark variant), separate from `components/shared/PublicNavigation.tsx`

| Element | Content |
|---------|---------|
| Logo | "Movemental" (text only, no logo image) |
| Primary Nav (Tier A) | Fit Check, Why Movemental, How It Works, Pricing |
| Explore Dropdown (Tier C) | AI Book, Books, Topics, Learn |
| CTA Button | "Get Started" → `/fit-check` |
| Search Icon | → `/search` |

**Intended User Movement**: Navigate to Fit Check or learn more via Why Movemental/How It Works

**Notes**: 
- Navigation duplicates structure with `PublicNavigation.tsx` (code duplication smell)
- "Explore" dropdown is Tier C (content path), appropriately de-emphasized
- Good: Fit Check is prominent

---

### Section 1: Dark Hero Section
**File**: `components/homepage/DarkHeroSection.tsx`

| Element | Content |
|---------|---------|
| Eyebrow | "For Movement Leaders" |
| Headline | "Own your platform. Keep your revenue." |
| Subhead | "Stop losing 85-90% of your revenue to traditional publishers and platforms. Movemental builds complete digital publishing platforms for movement leaders—for $1,000 instead of $50K-$150K." |
| Primary CTA | "Take the 60-Second Fit Check" → `/fit-check` |
| Secondary CTA | "Learn Why" → `/why-movemental` |
| Bottom hint | "just answer 6 questions and... ...discover your fit" |

**Visual Notes**:
- Full-height hero with dark gradient (slate-900 → blue-950)
- Radial gradient overlay effect
- Gradient text on headline ("Own your platform")
- Rounded-full CTA buttons with glow shadows

**Intended User Movement**: Take Fit Check (primary) or understand rationale (secondary)

**Alignment Flags**:
- ⚠️ **HIGH TENSION**: "85-90% revenue loss" framing leads with economics, not credibility crisis
- ⚠️ **GENERIC**: "Movement leaders" undefined—could mean fitness influencers, political activists, anyone
- ✅ **GOOD**: Fit Check as primary CTA matches intended funnel
- ⚠️ **MISSING**: No mention of AI crisis, credibility, scenius, formation, network effects, or peer verification

---

### Section 2: Logo Bar (Social Proof)
**File**: `components/homepage/LogoBar.tsx`

| Element | Content |
|---------|---------|
| Tagline | "Trusted by movement leaders who are transforming their communities" |
| Logos | 5 placeholder boxes showing "Logo" |

**Visual Notes**:
- Light background with border top/bottom
- 60% opacity on logo placeholders
- Flex-wrap responsive layout

**Intended User Movement**: Build trust through social proof

**Alignment Flags**:
- 🔴 **BROKEN**: All 5 logos are placeholder text "Logo" - zero social proof value
- ⚠️ **OFF-BRAND**: "transforming their communities" is vague; doesn't specify movemental/missional context
- 🔴 **CREDIBILITY GAP**: A credibility-focused platform showing placeholder logos undermines the core thesis

---

### Section 3: Stats Section
**File**: `components/homepage/StatsSection.tsx`

| Stat | Value | Label | Description |
|------|-------|-------|-------------|
| 1 | 90% | Revenue Retained | vs. 10-15% with traditional publishers |
| 2 | $1K | Platform Cost | vs. $50K-$150K industry standard |
| 3 | 2-4 | Weeks to Launch | vs. 6-12 months traditional timeline |
| 4 | 100% | Ownership | Your platform, your audience, your data |

**Visual Notes**:
- Blue (blue-600) full-width background
- Large typography for stat values
- 4-column grid on desktop, 2x2 on mobile

**Intended User Movement**: Reinforce economic value proposition, reduce perceived risk

**Alignment Flags**:
- ⚠️ **PURELY ECONOMIC**: All 4 stats focus on cost/time/ownership economics
- ❌ **MISSING**: No stats about network reach multiplication (28x-500x), SEO improvement, credibility metrics
- ⚠️ **MISALIGNED**: Core docs emphasize "28x reach multiplication," "85% Page 1 SEO" — none appear here
- ❓ **UNVERIFIABLE**: Stats like "90% revenue" and "$1K" are promises, not demonstrated outcomes

---

### Section 4: Feature Section
**File**: `components/homepage/FeatureSection.tsx`

| Feature | Icon | Description | Link |
|---------|------|-------------|------|
| Complete Publishing Platform | BookOpen | "Books, courses, articles, and multimedia content—all in one integrated platform you own." | `/onboarding` |
| 90% Revenue Retention | DollarSign | "Keep 90% of your revenue instead of losing 85-90% to traditional publishers and digital platforms." | `/pricing` |
| Audience Ownership | Users | "Own your audience data and relationships. Direct communication, no platform intermediaries." | `/what-is-movemental` |
| AI-Powered Content | Sparkles | "AI support tailored to your voice and theology. Create content faster while maintaining authenticity." | `/ai-vision` |
| Network Effects | Globe | "Shared infrastructure creates collective SEO benefits and cross-platform amplification." | `/network` |
| Built-in Analytics | BarChart3 | "Understand your audience with integrated analytics. Track engagement, measure impact." | `/onboarding` |

**Section Header**:
- Eyebrow: "Platform Features"
- Headline: "Everything You Need to **Move**"
- Subhead: "A complete digital publishing infrastructure—content, commerce, community, and analytics—built for movement leaders."

**Visual Notes**:
- 3-column grid on desktop
- Card-based layout with hover effects
- Icon → Title → Description → "Learn more" link pattern

**Intended User Movement**: Explore specific features, understand platform capabilities

**Alignment Flags**:
- ✅ **GOOD**: Network Effects mentioned (finally!)
- ⚠️ **BRIEF**: Network effects get same weight as "Built-in Analytics"—should be more prominent
- ⚠️ **THEOLOGY MENTION**: "voice and theology" in AI feature is good but isolated
- ⚠️ **"MOVE" PUN**: Headline pun "Need to Move" is clever but unclear if intentional brand moment
- ❌ **MISSING**: Peer verification, scenius, credibility network, formation over growth
- ❌ **GENERIC FEATURES**: Most features (publishing, revenue, audience, analytics) describe any SaaS platform

---

### Section 5: Process Steps
**File**: `components/homepage/ProcessSteps.tsx`

| Step | Icon | Title | Description | CTA |
|------|------|-------|-------------|-----|
| 1 | CheckCircle | Check Your Fit | "Take the 60-second Fit Check to discover if Movemental is the right platform for your movement." | "Take Fit Check" → `/fit-check` |
| 2 | Lightbulb | Understand the Problem | "Learn why movement leaders lose 85-90% of their revenue to traditional publishers and rental platforms—and how Movemental changes that equation." | — |
| 3 | Rocket | Launch Your Platform | "In 2-4 weeks, go from fit-confirmed to live platform. Complete digital publishing infrastructure—content, commerce, community—for $1,000 instead of $50K-$150K." | — |

**Section Header**:
- Headline: "From Fit Check to Launch"
- Subhead: "A clear path from discernment to your own digital publishing platform"

**Visual Notes**:
- Dark background (slate-950)
- 3-column grid
- Step number badges in corner
- Cyan accent colors

**Intended User Movement**: Understand the journey, take Fit Check as first step

**Alignment Flags**:
- ✅ **GOOD**: Fit Check positioned as Step 1 (matches intended funnel)
- ⚠️ **REPETITIVE**: "$1,000 instead of $50K-$150K" appears 3rd time on homepage
- ⚠️ **"DISCERNMENT" WORD**: Interesting theological word choice, but doesn't connect to credibility thesis
- ❌ **STEP 2 GAP**: "Understand the Problem" has no CTA—user can't act on it
- ❌ **FRAMING**: "The Problem" = revenue loss, not credibility crisis/AI flood/formation gap

---

### Section 6: CTA Section (Final)
**File**: `components/homepage/CTASection.tsx`

**Left Column (CTA)**:
| Element | Content |
|---------|---------|
| Headline | "Start building your platform." |
| Body | "Take the Fit Check to discover if Movemental is right for you. No trial, no credit card, no risk. Just 60 seconds to clarity." |
| Primary CTA | "Get started for free" → `/fit-check` |

**Right Column (Pricing Accordions)**:
| Tier | Description | Link |
|------|-------------|------|
| Platform Launch | "Complete platform setup for $1,000 + 10% revenue share" | `/pricing#platform-launch` |
| Content Migration | "Bring your existing content into your new platform" | `/pricing#content-migration` |
| Network Membership | "Join the network for collective amplification" | `/pricing#network` |

**Bottom**: 
- Tagline: "Join movement leaders who are transforming their digital presence"
- 5 placeholder "Logo" boxes (duplicate of Section 2)

**Visual Notes**:
- Dark gradient background (slate-900 → purple-950 → slate-900)
- Split layout: CTA left, accordions right
- Expandable accordion pattern for pricing tiers

**Intended User Movement**: Take Fit Check, optionally explore pricing tiers

**Alignment Flags**:
- ✅ **GOOD**: "Network Membership" tier finally mentions "collective amplification"
- 🔴 **BROKEN**: Placeholder logos repeated from Section 2
- ⚠️ **ANCHOR LINK RISK**: `/pricing#platform-launch` etc. may not scroll to correct section (needs verification)
- ⚠️ **"BUILDING YOUR PLATFORM"**: Language implies creation, not capturing existing content (Frame 1 mismatch)
- ❌ **"DIGITAL PRESENCE"**: Generic—could describe any website builder

---

### Section 7: Footer
**File**: `components/homepage/Footer.tsx`

**Columns**:
| Column | Links |
|--------|-------|
| Brand | "Movemental" + tagline: "Complete digital publishing platforms for movement leaders. Own your platform. Keep your revenue." |
| Platform | Fit Check, Why Movemental, How It Works, Pricing |
| Explore | AI Book, Books, Topics, Learn, Search, Network |
| About | About, What Is Movemental, AI Vision, Team |

**Bottom Bar**:
- Copyright: "© 2026 Movemental. All rights reserved."
- Legal: Privacy Policy → `/legal/privacy`, Terms of Service → `/legal/terms`

**Notes**:
- Duplicate of `components/shared/PublicFooter.tsx` with minor differences (dark variant built-in)
- All links verified to exist ✅

---

## 3. Information Architecture & Funnel Analysis

### Primary Funnel (Actual)

```
Homepage → Fit Check → [Results] → Why Movemental → Pricing → Onboarding
```

**Analysis**: The funnel is correctly architected around Fit Check as the qualifying gate. This aligns with the "fit check first" principle from positioning docs.

### Competing Funnels

1. **Direct to Pricing**: Stats Section and Feature Section mention "$1K" and revenue—users may skip Fit Check and go straight to Pricing, bypassing qualification
2. **Content Exploration Path**: "Explore" dropdown offers AI Book, Books, Topics, Learn—users may get lost in content before understanding platform value
3. **Why Movemental as Entry**: Secondary CTA in hero could become primary for skeptical users who need rationale before action

### Top 3 Cognitive Load Issues

1. **Economic Overload**: Price/revenue stats appear 5+ times on homepage. User may feel they're being sold a budget solution rather than invited into a credibility network.

2. **Undefined Audience**: "Movement leaders" is used repeatedly without definition. A pastor, life coach, fitness influencer, and political activist all might consider themselves "movement leaders." The Fit Check qualifies, but homepage doesn't signal who should even start.

3. **Value Proposition Confusion**: Is Movemental:
   - A cheap platform builder? (Stats suggest yes)
   - A credibility network? (Docs say yes, homepage barely mentions)
   - A publishing platform? (Features say yes)
   - A community? (Network Effects suggests yes)
   
   The homepage doesn't establish a clear mental model.

---

## 4. Alignment Flags (Ranked by Severity)

### HIGH Severity

| # | Issue | Why Misaligned | Should Do Instead |
|---|-------|----------------|-------------------|
| 1 | **Credibility thesis absent** | Core positioning is "credibility in the AI age"—homepage doesn't mention AI flood, authenticity crisis, or peer verification | Lead with credibility narrative, not economics |
| 2 | **Scenius concept missing** | "Solo to Scenius" is core Frame 4; collaborative genius is key differentiator | Introduce scenius concept early; position network as the product |
| 3 | **Placeholder logos** | Social proof section shows 5 "Logo" placeholders—credibility platform with fake social proof is ironic | Remove section entirely or populate with real leader photos/endorsements |
| 4 | **Economics-first framing** | "$1K vs $50K" repeated 5+ times positions Movemental as "budget option" | Lead with transformation/credibility; economics should be supporting proof, not headline |
| 5 | **Audience undefined** | "Movement leaders" could mean anyone; intended audience is movemental/missional leaders with decade+ credibility | Add qualifiers: "missional leaders," "church planters," "formation practitioners" |

### MEDIUM Severity

| # | Issue | Why Misaligned | Should Do Instead |
|---|-------|----------------|-------------------|
| 6 | **Network effects buried** | Network amplification (28x-500x reach) is briefly mentioned in features but not quantified | Feature network math prominently—this is the unique value |
| 7 | **Formation vs. growth absent** | Core value "formation over growth" not represented | Include language about depth over virality, transformation over traffic |
| 8 | **"The Problem" misframed** | Process Step 2 frames problem as "revenue loss" not "credibility collapse" | Reframe around AI crisis and invisible expertise |
| 9 | **No human verification narrative** | Peer verification/vouching is central to credibility thesis but unmentioned | Explain how network creates trust AI can't fake |
| 10 | **Missing `/resources` route** | Fit Check non-fit result links to `/resources` which doesn't exist | Create route or update Fit Check result links |

### LOW Severity

| # | Issue | Why Misaligned | Should Do Instead |
|---|-------|----------------|-------------------|
| 11 | **Duplicate navigation components** | `homepage/Navigation.tsx` duplicates `shared/PublicNavigation.tsx` | Consolidate to single component with variant props |
| 12 | **Duplicate footer components** | Same issue as navigation | Consolidate to single component |
| 13 | **Pricing anchor links** | `/pricing#platform-launch` may not work as expected | Verify anchor targets exist on pricing page |
| 14 | **"Building" language** | "Start building your platform" implies creation; Frame 1 is about capturing existing content | Use "Launch" or "Amplify" language |
| 15 | **All client components** | Every homepage section is `'use client'`—no server components | Refactor to server components where possible for performance |

---

## 5. Dependencies & Constraints

### Shared Components Used by Multiple Pages

| Component | Used By | Impact of Changes |
|-----------|---------|-------------------|
| `components/shared/PublicNavigation.tsx` | All `/app/(public)/*` pages | Changes affect entire public site |
| `components/shared/PublicFooter.tsx` | All `/app/(public)/*` pages | Changes affect entire public site |
| `components/ui/button.tsx` | All pages with buttons | shadcn/ui managed—don't modify |
| `components/ui/card.tsx` | Multiple pages | shadcn/ui managed—don't modify |
| `components/ui/dropdown-menu.tsx` | Navigation components | shadcn/ui managed—don't modify |

### Content Sourcing

| Section | Source Type | Notes |
|---------|-------------|-------|
| Hero copy | Hardcoded in component | `DarkHeroSection.tsx` |
| Stats | Hardcoded array | `StatsSection.tsx` lines 19-40 |
| Features | Hardcoded array | `FeatureSection.tsx` lines 31-74 |
| Process steps | Hardcoded array | `ProcessSteps.tsx` lines 31-56 |
| Pricing tiers (CTA) | Hardcoded array | `CTASection.tsx` lines 20-36 |
| Nav items | Hardcoded arrays | Both navigation components |
| Footer links | Hardcoded arrays | Both footer components |
| Logos | Hardcoded placeholder array | `LogoBar.tsx` lines 11-17 |

**Implication**: All homepage content is hardcoded. No CMS, no registry, no external data. Content changes require code changes.

### Missing Routes Referenced from Homepage

| Source | Dead Link | Status |
|--------|-----------|--------|
| `lib/schemas/fit-check.ts` line 269 | `/resources` | 🔴 **Route does not exist** |

### All Other Links Verified

| Route | Status |
|-------|--------|
| `/fit-check` | ✅ Exists |
| `/why-movemental` | ✅ Exists |
| `/how-it-works` | ✅ Exists |
| `/pricing` | ✅ Exists |
| `/onboarding` | ✅ Exists |
| `/what-is-movemental` | ✅ Exists |
| `/ai-vision` | ✅ Exists |
| `/network` | ✅ Exists |
| `/book` | ✅ Exists |
| `/books` | ✅ Exists |
| `/topics` | ✅ Exists |
| `/learn` | ✅ Exists |
| `/search` | ✅ Exists |
| `/about` | ✅ Exists |
| `/team` | ✅ Exists |
| `/legal/privacy` | ✅ Exists |
| `/legal/terms` | ✅ Exists |

---

## 6. Performance & DX Observations

### Client Components Analysis

All homepage components use `'use client'` directive:
- `HomepageContainer.tsx` — Client
- `DarkHeroSection.tsx` — Client
- `LogoBar.tsx` — Client
- `StatsSection.tsx` — Client
- `FeatureSection.tsx` — Client
- `ProcessSteps.tsx` — Client
- `CTASection.tsx` — Client (uses `useState` for accordion)
- `Navigation.tsx` — Client (uses `useState`, `useEffect` for scroll/menu)
- `Footer.tsx` — Client (could be server)

**Impact**: 
- Entire homepage renders client-side
- Increased JavaScript bundle size
- Potential hydration mismatches
- Could affect Core Web Vitals (LCP, CLS)

**Recommendation**: Refactor static sections (`LogoBar`, `StatsSection`, `Footer`) to server components. Only keep client components where interactivity requires it (`Navigation` scroll, `CTASection` accordion).

### Animation/Transition Concerns

| Component | Animation | Concern |
|-----------|-----------|---------|
| `Navigation` | Scroll-triggered background change | Minor—well implemented with `isScrolled` state |
| `FeatureSection` | Hover transitions on cards | None—CSS-only |
| `CTASection` | Accordion expand/collapse | Minor—simple state toggle |
| `DarkHeroSection` | None | None |

**Verdict**: No significant animation performance concerns.

### Bundle Size Considerations

- `lucide-react` icons imported individually (tree-shaking friendly) ✅
- No heavy animation libraries detected ✅
- No obvious large dependencies ✅

---

## 7. Summary Recommendations (For Reference)

This diagnostic does not implement changes but suggests the following areas for alignment work:

1. **Narrative Reframe**: Shift primary positioning from "cheap platform builder" to "credibility network for the AI age"

2. **Introduce Scenius**: Make collaborative genius and peer verification visible in homepage narrative

3. **Define Audience**: Add qualifying language that signals movemental/missional context

4. **Fix Social Proof**: Either remove logo bar or populate with real leader endorsements

5. **Feature Network Math**: Quantify and highlight the 28x-500x reach multiplication

6. **Create `/resources` Route**: Address dead link in Fit Check results

7. **Component Consolidation**: Deduplicate Navigation and Footer components

8. **Performance Optimization**: Convert static sections to server components

---

*This diagnostic reflects the homepage as implemented at time of analysis. All observations are evidence-based from source code inspection.*
