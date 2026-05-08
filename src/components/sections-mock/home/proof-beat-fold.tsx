/**
 * Product/proof beat. Sits between the credibility section and the closing
 * CTA. No CTA — the dark closing handles the close. Restrained typography
 * on the cream background, no images or stats grid.
 */
export function ProofBeatFold() {
  return (
    <section
      className="band-section"
      id="proof-beat"
      aria-labelledby="proof-beat-heading"
    >
      <div className="container max-w-4xl space-y-12 text-center">
        <h2 id="proof-beat-heading" className="font-serif-display text-4xl italic leading-tight text-foreground md:text-5xl lg:text-6xl">
          The path is being walked.
        </h2>

        <p className="mx-auto text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
          Movemental is two months old. Movement leaders across the missional and church-planting world have begun the path. Youthfront, a youth-development
          organization in Kansas City, completed Sandbox Discovery across ten teams in our first month of operation.
        </p>

        <div className="mx-auto w-32 border-t border-border pt-12" />

        <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
          Engagements completing. Voices joining. Networks beginning to form.
        </p>
      </div>
    </section>
  );
}
