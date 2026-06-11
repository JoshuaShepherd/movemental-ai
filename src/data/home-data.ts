export const INTERACTIVE_PATH_STAGES = [
  {
    num: "01",
    name: "Safety",
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
    name: "Sandbox",
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
    name: "Training",
    body: "The findings from the sandbox are translated into formal training for the broader team. This stage shifts the focus from individual exploration to shared skill across the organization, ensuring everyone shares a common language and baseline judgment.",
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
    name: "Technology",
    body: "Only after safety, experimentation, and skills are established does the organization move to building integrated solutions. At this stage, AI is thoughtfully woven into operations, workflows, and perhaps even products or ministry delivery.",
    workProducts: [
      "Custom GPTs or internal agents for specific workflows.",
      "API integrations into existing software (CRM, ChMS, etc.).",
      "Automated operational workflows.",
      "New capabilities that were previously impossible."
    ],
    definitionOfDone: [
      "AI is invisible; it is simply how the work is done.",
      "Technology deployments are actively maintained and governed.",
      "The mission is demonstrably accelerated or expanded."
    ],
    ifSkipped: [
      "The organization builds costly solutions that staff do not understand or use.",
      "Technology breaks because the foundational training to maintain it does not exist.",
      "The tool replaces human connection where human connection was the actual point."
    ]
  }
];

export const VOICES = [
  {
    name: "Alan Hirsch",
    title: "Forgotten Ways and APEST architect; twenty books; Forge and 100 Movements; 150k+ assessments; coined movemental.",
    image: "/images/voices/alan-hirsch.webp"
  },
  {
    name: "Dr. Brad Brisco",
    title: "NAMB / Send Network multiplication strategies director; covocational ministry; five books; missional theology ↔ evangelical systems translator.",
    image: "/images/voices/brad-brisco.webp"
  },
  {
    name: "Liz Rios",
    title: "Afro-Boricua theologian; Passion2Plant founder; Lilly-funded Púlpito Fellows; Fuller adjunct; Sojourners board; Need to Know contributor.",
    image: "/images/voices/liz-rios.webp"
  },
  {
    name: "Rowland Smith",
    title: "Forge America director; Pando Collective founder; Pulpit Rock mission pastor; Red Skies curator; DMiss scholar.",
    image: "/images/voices/rowland-smith.webp"
  },
  {
    name: "JR Woodward",
    title: "V3 Church Planting national director; Manchester PhD powers scholar; published IVP books; Missio Alliance co-founder.",
    image: "/images/voices/jr-woodward.webp"
  },
  {
    name: "Lucas Pulley",
    title: "Underground Network Movements Director; fourteen-plus years microchurch; Tampa neighborhood practitioner; Fuller MGL; mathematics-trained systems thinking.",
    image: "/images/voices/lucas-pulley.webp"
  },
  {
    name: "Rob Wegner",
    title: "Kansas City Underground founder; Microchurch NEXT co-director; Starfish and the Spirit co-author; eight-book multiplication bibliography.",
    image: "/images/voices/rob-wegner.webp"
  }
];
