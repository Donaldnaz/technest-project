import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { NeonAuthUIProvider } from "@neondatabase/auth-ui";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";

import { authClient } from "@/lib/auth/client";

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
  title: "iCare — Upload & Share Health Records",
  description:
    "Upload medical records securely, get plain-language summaries, and share with providers you choose",
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
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <NeonAuthUIProvider
            authClient={authClient}
            account={{ basePath: "/account", fields: [] }}
            avatar={false}
            changeEmail={false}
            deleteUser={false}
            nameRequired
            signUp={{ fields: ["name"] }}
            credentials={{
              confirmPassword: true,
              forgotPassword: true,
            }}
            social={{ providers: ["google"] }}
            redirectTo="/"
          >
            {children}
            <Toaster richColors closeButton position="top-center" />
          </NeonAuthUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
