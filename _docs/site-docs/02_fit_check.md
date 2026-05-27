# Fit Check / Self-Screen

> **The Fit Check (public name: Self-Screen) as a first-class structural component**

**Version**: 1.1.0  
**Last Updated**: February 2026

**Implementation note**: The public-facing name is **Self-Screen**. The flow is a single question with multiple-select options. Context can be **Individual** or **Organization** (switcher on landing). Three pathways: **Full Fit** (create account), **Content No Movement** (publish content but not in our niche), **Affinity** (care for them, communicate focus). Route remains `/fit-check`.

---

## Purpose of the Fit Check

The Fit Check is the first structural component visitors encounter. Its purpose is to determine whether a visitor is the right person for Movemental.ai before they invest time understanding the platform.

**The Fit Check is not a marketing tool.** It is a filtering mechanism. It exists to exclude non-fits as much as to include fits.

---

## What It Protects

### Users

The Fit Check protects users from investing time and energy in a platform that won't serve them. It answers the question: "Am I the right person for this?" before the user commits to understanding the platform.

**Benefit**: Users who are not a fit can exit early, saving time and avoiding frustration.

### Founders

The Fit Check protects founders from managing expectations of users who are not a fit. It filters out visitors who would require extensive support, customization, or explanation that the platform cannot provide.

**Benefit**: Founders can focus on serving the right users rather than managing misaligned expectations.

### Credibility

The Fit Check protects Movemental's credibility by ensuring that only the right users engage with the platform. Misaligned users create negative experiences, support burden, and diluted messaging.

**Benefit**: The platform maintains its credibility by serving the right users well, rather than serving all users poorly.

---

## High-Level Description of How It Works

### The Process (No UI Details)

1. **Visitor arrives** → Fit Check is the first or near-first encounter
2. **Questions are presented** → Questions assess fit across relevant dimensions
3. **Responses are evaluated** → Evaluation determines fit status
4. **Path is determined** → Fit → proceed; Non-fit → exit or alternative path

### What It Assesses

The Fit Check assesses dimensions relevant to Movemental's purpose, specifically for **movemental leaders** (movement thought leaders who catalyze lasting change through incarnational theology and movement practice):

- **Movement Alignment & Theological Depth** → Alignment with missional/incarnational theology and movemental practice
- **Audience Size & Engagement** → Platform reach and audience quality (typically 3K-25K+ engaged followers)
- **Content Quality & Consistency** → Demonstrated ability to produce valuable, consistent content
- **Revenue Potential & Business Readiness** → Ability to generate revenue through content, courses, speaking, consulting
- **Platform Ownership Mindset** → Understanding of ownership vs. rental model, willingness to own digital presence
- **Network Value & Collaboration Potential** → Connections to movement networks, potential for cross-promotion and collaboration

**Note**: The current Self-Screen uses a single multi-select question (recognition options), not a numeric score. Core fit is defined by three options: (1) movement leader / movement-oriented org, (2) mDNA alignment, (3) creates/publishes content. **Full Fit** = any 2 of those 3. Other options do not exclude from fit. Content No Movement = exactly one core (e.g. content only). Affinity = no core selected.

### Outcomes

- **Fit Confirmed** → Visitor proceeds to "Why Movemental" and onboarding path
- **Non-Fit** → Visitor is directed to alternative resources or exits
- **Uncertain** → Visitor is given additional context or directed to learn more

---

## Why Exclusion is a Feature, Not a Bug

### The Counterintuitive Truth

Most websites try to include everyone. Movemental intentionally excludes non-fits. This exclusion is not a failure—it is a feature.

### Why Exclusion Works

**Better service for fits.** By excluding non-fits, Movemental can focus resources on serving the right users well.

**Clearer messaging.** The platform can speak directly to its intended audience without diluting the message for broader appeal.

**Reduced support burden.** Non-fits create support requests, feature requests, and expectations that the platform cannot meet.

**Maintained credibility.** A platform that serves its intended users well maintains credibility. A platform that tries to serve everyone serves no one well.

### How Exclusion Manifests

The Fit Check excludes non-fits by:

1. **Asking direct questions** → Questions that non-fits cannot answer affirmatively
2. **Providing clear outcomes** → Non-fits understand they are not a fit
3. **Offering alternatives** → Non-fits are directed to resources that might serve them
4. **Respecting time** → Non-fits exit early rather than investing time in something that won't serve them

---

## Structural Position

### Where It Lives

The Fit Check is the **first structural component** visitors encounter. It may be:
- A dedicated page (e.g., `/fit-check`)
- An interstitial before the homepage
- The primary entry point for new visitors

**It is not optional.** It is a required structural component.

### Relationship to Other Components

- **Before**: Nothing (or minimal context)
- **After**: Why Movemental (if fit confirmed) or exit/alternatives (if non-fit)

The Fit Check gates access to the deeper understanding of the platform. Visitors who pass the Fit Check are ready to understand "Why Movemental." Visitors who do not pass are not ready and should not proceed.

---

## Implementation Notes

### What This Document Does Not Specify

- Full scoring algorithms or multi-dimensional point systems (e.g. 100-point scale)
- UI/UX design of the Fit Check
- Exact question wording beyond the core rule below

### What This Document Does Specify

- **Core fit rule**: **Full Fit** = any 2 of 3 core options: (1) movement leader / movement-oriented org, (2) mDNA alignment, (3) creates/publishes content. Content No Movement = exactly one core. Affinity = no core selected.
- The Fit Check is a first-class structural component
- It must be encountered early in the visitor journey
- It must assess fit across relevant dimensions
- It must provide clear outcomes (fit/non-fit)
- Exclusion is intentional and beneficial

---

## Summary

The Fit Check is a first-class structural component that:

- **Protects** users, founders, and credibility
- **Filters** visitors to ensure only fits proceed
- **Excludes** non-fits intentionally and beneficially
- **Gates** access to deeper understanding of the platform

It is the first component visitors encounter because it determines whether they should proceed. It is not a marketing tool—it is a filtering mechanism that serves everyone better by serving the right people well.

---

**Next**: Read [03_why_movemental_longform.md](./03_why_movemental_longform.md) to understand the canonical long-form "Why Movemental" page.
