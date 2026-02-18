import { Suspense } from "react";
import { AchievementsSection } from "@/components/events/achievements-section";
import { CertificationsSection } from "@/components/events/certifications-section";
import { EventsSection } from "@/components/events/events-section";
import { pageMetadata } from "@/lib/site-config";

export const metadata = pageMetadata.events;

export default function EventsPage() {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col gap-40">
          <Suspense>
            <EventsSection />
          </Suspense>
          <Suspense>
            <CertificationsSection />
          </Suspense>
          <Suspense>
            <AchievementsSection />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
