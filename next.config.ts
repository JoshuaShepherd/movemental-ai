import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Pin Turbopack's workspace root to this directory so Next 16 doesn't
// walk up the filesystem and pick up an unrelated parent lockfile.
const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
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
  async redirects() {
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
      {
        source: "/blog",
        destination: "/field-guides",
        permanent: true,
      },
      {
        source: "/book",
        destination: "/field-guides",
        permanent: true,
      },
      {
        source: "/book/:path*",
        destination: "/field-guides",
        permanent: true,
      },
      // Path-surface consolidation (2026-05): /path, /work-with-us, and /field-guide
      // were four overlapping surfaces describing the same territory. They are
      // now consolidated into /pathway (structured overview), /the-path
      // (long-form essay), and /field-guides (series catalog).
      {
        source: "/path",
        destination: "/pathway",
        permanent: true,
      },
      {
        source: "/path/:slug*",
        destination: "/pathway/:slug*",
        permanent: true,
      },
      {
        source: "/work-with-us",
        destination: "/pathway",
        permanent: true,
      },
      {
        source: "/work-with-us/:slug*",
        destination: "/pathway",
        permanent: true,
      },
      {
        source: "/field-guide",
        destination: "/field-guides",
        permanent: true,
      },
      {
        source: "/field-guide/:slug*",
        destination: "/field-guides/:slug*",
        permanent: true,
      },
      // /team has been folded into /about — the rebuilt About page now carries
      // founder bios, the origin story, and the five commitments. Defensive
      // 301 catches any external links or bookmarks that still point at /team.
      {
        source: "/skills",
        destination: "/pathway/skills",
        permanent: true,
      },
      {
        source: "/team",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/team/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/assessment-new",
        destination: "/assess",
        permanent: true,
      },
      {
        source: "/fragmentation-old",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/nonprofits-new",
        destination: "/nonprofits",
        permanent: true,
      },
      {
        source: "/nonprofits-new/next",
        destination: "/nonprofits",
        permanent: true,
      },
      {
        source: "/churches-new",
        destination: "/churches",
        permanent: true,
      },
      {
        source: "/movement-leaders-new",
        destination: "/movement-leaders",
        permanent: true,
      },
      {
        source: "/institutions-new",
        destination: "/institutions",
        permanent: true,
      },
      {
        source: "/nonprofits-system-example-new",
        destination: "/nonprofits",
        permanent: true,
      },
      {
        source: "/fragmentation-intel",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/movemental-at-100",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/knowledge-ecosystem",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/content/articles/sandbox",
        destination: "/field-guides",
        permanent: true,
      },
      {
        source: "/content/articles/sandbox/:path*",
        destination: "/field-guides",
        permanent: true,
      },
      {
        source: "/vision",
        destination: "/about",
        permanent: true,
      },
      // Archived legacy services sub-routes (replaced by /services/sandbox-season as of 2026-04).
      // Listed explicitly rather than via catch-all so new routes under /services are not captured.
      {
        source: "/services/discovery-lab",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/services/organizational-systems",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/services/system-builds",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/who-its-for",
        destination: "/pricing",
        permanent: true,
      },
      {
        source: "/organizations",
        destination: "/pricing",
        permanent: true,
      },
      {
        source: "/organizations/:path*",
        destination: "/pricing",
        permanent: true,
      },
      {
        source: "/fragmentation",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/fragmentation/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/how-it-works",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/how-it-works/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/system-builds",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/system-builds/:path*",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/case-studies",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/manifesto",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/apply",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/inquiry",
        destination: "/contact",
        permanent: true,
      },
      // Pathway stage rename: Foundations/Lab → Safety/Sandbox.
      // Skills/Solutions did not previously live under /pathway; canonical
      // detail pages are now /pathway/skills and /pathway/solutions.
      {
        source: "/pathway/foundations",
        destination: "/pathway/safety",
        permanent: true,
      },
      {
        source: "/pathway/foundations/:path*",
        destination: "/pathway/safety/:path*",
        permanent: true,
      },
      {
        source: "/pathway/lab",
        destination: "/pathway/sandbox",
        permanent: true,
      },
      {
        source: "/pathway/lab/:path*",
        destination: "/pathway/sandbox/:path*",
        permanent: true,
      },
      {
        source: "/pathway/fluency",
        destination: "/pathway/skills",
        permanent: true,
      },
      {
        source: "/pathway/fluency/:path*",
        destination: "/pathway/skills/:path*",
        permanent: true,
      },
      {
        source: "/pathway/build",
        destination: "/pathway/solutions",
        permanent: true,
      },
      {
        source: "/pathway/build/:path*",
        destination: "/pathway/solutions/:path*",
        permanent: true,
      },
      {
        source: "/toolkit",
        destination: "/field-guides/safety",
        permanent: true,
      },
      {
        source: "/toolkit/:path*",
        destination: "/field-guides/safety",
        permanent: true,
      },
      // /training was a standalone positioning page (AI training for mission-
      // driven organizations) that duplicated /pathway/skills's framing. Its
      // three useful blocks — "what buyers mean by training," "where standard
      // training works/falls short," and the readiness-routing matrix — were
      // folded into /pathway/skills directly. Route retired 2026-05.
      {
        source: "/training",
        destination: "/pathway/skills",
        permanent: true,
      },
      {
        source: "/training/:path*",
        destination: "/pathway/skills",
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
