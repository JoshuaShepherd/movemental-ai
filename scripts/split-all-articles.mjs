import fs from 'fs';
import path from 'path';

const content = fs.readFileSync('docs/articles/chunk.md', 'utf8');
const allLines = content.split('\n');

const outBase = 'docs/claude-articles-new';
const movDir = path.join(outBase, 'movemental');
const joshDir = path.join(outBase, 'joshshepherd');

fs.mkdirSync(movDir, { recursive: true });
fs.mkdirSync(joshDir, { recursive: true });

// Item definitions with metadata and line bounds
const items = [
  // 1: Josh origin
  {
    num: 1,
    title: "I Asked It About Wisdom on the First Day",
    slug: "01-i-asked-it-about-wisdom-on-the-first-day",
    dest: "joshshepherd",
    author: "Joshua Shepherd",
    start: 106,
    end: 300,
    desc: "How a digital marketer at a construction chemicals company asked ChatGPT about wisdom on day one, built an OSHA trainer for his best friend, and realized context matters more than capability."
  },
  // 2: What I've built
  {
    num: 2,
    title: "What I've Built: Grounding AI in Verified Human Work",
    slug: "01-what-ive-built",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 301,
    end: 544,
    desc: "The complete story of building the Movemental engine: reversing fragmentation for Alan Hirsch, spatial neighborhood intelligence for Brad Brisco, and a hundred hours of training for Youthfront."
  },
  // 3: Two people
  {
    num: 3,
    title: "I Started with Two People, Not a Product",
    slug: "02-i-started-with-two-people-not-a-product",
    dest: "joshshepherd",
    author: "Joshua Shepherd",
    start: 545,
    end: 696,
    desc: "Why Movemental began by solving two concrete problems for Alan Hirsch and Youthfront rather than targeting a generalized market."
  },
  // 4: Shrewd as serpents
  {
    num: 4,
    title: "Shrewd as Serpents: The Dual Command for Church Leaders Facing AI",
    slug: "02-shrewd-as-serpents",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 697,
    end: 890,
    desc: "Why innocence without shrewdness is negligence disguised as piety—and what Jesus's command in Matthew 10:16 means for church leaders deciding their AI posture."
  },
  // 5: What shrewdness looks like
  {
    num: 5,
    title: "What Shrewdness Actually Looks Like: A Field Guide for Churches",
    slug: "03-what-shrewdness-looks-like",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 891,
    end: 1108,
    desc: "Concrete guidance for church leaders on AI: what a shrewd leader knows, what a church does, what it refuses, and a 90-day execution plan."
  },
  // 6: How It Actually Works
  {
    num: 6,
    title: "How It Actually Works: The Four Moves of Network Credibility",
    slug: "04-how-it-actually-works",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 1109,
    end: 1214,
    desc: "How Movemental moves from a single grounded platform to a 100-node network that AI search and retrieval engines recognize as authoritative."
  },
  // 7: The Talk
  {
    num: 7,
    title: "Movemental: A Human Network for the Age of AI",
    slug: "05-a-human-network-for-the-age-of-ai",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 1215,
    end: 1323,
    desc: "The keynote address on why Movemental exists: fragmentation as the deeper wound, the perils of Babel vs the promise of Pentecost, scenius, and why formation requires community."
  },
  // 8: Three-Minute Narrative
  {
    num: 8,
    title: "The Movemental Path: Three-Minute Narrative",
    slug: "06-the-movemental-path-three-minute-narrative",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 1324,
    end: 1373,
    desc: "The conveyor-belt logic of Movemental's four stages: Safety, Sandbox, Skills, Solutions—and why credibility is the product for faith and mission organizations."
  },
  // 9: Problem Stories
  {
    num: 9,
    title: "22 Problem Stories: Without AI vs. With AI",
    slug: "07-twenty-two-problem-stories",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 1374,
    end: 1468,
    desc: "Twenty-two real-world institutional and authorial friction points—what happens, what it costs, and the difference between facing it without AI versus with deliberate AI systems."
  },
  // 10: Youthfront
  {
    num: 10,
    title: "Youthfront Case Study: Deciding Before the Bad Day",
    slug: "08-case-study-youthfront-deciding-before-the-bad-day",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 1469,
    end: 1596,
    desc: "How a youth ministry nonprofit tackled unsupervised AI usage with a clear safety guidebook, a bounded sandbox, and a hundred hours of in-person training across ten teams."
  },
  // 11: Twelve Case Studies
  {
    num: 11,
    title: "Twelve Case Studies: Technical Architecture & System Refusals",
    slug: "09-twelve-technical-case-studies",
    dest: "movemental",
    author: "Movemental, LLC",
    start: 1597,
    end: 1902,
    desc: "Twelve structured engineering and governance case studies covering book ingestion gates, durable serverless orchestration, voiceprint checking, and the headless multi-tenant engine."
  },
  // 12: Four Windows
  {
    num: 12,
    title: "Four Windows: Four People the Old System Can't See",
    slug: "10-four-windows-four-people-the-system-cant-see",
    dest: "movemental",
    author: "Movemental, LLC",
    start: 1903,
    end: 2612,
    desc: "Four composite portraits illustrating how the legacy publishing and academic system leaves faithful practitioners unseen—and how the open, verified Movemental network restores them."
  },
  // 13: Newsletter 001
  {
    num: 13,
    title: "Newsletter Issue 001: I Was Wrong About People for Three Years",
    slug: "03-newsletter-issue-001",
    dest: "joshshepherd",
    author: "Joshua Shepherd",
    start: 2613,
    end: 2669,
    desc: "Why three years of free AI demonstrations produced astonishment but almost zero adoption—and why that wasn't a character flaw, but the front edge of a hard adoption curve."
  },
  // 14: A letter to those saying yes
  {
    num: 14,
    title: "A Letter to Those Who Are Saying Yes",
    slug: "11-a-letter-to-those-who-are-saying-yes",
    dest: "movemental",
    author: "Joshua Shepherd, Alan Hirsch, Brad Brisco",
    start: 2670,
    end: 2736,
    desc: "Written commitment to newly joining Movement Voices: the covenant, the four-week remediation, what we will do, and what we permanently refuse."
  },
  // 15: Movemental Origin & Trajectory
  {
    num: 15,
    title: "Movemental: Origin & Trajectory",
    slug: "12-movemental-origin-and-trajectory",
    dest: "movemental",
    author: "Movemental, LLC",
    start: 2737,
    end: 2803,
    desc: "The founding genesis, team composition, mission, and 3-year strategic horizon of Movemental."
  },
  // 16: Josh Shepherd Full Bio
  {
    num: 16,
    title: "Josh Shepherd: Full Biography",
    slug: "04-josh-shepherd-full-bio",
    dest: "joshshepherd",
    author: "Joshua Shepherd",
    start: 2804,
    end: 2962,
    desc: "Comprehensive biographical background: bilingual community leadership in Kansas City, digital marketing, AI engineering, and founding Movemental."
  },
  // 17: The thing broken is wholeness
  {
    num: 17,
    title: "The Thing That Is Broken Is Wholeness: Fragmentation as the Root Problem",
    slug: "13-the-thing-that-is-broken-is-wholeness",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 2963,
    end: 3100,
    desc: "The philosophical thesis under Movemental: why information fragmentation destroys institutional memory and how AI without grounding accelerates the breakdown."
  },
  // 18: Is there a life behind the words
  {
    num: 18,
    title: "Is There a Life Behind the Words? Authorship in the Age of AI",
    slug: "14-is-there-a-life-behind-the-words",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 3101,
    end: 3270,
    desc: "On the covenant between writer and reader, embodied presence, and the moral requirement that thoughts be lived before they are published."
  },
  // 19: For Dave, before we talk
  {
    num: 19,
    title: "For Dave, Before We Talk: The Strategic Foundation",
    slug: "15-for-dave-before-we-talk",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 3271,
    end: 3416,
    desc: "Executive memo outlining the Movemental network thesis, economics, governance, and relational multiplication for senior movement leaders."
  },
  // 21: What changes at 25
  {
    num: 21,
    title: "What Changes at Twenty-Five: Scale and Relational Density",
    slug: "16-what-changes-at-twenty-five",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 3695,
    end: 3892,
    desc: "Reflections on network threshold dynamics, why relational density changes at 25 voices, and managing scale without losing intimacy."
  },
  // 23: Always Be Building Scenii
  {
    num: 23,
    title: "Always Be Building Scenii: Concept Memo No. 01",
    slug: "17-always-be-building-scenii",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 4135,
    end: 4250,
    desc: "Concept memo applying Brian Eno's concept of scenius to Christian movements and digital intellectual ecosystems."
  },
  // 25: Meet Hold Show Send
  {
    num: 25,
    title: "Meet · Hold · Show · Send: The Content Playbook",
    slug: "18-meet-hold-show-send-content-playbook",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 4361,
    end: 5054,
    desc: "The comprehensive pedagogical playbook for structuring missional and transformative content online across four movements."
  },
  // 26: Content strategy for movement leaders
  {
    num: 26,
    title: "Content Strategy for Movement Leaders",
    slug: "19-content-strategy-for-movement-leaders",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 5055,
    end: 5250,
    desc: "Strategic guide for practitioners transitioning from book-centric obscurity to network-visible digital authority."
  },
  // 27: The context method
  {
    num: 27,
    title: "The Context Method: Beyond Prompt Engineering",
    slug: "20-the-context-method",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 5251,
    end: 5611,
    desc: "Why capability is ubiquitous but context is rare: the methodology of structuring deep institutional and authorial context for AI systems."
  },
  // 28: The Evergreen Engine
  {
    num: 28,
    title: "The Evergreen Engine: Architecture for Enduring Content",
    slug: "21-the-evergreen-engine-generalized",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 5612,
    end: 7665,
    desc: "The definitive architecture for transforming a 30-year publishing corpus into an evergreen, citable, AI-navigable digital library."
  },
  // 30: Everything your platform can do
  {
    num: 30,
    title: "Everything Your Platform Can Do: Creator Studio Guide",
    slug: "22-everything-your-platform-can-do",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 8904,
    end: 9127,
    desc: "Comprehensive functional walkthrough of the Movemental Creator Studio for authors, fellows, and editors."
  },
  // 31: Twenty rules
  {
    num: 31,
    title: "Twenty Rules: Linking, Credibility, and Launch",
    slug: "23-twenty-rules-linking-credibility-launch",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 9128,
    end: 9297,
    desc: "Ten positive practices and ten strict refusals for maintaining digital credibility, reciprocal linking, and clean web authority."
  },
  // 33: The house guide
  {
    num: 33,
    title: "The House Guide: How to Write for joshshepherd.ai",
    slug: "05-the-house-guide-how-to-write-for-joshshepherd",
    dest: "joshshepherd",
    author: "Joshua Shepherd",
    start: 9961,
    end: 10405,
    desc: "Voice conventions, stylistic cadences, rhetorical constraints, and tone principles for writing on joshshepherd.ai."
  },
  // 34: Where these numbers come from
  {
    num: 34,
    title: "Where These Numbers Come From: The ReNeighbor Sources",
    slug: "24-where-these-numbers-come-from-reneighbor",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 10406,
    end: 10842,
    desc: "Full methodology, data sources, and analytical rigor backing the demographic and spatial findings in ReNeighbor."
  },
  // 35: The post publish playbook
  {
    num: 35,
    title: "The Post-Publish SEO and GEO Playbook",
    slug: "25-post-publish-seo-geo-playbook",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 10843,
    end: 11023,
    desc: "Disciplines and schema requirements for ensuring published work is understood and accurately retrieved by AI generative engines."
  },
  // 37: The plan, told straight
  {
    num: 37,
    title: "The Plan, Told Straight: Movemental Strategy",
    slug: "26-the-plan-told-straight",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 11455,
    end: 11593,
    desc: "Clear, unvarnished business and movement plan for building a 100-leader decentralized intellectual network."
  },
  // 38: The four stage path
  {
    num: 38,
    title: "The Four-Stage Path: Underlying Logic",
    slug: "27-the-four-stage-path-underlying-logic",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 11594,
    end: 11730,
    desc: "Deep dive into why Safety must precede Sandbox, Sandbox must precede Skills, and Skills must precede Solutions."
  },
  // 39: Scenii - strategic frame
  {
    num: 39,
    title: "Scenii: The Strategic Frame",
    slug: "28-scenii-the-strategic-frame",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 11731,
    end: 11866,
    desc: "How communal scene intelligence replaces heroic individualism in missional leadership and content ecosystems."
  },
  // 40: Scenii - visible evidences
  {
    num: 40,
    title: "Scenii: The Visible Evidences",
    slug: "29-scenii-the-visible-evidences",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 11867,
    end: 12005,
    desc: "The tangible marks of a healthy digital scenius: shared vocabulary, reciprocal citation, collaborative cohorts, and theological coherence."
  },
  // 41: How we choose movemental leaders
  {
    num: 41,
    title: "How We Choose Movemental Leaders",
    slug: "30-how-we-choose-movemental-leaders",
    dest: "movemental",
    author: "Joshua Shepherd, Alan Hirsch, Brad Brisco",
    start: 12006,
    end: 12151,
    desc: "Vetting standards, theology, character, peer endorsement, and diversity criteria for the hundred Movement Voices."
  },
  // 44: Market segmentation & EEAT
  {
    num: 44,
    title: "Market Segmentation & EEAT: Modular Capability Architecture",
    slug: "31-market-segmentation-and-eeat",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 12434,
    end: 12712,
    desc: "Mapping capabilities across the four core sectors: Nonprofits, Churches, Theological Institutions, and Movement Voices."
  },
  // 45: What each content type actually does
  {
    num: 45,
    title: "What Each Content Type Actually Does",
    slug: "32-what-each-content-type-actually-does",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 12713,
    end: 12878,
    desc: "Functional breakdown of pillars, pathways, articles, course modules, and discussion prompts across the platform."
  },
  // 46: Linking for SEO and GEO
  {
    num: 46,
    title: "Linking for SEO and GEO: Master Network Strategy",
    slug: "33-linking-for-seo-and-geo",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 12879,
    end: 14624,
    desc: "Comprehensive guide to network topology, semantic corroboration, authority transfer, and generative engine optimization."
  },
  // 47: User journeys and subscriber relationship
  {
    num: 47,
    title: "User Journeys and the Subscriber Relationship",
    slug: "34-user-journeys-and-the-subscriber-relationship",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 14625,
    end: 15005,
    desc: "How readers move from initial discovery to sustained cohort engagement without dark patterns or extractive monetization."
  },
  // 48-51: Movemental or a Website Builder?
  {
    num: 48,
    title: "Movemental or a Website Builder? A Comparative Guide",
    slug: "35-movemental-or-a-website-builder",
    dest: "movemental",
    author: "Movemental, LLC",
    start: 15006,
    end: 15657,
    desc: "Why generic website builders fail mission-driven leaders, churches, nonprofits, and institutions—and how Movemental's model differs."
  },
  // 52: Substack & Movemental
  {
    num: 52,
    title: "Substack and Movemental: Not a Choice, a Connection",
    slug: "36-substack-and-movemental",
    dest: "movemental",
    author: "Joshua Shepherd",
    start: 15658,
    end: 15811,
    desc: "How Movemental integrates with Substack newsletters rather than forcing authors into closed platform silos."
  },
  // 56: Youthfront AI Safety Charter
  {
    num: 56,
    title: "Youthfront AI Safety Charter: Exemplar Governance Document",
    slug: "37-youthfront-ai-safety-charter",
    dest: "movemental",
    author: "Youthfront & Movemental",
    start: 16352,
    end: 16746,
    desc: "The full ratified governance charter: core principles, staff guardrails, minor protection standards, and exception reporting."
  },
  // 58: joshshepherd content strategy v2
  {
    num: 58,
    title: "joshshepherd.ai Content Strategy v2",
    slug: "06-joshshepherd-content-strategy-v2",
    dest: "joshshepherd",
    author: "Joshua Shepherd",
    start: 17636,
    end: 18548,
    desc: "Vocational strategy, voice architecture, audience segmentation, and content pillars for joshshepherd.ai."
  }
];

let movCount = 0;
let joshCount = 0;

for (const item of items) {
  const targetDir = item.dest === 'movemental' ? movDir : joshDir;
  const fileName = `${item.slug}.md`;
  const filePath = path.join(targetDir, fileName);

  // Extract text
  const itemLines = allLines.slice(item.start - 1, item.end);
  let rawBody = itemLines.join('\n');

  // Strip leading numbering or heading like "## 1. Title"
  rawBody = rawBody.replace(/^#{1,4}\s+\d+\.\s+[^\n]+\n+/, '');

  // Clean demoted headings: if original was demoted 2 levels (### -> #, #### -> ##)
  // Let's ensure top level inside file is # or ##
  const cleanedBody = rawBody;

  const frontmatter = `---
title: "${item.title.replace(/"/g, '\\"')}"
slug: "${item.slug}"
author: "${item.author}"
original_number: ${item.num}
destination: "${item.dest === 'movemental' ? 'movemental.ai' : 'joshshepherd.ai'}"
description: "${item.desc.replace(/"/g, '\\"')}"
---

`;

  const fullContent = frontmatter + `# ${item.title}\n\n` + cleanedBody;
  fs.writeFileSync(filePath, fullContent, 'utf8');

  if (item.dest === 'movemental') movCount++;
  else joshCount++;

  console.log(`Wrote [${item.dest}] ${fileName} (${item.end - item.start + 1} lines)`);
}

console.log(`\nSuccessfully generated:`);
console.log(`- ${movCount} Movemental articles in ${movDir}`);
console.log(`- ${joshCount} Josh Shepherd articles in ${joshDir}`);
