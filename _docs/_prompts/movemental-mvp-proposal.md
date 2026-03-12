# Movemental.ai — The Lean MVP Proposal

**Date:** March 2026  
**Context:** Based on the current state of the `movemental-ai` repository, adjacent projects (`movemental-dashboard`, `ai-lab-agent`, author nodes like `alan-hirsch`), and the core philosophy (Scenius, credibility graph, "done-with-you" service).

**The Premise:** Movemental.ai is not a mass-market, self-serve SaaS DIY website builder. It is an exclusive, highly curated credibility network (capped at 100 movement leaders) that operates on a $1,000 build fee + 10% revenue share model. The MVP must ruthlessly cut SaaS-like bloat to focus on high-fidelity onboarding, the Scenius graph, and premium author platforms.

---

## 1. What to Cut (The "We Don't Need This For MVP" List)

1. **DIY Templates & Themes (`app/templates/*`)**
   - **Why cut:** Leaders are paying $1,000 for a "Platform Build" and a 3-4 week agency-style onboarding where we migrate their content. They do not need to choose between 8 different pricing page templates or 5 hero variants. 
   - **MVP Action:** Standardize on **one** best-in-class, premium design system for the author's platform (the "Node"). Delete or archive the template switcher and all its variants from the core repo. 

2. **Self-Serve Provisioning & Complex Auth**
   - **Why cut:** Since onboarding involves a high-touch 4-phase process (Discovery → Research → Architecture → Launch), the `/fit-check` is a lead qualification tool, not an automatic DB provisioning trigger.
   - **MVP Action:** The Fit Check should end in an intake form that alerts the Movemental team. We do not need a fully automated "Sign Up -> Enter Credit Card -> Spin up Vercel instance" pipeline for MVP. That can be done manually for the first 10-25 leaders.

3. **Multiple "How It Works" & "Why" Pages**
   - **Why cut:** It fragments the narrative and complicates maintenance.
   - **MVP Action:** Commit to the canonical `/how-it-works` and `/why-movemental`. Archive `-new` and `-final` routes. Merge the best diagrams (e.g., Content Pipeline, Playbook) into the canonical pages.

4. **Rich Text Authoring Dashboard (for the Author)**
   - **Why cut:** The MVP promise is extracting their *existing* work (books, sermons) into a living system via AI. The Movemental team handles the heavy lifting of ingestion and architecture.
   - **MVP Action:** The author dashboard (`movemental-dashboard`) should focus strictly on **Network visibility** (who is linking to them, who they are linking to) and **Analytics/Revenue**, rather than being a full Notion-clone CMS. We can manage content via Supabase directly or a simple internal CMS for the first cohort.

---

## 2. The MVP Scope (What We Actually Need)

The MVP is composed of three interconnected systems:

### System A: The Public Marketing Site (`movemental-ai`)
The glossy, high-conversion front door for prospective movement leaders.
- **Homepage (`/`)**: High-impact, credibility-first narrative.
- **Why Movemental (`/why-movemental`)**: The core philosophy (Content that moves, the Credibility Crisis, Scenius).
- **How It Works (`/how-it-works`)**: The canonical 3-4 week process, the playbook, and AI's exact role (Ai assists / Humans retain).
- **Pricing (`/pricing`)**: Clear explanation of the $1,000 + 10% model and "The Math That Changes Everything".
- **Self-Screen (`/fit-check`)**: The multi-select triage to filter for full-fit leaders, dumping qualified leads into a database/CRM.
- **The Roster (`/team` & `/network`)**: Visible proof of the stewards and the current (small but growing) network.

### System B: The Author's "Node" (e.g., `alan-hirsch`)
The actual deliverable the leader pays for. A Next.js platform deployed for them.
- **A Single Premium Design**: Beautiful typography, stark contrast, professional imagery.
- **Evergreen Content Hub**: Their sermons, notes, and past books distilled into readable, SEO-optimized articles.
- **The Graph (Scenius Integration)**: An automated or easily managed module that shows "Who points to me" and "Who I point to" (outbound/inbound links to the other 99 leaders).
- **Capture & Monetization**: Built-in email capture and pathways for courses/books to justify the 10% revenue share.

### System C: The Back-Office / AI Ingestion (`ai-lab-agent` & Supabase)
How the Movemental team actually fulfills the promise efficiently behind the scenes.
- **The AI Pipeline**: Scripts to ingest a leader's raw corpus (PDFs, transcripts), map it to their Core Themes, and output JSON/Markdown for their Node.
- **Central Registry (Supabase)**: A unified database of all Movemental authors, their core topics, and the edges (links) between them. This is what powers the Scenius graph.
- **Internal Dashboard**: A simple admin panel for the Movemental team to provision new authors, trigger deployments, and manage the central network graph.

## 3. The 30-Day Execution Plan

1. **Prune the codebase**: Delete all template variants, alternate narrative pages, and extraneous UI components from `movemental-ai`.
2. **Solidify the Public Flow**: Ensure `/fit-check` properly captures leads to Supabase or email, instead of dead-ending.
3. **Establish the "Gold Standard" Node**: Use the `alan-hirsch` repo as the definitive template. Perfect its design system, make it easily forkable, and wire it up to the central Supabase registry for cross-linking.
4. **Build the AI Ingestion Script**: Polish the internal tools to take a raw PDF and turn it into 10 evergreen articles formatted for the Gold Standard Node.
5. **Launch the Network**: Go live with the first 2-3 leaders (e.g., Alan, Brad), visually representing the edges between them on the main marketing site.
