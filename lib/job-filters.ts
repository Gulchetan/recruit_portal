import type { Job, JobCategory } from "./types";

export function filterJobs(
  jobs: Job[],
  opts: {
    q?: string;
    location?: string;
    category?: string;
    contractType?: string;
  }
): Job[] {
  let result = [...jobs];
  const q = opts.q?.trim().toLowerCase();
  const loc = opts.location?.trim().toLowerCase();
  const cat = opts.category?.trim().toLowerCase();
  const contract = opts.contractType?.trim().toLowerCase();

  if (q) {
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q)
    );
  }
  if (loc) {
    result = result.filter(
      (j) =>
        j.location.toLowerCase().includes(loc) ||
        loc.split(",").some((part) => j.location.toLowerCase().includes(part.trim()))
    );
  }
  if (cat && cat !== "all") {
    result = result.filter((j) => j.category === (cat as JobCategory));
  }
  if (contract && contract !== "all") {
    result = result.filter((j) => j.contractType === contract);
  }
  return result;
}

export function countByCategory(jobs: Job[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const j of jobs) {
    counts[j.category] = (counts[j.category] ?? 0) + 1;
  }
  return counts;
}
