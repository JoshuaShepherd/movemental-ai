import type { ReactNode } from "react";
import Link from "next/link";

import { Container, Display, Prose, Section } from "@/components/primitives";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function NewsletterUnsubscribedPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const state = typeof sp.state === "string" ? sp.state : undefined;
  const error = typeof sp.error === "string" ? sp.error : undefined;

  let title = "You are unsubscribed";
  let body: ReactNode = (
    <p>We removed this address from the Movemental list. You can always subscribe again from the site footer.</p>
  );

  if (error === "missing_token" || error === "invalid_token" || error === "unknown") {
    title = "Link not valid";
    body = (
      <p>
        This unsubscribe link is invalid or has expired. If you still receive mail,{" "}
        <Link href="/contact" className="font-medium text-primary underline-offset-4 hover:underline">
          contact us
        </Link>{" "}
        and we will handle it manually.
      </p>
    );
  } else if (error === "not_configured") {
    title = "Unsubscribe unavailable";
    body = (
      <p>
        This site is not configured for one-click unsubscribe yet. Please use the contact page and we will remove you.
      </p>
    );
  } else if (error === "rate_limited") {
    title = "Too many requests";
    body = <p>Please wait a little while and try the link again, or reach out via the contact page.</p>;
  } else if (error === "server") {
    title = "Something went wrong";
    body = (
      <p>
        We could not complete the request. Please try again in a few minutes or{" "}
        <Link href="/contact" className="font-medium text-primary underline-offset-4 hover:underline">
          reach out
        </Link>
        .
      </p>
    );
  } else if (state === "already") {
    title = "Already removed";
    body = <p>This address was already unsubscribed. No further action needed.</p>;
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
