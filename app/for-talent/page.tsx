import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { CATEGORY_LABELS, type JobCategory } from "@/lib/types";

const specialisms: { cat: JobCategory; blurb: string }[] = [
  { cat: "engineering", blurb: "Plant, mechanical, and industrial engineering roles." },
  { cat: "it", blurb: "Software, infrastructure, and digital product careers." },
  { cat: "finance", blurb: "Accounting, FP&A, and financial advisory." },
  { cat: "hr", blurb: "HR business partners, talent acquisition, and admin." },
  { cat: "sales", blurb: "Sales, trade marketing, and retail leadership." },
  { cat: "warehouse", blurb: "Supply chain, logistics, and warehouse operations." },
  { cat: "marketing", blurb: "Brand, communications, and PR consulting." },
  { cat: "business", blurb: "Operations and general management." },
];

export default function ForTalentPage() {
  return (
    <>
      <PageHero
        title="Careers with a specialist in your corner"
        description="Operational, professional, and digital desks across India — consultants who know your market, not a generic inbox."
      />
      <Container className="py-12 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {specialisms.map((s) => (
            <Link key={s.cat} href={`/jobs?category=${s.cat}`} className="tb-card group p-6">
              <h2 className="text-lg font-semibold text-slate-900">
                {CATEGORY_LABELS[s.cat]}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                View jobs
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <section className="tb-card mt-14 p-8 sm:p-10">
          <h2 className="text-xl font-semibold text-slate-900">Career advice</h2>
          <ul className="mt-4 space-y-3 text-slate-700">
            <li className="flex gap-2">
              <span className="text-brand">•</span>
              Tailor your resume to each role and quantify your impact.
            </li>
            <li className="flex gap-2">
              <span className="text-brand">•</span>
              Prepare structured examples for competency-based interviews.
            </li>
            <li className="flex gap-2">
              <span className="text-brand">•</span>
              Never pay third parties claiming to represent TalentBridge.
            </li>
          </ul>
          <Link href="/register?role=seeker" className="tb-btn-primary mt-8 inline-flex">
            Join talent pool
          </Link>
        </section>
      </Container>
    </>
  );
}
