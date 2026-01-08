import type { Metadata } from "next";
import { Suspense } from "react";
import { ClientsListSection } from "@/components/projects/clients-list-section";
import { ClientsListSectionSkeleton } from "@/components/projects/clients-list-section-skeleton";
import { FlowChartSection } from "@/components/projects/flowchart-section";
import { InstallationsSection } from "@/components/projects/installations-section";
import { InstallationsSectionSkeleton } from "@/components/projects/installations-section-skeleton";
import { OtherClientsSection } from "@/components/projects/other-clients-section";
import { OtherClientsSectionSkeleton } from "@/components/projects/other-clients-section-skeleton";

export const metadata: Metadata = {
  title: "Our Products | SHINER",
  description:
    "Explore our installations, flow charts, and client projects. Precision engineering solutions for food processing plants.",
};

export default async function ProductsPage() {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-6 py-24">
        {/* All sections with 160px gap between them */}
        <div className="flex flex-col xl:gap-40 gap-20">
          <Suspense fallback={<InstallationsSectionSkeleton />}>
            <InstallationsSection />
          </Suspense>

          <FlowChartSection />

          <Suspense fallback={<ClientsListSectionSkeleton />}>
            <ClientsListSection />
          </Suspense>

          <Suspense fallback={<OtherClientsSectionSkeleton />}>
            <OtherClientsSection />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
