"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { JobCard } from "@/components/jobs/JobCard";
import { filterJobs } from "@/lib/job-filters";
import { getJobs } from "@/lib/storage";
import { CATEGORY_LABELS, type JobCategory } from "@/lib/types";

const PAGE_SIZE = 8;

export function JobsListClient({
  q,
  location,
  category,
  contractType,
}: {
  q?: string;
  location?: string;
  category?: string;
  contractType?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<"featured" | "newest" | "title">("featured");

  const jobs = useMemo(() => {
    const filtered = filterJobs(getJobs(), { q, location, category, contractType });
    const copy = [...filtered];
    if (sort === "featured") {
      copy.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    } else if (sort === "title") {
      copy.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      copy.sort((a, b) => b.postedAt.localeCompare(a.postedAt));
    }
    return copy;
  }, [q, location, category, contractType, sort]);

  const totalPages = Math.max(1, Math.ceil(jobs.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const slice = jobs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function patchQuery(key: string, value: string) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (location) params.set("location", location);
    if (category) params.set("category", category);
    if (contractType) params.set("contractType", contractType);
    if (value === "all") params.delete(key);
    else params.set(key, value);
    setPage(1);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-slate-600">
          <span className="font-semibold text-ink">{jobs.length}</span> roles match your
          filters
        </p>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          Sort
          <select
            className="tb-input w-auto min-w-[160px] py-2"
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
          >
            <option value="featured">Featured first</option>
            <option value="newest">Newest</option>
            <option value="title">Title A–Z</option>
          </select>
        </label>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <select
          className="tb-input w-auto min-w-[160px] py-2.5"
          value={category ?? "all"}
          onChange={(e) => patchQuery("category", e.target.value)}
        >
          <option value="all">All categories</option>
          {(Object.keys(CATEGORY_LABELS) as JobCategory[]).map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>
        <select
          className="tb-input w-auto min-w-[160px] py-2.5"
          value={contractType ?? "all"}
          onChange={(e) => patchQuery("contractType", e.target.value)}
        >
          <option value="all">All contract types</option>
          <option value="permanent">Permanent</option>
          <option value="contract">Contract</option>
          <option value="temporary">Temporary</option>
        </select>
      </div>

      {slice.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="font-semibold text-ink">No roles match those filters.</p>
          <p className="mt-2 text-sm text-slate-600">
            Try a broader keyword, or clear category and location.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {slice.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="tb-btn-secondary disabled:opacity-40"
          >
            Previous
          </button>
          <span className="flex items-center px-4 text-sm text-slate-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="tb-btn-secondary disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
