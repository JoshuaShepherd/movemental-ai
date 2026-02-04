/**
 * Profile Workspace Sample Data
 *
 * This file contains typed sample content for the Profile Workspace UI.
 * Replace this with real data from your scraping pipeline when ready.
 */

// ============================================================
// TYPE DEFINITIONS
// ============================================================

export interface ThemeItem {
  label: string
  explanation: string
}

export interface ConvictionItem {
  statement: string
  evidence: string
}

export interface TensionItem {
  pole1: string
  pole2: string
  description: string
}

export interface VoiceNote {
  observation: string
}

export interface AuthorProfileData {
  executiveSummary: string[]
  coreThemes: ThemeItem[]
  repeatedConvictions: ConvictionItem[]
  tensionsHeld: TensionItem[]
  voiceNotes: VoiceNote[]
}

export interface AudienceSection {
  title: string
  items: string[]
}

export interface AudienceProfileData {
  whoFindsYou: string[]
  whyTheyTrust: string[]
  implicitAsks: string[]
  barriersAndEntryPoints: {
    barriers: string[]
    entryPoints: string[]
  }
  uncertainties: string[]
}

export interface ContentItem {
  title: string
  type: string
  location?: string
  notes?: string
}

export interface ContentGroup {
  category: string
  items: ContentItem[]
}

export interface UnderutilizedAsset {
  title: string
  reason: string
}

export interface NextMove {
  suggestion: string
  rationale?: string
}

export interface ContentProfileData {
  whatExists: ContentGroup[]
  whereLives: { platform: string; url?: string }[]
  underutilizedAssets: UnderutilizedAsset[]
  nextMoves: NextMove[]
}

export interface ProfileWorkspaceData {
  lastUpdated: string
  sourcesCount: number
  author: AuthorProfileData
  audience: AudienceProfileData
  content: ContentProfileData
}

// ============================================================
// SAMPLE DATA
// ============================================================

export const sampleProfileData: ProfileWorkspaceData = {
  lastUpdated: "January 2025",
  sourcesCount: 47,

  author: {
    executiveSummary: [
      "Your body of work centers on helping movement leaders translate transformative ideas into sustained institutional change. You write with a pastoral sensibility that takes seriously both the prophetic urgency of your message and the pastoral patience required for lasting formation.",
      "There's a consistent thread across your writing: the belief that meaningful change happens not through content alone, but through relationship, structure, and repeated practice over time. You resist quick fixes while remaining hopeful about what's possible."
    ],

    coreThemes: [
      {
        label: "Embodied Formation",
        explanation: "You return repeatedly to the idea that transformation happens through the body—through practice, repetition, and physical presence—not just through ideas."
      },
      {
        label: "Institutional Wisdom",
        explanation: "You take institutions seriously as vehicles for lasting change, even while acknowledging their limitations and failures."
      },
      {
        label: "Pastoral Patience",
        explanation: "Your work emphasizes the slow, relational work of formation over quick programmatic solutions."
      },
      {
        label: "Prophetic Critique",
        explanation: "You name what's broken in current systems while remaining constructive about alternatives."
      },
      {
        label: "Accessible Depth",
        explanation: "You translate complex theological and philosophical ideas into language that practitioners can use."
      },
      {
        label: "Community as Context",
        explanation: "Individual transformation, in your view, always happens within and through community."
      }
    ],

    repeatedConvictions: [
      {
        statement: "Content without relationship produces information, not transformation.",
        evidence: "Variations of this appear in your book introduction, multiple articles, and course descriptions."
      },
      {
        statement: "The body knows what the mind forgets.",
        evidence: "This phrase or close variants appear across your writing on embodied practice."
      },
      {
        statement: "Formation is not a problem to be solved but a way of being to be inhabited.",
        evidence: "Recurring theme in your critiques of programmatic approaches to spiritual growth."
      },
      {
        statement: "Leaders need sustained attention, not just momentary inspiration.",
        evidence: "Central to your argument for cohort-based learning over conferences."
      }
    ],

    tensionsHeld: [
      {
        pole1: "Prophetic",
        pole2: "Pastoral",
        description: "You hold both urgent critique and patient presence without collapsing either."
      },
      {
        pole1: "Institution",
        pole2: "Movement",
        description: "You see value in both structured organizations and grassroots energy."
      },
      {
        pole1: "Individual",
        pole2: "Communal",
        description: "Personal transformation and collective formation are intertwined in your thinking."
      },
      {
        pole1: "Tradition",
        pole2: "Innovation",
        description: "You draw on ancient wisdom while adapting it for contemporary contexts."
      }
    ],

    voiceNotes: [
      { observation: "You favor short, declarative sentences for emphasis—especially at paragraph endings." },
      { observation: "Metaphors tend toward the organic: soil, seasons, growth, roots, fruit." },
      { observation: "You quote sparingly but meaningfully, often reframing rather than citing directly." },
      { observation: "Transitions between ideas are often questions, inviting the reader forward." },
      { observation: "You use second person ('you') frequently, creating direct address." },
      { observation: "Technical theological terms appear but are always immediately unpacked." },
      { observation: "Lists appear often—usually 3–5 items, rarely more." }
    ]
  },

  audience: {
    whoFindsYou: [
      "Pastors and ministry leaders in mid-career who feel stuck between vision and implementation",
      "Nonprofit directors in faith-adjacent spaces seeking frameworks for sustainable change",
      "Authors and speakers with established content who want to deepen their impact",
      "Seminary educators looking for bridges between academic theology and practical formation",
      "Denominational leaders tasked with renewal initiatives"
    ],

    whyTheyTrust: [
      "You've been where they are—your credibility comes from shared experience, not just expertise",
      "You name the frustrations they feel without cynicism or cheap solutions",
      "Your critiques of quick-fix culture feel validating, not shaming",
      "You offer language for things they've sensed but couldn't articulate",
      "Your work feels intellectually serious without being inaccessible"
    ],

    implicitAsks: [
      "Give me a framework I can actually use, not just inspiration",
      "Help me translate my ideas into something sustainable",
      "Tell me what to do next when the conference high wears off",
      "Show me I'm not alone in feeling like current models aren't working",
      "Provide intellectual grounding for what I already intuit"
    ],

    barriersAndEntryPoints: {
      barriers: [
        "Some perceive your work as too slow or not 'practical' enough for urgent needs",
        "Language may feel too theological for secular nonprofit leaders",
        "Book length can be intimidating for time-pressed leaders"
      ],
      entryPoints: [
        "Articles and shorter essays provide accessible starting points",
        "Podcast appearances introduce your thinking in conversational formats",
        "Workshop experiences create embodied first encounters with your approach"
      ]
    },

    uncertainties: [
      "We may be missing significant audience segments outside religious contexts",
      "International reach is unclear from available sources",
      "Demographic age range is estimated, not confirmed",
      "We haven't fully mapped how people typically discover your work"
    ]
  },

  content: {
    whatExists: [
      {
        category: "Books",
        items: [
          { title: "The Formation Imperative", type: "Primary text", notes: "Core framework for your approach" },
          { title: "Chapters in Edited Collections", type: "Contributed essays", notes: "Various academic and popular volumes" }
        ]
      },
      {
        category: "Articles & Essays",
        items: [
          { title: "Published pieces", type: "Online and print", notes: "~35 articles across various outlets" },
          { title: "Newsletter archive", type: "Email content", notes: "Weekly reflections since 2021" }
        ]
      },
      {
        category: "Courses & Workshops",
        items: [
          { title: "Foundations Cohort", type: "Flagship program", notes: "12-week intensive formation experience" },
          { title: "Workshop recordings", type: "Video archive", notes: "From conferences and retreats" }
        ]
      },
      {
        category: "Audio & Video",
        items: [
          { title: "Podcast appearances", type: "Guest interviews", notes: "~20 conversations" },
          { title: "Conference talks", type: "Keynotes and sessions", notes: "Archived recordings available" }
        ]
      }
    ],

    whereLives: [
      { platform: "Personal website", url: "Primary hub for current work" },
      { platform: "Publisher pages", url: "Book information and ordering" },
      { platform: "YouTube", url: "Selected talks and interviews" },
      { platform: "Podcast feeds", url: "Guest appearances discoverable via search" },
      { platform: "Newsletter platform", url: "Subscriber-only archive" }
    ],

    underutilizedAssets: [
      {
        title: "Newsletter archive",
        reason: "Three years of weekly writing could be curated into thematic collections or repurposed as lead magnets."
      },
      {
        title: "Workshop recordings",
        reason: "Sitting in private archives—could become asynchronous course content or sample material."
      },
      {
        title: "Unpublished book chapter",
        reason: "Cut from final manuscript but still valuable—could become article series or bonus content."
      }
    ],

    nextMoves: [
      {
        suggestion: "Create a 'Start Here' reading path for new visitors",
        rationale: "Reduces friction for people encountering your work for the first time."
      },
      {
        suggestion: "Develop a short diagnostic tool based on your framework",
        rationale: "Gives leaders an entry point that feels immediately useful."
      },
      {
        suggestion: "Curate a 'best of newsletter' collection around core themes",
        rationale: "Surfaces valuable archive content without requiring new writing."
      },
      {
        suggestion: "Record a short video introduction to your approach",
        rationale: "Creates an accessible format for those who prefer audio/visual."
      },
      {
        suggestion: "Consider a practitioner cohort for those who've completed Foundations",
        rationale: "Natural next step for engaged alumni; builds sustained community."
      }
    ]
  }
}
