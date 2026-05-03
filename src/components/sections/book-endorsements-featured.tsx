import { EndorsementCard } from "@/components/book";
import { ArrowLink, Container, Display, Eyebrow, Section } from "@/components/primitives";
import { getFeaturedEndorsements } from "@/lib/book-data";
import { BOOK_TITLE } from "@/lib/book-meta";

export async function BookEndorsementsFeatured() {
  let list: Awaited<ReturnType<typeof getFeaturedEndorsements>> = [];
  try {
    list = await getFeaturedEndorsements(3);
  } catch {
    return null;
  }
  if (list.length === 0) return null;

  return (
    <Section variant="elevated">
      <Container>
        <Eyebrow className="mb-4">Free book</Eyebrow>
        <Display size="sm" as="h2" className="max-w-2xl">
          What readers are saying about <span className="italic">{BOOK_TITLE}</span>
        </Display>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {list.map((e) => (
            <EndorsementCard key={e.id} endorsement={e} />
          ))}
        </div>
        <div className="mt-8">
          <ArrowLink href="/book" size="md">
            Read the book
          </ArrowLink>
        </div>
      </Container>
    </Section>
  );
}
