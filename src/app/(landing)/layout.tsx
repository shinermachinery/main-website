import { Navbar } from "@/components/global/navbar";
import { Footer } from "@/components/landing/footer";

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
    </>
  );
}
