"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/lib/types";

export function AuthGate({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles?: UserRole[];
}) {
  const { session, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!session) {
      router.replace("/login");
      return;
    }
    if (roles && !roles.includes(session.role)) {
      router.replace("/dashboard");
    }
  }, [ready, session, roles, router]);

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-slate-600">
        Loading…
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-slate-600">Please log in to continue.</p>
        <Link href="/login" className="mt-4 inline-block text-[#0B5ED7] underline">
          Go to login
        </Link>
      </div>
    );
  }

  if (roles && !roles.includes(session.role)) {
    return null;
  }

  return <>{children}</>;
}
