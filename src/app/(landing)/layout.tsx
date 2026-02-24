import { Suspense } from "react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { NavbarData } from "@/components/layout/navbar-data";
import { SanityLive } from "@/sanity/lib/live";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<Navbar />}>
        <NavbarData />
      </Suspense>
      <main className="pt-20">{children}</main>
      <Footer />
      <SanityLive />
    </>
  );
}
