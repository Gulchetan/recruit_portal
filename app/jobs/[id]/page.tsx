import { Suspense } from "react";
import { JobDetailClient } from "@/components/jobs/JobDetailClient";

async function JobDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <JobDetailClient id={id} />;
}

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading…</div>}>
      <JobDetailContent params={params} />
    </Suspense>
  );
}
