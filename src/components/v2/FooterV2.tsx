const v = process.env.NEXT_PUBLIC_BUILD_ID || "";

export default function FooterV2() {
  return (
    <footer className="py-8 sm:py-12 border-t border-[#e2e8f0]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo */}
          <a href="#">
            <img
              src={`/logo-transparent.webp?v=${v}`}
              alt="מעטפת ניהולית"
              className="h-12 sm:h-14 w-auto"
            />
          </a>

          {/* Contact info */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-xs sm:text-sm text-[#64748b]">
            <a
              href="mailto:info@matefet.co.il"
              className="hover:text-[#1e3a5f] transition-colors"
            >
              info@matefet.co.il
            </a>
            <a
              href="tel:+972000000000"
              className="hover:text-[#1e3a5f] transition-colors"
              dir="ltr"
            >
              050-000-0000
            </a>
          </div>

          {/* BSH */}
          <div className="text-xs text-[#c0c8d4]">בסיעתא דשמיא</div>
        </div>
      </div>
    </footer>
  );
}
