"use client";
import { motion } from "motion/react";
import { useState, useEffect, useCallback } from "react";

/* ────────────────────────────────────────────
   Animation phases:
   0  — initial (bg + open folder visible on desk)
   1  — documents flutter-fall onto desk
   2  — pause (documents scattered on desk)
   3  — documents slide into folder one by one
   4  — folder closes + text appears
   5  — fade out → reveal ServicesContent
──────────────────────────────────────────── */

/* ── Document data ── */
interface DocDef {
  title: string;
  sub: string;
  accent: string;
  /* Flutter physics per document */
  startX: number;
  startR: number;
  deskX: number;
  deskY: number;
  deskR: number;
  flutterX: number[];
  flutterR: number[];
}

const DOCS: DocDef[] = [
  {
    title: "דו״ח כספי שנתי", sub: "2025", accent: "#2563eb",
    startX: -180, startR: -35,
    deskX: -90, deskY: -35, deskR: -6,
    flutterX: [-180, -140, -200, -120, -160, -100, -95, -90],
    flutterR: [-35, 18, -22, 15, -10, 6, -8, -6],
  },
  {
    title: "פרוטוקול ועד מנהל", sub: "ישיבה #24", accent: "#7c3aed",
    startX: 140, startR: 25,
    deskX: 75, deskY: -20, deskR: 8,
    flutterX: [140, 100, 150, 80, 120, 90, 78, 75],
    flutterR: [25, -15, 20, -12, 14, -5, 10, 8],
  },
  {
    title: "אישור ניהול תקין", sub: "רשם העמותות", accent: "#16a34a",
    startX: -280, startR: -20,
    deskX: -55, deskY: 30, deskR: -12,
    flutterX: [-280, -220, -300, -180, -240, -100, -60, -55],
    flutterR: [-20, 25, -30, 20, -15, 8, -14, -12],
  },
  {
    title: "אישור סעיף 46", sub: "רשות המסים", accent: "#d97706",
    startX: 220, startR: 40,
    deskX: 100, deskY: 25, deskR: 5,
    flutterX: [220, 170, 240, 150, 190, 120, 105, 100],
    flutterR: [40, -18, 28, -14, 20, -6, 8, 5],
  },
  {
    title: "דו״ח מילולי שנתי", sub: "פעילות ומוטבים", accent: "#e11d48",
    startX: -100, startR: -45,
    deskX: -20, deskY: -45, deskR: -3,
    flutterX: [-100, -70, -120, -50, -80, -40, -25, -20],
    flutterR: [-45, 12, -18, 10, -8, 4, -5, -3],
  },
  {
    title: "ביטוח נושאי משרה", sub: "פוליסה פעילה", accent: "#0891b2",
    startX: 180, startR: 30,
    deskX: 40, deskY: 40, deskR: 10,
    flutterX: [180, 130, 190, 110, 150, 70, 45, 40],
    flutterR: [30, -16, 24, -10, 18, -4, 12, 10],
  },
];

/* ── Keyframe timing (8 points for flutter) ── */
const FLUTTER_TIMES = [0, 0.12, 0.28, 0.42, 0.56, 0.72, 0.88, 1];

/* ── Y keyframes: start high, air-drag deceleration, soft landing ── */
function buildYKeyframes(deskY: number, index: number): number[] {
  const startY = -600 - index * 60;
  const range = deskY - startY;
  // Non-linear distribution: faster at start (gravity), slower at end (air drag)
  return [
    startY,
    startY + range * 0.15,
    startY + range * 0.35,
    startY + range * 0.52,
    startY + range * 0.68,
    startY + range * 0.82,
    deskY - 4,   // slight overshoot
    deskY,        // settle
  ];
}

/* ── Shadow keyframes: diffuse high → sharp on desk ── */
const SHADOW_FALL = [
  "drop-shadow(0 35px 45px rgba(0,0,0,0.08))",
  "drop-shadow(0 28px 35px rgba(0,0,0,0.10))",
  "drop-shadow(0 20px 25px rgba(0,0,0,0.12))",
  "drop-shadow(0 14px 18px rgba(0,0,0,0.15))",
  "drop-shadow(0 10px 12px rgba(0,0,0,0.18))",
  "drop-shadow(0 6px 8px rgba(0,0,0,0.22))",
  "drop-shadow(0 3px 5px rgba(0,0,0,0.25))",
  "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
];

/* ── Single Paper Sheet ── */
function Paper({ doc, index, phase }: { doc: DocDef; index: number; phase: number }) {
  const isAbsorbed = phase >= 3;

  const folderX = 10;
  const folderY = 10;

  return (
    <motion.div
      className="absolute"
      style={{
        right: "30%",
        top: "45%",
        marginRight: "-42px",
        marginTop: "-55px",
        zIndex: isAbsorbed ? 4 : 10 + index,
      }}
      initial={{
        x: doc.startX,
        y: -600 - index * 60,
        rotate: doc.startR,
        opacity: 0,
        scale: 1,
      }}
      animate={
        isAbsorbed
          ? {
              x: folderX,
              y: [doc.deskY, doc.deskY - 18, folderY],
              rotate: [doc.deskR, doc.deskR * 0.3, 0],
              opacity: [1, 1, 0],
              scale: 1,
            }
          : phase >= 1
            ? {
                x: doc.flutterX,
                y: buildYKeyframes(doc.deskY, index),
                rotate: doc.flutterR,
                opacity: 1,
                filter: SHADOW_FALL,
              }
            : {
                x: doc.startX,
                y: -600 - index * 60,
                rotate: doc.startR,
                opacity: 0,
              }
      }
      transition={
        isAbsorbed
          ? {
              duration: 0.7,
              ease: [0.4, 0, 0.2, 1],
              delay: index * 0.2,
              opacity: { duration: 0.15, delay: index * 0.2 + 0.55 },
              y: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: index * 0.2 },
            }
          : {
              duration: 2.2,
              ease: [0.15, 0, 0.1, 1],
              delay: index * 0.35 + 0.15,
              x: { duration: 2.2, ease: "easeInOut", times: FLUTTER_TIMES, delay: index * 0.35 + 0.15 },
              y: { duration: 2.2, ease: [0.15, 0, 0.1, 1], times: FLUTTER_TIMES, delay: index * 0.35 + 0.15 },
              rotate: { duration: 2.2, ease: "easeInOut", times: FLUTTER_TIMES, delay: index * 0.35 + 0.15 },
              filter: { duration: 2.2, times: FLUTTER_TIMES, delay: index * 0.35 + 0.15 },
              opacity: { duration: 0.3, delay: index * 0.35 + 0.15 },
            }
      }
    >
      <div
        className="w-[80px] sm:w-[90px] md:w-[110px] bg-white rounded shadow-lg"
        style={{ aspectRatio: "210 / 297" }}
      >
        {/* Color bar */}
        <div className="h-[3px] sm:h-1 md:h-1.5 rounded-t" style={{ background: doc.accent }} />

        <div className="p-1.5 sm:p-2 md:p-2.5">
          <div className="text-[6px] sm:text-[7px] md:text-[9px] font-bold text-[#1e293b] text-right leading-tight">
            {doc.title}
          </div>
          <div className="text-[5px] sm:text-[6px] md:text-[7px] text-[#94a3b8] text-right mt-0.5">
            {doc.sub}
          </div>

          {/* Fake text lines */}
          <div className="mt-1 sm:mt-1.5 md:mt-2 space-y-[2px] md:space-y-[3px]">
            <div className="h-[2px] md:h-[3px] bg-[#f1f5f9] rounded-full w-[92%]" />
            <div className="h-[2px] md:h-[3px] bg-[#f1f5f9] rounded-full w-[72%]" />
            <div className="h-[2px] md:h-[3px] bg-[#f1f5f9] rounded-full w-[85%]" />
            <div className="h-[2px] md:h-[3px] bg-[#f1f5f9] rounded-full w-[60%]" />
            <div className="h-[2px] md:h-[3px] bg-[#f1f5f9] rounded-full w-[78%]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Folder / Binder — always on desk from start ── */
function Folder({ phase }: { phase: number }) {
  const isClosed = phase >= 4;

  return (
    <motion.div
      className="absolute"
      style={{
        right: "30%",
        top: "45%",
        marginRight: "-55px",
        marginTop: "-65px",
        zIndex: 5,
        perspective: "400px",
      }}
      initial={{ opacity: 1, scale: 1 }}
    >
      <div className="relative" style={{ transformStyle: "preserve-3d" }}>
        {/* Back cover (body) */}
        <div
          className="w-[100px] sm:w-[115px] md:w-[140px] rounded-md sm:rounded-lg overflow-hidden relative"
          style={{
            aspectRatio: "210 / 297",
            background: "linear-gradient(160deg, #d4a96a 0%, #c49454 50%, #b8894e 100%)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          {/* Tab */}
          <div
            className="absolute -top-2 sm:-top-2.5 md:-top-3 right-2 sm:right-3 w-10 sm:w-12 md:w-14 h-2 sm:h-2.5 md:h-3 rounded-t-md"
            style={{ background: "linear-gradient(180deg, #c9a05c, #b8914d)" }}
          />

          <div className="flex flex-col items-center justify-center h-full px-2">
            {/* Folder icon */}
            <motion.div
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-1.5 md:mb-2"
              style={{ background: "rgba(255,255,255,0.2)" }}
              animate={isClosed ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </motion.div>

            <div className="text-[8px] sm:text-[9px] md:text-[11px] font-bold text-white text-center leading-tight">
              מעטפת
            </div>
            <div className="text-[6px] sm:text-[7px] md:text-[8px] text-white/60 text-center mt-0.5">
              {isClosed ? "6 מסמכים" : "הכניסו מסמכים"}
            </div>

            <div className="w-6 sm:w-8 md:w-10 h-[1px] bg-white/20 mt-2 md:mt-3 rounded-full" />
          </div>

          {/* Badge when closed */}
          {isClosed && (
            <motion.div
              className="absolute -top-1 -left-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#2563eb] flex items-center justify-center shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
            >
              <span className="text-[8px] sm:text-[9px] font-bold text-white">6</span>
            </motion.div>
          )}
        </div>

        {/* Front cover — closes with rotateX perspective */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 origin-bottom"
          style={{ transformStyle: "preserve-3d" }}
          initial={{ rotateX: 75 }}
          animate={{ rotateX: isClosed ? 0 : 75 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            className="w-[100px] sm:w-[115px] md:w-[140px] rounded-md sm:rounded-lg"
            style={{
              aspectRatio: "210 / 297",
              background: "linear-gradient(160deg, #e0bb82 0%, #d4a96a 50%, #c49b5e 100%)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
            }}
          >
            <div className="flex items-center justify-center h-full">
              <div className="text-[8px] sm:text-[9px] md:text-[11px] font-bold text-white/50">
                מעטפת
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── Main Export ── */
interface Props {
  onComplete?: () => void;
}

export default function DocumentsAnimation({ onComplete }: Props) {
  const [phase, setPhase] = useState(0);
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleComplete = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),         // Documents start fluttering down
      setTimeout(() => setPhase(2), 3500),         // Pause — scattered on desk
      setTimeout(() => setPhase(3), 4000),         // Documents slide into folder
      setTimeout(() => setPhase(4), 5500),         // Folder closes + text
      setTimeout(() => {                           // Start fading out
        setFading(true);
        handleComplete();
      }, 7000),
      setTimeout(() => setHidden(true), 9500),     // Remove from DOM
    ];
    return () => timers.forEach(clearTimeout);
  }, [handleComplete]);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] transition-opacity duration-[2500ms] ease-in-out"
      style={{ opacity: fading ? 0 : 1 }}
    >
      {/* ── Background image with subtle zoom ── */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <img
          src="/office-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-black/20" />
      <div className="absolute inset-0 bg-black/5" />

      {/* ── Folder (on desk from start) + Documents ── */}
      <div className="absolute inset-0">
        <Folder phase={phase} />
        {DOCS.map((doc, i) => (
          <Paper key={i} doc={doc} index={i} phase={phase} />
        ))}
      </div>

      {/* ── Bottom text (appears when folder closes) ── */}
      <motion.div
        className="absolute inset-x-0 bottom-10 sm:bottom-14 md:bottom-20 text-center z-30 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={phase >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <p
          className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white"
          style={{ textShadow: "0 3px 25px rgba(0,0,0,0.6)" }}
        >
          כל המסמכים. קלסר אחד.
        </p>
        <p
          className="text-sm sm:text-base md:text-lg text-white/70 mt-2"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
        >
          מעטפת — ניהול תקין לעמותות
        </p>
      </motion.div>

      {/* ── Skip button ── */}
      <motion.button
        className="absolute top-5 left-5 z-40 text-white/40 hover:text-white/80 text-xs sm:text-sm transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => {
          setFading(true);
          handleComplete();
          setTimeout(() => setHidden(true), 2500);
        }}
      >
        דלג &larr;
      </motion.button>
    </div>
  );
}
