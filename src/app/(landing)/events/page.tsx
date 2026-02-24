import { Suspense } from "react";
import { AchievementsSection } from "@/components/events/achievements-section";
import { AchievementsSectionSkeleton } from "@/components/events/achievements-section-skeleton";
import { CertificationsSection } from "@/components/events/certifications-section";
import { CertificationsSectionSkeleton } from "@/components/events/certifications-section-skeleton";
import { EventsSection } from "@/components/events/events-section";
import { EventsSectionSkeleton } from "@/components/events/events-section-skeleton";
import { pageMetadata } from "@/lib/site-config";

export const metadata = pageMetadata.events;

export default function EventsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-12 flex flex-col gap-40">
  
 
          <Suspense fallback={<EventsSectionSkeleton />}>
            <EventsSection />
          </Suspense>
          <Suspense fallback={<CertificationsSectionSkeleton />}>
            <CertificationsSection />
          </Suspense>
          <Suspense fallback={<AchievementsSectionSkeleton />}>
            <AchievementsSection />
          </Suspense>
 
    </div>
  );
}
