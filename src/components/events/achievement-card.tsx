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
    <div className="bg-[#f9f9fb] rounded-2xl p-4 flex flex-col gap-4">
      {/* Award Image */}
      <div className="relative w-full aspect-[282/168] rounded-2xl overflow-hidden">
        <Image
          src={image}
          alt={awardName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Award Info */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-normal leading-5 text-zinc-500 line-clamp-1">
          {awardGiver}
        </p>
        <p className="text-xl font-medium leading-7 text-zinc-900 tracking-[-0.5px]">
          {awardName}
        </p>
      </div>
    </div>
  );
}
