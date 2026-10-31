"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { BrandMark } from "@/components/ui/BrandMark";
import { ChevronDown, Menu, Phone, Search, User, X } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { useAuth } from "@/hooks/useAuth";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/cn";

const navItems = [
  {
    label: "Find a job",
    href: "/jobs",
    match: ["/jobs"],
    children: [
      { label: "Current openings", href: "/jobs" },
      { label: "Submit your CV", href: "/register?role=seeker" },
      { label: "Contract roles", href: "/jobs?contractType=contract" },
      { label: "Permanent roles", href: "/jobs?contractType=permanent" },
    ],
  },
  {
    label: "For talent",
    href: "/for-talent",
    match: ["/for-talent"],
    children: [
      { label: "Specialisms", href: "/for-talent" },
      { label: "Career advice", href: "/about#career" },
      { label: "Join talent pool", href: "/register?role=seeker" },
    ],
  },
  {
    label: "For employers",
    href: "/for-employers",
    match: ["/for-employers"],
    children: [
      { label: "Submit a vacancy", href: "/for-employers#vacancy" },
      { label: "Our services", href: "/for-employers#services" },
      { label: "Request a callback", href: "/contact" },
    ],
  },
  {
    label: "About",
    href: "/about",
    match: ["/about"],
  },
  {
    label: "Contact",
    href: "/contact",
    match: ["/contact"],
  },
];

function isNavActive(pathname: string, item: (typeof navItems)[number]): boolean {
  if (item.match?.some((m) => pathname === m || pathname.startsWith(`${m}/`))) {
    return true;
  }
  return pathname === item.href;
}

function NavLink({
  item,
  pathname,
  openDropdown,
  setOpenDropdown,
}: {
  item: (typeof navItems)[number];
  pathname: string;
  openDropdown: string | null;
  setOpenDropdown: (v: string | null) => void;
}) {
  const active = isNavActive(pathname, item);
  const open = openDropdown === item.label;

  const linkClass = cn(
    "relative inline-flex h-11 items-center gap-1 whitespace-nowrap px-3 text-[13px] font-semibold tracking-wide text-slate-700 transition lg:px-4 lg:text-sm",
    "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-brand after:transition-transform after:duration-200",
    active
      ? "text-brand after:scale-x-100"
      : "hover:text-brand after:scale-x-0 hover:after:scale-x-100"
  );

  if (!item.children) {
    return (
      <Link href={item.href} className={linkClass}>
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenDropdown(item.label)}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <Link href={item.href} className={linkClass} aria-expanded={open}>
        {item.label}
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 opacity-50 transition", open && "rotate-180")}
        />
      </Link>
      {/* Hover bridge */}
      <div className={cn("absolute left-0 top-full h-2 w-full", open ? "block" : "hidden")} />
      <div
        className={cn(
          "absolute left-1/2 top-[calc(100%+4px)] z-50 min-w-[260px] -translate-x-1/2 rounded-xl border border-slate-200/90 bg-white p-2 shadow-xl ring-1 ring-slate-900/5 transition",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0 pointer-events-none"
        )}
      >
        <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {item.label}
        </p>
        {item.children.map((child) => (
          <Link
            key={child.href + child.label}
            href={child.href}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-brand"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function HeaderContent() {
  const pathname = usePathname();
  const { session } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="border-b border-white/10 bg-ink text-white">
        <Container>
          <div className="flex min-h-9 flex-col items-center justify-between gap-1 py-2 text-xs sm:flex-row sm:text-sm">
            <p className="text-center text-white/90 sm:text-left">
              No recruitment fees for candidates.{" "}
              <Link
                href="/about#scam"
                className="font-semibold underline underline-offset-2 hover:text-white"
              >
                Security advice
              </Link>
            </p>
            <div className="flex items-center gap-4 text-white/90">
              <a
                href="tel:+911234567890"
                className="hidden items-center gap-1.5 font-medium hover:text-white md:inline-flex"
              >
                <Phone className="h-3.5 w-3.5" />
                +91 123 456 7890
              </a>
              <Link href="/contact" className="font-semibold hover:text-white">
                Contact us
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main bar — logo | centered nav | actions */}
      <div
        className={cn(
          "border-b border-slate-200 bg-white transition-shadow",
          scrolled && "shadow-md shadow-slate-900/5"
        )}
      >
        <Container className="!max-w-[1440px]">
          <div className="flex h-[4.25rem] w-full items-center gap-2 lg:h-[4.75rem] lg:gap-4">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <BrandMark />
              <span className="hidden flex-col leading-none sm:flex">
                <span className="text-[15px] font-bold tracking-tight text-ink lg:text-base">
                  TalentBridge
                </span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  India
                </span>
              </span>
            </Link>

            {/* Desktop nav — centered & evenly distributed */}
            <nav
              className="hidden min-w-0 flex-1 items-stretch justify-center lg:flex"
              aria-label="Main navigation"
            >
              <ul className="flex items-stretch justify-center gap-0 xl:gap-1">
                {navItems.map((item) => (
                  <li key={item.label} className="flex items-stretch">
                    <NavLink
                      item={item}
                      pathname={pathname}
                      openDropdown={openDropdown}
                      setOpenDropdown={setOpenDropdown}
                    />
                  </li>
                ))}
              </ul>
            </nav>

            {/* Actions */}
            <div className="ml-auto flex shrink-0 items-center justify-end gap-2 lg:gap-3">
              <Link
                href="/jobs"
                className="hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-brand hover:text-brand md:inline-flex"
                aria-label="Search jobs"
              >
                <Search className="h-4 w-4" />
              </Link>

              {session ? (
                <>
                  {session.role === "admin" && (
                    <Link
                      href="/admin"
                      className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-brand xl:inline"
                    >
                      Admin
                    </Link>
                  )}
                  <Link
                    href="/dashboard"
                    className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-brand/40 xl:inline-flex"
                  >
                    <User className="h-4 w-4 text-brand" />
                    My account
                  </Link>
                  <LogoutButton variant="nav" className="hidden md:inline-flex" />
                </>
              ) : (
                <>
                  <Link
                    href="/register?role=seeker"
                    className="hidden text-sm font-semibold text-slate-700 hover:text-brand xl:inline"
                  >
                    Register
                  </Link>
                  <Link href="/login" className="tb-btn-primary hidden !px-4 xl:inline-flex">
                    Log in
                  </Link>
                </>
              )}

              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-800 transition hover:bg-slate-50 lg:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-[min(100%,340px)] flex-col bg-white shadow-2xl">
            <div className="flex h-[4.25rem] items-center justify-between border-b border-slate-200 px-5">
              <span className="font-bold text-slate-900">{BRAND.name}</span>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100"
                onClick={() => setMobileOpen(false)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-2" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const hasChildren = !!item.children?.length;
                const expanded = mobileExpanded === item.label;
                const active = isNavActive(pathname, item);

                return (
                  <div key={item.label} className="border-b border-slate-100 last:border-0">
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        className={cn(
                          "flex-1 py-3.5 pl-2 text-[15px] font-semibold",
                          active ? "text-brand" : "text-slate-900"
                        )}
                        onClick={() => !hasChildren && setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {hasChildren && (
                        <button
                          type="button"
                          className="flex h-11 w-11 items-center justify-center text-slate-500"
                          aria-expanded={expanded}
                          onClick={() =>
                            setMobileExpanded(expanded ? null : item.label)
                          }
                        >
                          <ChevronDown
                            className={cn("h-5 w-5 transition", expanded && "rotate-180")}
                          />
                        </button>
                      )}
                    </div>
                    {hasChildren && expanded && (
                      <div className="space-y-0.5 pb-3 pl-4">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href + child.label}
                            href={child.href}
                            className="block rounded-lg py-2.5 pl-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-brand"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="space-y-2 border-t border-slate-200 bg-slate-50 p-4">
              <Link
                href="/jobs"
                className="tb-btn-secondary w-full"
                onClick={() => setMobileOpen(false)}
              >
                <Search className="h-4 w-4" />
                Search jobs
              </Link>
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="tb-btn-primary w-full"
                    onClick={() => setMobileOpen(false)}
                  >
                    My account
                  </Link>
                  <LogoutButton
                    variant="menu"
                    onLoggedOut={() => setMobileOpen(false)}
                  />
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="tb-btn-primary w-full"
                    onClick={() => setMobileOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="tb-btn-secondary w-full"
                    onClick={() => setMobileOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function HeaderFallback() {
  return (
    <header className="sticky top-0 z-50">
      <div className="h-9 bg-brand-dark" />
      <div className="border-b border-slate-200 bg-white">
        <Container>
          <div className="h-[4.25rem] lg:h-[4.75rem]" />
        </Container>
      </div>
    </header>
  );
}

export function Header() {
  return (
    <Suspense fallback={<HeaderFallback />}>
      <HeaderContent />
    </Suspense>
  );
}
