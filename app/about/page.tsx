import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { BRAND } from "@/lib/constants";

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About TalentBridge India"
        description="A specialist recruitment partner built around equity, speed, and honest process — not volume spam."
      />
      <Container narrow className="py-12 sm:py-16">
        <div className="prose prose-slate max-w-none space-y-6 text-base leading-relaxed text-slate-700">
          <p>
            {BRAND.name} is a specialist recruitment partner for India. We combine human
            consultants with a product that is faster and clearer than traditional agency
            sites: live filters, instant Applied status, and zero candidate fees. This demo
            stores data in your browser so you can explore the full flow without a backend.
          </p>
          <h2 id="career" className="text-xl font-semibold text-slate-900">
            Career advice
          </h2>
          <p>
            Explore roles on our{" "}
            <Link href="/jobs" className="font-semibold text-brand hover:underline">
              job search
            </Link>{" "}
            page, refine your profile, and prepare for structured interviews with hiring
            managers.
          </p>
          <h2 id="scam" className="text-xl font-semibold text-slate-900">
            Beware of job scams
          </h2>
          <p>
            {BRAND.name} does not charge candidates for registration, interviews, or placement.
            Do not transfer money to anyone claiming to represent us. Report suspicious
            activity through our{" "}
            <Link href="/contact" className="font-semibold text-brand hover:underline">
              contact form
            </Link>
            .
          </p>
          <h2 className="text-xl font-semibold text-slate-900">Offices</h2>
          <p>Bengaluru · Chennai · Hyderabad · Kolkata · Mumbai · New Delhi</p>
        </div>
      </Container>
    </>
  );
}
