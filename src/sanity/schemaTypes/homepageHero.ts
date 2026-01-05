import { defineType, defineField } from 'sanity'

export const homepageHeroType = defineType({
  name: 'homepageHero',
  title: 'Homepage Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Main Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The main headline that appears in the hero section',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'string',
      description: 'Supporting text below the main headline',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Detailed description text for the hero section',
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'link',
          title: 'Button Link',
          type: 'string',
          description: 'Internal path (e.g., /products) or external URL',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Button Link',
          type: 'string',
          description: 'Internal path (e.g., /contact) or external URL',
        }),
      ],
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image (Optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional background image for the hero section',
    }),
  ],
})