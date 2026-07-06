import Link from "next/link";
import { authViewPaths } from "@neondatabase/auth-ui/server";
import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";

import { ICareAuthView } from "@/components/auth/icare-auth-view";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(authViewPaths).map((path) => ({ path }));
}

const highlights = [
  {
    icon: Sparkles,
    text: "Daily vitals and care timeline in one calm view",
  },
  {
    icon: ShieldCheck,
    text: "Upload lab reports and records securely",
  },
];

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  return (
    <main className="icare-auth-page bg-background">
      <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] xl:grid-cols-[minmax(0,1.1fr)_minmax(0,28rem)]">
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-teal-100/70 via-oat-50 to-sage-100/80 px-10 py-12 lg:flex lg:flex-col lg:justify-between dark:from-charcoal-950 dark:via-charcoal-900 dark:to-teal-950/40">
          <div
            className="pointer-events-none absolute -left-16 top-0 size-72 rounded-full bg-primary/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 right-0 size-80 rounded-full bg-accent/20 blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 max-w-lg space-y-8 pt-2">
            <div className="space-y-4">
              <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight xl:text-[2.75rem]">
                Your health, beautifully organized.
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground">
                A warm home for vitals, visits, medications, and medical
                records — designed to feel comforting, not clinical.
              </p>
            </div>

            <ul className="space-y-4">
              {highlights.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-background/70 text-primary shadow-sm dark:bg-card/60">
                    <item.icon className="size-5" aria-hidden />
                  </div>
                  <p className="pt-2 text-base leading-relaxed text-foreground/90">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <p className="relative z-10 text-sm text-muted-foreground">
            Compassionate care, beautifully organized.
          </p>
        </section>

        <section className="relative flex flex-col justify-center px-4 py-10 sm:px-6 lg:px-10 lg:py-12 xl:px-14">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-oat-50/80 to-transparent lg:hidden dark:from-charcoal-950/80"
            aria-hidden
          />

          <div className="relative mx-auto w-full max-w-md">
            <div className="health-card rounded-3xl p-6 sm:p-8 md:p-10">
              <ICareAuthView path={path} />
              {(path === "sign-up" || path === "sign-in") && (
                <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
                  {path === "sign-up"
                    ? "Full name, email, and password are all required. Use at least 8 characters for your password."
                    : "Sign in with Google or your email and password."}
                </p>
              )}
            </div>

            <div className="mt-6 flex items-center justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" aria-hidden />
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
