"use client";

import { useEffect, useState } from "react";
import { getContactMessages, getVacancies } from "@/lib/storage";
import type { ContactMessage, VacancyRequest } from "@/lib/types";

export default function AdminVacanciesPage() {
  const [vacancies, setVacancies] = useState<VacancyRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    setVacancies(getVacancies());
    setMessages(getContactMessages());
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Vacancy & contact requests</h1>

      <h2 className="mt-8 text-lg font-medium">Employer vacancy submissions</h2>
      <div className="mt-4 space-y-4">
        {vacancies.length === 0 ? (
          <p className="text-slate-600">None yet.</p>
        ) : (
          vacancies.map((v) => (
            <article key={v.id} className="rounded-xl border border-slate-200 p-5 text-sm">
              <p className="font-semibold">
                {v.jobTitle} @ {v.companyName}
              </p>
              <p className="text-slate-600">
                {v.contactName} · {v.email} · {v.phone}
              </p>
              <p className="mt-2">{v.location}</p>
              <p className="mt-2 text-slate-700">{v.description}</p>
              <p className="mt-2 text-xs text-slate-500">
                {new Date(v.createdAt).toLocaleString()}
              </p>
            </article>
          ))
        )}
      </div>

      <h2 className="mt-10 text-lg font-medium">Contact form messages</h2>
      <div className="mt-4 space-y-4">
        {messages.length === 0 ? (
          <p className="text-slate-600">None yet.</p>
        ) : (
          messages.map((m) => (
            <article key={m.id} className="rounded-xl border border-slate-200 p-5 text-sm">
              <p className="font-semibold">{m.subject}</p>
              <p className="text-slate-600">
                {m.name} · {m.email}
              </p>
              <p className="mt-2">{m.message}</p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
