"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  Mail,
  Users,
} from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { cn } from "@/lib/cn";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/vacancies", label: "Vacancies", icon: Mail },
  { href: "/admin/users", label: "Users", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-b border-slate-200 bg-surface md:w-60 md:border-b-0 md:border-r">
      <div className="p-4 md:p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Administration
        </p>
        <nav className="mt-4 flex gap-1 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0">
          {links.map(({ href, label, icon: Icon }) => {
            const active =
              pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-brand text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/"
          className="mt-6 hidden text-sm font-medium text-brand hover:underline md:inline"
        >
          ← Back to site
        </Link>
        <div className="mt-6 hidden md:block">
          <LogoutButton variant="dashboard" className="w-full justify-center" />
        </div>
      </div>
    </aside>
  );
}
