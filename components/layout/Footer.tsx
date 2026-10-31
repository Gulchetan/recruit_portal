import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";
import { Container } from "@/components/ui/Container";
import { BRAND } from "@/lib/constants";

const columns = [
  {
    title: "Find a job",
    links: [
      { label: "Explore all jobs", href: "/jobs" },
      { label: "Submit your CV", href: "/register?role=seeker" },
      { label: "Join our team", href: "/jobs?q=talentbridge" },
      { label: "Refer a friend", href: "/contact" },
    ],
  },
  {
    title: "For talent",
    links: [
      { label: "Specialisms", href: "/for-talent" },
      { label: "Career advice", href: "/about" },
      { label: "Job scam awareness", href: "/about#scam" },
    ],
  },
  {
    title: "For employers",
    links: [
      { label: "Submit a vacancy", href: "/for-employers#vacancy" },
      { label: "Our services", href: "/for-employers" },
      { label: "Contact sales", href: "/contact" },
    ],
  },
  {
    title: "Browse by role",
    links: [
      { label: "Engineering", href: "/jobs?category=engineering" },
      { label: "Finance", href: "/jobs?category=finance" },
      { label: "IT & Digital", href: "/jobs?category=it" },
      { label: "Sales", href: "/jobs?category=sales" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-slate-800 bg-slate-950 text-slate-400">
      <Container className="py-12 lg:py-16 !max-w-[1440px]">
        <div className="flex flex-col gap-10 border-b border-slate-800 pb-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <BrandMark />
              <span className="text-lg font-semibold text-white">{BRAND.name}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Specialist recruitment across India. Human consultants, honest apply flow, and
              zero candidate fees — a sharper alternative to noisy job boards.
            </p>
            <Link
              href="/jobs"
              className="tb-btn-primary mt-6 inline-flex text-sm"
            >
              Search jobs
            </Link>
          </div>
          <div className="grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
          <div>
            <p>TalentBridge India Pvt. Ltd. · Chennai, Tamil Nadu · Demo application</p>
            <p className="mt-1">© 2026 {BRAND.name}. Data stored locally in your browser.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:justify-end">
            <Link href="/about" className="hover:text-slate-300">
              Privacy
            </Link>
            <Link href="/about" className="hover:text-slate-300">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-slate-300">
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
