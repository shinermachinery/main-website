import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const installationType = defineType({
  name: "installation",
  title: "Installation",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Installation Images",
      type: "array",
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
      description: "Installation images (first image is used as thumbnail)",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "reference",
      to: [{ type: "client" }],
      description: "Link to client (optional)",
    }),
    defineField({
      name: "machineryType",
      title: "Machinery Type",
      type: "string",
      description: "Type of machinery installed (shown as badge)",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Installation location",
    }),
  ],
  preview: {
    select: {
      title: "title",
      machineryType: "machineryType",
      location: "location",
      media: "images.0",
    },
    prepare(selection) {
      const { title, machineryType, location } = selection;
      return {
        ...selection,
        subtitle: `${machineryType || ""}${location ? ` - ${location}` : ""}`,
      };
    },
  },
});
