"use client";
import { motion } from "motion/react";
import { services } from "@/data/tel-aviv-services";
import TiltCard from "@/components/v2/TiltCardV2";

export default function ServiceCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service, i) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
        >
          <TiltCard className="group h-full">
            <div className="relative bg-white rounded-2xl p-5 border border-[#1a3a8f]/[0.07] overflow-hidden transition-all duration-300 group-hover:shadow-[0_12px_35px_rgba(15,27,61,0.1)] group-hover:border-[#1a3a8f]/[0.12] h-full">
              {/* Accent line */}
              <div
                className="absolute top-0 inset-x-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"
                style={{ background: `linear-gradient(90deg, ${service.color}, #4a7aff)` }}
              />

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3.5 transition-colors duration-300"
                style={{ backgroundColor: `${service.color}12` }}
              >
                <span className="text-xl">{service.icon}</span>
              </div>

              <h3
                className="text-[14px] font-bold text-[#0f1b3d] mb-1.5"
                style={{ fontFamily: "'Secular One', sans-serif" }}
              >
                {service.title}
              </h3>
              <p className="text-[12px] text-[#6b7280] leading-relaxed m-0">
                {service.description}
              </p>
            </div>
          </TiltCard>
        </motion.div>
      ))}
    </div>
  );
}
