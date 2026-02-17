import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { pageMetadata } from "@/lib/site-config";

export const metadata = pageMetadata.notFound;

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary px-6">
      <div className="mx-auto max-w-md text-center">
        <p className="bg-linear-to-r from-brand-blue to-brand-green bg-clip-text text-[6rem] font-bold leading-none text-transparent">
          404
        </p>
        <h1 className="mt-4 text-xl font-semibold text-foreground">
          Page Not Found
        </h1>
        <p className="mt-2 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-linear-to-r from-brand-blue to-brand-green px-6 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
          >
            <Home className="size-4" />
            Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <ArrowLeft className="size-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
