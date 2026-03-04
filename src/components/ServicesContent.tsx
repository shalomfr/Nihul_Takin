"use client";
import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { topics } from "@/data/topics";
import TopicModal from "@/components/TopicModal";
import SidePanel from "@/components/SidePanel";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import CursorGlow from "@/components/CursorGlow";
import type { PanelType } from "@/components/SidePanel";
import type { Topic } from "@/data/topics";

const v = process.env.NEXT_PUBLIC_BUILD_ID || "";

const sideButtons: { id: PanelType; label: string }[] = [
  { id: "dictionary", label: "א' ב' בניהול תקין" },
  { id: "faq", label: "יש לי שאלה" },
  { id: "articles", label: "יש לי מושג" },
];

/* ── Word-by-word stagger reveal ── */
function WordReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.08,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </span>
  );
}

/* ── Bento grid sizing ── */
function getBentoClass(index: number): string {
  if (index === 0 || index === 7) return "sm:col-span-2";
  return "";
}

export default function ServicesContent() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [headerSolid, setHeaderSolid] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setHeaderSolid(latest > 60);
  });

  return (
    <main className="min-h-screen bg-white">
      <ScrollProgress />
      <CursorGlow />

      {/* ── Header ── */}
      <motion.header
        className="fixed top-0 right-0 left-0 z-[100] transition-all duration-500"
        animate={{
          backgroundColor: headerSolid
            ? "rgba(255,255,255,0.92)"
            : "rgba(255,255,255,0)",
          backdropFilter: headerSolid ? "blur(16px)" : "blur(0px)",
          borderBottom: headerSolid
            ? "1px solid rgba(0,0,0,0.06)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="text-xs text-[#b0b0b0] tracking-widest">
            בסיעתא דשמיא
          </span>
          <nav className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm">
            {[
              { href: "https://www.gov.il/he/departments/topics/amutot", label: "חוקים והנחיות" },
              { href: "https://www.guidestar.org.il/", label: "גיידסטאר" },
              { href: "https://www.gov.il/he/departments/Units/rasham_amutot", label: "רשם העמותות" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8a8a8a] hover:text-[#1e3a5f] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 right-0 w-0 h-[1px] bg-[#1e3a5f] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* ── Hero Section ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-white">
        {/* Subtle top gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f8fa] to-white" />

        <div className="relative z-10 text-center px-4 pt-24 pb-16 max-w-3xl mx-auto">
          {/* Logo */}
          <motion.img
            src={`/logo-transparent.png?v=${v}`}
            alt="מעטפת ניהולית"
            className="h-20 sm:h-28 md:h-32 w-auto mx-auto mb-10 float-slow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1a1a2e] mb-4"
            style={{ fontFamily: "'Secular One', sans-serif" }}
          >
            <WordReveal text="ניהול תקין" delay={0.2} />
          </h1>
          <motion.p
            className="text-xl sm:text-2xl text-[#5a5a6e] font-light mb-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            מעטפת ניהולית בע״מ
          </motion.p>

          {/* Thin divider */}
          <motion.div
            className="w-16 h-[1px] bg-[#d0d0d0] mx-auto mb-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          />

          {/* Description */}
          <div className="space-y-4 max-w-2xl mx-auto mb-12">
            {[
              "ניהול תקין - מעטפת ניהולית פועלת כגוף ליווי וניהול על לעמותות וארגונים.",
              "החברה אינה מספקת שירותי משרד, מזכירות או תפעול שוטף, ואינה מחליפה את הנהלת הארגון.",
              "פעילות החברה מתמקדת בהחזקת התשתית הניהולית, הרגולטורית והמערכתית של הארגון.",
            ].map((text, i) => (
              <motion.p
                key={i}
                className="text-[#6b6b7b] text-sm sm:text-base leading-[1.9]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.12, duration: 0.5 }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* Side buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            {sideButtons.map((btn) => (
              <MagneticButton
                key={btn.id}
                onClick={() => setActivePanel(btn.id)}
              >
                <div className="px-5 py-2.5 rounded-full border border-[#e0e0e0] bg-white hover:bg-[#f7f8fa] hover:border-[#c0c0c0] transition-all text-sm text-[#5a5a6e] hover:text-[#1a1a2e] shadow-sm">
                  {btn.label}
                </div>
              </MagneticButton>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <motion.div
              className="w-5 h-9 rounded-full border border-[#d0d0d0] flex items-start justify-center p-1.5"
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              <div className="w-1 h-2.5 bg-[#c0c0c0] rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Topics Grid ── */}
      <section className="py-20 sm:py-28 px-4 bg-white">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e] mb-3"
            style={{ fontFamily: "'Secular One', sans-serif" }}
          >
            תחומי ידע
          </h2>
          <p className="text-[#8a8a8a] text-base">
            לחצו על נושא לקריאה מעמיקה
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {topics.map((topic, i) => (
              <motion.div
                key={topic.id}
                className={getBentoClass(i)}
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
                  className="group"
                >
                  <div className="relative bg-white border border-[#e8e8e8] group-hover:border-[#c0c0c0] rounded-2xl p-6 sm:p-8 text-center overflow-hidden transition-all duration-400 h-full min-h-[160px] flex flex-col items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.04)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                    {/* Subtle accent line at top */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ backgroundColor: topic.color }}
                    />

                    <motion.span
                      className="text-3xl sm:text-4xl block mb-3"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {topic.icon}
                    </motion.span>

                    <span
                      className="text-sm sm:text-base font-bold text-[#1a1a2e] block"
                      style={{ fontFamily: "'Secular One', sans-serif" }}
                    >
                      {topic.title}
                    </span>

                    <span className="text-xs text-transparent group-hover:text-[#8a8a8a] transition-colors duration-300 mt-2">
                      קריאה נוספת
                    </span>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── Disclaimer ── */}
      <section className="py-16 px-4 bg-white">
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

      {/* ── BSH divider ── */}
      <div className="py-10 bg-white">
        <div className="max-w-xs mx-auto h-[1px] bg-[#e8e8e8] mb-8" />
        <div className="text-center text-xs text-[#c0c0c0] tracking-widest">
          בסיעתא דשמיא
        </div>
      </div>

      {/* ── Modals ── */}
      <TopicModal
        topic={selectedTopic}
        onClose={() => setSelectedTopic(null)}
      />
      <SidePanel
        activePanel={activePanel}
        onClose={() => setActivePanel(null)}
      />
    </main>
  );
}
