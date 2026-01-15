"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { AchievementCard } from "@/components/cards/achievement-card";
import { dummyAchievements } from "@/data/fallback/achievements";

async function getAchievements() {
  try {
    const achievements = await client.fetch(
      `*[_type == "achievement"] | order(order asc, _createdAt desc) {
        _id,
        awardName,
        awardGiver,
        image
      }[0...3]`,
    );

    if (!achievements || achievements.length === 0) {
      return dummyAchievements;
    }

    return achievements.map((achievement: any) => ({
      id: achievement._id,
      image: achievement.image
        ? urlFor(achievement.image).url()
        : dummyAchievements[0].image,
      awardGiver: achievement.awardGiver,
      awardName: achievement.awardName,
    }));
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return dummyAchievements;
  }
}

export function AchievementsSection() {
  const [achievements, setAchievements] = useState(dummyAchievements);

  useEffect(() => {
    getAchievements().then(setAchievements);
  }, []);
  return (
    <section className="flex flex-col gap-10 w-full">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between">
        <h2 className="text-[1.875rem] font-medium leading-10 text-foreground tracking-[-0.0469rem]">
          Our Achievements
        </h2>

        {/* Navigation Arrows */}
        <div className="flex gap-4">
          <button
            type="button"
            className="w-12 h-12 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{
              backgroundImage:
                "linear-gradient(93.30deg, rgb(42, 94, 152) 15.881%, rgb(24, 183, 90) 115.02%)",
            }}
            aria-label="Previous achievements"
          >
            <ChevronLeft className="w-6 h-6 text-white" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="w-12 h-12 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{
              backgroundImage:
                "linear-gradient(93.30deg, rgb(42, 94, 152) 15.881%, rgb(24, 183, 90) 115.02%)",
            }}
            aria-label="Next achievements"
          >
            <ChevronRight className="w-6 h-6 text-white" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} {...achievement} />
        ))}
      </div>
    </section>
  );
}
