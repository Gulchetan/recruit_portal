import { Suspense } from "react";
import { JobSearchBar } from "@/components/jobs/JobSearchBar";
import { JobsListClient } from "@/components/jobs/JobsListClient";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

async function JobsContent({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : undefined;
  const location = typeof sp.location === "string" ? sp.location : undefined;
  const category = typeof sp.category === "string" ? sp.category : undefined;
  const contractType =
    typeof sp.contractType === "string" ? sp.contractType : undefined;
  const radius = typeof sp.radius === "string" ? sp.radius : "25";

  return (
    <Container className="pb-16 pt-8 sm:pt-10">
      <div className="max-w-4xl">
        <JobSearchBar
          initialQ={q ?? ""}
          initialLocation={location ?? ""}
          initialRadius={radius}
          variant="inline"
        />
      </div>
      <div className="mt-10">
        <JobsListClient
          q={q}
          location={location}
          category={category}
          contractType={contractType}
        />
      </div>
    </Container>
  );
}

export default function JobsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <>
      <PageHero
        title="Roles worth your time"
        description="Filter by skill, city, and contract. Featured roles first. Applied status shows instantly after you submit."
      />
      <Suspense
        fallback={
          <Container className="py-12 text-center text-slate-500">Loading jobs…</Container>
        }
      >
        <JobsContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}
