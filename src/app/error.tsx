"use client";

import { Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: globalThis.Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary px-6">
      <div className="mx-auto max-w-md text-center">
        <p className="bg-linear-to-r from-brand-blue to-brand-green bg-clip-text text-[6rem] font-bold leading-none text-transparent">
          500
        </p>
        <h1 className="mt-4 text-2xl font-semibold text-foreground">
          Something Went Wrong
        </h1>
        <p className="mt-2 text-muted-foreground">
          An unexpected error occurred. Please try again or contact us if the
          problem persists.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-linear-to-r from-brand-blue to-brand-green px-6 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
          >
            <RefreshCw className="size-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Home className="size-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
