import { Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PortableText } from "@/components/blog/portable-text";
import { BLUR_DATA_URL } from "@/lib/image-blur";
import { pageMetadata } from "@/lib/site-config";
import { getDirector } from "@/actions/about";

export const metadata = pageMetadata.aboutDirector;

async function DirectorContent() {
  const data = await getDirector();

  if (!data) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Page Header */}
      <section className="flex flex-col gap-4">
        <h1 className="font-medium text-3xl text-foreground">
          Meet Our Director
        </h1>
      </section>

      {/* Director Profile */}
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Left: Photo & Contact */}
        <div className="lg:w-96 flex flex-col gap-8">
          {/* Photo */}
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden">
            <Image
              src={data.image}
              alt={data.name}
              fill
              className="object-cover"
              sizes="(max-width: 64rem) 100vw, 25rem"
              priority
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>

          {/* Name & Title */}
          <div className="flex flex-col gap-2">
            <h2 className="font-medium text-2xl text-foreground">
              {data.name}
            </h2>
            <p className="font-medium text-sm text-muted-foreground">
              {data.title}
            </p>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-4">
            {data.email && (
              <Link
                href={`mailto:${data.email}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-brand-blue transition-colors"
              >
                <Mail className="size-5" />
                <span className="font-normal text-sm">
                  {data.email}
                </span>
              </Link>
            )}
            {data.phone && (
              <Link
                href={`tel:${data.phone}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-brand-blue transition-colors"
              >
                <Phone className="size-5" />
                <span className="font-normal text-sm">
                  {data.phone}
                </span>
              </Link>
            )}
            {data.linkedin && (
              <Link
                href={data.linkedin}
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
          {/* Biography */}
          {data.bio && (
            <div className="flex flex-col gap-4">
              <h3 className="font-medium text-xl text-foreground">
                Biography
              </h3>
              <div className="prose prose-sm max-w-none">
                <PortableText value={data.bio} />
              </div>
            </div>
          )}

          {/* Key Achievements */}
          {data.achievements && data.achievements.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="font-medium text-xl text-foreground">
                Key Achievements
              </h3>
              <ul className="flex flex-col gap-3">
                {data.achievements.map((achievement: string, index: number) => (
                  <li key={achievement} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
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
    </div>
  );
}

function DirectorSkeleton() {
  return (
    <div className="flex flex-col gap-10 animate-pulse">
      <section className="flex flex-col gap-4">
        <div className="h-12 bg-muted rounded-md w-80" />
        <div className="h-7 bg-muted rounded-md w-96" />
      </section>
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        <div className="lg:w-96 flex flex-col gap-8">
          <div className="aspect-square rounded-3xl bg-muted" />
          <div className="flex flex-col gap-2">
            <div className="h-10 bg-secondary rounded-md w-48" />
            <div className="h-6 bg-secondary rounded-md w-64" />
          </div>
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-5 bg-secondary rounded-md w-full" />
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="h-8 bg-secondary rounded-md w-32" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-6 bg-secondary rounded-md w-full" />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-8 bg-secondary rounded-md w-48" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-6 bg-secondary rounded-md w-full" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function DirectorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
  
        <Suspense fallback={<DirectorSkeleton />}>
          <DirectorContent />
        </Suspense>
      
    </div>
  );
}
