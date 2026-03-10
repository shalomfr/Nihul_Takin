"use client";
import { services } from "@/data/tel-aviv-services";
import {
  Building2,
  ShieldCheck,
  FileBarChart,
  Receipt,
  ClipboardList,
  Scale,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "building-2": Building2,
  "shield-check": ShieldCheck,
  "file-bar-chart": FileBarChart,
  "receipt": Receipt,
  "clipboard-list": ClipboardList,
  "scale": Scale,
};

export default function ServiceCards() {
  return (
    <div className="bg-white border-t border-b border-[#e5e7eb]">
      <div className="max-w-[1400px] mx-auto px-[3%] py-8">
        <div className="flex items-center gap-8">
          {/* Title */}
          <div className="shrink-0 text-right pl-8 border-l border-[#e5e7eb]">
            <h2 className="text-[22px] font-bold text-[#0077C8] leading-tight m-0">
              שירותים
            </h2>
            <h2 className="text-[22px] font-bold text-[#0077C8] leading-tight m-0">
              נפוצים
            </h2>
          </div>

          {/* Service icons row */}
          <div className="flex-1 flex items-center justify-around">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon];
              return (
                <div key={service.id} className="flex items-center">
                  <button className="flex flex-col items-center gap-2.5 bg-transparent border-none cursor-pointer group px-3 py-2 rounded-lg hover:bg-[#f0f7ff] transition-colors">
                    <div className="w-14 h-14 rounded-full bg-[#f0f7ff] flex items-center justify-center group-hover:bg-[#e0efff] transition-colors">
                      {Icon && <Icon size={26} className="text-[#0077C8]" />}
                    </div>
                    <span className="text-[12px] font-medium text-[#333] group-hover:text-[#0077C8] transition-colors text-center leading-tight max-w-[80px]">
                      {service.title}
                    </span>
                  </button>
                  {i < services.length - 1 && (
                    <div className="w-px h-12 bg-[#e5e7eb] mx-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
