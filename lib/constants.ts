import type { User } from "./types";

export const STORAGE_KEYS = {
  jobs: "tb_jobs",
  applications: "tb_applications",
  vacancies: "tb_vacancies",
  contact: "tb_contact_messages",
  savedJobs: "tb_saved_jobs",
  registeredUsers: "tb_registered_users",
  session: "tb_session",
  seeded: "tb_seeded",
} as const;

export const STATIC_USERS: User[] = [
  {
    id: "static-admin",
    email: "admin@talentbridge.in",
    password: "Admin@123",
    name: "Admin User",
    role: "admin",
    isStatic: true,
  },
  {
    id: "static-seeker",
    email: "seeker@talentbridge.in",
    password: "Seeker@123",
    name: "Demo Seeker",
    role: "seeker",
    isStatic: true,
  },
  {
    id: "static-employer",
    email: "employer@talentbridge.in",
    password: "Employer@123",
    name: "Demo Employer",
    role: "employer",
    isStatic: true,
  },
];

export const BRAND = {
  name: "TalentBridge India",
  tagline: "partner for talent.",
  primary: "#1B6BFF",
} as const;
