"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { ApplyForm } from "@/components/jobs/ApplyForm";
import { Container } from "@/components/ui/Container";
import { useAuth } from "@/hooks/useAuth";
import {
  getJobById,
  hasUserAppliedToJob,
  isJobSaved,
  toggleSavedJob,
} from "@/lib/storage";
import { CATEGORY_LABELS, type Job } from "@/lib/types";

export function JobDetailClient({ id }: { id: string }) {
  const { session } = useAuth();
  const [job, setJob] = useState<Job | null | undefined>(undefined);
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);
  const [showApply, setShowApply] = useState(false);

  useEffect(() => {
    const j = getJobById(id);
    setJob(j ?? null);
    if (session) {
      setSaved(isJobSaved(session.userId, id));
      setApplied(
        hasUserAppliedToJob(id, {
          userId: session.userId,
          email: session.email,
        })
      );
    } else {
      setApplied(false);
    }
  }, [id, session]);

  if (job === undefined) {
    return (
      <Container className="py-16 text-center text-slate-500">Loading role details…</Container>
    );
  }

  if (!job) {
    return (
      <Container narrow className="py-16 text-center">
        <p className="text-lg text-slate-700">This job listing could not be found.</p>
        <Link href="/jobs" className="mt-4 inline-block font-semibold text-brand hover:underline">
          Back to all jobs
        </Link>
      </Container>
    );
  }

  function handleSave() {
    if (!session) {
      window.location.href = "/login";
      return;
    }
    const nowSaved = toggleSavedJob(session.userId, job!.id);
    setSaved(nowSaved);
  }

  return (
    <>
      <section className="border-b border-slate-200 bg-surface">
        <Container className="py-10 sm:py-12">
          <Link
            href="/jobs"
            className="text-sm font-medium text-brand hover:underline"
          >
            ← All jobs
          </Link>
          <h1 className="mt-4 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
            {job.title}
          </h1>
          <p className="mt-2 text-lg font-medium text-slate-600">{job.company}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
              {job.location}
            </span>
            <span className="rounded-full bg-brand-light px-3 py-1 text-sm font-medium text-brand-dark">
              {CATEGORY_LABELS[job.category]}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm capitalize text-slate-700">
              {job.contractType}
            </span>
            {job.salaryRange && (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800">
                {job.salaryRange}
              </span>
            )}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {applied ? (
              <span className="tb-btn-primary inline-flex cursor-default bg-emerald-600 hover:bg-emerald-600">
                <Check className="h-4 w-4" aria-hidden />
                Applied
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setShowApply(true)}
                className="tb-btn-primary"
              >
                Apply now
              </button>
            )}
            <button type="button" onClick={handleSave} className="tb-btn-secondary">
              {saved ? "Saved to profile" : "Save job"}
            </button>
          </div>
        </Container>
      </section>

      <Container className="py-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section>
              <h2 className="text-lg font-semibold text-slate-900">Role description</h2>
              <p className="mt-3 whitespace-pre-wrap leading-relaxed text-slate-700">
                {job.description}
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-slate-900">Requirements</h2>
              <p className="mt-3 whitespace-pre-wrap leading-relaxed text-slate-700">
                {job.requirements}
              </p>
            </section>
          </div>
          <aside className="tb-card h-fit p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              At a glance
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-slate-500">Employer</dt>
                <dd className="font-medium text-slate-900">{job.company}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Location</dt>
                <dd className="font-medium text-slate-900">{job.location}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Contract</dt>
                <dd className="font-medium capitalize text-slate-900">{job.contractType}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </Container>

      {showApply && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 sm:items-center sm:p-4">
          <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-6 shadow-2xl sm:rounded-2xl sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-slate-900">Apply for {job.title}</h3>
              <button
                type="button"
                onClick={() => setShowApply(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            {!session ? (
              <p className="text-slate-600">
                Please{" "}
                <Link href="/login" className="font-semibold text-brand underline">
                  log in
                </Link>{" "}
                to submit your application.
              </p>
            ) : (
              <ApplyForm
                job={job}
                onSuccess={() => {
                  setShowApply(false);
                  setApplied(true);
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
