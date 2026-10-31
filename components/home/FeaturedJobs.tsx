"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { getJobs } from "@/lib/storage";
import type { Job } from "@/lib/types";

export function FeaturedJobs({ compact = false }: { compact?: boolean }) {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const all = getJobs();
    const featured = all.filter((j) => j.featured);
    setJobs((featured.length ? featured : all).slice(0, compact ? 3 : 4));
  }, [compact]);

  if (!jobs.length) return null;

  return (
    <ul className="space-y-3">
      {jobs.map((job) => (
        <li key={job.id}>
          <Link
            href={`/jobs/${job.id}`}
            className="group flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm transition hover:border-gold/40 hover:bg-white/12"
          >
            <div className="min-w-0">
              <p className="truncate font-semibold text-white">{job.title}</p>
              <p className="mt-0.5 truncate text-sm text-white/65">{job.company}</p>
              <p className="mt-2 inline-flex items-center gap-1 text-xs text-white/55">
                <MapPin className="h-3.5 w-3.5" />
                {job.location}
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-gold opacity-70 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
