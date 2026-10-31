import { PageBand } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const quotes = [
  {
    quote:
      "I had an offer in 11 days. The consultant actually read my resume instead of keyword-matching me into a call center.",
    name: "Ananya R.",
    role: "Full stack engineer, Bengaluru",
  },
  {
    quote:
      "We filled a warehouse leadership bench without drowning in CVs. Shortlists were tight and interview-ready.",
    name: "Vikram S.",
    role: "Plant HR head, Hosur",
  },
  {
    quote:
      "Zero fee, zero drama. The apply flow is honest — I can see what I submitted and when.",
    name: "Meera K.",
    role: "Finance analyst, Mumbai",
  },
];

export function Testimonials() {
  return (
    <PageBand className="bg-ink py-16 text-white sm:py-24" data-animate="section">
      <SectionHeading
        light
        eyebrow="Proof, not slogans"
        title="People who switched — and stayed."
        description="Real outcomes from seekers and hiring managers on this platform."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {quotes.map((q) => (
          <blockquote
            key={q.name}
            className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-7"
          >
            <p className="flex-1 font-serif text-xl leading-relaxed text-white/95">
              “{q.quote}”
            </p>
            <footer className="mt-6 text-sm">
              <cite className="not-italic font-semibold text-gold">{q.name}</cite>
              <p className="mt-0.5 text-white/55">{q.role}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </PageBand>
  );
}
