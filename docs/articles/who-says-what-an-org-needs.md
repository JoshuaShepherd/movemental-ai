---
title: "Who Says What an Org Needs: The Real Map of AI Safety Authorities for Nonprofits, Churches, and Institutions"
slug: who-says-what-an-org-needs
shape: methodology
author: Josh Shepherd
audience: [leader, nonprofit, church, institution]
topics: [ssss, ai-governance]
---

# Who Says What an Org Needs: The Real Map of AI Safety Authorities for Nonprofits, Churches, and Institutions

## The question that doesn't have a single answerer

When a nonprofit, church, or mission-driven institution sits down to write its first AI policy, the most useful early question isn't *what should we say?* It is *who is going to ask, and what will they accept as an answer?*

Most leaders cannot name them. They picture "the regulators" — singular, abstract, faintly menacing — and assume that whatever the lawyers eventually approve will be enough. It rarely is. The actual map of authorities who can and will ask is layered, sectoral, and increasingly specific. Some of them have statutory power. Some have only the soft power of withholding accreditation, insurance, grants, or donor goodwill — which, for a 501(c)(3), often turns out to be the harder loss.

The authority a nonprofit is most likely to encounter first is not a federal regulator. It is a board chair who has read one too many articles about director liability and asks a pointed question at the next meeting. The second is usually a grant officer at a foundation whose Q4 reporting template has acquired a new section on "AI use disclosure" no one filled in last year. The third is an insurance underwriter on the renewal call.

This piece is for the leader who has read [Safety Before Speed](./safety-before-speed.md) and [The Work of Safety](./the-work-of-safety.md), nodded at the principle, and now needs to know — concretely — *whose specific question is each line of the documentation actually answering?* Because the Safety stage of the [AI Stewardship Sequence](./the-ssss-framework.md) is not a generic compliance ritual. It is a set of artifacts that have to satisfy a specific, identifiable cast of askers. If you cannot name them, your documentation will look like documentation but read like dressing.

Nothing here is legal advice. Treat it as a map of who is asking, and let your counsel and your sector-specific expertise tell you exactly which questions land on your particular doorstep.

## The four-tier field of authorities

It helps to think of the people who will ask in four tiers, ordered roughly by how loudly they speak and how slowly they arrive.

**Tier 1 — Statutory authorities.** Federal agencies, state attorneys general, foreign data regulators. Slow to arrive, but their arrival is the headline.

**Tier 2 — Standards and accreditors.** NIST, ISO, regional and sectoral accreditors, faith-aligned standards bodies (ECFA, ATS, ACSI). Their power is the conditional power to ratify your legitimacy. They speak through procurement floors and accreditation reviews.

**Tier 3 — Capital gatekeepers.** Insurers, federal grant programs, foundations, denominations that move money. They ask in renewal questionnaires, RFP cover sheets, audit attachments. They are the ones whose questions arrive *every year*.

**Tier 4 — Reputational authorities.** Boards, donors, journalists, congregants, the public at large. No statutory power. Often the most consequential, because they decide whether the institution still has the standing to do its work tomorrow.

A real Safety baseline is documentation that has been imagined into existence with all four tiers in the room.

## Tier 1: Statutory authorities — the ones with subpoena power

### Federal regulators in the United States

Even though "the federal government doesn't regulate AI" is a popular shorthand, it isn't quite right. Existing statutes already reach AI use in nonprofits the moment AI touches the data those statutes already protect. The trigger is the data, not the algorithm.

**HIPAA** (Health Insurance Portability and Accountability Act) reaches every nonprofit, ministry, school clinic, or counseling center that qualifies as a covered entity or business associate. The Security Rule (45 CFR 164) and Privacy Rule already constrain how Protected Health Information may be processed. Pasting a counseling note or a benevolence-fund medical request into a consumer AI tool without a Business Associate Agreement is, in plain reading, an unauthorized disclosure. The Office for Civil Rights at HHS has been clear in 2024 guidance that algorithmic processing of PHI is not exempt from Security Rule analysis. The fact that the AI vendor is "just helping us write" is not the test. The test is whether PHI left your control.

**FERPA** (Family Educational Rights and Privacy Act) reaches every school, college, seminary, and educational ministry that receives federal funds — and "education record" is defined broadly. The U.S. Department of Education's October 2024 guidance on AI in education is explicit: a teacher pasting a graded student essay or an IEP excerpt into a public chatbot creates a likely FERPA disclosure unless the vendor relationship has been structured as a school official under FERPA's exception. Most consumer AI vendors do not meet that bar by default.

**COPPA** (Children's Online Privacy Protection Act) applies whenever a website, app, or AI service collects information from children under 13. A youth ministry that builds a chatbot for kids inherits this whole regime — verifiable parental consent, data minimization, deletion rights — and so does the vendor.

**FTC Act §5** prohibits unfair and deceptive practices, including misrepresentations about AI. The FTC's 2024 "Operation AI Comply" sweep included nonprofits and educational outfits in its enforcement set. Telling donors that "we wrote this thank-you note ourselves" when an LLM did is, under the FTC's stated reading, the kind of deception §5 reaches. So is overpromising the capabilities of an AI program in a fundraising appeal.

**EEOC** (Equal Employment Opportunity Commission) reaches any employer above the relevant size threshold — and Title VII liability follows the use of automated employment decision tools. The 2023 iTutorGroup settlement ($365,000 to applicants screened out by an AI hiring tool that allegedly disfavored older candidates) is the read-across. Nonprofits use the same hiring tools as everyone else; they inherit the same liability surface.

**The IRS** asks the governance question every year on Form 990 Part VI. Lines 11–14 ask whether the organization has written policies and whether the board reviews them — including the conflict-of-interest, document-retention, and whistleblower policies. Form 990 is a public document. The day "AI use policy" or "data governance policy" becomes an explicit checkbox is almost certainly coming. In the meantime, Part VI is the place where a missing AI policy becomes a public absence — readable by donors, journalists, and state regulators who care about governance hygiene.

**OMB and 2 CFR Part 200** (the federal Uniform Guidance) reaches every nonprofit that takes a federal grant, directly or as a sub-recipient. Part 200's internal-controls clause requires "effective control over, and accountability for" all funded activities, including data systems. OMB Memorandum M-24-10 cascades AI risk-management expectations through federal agencies, and those flow downstream to grantees in clauses that have begun appearing in 2024–2026 award terms. A federal program officer who asks "how are you governing AI tools that touch project data?" is not freelancing — they are reading their own agency's guidance.

### State authorities

The state-level layer is the one nonprofit leaders are most likely to underestimate. Federal AI regulation is slow; state AI regulation is already here.

**State attorneys general and charity registration.** Forty-one states require charity registration. Most of those states' nonprofit-act statutes already vest the AG with broad oversight of fiduciary duties — including the duty to maintain reasonable internal controls. A state AG investigating a nonprofit data breach (and most state breach-notification laws give them a lever) does not need a new "AI law" to ask whether the board exercised reasonable oversight.

**Colorado AI Act** (SB 24-205, effective in 2026) is the first comprehensive U.S. state AI law. It applies to "developers" and "deployers" of "high-risk AI systems" making consequential decisions in education, employment, financial services, healthcare, housing, insurance, and government services — all of which include nonprofit deployments. It requires risk management programs, impact assessments, consumer notice, and incident reporting to the AG. Effective date and scope have been adjusted in legislative cycles; check current law. The point: a Colorado-based nonprofit running an AI-assisted scholarship-decision pipeline has a statutory governance burden by 2026.

**NYC Local Law 144** (in effect since July 2023) requires annual independent bias audits and candidate notice for any "automated employment decision tool" used in hiring or promotion of NYC candidates. It applies to nonprofits, ministries, and schools the same as it applies to anyone else. The audit must be by an independent auditor; the summary must be posted on the employer's website. Most nonprofits affected do not know they are affected.

**State comprehensive privacy laws.** A growing list of state privacy laws reach nonprofits: notably Colorado, Delaware, Maryland (Online Data Privacy Act effective October 2025), Minnesota, New Jersey, and Oregon. Several others (California's CCPA/CPRA, Virginia's CDPA, Utah's UCPA, Connecticut's CTDPA, Texas's TDPSA) currently exempt many nonprofits but include narrower exceptions; the trend is clearly toward inclusion. California's Privacy Protection Agency in 2024–2025 advanced rulemaking on Automated Decision-Making Technology (ADMT) that, when finalized, will reach any covered entity using AI for significant decisions about Californians.

**Washington's My Health My Data Act** (effective March 2024) reaches nonprofits and small entities the federal HIPAA framework misses. A church wellness program, a faith-aligned counseling collective, or a ministry that collects mental-health-adjacent data on Washington residents now has obligations under MHMDA that look very much like HIPAA — including authorization for AI processing.

**Illinois Biometric Information Privacy Act (BIPA)** has produced eye-watering damages awards. Any nonprofit using facial recognition for security, fingerprint timekeeping, or voice analysis in Illinois can be exposed under BIPA. A youth-program sign-in app that quietly invokes face-matching is exactly the use case that has cost organizations millions.

**State data breach notification laws** all 50 states have them. They define what a breach is, the timing of notification, and the cost of getting it wrong. AI tools are a recognized vector — both for unauthorized disclosure (data flowing to a vendor without contract) and for the kind of attack that targets prompt engineering and retrieval pipelines.

### International regulators

If your nonprofit, ministry, or school touches anyone in the European Union, the United Kingdom, or — increasingly — Brazil and several other jurisdictions, you have an international layer.

**The EU AI Act** (Regulation (EU) 2024/1689) entered into force August 1, 2024. Prohibitions on certain practices took effect in February 2025. Obligations on general-purpose AI providers landed in August 2025. The full high-risk regime applies in 2026. Its territorial reach extends to any provider or deployer whose AI output is used in the EU — which can include a U.S. ministry running an automated translation service used by European partners. Penalties scale up to 7% of global annual turnover.

**GDPR**, sixteen years into its run, still sets the global floor. Any U.S. nonprofit with a European mailing list, a partnership office in Brussels, or a missionary email roster is a GDPR data controller. AI processing constitutes "processing" under GDPR; lawful basis, data subject rights, automated-decision rules (Article 22) and Data Protection Impact Assessments all apply. The point is not the fine — the point is that one Subject Access Request from a European member can force you to produce, in 30 days, exactly the kind of inventory the Safety stage already calls for.

**UK GDPR** runs in parallel post-Brexit; the ICO has issued AI-specific guidance.

**LGPD** (Brazil) reaches missions and partner organizations operating with Brazilian data subjects.

The takeaway across Tier 1: there is no single statute called "the nonprofit AI law" — which is precisely why so many leaders read the field as quiet. It is not quiet. It is composite. The data that flows into your AI tools is already covered, in pieces, by laws you already operate under.

## Tier 2: Standards and accreditors — the conditional gatekeepers

These bodies cannot fine you. They can decide whether you are the kind of organization their constituents trust to handle the work.

### NIST and ISO — the floor of professional practice

**NIST AI Risk Management Framework 1.0** (January 2023) and the NIST Generative AI Profile (NIST AI 600-1, July 2024) have become the de facto reference for any procurement officer who asks how AI risk is managed. NIST is voluntary in name; in practice, federal agencies, large foundations, and increasingly nonprofit insurers point to it as the floor. It is structured as four functions — Govern, Map, Measure, Manage — which align almost exactly with the SSSS Safety stage's four artifacts. If your governance baseline cannot be cross-walked to NIST AI RMF on one page, expect questions.

**ISO/IEC 42001:2023** is the international management-system standard for AI. It is the AI cousin of ISO 27001 (information security) and 9001 (quality). Larger nonprofits, hospitals, and faith-aligned universities are starting to certify. The standard requires: policy and objectives, risk and impact assessment, controls including over training data and human oversight, internal audit, and management review. For most small nonprofits, full certification is not the goal — but the standard's structure tells you what a sophisticated counterparty expects you to have *thought through*.

### Higher-ed and seminary accreditors

**SACSCOC, HLC, MSCHE, NWCCU, NECHE, WSCUC** — the regional accreditors of U.S. higher education — have all issued AI guidance between 2023 and 2025. None of them yet treat AI governance as a standalone standard, but several have explicitly mapped it under their existing standards on integrity, institutional effectiveness, and information resources. A college that cannot answer questions about academic-integrity AI policy, faculty AI training, and student-record protection in its next reaffirmation review will face follow-up.

**The Association of Theological Schools (ATS)** revised its standards in 2020 (with subsequent updates) and has issued AI-specific guidance for member seminaries. The Standards' Section 3 (Library and Information Resources) and Section 4 (Personal and Vocational Formation) both bear directly on how seminaries deploy AI in teaching and formation. ATS expects governance, not enthusiasm.

**ACSI** (Association of Christian Schools International), **ACTS** (Association of Classical Christian Schools), and similar K–12 accreditors have begun issuing AI-policy expectations for accredited schools and asking about them in re-accreditation cycles.

### Faith-aligned standards bodies

**ECFA** (Evangelical Council for Financial Accountability) currently includes seven standards focused on financial integrity, governance, and transparency. Standard 2 (Governance) is the load-bearing one for AI: it requires an active, independent governing body that fulfills its responsibilities. The ECFA has not (as of 2026) issued a separate AI standard, but its 2024–2025 communications make clear that AI governance is part of what diligent oversight looks like. ECFA member organizations should expect questions in upcoming review cycles.

**The BBB Wise Giving Alliance** maintains the 20 Standards for Charity Accountability. Standard 1 (Oversight of Operations and Staff) and Standards 12–15 (truthful and accurate representations) both bite on AI. A misleading AI-generated impact statistic or an AI-mediated solicitation that misrepresents program scope is a Standard 12 problem.

**Charity Navigator's Encompass Rating** and **Candid (formerly GuideStar) Seal of Transparency** both score governance practices. Public absence of an AI policy is increasingly going to read as a governance gap.

**Denominational and faith-tradition bodies.** The Vatican's January 2025 *Antiqua et Nova* (a joint document of the Dicastery for the Doctrine of the Faith and the Dicastery for Culture and Education) is the most theologically substantive Catholic guidance on AI to date. Several Protestant denominations — the United Methodist Church, ELCA, PCUSA, the Southern Baptist Convention through resolutions — have issued their own statements between 2023 and 2025. Where a denomination has spoken, member churches and ministries can and will be asked whether their practice aligns. This is not law. It is canopy. A church operating under denominational discipline borrows legitimacy from that canopy and is accountable when its practice diverges from it.

## Tier 3: Capital gatekeepers — the askers who arrive every year

This is the layer most leaders feel first, because it is the layer that bills.

### Insurers

**Directors and Officers (D&O) liability** policies have, since 2023, increasingly included questions about AI use in renewal applications. Several major carriers have introduced AI-specific exclusions or sub-limits. Marsh, Aon, and Willis Towers Watson have all published 2024–2025 renewal advisories noting that AI governance documentation is now a underwriting input. A nonprofit that cannot describe its AI policy on the renewal questionnaire risks higher premiums, lower limits, or — in the worst case — exclusion of AI-related claims from coverage.

**Cyber liability** carriers have moved faster. Most 2025 renewal applications now include a dedicated AI section. Coverage for AI-related incidents (prompt injection, data poisoning, model exfiltration) is being conditioned on documented controls. The pattern is: written policy, named owner, training records, vendor inventory, incident plan, audit cadence. That is, in essence, the SSSS Safety baseline.

**Faith-aligned carriers** — Brotherhood Mutual, Church Mutual, GuideOne, Philadelphia Insurance, Markel — write a large share of nonprofit and church coverage in the United States. Each has issued AI advisories to policyholders between 2023 and 2026. For a church or ministry, the carrier's questionnaire is often the most concrete authority that will arrive this year.

**Abuse and misconduct riders** are particularly sensitive. The combination of AI use, pastoral or counseling-adjacent communications, and minor-program data is exactly where carriers ask the sharpest questions. A church that uses AI to draft pastoral correspondence without a documented policy and an incident plan is not just risking reputational damage — it is risking the most expensive line on its insurance schedule.

### Federal grants and the Uniform Guidance

**2 CFR Part 200** requires effective internal controls over federal awards, with explicit references to information system controls. The 2024 OMB revisions tightened expectations. Federal grant audits (Single Audit / Yellow Book) reach the IT and data-governance layer. AI tools in the funded workflow are inside the audit scope.

Specific federal programs have begun to add AI clauses directly. The Department of Education, HHS sub-agencies, and several DOJ programs in 2024–2026 issued grant terms requiring documented AI use disclosure, human-in-the-loop attestations for consequential decisions, and conformance with relevant privacy statutes. A grantee who relies on AI in proposal writing or impact reporting without disclosure is at risk of a finding.

### Foundations and major-donor advisors

Major private foundations — Hewlett, Ford, MacArthur, Mellon, Rockefeller, Robert Wood Johnson, Knight, several large faith-aligned funders — began including AI use disclosure questions in 2024–2025 reporting templates. Donor-advised fund sponsors (Fidelity Charitable, Schwab Charitable, Vanguard Charitable, the National Christian Foundation) have updated grant-recommendation diligence materials in similar directions.

The pattern is again procedural: name the policy, name the owner, name the controls, describe the human review on consequential decisions. A grantee whose answer is "we haven't gotten to that yet" is not yet disqualified. They are, however, a more difficult renewal.

### Denominations and parent bodies that move money

For affiliated churches, ministries, and schools, the denomination or parent body is often the most relational of all the askers. A regional bishop, a presbytery, a convention's executive committee, or a denominational publishing house can all ask AI-governance questions in ways that are formally soft and operationally consequential. Subsidies, shared infrastructure, ordination eligibility, and brand association all sit on these relationships.

## Tier 4: Reputational authorities — the ones who don't need a statute

This is the layer the SSSS framework calls the *ambient authority*. No subpoena power. No clipboard. Just the ability to decide whether the institution has the standing to keep doing what it does.

**The board.** Under most state nonprofit corporation acts, the board owes the duty of care, the duty of loyalty, and — increasingly — the duty of oversight as articulated in the *Caremark* line of Delaware decisions and its analogs in other states. *In re Caremark International* (1996) held that directors have an affirmative obligation to ensure information and reporting systems exist for compliance. *Marchand v. Barnhill* (Del. 2019) expanded the doctrine to mission-critical risks. Subsequent cases — Boeing's 737 MAX shareholder derivative litigation, *In re McDonald's Corp. Stockholder Derivative Litigation* (Del. Ch. 2023) — extended the duty to officers and to "central compliance risks." Nonprofit boards are not exempt from analogous fiduciary scrutiny under state nonprofit-corporation law (e.g., NY N-PCL Article 7, CA Corp. Code §5231, IL 805 ILCS 105/108).

The practical implication: a board that has never asked about AI governance in the minutes, when AI has demonstrably entered the operations, has a defense problem if something goes wrong. The minutes are the discovery surface. *We did not know* is no longer a defense for a risk this widely covered in the trade press.

**Donors.** The shift here is informal and cumulative. Major donors increasingly read 990s, scan governance pages, and ask in cultivation conversations whether the nonprofit has thought about AI. The donor who walks because the answer is incoherent doesn't write a complaint. They simply give the next gift somewhere else. This is the most expensive authority of all, and the only one with no formal asker.

**Journalists.** A regional paper that finds out a church used AI to write condolence letters, a university paper that finds out an admissions office is using algorithmic screening, a national outlet that finds a fundraising appeal copied from an AI tool's training data — these stories run weekly now. The reputational damage is asymmetric: weeks to inflict, years to repair.

**Congregants, members, students, the public.** This is the authority whose question rarely arrives in writing. It arrives in withdrawal — of trust, attendance, enrollment, recommendation. It is the authority Safety is most fundamentally for, because the others can be argued with. This one cannot.

## What happens if you do nothing — five played-out scenarios

Risk lists feel abstract. Scenarios show what the lists actually mean. None of these is a guess; each is a composite of patterns documented in 2023–2026 trade press, court filings, regulator advisories, and insurance underwriting bulletins. They are written not to alarm but to make the cost legible.

### Scenario 1: The grant reporting field that wasn't there last year

A mid-sized human-services nonprofit takes a federal sub-grant through a state pass-through entity. In the FY26 reporting cycle, the pass-through introduces a new attachment: an AI Use Attestation. Three checkboxes, four free-response fields. *Do you use AI tools in the project? Have those tools been reviewed against your written AI policy? Who is the named accountable owner? Describe controls for project-data exposure.*

The development director answers the first two honestly: *yes; no, we don't have a written policy yet*. The state agency replies that the response is non-conforming and asks for a corrected attestation within 30 days. The director, under deadline, copies a generic template from a peer organization and fills it in. The auditor in the Single Audit notices that the policy referenced in the attestation does not appear to exist as a board-approved document. The finding is not catastrophic — a corrective action plan, not a clawback — but it is documented in the federal audit clearinghouse and visible to every funder running due diligence on the organization for the next three years.

The cost is not the finding. It is the way the finding shows up in the next foundation diligence call. The program officer mentions it in passing. The executive director spends the next forty-five minutes explaining why a procedural lapse is not a substantive risk. They get the grant. They spend the renewal cycle re-explaining.

### Scenario 2: The pastoral note that went somewhere it shouldn't

A church staff member is drafting a sensitive pastoral letter to a member walking through a divorce. She uses a consumer AI tool — the church has no policy forbidding it; she's been told it's "fine for first drafts." She pastes in three paragraphs of context, including the member's name, the marital situation, and a reference to the spouse's mental health.

Six weeks later, the church learns that the tool's terms of service permit user inputs to be retained and used for model improvement. The church's IT volunteer, doing a quiet audit, discovers the staff member is one of nine people on staff who have been using the tool the same way. Several have pasted donor health information; one has pasted the names of children in the church's kids' program in the context of a behavioral concern.

The church now has, simultaneously: a HIPAA-adjacent disclosure (if any of the recipients qualified the church as a covered entity), a likely Washington MHMDA issue (one member is a Washington resident), a clergy-confidence breach in a state where the privilege has been litigated, a probable violation of the church's own membership covenant on confidentiality, a notice obligation under the state breach-notification statute, and an insurance reporting obligation under the abuse-and-misconduct rider.

There is no headline. There is, instead, a quiet conversation with denominational leadership, a conversation with the insurance carrier in which the next renewal is conditioned on a written AI policy and proof of training, a conversation with the affected members (some of whom leave the church), and a conversation with the counsel hired to advise on whether any of the disclosures triggered notification. The total cash cost is in the low six figures. The pastoral cost is incalculable.

In the version of this story where the church had run the SSSS Safety stage to completion eight months earlier, the staff member's first draft never went into the consumer tool. The boundary was published. The training was done. The pastor on the other side of the desk had something concrete to say when she paused at the AI button.

### Scenario 3: The hiring pipeline that flunked the audit

A faith-aligned college runs a small career-services AI tool that scores applicant essays for a scholarship program. The tool was set up by an enthusiastic staff member two years ago. Nobody on the senior team can describe how it scores.

In the spring, an unsuccessful applicant — a Colorado resident — files a complaint with the state attorney general under the Colorado AI Act, which has just gone fully into effect. The complaint alleges that the system is a "high-risk AI system" making consequential decisions in education without the required risk management program, impact assessment, or consumer notice.

The college doesn't believe the law applies to its scholarship workflow. The AG's office disagrees and asks for the impact assessment, the system documentation, the bias testing, and the consumer notice. The college has none of these. The college's outside counsel quotes a six-figure remediation engagement. The trustees ask, at the next board meeting, why the institution did not have a written AI policy two years ago when this tool was deployed.

The complaint settles; no penalty is assessed; the college changes vendors. The settlement is reported to the regional accreditor as part of the next interim report. The accreditor opens a focused review on institutional effectiveness and information resources. The college's president spends the following year writing reports.

### Scenario 4: The board minutes that didn't ask the question

A national ministry's CFO discovers that a development associate has used an LLM to draft a major-donor proposal, and that the proposal cites a program impact statistic the LLM appears to have hallucinated. The proposal is in the donor's hands. The donor, a sophisticated philanthropist, runs the cited stat and finds it doesn't match the ministry's own annual report.

The donor doesn't pull the gift. They send a polite email to the chair of the board asking whether the ministry has a policy on AI-generated representations to donors. The chair forwards it to the executive director. The executive director cannot cite a board-approved policy, because no such policy exists, and the minutes for the prior eighteen months show no AI discussion at the board level.

The donor closes their giving relationship. Two other donors who shared the same advisor reduce their commitments. The board, in the following meeting, moves to retain governance counsel to draft an AI policy and to review whether the duty-of-oversight standard under state nonprofit law has been met. The audit committee is now an active body again. The chair sleeps poorly.

The legal exposure here is small; the *Caremark* duty as applied to nonprofit boards is rarely litigated. The reputational and capital exposure is large. Either is enough.

### Scenario 5: The accreditor's question with no good answer

A seminary's reaffirmation review with the Association of Theological Schools includes, for the first time, a focused conversation about AI use in formation, teaching, and library research. The review team asks how the seminary has aligned AI use with the Standards' commitments to personal and vocational formation, academic integrity, and information resources stewardship.

The seminary president has talking points. He does not have a policy. He has heard one of the tenured professors give chapel addresses about AI but has not seen anything in writing from the academic dean. The review team asks for the written policy and the faculty handbook section. He asks the dean during the lunch break. The dean tells him, honestly, that there isn't one yet — the curriculum committee has been "discussing it for the past year."

The accreditor doesn't sanction. They issue a recommendation. The recommendation appears in the public action letter. The next admissions cycle, two prospective students cite the action letter in declining offers. The trustees, who had been comfortable, are no longer comfortable. The president now has a year to produce what should have taken eight weeks.

## What the Safety stage is actually accounting for — the failure-mode catalog

Each of the scenarios above touches a specific failure mode that the documented Safety baseline is meant to head off. The full catalog is longer than most leaders realize.

**Disclosure failure.** Sensitive data leaves the organization's control through an AI tool whose terms permit retention or training. The fix is the data inventory (Move 4 in [The Work of Safety](./the-work-of-safety.md)), the tier policy (Move 5), the configured platform (Move 7), and the trained staff who know which tier the data lives in.

**Authorship and provenance failure.** AI-generated content goes out under the organization's name in contexts where attribution and human authorship matter — pastoral letters, donor thank-yous, board statements, grant narratives, public preaching. The fix is the boundaries layer plus the AUP (Move 6), naming categories that are never machine-drafted and categories that require human review.

**Hallucination and false-statement failure.** AI-generated content asserts facts that do not check out — invented statistics, fabricated citations, misquoted scripture, mis-stated program outcomes. *Mata v. Avianca* (S.D.N.Y. 2023) is the public marker; the same dynamic operates in grant proposals, board memos, and impact reports. The fix is the boundaries layer's "human review required" tier on outward-facing fact claims and the training that makes verification a default rather than a courtesy.

**Bias and discrimination failure.** AI hiring, scholarship, admissions, or program-eligibility tools produce disparate outcomes that violate Title VII, ADA, ADEA, the Fair Housing Act, or the Colorado AI Act. The fix is impact assessment before deployment, audit during operation, and the procedural commitment that no automated system makes a final consequential decision without human accountability.

**Confidentiality failure (relational).** Counseling-adjacent, pastoral, HR, or whistleblower content enters a tool whose privacy posture cannot bear it. The fix is the "never automate" list — explicit, named, written, posted.

**Confidentiality failure (legal).** Privileged or protected communications (clergy-penitent, attorney-client, doctor-patient, social-worker-client, peer-support) enter AI processing in ways that may waive privilege. The fix is sector-specific guidance written into the AUP and confirmed with counsel.

**Vendor and supply-chain failure.** A new AI feature is added to an existing SaaS tool the organization already pays for, without re-evaluating data flows. Calendar tools, CRMs, helpdesks, sermon-prep platforms, ChMS systems all do this. The fix is the connector inventory (Move 7) and the recurring review (Move 13).

**Documentation failure.** The org cannot produce, on request, the policy, the training records, the data inventory, the audit log, the connector list, the incident register, or the meeting minutes that show governance is alive. This is the failure mode that turns ordinary incidents into legal events. The fix is the central, accessible, dated, versioned source of truth (Move 9 + Move 14).

**Cultural failure.** Staff infer from leadership behavior that AI use is unbounded, or — equally bad — that AI use is forbidden in a way that drives shadow adoption. The fix is the executive sponsorship (Move 1), the leadership-authored statement (Move 3), and the visible audit cadence (Move 13).

**Mission-fit failure.** AI use, even when legally clean, produces outputs that betray the organization's voice, its commitments, its character. This is the failure that no regulator will catch and that the institution's people will feel first. The fix is the conviction layer (Move 2) — the line that says *for us, that would be crossing a line because…*

A useful exercise: take your last six months of staff communications, fundraising, and program outputs, and walk each failure mode back to the line in the AUP that would have prevented it. The lines that aren't there yet are the lines you owe.

## What documentation actually has to do — the five-binder test

A pragmatic way to test the Safety baseline: imagine five visitors arriving at your office in the same week. Each one wants something different. Each one is the spokesperson for one of the tiers above.

**Visitor 1: The state AG investigator.** Triggered by a complaint or a breach notification. Wants: the written policy, dated and board-approved; the data-inventory; the breach-notification procedure; the training records; the incident register. Is it produced from a single source, in one binder, in under an hour?

**Visitor 2: The accreditor's focused-review team.** Wants: the policy, plus its mapping to the relevant standards; the faculty/staff handbook; the curriculum or formation alignment; the audit cadence; the leadership statement; the evidence of board oversight. Is the binder ready, or is it a scramble?

**Visitor 3: The insurance underwriter.** Wants: the policy; the named accountable owner; the controls list (SSO, audit log, retention, vendor inventory); the training rate; the incident plan; the audit schedule. Renewal hinges on the answers.

**Visitor 4: The grant officer or major-donor advisor.** Wants: the policy in plain language; the public posture statement; the impact-and-AI use disclosure; the example of human review on consequential decisions; the explicit treatment of mission-aligned values. Their language is "transparency" and "stewardship."

**Visitor 5: The board chair.** Wants: a one-page summary they can defend in a deposition. Wants the minutes that show the question was asked and answered. Wants, most of all, to know that the institution will not be the cautionary tale.

All five visitors should leave with the same documentation, framed five different ways. The binder is one binder. It is the SSSS Safety baseline.

If the documentation fails any of the five — if the AG investigator finds gaps, if the accreditor finds the policy is unmapped, if the underwriter finds no audit cadence, if the grant officer finds no public statement, if the chair finds no minutes — then the Safety stage is not yet done, regardless of how thick the binder is.

## The shape of the work — and why doing nothing is not free

The temptation, reading the field of authorities laid out this way, is to file it under *not yet*. The prohibitions in the EU AI Act feel far away. The Colorado AI Act may not reach your operations. The accreditor's review is two years out. The donor advisor only asks polite questions.

Each individual deferral is rational. The aggregate is the trap. The point of mapping all four tiers is that they do not arrive in sequence. They arrive in parallel, on schedules you do not control, often in the same six-month window. The grant cycle, the insurance renewal, the accreditor's site visit, the board's annual review, the funder's diligence call — they were already scheduled. AI did not add them to the calendar. It only added a question to the script of each one.

Doing the Safety stage now is the cheapest version of the work. Doing it during an incident is the next cheapest. Doing it under a regulator's letter is the most expensive. The same documents are produced either way; only the conditions of their writing change.

There is also a kind of quiet cost that no risk register captures. An organization that cannot answer who asks is an organization whose people are guessing. Guessing breeds two failures simultaneously: the cautious staff member who freezes, and the confident one who experiments without bounds. Both are downstream of the same absent center. The Safety baseline is not, in the end, a defense against authorities. It is the gift the institution gives its own people: a frame in which work can move without anyone's instincts having to be the last line of defense.

The five visitors will arrive, on their own schedules, whether or not the binder is ready. The work of Safety is to answer them before they ask.

---

*This is a companion piece to [Safety Before Speed](./safety-before-speed.md) and [The Work of Safety](./the-work-of-safety.md). For the operational checklist that produces the binder described above, see [The AI Stewardship Sequence as Operational Infrastructure](./the-ssss-journey-assessment-checklist.md). For a worked example of one organization moving through the sequence, see [Case Study: Youthfront](./case-study-youthfront.md).*

*Nothing in this piece is legal advice. Statutes, regulations, accreditor standards, and insurance practices change; specifics depend on jurisdiction, sector, and operational facts. Use this as a map of the terrain. Walk the actual ground with counsel and sector-expert advisors who know your particular case.*
