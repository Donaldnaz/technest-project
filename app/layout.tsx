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
  title: "iCare — Simple Health Records Portal",
  description:
    "A simple healthcare management portal for patients. Upload medical documents securely and share them with practitioners for review.",
  other: {
    "business:contact_data:street_address": "548 Market Street, Suite 35410",
    "business:contact_data:locality": "San Francisco",
    "business:contact_data:region": "CA",
    "business:contact_data:postal_code": "94104",
    "business:contact_data:country_name": "United States",
  },
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
              forgotPassword: false,
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
