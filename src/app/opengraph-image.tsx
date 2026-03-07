import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "감성도배 | 공간을 감성으로 채웁니다";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(160deg, #FDF6EE 0%, #F0DFC0 50%, #E5CCA0 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 배경 장식 */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,113,74,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,169,110,0.2) 0%, transparent 70%)",
          }}
        />
        {/* 패턴 라인 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(196,113,74,0.05) 0, rgba(196,113,74,0.05) 1px, transparent 1px, transparent 30px)",
          }}
        />

        {/* 콘텐츠 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}>
          {/* 상단 태그 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(196,113,74,0.12)",
              border: "1px solid rgba(196,113,74,0.3)",
              borderRadius: "50px",
              padding: "8px 24px",
              marginBottom: "24px",
            }}
          >
            <span style={{ color: "#C4714A", fontSize: "16px", letterSpacing: "0.2em", fontWeight: 600 }}>
              DESIGNING SPACES · CRAFTING EMOTIONS
            </span>
          </div>

          {/* 메인 타이틀 */}
          <div
            style={{
              fontSize: "96px",
              fontWeight: 900,
              color: "#2C1A0E",
              letterSpacing: "-2px",
              lineHeight: 1,
              marginBottom: "16px",
            }}
          >
            감성도배
          </div>

          <div style={{ fontSize: "28px", color: "#5C4033", marginBottom: "48px", fontWeight: 400 }}>
            당신의 공간을, 감성으로 채웁니다
          </div>

          {/* 신뢰 지표 */}
          <div style={{ display: "flex", gap: "60px", marginBottom: "48px" }}>
            {[
              { num: "1,200+", label: "시공 완료" },
              { num: "98%", label: "고객 만족도" },
              { num: "92%", label: "재방문율" },
              { num: "15년", label: "시공 경력" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ fontSize: "42px", fontWeight: 900, color: "#C4714A", lineHeight: 1.1 }}>{s.num}</div>
                <div style={{ fontSize: "16px", color: "#8C7B6B", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA 버튼 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "#FEE500",
              color: "#3C1E1E",
              padding: "18px 48px",
              borderRadius: "50px",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            카카오로 무료 견적받기
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
