"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { useAuth } from "@/hooks/useAuth";
import { getSession } from "@/lib/auth";
import { STATIC_USERS } from "@/lib/constants";

function LoginForm() {
  const { login, session, ready } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ready || !session) return;
    router.replace(session.role === "admin" ? "/admin" : "/dashboard");
  }, [ready, session, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = login(email, password);
    if (err) {
      setError(err);
      return;
    }
    const redirect = searchParams.get("redirect") ?? "";
    const current = getSession();
    if (redirect) router.push(redirect);
    else if (current?.role === "admin") router.push("/admin");
    else router.push("/dashboard");
  }

  return (
    <Container narrow className="py-12 sm:py-16">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Welcome back</h1>
          <p className="mt-2 text-slate-600">Sign in to manage applications and saved roles.</p>
        </div>

        <div className="tb-card mt-8 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">
                {error}
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="tb-input"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="tb-input"
              />
            </div>
            <button type="submit" className="tb-btn-primary w-full">
              Log in
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">
            New here?{" "}
            <Link href="/register" className="font-semibold text-brand hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        <div className="tb-card mt-6 overflow-hidden p-0">
          <div className="border-b border-slate-100 bg-slate-50 px-5 py-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Demo credentials
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs text-slate-500">
                  <th className="px-5 py-3 font-medium">Role</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="hidden px-5 py-3 font-medium sm:table-cell">Password</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {STATIC_USERS.map((u) => (
                  <tr key={u.id}>
                    <td className="px-5 py-3 capitalize text-slate-800">{u.role}</td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-700">{u.email}</td>
                    <td className="hidden px-5 py-3 font-mono text-xs text-slate-600 sm:table-cell">
                      {u.password}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Container className="py-16 text-center">Loading…</Container>}>
      <LoginForm />
    </Suspense>
  );
}
