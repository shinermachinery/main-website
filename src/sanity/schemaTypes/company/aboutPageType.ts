import { InfoOutlineIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    // Hero Section
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      initialValue: "About Shiner",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 3,
    }),

    // Who We Are Section
    defineField({
      name: "whoWeAre",
      title: "Who We Are",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          initialValue: "Who We Are",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "array",
          of: [
            defineArrayMember({
              type: "block",
              styles: [
                { title: "Normal", value: "normal" },
                { title: "H2", value: "h2" },
                { title: "H3", value: "h3" },
                { title: "Quote", value: "blockquote" },
              ],
              lists: [{ title: "Bullet", value: "bullet" }],
              marks: {
                decorators: [
                  { title: "Strong", value: "strong" },
                  { title: "Emphasis", value: "em" },
                ],
                annotations: [
                  {
                    title: "URL",
                    name: "link",
                    type: "object",
                    fields: [
                      {
                        title: "URL",
                        name: "href",
                        type: "url",
                      },
                    ],
                  },
                ],
              },
            }),
          ],
        }),
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
            }),
          ],
        }),
      ],
    }),

    // Mission Section
    defineField({
      name: "mission",
      title: "Mission",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          initialValue: "Our Mission",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 5,
        }),
      ],
    }),

    // Vision Section
    defineField({
      name: "vision",
      title: "Vision",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          initialValue: "Our Vision",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 5,
        }),
      ],
    }),

    // Features (Why Choose Us)
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      description: "Key features/reasons to choose us",
      of: [
        defineArrayMember({
          type: "object",
          name: "feature",
          fields: [
            defineField({
              name: "icon",
              title: "Icon Name",
              type: "string",
              description: "Icon identifier (e.g., 'shield', 'clock', 'star')",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        }),
      ],
    }),

    // Bottom Features (additional feature cards)
    defineField({
      name: "bottomFeatures",
      title: "Bottom Features",
      type: "array",
      description: "Additional feature cards at bottom of page",
      of: [
        defineArrayMember({
          type: "object",
          name: "bottomFeature",
          fields: [
            defineField({
              name: "icon",
              title: "Icon Name",
              type: "string",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        }),
      ],
    }),

    // SEO
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Meta Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Meta Description",
          type: "text",
          rows: 3,
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About Page",
        subtitle: "Singleton Document",
      };
    },
  },
});
