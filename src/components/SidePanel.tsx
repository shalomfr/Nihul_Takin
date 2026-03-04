"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { dictionary } from "@/data/dictionary";
import { faq } from "@/data/faq";
import { articles } from "@/data/articles";

type PanelType = "dictionary" | "faq" | "articles" | null;

interface Props {
  activePanel: PanelType;
  onClose: () => void;
}

export default function SidePanel({ activePanel, onClose }: Props) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const titles: Record<string, string> = {
    dictionary: "א' ב' בניהול תקין",
    faq: "יש לי שאלה",
    articles: "יש לי מושג",
  };

  // ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (activePanel) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setSearchTerm("");
      setOpenFaqIndex(null);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activePanel, handleKeyDown]);

  // Filter dictionary by search
  const filteredDictionary = dictionary.filter(
    (entry) =>
      !searchTerm ||
      entry.term.includes(searchTerm) ||
      entry.definition.includes(searchTerm)
  );

  return (
    <AnimatePresence>
      {activePanel && (
        <motion.div
          className="fixed inset-0 z-[150] flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel — slides from RIGHT (RTL) */}
          <motion.div
            className="relative bg-white w-full max-w-2xl ml-auto h-full shadow-2xl overflow-hidden flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {/* Header */}
            <div className="px-6 py-5 flex items-center justify-between shrink-0 border-b border-[#eee]">
              <h2
                className="text-xl font-bold text-[#1a1a2e]"
                style={{ fontFamily: "'Secular One', sans-serif" }}
              >
                {titles[activePanel]}
              </h2>
              <button
                onClick={onClose}
                className="text-[#b0b0b0] hover:text-[#1a1a2e] transition-colors text-2xl leading-none p-2 hover:bg-[#f5f5f5] rounded-full"
              >
                &times;
              </button>
            </div>

            {/* Search bar for dictionary */}
            {activePanel === "dictionary" && (
              <div className="px-6 pt-4 pb-2 shrink-0">
                <input
                  type="text"
                  placeholder="חיפוש מונח..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e0e0e0] bg-[#fafafa] text-sm focus:outline-none focus:border-[#1e3a5f] focus:ring-1 focus:ring-[#1e3a5f] transition-colors"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {activePanel === "dictionary" && (
                <div className="space-y-3">
                  {filteredDictionary.map((entry, i) => (
                    <motion.div
                      key={i}
                      className="border border-[#e2e8f0] rounded-xl p-4 hover:border-[#cbd5e1] hover:shadow-sm transition-all"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.3 }}
                    >
                      <h3 className="font-bold text-[#1e293b] mb-1.5 text-sm">
                        {entry.term}
                      </h3>
                      <p className="text-sm text-[#64748b] leading-relaxed">
                        {entry.definition}
                      </p>
                    </motion.div>
                  ))}
                  {filteredDictionary.length === 0 && (
                    <p className="text-center text-[#94a3b8] py-8">
                      לא נמצאו תוצאות
                    </p>
                  )}
                </div>
              )}

              {activePanel === "faq" && (
                <div className="space-y-2">
                  {faq.map((item, i) => (
                    <motion.div
                      key={i}
                      className="border border-[#e2e8f0] rounded-xl overflow-hidden hover:border-[#cbd5e1] transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.3 }}
                    >
                      <button
                        className="w-full text-right px-5 py-4 flex items-center justify-between gap-3 hover:bg-[#f8fafc] transition-colors"
                        onClick={() =>
                          setOpenFaqIndex(openFaqIndex === i ? null : i)
                        }
                      >
                        <span className="font-medium text-[#1e293b] text-sm sm:text-base">
                          {item.question}
                        </span>
                        <motion.span
                          className="text-[#94a3b8] shrink-0 text-xs"
                          animate={{ rotate: openFaqIndex === i ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          &#9660;
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {openFaqIndex === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-4 text-sm text-[#64748b] leading-relaxed border-t border-[#f1f5f9] pt-3 mx-3">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              )}

              {activePanel === "articles" && (
                <div className="space-y-6">
                  {articles.map((article, i) => (
                    <motion.div
                      key={article.id}
                      className="border border-[#e2e8f0] rounded-2xl p-5 hover:border-[#cbd5e1] hover:shadow-md transition-all"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                    >
                      <h3
                        className="text-lg font-bold text-[#1e293b] mb-3"
                        style={{ fontFamily: "'Secular One', sans-serif" }}
                      >
                        {article.title}
                      </h3>
                      <div className="space-y-3">
                        {article.content.map((p, j) => (
                          <p
                            key={j}
                            className="text-sm text-[#64748b] leading-[1.8]"
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export type { PanelType };
