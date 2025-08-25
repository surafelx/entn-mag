import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { GrainOverlay } from "@/components/GrainOverlay";
import { KeyboardNavigation } from "@/components/KeyboardNavigation";
import { Layout } from "@/components/Layout";
import { HoverProvider } from "@/contexts/HoverContext";

export const metadata: Metadata = {
  title: "ENTN - Underground Digital Zine",
  description: "An experimental full-screen digital magazine experience",
  keywords: ["digital zine", "underground", "experimental", "art", "culture"],
  authors: [{ name: "ENTN Collective" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
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
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="overflow-hidden">
        <CustomCursor />
        <GrainOverlay />
        <KeyboardNavigation />

        <main className="page-container">
          <HoverProvider>
            <Layout>
              {children}
            </Layout>
          </HoverProvider>
        </main>
      </body>
    </html>
  );
}
