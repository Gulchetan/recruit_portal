import { siteShellClass } from "@/lib/site-layout";
import { cn } from "@/lib/cn";

/** Same horizontal box as Container — use inside full-bleed headers/sections. */
export function SiteShell({
  children,
  className,
  narrow,
}: {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return <div className={cn(siteShellClass(narrow), className)}>{children}</div>;
}
