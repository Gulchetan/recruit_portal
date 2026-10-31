export type UserRole = "admin" | "seeker" | "employer";

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  isStatic?: boolean;
}

export interface Session {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
}

export type JobCategory =
  | "it"
  | "finance"
  | "hr"
  | "sales"
  | "warehouse"
  | "engineering"
  | "marketing"
  | "business";

export type ContractType = "permanent" | "contract" | "temporary";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: JobCategory;
  contractType: ContractType;
  description: string;
  requirements: string;
  salaryRange?: string;
  postedAt: string;
  featured?: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  email: string;
  name: string;
  phone: string;
  message: string;
  resumeFileName: string;
  createdAt: string;
}

export interface VacancyRequest {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  jobTitle: string;
  location: string;
  description: string;
  userId?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface SavedJobsMap {
  [userId: string]: string[];
}

export const CATEGORY_LABELS: Record<JobCategory, string> = {
  it: "IT",
  finance: "Finance",
  hr: "HR",
  sales: "Sales & Marketing",
  warehouse: "Warehouse & Logistics",
  engineering: "Engineering",
  marketing: "Marketing Communications",
  business: "Business Management",
};
