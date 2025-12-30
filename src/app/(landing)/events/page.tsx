import type { Metadata } from "next";
import { AchievementsSection } from "@/components/events/achievements-section";
import { CertificationsSection } from "@/components/events/certifications-section";
import { EventsSection } from "@/components/events/events-section";

export const metadata: Metadata = {
  title: "Events | Shiner",
  description:
    "Explore our events, certifications, and achievements. See what we've accomplished and the recognition we've received.",
};

export default function EventsPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col gap-40">
          <EventsSection />
          <CertificationsSection />
          <AchievementsSection />
        </div>
      </div>
    </div>
  );
}
