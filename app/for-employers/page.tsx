import { VacancyForm } from "@/components/forms/VacancyForm";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

const services = [
  "Executive search",
  "Permanent recruitment",
  "Temporary & contract staffing",
  "Talent acquisition outsourcing",
  "Payroll & managed services",
  "Workforce advisory",
];

export default function ForEmployersPage() {
  return (
    <>
      <PageHero
        title="Hiring that doesn’t drown you in CVs"
        description="Specialist consultants across operational, professional, and digital domains — shortlists, not spam."
      />
      <Container className="py-12 sm:py-16">
        <section id="services" className="scroll-mt-28">
          <h2 className="text-xl font-semibold text-slate-900">Our services</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li
                key={s}
                className="rounded-xl border border-slate-200 bg-surface px-4 py-4 text-sm font-medium text-slate-800 shadow-sm"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section id="vacancy" className="mt-16 scroll-mt-28">
          <h2 className="text-xl font-semibold text-slate-900">Submit a vacancy</h2>
          <p className="mt-2 max-w-xl text-slate-600">
            Tell us about your hiring need. Submissions appear in the admin panel for this
            demo environment.
          </p>
          <div className="tb-card mt-8 max-w-3xl p-6 sm:p-8">
            <VacancyForm />
          </div>
        </section>
      </Container>
    </>
  );
}
