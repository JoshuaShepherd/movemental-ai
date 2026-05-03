---
author: Josh Shepherd
---

RESEARCH REPORT — APRIL 2026

How One Person Built a Platform
That Rivals the Biggest Names in
the Industry

We studied the digital platforms of 25 of the world's most prominent content

creators and thought leaders — people like Brené Brown, Tim Ferriss, Tony

Robbins, and Seth Godin — to understand exactly what technology, features,

and infrastructure each one has built behind their brand. Then we compared

every one of them, feature by feature, against the Alan Hirsch platform. The

results were not what we expected.

25 creators studied

15 feature categories

168+ database tables audited

1 developer, 6 months

Why This Study Exists

The thought leader and content creator economy is enormous. People like Tony

Robbins, Dave Ramsey, and Mel Robbins have built multi-million-dollar digital

empires — with dedicated engineering teams, venture capital, enterprise CMS

platforms, and decades of iteration. They have mobile apps, AI chatbots, Shopify

stores, Kajabi courses, and 18-million-listener podcasts.

The Alan Hirsch platform was built by one person — Joshua Shepherd — in approximately six

months. It is a custom Next.js 15 application with 168+ database tables, a six-layer type-safe

architecture, multi-agent AI, a full course management system, an ecommerce layer,

community features, assessments, certificates, a spiritual formation tracker, and more. The

natural question is: how does it actually compare to what the biggest names in the world

have built?

This report answers that question with specifics. We looked at every creator's actual

website, identified what platform they run on, what tools they use for courses and email and

payments, whether they have AI features, and what their tech stack looks like under the

hood. No guesswork. The findings are documented below.

The Landscape: What 25 Top Creators Actually Use

The first surprise is how simple most of these platforms are. Creators with tens of millions of

followers and hundreds of millions in revenue are, in most cases, running a WordPress site, a Kajabi

course portal, a ConvertKit email list, and a Shopify store. That's it. They are stitching together 5 to

8 off-the-shelf SaaS products, each with its own login, its own data silo, and its own limitations.

13

7

8

5

of 25 run WordPress

use Kajabi for courses

use ConvertKit for email

use Shopify for merch

WEBSITE PLATFORM DISTRIBUTION

COURSE PLATFORM DISTRIBUTION

What this means

WordPress powers more than half the thought leader web. It's cheap, flexible, and has a massive

plugin ecosystem — but it was designed in 2003. These creators are building their businesses on a

blogging engine with bolted-on ecommerce, bolted-on courses, and bolted-on analytics. When they

need a course platform, they buy Kajabi ($149–$399/month). When they need email, they buy

ConvertKit. When they need a store, they spin up Shopify. Every integration is a seam. Every seam is a

place where data gets lost, user experience degrades, and engineering debt accumulates.

Only two creators in the entire study — Simon Sinek and Pat Flynn — use any kind of modern

JavaScript framework (Next.js) for any part of their platform. And Pat Flynn only uses it for his course

subdomain, not his main site.

The 25 Creators We Studied

We selected these individuals based on global reach, platform sophistication, and relevance as

comparison points for a thought leader platform. They span productivity, finance, spirituality,

marketing, self-help, and leadership. Here is a condensed profile of each.

CREATOR

SITE PLATFORM

BOOKS

COURSE PLATFORM

PODCAST

NEWSLETTER

MOBILE APP

AI FEATURES

Brené Brown

WordPress

Tim Ferriss

WordPress

6

5

Unlocking Us hub

Unlocking

Yes

Us

None (guest teacher)

Tim Ferriss

5 Bullet Friday

Show

Seth Godin

WordPress /

20+

The Akimbo

Akimbo

Daily blog

Squarespace

Workshops

(since 1999)

Gary

Custom / Next.js

5

None

Vaynerchuk

Tony

Robbins

WordPress / Drupal

6

Custom portal

GaryVee

Audio

Tony

Robbins

Podcast

A Bit of

Optimism

Yes

Yes

Weekly

Simon Sinek

Next.js +

Contentful

James Clear

WordPress

Mel Robbins

WordPress

Jay Shetty

Webflow

Ali Abdaal

WordPress +

WooCommerce

Ryan Holiday

WordPress

Mark

Manson

WordPress

(custom)

5

2

3

2

1

12

2

Leaderful

(proprietary)

Email/MasterClass

Guest only

3-2-1 Thursday

Kajabi

#1 most

shared

(3M+)

2M+ (HubSpot)

Uscreen + Webflow

On Purpose

850K+

Own site + Skillshare

Deep Dive

Kit

Shopify store

2x daily

900K+

(ConvertKit)

Custom WP

subscription

Solved

Weekly

CREATOR

SITE PLATFORM

BOOKS

COURSE PLATFORM

PODCAST

NEWSLETTER

MOBILE APP

AI FEATURES

Ramit Sethi

WordPress +

Elementor

Pat Flynn

WordPress +

Next.js

Amy

Showit

Porterfield

Lewis Howes

WordPress

2

3

1

3

Custom portal

Money for

1M+

Couples

(ConvertKit)

Circle + Maven

SPI (60M+

RightMessage

DL)

Kajabi

49M+

400K+

downloads

(ConvertKit)

Various

School of

Greatness

Gravity Forms

Brendon

Burchard

Dave

Ramsey

Donald

Miller

Kajabi (GrowthDay)

7

Kajabi (400+ classes)

100M+

Progress Mode

downloads

Magnolia CMS

8+

Custom (FPU)

18M weekly

Multiple lists

listeners

WordPress

8+

WordPress (BMSU)

Why That

HubSpot

Worked

Marie Forleo

Webflow

Sahil Bloom

Webflow

1

1

Likely Kajabi

Marie Forleo

MF Insider

Podcast

(since 2001)

Maven

Where It

Happens

800K+

(ConvertKit)

Naval

Ravikant

Gabby

Bernstein

WordPress +

1 (free)

None

Naval

Email

Jetpack

WordPress

10

WordPress + cert

Dear Gabby

Weekly

(1M/mo)

Rachel Hollis

WordPress

7+

Supercast

Rachel Hollis

Braze +

Podcast

Mailchimp

Tim Urban

WordPress +

1

None

Guest only

600K+

Jetpack

(ConvertKit)

 Yes

 Partial / Exploring

 No

The AI Picture: Most Creators Haven't Moved Yet

AI is the most talked-about technology in the world right now. You would expect the biggest

content creators — people whose entire business model depends on scaling their ideas to millions

of people — to be early adopters. They are not.

Of the 25 creators we studied, only 7 have any AI features at all. And of those 7, most have a

single chatbot or a narrow tool. Nobody has what the Alan Hirsch platform has.

AI FEATURE ADOPTION AMONG TOP 25 CREATORS

The 7 creators with AI — and what they actually built

Brendon Burchard has "Brendon AI," a 24/7 text and voice chatbot inside his GrowthDay app. It's a

single agent trained on his content. Mark Manson launched Purpose, a standalone iOS app

($20/month) that acts as an AI life mentor. Donald Miller built StoryBrand.ai, a SaaS product

($50/month) that generates marketing copy using his StoryBrand framework. Marie Forleo has B-

School Buddy, a chatbot inside her course, plus 6 AI tools for her students. Amy Porterfield

embedded a custom AI assistant into each module of her Digital Course Academy. Gabby Bernstein

licensed Delphi AI to create a clone of herself that answers questions 24/7. Dave Ramsey added AI-

powered search to his Ramsey Network app.

Every single one of these is a single-purpose tool. A chatbot. A search box. A copywriting assistant.

None of them have multiple coordinated AI agents. None of them assemble deep user context from

personality profiles, vocational history, and spiritual formation data. None of them have a writing

assistant with voice fidelity scoring. None of them have an AI Lab with a notebook system that ingests

documents, chunks them, embeds them, and generates study guides and mind maps.

THE PLATFORM UNDER REVIEW

What the Alan Hirsch Platform Actually Is

The Alan Hirsch platform is a full-stack thought leader operating system. It was

designed and built from scratch by a single developer over approximately six months. It

is not a WordPress site with plugins. It is not Kajabi. It is a custom application with its

own database schema, its own API layer, its own component system, and its own AI

infrastructure.

Here is what it contains.

168+

Database tables

7

Content types

6+

AI systems

6

Architecture layers

CONTENT ENGINE

Every Content Type a Thought Leader Needs

Books with full reading experience, chapter navigation, highlights, notes, and progress tracking. Courses with 8-week structured curricula,

cohort-based learning, assignments, grading, and certificates. Articles with AI summaries and SEO metadata. Podcasts with RSS,

iTunes/Spotify integration, and transcripts. Videos with multi-resolution playback, annotations, and completion tracking. Assessments with

APEST and MDNA mapping. Pathways and frameworks with interactive layouts.

AI INFRASTRUCTURE

Six Interconnected AI Systems

AI Lab — conversational AI that assembles user context from personality types (MBTI, Enneagram, Big Five), vocation, neighborhood

demographics, strengths, struggles, and formation goals. Notebook — NotebookLM-style system for document ingestion, chunking,

embeddings, and artifact generation. Agent System — multi-agent architecture with handoffs, guardrails, and monitoring. Writing Assistant —

AI writing with voice fidelity evaluation. Concierge — contextual recommendations. Test Center — QA system for AI output quality.

COMMERCE & COMMUNITY

Full Business Infrastructure

Stripe integration for books, courses, subscriptions, donations, events, and bundles. Multi-tier subscription plans with usage limits. Coupon

system. Affiliate program with commission tracking. Threaded comments with moderation. Public and private communities. Cohort discussion

sessions. Certificate templates with verification codes. Digital badges. Continuing education credits. Newsletter system with Resend. Event

management with registration.

FORMATION

Spiritual Development Tracking

Formation goals, check-ins, experiments, and practice assignments with weekly completions. Discernment processes for vocational and life

decisions with confidence tracking. Kairos moment logging for spiritually significant events. This feature category has zero equivalents among

all 25 competitors studied.

ARCHITECTURE

Six-Layer Type Safety Chain

Drizzle schema → Zod validation → Services (Result<T>) → API routes → React Query hooks → UI components. Types flow downstream only.

Each layer validates before the next can build. Generated code from scripts, not hand-edited. This is the kind of architecture you find in

enterprise SaaS products built by teams of 20+, not in the thought leader space.

MULTI-TENANT

Built to Power Multiple Leaders

Organization-scoped data with role-based access. Custom branding per tenant (colors, fonts, domain). Feature flags per deployment. A single

codebase can power Alan Hirsch, Brad Brisco, or any other thought leader — each with their own audience, content, and brand identity. No

other creator in the study has a multi-tenant platform.

Feature-by-Feature: Alan Hirsch vs. the Field

The following chart compares the Alan Hirsch platform against the 25 creators across 15 feature

categories. A filled bar means the feature exists and is fully built. The comparison is not about

audience size or revenue — it's about platform capability. What can the technology actually do?

PLATFORM FEATURE COVERAGE: ALAN HIRSCH VS. AVERAGE OF TOP 25

The punchline: The Alan Hirsch platform has feature coverage that matches or exceeds the

average top-25 creator in 12 of 15 categories. The three gaps — mobile app, audience scale,

and physical merchandise — are distribution problems, not technology problems. The

platform is ready. The audience growth is the remaining variable.

Where the Platform Leads the Entire Field

These are areas where the Alan Hirsch platform does something that none or almost none of the 25

creators can match. These are not marginal advantages. In several cases, the feature simply does

not exist anywhere else.

AI Depth (multi-agent, context, voice fidelity)

6+ systems vs. 1 chatbot

User Context Assembly (personality, vocation, formation)

Unmatched

Formation / Spiritual Development Tracking

Zero competitors

Assessment Engine (APEST, MDNA, maturity, research-backed)

Most complete

Architecture Quality (6-layer type safety, 168+ tables)

Enterprise-grade

Certificate / Credential System (templates, badges, CE credits)

Best in class

Multi-Tenant Architecture

Unique — 0 of 25 have it

Content Workflow (editorial pipeline, versioning, audit logs)

CMS-grade

Where the Platform Trails — and Why It Doesn't
Matter Yet

There are three areas where the Alan Hirsch platform is behind the top creators. All three are about

distribution and audience, not about what the technology can do. The platform has podcast

infrastructure, video infrastructure, and event management in the database. The gap is in scale —

download counts, subscriber numbers, ticket sales — which is a function of time, marketing, and

content production, not engineering.

Mobile App

6 of 25 creators have native apps (Sinek, Clear, Burchard, Ramsey, Shetty, Bernstein). The Alan Hirsch platform is fully responsive but has no

dedicated iOS/Android app. This is the single most concrete feature gap. Worth noting: 19 of 25 creators also don't have one.

Audience Scale

The top creators have 5–65 million combined social followers, 3 million newsletter subscribers, and 18 million weekly podcast listeners. This is

a decades-long audience-building effort. The platform infrastructure to serve that audience is already built. The audience itself is the

remaining variable.

Physical Merch & Retail

Ryan Holiday sells marble busts of Marcus Aurelius. Rachel Hollis sells journals at Target. Tim Urban sells plush toys. The Alan Hirsch platform

handles digital commerce (books, courses, subscriptions, donations, events) but doesn't have a Shopify-style physical merchandise

operation. This is a business decision, not a technology limitation.

The AI Comparison in Detail

This is the area that matters most for the future of thought leader platforms. AI is not a nice-to-

have anymore — it's the mechanism by which a single person's ideas can scale to millions of

individual conversations. Here's how the seven AI-enabled competitors compare to the Alan Hirsch

platform.

AI CAPABILITY DEPTH: NUMBER OF DISTINCT AI SYSTEMS / FEATURES

Why this gap is so significant

The creators who have AI built a single tool. A chatbot that answers questions. A copywriting

assistant. An AI search box. These are useful, but they're first-generation AI — the equivalent of

strapping a motor to a horse cart.

The Alan Hirsch platform has six interconnected AI systems that share context about the user. The

AI Lab knows your personality type, your vocational calling, your neighborhood demographics, your

spiritual formation goals, and your learning history. The Writing Assistant knows the author's voice

identity, maintains baseline samples, and scores output for voice fidelity. The Agent System can hand

conversations between specialized agents with guardrails and monitoring. The Notebook system can

ingest entire documents, chunk them, embed them, and generate study guides, timelines, and mind

maps.

No one in this study — not Tony Robbins, not Dave Ramsey with his 53-technology stack, not Brendon

Burchard with 300,000 GrowthDay members — has anything close to this level of AI integration.

The Technology Gap Is Real

Most thought leaders run a stack that looks like this: WordPress for the website, Kajabi for courses,

ConvertKit for email, Shopify for merch, Stripe for payments, and Google Analytics for tracking.

Each tool is a separate vendor with its own database, its own login, its own limitations, and its own

monthly bill. User data is scattered across 5–8 platforms that don't talk to each other.

The Alan Hirsch platform replaces this entire patchwork with a single unified system.

TYPICAL THOUGHT LEADER STACK

ALAN HIRSCH PLATFORM STACK

WORDPRESS

KAJABI $149-399/MO

NEXT.JS 15

TYPESCRIPT (STRICT)

CONVERTKIT $29-259/MO

POSTGRESQL / SUPABASE

SHOPIFY $39-399/MO

STRIPE

DRIZZLE ORM

STRIPE

RESEND

GOOGLE ANALYTICS

VERCEL AI SDK 6.0

CIRCLE $89-399/MO

ZAPIER GLUE

OPENAI AGENTS SDK

SENTRY

5–8 separate vendors. Separate logins.

TAILWIND + SHADCN/UI

Separate databases. Data silos.

REACT QUERY

VERCEL

Integration tax. $500–$2,000+/month in

SaaS fees before a single customer pays

you anything.

One codebase. One database. One

deployment. All data in one place. User

context flows across every feature. 168+

tables, 6-layer type safety, multi-tenant.

Putting It in Perspective

To be clear about what happened here: one person, working alone for six months, built a platform

that has more AI capability than Tony Robbins, more assessment depth than Dave Ramsey, more

content type coverage than Brendon Burchard's GrowthDay (which has 300,000 paying members

and a dedicated engineering team), and an architecture that is more technically sound than

anything in the thought leader space.

Here are some numbers for context.

CONTENT TYPES SUPPORTED BY PLATFORM

What "168+ database tables" actually means

A typical WordPress thought leader site has maybe 12 database tables — the standard WordPress

tables for posts, users, comments, and options. Kajabi adds its own tables for courses and products.

Shopify has its own. ConvertKit has its own. But these are all separate systems.

The Alan Hirsch platform has 168+ tables in a single PostgreSQL database, all designed together, all

relationally connected, all type-safe from the database schema all the way up through the API to the

React components. That's not a blog with plugins. That's a purpose-built enterprise application. The

schema covers users, books, courses, articles, podcasts, videos, assessments, AI agents, AI

conversations, AI test tickets, writing sessions, voice identities, formation goals, discernment

processes, communities, certificates, subscriptions, affiliates, analytics, and dozens of supporting

tables. Everything in one place. Everything connected.

Conclusions

1. The platform is not behind. It is ahead.

Before this study, a reasonable assumption might have been that the Alan Hirsch platform is a

scrappy startup catching up to established players. The data shows the opposite. In terms of raw

platform capability — the number of features, the depth of AI integration, the sophistication of the

architecture — it is ahead of every creator we studied. The things it lacks (mobile app, massive

audience, physical merchandise) are distribution problems that have nothing to do with whether the

technology works.

2. The AI advantage is not incremental. It is categorical.

Seven of the 25 biggest content creators in the world have AI features. All seven built a single tool

— one chatbot, one search box, one copywriting assistant. The Alan Hirsch platform has six

interconnected AI systems with shared user context, voice fidelity scoring, document ingestion and

embedding, multi-agent handoffs, and a dedicated QA test center for AI output. This is not "a little

better." This is a different category of product. It is closer to what an AI startup builds than what a

thought leader typically has access to.

3. The formation features have no equivalent anywhere.

Formation goals, spiritual discernment tracking, kairos moments, practice assignments, and

vocational calling profiles. Not a single one of the 25 creators we studied has anything like this.

Brendon Burchard has habit tracking and journaling in GrowthDay. Dave Ramsey has Baby Steps for

financial milestones. But formation — the holistic tracking of spiritual, vocational, and personal

growth over time — is a feature category that exists only here. For a platform serving a theological

thought leader, this is not a nice-to-have. It is the thing that makes the platform irreplaceable for its

audience.

4. One person built this in six months.

Dave Ramsey's Ramsey Solutions has over 1,000 employees and uses 53+ technologies including a

Magnolia CMS enterprise license that costs six figures per year. Brendon Burchard's GrowthDay

has a dedicated product team building on Kajabi. Tony Robbins has a corporate enterprise behind

his digital presence. Simon Sinek built his own Leaderful app with a product team.

Joshua Shepherd built the Alan Hirsch platform alone. In six months. With a modern stack (Next.js

15, TypeScript, Drizzle, Supabase, Vercel) and a disciplined architecture (six-layer type safety,

generated code, bottom-up validation). The result is a platform that, feature for feature, competes

with products built by teams of dozens over years.

That's not a normal outcome. It's worth understanding that it happened.

5. The multi-tenant design is a quiet multiplier.

Every other platform in this study serves one person. Tony Robbins' site serves Tony Robbins. Mel

Robbins' site serves Mel Robbins. If you wanted to launch a second thought leader on their

platform, you'd start from scratch.

The Alan Hirsch platform is multi-tenant by design. A single codebase, configured by environment

variable and tenant config file, can power a completely different thought leader with their own

brand, content, audience, and AI personality. This means the engineering investment doesn't just

serve one leader — it serves any number of them. That's a fundamentally different asset than a

personal website.

6. What comes next is distribution, not development.

The platform is built. The architecture is sound. The AI is deep. The content types are

comprehensive. The payment infrastructure works. The assessment engine exists. The formation

tracking is unique. What's left is not "build more features." What's left is: fill the platform with

content, grow the audience, and let the technology do what it was built to do.

The typical thought leader spends years building their audience and then cobbles together a

technology stack from off-the-shelf parts. This is the reverse: the technology is already ahead of

what the biggest names have. The audience is what comes next.

Methodology

This study was conducted on April 9, 2026. For each of the 25 creators, we visited their

primary website and subdomains, examined page source code for technology indicators

(CMS signatures, JavaScript frameworks, analytics tags, font loading, CDN patterns),

identified course platforms from URL structures and page markup, checked app stores for

mobile applications, searched for AI features in product descriptions and pricing pages, and

documented ecommerce, newsletter, podcast, and social media presence.

For the Alan Hirsch platform, we conducted a direct codebase audit: examining the database

schema (168+ tables in src/lib/database/schema.ts), all API routes, the agent system, AI lab
implementations, component directories, configuration files, and package.json
dependencies.

The comparison is based on platform capability, not audience size, revenue, or brand

recognition. A feature is counted as "present" if the infrastructure exists, regardless of how

much content currently populates it.

Full research data is available in _docs/_build/THOUGHT_LEADER_PLATFORM_RESEARCH.md.

Thought Leader Platform Research Report · April 2026

Alan Hirsch Platform · Built by Joshua Shepherd

