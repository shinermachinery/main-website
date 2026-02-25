import { AchievementCard } from "@/components/cards/achievement-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Marquee } from "@/components/ui/marquee";
import { getAchievements } from "@/sanity/lib/actions";

export async function AchievementsSection() {
  const achievements = await getAchievements(10);

  if (achievements.length === 0) return null;

  return (
    <section className="flex flex-col gap-10 w-full">
      <SectionHeading title="Our Achievements" />

      <Marquee pauseOnHover className="[--duration:60s] [--gap:1.5rem]">
        {achievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            image={achievement.image}
            awardGiver={achievement.awardGiver}
            awardName={achievement.awardName}
          />
        ))}
      </Marquee>
    </section>
  );
}
