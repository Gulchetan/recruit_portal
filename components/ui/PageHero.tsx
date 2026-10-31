import { PageBand } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

export function PageHero({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <PageBand
      className={cn("w-full border-b border-slate-200 bg-surface", className)}
      innerClassName="py-10 sm:py-14"
    >
      <h1 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
      {children}
    </PageBand>
  );
}
