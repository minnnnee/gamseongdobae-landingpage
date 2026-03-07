import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "감성도배 | 공간을 감성으로 채웁니다",
  description: "아파트·상업공간·친환경 도배 전문. 무료 현장 방문·견적 제공. 지금 카카오로 바로 상담하세요.",
  keywords: [
    "도배", "도배업체", "아파트도배", "인테리어도배", "벽지시공",
    "친환경도배", "도배견적", "입주청소", "도배전문", "감성도배",
    "서울도배", "경기도배", "도배가격", "벽지교체"
  ],
  authors: [{ name: "감성도배" }],
  creator: "감성도배",
  publisher: "감성도배",

  // ─── Open Graph (네이버 GFA 소재 미리보기에 사용) ───
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: BASE_URL,
    siteName: "감성도배",
    title: "감성도배 | 공간을 감성으로 채웁니다",
    description: "무료 현장 방문·견적. 지금 바로 카카오 상담!",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "감성도배 - Designing Spaces, Crafting Emotions",
      },
    ],
  },

  // ─── Twitter Card ───
  twitter: {
    card: "summary_large_image",
    title: "감성도배 | 공간을 감성으로 채웁니다",
    description: "무료 현장 방문·견적. 지금 바로 카카오 상담!",
    images: ["/opengraph-image"],
  },

  // ─── 검색엔진 크롤링 허용 ───
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  // ─── 네이버 사이트 소유 확인 (Naver Search Advisor에서 발급받은 코드로 교체) ───
  verification: {
    other: {
      "naver-site-verification": "YOUR_NAVER_VERIFICATION_CODE",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 네이버 GFA: 빠른 모바일 렌더링 */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        {/* 네이버 GFA: 전화번호 자동 링크 허용 */}
        <meta name="format-detection" content="telephone=yes" />
        {/* 카카오 공유용 */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
