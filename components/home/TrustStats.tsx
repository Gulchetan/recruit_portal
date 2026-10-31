"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PageBand } from "@/components/ui/Container";
import { prefersReducedMotion } from "@/lib/motion-prefs";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats = [
  { value: 18, suffix: "+", label: "Live roles this week" },
  { value: 6, suffix: "", label: "Metro talent hubs" },
  { value: 48, suffix: "h", label: "Average shortlist time" },
  { value: 100, suffix: "%", label: "Zero candidate fees" },
];

export function TrustStats() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const nums = root.current?.querySelectorAll<HTMLElement>("[data-count]");
      nums?.forEach((el) => {
        const end = Number(el.dataset.count);
        const obj = { n: 0 };
        gsap.to(obj, {
          n: end,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.n));
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <PageBand className="border-y border-white/10 bg-ink text-white">
      <div ref={root} className="grid grid-cols-2 gap-8 py-10 lg:grid-cols-4 lg:py-12">
        {stats.map((s) => (
          <div key={s.label} className="text-center lg:text-left">
            <p className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              <span data-count={s.value}>{s.value}</span>
              <span className="text-gold">{s.suffix}</span>
            </p>
            <p className="mt-2 text-sm text-white/70">{s.label}</p>
          </div>
        ))}
      </div>
    </PageBand>
  );
}
