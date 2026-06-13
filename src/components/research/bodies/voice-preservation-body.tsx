import type { ReactNode } from "react";
import Link from "next/link";

import styles from "../research.module.css";

function Cite({ n, title }: { n: number; title: string }) {
  return (
    <Link href="/research/sources" className={styles.citationSup} title={title}>
      [{n}]
    </Link>
  );
}

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={styles.textInkBlue} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/** Paper — ported from `docs/articles/graded-high/85-99/11-voice-preservation.md`. */
export const voicePreservationBody: ReactNode = (
  <>
    <h3 id="section-nlp">What the NLP field actually says</h3>

    <p>
      Early work on style transfer with recurrent networks showed that an author&rsquo;s style could be
      treated separately from content. That history is useful, but today&rsquo;s systems are built on
      massive pretrained models. &ldquo;Voice&rdquo; is tangled up with world knowledge, safety rules,
      and alignment training, not just word patterns.
    </p>

    <p>
      Is voice preservation solved? No. Multidisciplinary reviews of ChatGPT-era authorship{" "}
      <Cite n={30} title="Dwivedi et al. · 2023" /> treat governance, accountability, and epistemic
      risk as still open. Personalized LLM pilots in other high-stakes fields show the same pattern:
      personalization is feasible; deciding who is responsible is hard.
    </p>

    <h3 id="section-stack">RAG, fine-tuning, prompting: engineering trade-offs (not theology)</h3>

    <p>
      Retrieval-augmented generation works well when you need grounding in real excerpts. Movemental&rsquo;s
      corpus extraction story is directionally right. RAG is not automatic fidelity. Chunk boundaries,
      duplicate sources, stale editions, and missing negative examples (what this author denies) can
      still let the model sound right while reasoning wrong. Practitioner surveys on RAG exist because
      retriever, chunk, and generator together are a systems problem.
    </p>

    <p>
      Fine-tuning and parameter-efficient methods (LoRA, adapters; Hu et al.{" "}
      <Cite n={27} title="Hu et al. · Nature MI · 2023" />) can nudge a model toward an author&rsquo;s
      idiolect but raise data rights, overfitting, and version skew when the base model updates.
      Movemental likely wants per-tenant adapters plus frozen eval sets, not ad hoc retraining on every
      chat.
    </p>

    <p>
      Prompting alone is cheapest and most brittle: good for guardrails and tone, weak for long-horizon
      consistency unless paired with retrieval and tooling.
    </p>

    <p>
      Honest stack: prompt contracts, retrieval from a curated corpus, optional PEFT heads, and
      human-in-the-loop review for publish-tier outputs.
    </p>

    <h3 id="section-fidelity">Measuring fidelity: what exists, what does not</h3>

    <p>
      Classical stylometry and authorship attribution answer classification questions: which known author
      is closest? They do not certify that new prose extends the author faithfully in content.
    </p>

    <p>
      Ippolito, Duckworth, Callison-Burch, and Eck{" "}
      <Cite n={28} title="Ippolito et al. · ACL · 2020" /> show a deeper problem: human-likeness and
      machine detectability are not aligned. Decoding choices that fool people can leave statistical
      seams. That supports Movemental&rsquo;s intuition to pair human taste-testers (pastors, editors,
      co-authors) with automated drift detectors, not to trust either alone.
    </p>

    <p>
      Bottom line: a &ldquo;voice fidelity score&rdquo; should be documented as a composite internal
      metric (lexical overlap to corpus slices, embedding distance, human ratings), not as an objective
      industry standard.
    </p>

    <h3 id="section-cowriting">Human–AI co-writing and the 70/30 rule</h3>

    <p>
      Movemental&rsquo;s 70% AI draft / 30% human refinement is plausible as operations design. It caps
      labor and forces a final human pass. It is not an evidence-based universal optimum.
    </p>

    <p>
      Recent empirical work flags psychological side effects: collaboration with generative AI can help
      immediate task performance yet interact badly with intrinsic motivation depending on how autonomy
      is preserved. Educational psychology warns of metacognitive laziness when students lean on GenAI.
      Qualitative HCI work on fiction co-authorship with AI surfaces shame, control, and voice anxiety.
      Pastoral writers may feel those emotions even more acutely.
    </p>

    <p>
      Recommendation: Reframe 70/30 publicly as &ldquo;AI expands and structures; humans judge,
      correct, and take responsibility&rdquo; (an editing gate, not sole creator).
    </p>

    <h3 id="section-ethics">Ethics and trust: COPE norms and general audiences</h3>

    <p>
      Scientific publishing is stricter than marketing copy, but COPE&rsquo;s position is a useful north
      star: AI cannot be an author; use must be disclosed; humans remain accountable for every line{" "}
      <Cite n={29} title="COPE · Authorship and AI tools" />.
    </p>

    <p>
      General U.S. audiences are not neutral about post-hoc AI disclosure. Pew (Jun 9–15, 2025, n =
      5,023) <Cite n={26} title="Pew · Sep 2025 · n=5,023" /> found that if people learned, after the
      fact, that AI helped write content they already liked, 71% would view a political candidate less
      favorably for a speech, and 56% would react negatively about a news article. Religious exposition
      may pattern closer to speech and news than to music for skeptical hearers. Empirical testing with
      Movemental cohorts beats analogy.
    </p>

    <p>
      Among Protestant clergy, Barna data reported via NPR: only 12% comfortable using AI to write
      sermons, while 43% see merit for research and prep{" "}
      <Cite n={15} title="NPR / Barna · 2025" />. That split mirrors a defensible Movemental stance:
      assist study and drafting; do not usurp the pulpit without disclosure and discernment.
    </p>

    <h3 id="section-almost-right">The &ldquo;almost-right&rdquo; failure mode</h3>

    <p>
      The uncanny valley here is doctrinal and relational, not visual: fluent paragraphs that mis-handle
      nuance, flatten tensions the author keeps sharp, or hallucinate citations. Users experience this
      as betrayal of trust faster than as bad grammar.
    </p>

    <p>Mitigations that research and practice converge on:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Citation-to-corpus requirements for publish-tier text.</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Confidence gating (&ldquo;I don&rsquo;t have a grounded passage for this claim&rdquo;).
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Versioned prompts and retrieval indexes so voice drift is diagnosable when vendors ship new
          base models.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Specialist agents as critics, not only generators.</span>
      </li>
    </ul>

    <p>
      Ippolito et al.&rsquo;s ACL finding remains instructive years later: optimizing for human
      plausibility and optimizing for statistical consistency can pull in opposite directions{" "}
      <Cite n={28} title="Ippolito et al. · ACL · 2020" />. That is why a credibility agent is less a
      single scalar score and more a bundle: retrieval coverage, contradiction checks against canon
      excerpts, refusal when grounding is thin, and periodic human spot audits on the tail of the
      output distribution.
    </p>

    <h3 id="section-ghostwriters">Ghostwriters, editors, and where AI sits ethically</h3>

    <p>
      Professional ghostwriting already separates draft production from public attribution, but
      contracts, interview hours, and shared moral risk align incentives in ways models do not. Editors
      add judgment under the author&rsquo;s final authority. Raw LLM completion has no skin in the
      game.
    </p>

    <p>
      Movemental&rsquo;s ethical posture should therefore resemble editorial house rules more than solo
      authorship mystique: clear lanes (research assistant vs. drafter vs. polisher), logged
      interventions, and named human sign-off for anything that reads as first-person prophetic voice in
      the leader&rsquo;s name.
    </p>

    <h3 id="section-faith">Faith-sector reception: enthusiasm is not uniform</h3>

    <p>
      Public experiments range from disclosed liturgical &ldquo;AI Sundays&rdquo; to withdrawn chatbot
      personas when embodiment and sacramental language tripped community norms (e.g. Catholic
      Answers&rsquo; &ldquo;Father Justin&rdquo; rollout in 2024, widely reported as a lesson in role,
      absolution, and persona). Barna figures cited by NPR (12% comfortable with AI-written sermons vs.
      43% endorsing AI for prep <Cite n={15} title="NPR / Barna · 2025" />) suggest a wedge-shaped
      market: assistive use with transparent boundaries may earn patience that fully synthetic preaching
      does not.
    </p>

    <p>
      Movemental should expect denominational and generational splits. Pew&rsquo;s 2025 scenarios already
      show younger adults more negative than older adults about AI in some arts contexts{" "}
      <Cite n={26} title="Pew · Sep 2025 · n=5,023" />, so intuitions about &ldquo;youth love AI&rdquo;
      are unreliable without segmentation.
    </p>

    <h3 id="section-theology">Theology of voice (one paragraph, not a treatise)</h3>

    <p>
      Historic Christianity already distributed voice across scribes, translators, editors, and
      communal reading. The moral question is whether the commissioning agent (the leader) owns, tests,
      and stands behind the words. AI differs from a scribe chiefly in opacity and scale: it can
      simulate fluency without virtue. Movemental&rsquo;s theology-friendly line is instrumentalism with
      accountability: tools that amplify vocation when transparent, bounded, and submitted to community
      discernment, not a simulacrum that replaces formation.
    </p>

    <h3 id="section-public">How Movemental should talk about this in public</h3>

    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          Never imply the model is the leader; say it is trained and constrained to assist in their
          voice family.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          Disclose AI assistance tiers on published work (with granularity: outline, draft, edited,
          simulated Q&amp;A).
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>03.</span>
        <span>
          Publish evaluation methodology for fidelity scores at a high level, enough for critics to
          understand what is measured.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>04.</span>
        <span>
          Treat generic AI homogenization as a real baseline risk. The differentiator is corpus, rubric,
          and human gate, not a magic flag.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>05.</span>
        <span>
          Run longitudinal studies with pilot authors: blind panels, reader trust surveys, and
          theological error audits, not only BLEU-like proxies.
        </span>
      </li>
    </ol>

    <h3 id="section-closing">Closing</h3>

    <p>
      Voice preservation with today&rsquo;s stack is a genuine partial capability: retrieval and
      adaptation can produce recognizably on-brand prose for bounded tasks. It is not guaranteed
      fidelity to mind, conscience, or community. Movemental wins by saying the harder sentence first:{" "}
      <strong>
        the leader remains the author of record; the AI is support, powerful, inspectable, and never
        sufficient.
      </strong>
    </p>

    <h3 id="section-references">References (selected)</h3>
    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Ippolito, D., et al. (2020). Automatic detection of generated text is easiest when humans are
          fooled. <em>ACL</em>.{" "}
          <Ext href="https://doi.org/10.18653/v1/2020.acl-main.164">doi.org/10.18653/v1/2020.acl-main.164</Ext>
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Hu, E. J., et al. (2023). Parameter-efficient fine-tuning of large-scale pre-trained language
          models. <em>Nature Machine Intelligence</em>.{" "}
          <Ext href="https://doi.org/10.1038/s42256-023-00626-4">doi.org/10.1038/s42256-023-00626-4</Ext>
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Dwivedi, Y. K., et al. (2023). &ldquo;So what if ChatGPT wrote it?&rdquo;{" "}
          <em>International Journal of Information Management</em>.{" "}
          <Ext href="https://doi.org/10.1016/j.ijinfomgt.2023.102642">doi.org/10.1016/j.ijinfomgt.2023.102642</Ext>
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Pew Research Center (2025, Sep 17). From political speeches to songs…{" "}
          <Ext href="https://www.pewresearch.org/short-reads/2025/09/17/from-political-speeches-to-songs-how-would-americans-react-if-they-found-out-ai-was-involved/">
            pewresearch.org
          </Ext>
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          NPR (2025, Jul 17). We asked clergy if they use AI to help write sermons.{" "}
          <Ext href="https://www.npr.org/2025/07/17/nx-s1-5468637/clergy-grapple-with-the-ethics-of-using-ai-to-write-sermons">
            npr.org
          </Ext>
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          COPE. Authorship and AI tools.{" "}
          <Ext href="https://publicationethics.org/guidance/cope-position/authorship-and-ai-tools">
            publicationethics.org
          </Ext>
        </span>
      </li>
    </ul>
  </>
);
