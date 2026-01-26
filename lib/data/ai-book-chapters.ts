/**
 * AI Book Chapter Data
 * 
 * This file contains all chapter metadata and content for the Movemental AI Book.
 * The book follows a five-part structure: Crisis → Framework → Practice → Boundaries → Long Arc
 * 
 * In production, this would be fetched from a CMS or markdown files.
 */

export interface BookChapter {
  id: string
  number: number
  title: string
  slug: string
  partNumber: number
  partTitle: string
  description: string
  readingTime: number
  content: string
}

export interface BookPart {
  number: number
  title: string
  description: string
  chapters: BookChapter[]
}

// Part I: The Crisis We're In
const PART_1_CHAPTERS: BookChapter[] = [
  {
    id: 'chapter-01',
    number: 1,
    title: 'The Credibility Collapse',
    slug: 'the-credibility-collapse',
    partNumber: 1,
    partTitle: 'The Crisis We\'re In',
    description: 'How AI-generated content is breaking traditional credibility signals and creating a trust collapse.',
    readingTime: 15,
    content: `I want to start by acknowledging something that might feel uncomfortable: if you're reading this, you've probably already felt it. That moment when you read something online and wondered, "Is this real? Did a person actually write this, or was this generated?"

You're not alone in that uncertainty. Studies show that 68% of internet users now struggle to tell the difference between human-created and AI-generated content. That's not a small number. That's most of us.

Here's what I want you to know: your uncertainty is valid. The signals we used to rely on—the volume of someone's work, the polish of their presentation, their consistent online presence—these don't mean what they used to mean. AI can replicate all of them. And that creates a real problem for leaders like you who have something genuine to offer.

## The Flood We're Swimming In

Let me give you some numbers that might surprise you. As of 2025, somewhere between 40% and 60% of the content you encounter online involves AI assistance or generation. That's not a prediction about the future. That's where we are right now.

Think about what that means. When you search for information about church planting, discipleship, missional theology, or any topic you care about—roughly half of what you find was created by machines, not people. Some of it is helpful. Some of it is accurate. But all of it raises a question: How do you know what's real?

## When Volume Doesn't Mean Anything

There was a time—not that long ago, really—when the amount of content someone produced told you something about their expertise. If someone had written dozens of articles, published multiple books, maintained a blog for years, you could reasonably assume they knew what they were talking about. Volume suggested depth. Consistency suggested commitment.

But here's what's changed: AI can now produce that same volume in a fraction of the time. A single person with access to AI tools can generate more content in a week than most writers produce in a year.

## The Trust Collapse

All of this—the flood of AI-generated content, the breakdown of credibility signals, the difficulty distinguishing real from artificial—it's creating what researchers call a "trust collapse." People are becoming skeptical of everything online, not because they're cynical, but because they can't tell what's real anymore.

This trust collapse affects everyone, but it affects movement leaders in particular ways. Your expertise is hard-won. Your credibility is relational. Your voice is distinctive. But in an AI-saturated world, all of that becomes harder to establish and maintain.

## A Word of Encouragement

I know this chapter has been heavy. But here's what's also true: your expertise is still valuable. Your voice is still distinctive. Your commitment is still meaningful. The work you've done, the learning you've invested in, the wisdom you've developed—none of that has lost its value.

What's changed is how that value gets recognized. And that's actually an opportunity, if we can figure out how to navigate it well.`
  },
  {
    id: 'chapter-02',
    number: 2,
    title: 'AI as Both Problem and Solution',
    slug: 'ai-as-both-problem-and-solution',
    partNumber: 1,
    partTitle: 'The Crisis We\'re In',
    description: 'Understanding the tension of using the tool that created the problem—and why there\'s a way forward.',
    readingTime: 14,
    content: `I want to start this chapter by acknowledging something that might feel confusing: we just spent a whole chapter talking about how AI is creating a credibility crisis. And now I'm going to tell you that AI is also part of the solution.

That might sound contradictory. It might even sound like I'm trying to have it both ways. But here's what I want you to understand: this isn't about contradiction. This is about complexity. And learning to navigate complexity well is part of what it means to lead in this moment.

## The Problem AI Creates

Let's start by being honest about the problem. AI can generate infinite content on any topic. It can produce articles, books, social media posts, emails, sermons—you name it. And it can do it quickly, consistently, and at scale.

This creates what we might call the "infinite content problem." When anyone can generate unlimited amounts of content on any topic, the internet becomes flooded with material. Some of it's helpful. Some of it's accurate. But much of it is just noise.

## The Solution AI Provides

But here's the thing: AI is also providing tools that can help us navigate this crisis. AI can amplify your voice. It can help you communicate more clearly, more consistently, more effectively. It can help you reach more people, engage more deeply, multiply your impact.

But here's the key: it amplifies your voice. It doesn't replace it.

Think about it like this: if you're a pastor who preaches on Sunday, AI can help you turn that sermon into a blog post, a social media series, a newsletter article. But the message is still yours. The voice is still yours. The expertise is still yours.

## The Tension We're Navigating

Here's where it gets complicated: we're being asked to use the tool that created the problem. On one hand, ignoring AI isn't realistic. On the other hand, uncritical adoption is dangerous.

So we're in this tension: we need to engage with AI, but we need to do it thoughtfully. We need to use it, but we need to use it in ways that preserve and amplify our authentic voice, not replace it.

## Finding the Way Forward

The goal isn't to have AI do everything. The goal is to have AI handle what it does well—structure, formatting, variation—so you can focus on what only you can do—insight, story, depth, credibility.

There's a way forward that honors both the opportunities and the challenges of this moment. And that's what we're going to explore together.`
  },
  {
    id: 'chapter-03',
    number: 3,
    title: 'Why Movement Leaders Were Right to Ignore SEO',
    slug: 'why-movement-leaders-were-right-to-ignore-seo',
    partNumber: 1,
    partTitle: 'The Crisis We\'re In',
    description: 'Your instincts were correct—but the landscape has changed. Understanding the new reality of discoverability.',
    readingTime: 16,
    content: `I want to start this chapter by saying something that might surprise you: if you're a movement leader who has ignored SEO, who has rejected metrics-driven content, who has refused to optimize for algorithms—you were right to do that.

Your instincts were correct. The old model of SEO and metrics-driven content was fundamentally misaligned with what movement leaders are called to do. But here's the thing: something has changed.

## The Old Model: Why You Were Right to Reject It

The old model was extractive—designed to get attention, not to serve people. It was individualistic—about building your own platform, not building together. It was shallow—optimizing for what algorithms could measure, not for transformation. It was dependent—making you beholden to platforms and algorithms.

You were right to reject it.

## What Changed: The New Reality

But we're not in the old model anymore. The credibility crisis changed everything. Network verification became essential. AI changed the game. Platform ownership became possible.

The new model isn't about SEO anymore. It's about credibility infrastructure. It's not about metrics. It's about network verification. It's not about algorithms. It's about human relationships.

## Why This Moment Is Different

The old model was: Optimize for algorithms → Get traffic → Build platform → Extract value.

The new model is: Build credibility infrastructure → Create network verification → Enable discovery → Amplify impact.

These are fundamentally different. And the new landscape actually aligns with what movement leaders are called to do.

## The Credibility Infrastructure Framework

Credibility infrastructure means building the technical and relational systems that make your expertise visible, verifiable, and discoverable—without compromising what makes your work movemental.

This includes ownership, substance, networks, and transparency. The goal isn't to optimize for algorithms. The goal is to build credibility infrastructure that makes your expertise discoverable and verifiable.`
  },
]

// Part II: The Framework
const PART_2_CHAPTERS: BookChapter[] = [
  {
    id: 'chapter-04',
    number: 4,
    title: 'AI as Amplification, Not Replacement',
    slug: 'ai-as-amplification-not-replacement',
    partNumber: 2,
    partTitle: 'The Framework',
    description: 'The foundational principle that guides everything else—how AI enhances rather than replaces your voice.',
    readingTime: 12,
    content: `This chapter establishes the foundational principle that guides everything else: AI as amplification, not replacement.

## What Amplification Means

Amplification means using AI to make your voice louder, clearer, more discoverable, more effective—without losing what makes it yours.

- Enhance: Make your communication clearer and more effective
- Preserve: Maintain what makes your voice distinctive
- Multiply: Reach more people with your authentic message

## What Replacement Would Mean

Replacement means using AI to do things instead of you, in ways that erode your voice, undermine your credibility, or replace what only you can do.

The goal is amplification, not replacement. And the way you get there is by being intentional about what AI does and what you do.

## The Human Voice Remains Primary

Your unique insight, your personal story, your theological depth, your earned credibility—these are things AI cannot provide. They come from you, from your experience, from your formation, from your humanity.

AI handles logistics. You provide the soul.`
  },
  {
    id: 'chapter-05',
    number: 5,
    title: 'Voice Preservation as Priority',
    slug: 'voice-preservation-as-priority',
    partNumber: 2,
    partTitle: 'The Framework',
    description: 'Why your voice matters more than efficiency, and how to preserve it while gaining both.',
    readingTime: 13,
    content: `Voice preservation is more important than efficiency. Your voice is your most valuable asset—it's what makes your work distinctive, trustworthy, valuable.

## Why Voice Matters More Than Efficiency

In a world where AI can generate infinite content, the thing that makes your work valuable isn't quantity—it's distinctiveness. Your voice is what distinguishes your work from AI-generated content. It's what makes people trust you. It's what creates relationship.

## How AI Can Preserve Authentic Voice

AI can be trained on your existing work to understand your style, your patterns, your way of thinking. Specialized agents can learn your voice and help you maintain it across different formats and contexts.

## How AI Can Destroy Authentic Voice

Generic AI tools tend toward homogenization. They produce content that sounds like everyone else. And when you use generic tools without careful oversight, your distinctive voice can be lost.

## The Technical and Ethical Commitment

Voice preservation requires both technical implementation (specialized agents, training corpus) and ethical commitment (prioritizing voice over efficiency, maintaining oversight).`
  },
  {
    id: 'chapter-06',
    number: 6,
    title: 'Scenius as the Credibility Solution',
    slug: 'scenius-as-the-credibility-solution',
    partNumber: 2,
    partTitle: 'The Framework',
    description: 'How network verification through human relationships creates credibility AI can\'t fake.',
    readingTime: 15,
    content: `Scenius—collaborative genius that emerges from networks of relationships—is the credibility solution for the AI age.

## What Scenius Means

Scenius is the collective intelligence that emerges when creative people work in proximity, influencing and inspiring each other. It's the genius of the scene, not the individual.

In the context of credibility, scenius means: your credibility is established through your network relationships, not through individual metrics.

## Why Scenius Creates Credibility AI Can't Fake

AI can generate individual content. It can create the appearance of expertise. But it can't easily create genuine network relationships. It can't participate in scenius.

When your credibility is established through networks—through mutual vouching, through collaborative work, through shared intellectual lineage—it's verified by humans. And that's something AI can't easily replicate.

## Network Verification Through Human Relationships

Network verification means: your credibility is established not by your own claims, but by your relationships with other credible voices. When other trusted people vouch for you, reference your work, collaborate with you—that creates credibility that's hard to fake.

## Emergent Authority Through Lateral Networks

In the old model, authority came from vertical credentials: degrees, institutional positions, publication records. In the new model, authority emerges through lateral networks: relationships, collaborations, mutual influence.`
  },
  {
    id: 'chapter-07',
    number: 7,
    title: 'Transparency, Disclosure, and Trust',
    slug: 'transparency-disclosure-and-trust',
    partNumber: 2,
    partTitle: 'The Framework',
    description: 'Why honest disclosure about AI usage actually builds credibility in an untrustworthy environment.',
    readingTime: 11,
    content: `In a world where trust is fragile, transparency is foundational. Honest disclosure about AI usage builds trust, not undermines it.

## Why Transparency Is Foundational

People want to know what's real. They're tired of being deceived, of wondering whether what they're reading is human or AI. When you're transparent about how you use AI, you're showing them what's real.

## The Credibility Advantage of Transparency

Counter-intuitively, being transparent about AI usage actually builds credibility. It shows you have nothing to hide. It demonstrates integrity. It creates trust through honesty.

## Disclosure Frameworks and Practices

Transparency requires practical frameworks:
- Disclose when AI assists in content creation
- Be clear about what's human and what's AI-assisted
- Maintain honesty about your process
- Create trust through consistency

## Trust Through Honesty

In an environment where trust is fragile, honesty becomes a competitive advantage. When you're honest about AI usage, you stand out. You become trustworthy. You build relationship.`
  },
  {
    id: 'chapter-08',
    number: 8,
    title: 'Theological Integrity as Non-Negotiable',
    slug: 'theological-integrity-as-non-negotiable',
    partNumber: 2,
    partTitle: 'The Framework',
    description: 'For Christian leaders, theological accuracy in AI-assisted content is essential, not optional.',
    readingTime: 12,
    content: `For Christian movement leaders, theological integrity isn't optional. It's non-negotiable. AI assistance must align with movemental theology.

## Why Theological Accuracy Matters

Theology shapes how people understand God, Scripture, faith, and life. Inaccurate theology can lead people astray. And AI can generate theological content that sounds good but isn't accurate.

## AI Assistance Must Align with Movemental Theology

AI tools don't have theological convictions. They generate content based on patterns. Without human oversight, AI can produce content that's theologically problematic.

That's why AI assistance must be guided by theological frameworks. The human leader maintains theological oversight. AI assists within those boundaries.

## The Role of Human Oversight and Verification

Human oversight is essential for theological content. Every piece of theological content should be reviewed by someone with theological training and conviction. AI assists, but humans verify.

## What Happens When Theological Integrity Is Compromised

When theological integrity is compromised, people are harmed. They're led astray. They're given false information about God and faith. And the leader's credibility is destroyed.

That's why theological integrity is non-negotiable. It's not about being rigid. It's about serving people well.`
  },
]

// Part III: The Practice
const PART_3_CHAPTERS: BookChapter[] = [
  {
    id: 'chapter-09',
    number: 9,
    title: 'Agents as Assistants, Archivists, and Translators',
    slug: 'agents-as-assistants-archivists-translators',
    partNumber: 3,
    partTitle: 'The Practice',
    description: 'Understanding what AI agents are (specialized tools) and what they\'re not (synthetic personalities).',
    readingTime: 13,
    content: `AI agents are specialized tools designed for specific functions. They're not synthetic personalities. They're not autonomous creators. They're assistants.

## What AI Agents Are

AI agents are specialized tools trained for specific functions:
- **Assistants**: Help with structure, expansion, variation
- **Archivists**: Preserve and organize your existing knowledge
- **Translators**: Adapt content for different audiences and contexts

## What Agents Are NOT

Agents are not:
- Synthetic personalities pretending to be human
- Autonomous creators operating without oversight
- Replacements for human judgment and insight
- Independent voices with their own perspective

## How Agents Serve Movement Leaders

Agents serve by handling logistics: structuring content, expanding ideas, creating variations, adapting for different contexts. This frees you to focus on what only you can do.

## The Key Distinction

The key distinction is between tools and personalities. AI agents are tools—sophisticated, specialized, useful—but still tools. They serve your purpose. They don't have their own.`
  },
  {
    id: 'chapter-10',
    number: 10,
    title: 'The 70/30 Rule',
    slug: 'the-70-30-rule',
    partNumber: 3,
    partTitle: 'The Practice',
    description: 'A practical framework for AI efficiency with human refinement—70% AI draft, 30% your soul.',
    readingTime: 14,
    content: `The 70/30 rule is a practical framework for balancing AI efficiency with human authenticity.

## What the 70/30 Rule Means

70% AI draft, 30% your refinement. AI handles the logistics—structure, formatting, variation, expansion. You provide the insight, the voice, the credibility, the soul.

This isn't a rigid formula. It's a principle for maintaining balance.

## What AI Does Well

AI is good at:
- Structure: Organizing ideas, creating outlines
- Expansion: Developing points, adding detail
- Variation: Creating different versions
- Formatting: Making things look good

## What You Provide

You provide:
- Unique insight: Your perspective and experience
- Personal story: Your journey and formation
- Earned credibility: Your expertise and track record
- Theological depth: Your understanding and conviction
- Voice and soul: What makes you you

## The Sustainable Content Creation Model

With the 70/30 rule, you can create sustainable content in about 5 hours per week. AI handles logistics. You provide insight and refinement. The result is authentic, efficient content creation.`
  },
  {
    id: 'chapter-11',
    number: 11,
    title: 'The Spectrum of AI Involvement',
    slug: 'the-spectrum-of-ai-involvement',
    partNumber: 3,
    partTitle: 'The Practice',
    description: 'Understanding the different levels of AI assistance—from light editing to full draft generation.',
    readingTime: 11,
    content: `AI involvement exists on a spectrum. Understanding where different tasks fall on that spectrum helps you use AI appropriately.

## The Spectrum

From minimal to maximum AI involvement:

1. **Light editing**: Grammar, clarity, polish
2. **Structure assistance**: Outlines, organization
3. **Expansion**: Developing points you've outlined
4. **Adaptation**: Converting content between formats
5. **Draft generation**: Creating initial drafts from prompts

## Where Different Tasks Fall

Different tasks appropriately fall at different points on the spectrum:
- Personal stories: Minimal AI
- Theological teaching: Light AI with heavy oversight
- Administrative content: More AI assistance appropriate
- Adaptations: Significant AI assistance with human refinement

## The Key Principle

The key principle is intentionality. Know where each task falls on the spectrum. Use AI appropriately for each. Maintain oversight throughout.`
  },
  {
    id: 'chapter-12',
    number: 12,
    title: 'Domains of AI Usage',
    slug: 'domains-of-ai-usage',
    partNumber: 3,
    partTitle: 'The Practice',
    description: 'Different areas of ministry have different AI appropriateness—understanding the boundaries.',
    readingTime: 12,
    content: `Different domains of ministry have different levels of AI appropriateness. Understanding these domains helps you use AI well.

## High AI Appropriateness

Areas where AI can help significantly:
- Administrative content
- Logistics and scheduling
- Content adaptation and formatting
- Research and organization

## Moderate AI Appropriateness (with oversight)

Areas where AI helps but requires careful oversight:
- Teaching content development
- Resource creation
- Communication drafts
- Content expansion

## Low AI Appropriateness

Areas where human presence is essential:
- Personal pastoral care
- Formation and discipleship relationships
- Theological decision-making
- Crisis response

## The Guiding Principle

The guiding principle is: the more relational and formational the work, the less appropriate AI becomes. AI serves logistics. Humans serve relationships.`
  },
  {
    id: 'chapter-13',
    number: 13,
    title: 'Synthesizing AI Usage',
    slug: 'synthesizing-ai-usage',
    partNumber: 3,
    partTitle: 'The Practice',
    description: 'Bringing together the frameworks into a coherent approach for your specific context.',
    readingTime: 10,
    content: `This chapter brings together the frameworks we've explored into a coherent approach you can apply to your specific context.

## The Integrated Framework

1. **Principle**: AI as amplification, not replacement
2. **Priority**: Voice preservation over efficiency
3. **Method**: The 70/30 rule
4. **Boundaries**: Domain-appropriate usage
5. **Foundation**: Transparency and theological integrity

## Applying to Your Context

Every movement leader's context is different. Your specific ministry, your audience, your theological tradition, your communication style—all of these shape how you apply these frameworks.

The key is intentionality. Know what you're doing and why. Maintain oversight. Preserve what matters.

## The Practical Workflow

1. Create content with your insight and voice
2. Use AI to structure, expand, adapt
3. Review and refine everything
4. Maintain theological and voice integrity
5. Be transparent about the process`
  },
]

// Part IV: The Boundaries
const PART_4_CHAPTERS: BookChapter[] = [
  {
    id: 'chapter-14',
    number: 14,
    title: 'Personalization and Context as Required',
    slug: 'personalization-and-context-as-required',
    partNumber: 4,
    partTitle: 'The Boundaries',
    description: 'Why generic AI tools fail for formation-oriented work—and what to use instead.',
    readingTime: 12,
    content: `Generic AI tools fail for formation-oriented work. You need specialized agents that understand your context.

## Why Generic AI Tools Fail

Generic AI tools:
- Don't understand your theological framework
- Can't maintain your voice consistently
- Don't know your ministry context
- Produce homogenized content

## The Danger of General-Purpose AI for Theological Content

General-purpose AI is trained on the internet. It doesn't have theological convictions. It can generate content that sounds theological but isn't accurate to your tradition or conviction.

## Specialized Agents for Movemental Work

Specialized agents can be trained on:
- Your existing content
- Your theological framework
- Your voice and style
- Your ministry context

This creates AI assistance that actually serves your specific work.

## Context-Aware Assistance

The goal is AI that understands your context: your ministry, your audience, your theological position, your communication style. This requires personalization, not generic tools.`
  },
  {
    id: 'chapter-15',
    number: 15,
    title: 'Voice Emulation: Writing vs. Conversation',
    slug: 'voice-emulation-writing-vs-conversation',
    partNumber: 4,
    partTitle: 'The Boundaries',
    description: 'The important distinction between AI helping you write and AI pretending to be you.',
    readingTime: 11,
    content: `There's an important distinction between voice emulation in writing and voice emulation in conversation.

## Voice Emulation in Writing

In writing, voice emulation means: AI learns your style, your patterns, your way of expressing ideas—and helps you write more efficiently while maintaining your voice.

This serves you. It helps you communicate your ideas. It preserves your authentic voice while gaining efficiency.

## Voice Emulation in Conversation

In conversation, voice emulation means: AI responds to people as if it were you.

This is much more problematic. It creates the impression of relationship where there isn't one. It can be deceptive.

## When Voice Emulation Serves vs. When It Deceives

The key distinction is: Does the person know they're interacting with AI?

When AI helps you write, the content is still from you. When AI pretends to be you in conversation, it's deceptive.

## The Boundaries of Authentic Voice Emulation

AI can help you write in your voice. It should not pretend to be you. The person receiving the content should know what's human and what's AI-assisted.`
  },
  {
    id: 'chapter-16',
    number: 16,
    title: 'What Churches Must Refuse',
    slug: 'what-churches-must-refuse',
    partNumber: 4,
    partTitle: 'The Boundaries',
    description: 'Clear boundaries on what churches and movements should never do with AI.',
    readingTime: 14,
    content: `There are things churches and movements must refuse to do with AI. Not because AI is bad, but because some things require human presence, human judgment, human relationship.

## The Refusals

1. **Fully automated content publishing**: Content generated and published without human oversight
2. **AI-generated content without human review**: No human verification before publishing
3. **Voice replacement**: Using AI to sound like someone else
4. **Theological content without human verification**: Theological teaching without human oversight
5. **Deceptive practices**: Presenting AI content as fully human
6. **Formation work without human presence**: Discipleship without relationship

## Why These Refusals Matter

These refusals protect what's sacred:
- Human agency and judgment
- Voice and distinctiveness
- Theological integrity
- Formation and transformation
- Trust and credibility

## What These Refusals Protect

These aren't restrictions. They're protections. They protect what makes ministry ministry. They preserve what serves transformation. They honor what's sacred.`
  },
  {
    id: 'chapter-17',
    number: 17,
    title: 'What They Are Ethically Free to Do',
    slug: 'what-they-are-ethically-free-to-do',
    partNumber: 4,
    partTitle: 'The Boundaries',
    description: 'The opportunities—what churches and movements can and should embrace with AI.',
    readingTime: 13,
    content: `Having established what must be refused, let's explore what churches and movements are ethically free—or even obligated—to do with AI.

## The Freedoms

Churches and movements are free to:
1. **Use AI for amplification**: Structure, expansion, efficiency
2. **Preserve voice while gaining efficiency**: The 70/30 rule
3. **Build network credibility through scenius**: Leverage AI for connection
4. **Be transparent about AI usage**: Build trust through honesty
5. **Use specialized agents for specific functions**: Context-aware assistance
6. **Create sustainable content creation workflows**: Efficient, authentic content

## Why These Are Freedoms

These aren't compromises. They're opportunities. AI can serve ministry when used well. It can amplify impact, multiply reach, sustain leaders.

## The Obligation

In some cases, using AI well isn't just permitted—it's obligated. When AI can help you serve more people, reach more effectively, sustain your ministry—refusing to use it might be poor stewardship.

## The Key Distinction

The key distinction is: Does AI serve the mission, or does it compromise it? Use AI when it serves. Refuse when it compromises.`
  },
  {
    id: 'chapter-18',
    number: 18,
    title: 'Why Embodied Leadership Cannot Be Automated',
    slug: 'why-embodied-leadership-cannot-be-automated',
    partNumber: 4,
    partTitle: 'The Boundaries',
    description: 'The non-negotiable of human presence in formation, and what AI can never replace.',
    readingTime: 12,
    content: `Embodied leadership cannot be automated. This is the fundamental boundary that shapes everything else.

## What Embodied Leadership Means

Embodied leadership means:
- Presence: Being physically present with people
- Relationship: Knowing and being known
- Formation: The slow work of transformation through relationship
- Witness: Living what you teach

## Why AI Cannot Replace Embodied Presence

AI can generate content. It can manage logistics. It can help with communication. But it cannot:
- Be present with people
- Know them and be known
- Walk with them through suffering
- Model what transformation looks like

## The Limits of Digital Formation

Digital content can support formation. It can provide resources, teaching, frameworks. But formation itself happens in relationship, in presence, in embodied community.

## When AI Serves Embodied Leadership

AI serves embodied leadership when it frees leaders for presence. When it handles logistics so leaders can be with people. When it amplifies teaching so leaders can focus on relationship.

## The Non-Negotiable

The non-negotiable is: human presence in formation. AI can support it. AI cannot replace it. And when we try to replace it, we're not doing ministry anymore.`
  },
]

// Part V: The Long Arc
const PART_5_CHAPTERS: BookChapter[] = [
  {
    id: 'chapter-19',
    number: 19,
    title: 'Gutenberg to Networks of Trust',
    slug: 'gutenberg-to-networks-of-trust',
    partNumber: 5,
    partTitle: 'The Long Arc',
    description: 'The historical progression of communication technology and what it means for credibility.',
    readingTime: 14,
    content: `Understanding where we are requires understanding how we got here. The history of communication technology shapes the present moment.

## The Historical Progression

1. **Gutenberg**: Democratized access to text. Suddenly anyone could read, not just elites.
2. **Mass Media**: Centralized gatekeeping. Broadcast from few to many.
3. **Digital Disruption**: Decentralized access, fragmented credibility. Anyone can publish.
4. **AI**: The credibility crisis. Infinite content, broken signals.
5. **Networks of Trust**: The emerging solution. Credibility through relationship.

## What Each Era Changed

Each era changed how credibility works:
- Gutenberg: Credibility through literacy
- Mass Media: Credibility through gatekeepers
- Digital: Credibility through metrics
- AI: Credibility crisis
- Networks: Credibility through scenius

## The Future of Credibility

The future isn't a return to gatekeepers. It's not individual metrics. It's networks of trust—credibility verified through human relationships that AI can't easily fake.

This is where we're headed. And movement leaders are well-positioned to thrive in this environment.`
  },
  {
    id: 'chapter-20',
    number: 20,
    title: 'Static Publishing vs. Networked Credibility',
    slug: 'static-publishing-vs-networked-credibility',
    partNumber: 5,
    partTitle: 'The Long Arc',
    description: 'Why isolated content fails in the AI age, and how networked credibility creates sustainable authority.',
    readingTime: 11,
    content: `The difference between static publishing and networked credibility is fundamental to understanding the future.

## Static Publishing

Static publishing is:
- One-way communication
- Isolated content
- Individual authority
- Fixed and unchanging

This model is failing. Individual content, isolated from networks, can't establish credibility in an AI-saturated world.

## Networked Credibility

Networked credibility is:
- Interconnected content
- Verified through relationships
- Collective authority
- Dynamic and evolving

This model is emerging. Credibility established through networks is harder to fake and more sustainable.

## Why Static Publishing Fails in the AI Age

AI can create infinite static content. It can generate articles, books, websites that look credible. But it can't create genuine network relationships.

When your credibility depends on static content alone, you're competing with AI. When your credibility depends on networks, you have something AI can't replicate.

## The Shift from Individual to Scenius

The shift is from individual authority to collective credibility. From standing alone to being embedded in networks. From competing with AI to leveraging what AI can't do.`
  },
  {
    id: 'chapter-21',
    number: 21,
    title: 'Content That Moves',
    slug: 'content-that-moves',
    partNumber: 5,
    partTitle: 'The Long Arc',
    description: 'The ethical shift from content that manipulates to content that transforms—and why it matters.',
    readingTime: 13,
    content: `Content that moves is different from content that manipulates. And understanding that difference matters.

## What "Content That Moves" Means

Content that moves:
- Catalyzes transformation, not just engagement
- Serves formation, not just information
- Creates movement, not just metrics
- Serves people, not just platforms

## Transformation, Not Just Engagement

Engagement isn't bad. Metrics aren't wrong. But when they're the goal, content becomes manipulative. When transformation is the goal, content becomes movemental.

## Why This Is an Ethical Shift

This is about what we're serving. Content that moves serves people. Content that manipulates serves platforms. And we're called to serve people.

## How AI Can Serve Movemental Content

AI serves movemental content when:
- It amplifies voice and insight that serves transformation
- It handles logistics so leaders can focus on formation
- It creates resources that support movement
- It multiplies impact while preserving authenticity

## The Call

The call is to create content that moves—content that serves transformation, that catalyzes change, that builds movement. And AI, used well, can help us do that more effectively than ever before.

This is the vision. This is the goal. This is what we're building toward.`
  },
]

// Combine all chapters
export const ALL_CHAPTERS: BookChapter[] = [
  ...PART_1_CHAPTERS,
  ...PART_2_CHAPTERS,
  ...PART_3_CHAPTERS,
  ...PART_4_CHAPTERS,
  ...PART_5_CHAPTERS,
]

// Book parts structure
export const BOOK_PARTS: BookPart[] = [
  {
    number: 1,
    title: 'The Crisis We\'re In',
    description: 'Understanding the credibility collapse in an AI-saturated world.',
    chapters: PART_1_CHAPTERS,
  },
  {
    number: 2,
    title: 'The Framework',
    description: 'Principles for navigating AI as a movement leader.',
    chapters: PART_2_CHAPTERS,
  },
  {
    number: 3,
    title: 'The Practice',
    description: 'Practical approaches for using AI well.',
    chapters: PART_3_CHAPTERS,
  },
  {
    number: 4,
    title: 'The Boundaries',
    description: 'What to embrace and what to refuse.',
    chapters: PART_4_CHAPTERS,
  },
  {
    number: 5,
    title: 'The Long Arc',
    description: 'The future of credibility and content that moves.',
    chapters: PART_5_CHAPTERS,
  },
]

// Book metadata
export const BOOK_METADATA = {
  title: 'The Movemental AI Book',
  subtitle: 'Navigating Credibility, AI, and Movement Leadership',
  description: 'A comprehensive guide for movement leaders navigating the AI age—preserving voice, building credibility through networks, and creating content that transforms.',
  totalChapters: ALL_CHAPTERS.length,
  totalReadingTime: ALL_CHAPTERS.reduce((sum, ch) => sum + ch.readingTime, 0),
  author: 'Movemental',
}

// Helper functions
export function getChapterById(id: string): BookChapter | undefined {
  return ALL_CHAPTERS.find(ch => ch.id === id)
}

export function getChapterBySlug(slug: string): BookChapter | undefined {
  return ALL_CHAPTERS.find(ch => ch.slug === slug)
}

export function getChapterByNumber(number: number): BookChapter | undefined {
  return ALL_CHAPTERS.find(ch => ch.number === number)
}

export function getAdjacentChapters(currentNumber: number): { prev?: BookChapter; next?: BookChapter } {
  const currentIndex = ALL_CHAPTERS.findIndex(ch => ch.number === currentNumber)
  return {
    prev: currentIndex > 0 ? ALL_CHAPTERS[currentIndex - 1] : undefined,
    next: currentIndex < ALL_CHAPTERS.length - 1 ? ALL_CHAPTERS[currentIndex + 1] : undefined,
  }
}

export function getPartForChapter(chapterNumber: number): BookPart | undefined {
  return BOOK_PARTS.find(part => 
    part.chapters.some(ch => ch.number === chapterNumber)
  )
}
