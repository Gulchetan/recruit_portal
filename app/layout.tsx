import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import { AuthProvider } from "@/hooks/useAuth";
import { DataBootstrap } from "@/components/providers/DataBootstrap";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageEnter } from "@/components/motion/PageEnter";
import { BRAND } from "@/lib/constants";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: `${BRAND.name} | Specialist recruitment, human-first`,
  description:
    "TalentBridge India is a specialist recruitment platform for job seekers and employers. Search curated roles, apply in one click, or submit a vacancy — with zero candidate fees.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-ink">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AuthProvider>
          <DataBootstrap />
          <Header />
          <main id="main" className="w-full flex-1">
            <PageEnter>{children}</PageEnter>
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
