import { ImageResponse } from "next/og";

export const alt = "Movemental";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "linear-gradient(145deg, #141110 0%, #1b1714 48%, #141110 100%)",
          color: "#f4efe5",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span
            style={{
              fontSize: 26,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(244,239,229,0.55)",
              fontWeight: 600,
            }}
          >
            Movemental
          </span>
          <span style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.12 }}>
            A wiser way to navigate AI
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            color: "rgba(244,239,229,0.65)",
          }}
        >
          <span>movemental.ai</span>
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
            Safety, Sandbox, Training, Technology
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
