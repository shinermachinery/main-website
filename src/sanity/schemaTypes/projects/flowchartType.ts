import { defineField, defineType } from "sanity";

export const flowchartType = defineType({
  name: "flowchart",
  title: "Flowchart",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Flow Chart of Rice Re-Processing Plant",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Brief description of the flowchart",
    }),
    defineField({
      name: "image",
      title: "Flowchart Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: "The flowchart diagram image",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 1,
      description: "Order for displaying multiple flowcharts",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
