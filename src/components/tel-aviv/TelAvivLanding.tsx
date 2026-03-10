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
  Search, ChevronLeft, ChevronRight, LayoutGrid, MessageCircle,
  BookOpen, HelpCircle, FileText, Menu, X, Landmark, Coins,
  ClipboardList, Scale, Users, FileBarChart, Receipt, SearchCheck,
  Phone, Mail, ArrowUp, ChevronDown, Shield, Award, Clock,
  CheckCircle2, ArrowLeft,
} from "lucide-react";

const v = process.env.NEXT_PUBLIC_BUILD_ID || "";

const fontStyle = { fontFamily: "'Assistant', 'Inter', sans-serif" };

const sideButtons: { id: PanelType; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: "dictionary", label: "מילון מונחים", icon: BookOpen },
  { id: "faq", label: "שאלות ותשובות", icon: HelpCircle },
  { id: "articles", label: "מאמרים", icon: FileText },
];

const externalLinks = [
  { href: "https://www.gov.il/he/departments/topics/associations_and_companies_for_the_benefit_of_the_public/govil-landing-page", label: "רשם העמותות" },
  { href: "https://www.guidestar.org.il/", label: "גיידסטאר" },
];

const topicIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "nihul-takin": Landmark, "tagmul": Coins, "protocols": ClipboardList,
  "nigud-inyanim": Scale, "krovei-mishpacha": Users, "dochot-shnatiyim": FileBarChart,
  "saif-46": Receipt, "bikoret": SearchCheck,
};

const stats = [
  { value: "40+", label: "ארגונים מנוהלים", icon: Shield },
  { value: "10+", label: "שנות ניסיון", icon: Award },
  { value: "100%", label: "שיעור הצלחה", icon: CheckCircle2 },
  { value: "24/7", label: "זמינות מלאה", icon: Clock },
];

const newsItems = [
  { id: 1, title: "עדכון: חובת הגשת דוחות שנתיים לרשם העמותות", date: "10.3.26", tag: "דוחות" },
  { id: 2, title: "שינוי בתקנות גמול חברי ועד מנהל בעמותות", date: "8.3.26", tag: "תקנות" },
  { id: 3, title: "הנחיות חדשות מרשם העמותות לניהול תקין 2026", date: "5.3.26", tag: "ניהול תקין" },
  { id: 4, title: "דרישות מעודכנות לקבלת אישור סעיף 46", date: "3.3.26", tag: "סעיף 46" },
  { id: 5, title: "מדריך: כיצד לנהל ועדת ביקורת אפקטיבית", date: "1.3.26", tag: "ביקורת" },
  { id: 6, title: "שינויים בחוק העמותות - מה חדש ב-2026", date: "28.2.26", tag: "חקיקה" },
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
    if (loading) document.body.style.overflow = "hidden";
    else { window.scrollTo(0, 0); document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [loading]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-[#f5f6f8] min-h-screen" style={fontStyle}>

      {/* ═══ LOADER ═══ */}
      <AnimatePresence>
        {loading && (
          <motion.div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center gap-4" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <img src={`/logo-transparent.webp?v=${v}`} alt="" className="h-16 w-auto" />
            <div className="flex gap-2">
              {[0, 1, 2].map(i => <span key={i} className="w-2.5 h-2.5 rounded-full bg-[#0077C8] animate-[dotBounce_1.4s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.16}s` }} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ HEADER ═══ */}
      <header className="bg-white sticky top-0 z-[100] shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
        <div className="max-w-[1400px] mx-auto px-[3%]">
          <div className="flex items-center justify-between h-[64px]">
            {/* Right nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              <a href="/" className="flex items-center gap-2 bg-[#0077C8] text-white px-4 py-2 rounded-lg text-[13px] font-semibold no-underline hover:bg-[#005fa3] transition-colors">
                <LayoutGrid size={15} />
                כל השירותים
              </a>
              <a href="mailto:info@matefet.co.il" className="flex items-center gap-1.5 text-[#555] text-[13px] font-normal px-3 py-2 rounded-lg hover:bg-[#f0f7ff] hover:text-[#0077C8] no-underline transition-colors">
                <MessageCircle size={14} />
                צרו קשר
              </a>
              {sideButtons.map(btn => {
                const Icon = btn.icon;
                return (
                  <button key={btn.id} onClick={() => setActivePanel(btn.id)} className="flex items-center gap-1.5 text-[#555] text-[13px] font-normal px-3 py-2 rounded-lg hover:bg-[#f0f7ff] hover:text-[#0077C8] cursor-pointer bg-transparent border-none font-[inherit] transition-colors">
                    <Icon size={14} />
                    {btn.label}
                  </button>
                );
              })}
            </div>
            {/* Logo */}
            <a href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5 no-underline">
              <img src={`/logo-transparent.webp?v=${v}`} alt="ניהול תקין" className="h-11 w-auto" />
              <span className="hidden sm:block text-[15px] font-semibold text-[#333]">ניהול תקין</span>
            </a>
            {/* Left nav */}
            <div className="hidden lg:flex items-center gap-2">
              {externalLinks.map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-[#555] text-[12px] font-normal px-2 py-1.5 rounded hover:text-[#0077C8] no-underline transition-colors">{link.label}</a>
              ))}
              <button className="bg-transparent border-none cursor-pointer p-1.5 rounded hover:bg-[#f0f7ff] transition-colors">
                <Search size={17} className="text-[#555]" />
              </button>
            </div>
            {/* Mobile */}
            <button className="lg:hidden bg-transparent border-none cursor-pointer p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={22} className="text-[#333]" /> : <Menu size={22} className="text-[#333]" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div className="lg:hidden bg-white border-t border-[#eee] px-[5%] py-4" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
              <div className="flex flex-col gap-1">
                {sideButtons.map(btn => { const Icon = btn.icon; return (
                  <button key={btn.id} onClick={() => { setActivePanel(btn.id); setMobileMenuOpen(false); }} className="flex items-center gap-2 text-[#333] text-[14px] py-2.5 px-3 rounded-lg hover:bg-[#f0f7ff] cursor-pointer bg-transparent border-none font-[inherit]">
                    <Icon size={16} className="text-[#0077C8]" />{btn.label}
                  </button>
                ); })}
                <a href="mailto:info@matefet.co.il" className="text-center bg-[#0077C8] text-white py-2.5 px-4 rounded-lg text-[13px] font-semibold no-underline mt-2">צרו קשר</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ═══ TICKER ═══ */}
      <InfoBanner />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-[#0a1628]">
        <div className="w-full h-[400px] sm:h-[460px] md:h-[520px] relative">
          <img src="/office-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" style={{ objectPosition: "center 25%" }} />
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,40,80,0.85) 0%, rgba(0,80,140,0.6) 40%, rgba(0,119,200,0.3) 100%)" }} />
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

          <div className="relative z-10 max-w-[1400px] mx-auto px-[5%] h-full flex items-center">
            <div className="max-w-[600px]">
              <motion.div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                <span className="text-[12px] text-white/90 font-light tracking-wide">ליווי ניהולי מוביל לעמותות וארגונים</span>
              </motion.div>

              <motion.h1 className="text-[38px] sm:text-[48px] md:text-[58px] font-bold text-white leading-[1.1] mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
                ניהול תקין
                <br />
                <span className="bg-gradient-to-l from-[#60b3f7] to-[#a5d8ff] bg-clip-text text-transparent">מעטפת ניהולית</span>
              </motion.h1>

              <motion.p className="text-[16px] sm:text-[17px] text-white/70 leading-relaxed mb-8 max-w-[480px] font-light" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
                פועלים כגוף ליווי מקצועי לעמותות וארגונים. מנהלים את התשתית הניהולית, הרגולטורית והמערכתית שלכם.
              </motion.p>

              <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
                <a href="mailto:info@matefet.co.il" className="inline-flex items-center gap-2 bg-[#0077C8] text-white px-7 py-3 rounded-lg text-[14px] font-semibold no-underline hover:bg-[#005fa3] transition-all hover:shadow-[0_8px_24px_rgba(0,119,200,0.35)]">
                  צרו קשר
                  <ArrowLeft size={16} />
                </a>
                <a href="tel:+972000000000" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg text-[14px] font-normal no-underline hover:bg-white/20 transition-colors">
                  <Phone size={15} />
                  <span dir="ltr">050-000-0000</span>
                </a>
              </motion.div>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40">
            <ChevronDown size={20} className="animate-bounce" />
          </div>
        </div>

        {/* Search bar */}
        <div className="max-w-[660px] mx-auto -mt-7 relative z-20 px-[5%]">
          <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex items-center overflow-hidden">
            <input type="text" placeholder="חיפוש שירותים, מאמרים ומדריכים..." className="flex-1 px-6 py-4 text-[15px] text-[#333] placeholder-[#aaa] border-none outline-none bg-transparent text-right font-[inherit] font-light" dir="rtl" />
            <button className="shrink-0 bg-[#0077C8] text-white px-5 py-4 border-none cursor-pointer hover:bg-[#005fa3] transition-colors">
              <Search size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ROW ═══ */}
      <div className="mt-10">
        <ServiceCards />
      </div>

      {/* ═══ STATS BAR ═══ */}
      <section className="py-12 px-[3%]">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="w-12 h-12 rounded-xl bg-[#0077C8]/8 flex items-center justify-center mx-auto mb-3">
                  <Icon size={22} className="text-[#0077C8]" />
                </div>
                <div className="text-[28px] font-bold text-[#0077C8]">{stat.value}</div>
                <div className="text-[13px] text-[#888] font-light mt-1">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="max-w-[1400px] mx-auto px-[3%] pb-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── Right: Topics + News ── */}
          <div className="flex-1 min-w-0">

            {/* Topics */}
            <section className="mb-14">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-[26px] font-semibold text-[#222] m-0">תחומי ידע</h2>
                  <p className="text-[14px] text-[#999] font-light mt-1 m-0">לחצו על נושא לקריאה מעמיקה</p>
                </div>
                <button onClick={() => setActivePanel("articles")} className="text-[13px] text-[#0077C8] font-medium hover:underline cursor-pointer bg-transparent border-none flex items-center gap-1">
                  לכל הנושאים
                  <ArrowLeft size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {topics.map((topic, i) => {
                  const Icon = topicIcons[topic.id] || Landmark;
                  return (
                    <motion.div key={topic.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                      <button onClick={() => setSelectedTopic(topic)} className="w-full text-right bg-white rounded-2xl overflow-hidden border border-[#eee] hover:border-[#0077C8]/30 hover:shadow-[0_8px_28px_rgba(0,119,200,0.1)] transition-all duration-300 cursor-pointer p-0 group">
                        <div className="h-[90px] flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(145deg, ${topic.color}ee, ${topic.color}99)` }}>
                          <Icon size={36} className="text-white/70 group-hover:scale-110 transition-transform duration-300" />
                          {/* Decorative circle */}
                          <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10" />
                        </div>
                        <div className="p-5">
                          <h3 className="text-[15px] font-semibold text-[#222] mb-2 group-hover:text-[#0077C8] transition-colors">{topic.title}</h3>
                          <p className="text-[12px] text-[#888] leading-relaxed m-0 font-light">{topic.content[0].slice(0, 70)}...</p>
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#0077C8] font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            קראו עוד <ArrowLeft size={12} />
                          </span>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* News */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-[26px] font-semibold text-[#222] m-0">חדשות ועדכונים</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {newsItems.map((item, i) => (
                  <motion.div key={item.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <div className="bg-white rounded-xl border border-[#eee] p-5 flex items-start gap-4 hover:border-[#0077C8]/20 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all cursor-pointer group">
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-[10px] font-semibold text-[#0077C8] bg-[#0077C8]/8 px-2 py-0.5 rounded-full mb-2">{item.tag}</span>
                        <h3 className="text-[14px] font-medium text-[#333] mb-2 leading-snug group-hover:text-[#0077C8] transition-colors">{item.title}</h3>
                        <span className="text-[12px] text-[#bbb] font-light">{item.date}</span>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-[#f5f7fa] flex items-center justify-center shrink-0 mt-1">
                        <FileText size={18} className="text-[#ccc]" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* ── Left: Sidebar ── */}
          <div className="w-full lg:w-[330px] xl:w-[360px] shrink-0">
            <div className="lg:sticky lg:top-[84px]">
              <QuestionnaireScroller />

              {/* CTA */}
              <div className="mt-5 rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-br from-[#004e82] to-[#0077C8] p-7 text-white text-center relative">
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
                  <div className="relative z-10">
                    <MessageCircle size={24} className="mx-auto mb-3 opacity-70" />
                    <h3 className="text-[17px] font-semibold mb-1.5">צריכים ליווי מקצועי?</h3>
                    <p className="text-[12px] text-white/65 mb-5 leading-relaxed font-light">הצוות שלנו ילווה אתכם בכל שלב</p>
                    <a href="mailto:info@matefet.co.il" className="flex items-center justify-center gap-2 bg-white text-[#0077C8] px-5 py-2.5 rounded-lg text-[13px] font-semibold no-underline hover:bg-[#f0f7ff] transition-colors w-full">
                      <Mail size={14} />
                      שלחו מייל
                    </a>
                    <a href="tel:+972000000000" className="flex items-center justify-center gap-2 bg-white/10 text-white/90 px-5 py-2.5 rounded-lg text-[13px] font-normal no-underline hover:bg-white/20 transition-colors w-full mt-2">
                      <Phone size={14} />
                      <span dir="ltr">050-000-0000</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ CTA BANNER ═══ */}
      <section className="mx-[3%] mb-12">
        <div className="max-w-[1400px] mx-auto rounded-2xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, #002d4f 0%, #0077C8 100%)" }}>
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-10 sm:px-16 py-14 gap-8">
            <div>
              <span className="text-[11px] font-medium tracking-[2px] text-white/50 uppercase block mb-2">מוכנים להתחיל?</span>
              <h2 className="text-[28px] sm:text-[34px] font-semibold text-white leading-tight mb-2">
                קחו את הניהול לרמה הבאה
              </h2>
              <p className="text-[14px] text-white/55 font-light max-w-[380px] leading-relaxed">
                הצטרפו לעשרות ארגונים שכבר מנהלים חכם יותר עם מעטפת ניהול תקין.
              </p>
            </div>
            <a href="mailto:info@matefet.co.il" className="inline-flex items-center gap-2 bg-white text-[#0077C8] px-8 py-3.5 rounded-xl text-[14px] font-semibold no-underline hover:bg-[#f0f7ff] transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.15)] whitespace-nowrap">
              צרו קשר עכשיו
              <ArrowLeft size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-white border-t border-[#eee] py-8 px-[3%]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-6 border-b border-[#eee]">
            <div className="flex items-center gap-3">
              <img src={`/logo-transparent.webp?v=${v}`} alt="" className="h-9 w-auto" />
              <div className="flex flex-col leading-tight">
                <span className="text-[14px] font-semibold text-[#333]">ניהול תקין</span>
                <span className="text-[11px] text-[#aaa] font-light">מעטפת ניהולית</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-5 justify-center">
              {externalLinks.map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#888] no-underline hover:text-[#0077C8] transition-colors font-light">{link.label}</a>
              ))}
              {sideButtons.map(btn => (
                <button key={btn.id} onClick={() => setActivePanel(btn.id)} className="text-[12px] text-[#888] bg-transparent border-none cursor-pointer hover:text-[#0077C8] font-[inherit] font-light transition-colors">{btn.label}</button>
              ))}
            </div>
            <div className="flex gap-4">
              <a href="mailto:info@matefet.co.il" className="text-[12px] text-[#888] no-underline hover:text-[#0077C8] transition-colors font-light">info@matefet.co.il</a>
              <a href="tel:+972000000000" className="text-[12px] text-[#888] no-underline hover:text-[#0077C8] transition-colors font-light" dir="ltr">050-000-0000</a>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-[11px] text-[#ccc] font-light">&copy; 2025 ניהול תקין. כל הזכויות שמורות.</span>
            <span className="text-[11px] text-[#ccc] font-light">בסיעתא דשמיא</span>
          </div>
        </div>
      </footer>

      {/* ═══ FABs ═══ */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button className="fixed bottom-24 right-6 z-50 w-10 h-10 rounded-full bg-white border border-[#e5e7eb] shadow-md flex items-center justify-center hover:bg-[#f0f7ff] transition-colors cursor-pointer" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <ArrowUp size={16} className="text-[#0077C8]" />
          </motion.button>
        )}
      </AnimatePresence>
      <button onClick={() => setActivePanel("faq")} className="fixed bottom-6 right-6 z-[90] w-13 h-13 rounded-full bg-[#0077C8] text-white shadow-[0_4px_20px_rgba(0,119,200,0.35)] flex items-center justify-center cursor-pointer border-none hover:bg-[#005fa3] transition-all duration-300 w-[52px] h-[52px]">
        <HelpCircle size={22} />
      </button>

      {/* ═══ MODALS ═══ */}
      <TopicModal topic={selectedTopic} onClose={() => setSelectedTopic(null)} />
      <SidePanel activePanel={activePanel} onClose={() => setActivePanel(null)} />
    </div>
  );
}
