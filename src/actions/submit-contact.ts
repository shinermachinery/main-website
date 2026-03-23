"use server";

import { headers } from "next/headers";
import { sendContactConfirmation, sendContactNotification } from "@/lib/mail";
import { writeClient } from "@/sanity/lib/client";

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
  name: string;
  email: string;
  contactNumber: string;
  message: string;
}

interface ContactFormResponse {
  success: boolean;
  message: string;
}

export async function submitContactForm(
  formData: ContactFormData,
): Promise<ContactFormResponse> {
  // Rate limit by IP
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return {
      success: false,
      message: "Too many requests. Please try again in a minute.",
    };
  }

  const { name, email, contactNumber, message } = formData;

  // Basic validation
  if (!name || !email || !contactNumber || !message) {
    return {
      success: false,
      message: "All fields are required.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  try {
    const submission = await writeClient.create({
      _type: "contactSubmission",
      name: name.trim(),
      email: email.trim().toLowerCase(),
      contactNumber: contactNumber.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      status: "new",
    });

    if (!submission._id) {
      throw new Error("Failed to create submission");
    }

    // Send emails in the background — don't block the response
    const emailData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      contactNumber: contactNumber.trim(),
      message: message.trim(),
    };

    Promise.all([
      sendContactConfirmation(emailData),
      sendContactNotification(emailData),
    ]).catch((err) => {
      console.error("Failed to send contact emails:", err);
    });

    return {
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    };
  } catch (error) {
    console.error("Contact form submission error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
