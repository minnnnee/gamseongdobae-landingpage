import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// 네이버 GFA 광고 소재 규격별 이미지 생성
// 사용법:
//   /api/og?type=banner  → 1029x258 (가로형 배너)
//   /api/og?type=square  → 500x500  (정방형)
//   /api/og?type=da      → 300x250  (DA 배너)
//   /api/og              → 1200x630 (기본 OG)

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "og";

  const sizes: Record<string, { w: number; h: number; label: string }> = {
    banner: { w: 1029, h: 258, label: "GFA 가로형 배너 1029×258" },
    square: { w: 500, h: 500, label: "GFA 정방형 500×500" },
    da: { w: 300, h: 250, label: "GFA DA 300×250" },
    og: { w: 1200, h: 630, label: "기본 OG 이미지" },
  };

  const { w, h } = sizes[type] || sizes.og;
  const isSmall = w <= 500;
  const isBanner = type === "banner";

  return new ImageResponse(
    (
      <div
        style={{
          width: w,
          height: h,
          background: "linear-gradient(135deg, #FDF6EE 0%, #F0DFC0 50%, #E5CCA0 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: isBanner ? "space-between" : "center",
          fontFamily: "sans-serif",
          padding: isBanner ? "0 40px" : "24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 배경 장식 */}
        <div
          style={{
            position: "absolute",
            top: isBanner ? "-60px" : "-80px",
            right: isBanner ? "200px" : "-80px",
            width: isBanner ? "200px" : "300px",
            height: isBanner ? "200px" : "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,113,74,0.2) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(196,113,74,0.04) 0, rgba(196,113,74,0.04) 1px, transparent 1px, transparent 20px)",
          }}
        />

        {isBanner ? (
          // ─── 가로형 배너 레이아웃 ───
          <>
            <div style={{ display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "13px", color: "#C4714A", letterSpacing: "0.1em", marginBottom: "6px" }}>
                DESIGNING SPACES · CRAFTING EMOTIONS
              </div>
              <div style={{ fontSize: "52px", fontWeight: 900, color: "#2C1A0E", lineHeight: 1 }}>
                감성도배
              </div>
              <div style={{ fontSize: "16px", color: "#5C4033", marginTop: "6px" }}>
                당신의 공간을 감성으로 채웁니다
              </div>
            </div>
            <div style={{ display: "flex", gap: "24px", position: "relative", zIndex: 1 }}>
              {[{ num: "15년", label: "경력" }, { num: "98%", label: "만족도" }].map((s) => (
                <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ fontSize: "28px", fontWeight: 900, color: "#C4714A" }}>{s.num}</div>
                  <div style={{ fontSize: "12px", color: "#8C7B6B" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: "#FEE500",
                color: "#3C1E1E",
                padding: "14px 28px",
                borderRadius: "50px",
                fontSize: "18px",
                fontWeight: 700,
                position: "relative",
                zIndex: 1,
                whiteSpace: "nowrap",
              }}
            >
              무료 견적받기
            </div>
          </>
        ) : (
          // ─── 정방형 / DA 레이아웃 ───
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontSize: isSmall ? "11px" : "14px",
                color: "#C4714A",
                letterSpacing: "0.15em",
                marginBottom: "8px",
              }}
            >
              DESIGNING SPACES
            </div>
            <div
              style={{
                fontSize: isSmall ? "60px" : "48px",
                fontWeight: 900,
                color: "#2C1A0E",
                lineHeight: 1,
                marginBottom: "8px",
              }}
            >
              감성도배
            </div>
            <div
              style={{
                fontSize: isSmall ? "16px" : "14px",
                color: "#5C4033",
                marginBottom: isSmall ? "24px" : "16px",
                textAlign: "center",
              }}
            >
              당신의 공간을, 감성으로
            </div>
            <div style={{ display: "flex", gap: isSmall ? "24px" : "16px", marginBottom: isSmall ? "24px" : "16px" }}>
              {(isSmall
                ? [{ num: "1,200+", label: "시공완료" }, { num: "98%", label: "만족도" }, { num: "15년", label: "경력" }]
                : [{ num: "15년", label: "경력" }, { num: "98%", label: "만족도" }]
              ).map((s) => (
                <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ fontSize: isSmall ? "28px" : "22px", fontWeight: 900, color: "#C4714A" }}>{s.num}</div>
                  <div style={{ fontSize: isSmall ? "12px" : "10px", color: "#8C7B6B" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: "#FEE500",
                color: "#3C1E1E",
                padding: isSmall ? "14px 32px" : "10px 24px",
                borderRadius: "50px",
                fontSize: isSmall ? "18px" : "14px",
                fontWeight: 700,
              }}
            >
              무료 견적 상담
            </div>
          </div>
        )}
      </div>
    ),
    { width: w, height: h }
  );
}
