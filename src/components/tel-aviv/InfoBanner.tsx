"use client";

export default function InfoBanner() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("he-IL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-gradient-to-l from-[#0f1b3d] to-[#1a3a8f] text-white">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-[5%] py-2.5 text-[11px]">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {dateStr}
          </span>
          <span className="hidden sm:flex items-center gap-1.5 text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2ed573] animate-[badgeBlink_2s_infinite]" />
            מערכת פעילה
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-white/60">
            +20 ארגונים מנוהלים
          </span>
          <span className="text-[#c9a84c] font-bold">
            ייעוץ ראשוני חינם
          </span>
        </div>
      </div>
    </div>
  );
}
