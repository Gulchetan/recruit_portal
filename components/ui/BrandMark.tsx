import { cn } from "@/lib/cn";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-ink shadow-sm lg:h-11 lg:w-11",
        className
      )}
      aria-hidden
    >
      <svg viewBox="0 0 40 40" className="h-full w-full">
        <rect width="40" height="40" fill="#0B1F3A" />
        <path
          d="M8 26c6-12 18-12 24 0"
          fill="none"
          stroke="#5BA3FF"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M10 22c5-8 15-8 20 0"
          fill="none"
          stroke="#F4C15D"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="20" cy="14" r="2.4" fill="#fff" />
      </svg>
    </span>
  );
}
