import type { Metadata, Viewport } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { AuthUIProvider } from "@/components/providers/auth-ui-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iCare — Secure Medical Document Upload Portal",
  description:
    "Upload and manage medical records in a simple, protected healthcare portal. Share lab results and clinical documents with your practitioner when you are ready.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col overflow-x-hidden font-sans">
        <ThemeProvider>
          <AuthUIProvider>
            {children}
            <Toaster richColors closeButton position="top-center" />
          </AuthUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
