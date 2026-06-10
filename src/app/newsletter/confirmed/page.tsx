import Link from "next/link";

type SearchParams = Promise<{ state?: string; error?: string }>;

function resolve(state?: string, error?: string): { title: string; body: string } {
  if (error === "missing_token" || error === "invalid_token") {
    return {
      title: "That link didn’t work.",
      body: "The confirmation link is missing or has expired. Sign up again and we’ll send a fresh one.",
    };
  }
  if (error) {
    return {
      title: "Something went wrong.",
      body: "We couldn’t confirm your subscription just now. Please try the link again in a moment.",
    };
  }
  if (state === "already") {
    return { title: "You’re already confirmed.", body: "Your subscription is active — nothing more to do." };
  }
  return { title: "You’re confirmed.", body: "Thanks for confirming — you’ll hear from us occasionally, never noisily." };
}

export default async function NewsletterConfirmedPage({ searchParams }: { searchParams: SearchParams }) {
  const { state, error } = await searchParams;
  const { title, body } = resolve(state, error);

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-20 md:py-28">
      <p className="mb-6 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted-foreground">
        Newsletter
      </p>
      <h1 className="text-4xl leading-tight md:text-5xl">{title}</h1>
      <p className="mt-8 text-lg leading-relaxed text-foreground">{body}</p>
      <p className="mt-10">
        <Link href="/agent" className="text-[var(--color-ink-band-blue)] underline underline-offset-4">
          Back to the room →
        </Link>
      </p>
    </div>
  );
}
