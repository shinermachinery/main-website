import { EyeOpenIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const missionVisionType = defineType({
  name: "missionVision",
  title: "Mission & Vision",
  type: "document",
  icon: EyeOpenIcon,
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      initialValue: "Our Mission & Vision",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageSubtitle",
      title: "Page Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "missionTitle",
      title: "Mission Section Title",
      type: "string",
      initialValue: "Our Mission",
    }),
    defineField({
      name: "missionStatement",
      title: "Mission Statement",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "missionImage",
      title: "Mission Image",
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
      name: "visionTitle",
      title: "Vision Section Title",
      type: "string",
      initialValue: "Our Vision",
    }),
    defineField({
      name: "visionStatement",
      title: "Vision Statement",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "visionImage",
      title: "Vision Image",
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
  preview: {
    select: {
      title: "pageTitle",
    },
    prepare() {
      return {
        title: "Mission & Vision",
        subtitle: "Singleton Document",
      };
    },
  },
});
