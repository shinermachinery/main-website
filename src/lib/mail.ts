import nodemailer from "nodemailer";
import { siteConfig } from "./site-config";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM_EMAIL = process.env.SMTP_FROM || siteConfig.email;
const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || siteConfig.email;

interface ContactEmailData {
  name: string;
  email: string;
  contactNumber: string;
  message: string;
}

export async function sendContactConfirmation(data: ContactEmailData) {
  await transporter.sendMail({
    from: `"${siteConfig.name}" <${FROM_EMAIL}>`,
    to: data.email,
    subject: `We received your message — ${siteConfig.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">Thank you for contacting us, ${data.name}!</h2>
        <p style="color: #555; line-height: 1.6;">
          We have received your message and our team will get back to you as soon as possible.
        </p>
        <div style="background: #f9f9f9; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 8px; color: #333;"><strong>Your message:</strong></p>
          <p style="margin: 0; color: #555; white-space: pre-wrap;">${data.message}</p>
        </div>
        <p style="color: #555; line-height: 1.6;">
          If you have any urgent queries, feel free to call us at <strong>${siteConfig.phone}</strong>.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #999; font-size: 12px;">
          This is an automated email from ${siteConfig.name}. Please do not reply directly to this email.
        </p>
      </div>
    `,
  });
}

export async function sendContactNotification(data: ContactEmailData) {
  await transporter.sendMail({
    from: `"${siteConfig.name} Website" <${FROM_EMAIL}>`,
    to: NOTIFY_EMAIL,
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #eee; font-weight: bold; color: #333;">Name</td>
            <td style="padding: 8px 12px; border: 1px solid #eee; color: #555;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #eee; font-weight: bold; color: #333;">Email</td>
            <td style="padding: 8px 12px; border: 1px solid #eee; color: #555;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #eee; font-weight: bold; color: #333;">Phone</td>
            <td style="padding: 8px 12px; border: 1px solid #eee; color: #555;">${data.contactNumber}</td>
          </tr>
        </table>
        <div style="background: #f9f9f9; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <p style="margin: 0 0 8px; color: #333;"><strong>Message:</strong></p>
          <p style="margin: 0; color: #555; white-space: pre-wrap;">${data.message}</p>
        </div>
        <p style="color: #999; font-size: 12px;">
          Submitted at ${new Date().toLocaleString()}
        </p>
      </div>
    `,
  });
}
