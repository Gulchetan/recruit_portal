"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { PageBand } from "@/components/ui/Container";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { countByCategory } from "@/lib/job-filters";
import { getJobs } from "@/lib/storage";
import { CATEGORY_LABELS, type JobCategory } from "@/lib/types";

export function HomeCategories() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const jobs = getJobs();
    setCounts(countByCategory(jobs));
    setTotal(jobs.length);
  }, []);

  const categories = Object.keys(CATEGORY_LABELS) as JobCategory[];

  return (
    <PageBand
      className="border-y border-slate-200 bg-slate-50/80 py-14 sm:py-20"
      data-animate="section"
    >
      <Reveal>
        <SectionHeading
          eyebrow="Open roles"
          title={`Explore ${total}+ active jobs`}
          description="Browse by discipline to find roles aligned with your experience and career goals."
        />
      </Reveal>
      <StaggerGrid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <StaggerItem key={cat}>
            <Link
              href={`/jobs?category=${cat}`}
              className="tb-card group block p-5 sm:p-6"
            >
              <h3 className="text-sm font-semibold text-brand">{CATEGORY_LABELS[cat]}</h3>
              <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {counts[cat] ?? 0}
              </p>
              <p className="mt-1 text-xs text-slate-500">open positions</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-slate-700 transition group-hover:text-brand">
                View all
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </PageBand>
  );
}
