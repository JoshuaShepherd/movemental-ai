import {
  COMPANY_COMMITMENTS,
  HOW_WE_USE_AI_NAV,
  NAMED_REFUSALS,
  SCENIUS_REFUSALS,
  TRAFFIC_LIGHTS,
} from "@/components/agent-room/how-we-use-ai/how-we-use-ai-data";

import { MvAskAi } from "./ask-ai";
import { MvToc } from "./toc";

/**
 * `/how-we-use-ai` on Paper (board: Kept pages · How we use AI). Every line is the copy that ran at
 * /agent/how-we-use-ai; the agent dock and document chrome are replaced by the site header.
 */
export function HowWeUseAiPage() {
  return (
    <div className="mv-wrap">
      <header className="mv-ph mv-ph--rule" id="hero">
        <p className="mv-kicker">How we use AI</p>
        <h1 className="mv-ph-title">We use the tools we sell. On ourselves, first.</h1>
        <p className="mv-ph-deck">
          We do not ask organizations to do anything we have not done. Every guardrail we ask a leader or a board to ratify, we have built into our own work
          first. This page is where we name what we refuse, how we sort use cases, and what we will not build, so anyone reading the site knows where we
          stand.
        </p>
        <p className="mv-fine mv-fine--lg">
          Most public AI discourse splits into &ldquo;AI is a savior&rdquo; or &ldquo;AI is a threat.&rdquo; We reject both. AI surfaces and amplifies what
          humans have already produced, and how a person reacts to it often reveals their underlying view of human nature. Our work starts from a simpler
          operational rule: if AI mirrors the humans it is around, govern the humans, the corpus, and the relationships first.
        </p>
      </header>

      <div className="mv-dk">
        <MvToc label="On this page" items={HOW_WE_USE_AI_NAV.filter((n) => n.id !== "hero").map((n) => ({ id: n.id, text: n.label }))} />
        <div>
          <section className="mv-dk-sec" id="our-commitments">
            <p className="mv-kicker">Our commitments</p>
            <h2 className="mv-dk-h2">What we will not do, ever.</h2>
            <p className="mv-dk-intro">These are not preferences. They are the line. Breaking one would cost the exact trust we exist to protect.</p>
            <ol className="mv-numlist">
              {COMPANY_COMMITMENTS.map((c) => (
                <li key={c.lead}>
                  <span>
                    <strong>{c.lead}</strong> {c.rest}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mv-dk-sec" id="what-we-refuse">
            <p className="mv-kicker">What we refuse</p>
            <h2 className="mv-dk-h2">Three lines we do not cross.</h2>
            <p className="mv-dk-intro">
              These refusals are essential, not ethics bolted onto a product after the fact. They shape every line of code we ship and every document we help
              produce.
            </p>
            <div className="mv-trio">
              {NAMED_REFUSALS.map((r) => (
                <div key={r.term}>
                  <h3>{r.term}</h3>
                  <p>{r.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mv-dk-sec" id="traffic-lights">
            <p className="mv-kicker">Green / yellow / red</p>
            <h2 className="mv-dk-h2">How we sort use cases.</h2>
            <p className="mv-dk-intro">
              Not all AI use is equivalent. This is the same framework we use in Safety and Sandbox engagements, and how we evaluate our own use internally.
            </p>
            <div>
              {TRAFFIC_LIGHTS.map((t) => (
                <div className="mv-signal" key={t.label}>
                  <p className="mv-signal-tag">
                    <span className="mv-signal-dot" data-signal={t.signal} aria-hidden="true" />
                    {t.label}
                  </p>
                  <div>
                    <h3 className="mv-signal-h">{t.heading}</h3>
                    <p className="mv-signal-body">{t.body}</p>
                    <ul>
                      {t.examples.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mv-dk-sec" id="you-are-the-node">
            <p className="mv-kicker">You stay in charge</p>
            <h2 className="mv-dk-h2">AI supports your credibility, it does not replace you.</h2>
            <div className="mv-read">
              <p>
                The sustainable pattern: you handle creation and authority, what you teach, what you write, what you put your name on. AI handles
                discoverability and circulation: structure, metadata, translation, formatting, linking. Your work becomes easier to find and connect without the
                machine becoming you.
              </p>
              <p>
                AI is trained on the broad output of human writing, speech, and behavior. When you interact with it, it mirrors and amplifies what it has been
                trained on, and it mirrors and amplifies you specifically. That is why the most important operational decision is not which model you pick. It
                is who you deliberately gather around the work: the humans whose corpus, judgment, and vouching the system will reflect back.
              </p>
              <p>
                AI can help your work be legible and connected. It never becomes you. Only people can vouch for you. Only you can mean what you say before God
                and stand answerable for it as true.
              </p>
            </div>
            <p className="mv-pull">You out front. AI in the background.</p>
          </section>

          <section className="mv-dk-sec mv-page-end" id="scenius-refusals">
            <p className="mv-kicker">The scenius refusals</p>
            <h2 className="mv-dk-h2">What we will not build into the network.</h2>
            <p className="mv-dk-intro">
              The extractive version of this business is obvious, and we are building against it. That includes product choices, not only policy statements.
            </p>
            <ol className="mv-numlist">
              {SCENIUS_REFUSALS.map((x) => (
                <li key={x}>
                  <span>{x}</span>
                </li>
              ))}
            </ol>
            <p className="mv-dk-intro mv-dk-intro--ink">If a feature would feel extractive to us as members, we don&apos;t ship it.</p>
            <MvAskAi promptKey="howWeUseAi" />
          </section>
        </div>
      </div>
    </div>
  );
}
