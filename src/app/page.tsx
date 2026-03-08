"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const PHONE = "010-3322-1992";
const KAKAO_CHANNEL = "https://pf.kakao.com/_zHwMn";
const SNS = {
  instagram: "https://www.instagram.com/leejeongsuk1224",
  tiktok: "https://www.tiktok.com/@dobae_dobae",
  blog: "https://blog.naver.com/seswotn11",
  homepage: "https://website-claude-brown.vercel.app/",
};

/* ── 아이콘 ── */
function KakaoIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3C6.477 3 2 6.477 2 10.9c0 2.747 1.548 5.172 3.91 6.653l-.993 3.622a.3.3 0 0 0 .444.336l4.156-2.768A11.3 11.3 0 0 0 12 18.8c5.523 0 10-3.477 10-7.9S17.523 3 12 3z" />
    </svg>
  );
}
function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 12a19.79 19.79 0 0 1-3-8.59A2 2 0 0 1 3.32 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function CalendarIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.12 8.12 0 0 0 4.76 1.52V6.74a4.85 4.85 0 0 1-1-.05z" />
    </svg>
  );
}
function BlogIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm4 2v2h10V7H7zm0 4v2h10v-2H7zm0 4v2h6v-2H7z"/>
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

/* ── 온라인 상담 모달 ── */
function BookingModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", date: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    setSent(true);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(44,26,14,0.65)", backdropFilter: "blur(6px)" }}
      onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-3xl p-7 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {sent ? (
          <div className="flex flex-col items-center text-center py-6 gap-3">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl"
              style={{ background: "linear-gradient(135deg,#C4714A,#C9A96E)" }}>✓</div>
            <p className="text-[#2C1A0E] font-black text-xl">예약 완료!</p>
            <p className="text-[#8C7B6B] text-sm">확인 후 빠르게 연락드릴게요 :)</p>
            <button onClick={onClose} className="mt-2 px-6 py-2.5 rounded-full bg-[#2C1A0E] text-white text-sm font-bold hover:bg-[#3C2A1E] transition-colors">닫기</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="font-black text-[#2C1A0E] text-lg">상담 신청</p>
                <p className="text-[#8C7B6B] text-xs mt-0.5">연중무휴 · 24시간 접수 가능</p>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#F5EAD8] flex items-center justify-center text-[#5C4033] hover:bg-[#E8D5B7] transition-colors text-lg">×</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-[#5C4033] text-xs font-semibold mb-1 block">이름</label>
                <input type="text" placeholder="홍길동" value={form.name} onChange={(e) => set("name", e.target.value)} required
                  className="w-full px-4 py-3 rounded-xl border border-[#E8D5B7] text-[#2C1A0E] placeholder-[#C4B0A0] text-sm focus:outline-none focus:border-[#C4714A] transition-colors" />
              </div>
              <div>
                <label className="text-[#5C4033] text-xs font-semibold mb-1 block">연락처</label>
                <input type="tel" placeholder="010-0000-0000" value={form.phone} onChange={(e) => set("phone", e.target.value)} required
                  className="w-full px-4 py-3 rounded-xl border border-[#E8D5B7] text-[#2C1A0E] placeholder-[#C4B0A0] text-sm focus:outline-none focus:border-[#C4714A] transition-colors" />
              </div>
              <div>
                <label className="text-[#5C4033] text-xs font-semibold mb-1 block">시공 희망일</label>
                <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8D5B7] text-[#2C1A0E] text-sm focus:outline-none focus:border-[#C4714A] transition-colors" />
              </div>
              <div>
                <label className="text-[#5C4033] text-xs font-semibold mb-1 block">문의내용</label>
                <textarea placeholder="공간 유형, 평수, 원하는 분위기 등 편하게 적어주세요" value={form.msg} onChange={(e) => set("msg", e.target.value)} rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8D5B7] text-[#2C1A0E] placeholder-[#C4B0A0] text-sm focus:outline-none focus:border-[#C4714A] transition-colors resize-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl font-black text-base text-white transition-all hover:-translate-y-0.5 disabled:opacity-60"
                style={{ background: "linear-gradient(135deg, #C4714A, #C9A96E)" }}>{loading ? "전송 중..." : "상담 예약하기"}</button>
              <p className="text-[#C4B0A0] text-[10px] text-center">개인정보는 상담 목적 외 사용 및 제3자 제공 없음</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ── 상단 고정 바 ── */
function TopBar({ onBooking: _onBooking }: { onBooking: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-[#2C1A0E]/95 backdrop-blur-sm shadow-md" : "bg-transparent"}`}>
      <div className="max-w-4xl mx-auto px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-black text-base tracking-tight text-white">감성도배</span>
          <span className="hidden sm:inline text-[10px] tracking-widest text-[#C9A96E]">· Designing Spaces, Crafting Emotions</span>
        </div>
        <div className="flex items-center gap-2">
          <a href={`tel:${PHONE}`} className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors">
            <PhoneIcon size={13} />{PHONE}
          </a>
          <a href={KAKAO_CHANNEL}
            className="flex items-center gap-1.5 bg-[#FEE500] text-[#2C1A0E] font-bold text-sm px-4 py-2 rounded-full hover:bg-yellow-300 transition-colors shadow-sm">
            <KakaoIcon size={15} /><span className="hidden sm:inline">무료 견적받기</span><span className="sm:hidden">카카오</span>
          </a>
        </div>
      </div>
    </header>
  );
}

/* ── 플로팅 CTA (모바일) ── */
function FloatingCTA({ onBooking }: { onBooking: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div className={`fixed bottom-5 right-4 z-40 flex flex-col gap-2 transition-all duration-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}`}>
      <button onClick={onBooking}
        className="w-12 h-12 rounded-full bg-white shadow-xl border border-[#E8D5B7] flex items-center justify-center text-[#C4714A] hover:scale-110 transition-transform"
        aria-label="상담 신청">
        <CalendarIcon size={17} />
      </button>
      <a href={`tel:${PHONE}`}
        className="w-12 h-12 rounded-full bg-white shadow-xl border border-[#E8D5B7] flex items-center justify-center text-[#C4714A] hover:scale-110 transition-transform"
        aria-label="전화">
        <PhoneIcon size={18} />
      </a>
      <a href={KAKAO_CHANNEL}
        className="w-12 h-12 rounded-full bg-[#FEE500] shadow-xl flex items-center justify-center text-[#2C1A0E] hover:scale-110 transition-transform"
        aria-label="카카오">
        <KakaoIcon size={20} />
      </a>
    </div>
  );
}

/* ── 섹션 공통 CTA 버튼 ── */
function CTAButtons({ onBooking, variant = "light" }: { onBooking: () => void; variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center">
      <a href={KAKAO_CHANNEL}
        className="flex items-center justify-center gap-2 bg-[#FEE500] text-[#2C1A0E] font-black px-7 py-3.5 rounded-full text-base shadow-lg hover:bg-yellow-300 hover:-translate-y-0.5 transition-all">
        <KakaoIcon size={18} />카카오톡 무료 상담
      </a>
      <a href={`tel:${PHONE}`}
        className={`flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-bold border-2 transition-all hover:-translate-y-0.5 ${isDark ? "border-white/30 text-white hover:bg-white/10" : "border-[#C4714A] text-[#C4714A] hover:bg-[#C4714A] hover:text-white"}`}>
        <PhoneIcon size={16} />전화 상담
      </a>
      <button onClick={onBooking}
        className={`flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-bold border-2 transition-all hover:-translate-y-0.5 ${isDark ? "border-[#C9A96E]/50 text-[#C9A96E] hover:bg-[#C9A96E]/10" : "border-[#C9A96E] text-[#8C7B6B] hover:bg-[#F5EAD8]"}`}>
        <CalendarIcon size={16} />상담 신청
      </button>
    </div>
  );
}

/* ══════════════════════════════════════
   섹션 1: 히어로 — 주의 편향
   첫 화면에서 문제+가치를 즉시 전달
══════════════════════════════════════ */
function HeroSection({ onBooking }: { onBooking: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ background: "#0D0705" }}>

      {/* 주 광원 — 우상단 따스한 오렌지 글로우 */}
      <div className="absolute top-0 right-0 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(196,113,74,0.4) 0%, rgba(196,113,74,0.12) 45%, transparent 70%)", transform: "translate(15%, -20%)" }} />

      {/* 보조 광원 — 좌하단 골드 */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,169,110,0.18) 0%, transparent 60%)", transform: "translate(-30%, 30%)" }} />

      {/* [Effect 1] 무드 글로우 펄스 — 숨을 쉬듯 */}
      <div className="animate-mood-cold absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(255,180,80,0.12) 0%, transparent 55%)" }} />

      {/* [Effect 1] 햇살 빔 — 어두운 배경이라 선명하게 보임 */}
      <div className="animate-light-sweep absolute inset-y-0 pointer-events-none"
        style={{ width: "240px", background: "linear-gradient(90deg, transparent, rgba(255,200,120,0.22), transparent)", top: 0, bottom: 0, left: 0 }} />

      {/* [Effect 1] 광입자 */}
      {[
        { left: "15%", top: "65%", delay: "0s", duration: "7s", size: 4 },
        { left: "60%", top: "70%", delay: "2.5s", duration: "9s", size: 3 },
        { left: "80%", top: "45%", delay: "5s", duration: "6s", size: 2 },
        { left: "40%", top: "80%", delay: "1s", duration: "8s", size: 2 },
      ].map((p, i) => (
        <div key={i} className="animate-dust absolute rounded-full pointer-events-none"
          style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.duration, width: p.size, height: p.size, background: "rgba(201,169,110,0.7)" }} />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-5 text-center py-20">

        {/* 배지 */}
        <div className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/15 rounded-full px-5 py-2 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C4714A] animate-pulse" />
          <span className="text-[#C9A96E] font-medium text-sm tracking-wide">여성 도배사 · 섬세하고 꼼꼼한 손길</span>
        </div>

        {/* 메인 헤드라인 */}
        <h1 className="text-[34px] sm:text-[68px] md:text-[82px] font-black leading-[1.15] sm:leading-[1.08] text-white mb-6 tracking-tight" style={{ wordBreak: "keep-all" }}>
          <span style={{
            background: "linear-gradient(135deg, #C4714A 20%, #C9A96E 60%, #F5DDA8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            당신이 꿈꾸던 분위기,
          </span><br />
          <span className="text-white/80 text-[26px] sm:text-[52px] md:text-[62px] font-bold">도배 그 이상의 감성으로</span>
        </h1>

        <p className="text-white font-bold text-base sm:text-2xl mb-10" style={{ wordBreak: "keep-all" }}>
          오늘 만나는 견적, 공간에 감성을 더하는 첫 걸음
        </p>

        <CTAButtons onBooking={onBooking} variant="dark" />

        <p className="mt-5 text-white/20 text-xs">연중무휴 · 24시 접수 · 무료 현장 방문 · 개인정보 상담 목적 외 사용 없음</p>

        {/* 신뢰 숫자 */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4 border-t border-white/10 pt-8">
          {[
            { num: "500+", label: "시공 완료" },
            { num: "4.9★", label: "고객 만족도" },
            { num: "24h", label: "빠른답변" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-black text-2xl leading-none"
                style={{ background: "linear-gradient(135deg, #C4714A, #C9A96E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {s.num}
              </p>
              <p className="text-white/30 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* 스크롤 유도 */}
        <div className="mt-10 flex flex-col items-center gap-1 opacity-25 animate-bounce">
          <span className="text-[10px] tracking-widest text-white">SCROLL</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   섹션 1.5: 스크롤 드리븐 이미지 시퀀스
   Apple 스타일 — 스크롤 = 영상 재생
══════════════════════════════════════ */
function ScrollSequenceSection() {
  const TOTAL_FULL = 80;
  const TOTAL_MOBILE = 30;

  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const labelBeforeRef = useRef<HTMLDivElement>(null);
  const labelAfterRef = useRef<HTMLDivElement>(null);
  const totalRef = useRef(TOTAL_FULL);
  // img 객체를 직접 캐시 — src 문자열이 아닌 HTMLImageElement
  const imgCacheRef = useRef<(HTMLImageElement | null)[]>([]);
  const frameRef = useRef(0);
  const [loadPct, setLoadPct] = useState(0);
  const [ready, setReady] = useState(false);
  const [scrollHeight, setScrollHeight] = useState("600vh");

  // canvas에 이미지를 object-fit:cover 방식으로 그리기
  const drawFrame = useCallback((frame: number) => {
    const c = canvasRef.current;
    if (!c) return;
    const imgEl = imgCacheRef.current[frame];
    if (!imgEl) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const iw = imgEl.naturalWidth, ih = imgEl.naturalHeight;
    const cw = c.width, ch = c.height;
    const scale = Math.min(cw / iw, ch / ih);
    const dw = iw * scale, dh = ih * scale;
    const dx = (cw - dw) / 2, dy = (ch - dh) / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(imgEl, dx, dy, dw, dh);
  }, []);

  // sticky 컨테이너 + canvas 크기 설정
  useEffect(() => {
    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      // 1) sticky div 높이를 JS로 직접 설정 (100dvh CSS fallback 보완)
      if (stickyRef.current) {
        stickyRef.current.style.height = `${h}px`;
      }
      // 2) canvas buffer = 물리 픽셀, CSS 크기 = 논리 픽셀
      const c = canvasRef.current;
      if (!c) return;
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      drawFrame(frameRef.current);
    };
    setSize();
    window.addEventListener("resize", setSize);
    window.addEventListener("orientationchange", setSize);
    return () => {
      window.removeEventListener("resize", setSize);
      window.removeEventListener("orientationchange", setSize);
    };
  }, [drawFrame]);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const total = isMobile ? TOTAL_MOBILE : TOTAL_FULL;
    totalRef.current = total;
    imgCacheRef.current = new Array(total).fill(null);
    setScrollHeight(isMobile ? "400vh" : "600vh");

    const indices = isMobile
      ? Array.from({ length: total }, (_, i) => Math.round(i * (TOTAL_FULL - 1) / (total - 1)))
      : Array.from({ length: total }, (_, i) => i);

    let count = 0;
    indices.forEach((srcIdx, slotIdx) => {
      const img = new Image();
      img.src = `/sequence/Wallpapering_before_and_after_crash_delpmaspu__${String(srcIdx).padStart(3, "0")}.jpg`;
      img.onload = () => {
        imgCacheRef.current[slotIdx] = img;
        count++;
        setLoadPct(count / total);
        if (count === total) setReady(true);
        if (slotIdx === 0) drawFrame(0);
      };
    });
  }, [drawFrame]);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top > 0 || rect.bottom <= 0) return;
      const total = totalRef.current;
      const p = Math.max(0, Math.min(1, -rect.top / (rect.height - vh)));
      const frame = Math.min(total - 1, Math.floor(p * total));
      if (frame !== frameRef.current) {
        frameRef.current = frame;
        drawFrame(frame);
      }
      if (progressBarRef.current) progressBarRef.current.style.width = `${p * 100}%`;
      const isBefore = frame < total * 0.45;
      if (labelBeforeRef.current) labelBeforeRef.current.style.opacity = isBefore ? "1" : "0";
      if (labelAfterRef.current) labelAfterRef.current.style.opacity = isBefore ? "0" : "1";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [drawFrame]);

  return (
    <div ref={sectionRef} style={{ height: scrollHeight }} className="bg-[#0D0705]">
      {/* sticky: canvas가 명시적 픽셀 크기를 가지므로 부모 height 불필요 */}
      <div ref={stickyRef} style={{ position: "sticky", top: 0, height: "100dvh", background: "#0D0705", overflow: "hidden" }}>
        {!ready && (
          <div style={{ position: "absolute", inset: 0, zIndex: 30, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#0D0705" }}>
            <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase mb-5">Loading</p>
            <div className="w-56 h-[1px] bg-white/8 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 transition-all duration-150"
                style={{ width: `${loadPct * 100}%`, background: "linear-gradient(90deg, #C4714A, #C9A96E)" }} />
            </div>
            <p className="text-white/15 text-[10px] mt-3">{Math.round(loadPct * 100)}%</p>
          </div>
        )}
        {/* canvas: JS로 크기 설정, block으로 sticky 높이 결정 */}
        <canvas ref={canvasRef} style={{ display: "block" }} />
        {/* 오버레이: sticky div 기준 inset:0 */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "8rem", background: "linear-gradient(180deg, rgba(0,0,0,0.4), transparent)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "10rem", background: "linear-gradient(0deg, rgba(0,0,0,0.6), transparent)" }} />
          <div style={{ position: "absolute", top: "2rem", left: "2rem" }}>
            <p className="text-white/30 text-[10px] tracking-[0.35em] uppercase">감성도배 · 시공 스토리</p>
          </div>
          <div ref={labelBeforeRef} style={{ position: "absolute", bottom: "5rem", left: "2rem", opacity: 1, transition: "opacity 0.5s" }}>
            <p className="text-white/40 text-[9px] tracking-[0.3em] uppercase mb-1">Before</p>
            <p className="text-white/70 font-black text-2xl sm:text-3xl leading-tight">시공 전</p>
          </div>
          <div ref={labelAfterRef} style={{ position: "absolute", bottom: "5rem", left: "2rem", opacity: 0, transition: "opacity 0.5s" }}>
            <p className="text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: "rgba(201,169,110,0.7)" }}>After</p>
            <p className="font-black text-2xl sm:text-3xl leading-tight"
              style={{ background: "linear-gradient(135deg, #C4714A, #C9A96E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              감성도배 후
            </p>
          </div>
          <div style={{ position: "absolute", top: "2rem", right: "2rem", textAlign: "right" }}>
            <p className="text-white/15 text-[9px] tracking-widest uppercase">Scroll to experience</p>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(255,255,255,0.08)" }}>
            <div ref={progressBarRef} style={{ height: "100%", width: "0%", background: "linear-gradient(90deg, #C4714A, #C9A96E)", transition: "width 0.05s linear" }} />
          </div>
          <div style={{ position: "absolute", bottom: "2rem", right: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }} className="animate-bounce">
            <span className="text-white/20 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   섹션 2: 문제 제기 — 손실 회피
   "안 하면 이런 손해" 를 건드리기
══════════════════════════════════════ */
function PainSection({ onBooking: _onBooking }: { onBooking: () => void }) {
  const pains = [
    { icon: "💸", title: "예고 없는 추가 비용 통보", desc: "시공 중 추가 비용이 생길 수 있어요. 문제는 사전 협의 없이 공사 중간에 갑자기 비용이 추가되는 상황입니다." },
    { icon: "😰", title: "마감 엉망 → 재시공 비용", desc: "이음새 들뜨고 모서리 벌어져서 결국 다시 불러야 하는 상황" },
    { icon: "📅", title: "일정 안 지켜 입주 미룸", desc: "약속한 날 안 나타나고, 연락도 안 되는 최악의 경험" },
    { icon: "😟", title: "내 취향 무시한 벽지 선택", desc: "전문가라며 본인 맘대로 정해버리는 일방적인 시공" },
  ];
  return (
    <section className="py-20 px-5 bg-[#2C1A0E]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C9A96E] text-xs font-semibold tracking-widest uppercase mb-3">혹시 이런 경험</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            도배 한 번 잘못 맡겼다가<br />
            <span className="text-[#C4714A]">두 배로 고생하셨나요?</span>
          </h2>
          <p className="text-[#8C7B6B] text-sm">많은 분들이 이런 이유로 도배를 미루고 또 미룹니다</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {pains.map((p) => (
            <div key={p.title} className="p-5 rounded-2xl border border-white/8 flex gap-4"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              <span className="text-2xl flex-shrink-0">{p.icon}</span>
              <div>
                <p className="text-white font-bold text-sm mb-1">{p.title}</p>
                <p className="text-[#5C4033] text-xs leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 전환 포인트 */}
        <div className="text-center p-6 rounded-2xl" style={{ background: "linear-gradient(135deg, #C4714A, #C9A96E)" }}>
          <p className="text-white font-black text-xl mb-1">이 모든 걱정, 감성도배는 없습니다</p>
          <p className="text-white/80 text-sm mb-5" style={{ wordBreak: "keep-all" }}>여성 도배사의 꼼꼼한 상담으로, 처음부터 끝까지 함께합니다</p>
          <a href={KAKAO_CHANNEL}
            className="inline-flex items-center gap-2 bg-[#FEE500] text-[#2C1A0E] font-black px-7 py-3 rounded-full text-sm hover:bg-white transition-colors shadow-lg">
            <KakaoIcon size={17} />지금 바로 확인하기
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   섹션 3: 해결책 + 강점 — 칵테일 파티
   "나에게 딱 맞는" 개인화된 혜택
══════════════════════════════════════ */
function SolutionSection({ onBooking }: { onBooking: () => void }) {
  const features = [
    {
      num: "01",
      title: "여성 도배사만의 섬세한 디테일",
      points: [
        { label: "보이지 않는 곳까지 꼼꼼하게", desc: "벽지 패턴 맞춤부터 구석진 모서리 마감까지, 내 집을 만지는 마음으로 세밀하게 시공합니다." },
        { label: "섬세한 손길", desc: "여성 도배사 특유의 감각으로 공간의 완성도를 높입니다." },
      ],
    },
    {
      num: "02",
      title: "투명하고 정직한 단계별 견적",
      points: [
        { label: "정확한 비용 안내", desc: "사진과 평수를 바탕으로 먼저 가견적을 안내해 드립니다." },
        { label: "오차 없는 확정 견적", desc: "직접 방문하여 현장 실측을 거친 후, 불필요한 공정 없이 정직한 최종 비용을 확정합니다." },
      ],
    },
    {
      num: "03",
      title: "처음부터 끝까지 책임 있는 시공 보장",
      points: [
        { label: "기초부터 마무리까지", desc: "시공 전 바탕 작업부터 시공 후 깔끔한 정리까지 변함없는 책임감으로 함께합니다." },
        { label: "시공 후에도 곁에 있습니다", desc: "완료 후에도 불편하신 점이 생기면 편하게 연락주세요. 시작할 때와 같은 마음으로 끝까지 성실하게 응대해 드립니다." },
      ],
    },
    {
      num: "04",
      title: "결정이 편해지는 맞춤형 벽지 제안",
      points: [
        { label: "선택의 고민 해결", desc: "수많은 샘플 책 앞에서 막막해하지 마세요." },
        { label: "함께 찾는 최적의 조합", desc: "공간의 분위기와 고객님의 취향을 듣고, 가장 잘 어울리는 벽지 후보를 함께 고민하며 골라드립니다." },
      ],
    },
  ];
  return (
    <section className="py-20 px-5 bg-[#FDF6EE]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C4714A] text-xs font-semibold tracking-widest uppercase mb-3">Why Us</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2C1A0E] mb-3">
            왜 <span style={{ background: "linear-gradient(135deg, #C4714A, #C9A96E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>감성도배</span> 일까요?
          </h2>
          <p className="text-[#8C7B6B] text-sm">도배는 공간을 바꾸고, 최고의 도배는 당신의 하루를 바꿉니다.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {features.map((f) => (
            <div key={f.num} className="p-6 rounded-2xl bg-white border border-[#E8D5B7] hover:-translate-y-1 hover:shadow-lg transition-all">
              <p className="text-[#E8D5B7] font-black text-3xl leading-none mb-3">{f.num}</p>
              <p className="font-black text-[#2C1A0E] text-sm mb-4">{f.title}</p>
              <div className="space-y-3">
                {f.points.map((pt) => (
                  <div key={pt.label}>
                    <p className="text-[#C4714A] text-xs font-bold mb-0.5">{pt.label}</p>
                    <p className="text-[#8C7B6B] text-xs leading-relaxed">{pt.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-[#5C4033] text-sm mb-5">결정 안 해도 됩니다. 그냥 물어보세요.</p>
          <CTAButtons onBooking={onBooking} />
          <div className="mt-6 text-xs text-center">
            <span className="text-[#8C7B6B]">더 많은 시공 사례 → </span>
            <a href={SNS.instagram} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#C4714A] underline underline-offset-2 hover:text-[#2C1A0E] transition-colors">인스타그램</a>
            <span className="text-[#C4B0A0] mx-1">·</span>
            <a href={SNS.tiktok} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#C4714A] underline underline-offset-2 hover:text-[#2C1A0E] transition-colors">틱톡</a>
            <span className="text-[#C4B0A0] mx-1">·</span>
            <a href={SNS.blog} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#C4714A] underline underline-offset-2 hover:text-[#2C1A0E] transition-colors">블로그</a>
            <span className="text-[#C4B0A0] mx-1">·</span>
            <a href={SNS.homepage} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#C4714A] underline underline-offset-2 hover:text-[#2C1A0E] transition-colors">홈페이지</a>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ══════════════════════════════════════
   섹션 5: 최종 CTA — 결정 마비 극복
   마지막 행동 유도 + 긴급성
══════════════════════════════════════ */
function FinalCTASection({ onBooking }: { onBooking: () => void }) {
  return (
    <section className="py-20 px-5 bg-[#2C1A0E]">
      <div className="max-w-2xl mx-auto text-center">
        {/* 로고 반복 노출 */}
        <p className="text-[#C9A96E] text-sm font-medium mb-3">감성도배 · Designing Spaces, Crafting Emotions</p>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
          지금 바로 시작하세요<br />
          <span className="text-[#C4714A]">결정은 나중에 해도 됩니다</span>
        </h2>
        <p className="text-[#8C7B6B] text-sm mb-10">
          30초면 충분해요. 지금 바로 궁금한 점을 남겨주세요.<br />
          연중무휴 · 24시 접수 · 무료 현장 방문 · 무료 견적
        </p>

        {/* 3개 상담 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <a href={KAKAO_CHANNEL}
            className="flex items-center justify-center gap-2 bg-[#FEE500] text-[#2C1A0E] font-black px-8 py-4 rounded-full text-base shadow-xl hover:bg-yellow-300 hover:-translate-y-0.5 transition-all">
            <KakaoIcon size={20} />카카오톡 문의
          </a>
          <a href={`tel:${PHONE}`}
            className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-8 py-4 rounded-full text-base hover:bg-white/20 hover:-translate-y-0.5 transition-all">
            <PhoneIcon size={17} />빠른 전화상담
          </a>
          <button onClick={onBooking}
            className="flex items-center justify-center gap-2 bg-[#C4714A]/20 border border-[#C4714A]/40 text-[#C9A96E] font-bold px-8 py-4 rounded-full text-base hover:bg-[#C4714A]/30 hover:-translate-y-0.5 transition-all">
            <CalendarIcon size={17} />상담 신청
          </button>
        </div>

        <p className="text-white/30 text-xs">연중무휴 · 24시 · 개인정보 상담 목적 외 사용 없음</p>

        {/* SNS */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-4">
          <span className="text-white/40 text-xs">시공사진 · 더 많은 후기 보기</span>
          <div className="flex gap-4 text-white/50">
            <a href={SNS.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs hover:text-[#FEE500] transition-colors"><InstagramIcon />인스타그램</a>
            <a href={SNS.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs hover:text-[#FEE500] transition-colors"><TikTokIcon />틱톡</a>
            <a href={SNS.blog} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs hover:text-[#FEE500] transition-colors font-medium"><BlogIcon />블로그</a>
            <a href={SNS.homepage} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs hover:text-[#FEE500] transition-colors font-medium"><GlobeIcon />홈페이지</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 푸터 ── */
function Footer() {
  return (
    <footer className="py-6 px-5 bg-[#1A0E06] text-center">
      <p className="text-[#3C2A1E] text-[10px]">© 2024 감성도배 · 상호명: 감성도배 · 대표: 이정숙 · 사업자 등록번호: 550-44-01153 · 경기도 남양주시</p>
    </footer>
  );
}

/* ── 메인 ── */
export default function Home() {
  const [showBooking, setShowBooking] = useState(false);
  const openBooking = () => setShowBooking(true);

  return (
    <>
      {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
      <TopBar onBooking={openBooking} />
      <FloatingCTA onBooking={openBooking} />
      <HeroSection onBooking={openBooking} />
      <ScrollSequenceSection />
      <PainSection onBooking={openBooking} />
      <SolutionSection onBooking={openBooking} />

      <FinalCTASection onBooking={openBooking} />
      <Footer />
    </>
  );
}
