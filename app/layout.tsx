import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { NeonAuthUIProvider } from "@neondatabase/auth-ui";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";

import { authClient } from "@/lib/auth/client";
import { POST_AUTH_REDIRECT } from "@/lib/routes/auth";

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
            redirectTo={POST_AUTH_REDIRECT}
          >
            {children}
            <Toaster richColors closeButton position="top-center" />
          </NeonAuthUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
