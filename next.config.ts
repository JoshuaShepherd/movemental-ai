import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Pin Turbopack's workspace root to this directory so Next 16 doesn't
// walk up the filesystem and pick up an unrelated parent lockfile.
const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Match pre-build-check: typecheck src + proxy only — not scripts/tests.
  typescript: {
    tsconfigPath: "tsconfig.build.json",
  },
  turbopack: {
    root: projectRoot,
  },
  // Keep native server modules out of the client bundle.
  serverExternalPackages: [
    "postgres",
    "drizzle-orm",
    "@supabase/ssr",
    "sharp",
  ],
  /**
   * Map friendly URLs `/onboarding/:step` to the implementation under `/dashboard/onboarding/:step`.
   * Keeps checklist links stable while ensuring a concrete route tree exists (helps some subdomain /
   * edge setups where `/dashboard/**` is the only segment guaranteed to hit this app).
   */
  async rewrites() {
    return [
      { source: "/onboarding/leader/:leaderStep", destination: "/dashboard/onboarding/leader/:leaderStep" },
      { source: "/onboarding/:step", destination: "/dashboard/onboarding/:step" },
    ];
  },
  async redirects() {
    /**
     * Legacy redirect destinations (agent-first surface, 2026-06 route repair):
     *   /agent        — narrative, contact, audience landings, team
     *   /field-guide  — content, book, blog, pathway/safety, toolkit
     *   /field-guide?guide=sandbox — pathway sandbox/lab
     *   /assess       — assessment aliases
     *   /enroll       — commercial / org-fit intent
     */
    return [
      // Cutover (S10, October 2026): the Paper pages took their final URLs; the -new paths and the
      // pages they replaced redirect here. See docs/build/ROUTE-INVENTORY.md.
      { source: "/home-page-new", destination: "/", permanent: true },
      { source: "/resolve-new", destination: "/resolve", permanent: true },
      { source: "/resolve-new/document", destination: "/resolve/document", permanent: true },
      { source: "/resolve-new/others", destination: "/resolve/others", permanent: true },
      { source: "/resolve-new/people", destination: "/me/people", permanent: true },
      { source: "/resolve-new/r/:token", destination: "/r/:token", permanent: true },
      { source: "/map-new", destination: "/map", permanent: true },
      { source: "/map-new/:stage", destination: "/map/:stage", permanent: true },
      { source: "/guidebook-new", destination: "/guidebook", permanent: true },
      { source: "/guidebook-new/:chapter", destination: "/guidebook/:chapter", permanent: true },
      { source: "/leaders-new", destination: "/leaders", permanent: true },
      { source: "/leaders-new/:slug", destination: "/leaders/:slug", permanent: true },
      { source: "/work-with-us-new", destination: "/work-with-us", permanent: true },
      { source: "/work-with-us-new/inquire", destination: "/work-with-us/inquire", permanent: true },
      { source: "/assessment-new", destination: "/assessment", permanent: true },
      { source: "/assessment-new/:path*", destination: "/assessment/:path*", permanent: true },
      { source: "/churches-new", destination: "/churches", permanent: true },
      { source: "/nonprofits-new", destination: "/nonprofits", permanent: true },
      { source: "/institutions-new", destination: "/institutions", permanent: true },
      { source: "/about-new", destination: "/about", permanent: true },
      { source: "/story-new", destination: "/story", permanent: true },
      { source: "/agent", destination: "/", permanent: true },
      { source: "/agent/about", destination: "/about", permanent: true },
      { source: "/agent/churches", destination: "/churches", permanent: true },
      { source: "/agent/nonprofits", destination: "/nonprofits", permanent: true },
      { source: "/agent/institutions", destination: "/institutions", permanent: true },
      { source: "/agent/assessment", destination: "/assessment", permanent: true },
      { source: "/agent/invite", destination: "/assessment", permanent: true },
      { source: "/agent/path/safety", destination: "/map/decide", permanent: true },
      { source: "/voices", destination: "/leaders", permanent: true },
      { source: "/voices/:slug", destination: "/leaders/:slug", permanent: true },
      {
        source: "/downloads/it-starts-with-safety-v1.pdf",
        destination: "/downloads/movemental-it-starts-with-safety-field-guide.pdf",
        permanent: true,
      },
      {
        source: "/toolkit/safety-toolkit.pdf",
        destination: "/downloads/movemental-it-starts-with-safety-field-guide.pdf",
        permanent: true,
      },
      {
        source: "/downloads/movemental-sandbox-field-guide-it-continues-with-exploration.pdf",
        destination: "/downloads/movemental-it-continues-with-exploration-field-guide.pdf",
        permanent: true,
      },
      // Backward-compatible aliases for old /field-guides URLs (live page is /field-guide).
      {
        source: "/field-guides/sandbox",
        destination: "/field-guide?guide=sandbox",
        permanent: true,
      },
      {
        source: "/field-guides/safety",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/field-guides",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/field-guides/:path*",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/book",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/book/:path*",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/path",
        destination: "/map",
        permanent: true,
      },
      {
        source: "/path/:slug*",
        destination: "/map",
        permanent: true,
      },
      {
        source: "/skills",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/team",
        destination: "/",
        permanent: true,
      },
      {
        source: "/team/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/fragmentation-old",
        destination: "/",
        permanent: true,
      },
      {
        source: "/nonprofits-new/next",
        destination: "/",
        permanent: true,
      },
      {
        source: "/movement-leaders-new",
        destination: "/",
        permanent: true,
      },
      {
        source: "/nonprofits-system-example-new",
        destination: "/",
        permanent: true,
      },
      {
        source: "/fragmentation-intel",
        destination: "/",
        permanent: true,
      },
      {
        source: "/movemental-at-100",
        destination: "/",
        permanent: true,
      },
      {
        source: "/knowledge-ecosystem",
        destination: "/",
        permanent: true,
      },
      {
        source: "/content/articles/sandbox",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/content/articles/sandbox/:path*",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/content/articles/:path*",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/vision",
        destination: "/",
        permanent: true,
      },
      {
        source: "/services/discovery-lab",
        destination: "/",
        permanent: true,
      },
      {
        source: "/services/organizational-systems",
        destination: "/",
        permanent: true,
      },
      {
        source: "/services/system-builds",
        destination: "/",
        permanent: true,
      },
      {
        source: "/who-its-for",
        destination: "/work-with-us",
        permanent: true,
      },
      {
        source: "/organizations",
        destination: "/work-with-us",
        permanent: true,
      },
      {
        source: "/organizations/:path*",
        destination: "/work-with-us",
        permanent: true,
      },
      {
        source: "/fragmentation",
        destination: "/",
        permanent: true,
      },
      {
        source: "/fragmentation/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/how-it-works",
        destination: "/",
        permanent: true,
      },
      {
        source: "/how-it-works/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/system-builds",
        destination: "/",
        permanent: true,
      },
      {
        source: "/system-builds/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/case-studies",
        destination: "/work-with-us#practice",
        permanent: true,
      },
      {
        source: "/evidence",
        destination: "/sources",
        permanent: true,
      },
      {
        source: "/research/sources",
        destination: "/sources",
        permanent: true,
      },
      {
        source: "/agent/how-we-use-ai",
        destination: "/how-we-use-ai",
        permanent: true,
      },
      {
        source: "/manifesto",
        destination: "/",
        permanent: true,
      },
      {
        source: "/apply",
        destination: "/work-with-us/inquire",
        permanent: true,
      },
      {
        source: "/inquiry",
        destination: "/work-with-us/inquire",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/work-with-us/inquire",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/work-with-us",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/",
        permanent: true,
      },
      {
        source: "/movement-leaders",
        destination: "/leaders",
        permanent: true,
      },
      {
        source: "/movement-leaders/:path*",
        destination: "/leaders",
        permanent: true,
      },
      {
        source: "/pathway",
        destination: "/map",
        permanent: true,
      },
      {
        source: "/pathway/safety",
        destination: "/map/decide",
        permanent: true,
      },
      {
        source: "/pathway/safety/:path*",
        destination: "/map/decide",
        permanent: true,
      },
      {
        source: "/pathway/sandbox",
        destination: "/map/gather",
        permanent: true,
      },
      {
        source: "/pathway/sandbox/:path*",
        destination: "/map/gather",
        permanent: true,
      },
      {
        source: "/pathway/skills",
        destination: "/map/practice",
        permanent: true,
      },
      {
        source: "/pathway/skills/:path*",
        destination: "/map/practice",
        permanent: true,
      },
      {
        source: "/pathway/solutions",
        destination: "/map/build",
        permanent: true,
      },
      {
        source: "/pathway/solutions/:path*",
        destination: "/map/build",
        permanent: true,
      },
      {
        source: "/pathway/training",
        destination: "/map/practice",
        permanent: true,
      },
      {
        source: "/pathway/training/:path*",
        destination: "/map/practice",
        permanent: true,
      },
      {
        source: "/pathway/tech",
        destination: "/map/build",
        permanent: true,
      },
      {
        source: "/pathway/tech/:path*",
        destination: "/map/build",
        permanent: true,
      },
      {
        source: "/pathway/foundations",
        destination: "/map/decide",
        permanent: true,
      },
      {
        source: "/pathway/foundations/:path*",
        destination: "/map/decide",
        permanent: true,
      },
      {
        source: "/pathway/lab",
        destination: "/map/gather",
        permanent: true,
      },
      {
        source: "/pathway/lab/:path*",
        destination: "/map/gather",
        permanent: true,
      },
      {
        source: "/pathway/fluency",
        destination: "/map/practice",
        permanent: true,
      },
      {
        source: "/pathway/fluency/:path*",
        destination: "/map/practice",
        permanent: true,
      },
      {
        source: "/pathway/build",
        destination: "/map/build",
        permanent: true,
      },
      {
        source: "/pathway/build/:path*",
        destination: "/map/build",
        permanent: true,
      },
      {
        source: "/pathway/:path*",
        destination: "/map",
        permanent: true,
      },
      {
        source: "/toolkit",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/toolkit/:path*",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/training",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/training/:path*",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/agent/churches-old",
        destination: "/churches",
        permanent: true,
      },
      {
        source: "/agent/nonprofits-old",
        destination: "/nonprofits",
        permanent: true,
      },
      {
        source: "/movement-voices",
        destination: "/leaders",
        permanent: true,
      },
      {
        source: "/scenius",
        destination: "/leaders",
        permanent: true,
      },
      {
        source: "/agent/movement-voices",
        destination: "/leaders",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      // Stitch placeholder images during migration.
      // TODO(assets): replace with first-party assets before launch.
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      // Supabase Storage (project media bucket).
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
