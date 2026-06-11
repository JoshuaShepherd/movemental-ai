/**
 * Charter Dashboard — mock data (client-side only).
 * Vocabulary: AI Charter, Charter Dashboard, Assessment, five layers.
 * @see dashboard/OPEN-DECISIONS.md
 */
window.CharterDashboardMock = {
  org: {
    name: 'Grace Community Church',
    shortName: 'GCC',
    cohort: 'Spring 2026 · Cohort 04',
    productLabel: 'Charter Dashboard', // swappable if terminology changes
    artifactLabel: 'AI Charter',
  },

  charter: {
    overallStatus: 'draft', // draft | ratified
    ratifiedDate: null,
    layersComplete: 3,
    layerCount: 5,
    boardViewAvailable: true,
    primaryNextAction: 'ratify',
    layers: [
      {
        id: 'statement',
        num: '01',
        name: 'Statement',
        purpose: 'What the organization believes about AI in relation to its mission.',
        status: 'final', // draft | final | ratified
        clauses: [
          'We receive artificial intelligence as a tool that may extend faithful work — never as a substitute for pastoral presence, embodied community, or the slow work of formation.',
          'Our mission to make disciples who love God and neighbor sets the ceiling on what we will automate and the floor on what we will protect.',
          'When AI output shapes teaching, care, or public witness, a human leader remains accountable for the words that go out under our name.',
        ],
      },
      {
        id: 'policy',
        num: '02',
        name: 'Policy',
        purpose: 'What the organization will do, and what it refuses to do.',
        status: 'final',
        clauses: [
          'Permitted uses include drafting internal communications, summarizing non-confidential meeting notes, and research support when outputs are reviewed before distribution.',
          'Named refusals: we will not use AI to generate personalized pastoral counsel, to score or rank members, or to produce donor-facing appeals without human authorship.',
          'Vendor tools must be approved through IT and recorded in the Context inventory before staff use them with organizational data.',
        ],
      },
      {
        id: 'context',
        num: '03',
        name: 'Context',
        purpose: 'What is actually true in the environment right now.',
        status: 'final',
        clauses: [
          'As of May 2026, fourteen staff-reported tools are in active use; four lack enterprise agreements.',
          'Member directories, counseling notes, and giving records are classified Restricted and may not enter general-purpose AI tools.',
          'Microsoft 365 Copilot is approved for administrative staff; ChatGPT Team is approved for communications with disclosure requirements.',
        ],
      },
      {
        id: 'rules',
        num: '04',
        name: 'Rules',
        purpose: 'What governs AI use in specific domains.',
        status: 'draft',
        clauses: [
          'Communications: any AI-assisted sermon illustration or social post requires attribution in the draft log and review by the teaching pastor.',
          'Data handling: Restricted data stays in approved environments; staff must not paste member stories into consumer chat tools.',
          'Care boundaries: AI may suggest sermon outlines; it may not conduct triage conversations presented as pastoral care.',
        ],
      },
      {
        id: 'response',
        num: '05',
        name: 'Response Plans',
        purpose: 'What the organization does when something goes wrong.',
        status: 'draft',
        clauses: [
          'Incident classes: data leak to a vendor, misleading public output, and pastoral misuse (AI presented as human counsel).',
          'First ten minutes: contain (revoke access if needed), notify Executive Pastor and IT, preserve screenshots and prompts.',
          'Board notification within 72 hours for any incident involving Restricted data or public misrepresentation.',
        ],
      },
    ],
  },

  assessment: {
    /** Flag: target duration — corpus disagrees on question count; do not hard-code as canonical. */
    durationNote: '~10 minutes (representative preview)',
    staffTotal: 24,
    staffCompleted: 18,
    rolloutActive: true,
    inviteLink: 'https://movemental.example/assess/gcc-spring-26',
    previewQuestions: [
      {
        dimension: 'Awareness',
        text: 'Which AI tools have you used for church work in the last 90 days, even informally?',
      },
      {
        dimension: 'Governance',
        text: 'Do you know whether your current use is permitted under an organizational policy?',
      },
      {
        dimension: 'Data',
        text: 'Have you ever pasted member names, prayer requests, or giving information into an AI tool?',
      },
      {
        dimension: 'Disclosure',
        text: 'When you use AI for a draft others will see, do you label it?',
      },
      {
        dimension: 'Care',
        text: 'Have you used AI to respond to someone in crisis or seeking pastoral guidance?',
      },
    ],
    departments: [
      { name: 'Operations & Admin', invited: 6, completed: 6 },
      { name: 'Communications', invited: 4, completed: 4 },
      { name: 'Pastoral Care', invited: 8, completed: 5 },
      { name: 'Kids & Youth', invited: 6, completed: 3 },
    ],
    results: {
      summary: 'AI is already in weekly workflows — especially communications and sermon prep — but governance and care boundaries are uneven. The largest gap is pastoral staff using consumer tools without inventory or disclosure.',
      dimensions: [
        { name: 'Tools in use', finding: '11 distinct tools reported; 4 unapproved', severity: 'high' },
        { name: 'Policy awareness', finding: '62% could not cite a permitted-use rule', severity: 'medium' },
        { name: 'Restricted data', finding: '3 teams reported pasting prayer requests', severity: 'high' },
        { name: 'Disclosure', finding: 'Communications labels drafts; pastoral rarely does', severity: 'medium' },
        { name: 'Care boundary', finding: '2 incidents of AI-drafted counsel without review', severity: 'high' },
      ],
      inUse: [
        'Sermon illustration and outline support (teaching team)',
        'Newsletter and social drafting (communications)',
        'Meeting summaries (operations)',
      ],
      gaps: [
        'No shared inventory between IT and pastoral teams',
        'Inconsistent disclosure on AI-assisted care emails',
        'Youth volunteers using personal ChatGPT accounts',
      ],
    },
  },

  search: {
    placeholder: 'Ask a question about your organization\'s AI posture…',
    seeds: [
      {
        query: 'Can staff use ChatGPT with member prayer requests?',
        layer: 'Rules',
        excerpt: 'Restricted data — including prayer requests and pastoral notes — may not enter general-purpose AI tools. Care boundaries: AI may suggest sermon outlines; it may not conduct triage conversations presented as pastoral care.',
      },
      {
        query: 'What do we refuse to automate?',
        layer: 'Policy',
        excerpt: 'Named refusals: we will not use AI to generate personalized pastoral counsel, to score or rank members, or to produce donor-facing appeals without human authorship.',
      },
      {
        query: 'What happens if AI leaks member data?',
        layer: 'Response Plans',
        excerpt: 'First ten minutes: contain (revoke access if needed), notify Executive Pastor and IT, preserve screenshots and prompts. Board notification within 72 hours for any incident involving Restricted data.',
      },
    ],
    index: [
      { layer: 'Statement', keywords: ['mission', 'believe', 'formation', 'disciples', 'automate'], text: 'We receive artificial intelligence as a tool that may extend faithful work — never as a substitute for pastoral presence…' },
      { layer: 'Policy', keywords: ['refuse', 'permitted', 'vendor', 'approval', 'donor'], text: 'Named refusals: we will not use AI to generate personalized pastoral counsel…' },
      { layer: 'Context', keywords: ['inventory', 'tools', 'copilot', 'restricted', 'classified'], text: 'Member directories, counseling notes, and giving records are classified Restricted…' },
      { layer: 'Rules', keywords: ['sermon', 'disclosure', 'communications', 'care', 'paste'], text: 'Communications: any AI-assisted sermon illustration or social post requires attribution…' },
      { layer: 'Response Plans', keywords: ['incident', 'leak', 'notify', 'board', '72 hours'], text: 'Incident classes: data leak to a vendor, misleading public output…' },
    ],
  },

  rollout: {
    items: [
      {
        id: 'board-packet',
        title: 'Board ratification packet',
        description: 'Resolution language, five-layer summary, and consent agenda for the next board meeting.',
        format: 'PDF · 12 pages',
      },
      {
        id: 'staff-announcement',
        title: 'Staff announcement',
        description: 'Email and all-staff meeting script introducing the AI Charter and Assessment rollout.',
        format: 'DOCX + talking points',
      },
      {
        id: 'constituent',
        title: 'Constituent communication',
        description: 'Letter to members explaining how the church approaches AI in ministry — plain language, no jargon.',
        format: 'PDF · 2 pages',
      },
      {
        id: 'faq',
        title: 'FAQ for the people you serve',
        description: 'Answers for members, donors, and partners about AI in preaching, care, and communications.',
        format: 'Web-ready HTML',
      },
      {
        id: 'incident-briefing',
        title: 'Incident-readiness briefing',
        description: 'One-pager for elders and staff leads: classes of harm, first ten minutes, who to call.',
        format: 'PDF · 1 page',
      },
      {
        id: 'pre-engagement',
        title: 'Pre-engagement communication framework',
        description: 'Templates for announcing the facilitated cohort before Week 1 — leadership alignment copy.',
        format: 'DOCX',
      },
    ],
  },

  activity: [
    { when: 'Today, 9:14 a.m.', text: 'M. Chen marked Context layer final after IT inventory review.' },
    { when: 'Yesterday, 4:02 p.m.', text: 'Assessment link opened by 3 new respondents (Pastoral Care).' },
    { when: 'May 26', text: 'Movemental facilitator commented on Rules draft — care boundaries clause.' },
    { when: 'May 24', text: 'Board packet preview generated (mock export).' },
    { when: 'May 22', text: 'Charter Dashboard workspace provisioned for Grace Community Church.' },
  ],

  lockedTeaser: {
    title: 'Sandbox',
    body: 'Unlocked after Safety is ratified. Experiment log, use-case library, and Future Plan — Stage 02 on the Path.',
    href: '../pathway-sandbox.html',
  },
};
