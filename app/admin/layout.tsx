"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AuthGate } from "@/components/auth/AuthGate";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate roles={["admin"]}>
      <div className="flex min-h-[calc(100vh-8rem)] flex-col bg-background md:flex-row">
        <AdminSidebar />
        <div className="flex-1 p-4 sm:p-6 md:p-8">{children}</div>
      </div>
    </AuthGate>
  );
}
