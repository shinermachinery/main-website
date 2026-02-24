import { Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { PortableText } from "@/components/blog/portable-text";
import { BLUR_DATA_URL } from "@/lib/image-blur";
import { pageMetadata } from "@/lib/site-config";
import { getTeamMembersExcludingDirector } from "@/actions/about";
import { urlFor } from "@/sanity/lib/image";

export const metadata = pageMetadata.about;

async function TeamContent() {
  const members = await getTeamMembersExcludingDirector();

  if (members.length === 0) return null;

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <h1 className="font-medium text-3xl text-foreground">Our Team</h1>
        <p className="text-lg text-muted-foreground">
          Meet the people behind Shiner who make precision engineering possible.
        </p>
      </section>

      <div className="flex flex-col gap-12 lg:gap-20">
        {members.map((member) => (
          <section
            key={member._id}
            className="flex flex-col lg:flex-row gap-8 lg:gap-16"
          >
            {/* Left: Photo & Contact */}
            <div className="lg:w-96 flex flex-col gap-8">
              {member.image && (
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden">
                  <Image
                    src={urlFor(member.image).url()}
                    alt={member.image.alt || member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 64rem) 100vw, 25rem"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <h2 className="font-medium text-2xl text-foreground">
                  {member.name}
                </h2>
                <p className="font-medium text-sm text-muted-foreground">
                  {member.role}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {member.contactEmail && (
                  <Link
                    href={`mailto:${member.contactEmail}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-brand-blue transition-colors"
                  >
                    <Mail className="size-5" />
                    <span className="font-normal text-sm">
                      {member.contactEmail}
                    </span>
                  </Link>
                )}
                {member.phone && (
                  <Link
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-brand-blue transition-colors"
                  >
                    <Phone className="size-5" />
                    <span className="font-normal text-sm">{member.phone}</span>
                  </Link>
                )}
                {member.linkedin && (
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-brand-blue transition-colors"
                  >
                    <Linkedin className="size-5" />
                    <span className="font-normal text-sm">
                      LinkedIn Profile
                    </span>
                  </Link>
                )}
              </div>
            </div>

            {/* Right: Biography & Achievements */}
            <div className="flex-1 flex flex-col gap-10">
              {member.bio && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-medium text-xl text-foreground">
                    Biography
                  </h3>
                  <div className="prose prose-lg max-w-none">
                    <PortableText value={member.bio} />
                  </div>
                </div>
              )}

              {member.achievements && member.achievements.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-medium text-xl text-foreground">
                    Key Achievements
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {member.achievements.map((achievement: string) => (
                      <li key={achievement} className="flex gap-3 items-start">
                        <div className="w-1 h-1 rounded-full bg-brand-blue mt-2 shrink-0" />
                        <p className="font-normal text-sm text-muted-foreground">
                          {achievement}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function TeamSkeleton() {
  return (
    <div className="flex flex-col gap-10 animate-pulse">
      <section className="flex flex-col gap-4">
        <div className="h-12 bg-muted rounded-md w-48" />
        <div className="h-7 bg-muted rounded-md w-96" />
      </section>
      {Array.from({ length: 3 }).map((_, i) => (
        <section key={i} className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="lg:w-96 flex flex-col gap-8">
            <div className="aspect-square rounded-3xl bg-muted" />
            <div className="flex flex-col gap-2">
              <div className="h-10 bg-secondary rounded-md w-48" />
              <div className="h-6 bg-secondary rounded-md w-64" />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <div className="h-8 bg-secondary rounded-md w-32" />
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-6 bg-secondary rounded-md w-full" />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <Suspense fallback={<TeamSkeleton />}>
        <TeamContent />
      </Suspense>
    </div>
  );
}
