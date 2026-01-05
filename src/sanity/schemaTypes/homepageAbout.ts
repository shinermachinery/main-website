import { defineType, defineField } from 'sanity'

export const homepageAboutType = defineType({
  name: 'homepageAbout',
  title: 'Homepage About Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionHeading',
      title: 'Section Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main heading for the about section',
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
      description: 'Your company mission statement',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short, memorable tagline (e.g., "Built to Perform, Built to Last")',
    }),
    defineField({
      name: 'features',
      title: 'Feature Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Quality', value: 'quality' },
                  { title: 'Innovation', value: 'innovation' },
                  { title: 'Support', value: 'support' },
                  { title: 'Speed', value: 'speed' },
                  { title: 'Trust', value: 'trust' },
                  { title: 'Global', value: 'global' },
                  { title: 'Shield', value: 'shield' },
                  { title: 'Settings', value: 'settings' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(4).warning('Maximum 4 features recommended for optimal display'),
    }),
    defineField({
      name: 'image',
      title: 'Section Image (Optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional image to display in the about section',
    }),
  ],
})