"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { topics } from "@/data/topics";
import TopicModal from "@/components/TopicModal";
import SidePanel from "@/components/SidePanel";
import InfoBanner from "@/components/tel-aviv/InfoBanner";
import ServiceCards from "@/components/tel-aviv/ServiceCards";
import QuestionnaireScroller from "@/components/tel-aviv/QuestionnaireScroller";
import type { PanelType } from "@/components/SidePanel";
import type { Topic } from "@/data/topics";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  MessageCircle,
  BookOpen,
  HelpCircle,
  FileText,
  Menu,
  X,
  Landmark,
  Coins,
  ClipboardList,
  Scale,
  Users,
  FileBarChart,
  Receipt,
  SearchCheck,
  Zap,
  Phone,
  Mail,
  ArrowUp,
} from "lucide-react";

const v = process.env.NEXT_PUBLIC_BUILD_ID || "";

const sideButtons: { id: PanelType; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: "dictionary", label: "א' ב' בניהול תקין", icon: BookOpen },
  { id: "faq", label: "שאלות ותשובות", icon: HelpCircle },
  { id: "articles", label: "מאמרים", icon: FileText },
];

const externalLinks = [
  { href: "https://www.gov.il/he/departments/topics/associations_and_companies_for_the_benefit_of_the_public/govil-landing-page", label: "רשם העמותות" },
  { href: "https://www.guidestar.org.il/", label: "גיידסטאר" },
];

const topicIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "nihul-takin": Landmark,
  "tagmul": Coins,
  "protocols": ClipboardList,
  "nigud-inyanim": Scale,
  "krovei-mishpacha": Users,
  "dochot-shnatiyim": FileBarChart,
  "saif-46": Receipt,
  "bikoret": SearchCheck,
};

const newsItems = [
  { id: 1, title: "עדכון: חובת הגשת דוחות שנתיים לרשם העמותות", date: "10.3.26", color: "#0077C8" },
  { id: 2, title: "שינוי בתקנות גמול חברי ועד מנהל בעמותות", date: "8.3.26", color: "#e8740c" },
  { id: 3, title: "הנחיות חדשות מרשם העמותות לניהול תקין 2026", date: "5.3.26", color: "#0077C8" },
  { id: 4, title: "דרישות מעודכנות לקבלת אישור סעיף 46", date: "3.3.26", color: "#e8740c" },
  { id: 5, title: "מדריך: כיצד לנהל ועדת ביקורת אפקטיבית", date: "1.3.26", color: "#0077C8" },
  { id: 6, title: "שינויים בחוק העמותות - מה חדש ב-2026", date: "28.2.26", color: "#e8740c" },
];

export default function TelAvivLanding() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const minDelay = new Promise(resolve => setTimeout(resolve, 1500));
    const pageLoad = new Promise<void>(resolve => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    Promise.all([minDelay, pageLoad]).then(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      window.scrollTo(0, 0);
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [loading]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-[#f5f6f8] min-h-screen" style={{ fontFamily: "'Assistant', 'Inter', sans-serif" }}>
      {/* ══════════════════ LOADER ══════════════════ */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center gap-4"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img src={`/logo-transparent.webp?v=${v}`} alt="" className="h-16 w-auto" />
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-[#0077C8] animate-[dotBounce_1.4s_ease-in-out_infinite]"
                  style={{ animationDelay: `${i * 0.16}s` }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════ HEADER ══════════════════ */}
      <header className="bg-white sticky top-0 z-[100] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <div className="max-w-[1400px] mx-auto px-[3%]">
          <div className="flex items-center justify-between h-[70px]">
            {/* Right: Nav items */}
            <div className="hidden lg:flex items-center gap-1">
              <a href="/" className="flex items-center gap-2 bg-[#0077C8] text-white px-4 py-2 rounded-lg text-[13px] font-bold no-underline hover:bg-[#005fa3] transition-colors">
                <LayoutGrid size={16} />
                כל השירותים
              </a>
              <a
                href="mailto:info@matefet.co.il"
                className="flex items-center gap-1.5 text-[#333] text-[13px] font-medium px-3 py-2 rounded-lg hover:bg-[#f0f7ff] hover:text-[#0077C8] no-underline transition-colors"
              >
                <MessageCircle size={14} />
                צרו קשר
              </a>
              {sideButtons.map((btn) => {
                const Icon = btn.icon;
                return (
                  <button
                    key={btn.id}
                    onClick={() => setActivePanel(btn.id)}
                    className="flex items-center gap-1.5 text-[#333] text-[13px] font-medium px-3 py-2 rounded-lg hover:bg-[#f0f7ff] hover:text-[#0077C8] cursor-pointer bg-transparent border-none font-[inherit] transition-colors"
                  >
                    <Icon size={14} />
                    {btn.label}
                  </button>
                );
              })}
            </div>

            {/* Center: Logo */}
            <a href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 no-underline">
              <img src={`/logo-transparent.webp?v=${v}`} alt="מעטפת ניהולית" className="h-12 w-auto" />
            </a>

            {/* Left: Secondary nav */}
            <div className="hidden lg:flex items-center gap-3">
              {externalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#333] text-[13px] font-medium px-2 py-1.5 rounded hover:text-[#0077C8] no-underline transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <span className="text-[#0077C8] text-[13px] font-bold">HE</span>
              <button className="bg-transparent border-none cursor-pointer p-1.5 rounded hover:bg-[#f0f7ff] transition-colors">
                <Search size={18} className="text-[#333]" />
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden bg-transparent border-none cursor-pointer p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} className="text-[#333]" /> : <Menu size={24} className="text-[#333]" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-white border-t border-[#e5e7eb] px-[5%] py-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className="flex flex-col gap-2">
                {sideButtons.map((btn) => {
                  const Icon = btn.icon;
                  return (
                    <button
                      key={btn.id}
                      onClick={() => { setActivePanel(btn.id); setMobileMenuOpen(false); }}
                      className="flex items-center gap-2 text-right text-[#333] text-[14px] font-medium py-2.5 px-3 rounded-lg hover:bg-[#f0f7ff] cursor-pointer bg-transparent border-none font-[inherit]"
                    >
                      <Icon size={16} className="text-[#0077C8]" />
                      {btn.label}
                    </button>
                  );
                })}
                {externalLinks.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-right text-[#333] text-[14px] font-medium py-2.5 px-3 rounded-lg hover:bg-[#f0f7ff] no-underline">
                    {link.label}
                  </a>
                ))}
                <a href="mailto:info@matefet.co.il" className="text-center bg-[#0077C8] text-white py-2.5 px-4 rounded-lg text-[14px] font-bold no-underline mt-2">
                  צרו קשר
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ══════════════════ BLUE TICKER ══════════════════ */}
      <InfoBanner />

      {/* ══════════════════ HERO BANNER ══════════════════ */}
      <section className="relative overflow-hidden">
        <div className="w-full h-[350px] sm:h-[420px] md:h-[480px] relative">
          {/* Background image */}
          <img
            src="/office-bg.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 25%" }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#0a1628]/75 via-[#0a1628]/40 to-[#0a1628]/20" />

          {/* Hero text overlay */}
          <div className="absolute bottom-16 right-[5%] md:right-[8%]">
            <motion.h1
              className="text-[36px] sm:text-[48px] md:text-[56px] font-bold text-white leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
            >
              ניהול תקין
              <br />
              <span className="text-[#ffd700]">לעמותות</span>
            </motion.h1>
            <motion.p
              className="text-[16px] text-white/80 mt-3 max-w-[400px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}
            >
              ליווי מקצועי בניהול תקין, דוחות שנתיים, סעיף 46 ועוד
            </motion.p>
          </div>

          {/* Navigation arrows */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors cursor-pointer border-none shadow-md">
            <ChevronLeft size={20} className="text-[#333]" />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors cursor-pointer border-none shadow-md">
            <ChevronRight size={20} className="text-[#333]" />
          </button>
        </div>

        {/* Search bar */}
        <div className="max-w-[700px] mx-auto -mt-8 relative z-10 px-[5%]">
          <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.12)] flex items-center overflow-hidden border border-[#e5e7eb]">
            <input
              type="text"
              placeholder="חיפוש באתר"
              className="flex-1 px-6 py-4 text-[16px] text-[#333] placeholder-[#999] border-none outline-none bg-transparent text-right font-[inherit]"
              dir="rtl"
            />
            <button className="shrink-0 bg-[#0077C8] text-white px-5 py-4 border-none cursor-pointer hover:bg-[#005fa3] transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════ SERVICE ICONS ROW ══════════════════ */}
      <div className="mt-8">
        <ServiceCards />
      </div>

      {/* ══════════════════ MAIN CONTENT: TWO COLUMNS ══════════════════ */}
      <div className="max-w-[1400px] mx-auto px-[3%] py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Right: Topics + News ── */}
          <div className="flex-1 min-w-0">

            {/* Topics */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[24px] font-semibold text-[#0077C8] m-0">תחומי ידע</h2>
                <button
                  onClick={() => setActivePanel("articles")}
                  className="text-[13px] text-[#0077C8] font-medium hover:underline cursor-pointer bg-transparent border-none"
                >
                  לכל הנושאים
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {topics.map((topic, i) => {
                  const Icon = topicIcons[topic.id] || Landmark;
                  return (
                    <motion.div
                      key={topic.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                      <button
                        onClick={() => setSelectedTopic(topic)}
                        className="w-full text-right bg-white rounded-xl overflow-hidden border border-[#e5e7eb] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-200 cursor-pointer p-0 group"
                      >
                        <div
                          className="h-[100px] flex items-center justify-center relative overflow-hidden"
                          style={{ background: `linear-gradient(135deg, ${topic.color}, ${topic.color}cc)` }}
                        >
                          <Icon size={40} className="text-white/80" />
                        </div>
                        <div className="p-4">
                          <h3 className="text-[15px] font-semibold text-[#333] mb-1 group-hover:text-[#0077C8] transition-colors">
                            {topic.title}
                          </h3>
                          <p className="text-[12px] text-[#666] leading-relaxed m-0">
                            {topic.content[0].slice(0, 60)}...
                          </p>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* News */}
            <section>
              <h2 className="text-[24px] font-semibold text-[#0077C8] mb-6 m-0">חדשות ועדכונים</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {newsItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-[#e5e7eb] p-5 flex items-center gap-4 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] font-semibold text-[#333] mb-2 leading-snug">{item.title}</h3>
                      <span className="text-[12px] text-[#999]">{item.date}</span>
                    </div>
                    <div
                      className="w-16 h-16 rounded-lg shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <FileText size={24} className="opacity-60" style={{ color: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── Left: Questionnaire Scroller ── */}
          <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0">
            <div className="lg:sticky lg:top-[90px]">
              <QuestionnaireScroller />

              {/* CTA card */}
              <div className="mt-4 bg-[#0077C8] rounded-xl p-6 text-white text-center">
                <MessageCircle size={28} className="mx-auto mb-3 opacity-80" />
                <h3 className="text-[18px] font-semibold mb-2">צריכים עזרה?</h3>
                <p className="text-[13px] text-white/80 mb-4 leading-relaxed">
                  צוות מעטפת ניהולית ילווה אתכם בכל שלב
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="mailto:info@matefet.co.il"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#0077C8] px-6 py-2.5 rounded-lg text-[13px] font-bold no-underline hover:bg-[#f0f7ff] transition-colors"
                  >
                    <Mail size={14} />
                    שלחו מייל
                  </a>
                  <a
                    href="tel:+972000000000"
                    className="inline-flex items-center justify-center gap-2 bg-white/15 text-white px-6 py-2.5 rounded-lg text-[13px] font-bold no-underline hover:bg-white/25 transition-colors"
                  >
                    <Phone size={14} />
                    <span dir="ltr">050-000-0000</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer className="bg-white border-t border-[#e5e7eb] py-8 px-[3%]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-6 border-b border-[#e5e7eb]">
            <div className="flex items-center gap-3">
              <img src={`/logo-transparent.webp?v=${v}`} alt="מעטפת ניהולית" className="h-10 w-auto" />
              <div className="flex flex-col leading-tight">
                <span className="text-[15px] font-semibold text-[#333]">ניהול תקין</span>
                <span className="text-[11px] text-[#999]">מעטפת ניהולית</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              {externalLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#666] no-underline hover:text-[#0077C8] transition-colors">
                  {link.label}
                </a>
              ))}
              {sideButtons.map((btn) => (
                <button key={btn.id} onClick={() => setActivePanel(btn.id)} className="text-[13px] text-[#666] bg-transparent border-none cursor-pointer hover:text-[#0077C8] font-[inherit] transition-colors">
                  {btn.label}
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <a href="mailto:info@matefet.co.il" className="text-[13px] text-[#666] no-underline hover:text-[#0077C8] transition-colors">
                info@matefet.co.il
              </a>
              <a href="tel:+972000000000" className="text-[13px] text-[#666] no-underline hover:text-[#0077C8] transition-colors" dir="ltr">
                050-000-0000
              </a>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-[11px] text-[#bbb]">&copy; 2025 ניהול תקין. כל הזכויות שמורות.</span>
            <span className="text-[11px] text-[#bbb]">בסיעתא דשמיא</span>
          </div>
        </div>
      </footer>

      {/* ══════════════════ SCROLL TO TOP ══════════════════ */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-24 right-6 z-50 w-10 h-10 rounded-full bg-white border border-[#e5e7eb] shadow-md flex items-center justify-center hover:bg-[#f0f7ff] transition-colors cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="גלילה למעלה"
          >
            <ArrowUp size={18} className="text-[#0077C8]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ══════════════════ FAQ FAB ══════════════════ */}
      <button
        onClick={() => setActivePanel("faq")}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-[#0077C8] text-white shadow-[0_4px_16px_rgba(0,119,200,0.4)] flex items-center justify-center cursor-pointer border-none hover:bg-[#005fa3] hover:shadow-[0_6px_20px_rgba(0,119,200,0.5)] transition-all duration-300"
        aria-label="שאלות ותשובות"
      >
        <HelpCircle size={24} />
      </button>

      {/* ══════════════════ MODALS ══════════════════ */}
      <TopicModal topic={selectedTopic} onClose={() => setSelectedTopic(null)} />
      <SidePanel activePanel={activePanel} onClose={() => setActivePanel(null)} />
    </div>
  );
}
