import { STORAGE_KEYS } from "./constants";
import { getSeedJobs } from "./seed-jobs";
import type {
  Application,
  ContactMessage,
  Job,
  SavedJobsMap,
  User,
  VacancyRequest,
} from "./types";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function ensureSeeded(): void {
  if (!isBrowser()) return;
  const jobs = localStorage.getItem(STORAGE_KEYS.jobs);
  if (!jobs) {
    write(STORAGE_KEYS.jobs, getSeedJobs());
    localStorage.setItem(STORAGE_KEYS.seeded, "true");
  }
}

export function getJobs(): Job[] {
  ensureSeeded();
  return read<Job[]>(STORAGE_KEYS.jobs, []);
}

export function saveJobs(jobs: Job[]): void {
  write(STORAGE_KEYS.jobs, jobs);
}

export function getJobById(id: string): Job | undefined {
  return getJobs().find((j) => j.id === id);
}

export function upsertJob(job: Job): void {
  const jobs = getJobs();
  const idx = jobs.findIndex((j) => j.id === job.id);
  if (idx >= 0) jobs[idx] = job;
  else jobs.unshift(job);
  saveJobs(jobs);
}

export function deleteJob(id: string): void {
  saveJobs(getJobs().filter((j) => j.id !== id));
}

export function getApplications(): Application[] {
  return read<Application[]>(STORAGE_KEYS.applications, []);
}

export function addApplication(app: Application): void {
  const list = getApplications();
  list.unshift(app);
  write(STORAGE_KEYS.applications, list);
}

export function hasUserAppliedToJob(
  jobId: string,
  opts: { userId?: string; email?: string }
): boolean {
  if (!opts.userId && !opts.email) return false;
  return getApplications().some(
    (a) =>
      a.jobId === jobId &&
      ((opts.userId && a.userId === opts.userId) ||
        (opts.email && a.email.toLowerCase() === opts.email.toLowerCase()))
  );
}

export function getVacancies(): VacancyRequest[] {
  return read<VacancyRequest[]>(STORAGE_KEYS.vacancies, []);
}

export function addVacancy(v: VacancyRequest): void {
  const list = getVacancies();
  list.unshift(v);
  write(STORAGE_KEYS.vacancies, list);
}

export function getContactMessages(): ContactMessage[] {
  return read<ContactMessage[]>(STORAGE_KEYS.contact, []);
}

export function addContactMessage(m: ContactMessage): void {
  const list = getContactMessages();
  list.unshift(m);
  write(STORAGE_KEYS.contact, list);
}

export function getRegisteredUsers(): User[] {
  return read<User[]>(STORAGE_KEYS.registeredUsers, []);
}

export function addRegisteredUser(user: User): void {
  const list = getRegisteredUsers();
  list.push(user);
  write(STORAGE_KEYS.registeredUsers, list);
}

export function getSavedJobsMap(): SavedJobsMap {
  return read<SavedJobsMap>(STORAGE_KEYS.savedJobs, {});
}

export function toggleSavedJob(userId: string, jobId: string): boolean {
  const map = getSavedJobsMap();
  const current = map[userId] ?? [];
  const has = current.includes(jobId);
  map[userId] = has ? current.filter((id) => id !== jobId) : [...current, jobId];
  write(STORAGE_KEYS.savedJobs, map);
  return !has;
}

export function isJobSaved(userId: string, jobId: string): boolean {
  const map = getSavedJobsMap();
  return (map[userId] ?? []).includes(jobId);
}

export function getSavedJobIds(userId: string): string[] {
  return getSavedJobsMap()[userId] ?? [];
}

export function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Removes all TalentBridge localStorage keys (session, jobs, applications, etc.). Jobs re-seed on next visit. */
export function flushAppStorage(): void {
  if (!isBrowser()) return;
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}
