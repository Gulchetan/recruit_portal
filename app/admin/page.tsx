"use client";

import { useEffect, useState } from "react";
import {
  getApplications,
  getContactMessages,
  getJobs,
  getRegisteredUsers,
  getVacancies,
} from "@/lib/storage";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    jobs: 0,
    applications: 0,
    vacancies: 0,
    users: 0,
    messages: 0,
  });

  useEffect(() => {
    setStats({
      jobs: getJobs().length,
      applications: getApplications().length,
      vacancies: getVacancies().length,
      users: getRegisteredUsers().length,
      messages: getContactMessages().length,
    });
  }, []);

  const cards = [
    { label: "Jobs", value: stats.jobs },
    { label: "Applications", value: stats.applications },
    { label: "Vacancy requests", value: stats.vacancies },
    { label: "Registered users", value: stats.users },
    { label: "Contact messages", value: stats.messages },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold">Admin dashboard</h1>
      <p className="mt-2 text-slate-600">
        Overview of data stored in this browser&apos;s localStorage.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">{c.label}</p>
            <p className="mt-2 text-3xl font-bold text-[#0B5ED7]">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
