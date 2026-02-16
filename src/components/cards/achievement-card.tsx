import Image from "next/image";

interface AchievementCardProps {
  image: string;
  awardGiver: string;
  awardName: string;
}

export function AchievementCard({
  image,
  awardGiver,
  awardName,
}: AchievementCardProps) {
  return (
    <div className="bg-muted rounded-2xl p-4 flex flex-col gap-4">
      {/* Award Image */}
      <div className="relative w-full aspect-282/168 rounded-2xl overflow-hidden">
        <Image
          src={image}
          alt={awardName}
          fill
          className="object-cover"
          sizes="(max-width: 48rem) 100vw, (max-width: 75rem) 50vw, 33vw"
        />
      </div>

      {/* Award Info */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-normal leading-5 text-muted-foreground line-clamp-1">
          {awardGiver}
        </p>
        <p className="text-xl font-medium leading-7 text-foreground tracking-[-0.0313rem]">
          {awardName}
        </p>
      </div>
    </div>
  );
}
