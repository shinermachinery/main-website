import { CheckmarkCircleIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const whyChooseUsType = defineType({
  name: "whyChooseUs",
  title: "Why Choose Us",
  type: "document",
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: "title",
      title: "Main Title",
      type: "string",
      initialValue: "Why Choose Us",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          // Styles let you define what blocks can be marked up as. The default
          // set corresponds with HTML tags, but you can set any title or value
          // you want, and decide how you want to deal with it where you want to
          // use your content.
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          // Marks let you mark up inline text in the Portable Text Editor
          marks: {
            // Decorators usually describe a single property – e.g. a typographic
            // preference or highlighting
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            // Annotations can be any object structure – e.g. a link or a footnote.
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
      name: "missionStatement",
      title: "Mission Statement",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "visionStatement",
      title: "Vision Statement",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "reasons",
      title: "Reasons to Choose Us",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "reason",
          fields: [
            defineField({
              name: "title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Icon/Image",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: "alt",
                  type: "string",
                  title: "Alternative text",
                }),
              ],
            }),
            defineField({
              name: "order",
              type: "number",
              title: "Display Order",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
              media: "icon",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "heroImage",
    },
  },
});
