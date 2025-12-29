"use server";

import { client } from "@/sanity/lib/client";

interface ContactFormData {
  name: string;
  email: string;
  contactNumber: string;
  message: string;
}

interface ContactFormResponse {
  success: boolean;
  message: string;
  error?: string;
}

export async function submitContactForm(
  formData: ContactFormData,
): Promise<ContactFormResponse> {
  try {
    // Validate input
    if (!formData.name || !formData.email || !formData.contactNumber || !formData.message) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    // Create the document in Sanity
    const submission = await client.create({
      _type: "contactSubmission",
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      contactNumber: formData.contactNumber.trim(),
      message: formData.message.trim(),
      submittedAt: new Date().toISOString(),
      status: "new",
    });

    if (!submission._id) {
      throw new Error("Failed to create submission");
    }

    return {
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    };
  } catch (error) {
    console.error("Contact form submission error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
