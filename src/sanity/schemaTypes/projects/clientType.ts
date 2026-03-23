import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const clientType = defineType({
  name: "otherClient",
  title: "Other Client",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Company Logo",
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
      description: "Lower numbers appear first",
    }),
  ],
  preview: {
    select: {
      title: "companyName",
      media: "logo",
    },
  },
});
