import type { Metadata } from "next";
import { Suspense } from "react";
import { ClientsListSection } from "@/components/products/clients-list-section";
import { ClientsListSectionSkeleton } from "@/components/products/clients-list-section-skeleton";
import { FlowChartSection } from "@/components/products/flowchart-section";
import { InstallationsSection } from "@/components/products/installations-section";
import { InstallationsSectionSkeleton } from "@/components/products/installations-section-skeleton";
import { OtherClientsSection } from "@/components/products/other-clients-section";
import { OtherClientsSectionSkeleton } from "@/components/products/other-clients-section-skeleton";

export const metadata: Metadata = {
  title: "Our Products | SHINER",
  description:
    "Explore our installations, flow charts, and client projects. Precision engineering solutions for food processing plants.",
};

export default function ProductsPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-24">
        {/* All sections with 160px gap between them */}
        <div className="flex flex-col gap-40">
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
