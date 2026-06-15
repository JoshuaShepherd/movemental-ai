import { env } from "@/lib/env";
import { resendFromHeader } from "@/lib/email/from";
import { getResend } from "@/lib/email/resend";

export async function sendPublicPageRatifiedEmail(input: {
  leaderEmail: string;
  leaderName: string;
  publicPath: string;
}): Promise<void> {
  const resend = getResend();
  if (!resend) return;
  const base = env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://movemental.ai";
  const url = `${base}${input.publicPath}`;
  await resend.emails.send({
    from: resendFromHeader(),
    to: input.leaderEmail,
    subject: "Your public profile is live",
    text: [
      `Hi ${input.leaderName},`,
      "",
      "Your movement leader public page has been approved and published.",
      `Live URL: ${url}`,
      "",
      "You can update or unpublish it any time from your Movemental workspace under Public page.",
      "",
      ",  Movemental",
    ].join("\n"),
  });
}
