export const INTERACTIVE_PATH_STAGES = [
  {
    num: "01",
    name: "Safety Documentation",
    body: "Before adopting any tool, an organization must define what is safe. This means establishing guardrails for data, privacy, and missional alignment so staff can experiment without risking the organization's reputation or the trust of the people it serves.",
    workProducts: [
      "AI Safety & Ethics Policy established.",
      "Approved 'Safe Tools' list published.",
      "Clear guidance on PII and sensitive data handling.",
      "Initial leadership alignment on what AI should not do."
    ],
    definitionOfDone: [
      "Staff know exactly what data is safe to share with AI.",
      "Staff know which tools are approved for use.",
      "Leaders have reviewed and approved the safety constraints."
    ],
    ifSkipped: [
      "Staff use unapproved tools ('Shadow IT').",
      "Sensitive organizational or pastoral data is uploaded to public models.",
      "The organization reacts to an AI crisis instead of preventing one."
    ]
  },
  {
    num: "02",
    name: "Sandbox Discovery",
    body: "Once safety is defined, the organization creates a contained environment for structured experimentation. The goal is not rapid deployment, but rather building fluency and evaluating capabilities without pressure to perform.",
    workProducts: [
      "Secure, private AI environment (e.g., Enterprise/Team accounts).",
      "Identified 'Champions' who lead the exploration.",
      "Regular sharing of successful prompts and failures.",
      "Identification of high-value tasks."
    ],
    definitionOfDone: [
      "A core team is fluent in prompting and tool usage.",
      "The organization has private instances where data is not used for model training.",
      "Initial anxiety is replaced by realistic understanding of capabilities."
    ],
    ifSkipped: [
      "People experiment in silos and findings are never shared.",
      "The organization invests in the wrong tools due to lack of testing.",
      "Early adopters move too fast; skeptics are left entirely behind."
    ]
  },
  {
    num: "03",
    name: "Skills Development",
    body: "The findings from the sandbox are translated into formal training for the broader team. This stage shifts the focus from individual exploration to organizational capability, ensuring everyone shares a common language and baseline skill.",
    workProducts: [
      "Organization-wide AI literacy training.",
      "Role-specific guides and prompt libraries.",
      "Integration of AI skills into job descriptions and onboarding.",
      "Clear metrics for competence."
    ],
    definitionOfDone: [
      "Staff use AI to augment their work, not outsource their thinking.",
      "A shared vocabulary exists around AI tools and methods.",
      "The gap between early adopters and the rest of the staff is closed."
    ],
    ifSkipped: [
      "AI remains a 'magic trick' used by a few tech-savvy staff.",
      "Inefficiency remains high; the organization sees no true productivity gain.",
      "Inequality in staff capability creates friction and misunderstanding."
    ]
  },
  {
    num: "04",
    name: "Solutions Deployment",
    body: "Only after safety, experimentation, and skills are established does the organization move to building integrated solutions. At this stage, AI is thoughtfully woven into operations, workflows, and perhaps even products or ministry delivery.",
    workProducts: [
      "Custom GPTs or internal agents for specific workflows.",
      "API integrations into existing software (CRM, ChMS, etc.).",
      "Automated operational workflows.",
      "New capabilities that were previously impossible."
    ],
    definitionOfDone: [
      "AI is invisible; it is simply how the work is done.",
      "Solutions are actively maintained and governed.",
      "The mission is demonstrably accelerated or expanded."
    ],
    ifSkipped: [
      "The organization builds costly solutions that staff do not understand or use.",
      "Solutions break because the foundational skills to maintain them do not exist.",
      "The tool replaces human connection where human connection was the actual point."
    ]
  }
];

export const VOICES = [
  {
    name: "Alan Hirsch",
    title: "Forgotten Ways and APEST architect; twenty books; Forge and 100 Movements; 150k+ assessments; coined movemental.",
    image: "https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/alan-hirsch.webp"
  },
  {
    name: "Brad Brisco",
    title: "NAMB / Send Network multiplication strategies director; covocational ministry; five books; missional theology ↔ evangelical systems translator.",
    image: "https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/brad-brisco.webp"
  },
  {
    name: "Liz Rios",
    title: "Afro-Boricua theologian; Passion2Plant founder; Lilly-funded Púlpito Fellows; Fuller adjunct; Sojourners board; Need to Know contributor.",
    image: "https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/liz-rios.webp"
  },
  {
    name: "Rowland Smith",
    title: "Forge America director; Pando Collective founder; Pulpit Rock mission pastor; Red Skies curator; DMiss scholar.",
    image: "https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/rowland-smith.webp"
  },
  {
    name: "JR Woodward",
    title: "V3 Church Planting national director; Manchester PhD powers scholar; published IVP books; Missio Alliance co-founder.",
    image: "https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/jr-woodward.webp"
  },
  {
    name: "Lucas Pulley",
    title: "Underground Network Movements Director; fourteen-plus years microchurch; Tampa neighborhood practitioner; Fuller MGL; mathematics-trained systems thinking.",
    image: "https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/lucas-pulley.webp"
  },
  {
    name: "Tim Catchim",
    title: "Permanent Revolution co-author with Hirsch; Trimtab APEST coach; OneLife Nashville team leader; IVP-published movemental practitioner.",
    image: "https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/tim-catchim.webp"
  },
  {
    name: "Rob Wegner",
    title: "Kansas City Underground founder; Microchurch NEXT co-director; Starfish and the Spirit co-author; eight-book multiplication bibliography.",
    image: "https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/rob-wegner.webp"
  }
];
