import { ImageResponse } from "next/og";

export const alt = "From Fragmentation to Movement";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function BookOpengraphImage() {
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
          background: "linear-gradient(145deg, #141110 0%, #1b1714 50%, #141110 100%)",
          color: "#f4efe5",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span
            style={{
              fontSize: 22,
              letterSpacing: "0.18em",
              fontWeight: 600,
              color: "rgba(244,239,229,0.55)",
              textTransform: "uppercase",
            }}
          >
            Free book
          </span>
          <span style={{ fontSize: 54, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.12 }}>
            From Fragmentation to Movement
          </span>
          <span style={{ fontSize: 28, lineHeight: 1.45, color: "rgba(244,239,229,0.72)", maxWidth: 900 }}>
            A structural path from scatter field to field — for leaders, nonprofits, churches, and institutions.
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
          <span>movemental.com/book</span>
          <span
            style={{
              padding: "12px 28px",
              borderRadius: 8,
              background: "#19150f",
              color: "#faf6ee",
              fontWeight: 600,
              fontSize: 22,
            }}
          >
            Read the book
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
