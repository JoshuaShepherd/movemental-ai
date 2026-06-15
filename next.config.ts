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
        destination: "/field-guide",
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
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/path/:slug*",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/work-with-us",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/work-with-us/:slug*",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/skills",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/team",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/team/:path*",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/assessment-new",
        destination: "/assess",
        permanent: true,
      },
      {
        source: "/fragmentation-old",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/nonprofits-new",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/nonprofits-new/next",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/churches-new",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/movement-leaders-new",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/institutions-new",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/nonprofits-system-example-new",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/fragmentation-intel",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/movemental-at-100",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/knowledge-ecosystem",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/content/articles/sandbox",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/content/articles/sandbox/:path*",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/vision",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/services/discovery-lab",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/services/organizational-systems",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/services/system-builds",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/who-its-for",
        destination: "/enroll",
        permanent: true,
      },
      {
        source: "/organizations",
        destination: "/enroll",
        permanent: true,
      },
      {
        source: "/organizations/:path*",
        destination: "/enroll",
        permanent: true,
      },
      {
        source: "/fragmentation",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/fragmentation/:path*",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/how-it-works",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/how-it-works/:path*",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/system-builds",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/system-builds/:path*",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/case-studies",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/evidence",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/manifesto",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/apply",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/inquiry",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/about/:path*",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/enroll",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/churches",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/nonprofits",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/institutions",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/movement-leaders",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/movement-leaders/:path*",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/pathway",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/pathway/safety",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/pathway/safety/:path*",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/pathway/sandbox",
        destination: "/field-guide?guide=sandbox",
        permanent: true,
      },
      {
        source: "/pathway/sandbox/:path*",
        destination: "/field-guide?guide=sandbox",
        permanent: true,
      },
      {
        source: "/pathway/skills",
        destination: "/pathway/training",
        permanent: true,
      },
      {
        source: "/pathway/skills/:path*",
        destination: "/pathway/training",
        permanent: true,
      },
      {
        source: "/pathway/solutions",
        destination: "/pathway/tech",
        permanent: true,
      },
      {
        source: "/pathway/solutions/:path*",
        destination: "/pathway/tech",
        permanent: true,
      },
      {
        source: "/pathway/training",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/pathway/training/:path*",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/pathway/tech",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/pathway/tech/:path*",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/pathway/foundations",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/pathway/foundations/:path*",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/pathway/lab",
        destination: "/field-guide?guide=sandbox",
        permanent: true,
      },
      {
        source: "/pathway/lab/:path*",
        destination: "/field-guide?guide=sandbox",
        permanent: true,
      },
      {
        source: "/pathway/fluency",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/pathway/fluency/:path*",
        destination: "/field-guide",
        permanent: true,
      },
      {
        source: "/pathway/build",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/pathway/build/:path*",
        destination: "/agent",
        permanent: true,
      },
      {
        source: "/pathway/:path*",
        destination: "/field-guide",
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
