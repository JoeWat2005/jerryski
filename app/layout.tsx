import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://jerryski.com";
const SITE_DESCRIPTION =
  "Building affordable ski and snowboard gear for beginners, riders, and future extreme sports athletes.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JerrySki | Launching Soon",
    template: "%s | JerrySki",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "JerrySki",
    "ski gear",
    "snowboard gear",
    "affordable ski gear",
    "extreme sports",
    "snow sports",
  ],
  applicationName: "JerrySki",
  authors: [{ name: "JerrySki" }],
  creator: "JerrySki",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "JerrySki",
    title: "JerrySki | Coming Soon",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "JerrySki | Launching Soon",
    description: SITE_DESCRIPTION,
    creator: "@jerryski",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FF6B00",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
