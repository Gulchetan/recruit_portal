"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { JobCard } from "@/components/jobs/JobCard";
import { AuthGate } from "@/components/auth/AuthGate";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Container } from "@/components/ui/Container";
import { useAuth } from "@/hooks/useAuth";
import {
  getApplications,
  getJobById,
  getSavedJobIds,
  getVacancies,
} from "@/lib/storage";
import type { Application, Job, VacancyRequest } from "@/lib/types";

function DashboardContent() {
  const { session } = useAuth();
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [vacancies, setVacancies] = useState<VacancyRequest[]>([]);

  useEffect(() => {
    if (!session) return;
    const ids = getSavedJobIds(session.userId);
    setSavedJobs(ids.map((id) => getJobById(id)).filter(Boolean) as Job[]);
    setApplications(
      getApplications().filter(
        (a) => a.userId === session.userId || a.email === session.email
      )
    );
    if (session.role === "employer") {
      setVacancies(
        getVacancies().filter(
          (v) => v.userId === session.userId || v.email === session.email
        )
      );
    }
  }, [session]);

  if (!session) return null;

  return (
    <Container className="py-10 sm:py-14">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Hello, {session.name}
          </h1>
          <p className="mt-2 text-slate-600 capitalize">Signed in as {session.role}</p>
        </div>
        <LogoutButton variant="dashboard" />
      </div>

      {(session.role === "seeker" || session.role === "admin") && (
        <>
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-slate-900">Saved jobs</h2>
            {savedJobs.length === 0 ? (
              <p className="mt-4 text-slate-600">
                No saved jobs yet.{" "}
                <Link href="/jobs" className="text-[#0B5ED7] underline">
                  Browse openings
                </Link>
              </p>
            ) : (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {savedJobs.map((j) => (
                  <JobCard key={j.id} job={j} />
                ))}
              </div>
            )}
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-slate-900">My applications</h2>
            {applications.length === 0 ? (
              <p className="mt-4 text-slate-600">You have not applied to any jobs yet.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {applications.map((a) => {
                  const job = getJobById(a.jobId);
                  return (
                    <li key={a.id} className="tb-card p-4 text-sm">
                      <p className="font-medium">{job?.title ?? a.jobId}</p>
                      <p className="text-slate-600">
                        Applied {new Date(a.createdAt).toLocaleString()} · Resume:{" "}
                        {a.resumeFileName}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </>
      )}

      {session.role === "employer" && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900">Vacancy submissions</h2>
          {vacancies.length === 0 ? (
            <p className="mt-4 text-slate-600">
              No submissions yet.{" "}
              <Link href="/for-employers#vacancy" className="text-[#0B5ED7] underline">
                Submit a vacancy
              </Link>
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {vacancies.map((v) => (
                <li key={v.id} className="tb-card p-4">
                  <p className="font-medium">{v.jobTitle}</p>
                  <p className="text-sm text-slate-600">
                    {v.companyName} · {v.location || "Location TBD"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {new Date(v.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {session.role === "admin" && (
        <p className="mt-8">
          <Link href="/admin" className="text-[#0B5ED7] font-medium underline">
            Go to admin panel →
          </Link>
        </p>
      )}
    </Container>
  );
}

export default function DashboardPage() {
  return (
    <AuthGate>
      <DashboardContent />
    </AuthGate>
  );
}
