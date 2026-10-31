"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { addVacancy, newId } from "@/lib/storage";

export function VacancyForm() {
  const { session } = useAuth();
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState(session?.name ?? "");
  const [email, setEmail] = useState(session?.email ?? "");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!companyName.trim() || !contactName.trim() || !email.trim() || !jobTitle.trim()) {
      setError("Please fill required fields.");
      return;
    }
    addVacancy({
      id: newId("vac"),
      companyName: companyName.trim(),
      contactName: contactName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      jobTitle: jobTitle.trim(),
      location: location.trim(),
      description: description.trim(),
      userId: session?.userId,
      createdAt: new Date().toISOString(),
    });
    setDone(true);
    setError("");
  }

  if (done) {
    return (
      <div className="rounded-lg bg-green-50 p-6 text-green-800">
        Thank you. Your vacancy request has been saved. Our team will review it (demo: visible
        in admin panel).
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Company name *</label>
          <input
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="tb-input"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Contact name *</label>
          <input
            required
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="tb-input"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email *</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="tb-input"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="tb-input"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Job title *</label>
          <input
            required
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="tb-input"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="tb-input"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Role description</label>
        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="tb-input min-h-[120px] resize-y"
        />
      </div>
      <button
        type="submit"
        className="tb-btn-primary"
      >
        Submit vacancy
      </button>
    </form>
  );
}
