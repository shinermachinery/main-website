import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Event Image",
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "eventDate",
      title: "Event Date",
      type: "datetime",
      description: "When did this event take place",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Event location (e.g., Patna, Karnal)",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which this event appears (lower numbers first)",
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      location: "location",
    },
    prepare(selection) {
      const { title, location } = selection;
      return {
        ...selection,
        subtitle: location || "No location",
      };
    },
  },
});
