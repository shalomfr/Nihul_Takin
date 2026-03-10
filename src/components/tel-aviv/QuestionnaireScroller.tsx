"use client";
import { useState, useRef, useEffect } from "react";
import { questionnaire } from "@/data/questionnaire";
import { AnimatePresence, motion } from "motion/react";
import {
  Landmark,
  ClipboardList,
  Search,
  FileBarChart,
  Coins,
  Scale,
  Users,
  Receipt,
  ScrollText,
  BookOpen,
  Handshake,
  FileText,
  ChevronDown,
  X,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "q1": Landmark, "q2": ClipboardList, "q3": Search, "q4": FileBarChart,
  "q5": Coins, "q6": Scale, "q7": Users, "q8": Receipt,
  "q9": ScrollText, "q10": BookOpen, "q11": Handshake, "q12": FileText,
};

export default function QuestionnaireScroller() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const items = questionnaire;

  // Pause animation when answer is open
  const isAnimationPaused = paused || openId !== null;

  const handleClick = (id: string) => {
    setOpenId(prev => prev === id ? null : id);
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/30 shadow-[0_8px_40px_rgba(0,0,0,0.15)] overflow-hidden h-full flex flex-col" style={{ fontFamily: "'Assistant', 'Inter', sans-serif" }}>
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#e5e7eb] bg-[#0077C8]">
        <h3 className="text-[16px] font-bold text-white m-0">
          בדקו את העמותה שלכם
        </h3>
        <p className="text-[12px] text-white/70 mt-1 m-0">
          לחצו על שאלה לקריאת התשובה
        </p>
      </div>

      {/* Scrolling area */}
      <div
        className="flex-1 overflow-hidden relative bg-[#fafbfc]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-[#fafbfc] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[#fafbfc] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="py-3"
          style={{
            animation: `scrollUp 35s linear infinite`,
            animationPlayState: isAnimationPaused ? "paused" : "running",
          }}
        >
          {[...items, ...items].map((item, idx) => {
            const Icon = iconMap[item.id];
            const uniqueKey = `${item.id}-${idx}`;
            const isOpen = openId === uniqueKey;

            return (
              <div
                key={uniqueKey}
                onClick={() => handleClick(uniqueKey)}
                className={`mx-3 mb-2.5 p-3.5 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                  isOpen
                    ? "bg-[#f0f7ff] border-[#0077C8]/40 shadow-[0_4px_16px_rgba(0,119,200,0.12)]"
                    : "bg-white border-[#e5e7eb] hover:shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:border-[#0077C8]/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-1 self-stretch rounded-full shrink-0 transition-all duration-200"
                    style={{ backgroundColor: isOpen ? "#0077C8" : item.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      {Icon && <Icon size={14} className="text-[#0077C8]" />}
                      <span className="text-[10px] font-bold text-[#0077C8] tracking-wider">
                        {item.category}
                      </span>
                      <div className="mr-auto">
                        <ChevronDown
                          size={14}
                          className={`text-[#0077C8]/50 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                    </div>
                    <p className="text-[13px] text-[#333] leading-relaxed font-medium m-0">
                      {item.question}
                    </p>

                    {/* Answer */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 pt-3 border-t border-[#0077C8]/15">
                            <p className="text-[12px] text-[#555] leading-[1.7] font-normal m-0">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-4 py-3 border-t border-[#e5e7eb] bg-white">
        <a
          href="mailto:info@matefet.co.il"
          className="flex items-center justify-center gap-2 w-full bg-[#0077C8] text-white border-none px-4 py-2.5 rounded-lg text-[13px] font-bold transition-all duration-200 hover:bg-[#005fa3] no-underline cursor-pointer"
        >
          רוצים לדעת את התוצאה? דברו איתנו
        </a>
      </div>
    </div>
  );
}
