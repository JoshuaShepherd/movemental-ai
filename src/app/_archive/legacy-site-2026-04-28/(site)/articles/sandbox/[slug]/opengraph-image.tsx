import { ImageResponse } from "next/og";

import { getArticle } from "@/lib/articles";

export const alt = "Article preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function truncate(text: string, max: number) {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

export default async function SandboxArticleOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const logicalSlug = `sandbox/${slug}`;
  const article = getArticle(logicalSlug);

  if (!article) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#1b1714",
            color: "#f4efe5",
            fontSize: 42,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Movemental — Article
        </div>
      ),
      { ...size },
    );
  }

  const title = truncate(article.title, 100);
  const eyebrow = article.eyebrow.toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(160deg, #141110 0%, #1b1714 55%, #141110 100%)",
          color: "#f4efe5",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              fontSize: 22,
              letterSpacing: "0.18em",
              fontWeight: 600,
              color: "#f4efe5",
            }}
          >
            {eyebrow}
          </span>
          <span style={{ fontSize: 52, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            {title}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            color: "rgba(244,239,229,0.6)",
          }}
        >
          <span>movemental.com/articles/sandbox</span>
          <span style={{ fontWeight: 600, color: "#f4efe5" }}>Movemental</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
