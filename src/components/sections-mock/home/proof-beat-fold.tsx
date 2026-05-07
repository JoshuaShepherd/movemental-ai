/**
 * Product/proof beat. Sits between the credibility section and the closing
 * CTA. No CTA — the dark closing handles the close. Restrained typography
 * on the cream background, no images or stats grid.
 */
export function ProofBeatFold() {
  return (
    <section
      className="band-default"
      id="proof-beat"
      aria-labelledby="proof-beat-heading"
    >
      <div className="container">
        <header className="section-head">
          <h2
            id="proof-beat-heading"
            className="display"
          >
            The path is <em>being walked.</em>
          </h2>
        </header>

        <p className="mt-8 max-w-(--prose-max) text-lg leading-relaxed text-foreground md:text-xl">
          Movemental is two months old. Movement leaders across the missional
          and church-planting world have begun the path. Youthfront, a
          youth-development organization in Kansas City, completed Sandbox
          Discovery across ten teams in our first month of operation.
        </p>

        <p className="mt-6 max-w-(--prose-max) text-sm leading-relaxed text-muted-foreground italic md:text-base">
          Engagements completing. Voices joining. Networks beginning to form.
        </p>
      </div>
    </section>
  );
}
