import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SanityLive } from "@/sanity/lib/live";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="pt-5">{children}</main>
      <Footer />
      <SanityLive />
    </>
  );
}
