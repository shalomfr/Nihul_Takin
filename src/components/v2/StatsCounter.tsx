"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface Stat {
  number: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { number: 40, suffix: "K+", label: "עמותות רשומות בישראל" },
  { number: 10, suffix: "+", label: "חוקים ותקנות בתחום" },
  { number: 8, suffix: "", label: "תחומי ניהול תקין" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1800;
    const startTime = Date.now();

    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="bg-white py-14 px-[5%] border-t border-b border-[#1a3a8f]/[0.06]">
      <div className="max-w-[1200px] mx-auto flex justify-around items-center">
        {stats.map((stat, i) => (
          <Fragment key={stat.label}>
            {i > 0 && (
              <div className="w-px h-[60px] bg-gradient-to-b from-transparent via-[#1a3a8f]/15 to-transparent hidden sm:block" />
            )}
            <motion.div
              className="text-center px-4 sm:px-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <div
                className="text-4xl sm:text-[48px] md:text-[54px] font-black leading-none bg-gradient-to-l from-[#0f1b3d] to-[#1a3a8f] bg-clip-text text-transparent"
              >
                <AnimatedNumber value={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-[13px] text-[#6b7280] mt-2">
                {stat.label}
              </div>
            </motion.div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
