import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://babateeglobal.com"),
  title: "BABA TEE GLOBAL | Certified UK Used and Brand New Gadgets in Ogbomoso, Nigeria",
  description:
    "Shop certified Brand New and Grade A+ UK Used iPhones (Xr to 18 Pro Max), Samsung Galaxy, Google Pixel, M-Series MacBooks, and Dell XPS laptops at Baba Tee Global, UnderG, Ogbomoso, Oyo State. Insured nationwide delivery across Nigeria.",
  keywords: [
    "UK Used iPhones Ogbomoso",
    "Brand New iPhones Nigeria",
    "Samsung Galaxy S24 S26 Ultra",
    "MacBook M3 M4 Pro",
    "Dell XPS Laptops",
    "Baba Tee Global",
    "Gadget store in UnderG Ogbomoso",
    "Nationwide Delivery Nigeria",
  ],
  authors: [{ name: "BABA TEE GLOBAL" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "BABA TEE GLOBAL | Certified UK Used and Brand New Gadgets",
    description:
      "Authentic tech that performs. Grade A+ UK Used and Brand New iPhones, Samsung, Pixels, and MacBooks at UnderG, Ogbomoso. Insured nationwide delivery.",
    url: "https://babateeglobal.com",
    siteName: "BABA TEE GLOBAL",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BABA TEE GLOBAL - Certified Gadget Store in UnderG Ogbomoso",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BABA TEE GLOBAL | Certified UK Used and Brand New Gadgets",
    description:
      "Certified UK Used and Brand New iPhones, Samsung, Pixels, and MacBooks at UnderG, Ogbomoso, Nigeria. Nationwide insured dispatch.",
    images: ["/images/og-image.jpg"],
  },
  verification: {
    google: "google-site-verification-token",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FBFBFD] text-[#111115]">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
