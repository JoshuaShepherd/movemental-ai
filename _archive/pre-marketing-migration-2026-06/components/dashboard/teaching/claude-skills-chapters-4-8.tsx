import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

function ChapterEnd({ n, nextHref, nextLabel }: { n: string; nextHref: string; nextLabel: string }) {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-safestart-hairline pt-8 text-sm text-safestart-muted">
      <span>End of Chapter {n}</span>
      <Link href={nextHref} className="font-medium text-pathway-accent hover:text-safestart-ink">
        Next: {nextLabel} <em className="not-italic">→</em>
      </Link>
    </div>
  );
}

function Editorial({ children }: { children: ReactNode }) {
  return (
    <p className="my-8 max-w-[600px] border-l-2 border-pathway-accent py-0 pl-6 font-serif text-xl font-normal italic leading-snug tracking-tight text-safestart-ink">
      {children}
    </p>
  );
}

function EItem({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[40px_1fr] gap-5 border-b border-safestart-hairline py-5 first:border-t">
      <span className="font-serif text-[22px] italic leading-none text-pathway-accent">{num}</span>
      <div>
        <h4 className="font-body text-[15px] font-semibold text-safestart-ink">{title}</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-safestart-muted">{children}</p>
      </div>
    </div>
  );
}

export function ChaptersFourThroughEight() {
  return (
    <>
      <section id="ch-4" className="mb-20 scroll-mt-28 sm:scroll-mt-32">
        <header className="mb-10">
          <span className="mb-4 block font-serif text-sm italic tracking-wide text-pathway-accent">Chapter 04</span>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,2.75rem)] font-normal italic leading-tight tracking-tight text-safestart-ink">
            The <em>anatomy</em> of a real skill.
          </h2>
          <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-safestart-muted">
            A well-built skill has seven parts. Each part answers a specific question. A skill missing any part is missing
            something important. This is the architecture of a real organizational skill, in plain language.
          </p>
        </header>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          Think of these seven parts the way you would think of the sections of a well-written job description: each one
          answers a different question and the absence of any of them creates ambiguity that comes back as a problem
          later. A skill without a clear name confuses people who try to find it. A skill without a defined output produces
          drift. A skill without an owner gets stale.
        </p>
        <div className="my-6">
          <EItem num="01" title="A name.">
            Two to five words that someone scanning a menu of skills can recognize immediately. &quot;Major Donor
            Thank-You Letter&quot; — not &quot;MDTL-v3-prod.&quot; The name is for humans first; the system has its own
            identifiers under the hood.
          </EItem>
          <EItem num="02" title="A clear purpose — when to use it, when not to.">
            A short paragraph that names what the skill does and the conditions under which it should be invoked.
            &quot;Use this skill when drafting a thank-you letter to a major donor who has given $1,000 or more in the
            last year. Do not use this skill for thank-you letters to first-time donors, for memorial gifts, or for board
            members — those have their own skills.&quot;
          </EItem>
          <EItem num="03" title="Inputs — what the skill needs to do its job.">
            What information the staff member needs to provide before the skill can work well. &quot;You&apos;ll need: the
            donor&apos;s full name, the size and date of the most recent gift, the program they directed it to, any prior
            personal connection notes from the database.&quot; Listing these explicitly prevents the most common failure
            mode: the skill running with not enough context and producing generic output.
          </EItem>
          <EItem num="04" title="The method — how the work actually gets done.">
            The substantive procedure the skill follows. Step by step. Specific. Voice notes. Examples of how to open, how
            to close. Phrases that work for your organization. Phrases to avoid. This is the heart of the skill and the
            part that takes the most thought to write well.
          </EItem>
          <EItem num="05" title="Boundaries — what the skill must never do.">
            Explicit limits. &quot;Never claim a personal memory the donor did not share with us. Never quote specific
            dollar amounts from the database verbatim in the letter body. Never sign the executive director&apos;s name —
            leave the signature line blank for human review.&quot;
          </EItem>
          <EItem num="06" title="The output — what &quot;done&quot; looks like.">
            The shape of the deliverable. A 250–350 word letter with a specific opening, three body paragraphs, a specific
            closing. A two-page memo with named sections. A draft email under 150 words. Without this, the skill produces
            wildly different shapes of output depending on small variations in input.
          </EItem>
          <EItem num="07" title="An owner, a version, a changelog.">
            The named person responsible for this skill. The current version number. A short history of what changed and
            when. This is the part most often skipped — and the part that determines whether the skill survives the next
            year of staff turnover, donor pattern changes, and tone shifts.
          </EItem>
        </div>
        <h3 className="mt-12 font-serif text-2xl font-normal italic leading-snug tracking-tight text-safestart-ink">
          An example, end to end.
        </h3>
        <p className="mb-5 mt-4 text-base leading-relaxed text-safestart-ink">
          Here is what a complete skill looks like in human language. This is not the technical format — it is the
          substance. The technical format is a way of recording this same content so Claude can read it.
        </p>
        <div className="my-6 border border-safestart-hairline bg-safestart-surface-container p-6 sm:p-8">
          <p className="mb-6 font-serif text-[22px] italic leading-snug text-safestart-ink">
            Major Donor Thank-You Letter — v2.1
          </p>
          <MinorHead>When to use</MinorHead>
          <p className="mb-4 text-sm leading-relaxed text-safestart-ink">
            Use this when a major donor (gift of $1,000 or more in the last year) has made a new gift. Do not use for
            first-time gifts, memorial gifts, or board members. Those have separate skills.
          </p>
          <MinorHead>Inputs you need before starting</MinorHead>
          <p className="mb-4 text-sm leading-relaxed text-safestart-ink">
            Donor&apos;s full name; size and date of the gift; program the gift was directed to; any prior
            personal-connection notes from the relationship history.
          </p>
          <MinorHead>Method</MinorHead>
          <p className="mb-4 text-sm leading-relaxed text-safestart-ink">
            Open with a specific reference to the program, not a generic thank-you. Mention one substantive thing happening
            in that program right now — facts only, from the database. Acknowledge the donor&apos;s history with the
            organization without quoting specific past gift amounts. Close with a personal sign-off line that invites
            continued conversation, not a generic &quot;we are grateful.&quot;
          </p>
          <MinorHead>Boundaries — never</MinorHead>
          <p className="mb-4 text-sm leading-relaxed text-safestart-ink">
            Never claim a personal memory the donor did not share. Never invent program outcomes — only state what is in
            the verified outcomes file. Never quote dollar amounts of prior gifts in the letter body. Never sign the
            executive director&apos;s name — leave the signature line blank.
          </p>
          <MinorHead>Output shape</MinorHead>
          <p className="mb-4 text-sm leading-relaxed text-safestart-ink">
            A letter between 220 and 320 words. Opening paragraph mentions the program. Middle paragraph names a specific
            outcome or current activity. Closing paragraph invites continued conversation. No subject line — this becomes
            a printed letter.
          </p>
          <MinorHead>Owner and version</MinorHead>
          <p className="text-sm leading-relaxed text-safestart-ink">
            Owner: Director of Development. Version 2.1 since March 2026. Changelog: v2.0 added the &quot;never quote
            dollar amounts&quot; rule; v2.1 tightened opening paragraph guidance after January donor feedback.
          </p>
        </div>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          Notice what is in there and what is not. There is no technical jargon. There is no clever prompt phrasing. The
          skill is a substantive description of how your organization writes these letters — written so a new staff member
          could follow it, written so the assistant can follow it, and written so the next person responsible for this skill
          can revise it without needing to ask anyone.
        </p>
        <Editorial>
          The best test of a skill is not &quot;does it sound clever?&quot; It is &quot;could a thoughtful new staff member
          follow this and produce work in our voice?&quot; If the answer is yes, the skill is good. The assistant follows
          the same standard.
        </Editorial>
        <ChapterEnd n="04" nextHref="#ch-5" nextLabel="How skills become active" />
      </section>

      <section id="ch-5" className="mb-20 scroll-mt-28 sm:scroll-mt-32">
        <header className="mb-10">
          <span className="mb-4 block font-serif text-sm italic tracking-wide text-pathway-accent">Chapter 05</span>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,2.75rem)] font-normal italic leading-tight tracking-tight text-safestart-ink">
            How skills become <em>active</em>.
          </h2>
          <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-safestart-muted">
            A skill that exists is not the same as a skill that gets used. How a skill enters a conversation changes who is
            in control, how predictable the behavior is, and how easy it is to audit later.
          </p>
        </header>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          There are three main ways a skill can enter a conversation with Claude. Each is appropriate in different
          situations. Choosing the right one is part of designing a good skill — and part of designing the broader system
          in which the skill operates.
        </p>
        <h3 className="mt-12 font-serif text-2xl font-normal italic leading-snug tracking-tight text-safestart-ink">
          Mode one — the staff member chooses.
        </h3>
        <p className="mb-5 mt-4 text-base leading-relaxed text-safestart-ink">
          The most common and the most transparent. The staff member sees a list of available skills, picks the one they
          want, and Claude follows it. This is the default mode for most organizational use. It is the mode that produces
          the fewest surprises because every invocation is a deliberate choice the staff member made.
        </p>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          The cost is consistency. Under time pressure, staff sometimes forget to invoke the right skill, or invoke none
          at all and revert to generic chat. The skill exists but does not get used. For high-stakes work where consistency
          matters more than convenience, this is a worthwhile tradeoff. For routine work where consistency is the point,
          mode two might be better.
        </p>
        <h3 className="mt-12 font-serif text-2xl font-normal italic leading-snug tracking-tight text-safestart-ink">
          Mode two — always on.
        </h3>
        <p className="mb-5 mt-4 text-base leading-relaxed text-safestart-ink">
          A skill that is pinned to a workspace or project so it is always active for anyone working there. The Major Donor
          project always uses the Major Donor Thank-You skill. The Board Materials project always uses the Board Memo
          skill. No one has to remember to invoke them — they are part of the room.
        </p>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          The cost is that the skill is always taking up space, and other skills cannot easily be invoked alongside it
          without conflict. Pinned skills should be small, broad, and low-friction — the equivalent of standing instructions
          a new employee gets on day one. Heavy specialist skills should not be pinned; they should be invoked when
          needed.
        </p>
        <h3 className="mt-12 font-serif text-2xl font-normal italic leading-snug tracking-tight text-safestart-ink">
          Mode three — automatic.
        </h3>
        <p className="mb-5 mt-4 text-base leading-relaxed text-safestart-ink">
          The newest and most powerful mode. Claude itself recognizes when a particular skill would help and invokes it.
          The staff member describes what they need; Claude reads the description against its registered skills and
          applies the right one.
        </p>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          When this works well, it is genuinely magical. The staff member does not have to know what skills exist or
          remember their names. They describe their actual need, and the right skill activates. When this works poorly, it
          is dangerous. The wrong skill activates without anyone realizing it, and the staff member assumes the output is the
          result of a generic conversation when in fact a specific method was applied. Automatic invocation should be
          reserved for skills whose descriptions are crisp and whose triggers are unambiguous.
        </p>
        <h3 className="mt-12 font-serif text-2xl font-normal italic leading-snug tracking-tight text-safestart-ink">
          A practical rule of thumb.
        </h3>
        <div className="my-6 border border-safestart-hairline bg-card p-6 sm:p-8">
          <DecisionStep
            q="Is this skill central to a specific workspace, used by everyone there, every time?"
            answers={[
              { k: "Yes", v: "Pin it as always-on for that workspace (mode two)." },
              { k: "No", v: "Continue." },
            ]}
          />
          <DecisionStep
            q="Is the skill high-stakes — donor-facing communication, board materials, sensitive personnel work?"
            answers={[
              {
                k: "Yes",
                v: "Require deliberate invocation by the staff member (mode one). Do not allow automatic invocation.",
              },
              { k: "No", v: "Continue." },
            ]}
          />
          <DecisionStep
            q="Is the skill's trigger crisp and unambiguous — would only one specific kind of request invoke it?"
            answers={[
              { k: "Yes", v: "Automatic invocation is safe (mode three)." },
              { k: "No", v: "Default to staff member invocation (mode one) until the trigger language can be sharpened." },
            ]}
            last
          />
        </div>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          Most organizations should start almost entirely in mode one. Once a skill has been used enough times that its
          trigger is clearly understood and its output is consistently good, consider pinning it (mode two) or enabling
          automatic invocation (mode three). The progression is from explicit to implicit, only as confidence builds.
        </p>
        <ChapterEnd n="05" nextHref="#ch-6" nextLabel="What makes a skill good or bad" />
      </section>

      <section id="ch-6" className="mb-20 scroll-mt-28 sm:scroll-mt-32">
        <header className="mb-10">
          <span className="mb-4 block font-serif text-sm italic tracking-wide text-pathway-accent">Chapter 06</span>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,2.75rem)] font-normal italic leading-tight tracking-tight text-safestart-ink">
            What makes a skill <em>good or bad</em>.
          </h2>
          <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-safestart-muted">
            A skill that exists is not necessarily a skill that helps. After working with mission-driven organizations on
            dozens of skill designs, certain patterns separate the ones that compound value from the ones that quietly do
            harm.
          </p>
        </header>
        <h3 className="font-serif text-2xl font-normal italic leading-snug tracking-tight text-safestart-ink">
          The patterns of a good skill.
        </h3>
        <div className="mt-4">
          <EItem num="01" title="It does one thing well.">
            The best skills are narrow. A skill for thank-you letters to major donors. A skill for thank-you letters to
            first-time donors. A skill for memorial gift acknowledgments. Three skills, not one mega-skill trying to handle
            all three contexts. Narrow skills are easier to test, easier to update, and produce more consistent output.
          </EItem>
          <EItem num="02" title="It tells the assistant what to refuse.">
            Good skills are as specific about what not to do as about what to do. The boundaries section is what keeps the
            assistant from confidently producing output that crosses a line your organization would never cross. A skill
            without explicit boundaries will eventually produce something embarrassing.
          </EItem>
          <EItem num="03" title="It uses synthetic examples, never real ones.">
            If your skill includes example outputs to show the desired voice, those examples should be invented for the
            skill — not real letters, real notes, or real cases. Real examples baked into a skill mean real identifiers are
            sitting inside the skill forever, visible to anyone who can access it.
          </EItem>
          <EItem num="04" title="It ends with a human review step.">
            The best skills end at draft, not at send. They produce a draft for the staff member to review, edit, and
            approve before it leaves the building. Skills that automatically send, publish, or finalize external work
            product are skills that have removed the human judgment that mission-driven work depends on.
          </EItem>
          <EItem num="05" title="It points the assistant at real sources of truth.">
            A skill that handles donor work should reference the donor database, not try to remember donor facts on its own.
            A skill that handles program outcomes should reference the verified outcomes file, not generate outcome
            statistics. Pointing the skill at authoritative sources is what keeps it grounded.
          </EItem>
        </div>
        <h3 className="mt-12 font-serif text-2xl font-normal italic leading-snug tracking-tight text-safestart-ink">
          The patterns of a bad skill.
        </h3>
        <div className="mt-4">
          <EItem num="01" title="It tries to do everything.">
            A &quot;communications skill&quot; that handles thank-you letters, donor briefs, social media, press releases,
            and program reports — all in one skill. The wider the scope, the worse the output. The assistant produces
            generic results because the skill cannot encode the specific judgment each kind of communication requires.
          </EItem>
          <EItem num="02" title="It has no owner.">
            The skill was created by someone six months ago who has since left or moved roles. Nobody knows who is
            responsible for it. Nobody updates it. The donor patterns it was written for have changed but the skill has
            not. Bad skills are usually skills with no owner.
          </EItem>
          <EItem num="03" title="It contains real beneficiary or donor details.">
            Examples baked into the skill that reference real people. This is the single most common serious problem with
            home-built skills. Once real identifiers are in a skill, they are very hard to remove — they have been seen by
            everyone who has used the skill, copied into outputs, and woven into the organizational record.
          </EItem>
          <EItem num="04" title="Its trigger description is vague.">
            &quot;Use this for communications.&quot; &quot;Use this when drafting external materials.&quot; Vague triggers
            cause the wrong skill to activate. The assistant follows a method that does not fit the actual situation, and
            the staff member does not know what happened because they did not realize a specific skill had been invoked.
          </EItem>
          <EItem num="05" title="It removes the human review step.">
            Skills that finalize external work without human review are not productivity tools — they are liability
            creators. Skills should make human review faster and more focused, not eliminate it.
          </EItem>
        </div>
        <div className="my-8 border-l-[3px] border-pathway-accent bg-safestart-surface-container p-6 sm:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-pathway-accent">A real pattern we have seen</p>
          <p className="mt-3 font-serif text-[22px] italic leading-snug text-safestart-ink">The everything skill.</p>
          <p className="mt-4 text-[15px] leading-relaxed text-safestart-ink">
            A development team built a single skill called &quot;donor communications&quot; intended to handle all
            donor-facing drafting. The skill became 4,000 words long. It tried to encode rules for thank-you letters,
            appeals, year-end statements, pledge reminders, and memorial acknowledgments. The output was consistently off —
            sometimes too formal for an appeal, sometimes too casual for a memorial. Nobody could figure out why. The team
            blamed the assistant.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-safestart-ink">
            The fix was not a smarter skill. It was four separate skills, each narrow, each with its own boundaries. The
            combined word count was lower than the original mega-skill. The output got dramatically better immediately. The
            lesson: when a skill is producing inconsistent results, the first question is not &quot;how do I make the skill
            smarter?&quot; It is &quot;have I asked one skill to do too many things?&quot;
          </p>
        </div>
        <ChapterEnd n="06" nextHref="#ch-7" nextLabel="Governance — who owns what" />
      </section>

      <section id="ch-7" className="mb-20 scroll-mt-28 sm:scroll-mt-32">
        <header className="mb-10">
          <span className="mb-4 block font-serif text-sm italic tracking-wide text-pathway-accent">Chapter 07</span>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,2.75rem)] font-normal italic leading-tight tracking-tight text-safestart-ink">
            Governance — <em>who owns what</em>.
          </h2>
          <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-safestart-muted">
            A skill without governance is a problem waiting to surface. Mission-driven organizations especially need to be
            clear about who can create, edit, approve, and retire skills — because the skills carry your voice into the
            world.
          </p>
        </header>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          Most of the hard questions about skills are not technical. They are governance questions. Who can write a new
          skill? Who reviews it before it is published? Who has the authority to retire a skill that is producing problems?
          What happens when a skill needs to be updated because a policy changed? Who is accountable when a skill produces
          output that embarrasses the organization?
        </p>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          These are the same kinds of questions your organization already answers about other forms of institutional voice.
          Who can write a press release? Who approves donor communications above a certain threshold? Who signs board
          materials? Skills are the AI equivalent. The governance model that works for them is usually similar to the
          governance model your organization already uses for those analog questions.
        </p>
        <h3 className="mt-12 font-serif text-2xl font-normal italic leading-snug tracking-tight text-safestart-ink">
          The four roles every skill needs.
        </h3>
        <div className="my-6 border border-safestart-hairline bg-card">
          <GovRow
            kicker="Role 01"
            title="The author"
            body="The person who writes the skill in the first place. Usually a senior staff member in the function the skill serves — a director of development writing a fundraising skill, an executive director writing a strategic memo skill. The author needs deep knowledge of the work the skill handles. They do not have to be technical."
          />
          <GovRow
            kicker="Role 02"
            title="The reviewer"
            body="Someone other than the author who reads the skill before it is published. The reviewer asks: is the boundary section complete? Are the examples synthetic? Is the trigger description specific? Does the skill end with human review? The reviewer's job is to catch the things the author is too close to see."
          />
          <GovRow
            kicker="Role 03"
            title="The owner"
            body="The named person who is responsible for this skill over time. Usually the same as the author at first, sometimes a different role later. The owner updates the skill as patterns change, monitors output quality, and decides when the skill needs revision or retirement. Every skill has exactly one owner — not a team, not a committee, one person."
          />
          <GovRow
            kicker="Role 04"
            title="The approver"
            body="The senior leader who signs off on the skill being published to the organization. For most skills, this is the head of the function — the executive director for organizational-voice skills, the director of finance for finance skills. The approver is the person whose name effectively goes on every output the skill produces."
            last
          />
        </div>
        <h3 className="mt-12 font-serif text-2xl font-normal italic leading-snug tracking-tight text-safestart-ink">
          The lifecycle every skill follows.
        </h3>
        <p className="mb-5 mt-4 text-base leading-relaxed text-safestart-ink">
          Good skills are not built once and left alone. They evolve. The discipline of tracking that evolution is what
          keeps skills useful over time. The lifecycle is straightforward — five stages most organizations recognize from
          other working documents.
        </p>
        <div className="my-6">
          <EItem num="01" title="Draft.">
            The author writes a first version. It is not yet visible to the organization. The author tests it against
            several real use cases, refines based on what works and what doesn&apos;t.
          </EItem>
          <EItem num="02" title="Review.">
            The reviewer reads the skill against the criteria. Feedback goes back to the author. Edits happen. The reviewer
            signs off when satisfied.
          </EItem>
          <EItem num="03" title="Pilot.">
            The skill is published to a small group — two or three trusted users — for real-world testing. Not the whole
            organization yet. Pilot users report back on what works and what surprises them.
          </EItem>
          <EItem num="04" title="Publish.">
            The approver signs off. The skill becomes available to the whole organization. Its version number is set. Its
            changelog begins.
          </EItem>
          <EItem num="05" title="Revise or retire.">
            As patterns change or feedback accumulates, the owner revises the skill — small version bumps for small updates,
            major version bumps for substantial changes. When a skill is no longer the right answer, the owner retires it
            with a note explaining what replaced it.
          </EItem>
        </div>
        <h3 className="mt-12 font-serif text-2xl font-normal italic leading-snug tracking-tight text-safestart-ink">
          The data classification every skill needs.
        </h3>
        <p className="mb-5 mt-4 text-base leading-relaxed text-safestart-ink">
          Not all skills are the same sensitivity. A skill for drafting public social media posts is different from a skill
          that touches donor financial information. The skill itself should be classified by the sensitivity of the work it
          handles, and access to it should follow the same rules your organization uses for the underlying data.
        </p>
        <div className="my-8 grid gap-4 sm:grid-cols-3">
          <ClassCard
            dot="bg-safestart-completed"
            title="Public"
            subtitle="Available to all staff"
            body="Skills that handle work which would already be visible publicly. Social media drafting, public newsletter content, blog post structure. Examples in these skills are synthetic. Anyone on staff can use them."
          />
          <ClassCard
            dot="bg-pathway-accent"
            title="Internal"
            subtitle="Available to relevant staff"
            body="Skills that handle internal operational work. Board memo drafting, internal strategic memos, staff onboarding materials. Available to staff members in roles that legitimately need them."
          />
          <ClassCard
            dot="bg-destructive"
            title="Restricted"
            subtitle="Available to authorized staff only"
            body="Skills that touch sensitive data. Major donor work, financial drafts, HR materials. Access requires explicit authorization. Use is logged. Edits require dual approval."
          />
        </div>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          The classification is not bureaucratic overhead — it is how you make sure that the staff member who has access to
          a skill is the same staff member who would have access to the underlying work. A skill is, in practice, an
          extension of organizational authority. Treat it like one.
        </p>
        <ChapterEnd n="07" nextHref="#ch-8" nextLabel="Where to begin" />
      </section>

      <section id="ch-8" className="mb-20 scroll-mt-28 sm:scroll-mt-32">
        <header className="mb-10">
          <span className="mb-4 block font-serif text-sm italic tracking-wide text-pathway-accent">Chapter 08</span>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,2.75rem)] font-normal italic leading-tight tracking-tight text-safestart-ink">
            Where to <em>begin</em>.
          </h2>
          <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-safestart-muted">
            You have a working understanding of what skills are, where they fit, what makes them good, and how to govern
            them. The remaining question is practical: how does your organization actually start?
          </p>
        </header>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          The temptation, after a long reading like this one, is to schedule a weekend and build a dozen skills. Resist it.
          The organizations that do best with skills are the ones that build a small handful — three or four — and use them
          well for a quarter before adding more. The early ones teach you what you don&apos;t yet know about how your
          organization actually wants to work with AI. That learning then shapes everything that comes after.
        </p>
        <h3 className="mt-12 font-serif text-2xl font-normal italic leading-snug tracking-tight text-safestart-ink">
          A three-step beginning.
        </h3>
        <div className="mt-4">
          <EItem num="01" title="Identify three candidate skills from real friction.">
            Look at your team&apos;s actual work. What kinds of writing or analysis happen often, take longer than they
            should, and follow a recognizable pattern? Those are your candidate skills. Pick three. Resist the urge to pick
            six or ten. The discipline of picking only three forces you to choose well.
          </EItem>
          <EItem num="02" title="Write each candidate using the seven-part anatomy.">
            Use the seven parts from Chapter 04. Name. Purpose. Inputs. Method. Boundaries. Output shape. Owner. Write the
            first version yourself or with the staff member who does this work today. Do not skip the boundaries section.
            Do not skip the owner. Test each skill against three or four real recent examples to see whether it produces the
            right kind of output.
          </EItem>
          <EItem num="03" title="Run them as pilots for ninety days, then decide.">
            Pilot each skill with two or three trusted staff members. Keep track of where they work, where they fall short,
            what gets surprised. After ninety days, decide: publish to the whole organization, revise based on what you
            learned, or retire because the use case turned out not to be right. Most organizations find that one of their
            three candidates is clearly worth publishing, one needs significant revision, and one turns out to be a use
            case better handled some other way.
          </EItem>
        </div>
        <h3 className="mt-12 font-serif text-2xl font-normal italic leading-snug tracking-tight text-safestart-ink">
          Where this fits in the Movemental path.
        </h3>
        <p className="mb-5 mt-4 text-base leading-relaxed text-safestart-ink">
          If you have completed the Safety stage, you have an AI Organizational Guidebook that names what your organization
          is for and what it refuses. Skills are an extension of that Guidebook — they encode, at a working level, the same
          convictions the Guidebook expresses at a foundational one.
        </p>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          If you have completed the Sandbox stage, you have a Future Plan naming the Green Light use cases your organization
          committed to deploying. Each of those Green Lights is a candidate for becoming a skill. The Sandbox is the
          discovery stage; skill-building is the deployment stage. The work flows from one to the next.
        </p>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          If you have not yet done Safety or Sandbox, building skills is premature. You will be encoding methods for use
          cases you have not yet adjudicated, in voice your organization has not yet ratified, with boundaries your team has
          not yet agreed on. Start at the beginning. The skills become better and more durable when they are downstream of
          the work that names what your organization actually wants AI to do.
        </p>
        <div className="my-8 border-l-[3px] border-pathway-accent bg-safestart-surface-container p-6 sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-pathway-accent">A note on the fifth level</p>
          <p className="mt-3 text-base leading-relaxed text-safestart-ink">
            Earlier we mentioned a fifth level of skill maturity — skills coupled to code, with the ability to take actions
            in other software systems on their own. These are real, powerful, and the right answer for a handful of
            advanced use cases. They are also significantly riskier than the four levels described here.
          </p>
          <p className="mt-3 text-base leading-relaxed text-safestart-ink">
            The pattern that works for organizations who eventually adopt level five is this: master level D first, with a
            portfolio of well-governed organizational skills running in production for at least a quarter or two. Then,
            when a specific use case clearly requires a level-five capability and the organization has the technical capacity
            to operate it safely, build it — with explicit board awareness and a separate review process. Most
            organizations should not be in a hurry to reach level five. The compounding value of well-built level-D skills
            is substantial on its own.
          </p>
        </div>
        <h3 className="mt-12 font-serif text-2xl font-normal italic leading-snug tracking-tight text-safestart-ink">
          Your readiness, honestly.
        </h3>
        <p className="mb-5 mt-4 text-base leading-relaxed text-safestart-ink">
          Use the questions below to assess whether your organization is ready to begin building skills. There are no right
          or wrong answers. The pattern of answers tells you where to start.
        </p>
        <div className="my-6 border border-safestart-hairline bg-card p-6 sm:p-8">
          <h4 className="mt-0 font-serif text-[22px] font-normal italic text-safestart-ink">Five questions before you begin.</h4>
          <SelfCheck>
            We have completed (or substantially completed) the work of producing an AI Organizational Guidebook — the
            document that names what AI is for in our work and what we refuse.
          </SelfCheck>
          <SelfCheck>
            We can identify three specific use cases — not categories, but specific kinds of work — where AI assistance has
            shown real promise in our Sandbox or in informal experimentation.
          </SelfCheck>
          <SelfCheck>
            For each candidate use case, we can name the senior leader who would be the natural owner of a skill for that
            work.
          </SelfCheck>
          <SelfCheck>
            We have a senior leader who has the authority to approve skills before they are published to the whole
            organization — and who is willing to take that role seriously rather than rubber-stamping submissions.
          </SelfCheck>
          <SelfCheck>
            We are willing to start with three skills and use them well for a quarter, rather than building a dozen at once
            and overwhelming our team&apos;s ability to learn from them.
          </SelfCheck>
        </div>
        <p className="mt-8 text-base leading-relaxed text-safestart-ink">
          If you can answer yes to most of these, your organization is ready to begin. Pick the three candidate skills.
          Write them carefully. Pilot them honestly. Revise them based on what you learn. The first quarter of skill work is
          slower than feels productive. The compounding starts in the second quarter — when the skills are stable, the staff
          is using them well, and the organization can see, for the first time, what it looks like to work with AI as an
          institution rather than as a collection of individuals.
        </p>
        <Editorial>
          Skills are not the destination. They are the working surface on which AI becomes part of how your organization
          does its work. Build them slowly, write them carefully, govern them seriously, and they will repay the investment
          many times over.
        </Editorial>
        <div className="my-8 h-px bg-safestart-hairline" />
        <div className="border border-safestart-hairline bg-safestart-surface-container p-6 sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-pathway-accent">Continuing the work</p>
          <p className="mt-3 text-base leading-relaxed text-safestart-ink">
            This teaching guide is part of the Movemental Teaching Library — short, self-paced introductions to concepts
            your organization needs to understand before adopting AI at scale. Other guides in the library cover the AI
            Organizational Guidebook, the Sandbox discovery process, prompting fundamentals, and the architecture of Claude
            itself.
          </p>
          <p className="mt-3 text-base leading-relaxed text-safestart-ink">
            If your organization is ready to move from understanding skills to building them, the next step is typically the
            Sandbox engagement — the structured discovery process that identifies which use cases are worth investing
            skill-building work in.
          </p>
          <p className="mt-3 text-base leading-relaxed text-safestart-ink">
            For questions, write to{" "}
            <a href="mailto:josh@movemental.ai" className="text-pathway-accent underline underline-offset-[3px]">
              josh@movemental.ai
            </a>
            .
          </p>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-safestart-hairline pt-8 text-sm text-safestart-muted">
          <span>End of Chapter 08 · End of guide</span>
          <Link href="#ch-1" className="font-medium text-pathway-accent hover:text-safestart-ink">
            Return to start <em className="not-italic">→</em>
          </Link>
        </div>
      </section>
    </>
  );
}

function MinorHead({ children }: { children: ReactNode }) {
  return (
    <h4 className="mt-8 font-body text-[13px] font-semibold uppercase tracking-[0.04em] text-safestart-ink first:mt-0">
      {children}
    </h4>
  );
}

function DecisionStep({
  q,
  answers,
  last,
}: {
  q: string;
  answers: { k: string; v: string }[];
  last?: boolean;
}) {
  return (
    <div className={cn("py-4", !last && "border-b border-safestart-hairline")}>
      <p className="font-serif text-lg italic text-safestart-ink">{q}</p>
      <div className="mt-2 flex flex-col gap-1.5 pl-6 text-sm text-safestart-muted">
        {answers.map((a) => (
          <div key={a.k} className="grid grid-cols-1 gap-1 sm:grid-cols-[80px_1fr] sm:gap-4">
            <strong className="text-xs font-semibold uppercase tracking-wide text-pathway-accent">{a.k}</strong>
            <span>{a.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GovRow({
  kicker,
  title,
  body,
  last,
}: {
  kicker: string;
  title: string;
  body: string;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid border-safestart-hairline md:grid-cols-[200px_minmax(0,1fr)]",
        !last && "border-b",
      )}
    >
      <div className="border-safestart-hairline bg-safestart-surface-container px-5 py-5 md:border-r md:border-b-0">
        <span className="block font-body text-[10px] font-bold uppercase tracking-[0.08em] text-pathway-accent">
          {kicker}
        </span>
        <span className="mt-1 block font-serif text-base italic tracking-tight text-safestart-ink">{title}</span>
      </div>
      <div className="px-5 py-5 text-sm leading-relaxed text-safestart-muted">
        <p className="m-0">{body}</p>
      </div>
    </div>
  );
}

function ClassCard({
  dot,
  title,
  subtitle,
  body,
}: {
  dot: string;
  title: string;
  subtitle: string;
  body: string;
}) {
  return (
    <div className="border border-safestart-hairline bg-card p-5">
      <div className="inline-flex items-center gap-2 border border-safestart-hairline bg-safestart-bg px-3 py-1.5 text-xs font-medium text-safestart-ink">
        <span className={cn("size-2 rounded-full", dot)} aria-hidden />
        {title}
      </div>
      <h4 className="mt-4 font-body text-[13px] font-semibold uppercase tracking-[0.04em] text-safestart-ink">{subtitle}</h4>
      <p className="mt-2 text-[13px] leading-relaxed text-safestart-ink">{body}</p>
    </div>
  );
}

function SelfCheck({ children }: { children: ReactNode }) {
  return (
    <label className="flex cursor-pointer gap-3.5 border-b border-safestart-hairline py-3.5 text-sm leading-snug text-safestart-ink last:border-b-0">
      <input type="checkbox" className="mt-1 size-4 shrink-0 accent-pathway-accent" />
      <span>{children}</span>
    </label>
  );
}
