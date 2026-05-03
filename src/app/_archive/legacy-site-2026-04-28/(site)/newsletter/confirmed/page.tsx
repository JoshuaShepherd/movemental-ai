import type { ReactNode } from "react";
import Link from "next/link";

import { Container, Display, Prose, Section } from "@/components/primitives";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function NewsletterConfirmedPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const state = typeof sp.state === "string" ? sp.state : undefined;
  const error = typeof sp.error === "string" ? sp.error : undefined;

  let title = "Subscription confirmed";
  let body: ReactNode = (
    <p>You are on the list. We will see you in the next note.</p>
  );

  if (error === "missing_token" || error === "invalid_token") {
    title = "Link not valid";
    body = (
      <p>
        This confirmation link is invalid or has expired. Please subscribe again from the site footer, or{" "}
        <Link href="/contact" className="font-medium text-primary underline-offset-4 hover:underline">
          contact us
        </Link>
        .
      </p>
    );
  } else if (error === "server") {
    title = "Something went wrong";
    body = (
      <p>
        We could not complete confirmation. Please try again in a few minutes or{" "}
        <Link href="/contact" className="font-medium text-primary underline-offset-4 hover:underline">
          reach out
        </Link>
        .
      </p>
    );
  } else if (state === "already") {
    title = "Already confirmed";
    body = <p>Your email was already confirmed. No further action needed.</p>;
  }

  return (
    <Section spacing="lg">
      <Container className="max-w-2xl">
        <Display size="md" as="h1">
          {title}
        </Display>
        <Prose className="mt-6">{body}</Prose>
        <p className="mt-10">
          <Link href="/" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
            Back to home
          </Link>
        </p>
      </Container>
    </Section>
  );
}
