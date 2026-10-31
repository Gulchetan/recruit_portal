"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  FileUser,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { CityMarquee } from "@/components/home/CityMarquee";
import { FeaturedJobs } from "@/components/home/FeaturedJobs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustStats } from "@/components/home/TrustStats";
import { HeroGradientFlow } from "@/components/effects/HeroGradientFlow";
import { HomeCategories } from "@/components/home/HomeCategories";
import { JobSearchBar } from "@/components/jobs/JobSearchBar";
import { PageBand } from "@/components/ui/Container";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { prefersReducedMotion } from "@/lib/motion-prefs";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const solutions = [
  {
    title: "Operational talent",
    desc: "Engineering, manufacturing, supply chain and logistics specialists nationwide.",
    href: "/jobs?category=engineering",
    icon: Building2,
  },
  {
    title: "Professional talent",
    desc: "Finance, HR, healthcare, legal, sales and ITES/GCC professionals.",
    href: "/for-talent",
    icon: Users,
  },
  {
    title: "Enterprise programs",
    desc: "Advisory, acquisition, development and workforce transition at scale.",
    href: "/for-employers",
    icon: Sparkles,
  },
  {
    title: "Digital & tech",
    desc: "Cloud, data, product and engineering talent for digital transformation.",
    href: "/jobs?category=it",
    icon: FileUser,
  },
];

const seekerActions = [
  { label: "Submit your resume", href: "/register?role=seeker", desc: "Join our talent network" },
  { label: "Browse open roles", href: "/jobs", desc: "Live list, instant filters" },
  { label: "Trending opportunities", href: "/jobs?q=developer", desc: "High-demand skills" },
  { label: "Hire with us", href: "/for-employers#vacancy", desc: "Submit a vacancy in 60s" },
];

const heroEase = [0.22, 1, 0.36, 1] as const;

export function HomePageView() {
  const pageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const sections = gsap.utils.toArray<HTMLElement>("[data-animate='section']");
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 36,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef}>
      <section className="relative w-full overflow-hidden bg-ink text-white">
        <HeroGradientFlow />
        <PageBand innerClassName="relative py-12 sm:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: heroEase }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                  Specialist recruitment · India
                </p>
                <h1 className="mt-4 font-serif text-4xl leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                  The job search that treats you like a professional.
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                  Curated roles. Honest apply flow. Human consultants. No candidate fees —
                  ever. Built for people who are done with noisy job boards.
                </p>
              </motion.div>
              <motion.div
                className="mt-8"
                initial={reduceMotion ? false : { opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.12, ease: heroEase }}
              >
                <JobSearchBar variant="hero" />
              </motion.div>
              <motion.p
                className="mt-6 inline-flex items-center gap-2 text-sm text-white/70"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                Transparent process · tracked applications · specialist matching
              </motion.p>
            </div>
            <motion.aside
              className="hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md lg:block"
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: heroEase }}
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Live featured
                </p>
                <Link href="/jobs" className="text-sm font-semibold text-white/80 hover:text-gold">
                  All roles →
                </Link>
              </div>
              <FeaturedJobs compact />
            </motion.aside>
          </div>
        </PageBand>
      </section>

      <TrustStats />
      <CityMarquee />

     
      <PageBand className="py-16 sm:py-20" data-animate="section">
        <Reveal>
          <SectionHeading
            eyebrow="Start here"
            title="Four doors. One destination."
            description="Whether you are looking, hiring, or referring — pick a path and we keep the rest simple."
          />
        </Reveal>
        <StaggerGrid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {seekerActions.map((item) => (
            <StaggerItem key={item.label}>
              <Link href={item.href} className="tb-card block h-full p-5 sm:p-6">
                <h3 className="font-semibold text-ink">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </PageBand>

      <PageBand className="border-y border-slate-200 bg-white py-16 sm:py-20" data-animate="section">
        <Reveal>
          <SectionHeading
            eyebrow="Two audiences. One standard."
            title="Built for talent. Trusted by hiring teams."
            description="We match people to work that actually fits — then we stay accountable to both sides."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Link
            href="/jobs"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-ink p-8 text-white shadow-lg sm:p-10"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-100">
              For job seekers
            </p>
            <h3 className="mt-3 font-serif text-3xl">Find your next role</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-blue-100/90">
              Save roles, apply once, and see Applied status immediately. No ghost listings.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
              Search jobs
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
          <Link
            href="/for-employers"
            className="group relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-lg sm:p-10"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              For employers
            </p>
            <h3 className="mt-3 font-serif text-3xl">Build teams that deliver</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              Permanent, contract, and project hiring with industry-specialist consultants.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
              Submit a vacancy
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </PageBand>

      <HowItWorks />

      <PageBand className="py-16 sm:py-20" data-animate="section">
        <Reveal>
          <SectionHeading
            eyebrow="Solutions"
            title="Specialist desks, not generic recruiters."
            description="From plant operations to product engineering — structured delivery for every hiring challenge."
          />
        </Reveal>
        <StaggerGrid className="mt-10 grid gap-5 sm:grid-cols-2">
          {solutions.map((s) => (
            <StaggerItem key={s.title}>
              <Link href={s.href} className="tb-card flex gap-4 p-6 sm:p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
                  <s.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </PageBand>

      <HomeCategories />
      <Testimonials />

      <PageBand className="border-t border-slate-200 bg-white py-16 sm:py-20" data-animate="section">
        <Reveal>
          <SectionHeading
            eyebrow="Local opportunities"
            title="Jobs near you — or fully remote."
            description="Filter by city and radius. We keep the list honest so you spend minutes, not evenings, hunting."
          />
        </Reveal>
        <Reveal delay={0.1} className="mt-8 max-w-5xl">
          <JobSearchBar variant="inline" />
        </Reveal>
      </PageBand>
    </div>
  );
}
