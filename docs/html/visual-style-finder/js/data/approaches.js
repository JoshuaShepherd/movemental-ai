/** Visual approach definitions + Stitch prompt metadata */

export const APPROACHES = [
  { id:'editorial', nm:'Editorial / print revival', tg:'Serif · hairlines · paper', sp:`
    <div class="sp sp-ed">
      <div class="eb">Vol. 01 · Essay</div>
      <h3>The quiet turn</h3><hr>
      <p>A page that behaves like a page. Serif display, thin rules, and margins that let an idea breathe — the look of a person with something to say, not a product with something to sell.</p>
      <div class="fn">— 01</div>
    </div>` },
  { id:'typography', nm:'Typography as interface', tg:'Oversized · kinetic type', sp:`
    <div class="sp sp-ty">
      <div class="big">Big&nbsp;<em>idea</em></div>
      <div class="cn">Type is the interface</div>
    </div>` },
  { id:'warmmin', nm:'Warm minimalism', tg:'Earthy · calm · whitespace', sp:`
    <div class="sp sp-wm">
      <div class="mid"><span>less, warmly</span></div>
      <div class="sw"><i style="background:#EFEDE4"></i><i style="background:#CBB6A3"></i><i style="background:#A79E86"></i><i style="background:#6E7B5C"></i><i style="background:#3B3A32"></i></div>
    </div>` },
  { id:'handmade', nm:'Human / hand-made', tg:'Marginalia · ink · imperfection', sp:`
    <div class="sp sp-hm">
      <h3>Made by a <span style="position:relative">human
        <svg class="u" viewBox="0 0 120 12" preserveAspectRatio="none"><path d="M2 7 Q30 2 60 6 T118 5" stroke="#22409B" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>
      </span>.</h3>
      <div class="note">— yes, this</div>
      <div class="body">A feathered underline. A note in the margin. Proof a person was here.</div>
    </div>` },
  { id:'scrolly', nm:'Scroll-driven storytelling', tg:'Narrative · reveals', sp:`
    <div class="sp sp-sc">
      <div class="track"><div class="ln"></div><div class="dot"></div></div>
      <div class="frames">
        <div class="fr f-a act"><div class="h"></div><div class="l"></div></div>
        <div class="fr f-b"><div class="h"></div><div class="l"></div></div>
        <div class="fr f-c"><div class="h"></div><div class="l"></div></div>
      </div>
      <div class="cn">Unfolds on scroll</div>
    </div>` },
  { id:'motion', nm:'Purposeful motion', tg:'Micro-interactions', sp:`
    <div class="sp sp-mo">
      <div class="draw">every move earns it
        <svg viewBox="0 0 160 10" preserveAspectRatio="none"><path d="M2 6 Q60 1 158 5"/></svg>
      </div>
      <div class="row">
        <div class="tog"><i></i></div>
        <div class="pulse"></div>
        <div class="cn">Motion with a job</div>
      </div>
    </div>` },
  { id:'bento', nm:'Bento / modular blocks', tg:'Scannable hub', sp:`
    <div class="sp sp-be"><div class="bento">
      <div class="b tall">Books</div>
      <div class="b wide">Essays</div>
      <div class="b">Course</div>
      <div class="b">Talks</div>
      <div class="b k">Ask ↳</div>
    </div></div>` },
  { id:'cinematic', nm:'Cinematic dark', tg:'Gravitas · one accent', sp:`
    <div class="sp sp-ci">
      <div class="eb">A Movemental Note</div>
      <h3>A threshold.</h3>
      <div class="acc"></div>
    </div>` },
  { id:'depth3d', nm:'Immersive depth (3D)', tg:'Used sparingly', sp:`
    <div class="sp sp-3d">
      <div class="scene">
        <div class="face f1"></div><div class="face f2"></div><div class="face f3"></div>
        <div class="face f4"></div><div class="face f5"></div><div class="face f6"></div>
      </div>
      <div class="cn">Depth, sparingly</div>
    </div>` },
  { id:'adaptive', nm:'Adaptive / AI-aware', tg:'Meets each reader', sp:`
    <div class="sp sp-ai">
      <div class="ask"><span class="q"></span><span>Ask about the work…</span></div>
      <div class="chips"><span class="chip on">Pastor</span><span class="chip">Donor</span><span class="chip">Skeptic</span></div>
      <div class="adapt"><b>Here's where to begin&nbsp;→</b><b>Here's what your gift builds&nbsp;→</b><b>Here's the honest case&nbsp;→</b></div>
      <div class="cn">Meets each reader</div>
    </div>` },
];

/* ---------- twenty palettes ---------- */

export const APPROACH_TAGS = {
  editorial:['editorial','calm'], typography:['bold','expressive'], warmmin:['minimal','calm'],
  handmade:['hand-made','warm'], scrolly:['narrative','immersive'], motion:['polished','dynamic'],
  bento:['structured','modern'], cinematic:['dramatic','dark'], depth3d:['immersive','dramatic'],
  adaptive:['modern','dynamic']
};

/* ---------- structured Stitch-prompt content per approach ---------- */

export const APPROACH_PROMPTS = {
  editorial:{
    pal:'Warm paper #FBFAF6, near-black ink #1A1A1A, warm hairline #E5DFD2, one restrained ink-blue accent #22409B. No boxes, no drop shadows.',
    ty:'High-contrast serif display (e.g. Playfair Display) used large; a clean sans (Inter) for body; a mono (IBM Plex Mono) for uppercase eyebrows and labels.',
    lay:'A single wide reading column with a narrow margin rail for footnotes. Small uppercase eyebrow, large serif headline, a thin hairline rule, then two-column body text.',
    sig:'A drop cap opening the body, thin rules instead of cards, hanging footnote markers, zero border-radius.',
    mo:'Minimal — a hairline that draws itself under the headline on load; otherwise still.'
  },
  typography:{
    pal:'Paper #FBFAF6, ink #1A1A1A, one accent #22409B used on a single word.',
    ty:'One word set enormous and viewport-scaled in a high-contrast serif or a tight grotesque; a small mono caption underneath.',
    lay:'Type is the hero: a headline that bleeds from the left edge to the right and fills the screen. Everything else is sparse and secondary.',
    sig:'An oversized headline where one word is italic or accent-coloured; the letters nearly touch the edges.',
    mo:'Font weight or width shifts slightly as the user scrolls or hovers.'
  },
  warmmin:{
    pal:'Cloud-Dancer off-white #EFEDE4, taupe #CBB6A3, stone #A79E86, sage #6E7B5C, deep near-black #3B3A32 — muted, earthy, calm.',
    ty:'A refined serif or humanist sans set quietly; small-caps or mono labels; lots of air.',
    lay:'Airy and centred with very few elements. Generous whitespace, one line of thin serif, and a quiet row of earthy swatches or a single image.',
    sig:'Negative space as the main material; an earthy palette strip; nothing loud.',
    mo:'Soft fades only.'
  },
  handmade:{
    pal:'Paper #FBFAF6, ink #1A1A1A, one blue accent #22409B; optional faint paper grain.',
    ty:'Serif headline with a hand-drawn feathered underline; a handwriting face (e.g. Caveat) for a single margin note.',
    lay:'A text page that behaves like an annotated manuscript — a faint red margin line, a note in the margin, a circled word, an arrow pointing at real content.',
    sig:'A feathered hand-drawn underline and a handwritten margin note; the sense that a person marked this up.',
    mo:'None, or a subtle ink-reveal.'
  },
  scrolly:{
    pal:'Paper #FBFAF6, ink #1A1A1A, one accent #22409B.',
    ty:'Serif headline with generous line height; clean sans body.',
    lay:'Full-height sections that reveal as you scroll. A pinned word or image on one side, stacked frames that fade in one at a time along a vertical track.',
    sig:'A slim scroll-progress track with a moving dot; content that unfolds sequentially rather than all at once.',
    mo:'Scroll-triggered fades and pins — functional, guiding attention, never decorative.'
  },
  motion:{
    pal:'Paper #FBFAF6, ink #1A1A1A, one accent #22409B.',
    ty:'Clean sans for UI with serif accents.',
    lay:'A calm, uncluttered layout whose life is in the interactions: a self-drawing underline, a toggle that slides, a button with a soft ripple, clear hover feedback on everything clickable.',
    sig:'Purposeful micro-interactions plus one orchestrated page-load sequence.',
    mo:'Every animation does a job — it informs, directs, or delights; nothing moves just to move.'
  },
  bento:{
    pal:'Paper #FBFAF6, ink #1A1A1A, one accent #22409B on a single filled tile.',
    ty:'Mono labels, serif tile titles.',
    lay:'A modular grid of tiles of varied sizes forming a hub — e.g. Books, Essays, Course, Talks, and one accent "Ask" tile. Each tile is scannable at a glance.',
    sig:'A bento grid where exactly one tile is filled ink-blue as the primary call to action.',
    mo:'A subtle lift on tile hover.'
  },
  cinematic:{
    pal:'Near-black #0A0E1A background, off-white #F3F1EA text, an ink-blue glow #22409B.',
    ty:'A light-weight serif display on dark; a small mono eyebrow.',
    lay:'A dark, near-empty hero: a soft radial ink-blue glow, one line of serif, and a short accent underline. A threshold before the lighter content below.',
    sig:'A radial ink-blue glow behind a single serif line.',
    mo:'A slow ambient glow and a gentle fade-up.'
  },
  depth3d:{
    pal:'Paper #FBFAF6, ink #1A1A1A, accent #22409B used as a wireframe line.',
    ty:'Restrained; a small mono caption.',
    lay:'A single interactive 3D object (a wireframe cube or sphere) as the hero; everything else quiet and flat around it.',
    sig:'One slowly rotating wireframe object — depth used as a single accent, not everywhere.',
    mo:'A slow continuous rotation and light parallax on scroll. Keep it fast and never gimmicky.'
  },
  adaptive:{
    pal:'Paper #FBFAF6, ink #1A1A1A, one accent #22409B.',
    ty:'Clean sans with mono chips.',
    lay:'An "ask" bar as a primary element, plus audience chips (e.g. different reader types) that swap the headline and call to action so the same page meets each visitor differently.',
    sig:'An ask bar and audience chips that visibly change the copy.',
    mo:'A line of copy that swaps as the audience chip changes.'
  }
};

/* ---------- real sites & template galleries (screenshots load client-side) ---------- */
