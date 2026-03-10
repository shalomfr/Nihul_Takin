"use client";
import { questionnaire } from "@/data/questionnaire";

export default function QuestionnaireScroller() {
  const items = questionnaire;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#1a3a8f]/[0.08] shadow-[0_8px_30px_rgba(15,27,61,0.06)] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#1a3a8f]/[0.08] bg-gradient-to-l from-[#0f1b3d] to-[#1a3a8f]">
        <h3 className="text-[15px] font-bold text-white m-0">
          בדקו את העמותה שלכם
        </h3>
        <p className="text-[11px] text-white/60 mt-1">
          שאלון ניהול תקין מהיר
        </p>
      </div>

      {/* Scrolling area */}
      <div className="h-[420px] md:h-[480px] overflow-hidden relative">
        {/* Fade edges */}
        <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="animate-[scrollUp_35s_linear_infinite] hover:[animation-play-state:paused] py-4">
          {/* Render items twice for seamless loop */}
          {[...items, ...items].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="mx-4 mb-3 p-4 bg-white rounded-xl border border-[#1a3a8f]/[0.06] shadow-[0_2px_8px_rgba(15,27,61,0.04)] transition-all duration-200 hover:shadow-[0_4px_16px_rgba(15,27,61,0.1)] hover:border-[#1a3a8f]/[0.12] cursor-default"
            >
              <div className="flex items-start gap-3">
                {/* Colored accent bar */}
                <div
                  className="w-1 self-stretch rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1 min-w-0">
                  {/* Category */}
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-sm">{item.icon}</span>
                    <span
                      className="text-[10px] font-bold tracking-wider"
                      style={{ color: item.color }}
                    >
                      {item.category}
                    </span>
                  </div>
                  {/* Question */}
                  <p className="text-[13px] text-[#0f1b3d] leading-relaxed font-medium m-0">
                    {item.question}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-5 py-4 border-t border-[#1a3a8f]/[0.08] bg-[#f5f7ff]">
        <a
          href="mailto:info@matefet.co.il"
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-l from-[#0f1b3d] to-[#1a3a8f] text-white border-none px-4 py-2.5 rounded-lg text-[12px] font-bold shadow-[0_4px_15px_rgba(26,58,143,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(26,58,143,0.35)] no-underline cursor-pointer"
        >
          רוצים לדעת את התוצאה? דברו איתנו
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </a>
      </div>
    </div>
  );
}
