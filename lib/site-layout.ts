import { cn } from "@/lib/cn";

/** Shared horizontal rhythm — navbar, footer, and page content use the same shell. */
export const SITE_MAX_WIDTH = "max-w-[1440px]";

export const SITE_PADDING =
  "px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12";

export function siteShellClass(narrow?: boolean): string {
  return cn(
    "mx-auto w-full",
    SITE_PADDING,
    narrow ? "max-w-3xl" : SITE_MAX_WIDTH
  );
}
