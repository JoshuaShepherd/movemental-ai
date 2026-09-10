import { UtilityShellView } from "@/v2/components/utility/utility-shell-view";

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
    return { title: "You’re already confirmed.", body: "Your subscription is active, nothing more to do." };
  }
  return { title: "You’re confirmed.", body: "Thanks for confirming, you’ll hear from us occasionally, never noisily." };
}

export default async function V2NewsletterConfirmedPage({ searchParams }: { searchParams: SearchParams }) {
  const { state, error } = await searchParams;
  const { title, body } = resolve(state, error);

  return <UtilityShellView title={title} body={body} actionHref="/" actionLabel="Return to home →" />;
}
