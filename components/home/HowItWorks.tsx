import { FileSearch, MessageSquare, Sparkles } from "lucide-react";
import { PageBand } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    n: "01",
    title: "Tell us what you want",
    desc: "Search by skill, city, or contract type — or join the talent pool and let consultants match you.",
    icon: FileSearch,
  },
  {
    n: "02",
    title: "Talk to a specialist",
    desc: "Human consultants, not a black-box portal. We prep you for interviews and salary conversations.",
    icon: MessageSquare,
  },
  {
    n: "03",
    title: "Land with confidence",
    desc: "Apply in one click, track status in your dashboard, and never pay a placement fee.",
    icon: Sparkles,
  },
];

export function HowItWorks() {
  return (
    <PageBand className="py-16 sm:py-24" data-animate="section">
      <SectionHeading
        eyebrow="How TalentBridge works"
        title="Faster than a job board. More human than an ATS."
        description="Randstad-style reach, with a product that actually respects your time."
      />
      <ol className="mt-12 grid gap-6 lg:grid-cols-3">
        {steps.map((s) => (
          <li key={s.n} className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <span className="font-serif text-5xl text-slate-200">{s.n}</span>
            <s.icon className="absolute right-6 top-7 h-6 w-6 text-brand" />
            <h3 className="mt-4 text-xl font-semibold text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
          </li>
        ))}
      </ol>
    </PageBand>
  );
}
