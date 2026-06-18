/**
 * Preview vs launch indexing policy.
 *
 * When `NEXT_PUBLIC_SITE_LAUNCH_READY` is unset or `"0"`, agent surfaces emit
 * `noindex, nofollow` and the sitemap omits preview-only routes. Set to `"1"`
 * when the site is ready for public indexing.
 */
export function isSiteLaunchReady(): boolean {
  return process.env.NEXT_PUBLIC_SITE_LAUNCH_READY === "1";
}

/** Metadata robots block for preview-mode agent and utility surfaces. */
export function previewRobotsMetadata(): { index: false; follow: false } | undefined {
  return isSiteLaunchReady() ? undefined : { index: false, follow: false };
}
