import { siteShellClass } from "@/lib/site-layout";
import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  narrow,
}: {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div className={cn(siteShellClass(narrow), "!max-w-[1440px]", className)}>
      {children}
    </div>
  );
}

/** Full-width band (background edge-to-edge) with inner content aligned to the navbar. */
export function PageBand({
  children,
  className,
  innerClassName,
  narrow,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  narrow?: boolean;
} & React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("w-full", className)} {...rest}>
      <Container narrow={narrow} className={cn("!max-w-[1440px]", innerClassName)}>
        {children}
      </Container>
    </div>
  );
}
