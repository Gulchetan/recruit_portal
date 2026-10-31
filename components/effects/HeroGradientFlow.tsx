"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion-prefs";

gsap.registerPlugin(useGSAP);

export function HeroGradientFlow() {
  const rootRef = useRef<HTMLDivElement>(null);
  const blobA = useRef<HTMLDivElement>(null);
  const blobB = useRef<HTMLDivElement>(null);
  const blobC = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });
      tl.to(
        blobA.current,
        { x: 120, y: 40, scale: 1.15, duration: 9 },
        0
      ).to(
        blobB.current,
        { x: -100, y: -30, scale: 1.1, duration: 11 },
        0
      ).to(
        blobC.current,
        { x: 60, y: 80, scale: 1.2, duration: 10 },
        0
      );
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        ref={blobA}
        className="absolute -left-20 top-0 h-[420px] w-[420px] rounded-full bg-cyan-400/30 blur-[80px] will-change-transform"
      />
      <div
        ref={blobB}
        className="absolute right-0 top-1/4 h-[380px] w-[380px] rounded-full bg-indigo-500/35 blur-[90px] will-change-transform"
      />
      <div
        ref={blobC}
        className="absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-brand/40 blur-[70px] will-change-transform"
      />
      <div className="tb-hero-pattern absolute inset-0 opacity-60" />
    </div>
  );
}
