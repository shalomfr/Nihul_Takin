"use client";

const updates = [
  { date: "10.3.26", text: "עדכון: חובת הגשת דוחות שנתיים עד סוף מרץ" },
  { date: "8.3.26", text: "שינוי בתקנות גמול חברי ועד מנהל" },
  { date: "5.3.26", text: "הנחיות חדשות מרשם העמותות לשנת 2026" },
  { date: "3.3.26", text: "עדכון: דרישות חדשות לאישור סעיף 46" },
];

export default function InfoBanner() {
  return (
    <div className="bg-[#0077C8] text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex items-center px-[3%] py-2 text-[13px]">
        {/* Label */}
        <div className="flex items-center gap-2 shrink-0 pl-6 border-l border-white/20 ml-4">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <span className="font-bold whitespace-nowrap">עדכונים</span>
        </div>

        {/* Scrolling ticker */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-8 animate-[tickerScroll_30s_linear_infinite] whitespace-nowrap">
            {[...updates, ...updates].map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-2">
                <span className="text-white/60">{item.date}</span>
                <span className="text-white/30">|</span>
                <span>{item.text}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Pause button */}
        <button className="shrink-0 mr-4 text-white/60 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        </button>
      </div>
    </div>
  );
}
