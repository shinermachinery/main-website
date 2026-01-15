import { defineType, defineField } from "sanity";

export const homepageFeaturesType = defineType({
  name: "homepageFeatures",
  title: "Homepage Features Section",
  type: "object",
  fields: [
    defineField({
      name: "sectionHeading",
      title: "Section Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Main heading for the features section",
    }),
    defineField({
      name: "sectionSubheading",
      title: "Section Subheading",
      type: "string",
      description: "Optional subheading or description for the section",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Precision", value: "crosshair" },
                  { title: "Engineering", value: "cog" },
                  { title: "Quality", value: "check-circle" },
                  { title: "Innovation", value: "lightbulb" },
                  { title: "Speed", value: "zap" },
                  { title: "Support", value: "headphones" },
                  { title: "Global", value: "globe" },
                  { title: "Security", value: "shield" },
                  { title: "Analytics", value: "chart" },
                  { title: "Automation", value: "cpu" },
                ],
              },
              validation: (Rule) => Rule.required(),
              description: "Icon to represent the feature",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required().max(50),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required().max(200),
            }),
            defineField({
              name: "link",
              title: "Link (Optional)",
              type: "object",
              fields: [
                defineField({
                  name: "text",
                  title: "Link Text",
                  type: "string",
                  description: 'Text for the link (e.g., "Learn More")',
                }),
                defineField({
                  name: "url",
                  title: "URL",
                  type: "string",
                  description: "Internal path or external URL",
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
              media: "icon",
            },
            prepare({ title, subtitle }) {
              return {
                title,
                subtitle,
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.min(1)
          .max(6)
          .warning("Recommended: 3-6 features for optimal display"),
    }),
    defineField({
      name: "layout",
      title: "Layout Style",
      type: "string",
      options: {
        list: [
          { title: "Grid (3 columns)", value: "grid-3" },
          { title: "Grid (2 columns)", value: "grid-2" },
          { title: "Cards", value: "cards" },
          { title: "List", value: "list" },
        ],
      },
      initialValue: "grid-3",
      description: "How the features should be displayed",
    }),
  ],
});
