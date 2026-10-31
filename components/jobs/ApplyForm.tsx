"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { addApplication, hasUserAppliedToJob, newId } from "@/lib/storage";
import type { Job } from "@/lib/types";

export function ApplyForm({ job, onSuccess }: { job: Job; onSuccess?: () => void }) {
  const { session } = useAuth();
  const [name, setName] = useState(session?.name ?? "");
  const [email, setEmail] = useState(session?.email ?? "");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!session) {
      setError("Please log in as a job seeker to apply.");
      return;
    }
    if (session.role !== "seeker" && session.role !== "admin") {
      setError("Only job seeker accounts can apply to jobs.");
      return;
    }
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    if (
      hasUserAppliedToJob(job.id, {
        userId: session.userId,
        email: session.email,
      })
    ) {
      setDone(true);
      onSuccess?.();
      return;
    }
    addApplication({
      id: newId("app"),
      jobId: job.id,
      userId: session.userId,
      email: email.trim(),
      name: name.trim(),
      phone: phone.trim(),
      message: message.trim(),
      resumeFileName: resumeFileName || "not attached",
      createdAt: new Date().toISOString(),
    });
    setDone(true);
    onSuccess?.();
  }

  if (done) {
    return (
      <div className="rounded-lg bg-green-50 p-4 text-green-800">
        Application submitted successfully. Track it in your dashboard.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}
      <div>
        <label className="mb-1 block text-sm font-medium">Full name *</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <label className="mb-1 block text-sm font-medium">Phone *</label>
        <input
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="tb-input"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Cover message</label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="tb-input"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Resume (filename only)</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResumeFileName(e.target.files?.[0]?.name ?? "")}
          className="w-full text-sm"
        />
      </div>
      <button
        type="submit"
        className="tb-btn-primary w-full"
      >
        Submit application
      </button>
    </form>
  );
}
