"use client";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import { topics } from "@/data/topics";
import TopicModal from "@/components/TopicModal";
import SidePanel from "@/components/SidePanel";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/v2/TiltCardV2";
import CursorGlow from "@/components/CursorGlow";
import StatsCounter from "@/components/v2/StatsCounter";
import type { PanelType } from "@/components/SidePanel";
import type { Topic } from "@/data/topics";

const v = process.env.NEXT_PUBLIC_BUILD_ID || "";

const sideButtons: { id: PanelType; label: string }[] = [
  { id: "dictionary", label: "א' ב' בניהול תקין" },
  { id: "faq", label: "יש לי שאלה" },
  { id: "articles", label: "יש לי מושג" },
];

const externalLinks = [
  { href: "https://www.gov.il/he/departments/topics/associations_and_companies_for_the_benefit_of_the_public/govil-landing-page", label: "רשם העמותות" },
  { href: "https://www.guidestar.org.il/", label: "גיידסטאר" },
];

export default function ServicesContent() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const minDelay = new Promise(resolve => setTimeout(resolve, 2500));
    const pageLoad = new Promise<void>(resolve => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", () => resolve(), { once: true });
      }
    });
    Promise.all([minDelay, pageLoad]).then(() => setLoading(false));
  }, []);

  // Lock scroll during loading, reset to top when done
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      window.scrollTo(0, 0);
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [loading]);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setHeaderSolid(latest > 60);
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, -60]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* ══════════════════ LOADER ══════════════════ */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-[#0f1b3d] flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-full bg-white animate-[dotBounce_1.4s_ease-in-out_infinite]"
                  style={{ animationDelay: `${i * 0.16}s` }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollProgress />
      <CursorGlow />

      {/* ══════════════════ NAVBAR ══════════════════ */}
      <nav
        className={`fixed top-0 inset-x-0 z-[100] h-[70px] px-[5%] flex items-center justify-between backdrop-blur-[20px] border-b border-[#1a3a8f]/[0.08] transition-all duration-300 ${
          headerSolid
            ? "bg-white/95 shadow-[0_4px_30px_rgba(15,27,61,0.1)]"
            : "bg-white/85"
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 no-underline">
          <img
            src={`/logo-transparent.webp?v=${v}`}
            alt="מעטפת ניהולית"
            className="h-9 sm:h-10 w-auto"
          />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-[15px] font-extrabold text-[#0f1b3d]">ניהול תקין</span>
            <span className="text-[10px] text-[#6b7280] tracking-wider">מעטפת ניהולית</span>
          </div>
        </a>

        {/* Nav links */}
        <ul className="hidden lg:flex items-center gap-1.5 list-none m-0 p-0">
          {externalLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#6b7280] text-[13px] font-medium px-3 py-1.5 rounded-lg transition-all hover:text-[#0f1b3d] hover:bg-[#e8f0ff] no-underline leading-none"
              >
                {link.label}
              </a>
            </li>
          ))}
          {sideButtons.map((btn) => (
            <li key={btn.id}>
              <button
                onClick={() => setActivePanel(btn.id)}
                className="inline-flex items-center text-[#6b7280] text-[13px] font-medium px-3 py-1.5 rounded-lg transition-all hover:text-[#0f1b3d] hover:bg-[#e8f0ff] cursor-pointer bg-transparent border-none font-[inherit] leading-none"
              >
                {btn.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="mailto:info@matefet.co.il"
          className="bg-gradient-to-l from-[#0f1b3d] to-[#1a3a8f] text-white border-none px-5 py-2 rounded-lg text-[12px] font-bold shadow-[0_4px_15px_rgba(26,58,143,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(26,58,143,0.4)] no-underline"
        >
          צרו קשר
        </a>
      </nav>

      {/* ══════════════════ HERO ══════════════════ */}
      <section
        ref={heroRef}
        className="min-h-screen pt-[70px] relative overflow-hidden flex items-center"
        style={{ background: "linear-gradient(160deg, #f0f4ff 0%, #e8f0ff 50%, #f5f7ff 100%)" }}
      >
        {/* Orbs */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full -top-[100px] -left-[100px] bg-[#1a3a8f]/[0.08] blur-[80px] pointer-events-none animate-[orbFloat_8s_ease-in-out_infinite]"
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full bottom-0 right-[10%] bg-[#c9a84c]/[0.06] blur-[80px] pointer-events-none animate-[orbFloat_8s_ease-in-out_infinite]"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full top-[30%] right-[30%] bg-[#1a3a8f]/[0.05] blur-[80px] pointer-events-none animate-[orbFloat_8s_ease-in-out_infinite]"
          style={{ animationDelay: "5s" }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(26,58,143,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(26,58,143,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Hero inner */}
        <div className="relative z-[2] w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-[5%] py-16">

          {/* ── Text side ── */}
          <motion.div
            className="flex-shrink-0 md:w-[48%] text-center md:text-right"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-[#1a3a8f]/[0.08] border border-[#1a3a8f]/[0.15] px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-[#1a3a8f] tracking-wider mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a3a8f] animate-[badgeBlink_2s_infinite]" />
              ליווי ניהולי מוביל לעמותות
            </motion.div>

            {/* Label */}
            <motion.p
              className="text-[13px] text-[#6b7280] mb-2 tracking-wider"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.4 }}
            >
              ליווי ניהולי
            </motion.p>

            {/* H1 */}
            <motion.h1
              className="text-[48px] sm:text-[62px] font-black leading-none mb-5 tracking-tight"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <span className="block text-[#0f1b3d]">ניהול תקין</span>
              <span className="block bg-gradient-to-l from-[#1a3a8f] to-[#4a7aff] bg-clip-text text-transparent">
                מעטפת ניהולית
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-[15px] text-[#6b7280] leading-[1.8] max-w-[420px] mb-9 mx-auto md:mr-0"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              ניהול תקין פועלת כגוף ליווי וניהול על{" "}
              <strong className="text-[#0f1b3d] font-semibold">לעמותות וארגונים</strong>.
              פעילות החברה מתמקדת בהחזקת{" "}
              <strong className="text-[#0f1b3d] font-semibold">התשתית הניהולית</strong>,
              הרגולטורית והמערכתית.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="flex flex-wrap items-center gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <a
                href="mailto:info@matefet.co.il"
                className="inline-flex items-center gap-2.5 bg-gradient-to-l from-[#0f1b3d] to-[#1a3a8f] text-white border-none px-8 py-4 rounded-xl text-[14px] font-bold shadow-[0_8px_30px_rgba(26,58,143,0.35)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_15px_40px_rgba(26,58,143,0.45)] no-underline"
              >
                צרו קשר עכשיו
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                </svg>
              </a>
            </motion.div>

            {/* Trust */}
            <motion.div
              className="flex items-center gap-4 mt-8 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="flex">
                {[
                  { letter: "א", bg: "linear-gradient(135deg,#c8dcf5,#9ecef0)" },
                  { letter: "מ", bg: "linear-gradient(135deg,#f5e6c8,#f0d49e)" },
                  { letter: "ש", bg: "linear-gradient(135deg,#c8f5da,#9eefc0)" },
                  { letter: "ד", bg: "linear-gradient(135deg,#f5c8c8,#f09e9e)" },
                ].map((a, i) => (
                  <div
                    key={a.letter}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#1a3a8f]"
                    style={{ background: a.bg, marginLeft: i > 0 ? "-8px" : "0" }}
                  >
                    {a.letter}
                  </div>
                ))}
              </div>
              <p className="text-[12px] text-[#6b7280]">
                <strong className="text-[#0f1b3d] font-bold">+20 ארגונים</strong> כבר סומכים עלינו
              </p>
            </motion.div>

            {/* Mobile side buttons */}
            <div className="flex flex-col gap-2 mt-8 md:hidden">
              {sideButtons.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setActivePanel(btn.id)}
                  className="px-5 py-2.5 bg-transparent border border-[#0f1b3d]/20 text-[#0f1b3d] rounded-lg text-[12px] font-semibold transition-all hover:border-[#1a3a8f] hover:text-[#1a3a8f] hover:bg-[#e8f0ff] cursor-pointer"
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Visual side ── */}
          <div className="hidden md:flex flex-shrink-0 md:w-[48%] relative h-[500px] items-center justify-center">

            {/* Background circle */}
            <div className="absolute w-[380px] h-[380px] rounded-full z-[1] animate-[bgCirclePulse_6s_ease-in-out_infinite] bg-gradient-to-br from-[#1a3a8f]/[0.06] to-[#4a7aff]/[0.1] border border-[#1a3a8f]/[0.08]" />

            {/* Geometric shapes */}
            <div className="absolute inset-0 z-[2] pointer-events-none">
              {/* Triangles */}
              <div className="absolute top-[12%] right-[5%] w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[16px] border-b-[#4a7aff] opacity-40" />
              <div className="absolute top-[22%] right-[14%] w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[16px] border-t-[#4a7aff] opacity-40" />
              <div className="absolute top-[8%] left-[15%] w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[24px] border-b-[#1a3a8f]/30 opacity-40" />
              <div className="absolute bottom-[25%] left-[8%] w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[16px] border-b-[#4a7aff] opacity-40" />
              <div className="absolute bottom-[18%] right-[10%] w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[16px] border-t-[#4a7aff] opacity-40" />

              {/* Rings */}
              <div className="absolute top-[30%] left-[12%] w-6 h-6 rounded-full border-2 border-[#4a7aff] opacity-40" />
              <div className="absolute bottom-[30%] right-[6%] w-[18px] h-[18px] rounded-full border-2 border-[#4a7aff] opacity-40" />

              {/* Crosses */}
              <div className="absolute top-[45%] right-[2%] text-[#4a7aff] text-[20px] font-light opacity-40 leading-none" style={{ fontFamily: "Arial" }}>✕</div>
              <div className="absolute top-[18%] left-[5%] text-[#4a7aff] text-[16px] font-light opacity-40 leading-none" style={{ fontFamily: "Arial" }}>✕</div>

              {/* Dot grids */}
              <div className="absolute top-[6%] right-[30%] grid grid-cols-5 gap-[5px] opacity-40">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span key={`dt${i}`} className="w-1 h-1 rounded-full bg-[#4a7aff] block" />
                ))}
              </div>
              <div className="absolute bottom-[8%] left-[22%] grid grid-cols-4 gap-[5px] opacity-30">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={`db${i}`} className="w-1 h-1 rounded-full bg-[#4a7aff] block" />
                ))}
              </div>
            </div>

            {/* Floating mini-doc — protocol */}
            <div className="absolute top-[8%] right-[-10%] bg-white rounded-2xl px-4 py-3.5 shadow-[0_15px_40px_rgba(15,27,61,0.12),0_0_0_1px_rgba(26,58,143,0.04)] z-[4] whitespace-nowrap animate-[fc1Float_5s_ease-in-out_infinite]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-9 rounded bg-[#e8f0ff] border border-[#1a3a8f]/10 flex items-center justify-center">
                  <svg width="14" height="14" fill="none" stroke="#1a3a8f" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#0f1b3d] leading-none">פרוטוקול ישיבה</div>
                  <div className="text-[9px] text-[#6b7280] mt-0.5">ועד מנהל · 2026</div>
                </div>
              </div>
              <div className="flex gap-1">
                <span className="w-full h-[3px] rounded-full bg-[#2ed573]" />
                <span className="w-3/4 h-[3px] rounded-full bg-[#2ed573]/40" />
              </div>
            </div>

            {/* Floating mini-doc — financial report */}
            <div className="absolute bottom-[15%] left-[-8%] bg-white rounded-2xl px-4 py-3.5 shadow-[0_15px_40px_rgba(15,27,61,0.12),0_0_0_1px_rgba(26,58,143,0.04)] z-[4] whitespace-nowrap animate-[fc2Float_6s_ease-in-out_infinite]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-9 rounded bg-[#fef3c7] border border-[#c9a84c]/20 flex items-center justify-center">
                  <svg width="14" height="14" fill="none" stroke="#c9a84c" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#0f1b3d] leading-none">דו״ח כספי שנתי</div>
                  <div className="text-[9px] text-[#6b7280] mt-0.5">מאושר · רו״ח</div>
                </div>
              </div>
              <div className="flex gap-1">
                <span className="w-full h-[3px] rounded-full bg-[#c9a84c]" />
                <span className="w-1/2 h-[3px] rounded-full bg-[#c9a84c]/40" />
              </div>
            </div>

            {/* Floating mini-doc — binder/folder */}
            <div className="absolute top-[42%] left-[-15%] bg-white rounded-2xl px-4 py-3.5 shadow-[0_15px_40px_rgba(15,27,61,0.12),0_0_0_1px_rgba(26,58,143,0.04)] z-[4] whitespace-nowrap animate-[fc3Float_4.5s_ease-in-out_infinite]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-9 rounded bg-[#e8f0ff] border border-[#1a3a8f]/10 flex items-center justify-center">
                  <svg width="14" height="14" fill="none" stroke="#1a3a8f" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#0f1b3d] leading-none">תיק ניהול תקין</div>
                  <div className="text-[9px] text-[#6b7280] mt-0.5">8 מסמכים</div>
                </div>
              </div>
              <div className="flex gap-1">
                <span className="w-full h-[3px] rounded-full bg-[#1a3a8f]" />
                <span className="w-full h-[3px] rounded-full bg-[#1a3a8f]/40" />
              </div>
            </div>

            {/* Binder image */}
            <motion.div
              className="relative z-[3] float-slow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            >
              <img
                src={`/binder.webp?v=${v}`}
                alt="קלסר ניהול תקין"
                className="h-[280px] sm:h-[340px] md:h-[400px] w-auto object-contain -scale-x-100 drop-shadow-[0_30px_60px_rgba(0,0,0,0.2)]"
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2 animate-[scrollBounce_2s_ease-in-out_infinite]">
          <div className="w-[22px] h-[34px] border-2 border-[#ccc] rounded-[11px] flex justify-center pt-1.5">
            <div className="w-[3px] h-1.5 bg-[#aaa] rounded-sm animate-[scrollDot_2s_ease-in-out_infinite]" />
          </div>
          <span className="text-[10px] tracking-[3px] text-[#aaa] uppercase">Scroll</span>
        </div>
      </section>

      {/* ══════════════════ STATS ══════════════════ */}
      <StatsCounter />

      {/* ══════════════════ TOPICS / FEATURES ══════════════════ */}
      <section
        className="py-24 px-[5%] relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #f5f7ff, white)" }}
      >
        {/* Subtle background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          src="/flying-docs-bg.webm"
          autoPlay
          muted
          loop
          playsInline
          style={{ opacity: 0.06, mixBlendMode: "multiply" }}
        />
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-1.5 bg-[#e8f0ff] text-[#1a3a8f] text-[11px] font-bold tracking-[1.5px] px-4 py-1.5 rounded-full uppercase mb-4">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            תחומי ידע
          </div>
          <h2
            className="text-[32px] sm:text-[38px] font-black text-[#0f1b3d] mb-3 tracking-tight"
            style={{ fontFamily: "'Secular One', sans-serif" }}
          >
            כל מה שעמותה צריכה לדעת
          </h2>
          <p className="text-[15px] text-[#6b7280] max-w-[500px] mx-auto leading-relaxed">
            לחצו על נושא לקריאה מעמיקה
          </p>
        </motion.div>

        <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <TiltCard
                onClick={() => setSelectedTopic(topic)}
                className="group h-full"
              >
                <div className="relative bg-white rounded-[20px] p-6 sm:p-7 border border-[#1a3a8f]/[0.07] overflow-hidden transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(15,27,61,0.1)] group-hover:border-[#1a3a8f]/[0.12] h-full cursor-pointer">
                  {/* Accent line */}
                  <div
                    className="absolute top-0 inset-x-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"
                    style={{ background: `linear-gradient(90deg, ${topic.color}, #4a7aff)` }}
                  />

                  {/* Icon */}
                  <div
                    className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-5 transition-colors duration-300"
                    style={{ backgroundColor: `${topic.color}12` }}
                  >
                    <span className="text-2xl">{topic.icon}</span>
                  </div>

                  <div
                    className="text-[15px] sm:text-[16px] font-bold text-[#0f1b3d] mb-2.5"
                    style={{ fontFamily: "'Secular One', sans-serif" }}
                  >
                    {topic.title}
                  </div>

                  <div className="text-[12px] sm:text-[13px] text-[#6b7280] leading-relaxed">
                    {topic.content[0].slice(0, 80)}...
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════ CTA ══════════════════ */}
      <section
        className="mx-[5%] mb-20 rounded-[28px] overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #0f1b3d 0%, #1a3a8f 100%)" }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-1/2 -right-[10%] w-[400px] h-[400px] rounded-full bg-white/[0.04] pointer-events-none" />
        <div className="absolute -bottom-[30%] left-[5%] w-[250px] h-[250px] rounded-full bg-[#c9a84c]/[0.1] pointer-events-none" />

        <motion.div
          className="relative z-[1] flex flex-col md:flex-row items-center justify-between px-10 sm:px-16 py-16 gap-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="text-[11px] font-bold tracking-[2px] text-white/60 uppercase mb-3">מוכנים להתחיל?</div>
            <h2 className="text-[28px] sm:text-[36px] font-black text-white leading-tight mb-3 tracking-tight">
              קחו את הניהול<br />לרמה הבאה
            </h2>
            <p className="text-[14px] text-white/65 max-w-[400px] leading-relaxed">
              הצטרפו לעשרות ארגונים שכבר מנהלים חכם יותר עם מעטפת ניהול תקין.
            </p>
          </div>
          <div className="flex flex-col gap-3 items-center md:items-start">
            <MagneticButton>
              <a
                href="mailto:info@matefet.co.il"
                className="inline-flex items-center gap-2.5 bg-[#c9a84c] text-[#0f1b3d] border-none px-9 py-4 rounded-xl text-[14px] font-extrabold shadow-[0_8px_30px_rgba(201,168,76,0.4)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_15px_40px_rgba(201,168,76,0.5)] no-underline whitespace-nowrap"
              >
                צרו קשר עכשיו
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                </svg>
              </a>
            </MagneticButton>
            <span className="text-[11px] text-white/40">ללא התחייבות · ייעוץ ראשוני חינם</span>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════ DISCLAIMER ══════════════════ */}
      <section className="py-16 px-[5%]">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-xl border border-[#e8e4df] bg-[#fdfcfb] p-6 sm:p-8">
            <h3 className="text-base font-bold text-[#5a4a3b] mb-2">הבהרה</h3>
            <p className="text-sm text-[#7a6a5b] leading-relaxed">
              השירותים ניתנים כל אחד כיחידה עצמאית, ואינם כוללים שירותי משרד,
              מזכירות או תפעול שוטף.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer className="bg-[#0f1b3d] py-10 px-[5%]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-7 border-b border-white/[0.08]">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <img
                src={`/logo-transparent.webp?v=${v}`}
                alt="מעטפת ניהולית"
                className="h-9 w-auto"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-[14px] font-bold text-white">ניהול תקין</span>
                <span className="text-[10px] text-white/40">מעטפת ניהולית</span>
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-6">
              {externalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-white/50 no-underline transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="flex gap-5">
              <a href="mailto:info@matefet.co.il" className="text-[12px] text-white/50 no-underline transition-colors hover:text-white">
                info@matefet.co.il
              </a>
              <a href="tel:+972000000000" className="text-[12px] text-white/50 no-underline transition-colors hover:text-white" dir="ltr">
                050-000-0000
              </a>
            </div>
          </div>

          <div className="flex justify-between items-center mt-5">
            <span className="text-[11px] text-white/25">© 2025 ניהול תקין. כל הזכויות שמורות.</span>
            <span className="text-[11px] text-white/25 tracking-[2px]">בסיעתא דשמיא</span>
          </div>
        </div>
      </footer>

      {/* ══════════════════ SCROLL TO TOP ══════════════════ */}
      <AnimatePresence>
        {headerSolid && (
          <motion.button
            className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full bg-[#0f1b3d] text-white shadow-lg flex items-center justify-center hover:bg-[#1a3a8f] transition-colors cursor-pointer border-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="גלילה למעלה"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* ══════════════════ FAQ FAB ══════════════════ */}
      <button
        onClick={() => setActivePanel("faq")}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-2xl bg-gradient-to-l from-[#0f1b3d] to-[#1a3a8f] text-white shadow-[0_8px_30px_rgba(26,58,143,0.35)] flex items-center justify-center cursor-pointer border border-white/10 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(26,58,143,0.45)] transition-all duration-300 backdrop-blur-sm"
        aria-label="שאלות ותשובות"
      >
        <span className="text-[22px] font-bold leading-none">?</span>
      </button>

      {/* ══════════════════ MODALS ══════════════════ */}
      <TopicModal
        topic={selectedTopic}
        onClose={() => setSelectedTopic(null)}
      />
      <SidePanel
        activePanel={activePanel}
        onClose={() => setActivePanel(null)}
      />
    </>
  );
}
