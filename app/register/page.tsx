"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Container } from "@/components/ui/Container";
import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/lib/types";

function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = (searchParams.get("role") as UserRole) || "seeker";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>(
    defaultRole === "employer" ? "employer" : "seeker"
  );
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = register({ name, email, password, role });
    if (err) {
      setError(err);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <Container narrow className="py-12 sm:py-16">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Create your account
          </h1>
          <p className="mt-2 text-slate-600">
            Profiles are stored on this device only — for demonstration purposes.
          </p>
        </div>

        <div className="tb-card mt-8 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">
                {error}
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Full name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="tb-input"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="tb-input"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
              <input
                required
                minLength={6}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="tb-input"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">I am a</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="tb-input"
              >
                <option value="seeker">Job seeker</option>
                <option value="employer">Employer</option>
              </select>
            </div>
            <button type="submit" className="tb-btn-primary w-full">
              Register
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">
            Already registered?{" "}
            <Link href="/login" className="font-semibold text-brand hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<Container className="py-16 text-center">Loading…</Container>}>
      <RegisterForm />
    </Suspense>
  );
}
