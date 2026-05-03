import Image from "next/image";
import Link from "next/link";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Section } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { BOOK_HUB_PATH, SSSS_FIELD_GUIDE_PATH } from "@/lib/canon-routes";
import {
  AudienceInvitationSection,
  AudienceLabel,
  AudienceSerifEm,
} from "@/components/sections/audience-concept";

type TeamMember = {
  name: string;
  role: string;
  cardLine: string;
  bio: string;
  selectedWorks?: string;
  imageSrc?: string;
  imageAlt: string;
  initials: string;
};

const TEAM: TeamMember[] = [
  {
    name: "Brad Brisco",
    role: "CEO & Co-founder",
    cardLine:
      "Missional church strategist, author, and multiplication leader — helping churches and planters bridge institutional structures and grassroots mission.",
    bio: "Brad has shaped how North American churches understand missional transition, covocational church planting, and neighborhood-based mission — through published books, curriculum, organizational leadership with NAMB's Send Network, and training roles including Forge America and Forge Kansas City. He co-founded the Sentralized conference and keeps an active voice through the Missional Church Network.",
    selectedWorks:
      "The Missional Quest · Next Door as It Is in Heaven (with Lance Ford) · Covocational Church Planting",
    imageSrc: "/headshots/brad-brisco.webp",
    imageAlt: "Portrait of Brad Brisco, editorial photograph for the Movemental team page.",
    initials: "BB",
  },
  {
    name: "Alan Hirsch",
    role: "Chief Missiologist & Co-founder",
    cardLine:
      "Movement thinker, author, and founding influence behind Movemental's formation philosophy. Decades of work in missional theology, church planting, and leadership development.",
    bio: "Alan is known for helping the church recover its apostolic nature — and rediscover movement as its native expression. His current work translates four decades of frameworks into formational resources that equip leaders wherever they are. Co-founder of the 5Q Collective and Movement Leaders Collective; partner with 100 Movements and Forge across six continents.",
    selectedWorks: "The Forgotten Ways · 5Q · Reframation · The Permanent Revolution",
    imageSrc: "/headshots/alan-hirsch.webp",
    imageAlt: "Portrait of Alan Hirsch seated in conversation, editorial photograph.",
    initials: "AH",
  },
  {
    name: "Joshua Shepherd",
    role: "CTO & Founder",
    cardLine:
      "Full-stack architect with deep experience in platform infrastructure, AI systems, and movement-leader technology. Builds the system layer that holds everything together.",
    bio: "Joshua is a writer, formation guide, and the creator of Trail Guide — a hybrid digital and relational ecosystem designed to equip spiritual leaders and imaginative practitioners for life in a rapidly evolving machine age. Not a futurist by training, but a shepherd by instinct. At Movemental he leads product and engineering — translating that posture into infrastructure for thought leaders and formation-minded organizations.",
    imageSrc: "/headshots/joshua-shepherd.webp",
    imageAlt: "Portrait of Joshua Shepherd, editorial photograph for the Movemental team page.",
    initials: "JS",
  },
];

function TeamPortrait({
  imageSrc,
  imageAlt,
  initials,
}: Pick<TeamMember, "imageSrc" | "imageAlt" | "initials">) {
  if (imageSrc) {
    return (
      <div className="relative aspect-4/5 w-full overflow-hidden bg-section">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-4/5 w-full flex-col items-center justify-center gap-3 bg-section px-6 text-center">
      <span className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{initials}</span>
      <span className="max-w-[14ch] text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground">
        Editorial portrait in production
      </span>
    </div>
  );
}

/** Team — Concept Modern (`docs/html/team-concept-modern/index.html`). */
export function TeamPageContent() {
  return (
    <div data-team="concept-modern" className="text-pretty">
      <Section variant="default" spacing="lg" className="scroll-mt-(--site-chrome-total) pt-6 md:pt-10">
        <Container>
          <RevealOnScroll>
            <AudienceLabel>Team</AudienceLabel>
          </RevealOnScroll>
          <div className="mt-2 grid gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-end lg:gap-[clamp(3rem,6vw,5.5rem)]">
            <div>
              <RevealOnScroll delaySec={0.06}>
                <h1 className="text-display max-w-[22ch] text-balance text-foreground">
                  Infrastructure stewarded by people who understand <AudienceSerifEm>formation</AudienceSerifEm> and <AudienceSerifEm>movement</AudienceSerifEm>.
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delaySec={0.12} className="mt-6 max-w-[50ch] text-[clamp(1.1rem,1.7vw,1.25rem)] leading-relaxed text-muted-foreground">
                <p>
                  Movemental builds inspectable digital infrastructure for leaders whose public work carries formative
                  responsibility—where both sides of the{" "}
                  <Link
                    href="/book/read/two-intelligences"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    two intelligences
                  </Link>{" "}
                  (the informational corpus you publish and the relational trust you keep) face the same fragmentation
                  pressure when models summarize you without consent. It began as a frank conversation between two
                  authors whose books had been absorbed into training corpora, and a long-time reader with backgrounds in
                  mission, formation, and responsible technology. It has grown into a team committed to demonstrating a
                  humane alternative to scatter-only publishing.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delaySec={0.18} className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="#team">Meet the team</Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href="/contact">Start a conversation</Link>
                </Button>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delaySec={0.22}>
              <aside
                className="max-w-[36ch] bg-card px-5 py-5 font-serif text-[1.1rem] font-normal italic leading-relaxed text-foreground shadow-ambient"
                aria-label="How we think about the work"
              >
                <p>
                  &ldquo;Humans accountable for judgment. Systems that respect continuity. Design that treats
                  credibility as cumulative, not performative.&rdquo;
                </p>
              </aside>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      <Section id="how-we-work" variant="section" spacing="lg" aria-labelledby="how-we-work-title">
        <Container width="narrow">
          <RevealOnScroll>
            <AudienceLabel>How we work</AudienceLabel>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.06}>
            <h2 id="how-we-work-title" className="mt-2 max-w-[32ch] text-balance text-h2 text-foreground">
              Leadership, strategy, and engineering as <AudienceSerifEm>one thread</AudienceSerifEm>.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.12} className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              AI concentrates risk and opportunity in the same places missional leaders already feel stretched: corpus
              integrity, institutional trust, and the pace of public communication. Our backgrounds converge there on
              purpose—we are looking for partners willing to build something inspectable, not another content treadmill.
            </p>
            <p className="text-sm">
              <Link href="/fragmentation" className="font-medium text-primary underline-offset-4 hover:underline">
                Fragmentation story
              </Link>
              <span className="mx-2 text-ink-soft">·</span>
              <Link href="/faq" className="font-medium text-primary underline-offset-4 hover:underline">
                FAQ
              </Link>
              <span className="mx-2 text-ink-soft">·</span>
              <Link href={BOOK_HUB_PATH} className="font-medium text-primary underline-offset-4 hover:underline">
                Book
              </Link>
              <span className="mx-2 text-ink-soft">·</span>
              <Link
                href={SSSS_FIELD_GUIDE_PATH}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                AI Stewardship Sequence field guide
              </Link>
            </p>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section id="team" variant="default" spacing="lg" aria-labelledby="team-title">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end lg:gap-12">
            <div>
              <RevealOnScroll>
                <AudienceLabel>Who you&apos;re working with</AudienceLabel>
              </RevealOnScroll>
              <RevealOnScroll delaySec={0.06}>
                <h2 id="team-title" className="mt-2 max-w-[28ch] text-balance text-h2 text-foreground">
                  Three public faces, <AudienceSerifEm>one posture</AudienceSerifEm>.
                </h2>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delaySec={0.1} className="max-w-[54ch] text-base leading-relaxed text-muted-foreground">
              <p>
                <strong className="font-medium text-foreground">Brad Brisco</strong> (CEO &amp; co-founder),{" "}
                <strong className="font-medium text-foreground">Alan Hirsch</strong> (chief missiologist &amp;
                co-founder), and <strong className="font-medium text-foreground">Joshua Shepherd</strong> (CTO &amp;
                founder) carry the work from first call to shipped system.
              </p>
            </RevealOnScroll>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-3">
            {TEAM.map((member, i) => (
              <RevealOnScroll key={member.name} delaySec={0.05 * i}>
                <article className="flex h-full flex-col border border-border bg-card">
                  <TeamPortrait
                    imageSrc={member.imageSrc}
                    imageAlt={member.imageAlt}
                    initials={member.initials}
                  />
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div>
                      <h3 className="text-lg font-medium text-foreground">{member.name}</h3>
                      <p className="mt-1 text-sm text-primary">{member.role}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{member.cardLine}</p>
                    <div className="mt-auto space-y-3 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                      <p>{member.bio}</p>
                      {member.selectedWorks ? (
                        <details className="group pt-1">
                          <summary className="cursor-pointer list-none text-[0.7rem] font-medium uppercase tracking-eyebrow text-ink-soft transition-colors hover:text-foreground">
                            Selected works
                            <span className="ml-1 inline-block transition-transform group-open:rotate-90">›</span>
                          </summary>
                          <p className="mt-3">{member.selectedWorks}</p>
                        </details>
                      ) : null}
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      <AudienceInvitationSection
        variant="section"
        label="Next step"
        titleId="team-invitation-title"
        title={<>Work with people who treat your foundation as <AudienceSerifEm>load-bearing</AudienceSerifEm>.</>}
        body={
          <p>
            If you are stewarding a corpus, a network, or a formation pathway and need infrastructure that respects
            continuity, start with a conversation. The fragmentation story explains why integration comes before louder
            publishing.
          </p>
        }
        primaryCta={{ label: "Start a conversation", href: "/contact" }}
        secondaryCta={{ label: "Read the fragmentation story", href: "/fragmentation" }}
        tertiaryCta={{ label: "About Movemental", href: "/about" }}
      />
    </div>
  );
}
