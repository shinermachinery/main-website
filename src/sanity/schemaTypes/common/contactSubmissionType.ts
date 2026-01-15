import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const contactSubmissionType = defineType({
  name: "contactSubmission",
  title: "Contact Submission",
  type: "document",
  icon: EnvelopeIcon,
  readOnly: true, // Prevent manual editing in Studio
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Read", value: "read" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      status: "status",
      submittedAt: "submittedAt",
    },
    prepare(selection) {
      const { title, subtitle, status, submittedAt } = selection;
      const statusEmoji =
        status === "new" ? "🆕" : status === "read" ? "✅" : "📁";
      const date = submittedAt
        ? new Date(submittedAt).toLocaleDateString()
        : "No date";
      return {
        title: `${statusEmoji} ${title}`,
        subtitle: `${subtitle} - ${date}`,
      };
    },
  },
});
