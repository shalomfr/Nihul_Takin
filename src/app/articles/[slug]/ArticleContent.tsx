"use client";
import type { Article } from "@/data/articles";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import Link from "next/link";

const v = process.env.NEXT_PUBLIC_BUILD_ID || "";

export default function ArticleContent({ article }: { article: Article | null }) {
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]" style={{ fontFamily: "'Assistant', sans-serif" }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#1a1a2e] mb-4">הכתבה לא נמצאה</h1>
          <Link href="/tel-aviv" className="text-[#0077C8] hover:underline inline-flex items-center gap-2">
            חזרה לדף הראשי
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]" style={{ fontFamily: "'Assistant', sans-serif" }}>
      {/* Header bar */}
      <header className="bg-white border-b border-[#eee] px-[3%] py-4">
        <div className="max-w-[900px] mx-auto flex items-center justify-between">
          <Link href="/tel-aviv" className="inline-flex items-center gap-2 text-[#0077C8] hover:text-[#005fa3] transition-colors no-underline text-[14px] font-medium">
            <ArrowRight size={16} />
            חזרה לדף הראשי
          </Link>
          <Link href="/tel-aviv">
            <img src={`/logo-transparent.webp?v=${v}`} alt="ניהול תקין" className="h-10 w-auto" />
          </Link>
        </div>
      </header>

      {/* Article content */}
      <main className="max-w-[900px] mx-auto px-[3%] py-12">
        <article className="bg-white rounded-2xl border border-[#eee] shadow-sm p-8 md:p-12">
          {/* Tag & Date */}
          <div className="flex items-center gap-4 mb-6">
            {article.tag && (
              <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0077C8] bg-[#0077C8]/8 px-3 py-1 rounded-full">
                <Tag size={12} />
                {article.tag}
              </span>
            )}
            {article.date && (
              <span className="inline-flex items-center gap-1.5 text-[12px] text-[#999]">
                <Calendar size={12} />
                {article.date}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-[28px] md:text-[36px] font-bold text-[#1a1a2e] leading-snug mb-4" style={{ fontFamily: "'Rubik', 'Assistant', sans-serif" }}>
            {article.title}
          </h1>

          {/* Summary */}
          {article.summary && (
            <p className="text-[16px] text-[#666] leading-relaxed mb-8 pb-8 border-b border-[#eee] font-medium">
              {article.summary}
            </p>
          )}

          {/* Content paragraphs */}
          <div className="space-y-5">
            {article.content.map((paragraph, i) => (
              <p key={i} className="text-[15px] md:text-[16px] text-[#444] leading-[1.9]">
                {paragraph}
              </p>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 pt-8 border-t border-[#eee] bg-[#f8fbff] -mx-8 md:-mx-12 -mb-8 md:-mb-12 px-8 md:px-12 pb-8 md:pb-12 rounded-b-2xl">
            <h3 className="text-[18px] font-bold text-[#1a1a2e] mb-2">צריכים עזרה?</h3>
            <p className="text-[14px] text-[#666] mb-4">מעטפת ניהולית מלווה עמותות וארגונים בכל נושאי הניהול התקין.</p>
            <a href="mailto:info@matefet.co.il" className="inline-flex items-center gap-2 bg-[#0077C8] text-white px-6 py-2.5 rounded-lg text-[14px] font-semibold no-underline hover:bg-[#005fa3] transition-colors">
              צרו קשר
            </a>
          </div>
        </article>
      </main>
    </div>
  );
}
