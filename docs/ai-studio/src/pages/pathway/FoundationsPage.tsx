import React, { useEffect } from 'react';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { Link } from 'react-router-dom';

export function FoundationsPage() {
  useEffect(() => {
    document.title = "Foundations | Movemental Pathway";
  }, []);

  const deliverables = [
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
  ];

  const faqs = [
    { q: "Do we really need 14 documents?", a: "You don't need documents for the sake of documents. You need the clarity they force. These artifacts answer the questions your staff is already asking informally, and they protect your board from assumed risk." },
    { q: "Is this just legal boilerplate?", a: "No. Boilerplate won't address theology, donor trust, or mission alignment. We draft the policies, but they are tuned to your specific organizational constraints." },
    { q: "Who needs to be involved?", a: "Typically the executive team and a board representative. Staff is brought in once the charter and readiness roadmap are established." }
  ];

  return (
    <div className="pt-24 pb-20 md:pt-32">
      <Container>
        <Reveal>
          <div className="max-w-4xl mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary/70 mb-4 block">Mile Marker 01</span>
            <h1 className="font-serif-display text-5xl md:text-6xl lg:text-7xl italic mb-6 text-foreground">
              Foundations
            </h1>
            <p className="lede text-xl md:text-2xl text-muted-foreground leading-relaxed mb-6">
              Your AI policy, governance, and human-readiness, drafted in two weeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Link to="/contact?interest=Foundations" className="btn-pill btn-pill--primary">Start with Foundations</Link>
            </div>
            <div className="flex gap-4 items-center text-sm font-medium uppercase tracking-widest text-foreground">
              <span>2 Weeks</span>
              <span className="text-primary">•</span>
              <span>$5,000</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 italic">Standard engagement. Timeline and scope adapt to your situation.</p>
          </div>
        </Reveal>
      </Container>
      
      <section className="bg-section py-20 border-y border-border">
        <Container>
          <Reveal>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
              <div>
                <h2 className="font-serif-display text-3xl italic mb-6">Why this stage matters</h2>
                <div className="space-y-4 text-[1.0625rem] text-muted-foreground leading-relaxed">
                  <p>
                    Most organizations spend three months arguing about AI policy in circles because no one owns the first draft. The result is a vague statement that neither protects the organization nor empowers the staff.
                  </p>
                  <p>
                    We draft yours in two weeks. Fast, specific, and mission-aligned. You spend the second week reviewing, refining, and ratifying. You exit this stage with a charter your board can actually sign, data hygiene standards that protect your constituents, and a clear set of boundaries for your staff.
                  </p>
                </div>
              </div>
              <div className="bg-card border border-border p-8 rounded-2xl">
                <h3 className="font-semibold text-lg text-foreground mb-6">What's included</h3>
                <ul className="space-y-3">
                  {deliverables.map((item, i) => (
                    <li key={i} className="flex gap-3 text-[1.0625rem] text-muted-foreground"><span className="text-primary">—</span> {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 md:py-28">
         <Container>
            <Reveal>
              <h2 className="font-serif-display text-3xl md:text-4xl italic mb-12 text-foreground max-w-3xl">
                Questions about Foundations
              </h2>
              <div className="max-w-4xl space-y-8">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-card border border-border p-8 rounded-2xl">
                    <h3 className="font-medium text-lg md:text-xl text-foreground mb-4">{faq.q}</h3>
                    <p className="text-muted-foreground leading-relaxed text-[1.0625rem]">{faq.a}</p>
                  </div>
                ))}
              </div>
            </Reveal>
         </Container>
      </section>

      <section className="bg-primary/5 py-20 border-t border-primary/20">
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 block">What happens next</span>
              <h2 className="font-serif-display text-3xl italic mb-6">Move from theory to practice.</h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Once governance is established and constraints are clear, the next step is safely testing the technology against your actual work. The sandbox is ready.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/pathway/lab" className="btn-pill btn-pill--ghost">Explore Mile Marker 02: Lab</Link>
                <Link to="/contact?interest=Foundations" className="btn-pill btn-pill--primary">Ready to start Foundations?</Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
