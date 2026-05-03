import React from 'react';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { PathwayComponent } from '@/components/PathwayComponent';

interface SegmentPathwayProps {
  audience: 'churches' | 'nonprofits' | 'institutions';
}

const commonDeliverables = {
  safety: [
    "AI Use & Trust Charter (organization-specific, mission-aligned)",
    "Roles & Decision Rights matrix",
    "Data Hygiene Audit",
    "AI Risk Register specific to the sector",
    "Acceptable Use Policy for staff and contractors",
    "Vendor Evaluation Framework",
    "Sector-Specific AI Boundaries document",
    "Data Handling Standards (Donor, Member, or Beneficiary)",
    "Incident Response Protocol",
    "Staff Communication Kit",
    "Board Briefing Document",
    "90-Day Readiness Roadmap",
    "Charter Adoption Checklist"
  ],
  sandbox: [
    "Pre-engagement team assessment",
    "Six weeks of facilitated discovery sprints",
    "Private sandbox environment access",
    "Weekly facilitated working sessions",
    "Use Case Discovery Framework",
    "Use Case Scoring Rubric",
    "Use Case Portfolio (ready to fund or kill)",
    "Post-engagement capability assessment",
    "Living Case Study artifact"
  ],
  skills: [
    "The Movemental AI Wisdom course (8-week cohort)",
    "Up to 15 participant seats included",
    "Weekly in-person or live-virtual teaching sessions",
    "LMS-hosted recipe library (refreshed quarterly)",
    "Practice modules tied exactly to use cases from the Lab",
    "Facilitator Track (2-4 internal staff certified as leaders)",
    "Pre/post capability assessments",
    "Lifetime access to course library",
    "Cohort connection with peer organizations",
    "Movemental AI Practitioner credential"
  ],
  solutions: [
    "Integration: Ingest and organize informational and relational intelligence",
    "Activation: Native AI workflows tuned to your organization",
    "Transformation: Adaptive training and compounding content features",
    "Multiplication: Strategic linking with peer organizations and networks"
  ]
};

const segmentData = {
  churches: {
    heroTitle: "The Pathway, tailored for Churches",
    paragraphs: [
      "Churches face an AI question their tradition didn't anticipate. The technology is here, the staff has questions, the congregation has opinions, and the elder board needs a position. We help you start where it matters: a charter your leadership can sign, a sandbox where staff can experiment without theological or pastoral risk, eight weeks of formation in AI wisdom for the people who'll lead this for years, and — when you're ready — a digital infrastructure rebuild that integrates your sermon archive, your member care, your formation pathways, and your communications into one coherent intelligence layer.",
      "Most churches we work with begin at Safety Documentation because the governance question is loudest. Some begin at Sandbox Discovery because the staff is already experimenting and needs a structured environment. The Pathway works either way."
    ],
    stops: [
      { num: '01', name: 'Safety Documentation', duration: '2 weeks', price: '$5,000', outcome: 'A charter your elder board can sign.', deliverables: commonDeliverables.safety },
      { num: '02', name: 'Sandbox Discovery', duration: '4 weeks', price: '$15,000', outcome: 'Pastoral and operational use cases proven safe.', deliverables: commonDeliverables.sandbox },
      { num: '03', name: 'Skills Development', duration: '8 weeks', price: 'from $4,800/yr', outcome: 'Staff trained to lead AI work without losing the plot.', deliverables: commonDeliverables.skills },
      { num: '04', name: 'Solutions Deployment', duration: '8-12 weeks', price: 'from $30K', outcome: 'Sermons, formation, member care, and communications, integrated.', deliverables: commonDeliverables.solutions }
    ],
    faqs: [
      { q: "Will this conflict with our theology around discernment, presence, and pastoral care?", a: "No. The Pathway is designed precisely so AI serves pastoral work rather than replacing it. Foundations specifically codifies where AI must not go." },
      { q: "What if our staff isn't technical?", a: "Most aren't. The Pathway assumes that. Fluency is built for non-technical staff to become competent — not engineers, leaders." },
      { q: "Do we have to do all four stages?", a: "No. Most begin at Foundations or Lab. Many continue. None are forced." }
    ]
  },
  nonprofits: {
    heroTitle: "The Pathway, tailored for Nonprofits",
    paragraphs: [
      "Mission-driven nonprofits face a sharper version of the AI question because the stakes of getting it wrong are personal. Donor data is sacred. Beneficiary data is sacred. Theological or organizational integrity, where it applies, is non-negotiable. We help you start with governance that respects that, move into a Lab where your team can identify the specific use cases that serve your mission rather than warp it, build the AI fluency your staff needs to lead the work themselves, and — when the foundation is ready — integrate the digital infrastructure that lets your mission compound rather than dilute.",
      "Most nonprofits we work with begin at Safety Documentation because boards want clarity before staff experiments. Some begin at Sandbox Discovery because the executive director is already piloting and needs a structured way to evaluate."
    ],
    stops: [
      { num: '01', name: 'Safety Documentation', duration: '2 weeks', price: '$5,000', outcome: 'Donor and beneficiary data, governed and protected.', deliverables: commonDeliverables.safety },
      { num: '02', name: 'Sandbox Discovery', duration: '4 weeks', price: '$15,000', outcome: 'Mission-aligned use cases, validated.', deliverables: commonDeliverables.sandbox },
      { num: '03', name: 'Skills Development', duration: '8 weeks', price: 'from $4,800/yr', outcome: 'A team that can lead AI work without compromising the mission.', deliverables: commonDeliverables.skills },
      { num: '04', name: 'Solutions Deployment', duration: '8-12 weeks', price: 'from $30K', outcome: 'Programs, donors, communications, integrated and multiplied.', deliverables: commonDeliverables.solutions }
    ],
    faqs: [
      { q: "How do you protect beneficiary and donor data?", a: "The Lab sandbox is privacy-protected and publishing-prevented by design. Foundations codifies the data handling standards before anything touches a model." },
      { q: "Can we afford this?", a: "The full Pathway is $65,000. A single comparable engagement at a Big Four consultancy starts at $250,000 and doesn't include the platform." },
      { q: "What if we're already using ChatGPT informally?", a: "That's exactly when Foundations matters most. Informal use without a charter is the most common path to a problem." }
    ]
  },
  institutions: {
    heroTitle: "The Pathway, tailored for Institutions",
    paragraphs: [
      "Seminaries, training networks, and denominational bodies face the AI question on two timelines simultaneously: their own institutional adoption, and what they teach the next generation of leaders about AI. We help you address both — governance for your institution, a Lab that doubles as a learning artifact for your students or member organizations, AI fluency formation that you can extend to your network, and a Build engagement that integrates your training material, your member-org relationships, and your scholarly output into a multiplied intelligence layer.",
      "Institutions typically benefit most from the full Pathway, because the same architecture you adopt internally becomes the architecture you can teach. Many of our institutional clients also become referral partners for the churches and nonprofits in their network."
    ],
    stops: [
      { num: '01', name: 'Safety Documentation', duration: '2 weeks', price: '$5,000', outcome: 'Institutional charter and a teachable governance framework.', deliverables: commonDeliverables.safety },
      { num: '02', name: 'Sandbox Discovery', duration: '4 weeks', price: '$15,000', outcome: 'Use cases proven, plus a living teaching artifact.', deliverables: commonDeliverables.sandbox },
      { num: '03', name: 'Skills Development', duration: '8 weeks', price: 'from $4,800/yr', outcome: 'Your staff and your students learning the same wisdom.', deliverables: commonDeliverables.skills },
      { num: '04', name: 'Solutions Deployment', duration: '8-12 weeks', price: 'from $30K', outcome: 'Curriculum, network, and scholarship, integrated as infrastructure.', deliverables: commonDeliverables.solutions }
    ],
    faqs: [
      { q: "Can we white-label or extend this to the organizations we serve?", a: "Yes. Many of our institutional engagements include extension rights or referral structures." },
      { q: "Does this work for accredited programs?", a: "Yes. Fluency includes assessment, certification, and credentialing structures compatible with accredited learning environments." },
      { q: "What does the Build phase look like for a multi-entity institution?", a: "Multi-entity Build engagements are quoted custom under our Network Engagements structure, typically starting at $60,000 and scaling by scope." }
    ]
  }
};

export function SegmentPathway({ audience }: SegmentPathwayProps) {
  const data = segmentData[audience];

  return (
    <>
      <section className="band-default pt-24 pb-20 md:pt-32 border-b border-border">
        <Container>
          <Reveal>
            <h1 className="font-serif-display italic text-4xl md:text-5xl lg:text-6xl mb-8 max-w-4xl text-foreground">
              {data.heroTitle}
            </h1>
            <div className="space-y-6 text-lg md:text-xl text-foreground/80 max-w-4xl leading-relaxed mb-20">
              {data.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            
            <PathwayComponent stops={data.stops} />
            <div className="mt-8 text-center text-sm text-muted-foreground italic">
              Most organizations enter at Foundations or Lab. The order matters; the entry point depends on where you already are.
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-section bg-section py-20 md:py-32">
         <Container>
            <Reveal>
              <h2 className="font-serif-display text-3xl md:text-4xl italic mb-12 text-foreground">
                Questions from {audience}
              </h2>
              <div className="max-w-4xl space-y-8">
                {data.faqs.map((faq, i) => (
                  <div key={i} className="bg-card border border-border p-8 rounded-2xl">
                    <h3 className="font-medium text-lg md:text-xl text-foreground mb-4">{faq.q}</h3>
                    <p className="text-muted-foreground leading-relaxed text-[1.0625rem]">{faq.a}</p>
                  </div>
                ))}
              </div>
              
              {audience === 'institutions' && (
                <div className="mt-12 bg-primary/5 border border-primary/20 p-8 rounded-2xl max-w-4xl">
                  <h3 className="font-semibold text-xl text-foreground mb-3">Network Engagements</h3>
                  <p className="text-primary/90 leading-relaxed text-[1.0625rem] mb-6">
                    For denominations, training networks, and multi-site organizations, Build extends across entities — shared governance, linked platforms, federated intelligence. These engagements are quoted per conversation. Most start at $60,000 and scale with scope.
                  </p>
                  <a href="/contact" className="btn-pill btn-pill--primary inline-flex text-sm">Talk about a Network Engagement</a>
                </div>
              )}
            </Reveal>
         </Container>
      </section>
    </>
  );
}
