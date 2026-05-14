import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function ReadinessInviteNotFound() {
  return (
    <div className="mx-auto flex min-h-[50dvh] max-w-lg flex-col justify-center gap-6 px-6 py-16 text-center">
      <h1 className="font-serif text-2xl italic text-foreground">Link not available</h1>
      <p className="text-muted-foreground">
        This readiness check-in link is invalid, expired, or has been revoked. Ask your
        facilitator for a new link from the SandboxLive readiness page.
      </p>
      <Button variant="outline" asChild className="self-center">
        <Link href="/">Movemental home</Link>
      </Button>
    </div>
  );
}
