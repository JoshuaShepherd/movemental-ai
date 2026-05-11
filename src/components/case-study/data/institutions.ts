import type { CaseStudyContent } from "../types";
import { sharedIntroBlocks, sharedClosingSection } from "./shared";

export const institutionsCaseStudy: CaseStudyContent = {
  audience: "institutions",
  hero: {
    kicker: "Case study · An institution",
    title: "Movemental for Institutions.",
    lede: "What happens when a graduate seminary engages the Movemental process — three constituencies (faculty, students, board) drafting and ratifying the same seven decisions in parallel. Reconstructed from common patterns. The process is the actual process.",
  },
  sections: [
    {
      id: "context",
      navLabel: "About this case study",
      heading: "Three case studies — how the Movemental process actually works.",
      body: [...sharedIntroBlocks],
    },
    {
      id: "the-situation",
      navLabel: "The situation",
      heading: "The situation.",
      body: [
        {
          type: "p",
          text: "A graduate institution offering Master of Divinity, Master of Arts, and Doctor of Ministry degrees. Founded in the late 1800s within a mainline Protestant tradition. Around 380 students across residential, hybrid, and fully online programs. Twenty-nine faculty including twenty-two tenured or tenure-track. Accredited by the Association of Theological Schools and a regional accrediting body. Annual operating budget around $18 million. Board of trustees of twenty-four including denomination representatives, alumni, donors, and one student representative.",
        },
        {
          type: "p",
          text: "The president had been thinking about AI for eighteen months. She had read the ATS publications, attended the Atla F[AI]thfully Co-Creating sessions, and begun a conversation with her academic dean about whether the faculty handbook needed AI provisions. What pushed her to act was a specific incident.",
        },
        {
          type: "p",
          text: "A doctoral student submitted a dissertation chapter that, on review, contained substantial AI-generated content that was not disclosed. The student insisted AI assistance had been minor and that disclosure had not been required because the institution had no policy requiring it. The advisor disagreed. The matter went to the academic dean, then the academic standards committee, then back to the president. There was no governance framework to adjudicate the case. The committee recommended revise-and-resubmit with AI use disclosed; the student appealed; the appeal was pending.",
        },
        {
          type: "p",
          text: "The president realized her institution was making AI policy reactively, one case at a time, with no shared framework. She also realized her faculty were doing the same. A senior systematic theology professor had quietly stopped requiring written exams because he could not distinguish AI-generated student responses from authentic ones. A homiletics professor was actively requiring AI use in one assignment as a learning exercise. A New Testament professor was prohibiting AI entirely. There was no faculty consensus, no student-facing clarity, and no institutional governance that connected any of these decisions to anything larger.",
        },
        {
          type: "p",
          text: "She found Movemental through a recommendation from a peer seminary president. The first conversation was an hour. By the end of it, she had decided the institution needed all four stages of the Movemental path, beginning with Safety.",
        },
      ],
    },
    {
      id: "stage-01-safety",
      navLabel: "Stage 01 — Safety",
      heading: "Safety (institutional scope).",
      eyebrow: "Stage 01",
      body: [
        {
          type: "p",
          text: "Institutions are different from churches and nonprofits. They have multiple constituencies that all need to be involved in governance — faculty (whose tenure protects them and whose buy-in cannot be commanded), students (whose enrollment determines viability), and the board and denomination (who hold ultimate authority). A single working team could not produce deliverables that all three constituencies would ratify.",
        },
        {
          type: "p",
          text: "For institutional engagements, Safety expands to a three-track structure. Each constituency forms its own working team. The decisions are drafted by all three teams in parallel, with cross-track integration sessions to reconcile differences before final ratification. The engagement runs six weeks rather than two and is priced at $7,500 — three times the standard Safety price.",
        },
        {
          type: "p",
          text: "The institution engaged Movemental at this scope. Three working teams formed. The Faculty track included the academic dean, three faculty representatives (one from each division — biblical studies, theology, practical theology), and the chair of the faculty senate. The Student track included the dean of students, the student senate president, and two doctoral students selected by the senate. The Administrative track included the chief operating officer, the registrar, the director of admissions, and the director of advancement. The president attended the kickoff, two cross-track integration sessions, and the final ratification.",
        },
        {
          type: "h3",
          text: "Weeks one and two — discovery.",
        },
        {
          type: "p",
          text: "Each track held a two-hour kickoff to surface AI use, concerns, and questions specific to that constituency.",
        },
        {
          type: "p",
          text: "The Faculty track surfaced the deepest tensions. Three faculty members held the position that AI was fundamentally incompatible with theological education, which they understood as a formative practice involving the embodied transmission of tradition from teacher to student. Four faculty members held that AI was a tool students would encounter in ministry and that teaching them to use it well was part of the seminary's responsibility. The remaining faculty were somewhere between. The track facilitator's job was not to resolve this disagreement but to surface it and generate decisions that could function across it.",
        },
        {
          type: "p",
          text: "The Student track surfaced different concerns. Students were less concerned about whether AI use was permitted and more concerned about consistency. Different professors had different rules, often unspoken. Students were anxious about violating policies they did not know existed. The student senate representative was clear: students needed published, classroom-by-classroom AI policies, not a single institution-wide document.",
        },
        {
          type: "p",
          text: "The Administrative track surfaced operational concerns. The admissions team was using AI to draft personalized outreach. The advancement team was using AI to draft donor communications. The registrar's office was facing requests from faculty to use AI in grading and was uncertain how to respond. The COO was concerned about institutional liability if AI use led to a FERPA violation.",
        },
        {
          type: "h3",
          text: "Weeks three and four — drafting and integration.",
        },
        {
          type: "p",
          text: "Three sessions per track plus two cross-track integration sessions.",
        },
        {
          type: "p",
          text: "The integration sessions were the engagement's distinguishing feature. After each track drafted its decisions independently, the integration sessions brought representatives from all three tracks together to reconcile differences. The faculty's preferred Acceptable Use Statement was more restrictive than the administrative track's. The student track's preferred Disclosure Standards were more demanding than the faculty's. The integration sessions did not resolve these tensions by averaging them. They resolved them by identifying which constituency had the strongest claim on each provision.",
        },
        {
          type: "p",
          text: "The Acceptable Use Statement was finalized as a three-section document — one section for faculty and curriculum decisions, one for student academic conduct, one for administrative operations. Each section was internally consistent. The three sections shared common principles but differed in operational specifics.",
        },
        {
          type: "p",
          text: "The Care Boundaries document was different from the church and nonprofit versions. The institution did not have direct pastoral relationships in the same way. Its protected categories were academic and formative. The document named seven categories where AI could not substitute for human judgment — dissertation advising, spiritual formation conversations between faculty and students, admission decisions, scholarship determinations, hiring decisions, tenure decisions, and disciplinary proceedings. The faculty members who had been most skeptical of AI in theological education accepted the document as a workable boundary.",
        },
        {
          type: "p",
          text: "The Disclosure Standards document was shaped most by the student track. It required syllabus-level AI policy disclosure for every course, with three permitted policies (prohibited, permitted with disclosure, required as part of the assignment) and a published rationale for the choice. It required AI use disclosure on any submitted academic work. It required institutional disclosure to accrediting bodies for any AI use that affected student records, financial aid, or academic standing.",
        },
        {
          type: "p",
          text: "The Vendor and Tool Inventory revealed thirty-one AI tools in use across the institution. Sixteen were sanctioned through enterprise site licenses. Fifteen were not. The administrative track committed to authorizing or discontinuing each unsanctioned tool within ninety days.",
        },
        {
          type: "p",
          text: "The Data Handling Protocol addressed FERPA explicitly. Student records could not be processed by any AI tool without an institutional Data Processing Agreement in place. Donor records were subject to the same protection. Faculty research materials and unpublished writing were treated as institutional intellectual property and could not be shared with consumer AI tools. The protocol required outside legal review, which the institution commissioned at $5,000 separate from the Movemental engagement.",
        },
        {
          type: "p",
          text: "The Incident Response Plan was structured around six incident categories, including one specific to higher education — an academic integrity incident involving AI use that escalated to the level of accreditation reporting. A standing AI Incident Response Team was named — the academic dean, the COO, the dean of students, and outside counsel.",
        },
        {
          type: "p",
          text: "The Named Refusals document was the most discussed decision. The faculty senate spent three hours on it. The final document named eight specific applications the institution committed to refuse — AI-generated dissertations or theses presented as student work, AI used to make admission or scholarship decisions, AI used to generate sermons or liturgical materials presented as student or faculty work without disclosure, AI used to assess spiritual formation, AI chatbots impersonating faculty for student engagement, AI used to predict student attrition for resource allocation, AI used to generate fundraising appeals in the personal voice of faculty or alumni, and AI used to deepfake or impersonate any member of the institution's tradition.",
        },
        {
          type: "p",
          text: "The eighth refusal was the one the faculty senate added. They wanted the institution's tradition protected from technological impersonation. The institution publicly committed to never use AI to generate content presenting itself as the voice of any historical figure in its theological lineage.",
        },
        {
          type: "h3",
          text: "Weeks five and six — sequential ratification.",
        },
        {
          type: "p",
          text: "Faculty senate, student senate, administrative council, and finally the board of trustees. Each body received the packet in the form most relevant to it. The faculty senate received the faculty-specific provisions in detail. The student senate received the student-specific provisions. The administrative council received the operations-specific provisions. The board received the complete set with executive summary.",
        },
        {
          type: "p",
          text: "The board ratification meeting included a 45-minute presentation by the president, the academic dean, and the Movemental facilitator. The board voted to ratify all seven decisions unanimously. The board chair specifically commended the Care Boundaries and Named Refusals documents as exemplary.",
        },
        {
          type: "p",
          text: "The engagement closed.",
        },
      ],
    },
    {
      id: "what-the-institution-had",
      navLabel: "What the institution had",
      heading: "What the institution had.",
      body: [
        {
          type: "p",
          text: "Seven decisions, ratified by faculty senate, student senate, administrative council, and the board of trustees. A faculty handbook supplement specific to AI in theological education that was now being shared with ATS as a reference. A student handbook supplement being shared with the institution's accreditation body during its standards review. A public Named Refusals document that would later be requested by eleven peer institutions.",
        },
        {
          type: "callout",
          label: "Engagement",
          title: "Total cost: $12,500 (incl. legal review). Six weeks.",
          body: [
            "$7,500 for Movemental Safety (institutional scope, three tracks)",
            "$5,000 for outside legal review of the Data Handling Protocol",
            "Seven decisions ratified by faculty senate, student senate, administrative council, and the board",
            "Care Boundaries and Named Refusals adopted as public documents",
          ],
        },
      ],
    },
    {
      id: "stage-02-sandbox",
      navLabel: "Stage 02 — Sandbox",
      heading: "Sandbox (institutional scope).",
      eyebrow: "Stage 02",
      body: [
        {
          type: "p",
          text: "Four months after Safety, the institution engaged Movemental for Sandbox at the institutional rate of $60,000 — four times the standard Sandbox price, scoped for the three-constituency working model. The Sandbox engagement focused on twelve specific use cases across faculty teaching, student academic work, and administrative operations. The Use Case Portfolio that resulted became the operational addendum to the institution's AI governance framework.",
        },
      ],
    },
    {
      id: "stage-03-skills",
      navLabel: "Stage 03 — Skills",
      heading: "Skills (network engagement).",
      eyebrow: "Stage 03",
      body: [
        {
          type: "p",
          text: "After Sandbox, the institution engaged Skills as a network engagement — meaning the cohort included faculty from peer seminaries the institution was convening as part of its institutional leadership in the broader theological education space. The network engagement is priced at $200,000 and is being co-funded by a Lilly Endowment grant the institution secured for AI in theological education.",
        },
      ],
    },
    {
      id: "stage-04-solutions",
      navLabel: "Stage 04 — Solutions",
      heading: "Solutions (planned).",
      eyebrow: "Stage 04",
      body: [
        {
          type: "p",
          text: "After Skills completes, the institution will engage Solutions for AI-integrated deployment scoped to the three-constituency working model. The Solutions engagement is expected to be a Configuration D or E deployment in the $300,000–$500,000 range.",
        },
      ],
    },
    {
      id: "what-it-cost",
      navLabel: "What this cost",
      heading: "What this institution will have spent.",
      body: [
        {
          type: "p",
          text: "Approximately $600,000–$800,000 over the multi-year arc. Meaningful institutional investment, but presented to the board by the president as essential infrastructure for the institution's next decade.",
        },
        {
          type: "p",
          text: "The Named Refusals document from Safety has been cited in three peer-reviewed articles on AI in theological education. The Care Boundaries document has been adopted with modifications by two other ATS member schools. The president has spoken at one ATS biennial meeting and one regional gathering. The institution has become, intentionally, a leadership institution for AI governance in theological education.",
        },
      ],
    },
    sharedClosingSection,
  ],
};
