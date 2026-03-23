import { StarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const achievementType = defineType({
  name: "achievement",
  title: "Achievement",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "awardName",
      title: "Award Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "awardGiver",
      title: "Award Giver",
      type: "string",
      description: "Organization or entity that gave the award",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Award Image",
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "awardDate",
      title: "Award Date",
      type: "datetime",
      description: "When was this award received",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Order in which this achievement appears (lower numbers first)",
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: "awardName",
      subtitle: "awardGiver",
      media: "image",
    },
  },
});
