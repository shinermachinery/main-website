"use server";

import { headers } from "next/headers";

// ============================================================================
// Rate Limiting
// ============================================================================

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

// Clean up stale entries every 5 minutes
if (typeof globalThis !== "undefined") {
  const cleanup = () => {
    const now = Date.now();
    for (const [ip, entry] of rateLimitMap) {
      if (now > entry.resetAt) rateLimitMap.delete(ip);
    }
  };
  setInterval(cleanup, 5 * 60 * 1000).unref?.();
}

// ============================================================================
// Form Submission
// ============================================================================

interface ContactFormData {
  fullName: string;
  email: string;
  contactNumber: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  // Rate limit by IP
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return {
      success: false,
      error: "Too many requests. Please try again in a minute.",
    };
  }

  const { fullName, email, contactNumber, message } = data;

  // Basic validation
  if (!fullName || !email || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  try {
    // TODO: Replace with your actual email service (e.g. Resend, SendGrid, Nodemailer)
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'Shiner Contact <contact@shinermachinery.com>',
    //   to: ['sales@shinermachinery.com'],
    //   subject: `New Contact Form: ${fullName}`,
    //   text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${contactNumber}\nMessage: ${message}`,
    // });

    console.log("Contact form submission:", {
      fullName,
      email,
      contactNumber,
      message,
    });

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
}
