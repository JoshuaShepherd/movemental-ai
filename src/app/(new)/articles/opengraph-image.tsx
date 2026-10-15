import { ImageResponse } from "next/og";

export const alt = "Movemental Articles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ArticlesOpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "#fbfaf6",
          color: "#1a1a1a",
        }}
      >
        <span style={{ fontSize: 24, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Movemental
        </span>
        <span style={{ fontSize: 56, fontWeight: 600, marginTop: 24 }}>Articles</span>
        <span style={{ fontSize: 28, marginTop: 16, color: "#555" }}>
          Essays on AI, credibility, and movement leadership
        </span>
      </div>
    ),
    { ...size },
  );
}
