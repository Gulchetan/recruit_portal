"use client";

import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/cn";

type Variant = "nav" | "menu" | "dashboard";

export function LogoutButton({
  variant = "nav",
  className,
  onLoggedOut,
}: {
  variant?: Variant;
  className?: string;
  onLoggedOut?: () => void;
}) {
  const { logout } = useAuth();

  function handleClick() {
    onLoggedOut?.();
    logout();
  }

  if (variant === "menu") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "tb-btn-secondary w-full border-red-200/80 text-red-700 hover:border-red-300 hover:bg-red-50 hover:text-red-800",
          className
        )}
      >
        <LogOut className="h-4 w-4" aria-hidden />
        Log out
      </button>
    );
  }

  if (variant === "dashboard") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-700",
          className
        )}
      >
        <LogOut className="h-4 w-4" aria-hidden />
        Log out
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      title="Log out and clear local data"
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        className
      )}
    >
      <LogOut className="h-4 w-4 shrink-0" aria-hidden />
      <span className="hidden sm:inline">Log out</span>
    </button>
  );
}
