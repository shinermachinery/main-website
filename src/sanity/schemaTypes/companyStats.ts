import { defineType, defineField } from 'sanity'

export const companyStatsType = defineType({
  name: 'companyStats',
  title: 'Company Statistics',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionHeading',
      title: 'Section Heading',
      type: 'string',
      description: 'Optional heading for the stats section',
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'The statistic value (e.g., "500+", "15", "98%")',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'What this statistic represents (e.g., "Companies Served", "Years Experience")',
            }),
            defineField({
              name: 'prefix',
              title: 'Prefix (Optional)',
              type: 'string',
              description: 'Optional prefix for the value (e.g., "$", "+")',
            }),
            defineField({
              name: 'suffix',
              title: 'Suffix (Optional)',
              type: 'string',
              description: 'Optional suffix for the value (e.g., "%", "+", "k")',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Companies', value: 'building' },
                  { title: 'Products', value: 'package' },
                  { title: 'Years', value: 'calendar' },
                  { title: 'Awards', value: 'award' },
                  { title: 'Team', value: 'users' },
                  { title: 'Globe', value: 'globe' },
                  { title: 'Target', value: 'target' },
                  { title: 'Growth', value: 'trending-up' },
                ],
              },
              description: 'Icon to display with the statistic',
            }),
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.min(1)
          .max(4)
          .warning('Recommended: 3-4 statistics for optimal display'),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Style',
      type: 'string',
      options: {
        list: [
          { title: 'Default (Gradient)', value: 'gradient' },
          { title: 'Solid', value: 'solid' },
          { title: 'Transparent', value: 'transparent' },
        ],
      },
      initialValue: 'gradient',
      description: 'Background style for the stats section',
    }),
  ],
})