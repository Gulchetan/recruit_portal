"use client";

import Link from "next/link";
import { ArrowRight, Bookmark, Check, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { hasUserAppliedToJob, isJobSaved } from "@/lib/storage";
import type { Job } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";

export function JobCard({ job }: { job: Job }) {
  const { session } = useAuth();
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!session) {
      setApplied(false);
      setSaved(false);
      return;
    }
    setApplied(
      hasUserAppliedToJob(job.id, { userId: session.userId, email: session.email })
    );
    setSaved(isJobSaved(session.userId, job.id));
  }, [job.id, session]);

  return (
    <article className="tb-card group relative flex h-full flex-col overflow-hidden p-5 sm:p-6">
      <div className="absolute inset-y-0 left-0 w-1 bg-transparent transition group-hover:bg-brand" />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            href={`/jobs/${job.id}`}
            className="text-lg font-semibold tracking-tight text-ink transition group-hover:text-brand"
          >
            {job.title}
          </Link>
          <p className="mt-1 text-sm font-medium text-slate-500">{job.company}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          {applied ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-200/80">
              <Check className="h-3 w-3" />
              Applied
            </span>
          ) : job.featured ? (
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-800 ring-1 ring-amber-200/80">
              Featured
            </span>
          ) : null}
          {saved && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
              <Bookmark className="h-3 w-3 fill-current" />
              Saved
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">
          <MapPin className="mr-1 inline h-3 w-3" />
          {job.location}
        </span>
        <span className="rounded-full bg-brand-light px-2.5 py-1 font-medium text-brand-dark">
          {CATEGORY_LABELS[job.category]}
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 capitalize text-slate-700">
          {job.contractType}
        </span>
      </div>

      {job.salaryRange && (
        <p className="mt-3 text-sm font-semibold text-ink">{job.salaryRange}</p>
      )}

      <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">
        {job.description}
      </p>

      <Link
        href={`/jobs/${job.id}`}
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand transition group-hover:gap-2"
      >
        {applied ? "View application" : "View role"}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
