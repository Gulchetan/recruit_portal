import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact us"
        description="Questions about hiring, applications, or security — we respond through this demo inbox."
      />
      <Container narrow className="pb-16 pt-8">
        <ContactForm />
      </Container>
    </>
  );
}
