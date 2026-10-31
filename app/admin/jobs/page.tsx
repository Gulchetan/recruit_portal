"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { deleteJob, getJobs, newId, upsertJob } from "@/lib/storage";
import { CATEGORY_LABELS, type ContractType, type Job, type JobCategory } from "@/lib/types";

const emptyJob = (): Job => ({
  id: newId("job"),
  title: "",
  company: "",
  location: "",
  category: "it",
  contractType: "permanent",
  description: "",
  requirements: "",
  salaryRange: "",
  postedAt: new Date().toISOString(),
});

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Job>(emptyJob());

  function reload() {
    setJobs(getJobs());
  }

  useEffect(() => {
    reload();
  }, []);

  function openNew() {
    setEditing(emptyJob());
    setModalOpen(true);
  }

  function openEdit(job: Job) {
    setEditing({ ...job });
    setModalOpen(true);
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editing.title.trim()) return;
    upsertJob({
      ...editing,
      postedAt: editing.postedAt || new Date().toISOString(),
    });
    reload();
    setModalOpen(false);
  }

  function remove(id: string) {
    if (!confirm("Delete this job?")) return;
    deleteJob(id);
    reload();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Jobs</h1>
        <button
          type="button"
          onClick={openNew}
          className="flex items-center gap-2 rounded-lg bg-[#0B5ED7] px-4 py-2 text-sm text-white hover:bg-[#094db3]"
        >
          <Plus className="h-4 w-4" />
          Add job
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium">{j.title}</td>
                <td className="px-4 py-3">{j.company}</td>
                <td className="px-4 py-3">{j.location}</td>
                <td className="px-4 py-3">{CATEGORY_LABELS[j.category]}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(j)}
                      className="rounded p-1 hover:bg-slate-100"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(j.id)}
                      className="rounded p-1 text-red-600 hover:bg-red-50"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6">
            <h2 className="text-lg font-semibold">
              {jobs.some((j) => j.id === editing.id) ? "Edit job" : "New job"}
            </h2>
            <form onSubmit={save} className="mt-4 space-y-3">
              <input
                required
                placeholder="Title"
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full rounded border px-3 py-2"
              />
              <input
                required
                placeholder="Company"
                value={editing.company}
                onChange={(e) => setEditing({ ...editing, company: e.target.value })}
                className="w-full rounded border px-3 py-2"
              />
              <input
                placeholder="Location"
                value={editing.location}
                onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                className="w-full rounded border px-3 py-2"
              />
              <select
                value={editing.category}
                onChange={(e) =>
                  setEditing({ ...editing, category: e.target.value as JobCategory })
                }
                className="w-full rounded border px-3 py-2"
              >
                {(Object.keys(CATEGORY_LABELS) as JobCategory[]).map((c) => (
                  <option key={c} value={c}>
                    {CATEGORY_LABELS[c]}
                  </option>
                ))}
              </select>
              <select
                value={editing.contractType}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    contractType: e.target.value as ContractType,
                  })
                }
                className="w-full rounded border px-3 py-2"
              >
                <option value="permanent">Permanent</option>
                <option value="contract">Contract</option>
                <option value="temporary">Temporary</option>
              </select>
              <input
                placeholder="Salary range"
                value={editing.salaryRange ?? ""}
                onChange={(e) => setEditing({ ...editing, salaryRange: e.target.value })}
                className="w-full rounded border px-3 py-2"
              />
              <textarea
                placeholder="Description"
                rows={3}
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="w-full rounded border px-3 py-2"
              />
              <textarea
                placeholder="Requirements"
                rows={2}
                value={editing.requirements}
                onChange={(e) => setEditing({ ...editing, requirements: e.target.value })}
                className="w-full rounded border px-3 py-2"
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!editing.featured}
                  onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                />
                Featured / trending
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded border px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-[#0B5ED7] px-4 py-2 text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
