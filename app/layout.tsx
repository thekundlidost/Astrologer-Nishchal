import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";
import Analytics from "@/components/ui/Analytics";
import ClickTracker from "@/components/ui/ClickTracker";
import FloatingActionBar from "@/components/ui/FloatingActionBar";
import { SITE } from "@/lib/constants";
import { jsonLd, organizationSchema } from "@/lib/schema";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Personalized Astrology Guidance`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "astrologer online india",
    "kundli consultation",
    "kundli report online",
    "tarot reading online",
    "numerology report",
    "gemstone consultation",
    "thekundlidost",
    "Astrologer Nishchal",
  ],
  openGraph: {
    title: `${SITE.name} — Personalized Astrology Guidance`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Personalized Astrology Guidance`,
    description: SITE.description,
  },
  alternates: { canonical: "/" },
};

// Inline script prevents a flash of light theme before hydration.
const noFlashScript = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (t === 'dark' || (!t && d)) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(organizationSchema())}
        />
        <Header />
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        <Footer />
        <StickyMobileCTA />
        <FloatingActionBar />
        <ExitIntentPopup />
        <Analytics />
        <ClickTracker />
      </body>
    </html>
  );
}
