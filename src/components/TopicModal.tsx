"use client";
import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Topic } from "@/data/topics";

interface Props {
  topic: Topic | null;
  onClose: () => void;
}

export default function TopicModal({ topic, onClose }: Props) {
  // ESC key to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (topic) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [topic, handleKeyDown]);

  return (
    <AnimatePresence>
      {topic && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal — drag to dismiss on mobile */}
          <motion.div
            className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden"
            initial={{ scale: 0.85, y: 40, opacity: 0, filter: "blur(4px)" }}
            animate={{ scale: 1, y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 0.85, y: 40, opacity: 0, filter: "blur(4px)" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.3}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onClose();
            }}
          >
            {/* Drag handle (mobile) */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>

            {/* Header */}
            <div className="px-6 py-6 flex items-center justify-between border-b border-[#eee]">
              <div className="flex items-center gap-3">
                <motion.span
                  className="text-3xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.15,
                  }}
                >
                  {topic.icon}
                </motion.span>
                <h2
                  className="text-xl sm:text-2xl font-bold text-[#1a1a2e]"
                  style={{ fontFamily: "'Secular One', sans-serif" }}
                >
                  {topic.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-[#b0b0b0] hover:text-[#1a1a2e] transition-colors text-2xl leading-none p-2 hover:bg-[#f5f5f5] rounded-full"
              >
                &times;
              </button>
            </div>

            {/* Content with stagger */}
            <div className="px-6 py-6 overflow-y-auto max-h-[calc(85vh-120px)]">
              <div className="space-y-4">
                {topic.content.map((paragraph, i) => (
                  <motion.p
                    key={i}
                    className="text-[#334155] text-sm sm:text-base leading-[1.9]"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.2 + i * 0.06,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
