export const stageMeta = [
  {
    num: '01',
    name: 'Safety',
    protect: 'Protect the mission',
    mapDesc: 'Establish wise guardrails and parameters.',
    sentence: 'Before adopting any tool, an organization must define what is <em>safe</em>. This means establishing guardrails for data, privacy, and missional alignment so staff can experiment without risking the organization\'s reputation or the trust of the people it serves.'
  },
  {
    num: '02',
    name: 'Sandbox',
    protect: 'Protect the team',
    mapDesc: 'Create a contained environment for structured experimentation.',
    sentence: 'Once safety is defined, the organization creates a contained environment for <em>structured experimentation</em>. The goal is not rapid deployment, but rather building fluency and evaluating capabilities without pressure to perform.'
  },
  {
    num: '03',
    name: 'Skills',
    protect: 'Build the capability',
    mapDesc: 'Formalize training for the broader team.',
    sentence: 'The findings from the sandbox are translated into formal training for the <em>broader team</em>. This stage shifts the focus from individual exploration to organizational capability, ensuring everyone shares a common language and baseline skill.'
  },
  {
    num: '04',
    name: 'Solutions',
    protect: 'Accelerate the work',
    mapDesc: 'Build integrated workflows and systems.',
    sentence: 'Only after safety, experimentation, and skills are established does the organization move to building <em>integrated solutions</em>. At this stage, AI is thoughtfully woven into operations, workflows, and perhaps even products or ministry delivery.'
  }
];

export const caseStudies = {
  churches: {
    audienceLabel: "For church leaders.",
    copy: {
      WhyThisWorked: [
        { title: "Theological clarity first", description: "They established limits not just on data, but on what tasks are inherently pastoral and cannot be outsourced." },
        { title: "Guided exploration", description: "Pastors were given private environments to test sermon prep assistance without fear of judgment." },
        { title: "Congregational transparency", description: "They openly communicated their AI policy to the church, building trust rather than suspicion." }
      ],
      Stats: [
        { label: "Staff trained", value: "100%" },
        { label: "Policy adopted", value: "3 weeks" },
        { label: "Hours saved/week", value: "12+" }
      ],
      PullQuote: "We realized that if we didn't give our staff a theological framework for AI, they would just inherit the framework of the tech companies."
    }
  },
  nonprofits: {
    audienceLabel: "For nonprofit leaders.",
    copy: {
      WhyThisWorked: [
        { title: "Donor data protection", description: "Strict enterprise agreements ensured PII never leaked into public training models." },
        { title: "Grant writing acceleration", description: "They built a custom knowledge base of past successful grants to dramatically speed up drafting." },
        { title: "Mission integrity", description: "They defined exactly where Human-In-The-Loop review is required to ensure empathy." }
      ],
      Stats: [
        { label: "Grant velocity", value: "3x" },
        { label: "Data breaches", value: "0" },
        { label: "Cost savings", value: "$40k" }
      ],
      PullQuote: "It’s not just about efficiency. It’s about spending less time on administration so we can spend more time sitting across from the people we serve."
    }
  },
  institutions: {
    audienceLabel: "For institutional leaders.",
    copy: {
      WhyThisWorked: [
        { title: "Academic integrity redefined", description: "Moved away from fragile AI detectors to designing assessments that evaluate process over mere output." },
        { title: "Faculty alignment", description: "Created safe spaces for skeptical faculty to explore capabilities before setting departmental policies." },
        { title: "Student formation", description: "Shifted focus to teaching students how to govern AI tools, treating it as a core competency for future leaders." }
      ],
      Stats: [
        { label: "Departments aligned", value: "14" },
        { label: "Policy clarity", value: "100%" },
        { label: "Syllabi updated", value: "120+" }
      ],
      PullQuote: "We had to stop asking how to prevent students from using AI and start asking how we form leaders who can govern it wisely."
    }
  }
};
