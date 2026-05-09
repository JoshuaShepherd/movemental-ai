import type { CaseStudyContent } from "../types";
import { sharedIntroBlocks, sharedClosingSection } from "./shared";

export const churchesCaseStudy: CaseStudyContent = {
  audience: "churches",
  hero: {
    kicker: "Case study · A church",
    title: "Movemental for Churches.",
    lede: "What happens when a multisite church of 1,400 weekend attenders engages the Movemental process — from the first 30-minute call through ratified governance, sandbox exploration, and a formed staff. Reconstructed from common patterns. The process is the actual process.",
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
          text: "A multisite church of about 1,400 weekend attenders. Three campuses. Twenty-eight staff. The senior pastor has led the church for over a decade. The executive pastor manages day-to-day operations. The elder team meets monthly. The church has a strong reputation for theological seriousness and genuine disciple-making.",
        },
        {
          type: "p",
          text: "The problem began the way these problems usually begin. Staff started using AI tools individually. Some were using AI for sermon preparation. Some were using it to draft donor and member communications. One associate pastor used AI to draft a response to a grieving family, then second-guessed whether that was the right thing to do. A volunteer set up an unauthorized chatbot trained on the senior pastor's sermon archive and was using it to answer congregant questions through an unofficial channel.",
        },
        {
          type: "p",
          text: "The executive pastor knew some of this was happening. She suspected more was happening that she did not know about. The elder chair raised AI at a board meeting and asked what the church's position was. She did not have one.",
        },
        {
          type: "p",
          text: "She began looking for help. After a recommendation from another pastor, she found Movemental and scheduled a 30-minute call.",
        },
      ],
    },
    {
      id: "stage-01-safety",
      navLabel: "Stage 01 — Safety",
      heading: "Safety.",
      eyebrow: "Stage 01",
      body: [
        {
          type: "p",
          text: "The first conversation with Movemental was not a sales call. It was an honest conversation about what was happening at the church and what the executive pastor was trying to solve. By the end of the call, she understood three things. First, what she was facing was not unusual — most churches in 2026 are facing the same situation. Second, there was a structured process that produced a defensible answer in two weeks. Third, the cost was $1,000.",
        },
        {
          type: "p",
          text: "She decided to proceed. The senior pastor approved without hesitation. The engagement began two weeks later.",
        },
        {
          type: "h3",
          text: "Week one, day one — kickoff.",
        },
        {
          type: "p",
          text: "A 90-minute video call with a working team of four — the executive pastor, the communications director, the associate pastor most enthusiastic about AI, and the operations lead most skeptical of it. The senior pastor and the elder chair joined for the first 20 minutes and then left the working team to do its work.",
        },
        {
          type: "p",
          text: "The Movemental facilitator opened with three questions. What AI use is happening at your church right now that you know about? What do you suspect is happening that you don't know about? What questions are your staff and elders bringing to you that you currently can't answer?",
        },
        {
          type: "p",
          text: "The team filled a whiteboard. By the end of 90 minutes, they had named twelve specific use cases currently in play — sermon prep, email drafting, social media copy, the unauthorized chatbot, image generation, transcription of pastoral conversations, document summarization, biblical research, song selection, newsletter drafting, counseling preparation, and AI-generated condolence notes. They had also identified the specific concerns the elders had raised that needed answers.",
        },
        {
          type: "p",
          text: "The facilitator did not give them answers. She gave them homework. Each team member would write a one-paragraph response to a single question before the next session: What is the church's responsibility to the people we serve when AI is involved in our communication with them?",
        },
        {
          type: "h3",
          text: "Week one, drafting session one.",
        },
        {
          type: "p",
          text: "The team came back with their paragraphs. The four answers were different but compatible. The associate pastor emphasized AI as a tool that could free pastors for higher-value relational work. The operations lead emphasized the irreducible humanity of pastoral ministry. The communications director focused on transparency. The executive pastor centered on staff equity — different staff making different decisions was itself a problem.",
        },
        {
          type: "p",
          text: "The facilitator's job was not to pick between these views but to identify what they shared. All four agreed the congregation deserved to know when AI was involved in communication with them. All four agreed pastoral relationships had a category of intimacy that required protection. All four agreed the current situation was untenable. The differences were about implementation, not principle.",
        },
        {
          type: "p",
          text: "In that session, the team produced first drafts of two artifacts. The Acceptable Use Statement named what AI may and may not do at the church — broadly permissive for back-office work, sharply restrictive for direct pastoral correspondence and sermon authorship. The Care Boundaries document named four categories where AI could not be used at all — grief and bereavement communication, marriage and family counseling, baptism and membership conversations, end-of-life pastoral care.",
        },
        {
          type: "p",
          text: "The unauthorized chatbot was discussed at length and shut down by week's end. The volunteer who had built it was thanked, redirected, and given a path to propose a sanctioned version through proper channels later.",
        },
        {
          type: "h3",
          text: "Week one, drafting session two.",
        },
        {
          type: "p",
          text: "Disclosure Standards and the Vendor and Tool Inventory.",
        },
        {
          type: "p",
          text: "Disclosure was the most contested artifact. The team disagreed about whether the congregation needed to know every time AI was used in any communication or only in specific categories. After 45 minutes of discussion, they landed on the principle: disclosure is required whenever AI substantially shapes content the congregation receives as the personal voice of a staff member. A sermon that used AI for research and outlining did not require disclosure. A sermon that used AI to write significant prose did. An email that used AI to clean up grammar did not. An email that used AI to generate the substance did.",
        },
        {
          type: "p",
          text: "The Vendor and Tool Inventory was straightforward. The team listed every AI tool currently in use, who was using it, what data was being shared with it. The list was longer than they expected. Several tools were on it that no one in leadership had known about. Two were removed immediately for failing the data-handling standard the team was about to draft.",
        },
        {
          type: "h3",
          text: "Week two, drafting session three.",
        },
        {
          type: "p",
          text: "The Data Handling Protocol, the Incident Response Plan, and the Named Refusals.",
        },
        {
          type: "p",
          text: "The Data Handling Protocol set the rules for what data could be shared with AI tools, by whom, under what circumstances. Pastoral conversation transcripts could not be uploaded to any AI tool. Member directory information required specific written permission. Financial and giving data were entirely off-limits. Sermon transcripts and teaching content could be used freely in tools the church controlled.",
        },
        {
          type: "p",
          text: "The Incident Response Plan named what to do when AI produced something harmful, inaccurate, or inappropriate. The team identified four scenarios — content with errors that reached the congregation, staff use that violated policy, an external AI deepfake targeting leadership, and a data breach involving an AI tool. For each, the plan named the first three actions to take and who was responsible.",
        },
        {
          type: "p",
          text: "The Named Refusals document was the artifact the senior pastor most wanted to be involved in. He joined this session. The team named six specific applications of AI the church committed to refuse on principle, regardless of pressure — AI-generated sermons delivered without disclosure, AI chatbots impersonating pastoral staff, AI-generated images of biblical figures presented as real, AI used to surveil congregant attendance or giving, AI used to generate fundraising appeals in the personal voice of pastoral staff, and AI used to replace prayer in any form.",
        },
        {
          type: "p",
          text: "The senior pastor said later that this was the conversation he had been wanting to have with his team for a year and had not known how to begin.",
        },
        {
          type: "h3",
          text: "Week two, review and ratification preparation.",
        },
        {
          type: "p",
          text: "The team reviewed all seven artifacts as a complete document. The executive pastor identified language that needed tightening. The team resolved one place where two artifacts appeared to contradict each other by clarifying that Care Boundaries took precedence over Acceptable Use in any conflict. They agreed the Named Refusals would be made public on the church website alongside an accessible version of the Acceptable Use Statement.",
        },
        {
          type: "h3",
          text: "Week two, final day — handoff.",
        },
        {
          type: "p",
          text: "The Movemental facilitator walked through the seven artifacts with the senior pastor, the executive pastor, and the elder chair. She confirmed completion. She delivered a Sandbox Readiness Assessment showing the church was ready to begin Sandbox work in the next six months if they chose to. The engagement closed.",
        },
      ],
    },
    {
      id: "what-the-church-had",
      navLabel: "What the church had",
      heading: "What the church had, two weeks in.",
      body: [
        {
          type: "p",
          text: "Seven artifacts, ratified by the elder team at the next monthly meeting. A staff that had worked through actual disagreements rather than hiding them. A congregation that would be told, going forward, when AI substantially shaped content they received. The unauthorized chatbot was gone. Two unsanctioned vendors were gone. The Care Boundaries were public.",
        },
        {
          type: "callout",
          label: "Engagement",
          title: "Total cost: $1,000. Total elapsed time: 16 days.",
          body: [
            "Acceptable Use Statement",
            "Care Boundaries",
            "Disclosure Standards",
            "Vendor and Tool Inventory",
            "Data Handling Protocol",
            "Incident Response Plan",
            "Named Refusals",
          ],
        },
      ],
    },
    {
      id: "stage-02-sandbox",
      navLabel: "Stage 02 — Sandbox",
      heading: "Sandbox.",
      eyebrow: "Stage 02",
      body: [
        {
          type: "p",
          text: "Three months later, the executive pastor came back to Movemental. The Safety artifacts had surfaced about a dozen specific AI use cases the team wanted to explore further but had not been ready to commit to during Safety. They wanted facilitated space to test them — to actually try the use cases, evaluate them honestly, and decide whether to deploy, modify, or refuse each one.",
        },
        {
          type: "p",
          text: "This is what Sandbox is for. Sandbox is four weeks of disciplined exploration of AI use cases, in a controlled environment, without the risk of public deployment or data exposure. The church engaged Movemental at the standard $15,000 rate.",
        },
        {
          type: "p",
          text: "Over four weeks, the team worked through the use cases methodically. Each use case got a structured evaluation — what it would do, what it would cost, what risks it carried, what alternatives existed. By the end of Sandbox, the team had a Use Case Portfolio with three categories: green-light (deploy with the existing artifacts as guardrails), yellow-light (deploy after additional work or staff training), and red-light (refuse, with the reasons documented). Of the twelve use cases that entered Sandbox, four came out green, five yellow, and three red.",
        },
        {
          type: "p",
          text: "The three red-lighted use cases were added to the Named Refusals document. The five yellow-lighted use cases became the agenda for the church's next stage.",
        },
      ],
    },
    {
      id: "stage-03-skills",
      navLabel: "Stage 03 — Skills",
      heading: "Skills.",
      eyebrow: "Stage 03",
      body: [
        {
          type: "p",
          text: "Six months after Safety completed, two staff members enrolled in Movemental's Skills cohort. Skills is an eight-week formation experience — six weeks of cohort work plus two weeks of integration back into the organization — that produces leaders, not just users. The church paid the cohort fee for both staff members.",
        },
        {
          type: "p",
          text: "The associate pastor and the communications director went through the cohort together. They came back at the end able to lead AI conversations with other staff, to draft AI policy revisions when the church updated its artifacts the following year, and to mentor other staff in using AI tools well. They became the church's internal capacity for what had previously required outside facilitation.",
        },
      ],
    },
    {
      id: "stage-04-solutions",
      navLabel: "Stage 04 — Solutions",
      heading: "Solutions (not yet).",
      eyebrow: "Stage 04",
      body: [
        {
          type: "p",
          text: "The church has not yet engaged Solutions. The senior pastor has said publicly that he wants the church to live with the artifacts and the formed leaders for a full year before deciding whether to deploy any new AI infrastructure. Movemental agrees with that posture. Solutions is for organizations ready to deploy on a foundation they can defend. The church will know when they are ready.",
        },
      ],
    },
    {
      id: "what-it-cost",
      navLabel: "What this cost",
      heading: "What this church spent over the first year.",
      body: [
        {
          type: "p",
          text: "$1,000 for Safety. $15,000 for Sandbox. Roughly $10,000 in cohort fees for two staff in Skills. About $26,000 over a year — meaningful for a church but not extraordinary, distributed across three engagement stages with measurable outputs at each one.",
        },
        {
          type: "p",
          text: "What they got was harder to put a number on. A staff that had been arguing privately was now aligned publicly. A congregation that had been quietly anxious about AI was now informed and trusting. An elder team that had been unsure how to engage now had ratified ground to stand on. The church became, without intending to, a reference for two other churches in their network who had been watching to see whether anyone in their tribe was doing this work seriously.",
        },
      ],
    },
    sharedClosingSection,
  ],
};
