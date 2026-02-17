import { ChevronLeft, ChevronRight } from "lucide-react";
import { AchievementCard } from "@/components/cards/achievement-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAchievements } from "@/sanity/lib/actions";
import { Button } from "../ui/button";

export async function AchievementsSection() {
  const achievements = await getAchievements(3);

  if (achievements.length === 0) return null;

  return (
    <section className="flex flex-col gap-10 w-full">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between">
        <SectionHeading title="Our Achievements" />

        {/* <div className="flex gap-4">
            <Button
              variant="shiner"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
              aria-label="Previous achievements"
            >
              <ChevronLeft className="w-6 h-6 text-white" strokeWidth={2} />
            </Button>
            <Button
              variant="shiner"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
              aria-label="Next achievements"
            >
              <ChevronRight className="w-6 h-6 text-white" strokeWidth={2} />
            </Button>
        </div> */}
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {achievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            image={achievement.image}
            awardGiver={achievement.awardGiver}
            awardName={achievement.awardName}
          />
        ))}
      </div>
    </section>
  );
}
