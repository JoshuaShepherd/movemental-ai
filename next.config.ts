import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { LEGACY_BOOK_READ_SLUGS } from "./src/lib/book-legacy-read-redirects";

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
    const legacyBookReads = LEGACY_BOOK_READ_SLUGS.map((slug) => ({
      source: `/book/read/${slug}`,
      destination: "/book",
      permanent: true,
    }));

    return [
      {
        source: "/blog",
        destination: "/articles",
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
        destination: "/fragmentation",
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
        destination: "/fragmentation",
        permanent: true,
      },
      {
        source: "/movemental-at-100",
        destination: "/fragmentation",
        permanent: true,
      },
      {
        source: "/knowledge-ecosystem",
        destination: "/fragmentation",
        permanent: true,
      },
      {
        source: "/content/articles/sandbox",
        destination: "/articles/sandbox",
        permanent: true,
      },
      {
        source: "/content/articles/sandbox/:path*",
        destination: "/articles/sandbox/:path*",
        permanent: true,
      },
      {
        source: "/vision",
        destination: "/fragmentation",
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
        destination: "/organizations",
        permanent: true,
      },
      {
        source: "/how-it-works",
        destination: "/fragmentation",
        permanent: true,
      },
      {
        source: "/how-it-works/:path*",
        destination: "/fragmentation",
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
      ...legacyBookReads,
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
