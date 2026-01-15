import { PackageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      description: "Add multiple product images (max 5 for thumbnails)",
      of: [
        defineArrayMember({
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
      ],
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      description: "Main product features displayed in the hero section",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "specifications",
      title: "Specifications",
      type: "array",
      description: "Detailed technical specifications",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Display Order",
      description: "Lower numbers appear first",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "images.0",
      order: "order",
    },
    prepare(selection) {
      const { title, order } = selection;
      return {
        ...selection,
        subtitle: order ? `Order: ${order}` : "No order set",
      };
    },
  },
});
