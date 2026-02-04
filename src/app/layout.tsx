import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { GrainOverlay } from "@/components/GrainOverlay";
import { KeyboardNavigation } from "@/components/KeyboardNavigation";
import { HoverProvider } from "@/contexts/HoverContext";
import { PageTransition } from "@/components/PageTransition";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "ENTN - Underground Digital Zine",
  description: "An experimental full-screen digital magazine experience",
  keywords: ["digital zine", "underground", "experimental", "art", "culture"],
  authors: [{ name: "ENTN Collective" }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/entn-logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/entn-logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/entn-logo.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/entn-logo.png" sizes="180x180" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <CustomCursor />
        <GrainOverlay />
        <KeyboardNavigation />
        <HoverProvider>
          <main className="page-container">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
        </HoverProvider>
      </body>
    </html>
  );
}
