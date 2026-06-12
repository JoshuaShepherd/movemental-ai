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
      <strong>Style transfer: from RNN experiments to LLMs.</strong> Early NLG work on stylistic
      transfer with recurrent networks established that <strong>style</strong> could be treated as a{" "}
      <strong>learnable layer</strong> separate from content—useful history, but pre-transformer.
      Today&rsquo;s systems default to <strong>massive pretrained</strong> representations;
      &ldquo;voice&rdquo; is entangled with <strong>world knowledge</strong>, <strong>alignment</strong>,
      and <strong>safety refusals</strong>, not only n-gram statistics.
    </p>

    <p>
      <strong>Is voice preservation &ldquo;solved&rdquo;?</strong> <strong>No.</strong>{" "}
      Multidisciplinary stock-takes on ChatGPT-era authorship{" "}
      <Cite n={30} title="Dwivedi et al. · 2023" /> treat{" "}
      <strong>governance, accountability, and epistemic risk</strong> as open. Personalized LLM
      pilots in other high-stakes domains show the pattern:{" "}
      <strong>personalization is feasible; responsibility routing is hard</strong>.
    </p>

    <h3 id="section-stack">RAG, fine-tuning, prompting: engineering trade-offs (not theology)</h3>

    <p>
      <strong>Retrieval-augmented generation</strong> shines when the goal is{" "}
      <strong>grounding in real excerpts</strong>—Movemental&rsquo;s corpus extraction story is
      directionally right. RAG is not automatic fidelity: chunk boundaries, duplicate sources, stale
      editions, and <strong>missing negative examples</strong> (&ldquo;what this author denies&rdquo;)
      still let the model <strong>sound</strong> right while <strong>reasoning</strong> wrong.
      Practitioner surveys on RAG exist precisely because{" "}
      <strong>retriever + chunk + generator</strong> is a systems problem.
    </p>

    <p>
      <strong>Fine-tuning / PEFT</strong> (LoRA, adapters—Hu et al.{" "}
      <Cite n={27} title="Hu et al. · Nature MI · 2023" />) can move the prior toward an
      author&rsquo;s idiolect but raises <strong>data rights</strong>, <strong>overfitting</strong>,
      and <strong>version skew</strong> when the base model updates. Movemental likely wants{" "}
      <strong>per-tenant adapters</strong> plus <strong>frozen eval sets</strong>, not ad hoc
      retraining on every chat.
    </p>

    <p>
      <strong>Prompting alone</strong> is cheapest and most brittle: good for{" "}
      <strong>guardrails and tone</strong>, weak for <strong>long-horizon consistency</strong> unless
      paired with retrieval and tooling.
    </p>

    <p>
      <strong>Honest stack:</strong> prompt contracts + <strong>retrieval from curated corpus</strong>{" "}
      + optional <strong>PEFT heads</strong> + <strong>human-in-the-loop</strong> for publish-tier
      outputs.
    </p>

    <h3 id="section-fidelity">Measuring fidelity: what exists, what does not</h3>

    <p>
      Classical <strong>stylometry</strong> and authorship attribution answer{" "}
      <strong>classification</strong> questions: &ldquo;Which known author is closest?&rdquo; They do{" "}
      <strong>not</strong> certify that <strong>new</strong> prose <strong>extends</strong> the author
      faithfully in <strong>content</strong>.
    </p>

    <p>
      Ippolito, Duckworth, Callison-Burch, and Eck{" "}
      <Cite n={28} title="Ippolito et al. · ACL · 2020" /> show a deeper problem:{" "}
      <strong>human-likeness</strong> and <strong>machine detectability</strong> are not aligned—decoding
      choices that fool people can leave statistical seams. That supports Movemental&rsquo;s intuition to
      pair <strong>human taste-testers</strong> (pastors, editors, co-authors) with{" "}
      <strong>automated drift detectors</strong>, not to trust either alone.
    </p>

    <p>
      <strong>Bottom line:</strong> a &ldquo;voice fidelity score&rdquo; should be documented as a{" "}
      <strong>composite internal metric</strong> (lexical overlap to corpus slices + embedding distance
      + human ratings), <strong>not</strong> as an objective industry standard.
    </p>

    <h3 id="section-cowriting">Human–AI co-writing and the 70/30 rule</h3>

    <p>
      Movemental&rsquo;s <strong>70% AI draft / 30% human refinement</strong> is plausible as{" "}
      <strong>operations design</strong>—it caps labor and forces a final human pass. It is{" "}
      <strong>not</strong> an evidence-based universal optimum.
    </p>

    <p>
      Recent empirical work flags psychological side effects: collaboration with generative AI can{" "}
      <strong>help immediate task performance</strong> yet interact badly with{" "}
      <strong>intrinsic motivation</strong> depending on how autonomy is preserved. Educational
      psychology warns of <strong>metacognitive laziness</strong> when students lean on GenAI.
      Qualitative HCI work on <strong>fiction co-authorship with AI</strong> surfaces shame, control,
      and voice anxiety—emotions <strong>pastoral</strong> writers may feel even more acutely.
    </p>

    <p>
      <strong>Recommendation:</strong> Reframe 70/30 publicly as{" "}
      <strong>&ldquo;AI expands and structures; humans judge, correct, and take responsibility&rdquo;</strong>
      —an editing gate, not sole creator.
    </p>

    <h3 id="section-ethics">Ethics and trust: COPE norms and general audiences</h3>

    <p>
      Scientific publishing is stricter than marketing copy, but <strong>COPE&rsquo;s</strong> position
      is a useful north star: <strong>AI cannot be an author</strong>; use must be{" "}
      <strong>disclosed</strong>; humans remain <strong>accountable</strong> for every line{" "}
      <Cite n={29} title="COPE · Authorship and AI tools" />.
    </p>

    <p>
      General U.S. audiences are <strong>not</strong> neutral about post-hoc AI disclosure. Pew (
      <strong>Jun 9–15, 2025</strong>, <strong>n = 5,023</strong>){" "}
      <Cite n={26} title="Pew · Sep 2025 · n=5,023" /> found that if people learned—after the fact—that
      AI helped write content they <strong>already liked</strong>, <strong>71%</strong> would view a{" "}
      <strong>political candidate</strong> less favorably for a speech, and <strong>56%</strong> would
      react negatively about a <strong>news article</strong>. Religious exposition may pattern closer
      to <strong>speech/news</strong> than to <strong>music</strong> for skeptical hearers—{" "}
      <strong>empirical testing</strong> with Movemental cohorts beats analogy.
    </p>

    <p>
      Among <strong>Protestant clergy</strong>, Barna data reported via NPR: only{" "}
      <strong>12%</strong> comfortable using AI to <strong>write</strong> sermons, while{" "}
      <strong>43%</strong> see merit for <strong>research and prep</strong>{" "}
      <Cite n={15} title="NPR / Barna · 2025" />. That split mirrors a defensible Movemental stance:{" "}
      <strong>assist study and drafting; do not usurp the pulpit without disclosure and discernment.</strong>
    </p>

    <h3 id="section-almost-right">The &ldquo;almost-right&rdquo; failure mode</h3>

    <p>
      The uncanny valley here is <strong>doctrinal and relational</strong>, not visual: fluent
      paragraphs that <strong>mis-handle nuance</strong>, <strong>flatten tensions</strong> the author
      keeps sharp, or <strong>hallucinate</strong> citations. Users experience this as{" "}
      <strong>betrayal of trust</strong> faster than as &ldquo;bad grammar.&rdquo;
    </p>

    <p>Mitigations that research and practice converge on:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Citation-to-corpus</strong> requirements for publish-tier text.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Confidence gating</strong> (&ldquo;I don&rsquo;t have a grounded passage for this
          claim&rdquo;).
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Versioned</strong> prompts and retrieval indexes so &ldquo;voice drift&rdquo; is
          diagnosable when vendors ship new base models.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Specialist agents</strong> as <strong>critics</strong>, not only generators.
        </span>
      </li>
    </ul>

    <p>
      Ippolito et al.&rsquo;s ACL finding remains instructive years later:{" "}
      <strong>optimizing for human plausibility</strong> and{" "}
      <strong>optimizing for statistical consistency</strong> can pull in <strong>opposite directions</strong>{" "}
      <Cite n={28} title="Ippolito et al. · ACL · 2020" />. That is why a credibility agent is less a
      single scalar score and more a <strong>bundle</strong>: retrieval coverage, contradiction checks
      against canon excerpts, <strong>refusal</strong> when grounding is thin, and periodic{" "}
      <strong>human spot audits</strong> on the tail of the output distribution.
    </p>

    <h3 id="section-ghostwriters">Ghostwriters, editors, and where AI sits ethically</h3>

    <p>
      Professional ghostwriting already separates <strong>draft production</strong> from{" "}
      <strong>public attribution</strong>—but contracts, interview hours, and{" "}
      <strong>shared moral risk</strong> align incentives in ways models do not. Editors add{" "}
      <strong>judgment under the author&rsquo;s final authority</strong>. Raw LLM completion, by
      contrast, <strong>has no skin in the game</strong>.
    </p>

    <p>
      Movemental&rsquo;s ethical posture should therefore resemble <strong>editorial house rules</strong>{" "}
      more than <strong>solo authorship mystique</strong>: clear <strong>lanes</strong> (research
      assistant vs. drafter vs. polisher), <strong>logged</strong> interventions, and <strong>named</strong>{" "}
      human sign-off for anything that reads as <strong>first-person prophetic</strong> voice in the
      leader&rsquo;s name.
    </p>

    <h3 id="section-faith">Faith-sector reception: enthusiasm is not uniform</h3>

    <p>
      Public experiments range from <strong>disclosed</strong> liturgical &ldquo;AI Sundays&rdquo; to{" "}
      <strong>withdrawn</strong> chatbot personas when embodiment and sacramental language tripped
      community norms (e.g. Catholic Answers&rsquo; &ldquo;Father Justin&rdquo; rollout in 2024, widely
      reported as a lesson in <strong>role, absolution, and persona</strong>). Barna figures cited by
      NPR—<strong>12%</strong> comfortable with AI-<strong>written</strong> sermons vs.{" "}
      <strong>43%</strong> endorsing AI for <strong>prep</strong>{" "}
      <Cite n={15} title="NPR / Barna · 2025" />—suggest a <strong>wedge-shaped</strong> market:
      assistive use with <strong>transparent boundaries</strong> may earn patience that{" "}
      <strong>fully synthetic preaching</strong> does not.
    </p>

    <p>
      Movemental should expect <strong>denominational</strong> and <strong>generational</strong> splits;
      Pew&rsquo;s 2025 scenarios already show <strong>younger adults</strong> more negative than older
      adults about AI in <strong>some</strong> arts contexts{" "}
      <Cite n={26} title="Pew · Sep 2025 · n=5,023" />, so intuitions about &ldquo;youth love AI&rdquo;
      are unreliable without segmentation.
    </p>

    <h3 id="section-theology">Theology of voice (one paragraph, not a treatise)</h3>

    <p>
      Historic Christianity already distributed <strong>voice</strong> across scribes, translators,
      editors, and communal reading. The moral question is whether the <strong>commissioning agent</strong>
      —the leader—<strong>owns, tests, and stands behind</strong> the words. AI differs from a scribe
      chiefly in <strong>opacity and scale</strong>: it can <strong>simulate</strong> fluency without{" "}
      <strong>virtue</strong>. Movemental&rsquo;s theology-friendly line is therefore{" "}
      <strong>instrumentalism with accountability</strong>: tools that <strong>amplify</strong> vocation
      when <strong>transparent</strong>, <strong>bounded</strong>, and{" "}
      <strong>submitted to community discernment</strong>—not a simulacrum that <strong>replaces</strong>{" "}
      formation.
    </p>

    <h3 id="section-public">How Movemental should talk about this in public</h3>

    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          <strong>Never</strong> imply the model <strong>is</strong> the leader; say it is{" "}
          <strong>trained and constrained</strong> to assist in their voice <strong>family</strong>.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          <strong>Disclose</strong> AI assistance tiers on published artifacts (with granularity:
          &ldquo;outline,&rdquo; &ldquo;draft,&rdquo; &ldquo;edited,&rdquo; &ldquo;simulated
          Q&amp;A&rdquo;).
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>03.</span>
        <span>
          <strong>Publish evaluation methodology</strong> for fidelity scores at a high level—enough for
          critics to understand <strong>what is measured</strong>.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>04.</span>
        <span>
          Treat <strong>generic AI homogenization</strong> as a <strong>real baseline risk</strong>—the
          differentiator is <strong>corpus + rubric + human gate</strong>, not a magic flag.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>05.</span>
        <span>
          Run <strong>longitudinal studies</strong> with pilot authors: blind panels, reader trust
          surveys, and <strong>theological error</strong> audits—not only BLEU-like proxies.
        </span>
      </li>
    </ol>

    <h3 id="section-closing">Closing</h3>

    <p>
      Voice preservation with today&rsquo;s stack is a <strong>genuine partial capability</strong>:
      retrieval and adaptation can produce <strong>recognizably on-brand</strong> prose for bounded
      tasks. It is <strong>not</strong> guaranteed fidelity to <strong>mind, conscience, or community</strong>.
      Movemental wins by saying the harder sentence first:{" "}
      <strong>
        the leader remains the author of record; the AI is scaffolding—powerful, inspectable, and never
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
