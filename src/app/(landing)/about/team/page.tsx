import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { BLUR_DATA_URL } from "@/lib/image-blur";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/site-config";
import { getTeamMembers } from "@/sanity/lib/actions";

export const metadata = pageMetadata.about;

async function TeamContent() {
  const members = await getTeamMembers();

  if (members.length === 0) return null;

  return (
    <div className="flex flex-col gap-10">
      <SectionHeading
        as="h1"
        title="Our Team"
        description="Meet the people behind Shiner who make precision engineering possible."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex flex-col gap-6 rounded-2xl bg-background p-6"
          >
            {/* Photo */}
            {member.image && (
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>
            )}

            {/* Name & Role */}
            <div className="flex flex-col gap-1">
              <h2 className="font-medium text-xl text-foreground">
                {member.name}
              </h2>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>

            {/* Bio */}
            {member.bio && (
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            )}

            {/* Contact */}
            {member.email && (
              <Link
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-blue transition-colors"
              >
                <Mail className="size-4" />
                {member.email}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamSkeleton() {
  return (
    <div className="flex flex-col gap-10 animate-pulse">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 bg-muted rounded-md w-48" />
        <div className="h-6 bg-muted rounded-md w-96" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-6 rounded-2xl bg-background p-6">
            <div className="aspect-square rounded-2xl bg-muted" />
            <div className="flex flex-col gap-2">
              <div className="h-7 bg-muted rounded-md w-40" />
              <div className="h-5 bg-muted rounded-md w-32" />
            </div>
            <div className="h-16 bg-muted rounded-md w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <Suspense fallback={<TeamSkeleton />}>
          <TeamContent />
        </Suspense>
      </div>
    </div>
  );
}
