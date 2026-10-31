"use client";

import { useEffect, useState } from "react";
import { getApplications, getJobById, getJobs } from "@/lib/storage";
import type { Application } from "@/lib/types";

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [filterJob, setFilterJob] = useState("all");

  useEffect(() => {
    setApps(getApplications());
  }, []);

  const jobs = getJobs();
  const filtered =
    filterJob === "all" ? apps : apps.filter((a) => a.jobId === filterJob);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Applications</h1>
      <div className="mt-4">
        <label className="mr-2 text-sm text-slate-600">Filter by job:</label>
        <select
          value={filterJob}
          onChange={(e) => setFilterJob(e.target.value)}
          className="rounded border border-slate-300 px-3 py-1.5 text-sm"
        >
          <option value="all">All jobs</option>
          {jobs.map((j) => (
            <option key={j.id} value={j.id}>
              {j.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-6 space-y-4">
        {filtered.length === 0 ? (
          <p className="text-slate-600">No applications yet.</p>
        ) : (
          filtered.map((a) => {
            const job = getJobById(a.jobId);
            return (
              <article
                key={a.id}
                className="rounded-xl border border-slate-200 bg-white p-5 text-sm"
              >
                <p className="font-semibold text-slate-900">
                  {a.name} — {job?.title ?? a.jobId}
                </p>
                <p className="text-slate-600">
                  {a.email} · {a.phone}
                </p>
                <p className="mt-2 text-slate-700">{a.message || "—"}</p>
                <p className="mt-2 text-xs text-slate-500">
                  Resume: {a.resumeFileName} · {new Date(a.createdAt).toLocaleString()}
                </p>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
