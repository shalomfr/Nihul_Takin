"use client";
import { questionnaire } from "@/data/questionnaire";
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
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "q1": Landmark,
  "q2": ClipboardList,
  "q3": Search,
  "q4": FileBarChart,
  "q5": Coins,
  "q6": Scale,
  "q7": Users,
  "q8": Receipt,
  "q9": ScrollText,
  "q10": BookOpen,
  "q11": Handshake,
  "q12": FileText,
};

export default function QuestionnaireScroller() {
  const items = questionnaire;

  return (
    <div className="bg-white rounded-lg border border-[#e5e7eb] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#e5e7eb] bg-[#0077C8]">
        <h3 className="text-[16px] font-bold text-white m-0">
          בדקו את העמותה שלכם
        </h3>
        <p className="text-[12px] text-white/70 mt-1 m-0">
          שאלון ניהול תקין מהיר
        </p>
      </div>

      {/* Scrolling area */}
      <div className="h-[420px] lg:h-[520px] overflow-hidden relative bg-[#fafbfc]">
        <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-[#fafbfc] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-[#fafbfc] to-transparent z-10 pointer-events-none" />

        <div className="animate-[scrollUp_35s_linear_infinite] hover:[animation-play-state:paused] py-3">
          {[...items, ...items].map((item, idx) => {
            const Icon = iconMap[item.id];
            return (
              <div
                key={`${item.id}-${idx}`}
                className="mx-3 mb-2.5 p-3.5 bg-white rounded-lg border border-[#e5e7eb] transition-all duration-200 hover:shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:border-[#0077C8]/30 cursor-default"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-1 self-stretch rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      {Icon && <Icon size={14} className="text-[#0077C8]" />}
                      <span className="text-[10px] font-bold text-[#0077C8] tracking-wider">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#333] leading-relaxed font-medium m-0">
                      {item.question}
                    </p>
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
