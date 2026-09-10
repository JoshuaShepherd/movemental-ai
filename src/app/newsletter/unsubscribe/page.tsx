import { UtilityShellView } from "@/v2/components/utility/utility-shell-view";

type SearchParams = Promise<{ state?: string; error?: string }>;

function resolve(state?: string, error?: string): { title: string; body: string } {
  if (error === "rate_limited") {
    return { title: "One moment.", body: "Too many attempts just now, wait a minute and try the link again." };
  }
  if (error === "missing_token" || error === "invalid_token" || error === "not_configured") {
    return {
      title: "That link didn’t work.",
      body: "The unsubscribe link is missing or invalid. Email josh@movemental.ai and we’ll take you off the list directly.",
    };
  }
  if (error) {
    return {
      title: "Something went wrong.",
      body: "We couldn’t process that just now. Please try the link again, or email josh@movemental.ai.",
    };
  }
  if (state === "already") {
    return { title: "You’re already unsubscribed.", body: "You won’t receive further emails from us." };
  }
  return { title: "You’re unsubscribed.", body: "Done, you won’t hear from us again. No hard feelings." };
}

export default async function V2NewsletterUnsubscribePage({ searchParams }: { searchParams: SearchParams }) {
  const { state, error } = await searchParams;
  const { title, body } = resolve(state, error);

  return <UtilityShellView title={title} body={body} actionHref="/" actionLabel="Return to home →" />;
}
