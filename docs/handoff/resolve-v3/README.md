# Resolve v3: fourteen questions

**Status (October 27, 2026):** built on branch `slice/S18-resolve-v3-and-leaders-hero`.

## Where things are

| What | Where |
|---|---|
| Content source of truth | `resolve-questions-v3.json` (this folder) |
| Content the site reads | `src/components/mv/resolve/content/` (questions + examples per sector, generated from the JSON) |
| Types and helpers | `src/components/mv/resolve/questions.ts`, `draft.ts` |
| Screens | `resolve-flow.tsx` (arrive, questions, review, lead), `resolution-document.tsx`, `shared-resolution.tsx`, `others.tsx`, `your-people.tsx`, `team-view.tsx` |
| Home first screen | `src/components/mv/home/leaders-arc.tsx`, lines in `src/components/mv/leaders/known-for.ts` |
| Design boards | `source/` (canvas "Resolve: Fourteen Questions": Main, Home-Resolve, Home-Loop, Home-Phone, People, Team, Others, Shared, States) |
| Tests | `tests/unit/resolve-v3.test.ts` |

## Storage

- Drafts live on the device under `mv.resolution.v2`. Nine-theme drafts (`mv.resolution.v1`) are left alone.
- Saving writes a `resolution_versions` row with `selections = { v: 2, sector, picks, hardest, hardestText, beliefs, parts }`. Ticks and stars are stored by answer id. Own words never leave the device. No schema change was needed; `hardest_theme` stays null for v2.
- Shared links render v2 records as "I believe" plus the three organization parts; older nine-theme records render as their saved lines.

## Still sample data

- `/me/people/view` (an organization's view at five or more people) shows the Team board's nine-person sample. Wiring it to real counts means aggregating `selections.picks` across an organization's counted Resolutions, with the five-person minimum.
- `/resolve/others` scales the same sample to 1,074 public Resolutions.

---

October 27, 2026. This replaces the nine-theme Resolve (`src/components/mv/resolve/themes.ts`) and the v3.1 statement handoff. The full content, including the 948 sector examples, is in `resolve-questions-v3.json`. The design is on the canvas "Resolve: Fourteen Questions".

## What Resolve is

One person answers 14 questions about what their organization should do about AI. The first two questions ask for their own views ("I believe"). The other twelve ask what the organization should do ("We should"). The result is a private draft Resolution. It becomes the organization's only when its leaders adopt it.

## Rules

- **Plain language.** Questions and answers use plain, literal wording and the same terms AI policies and frameworks use: NIST AI RMF, OECD, and church and nonprofit policy templates.
- **Only defensible answers.** Every answer is a position Movemental would stand behind. No answer exists only to argue the other side.
- **Counting.**
  - Ticks and stars are counted by answer id, the same way across all four sectors.
  - Own words are private and never counted.
  - Counts need at least five people, and no names are shown.
- **Movemental's answer.**
  - It appears only after the person has answered.
  - It never changes their Resolution and is never counted.
  - It recommends one overall approach (question 05, answer c).
- **No scoring.** There are no scores, types or archetypes, and no AI interpretation of answers.

## Structure of each question

| Field | Content |
|---|---|
| `term` | The common framework term, shown as a small caption. |
| `title` | The question. |
| `why` | One sentence on why it matters. |
| `teach` | "Before you answer": 2 to 4 heading and text pairs. Closed by default. |
| `mode` | `multi` (tick any, star one) or `single` (q05 only). |
| `answers` | 5 or 6 answers, each with: an id (`q08b`); canonical `text`; `sectors[sector].text`, the wording for that sector if it differs; `sectors[sector].ex`, 3 example decisions; and `ask` (q03 only), the question for leaders on the review screen. |
| `take` | Movemental's answer: `head`, then `body` of paragraphs, subheads and bullet lists. |
| `deeper` | The source to read more. |
| `beliefs` | Which of the 12 Movemental beliefs the question comes from. |

Every question also offers "None of these fits my view", which opens a private own-words field.

## Sectors

| Sector id | Name |
|---|---|
| `church` | Churches |
| `nonprofit` | Nonprofits |
| `school` | Seminaries and schools |
| `network` | Denominations and networks |

Wording changes keep the meaning identical, so answers count across sectors. The main changes are:
- **q02a:** Scripture for faith-based sectors; mission for nonprofits.
- **q04a and q04c:** the governing bodies and wider bodies named for each sector.
- **q06b to q06d:** care, decision and teaching terms for each sector.
- **q07b:** the actions being pressured (attending, enrolling, joining).
- **q12 title:** "faculty and staff" for schools.
- **q14a:** who counts as "our own" members, students or program participants.

For networks, examples about member churches are written as guidance or templates, never as rules, unless the body has that authority.

## The Resolution (review screen)

1. **I believe** (q01, q02): the starred answer first, then the other ticked answers, then own words.
2. **"Resolved, that [Organization] should"**, grouped by part:
   - one row per question, labeled with the question's short label;
   - the starred answer leads, with any "We should" stripped;
   - other ticked answers follow, then own words;
   - q05 shows the one answer chosen.
3. **Anything the questions missed:** private, optional.
4. **A question to bring to your leaders:** taken from the starred q03 answer's `ask`, and editable.
5. **What will you do with your Resolution?** The same five options as the current site (`RESOLVE_ACTS`).

The sidebar during the questions shows each starred answer (or the q05 choice) as it builds.

## Group view (not yet designed)

- Ticks and stars per answer.
- The q05 distribution.
- Where people agree, meaning most people ticked an answer.
- Where they differ, meaning the stars are split.
- Minimum of five people. No free text.

## Migration from the current site

1. Replace `RESOLVE_THEMES` with the questions from `resolve-questions-v3.json`.
   - Suggested types: `ResolveQuestion`, `ResolveAnswer`, `ResolveTake`, `SectorText`.
   - Keep `RESOLVE_ACTS`.
2. Retire the nine themes and their 45 statements. Seven of them contradict Movemental's own writing, for example "How each person uses AI should stay their own business".
3. Store a draft as follows. Keep a `sector` field.

   ```
   { sector, orgName,
     picks: { [qid]: { ticks: {[aid]: true}, star: aid|null, choice: aid|null, none: bool, own: string } },
     missed, leaderQ, act }
   ```

4. Existing saved Resolutions on the nine themes do not map one-to-one. Keep them as v2 records and do not convert them.
5. The Map should reuse the question and answer ids, so an organization's decisions can show what its people said.

## Still to do before launch

- **Brad and Alan.** Review and approve Movemental's answers, and decide whether they are signed jointly.
- **Clarity check.** Read the 14 questions aloud to five people with no context, and fix anything they find unclear.
- **Testing.** Test with 12 to 15 people across the four sectors, checking time, completion, understanding, and whether Movemental's answers feel preachy.
- **"Go deeper" links.** Give each `deeper` source a public page.
- **Group view.** Design the group view.
- **Map stage names.** Settle the Map stage names.

## The questions and standard answers


### Your views


**01 What do I believe about AI?** (Values and purpose; tick any, star one)

- `q01a` I believe AI is a tool, like other software, that can be used well or badly.
- `q01b` I believe AI repeats and magnifies what it is trained on and what we give it.
- `q01c` I believe AI gives a few companies more control over work and information.
- `q01d` I believe AI puts important human things at risk if we do not protect them.
- `q01e` I believe AI can help people we could not otherwise reach.

**02 What do I believe should guide our decisions about AI?** (Values and purpose; tick any, star one)

- `q02a` Scripture and our tradition.
- `q02b` Love for our neighbors, including people outside our organization.
- `q02c` The good of the people we serve, before efficiency.
- `q02d` The trust people have placed in us.
- `q02e` Evidence of what helps people and what harms them.
- `q02f` The views of the people most affected by our decisions.

### Basic responsibilities


**03 What should every organization do, even if it decides not to use AI?** (Risk management and safety; tick any, star one)

- `q03a` We should find out how AI is already being used in our organization, without blaming anyone.
- `q03b` We should protect our people from AI scams, cloned voices and fake images, and teach them to recognize these.
- `q03c` We should set rules for sensitive information right away.
- `q03d` We should learn enough to decide well, by trying AI on low-risk work.
- `q03e` We should tell our people where we stand on AI, even if we have not decided yet.
- `q03f` We should set a date to decide, and a date to review our decisions.

**04 Who should make decisions about AI, and who is accountable?** (Governance and accountability; tick any, star one)

- `q04a` Our governing body should make the final decision, after hearing from our people. (Board, elders or trustees.)
- `q04b` We should decide together as a whole community, not leaders alone.
- `q04c` We should follow our denomination's or network's guidance, and adapt it to our setting.
- `q04d` We should consult the people most affected before we decide.
- `q04e` We should make one named person accountable for our AI decisions.
- `q04f` When AI causes harm, we should tell the people affected and put it right before anything else.

**05 Overall, how much should we use AI?** (Overall approach; choose one)

- `q05a` We should not use AI in our work, for reasons of conscience, and still meet the basic responsibilities.
- `q05b` We should use AI only for administrative work, and keep it out of our core mission work.
- `q05c` We should approve each use of AI separately, start small, and review it regularly.
- `q05d` We should treat AI like other software, under the policies we already have.
- `q05e` We should adopt AI quickly wherever it helps the people we serve.

### Acceptable use


**06 What work should always be done by people?** (Human oversight; tick any, star one)

- `q06a` Any work with children, or care that depends on a personal relationship.
- `q06b` Every decision about a person, including who receives help, membership, admission or employment.
- `q06c` Pastoral care, counseling and spiritual direction.
- `q06d` Preaching and teaching, and anything published under a person's name.
- `q06e` Work that helps people learn and grow, even when AI would be faster.

**07 What uses of AI should we prohibit?** (Prohibited uses; tick any, star one)

- `q07a` Letting people think they are dealing with a person when it is AI.
- `q07b` Using AI to pressure people into attending, giving or staying.
- `q07c` Putting sensitive information into AI tools that do not protect it.
- `q07d` Using AI to monitor, score or rank the people we serve or employ.
- `q07e` Copying a real person's voice or image with AI, or publishing AI writing as a person's own.
- `q07f` Using AI in ways that treat people unfairly because of race, age, disability, language or income.

**08 What uses of AI should we allow only with safeguards?** (Conditional use and safeguards; tick any, star one)

- `q08a` AI may draft what we send, if a named person reviews, edits and approves it.
- `q08b` AI may answer questions outside office hours, if people can always reach a person.
- `q08c` AI may translate, if a qualified person checks anything people will rely on.
- `q08d` AI may be used in our work with the people we serve, if they know about it and agree.
- `q08e` AI may help with research, if we check every fact we use against a source.
- `q08f` We may adopt a new AI tool, if it is reviewed against our policy first.

**09 What uses of AI should we allow freely?** (Approved uses; tick any, star one)

- `q09a` Making our own documents, teaching and records easy to search.
- `q09b` Captions, transcripts and other accessibility help.
- `q09c` Routine administrative work such as scheduling and formatting.
- `q09d` Finding patterns in our own information that would take weeks by hand.
- `q09e` Work we could never afford to hire for, as long as no one loses their job.
- `q09f` Nothing yet. We should try AI on low-risk work first.

**10 When should we tell people that AI was used?** (Transparency and disclosure; tick any, star one)

- `q10a` We should tell people how we use AI and how we do not, with our leaders explaining their own use first.
- `q10b` We should label images, audio and video made with AI.
- `q10c` We should tell people where their information goes and who can use it.
- `q10d` We should say when AI did much of the work on something published in our name.
- `q10e` We should tell people when an AI mistake affects them.

### Information, people and community


**11 How should we protect and use our organization's information?** (Data privacy and data use; tick any, star one)

- `q11a` We should sort our information by how sensitive it is, and decide which tools may use each kind.
- `q11b` We should let people see, correct and ask us to delete information about them wherever we can.
- `q11c` We should gather our scattered documents and records so they are complete, easy to find and under our control.
- `q11d` We should record what long-serving people know before they leave.
- `q11e` When AI speaks for us, it should use only our own information and show its sources.
- `q11f` We should not let vendors train AI on our information or keep it after we leave.

**12 How should we treat our staff and volunteers as AI changes their work?** (Workforce impact; tick any, star one)

- `q12a` We should decide what saved time will be used for before adopting any AI tool.
- `q12b` We should give saved time back to people: more time with the people we serve, and more rest.
- `q12c` We should retrain people before eliminating jobs, and never cut jobs based on projected savings.
- `q12d` We should agree any change in workload with the people who do the work.
- `q12e` We should never require AI use from someone who objects on conscience, and always offer another way to do the work.

**13 How should we train our people to use AI wisely and avoid depending on it?** (AI literacy and training; tick any, star one)

- `q13a` We should teach people to check AI's answers before relying on them.
- `q13b` We should teach good judgment about AI more than skill with tools.
- `q13c` We should think for ourselves first, then use AI.
- `q13d` We should give everyone time to try AI on real, low-risk work, not only the most interested.
- `q13e` We should train a few people in depth so others have someone to ask.
- `q13f` We should keep some work free of AI on purpose.

**14 What responsibility do we have to our community and to other organizations?** (Community impact and collaboration; tick any, star one)

- `q14a` We should help people in our wider community, not only our own members, recognize AI scams and manipulation.
- `q14b` We should work out our approach with other organizations, not alone.
- `q14c` We should learn from people who were wise before AI.
- `q14d` We should share what we learn, including our mistakes.
- `q14e` We should consider AI's environmental costs in our choices.
- `q14f` We should support people harmed by AI, and speak publicly when needed.
