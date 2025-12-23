'use client'

import Image from 'next/image'
import { imageBuilder } from '@/sanity/lib/image'

interface TeamMember {
  _id: string
  name: string
  role: string
  bio?: string
  image?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
}

interface TeamGridProps {
  teamMembers: TeamMember[]
}

export function TeamGrid({ teamMembers }: TeamGridProps) {
  if (!teamMembers || teamMembers.length === 0) {
    return (
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground">
              Team information coming soon!
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground">
              The experts behind precision engineering excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => {
              const imageUrl = member.image
                ? imageBuilder.image(member.image).width(400).height(400).url()
                : '/placeholder-avatar.jpg'

              return (
                <div
                  key={member._id}
                  className="group text-center space-y-4"
                >
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted mx-auto max-w-[280px]">
                    <Image
                      src={imageUrl}
                      alt={member.image?.alt || member.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 280px"
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-green">
                      {member.role}
                    </p>
                    {member.bio && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
