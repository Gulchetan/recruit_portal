"use client";

import { MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";

const RADII = ["10", "25", "50", "100"];
const POPULAR = ["Software Developer", "HR", "Logistics", "Bengaluru", "Remote"];

export function JobSearchBar({
  initialQ = "",
  initialLocation = "",
  initialRadius = "25",
  variant,
  compact,
}: {
  initialQ?: string;
  initialLocation?: string;
  initialRadius?: string;
  compact?: boolean;
  variant?: "hero" | "inline";
}) {
  const resolvedVariant = variant ?? (compact ? "inline" : "hero");
  const router = useRouter();
  const uid = useId();
  const [q, setQ] = useState(initialQ);
  const [location, setLocation] = useState(initialLocation);
  const [radius, setRadius] = useState(initialRadius);

  function go(nextQ = q, nextLoc = location) {
    const params = new URLSearchParams();
    if (nextQ.trim()) params.set("q", nextQ.trim());
    if (nextLoc.trim()) params.set("location", nextLoc.trim());
    if (radius) params.set("radius", radius);
    router.push(`/jobs?${params.toString()}`);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    go();
  }

  const isHero = resolvedVariant === "hero";
  const roleId = `${uid}-role`;
  const locId = `${uid}-location`;
  const radiusId = `${uid}-radius`;

  const field =
    "flex min-h-11 w-full items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 shadow-sm focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20";
  const inputClass =
    "min-w-0 flex-1 border-0 bg-transparent py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400";
  const labelClass =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500";

  return (
    <div className="w-full min-w-0">
      <form
        onSubmit={submit}
        className={cn(
          "rounded-3xl border bg-white p-4 shadow-2xl sm:p-5",
          isHero
            ? "border-white/25"
            : "border-slate-200/80 shadow-lg ring-1 ring-slate-200/60"
        )}
      >
        <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_9.5rem_auto]">
          <div className="min-w-0">
            <label htmlFor={roleId} className={labelClass}>
              Role or skill
            </label>
            <div className={field}>
              <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
              <input
                id={roleId}
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Software Developer"
                className={inputClass}
              />
            </div>
          </div>
          <div className="min-w-0">
            <label htmlFor={locId} className={labelClass}>
              Location
            </label>
            <div className={field}>
              <MapPin className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
              <input
                id={locId}
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or Remote"
                className={inputClass}
              />
            </div>
          </div>
          <div className="min-w-0">
            <label htmlFor={radiusId} className={labelClass}>
              Radius
            </label>
            <select
              id={radiusId}
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="tb-input min-h-11 w-full min-w-[8.5rem] appearance-auto pr-8"
            >
              {RADII.map((r) => (
                <option key={r} value={r}>
                  {r} km
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="tb-btn-primary w-full min-h-11 lg:min-w-[9.5rem]">
            Search jobs
          </button>
        </div>
      </form>
      {isHero && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-white/60">
            Trending
          </span>
          {POPULAR.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                const locTerms = ["Bengaluru", "Remote"];
                if (locTerms.includes(term)) {
                  setLocation(term);
                  go(q, term);
                } else {
                  setQ(term);
                  go(term, location);
                }
              }}
              className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm transition hover:border-gold hover:text-gold"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
