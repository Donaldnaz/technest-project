import Link from "next/link";
import { redirect } from "next/navigation";
import { authViewPaths } from "@neondatabase/auth-ui/server";
import { ArrowLeft } from "lucide-react";

import { AuthHeroPanel } from "@/components/auth/auth-hero-panel";
import { ICareAuthView } from "@/components/auth/icare-auth-view";
import { SignOutPage } from "@/components/auth/sign-out-page";
import { patientAuthCopy } from "@/lib/copy/patient/auth";
import { getPublicNavState } from "@/lib/navigation/public-nav-state";

export const dynamicParams = false;
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return Object.values(authViewPaths).map((path) => ({ path }));
}

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  if (path === "sign-in" || path === "sign-up") {
    const navState = await getPublicNavState();

    if (navState.isAuthenticated && navState.dashboardHref) {
      redirect(navState.dashboardHref);
    }
  }

  if (path === "sign-out") {
    return (
      <main
        id="main-content"
        className="flex min-h-dvh-screen min-h-[calc(100vh-4rem)] items-center justify-center bg-background"
      >
        <SignOutPage />
      </main>
    );
  }

  return (
    <main id="main-content" className="icare-auth-page bg-background">
      <div className="grid min-h-dvh-screen min-h-[calc(100vh-4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] xl:grid-cols-[minmax(0,1.1fr)_minmax(0,28rem)]">
        <AuthHeroPanel />

        <section className="relative flex flex-col justify-center px-4 py-10 sm:px-6 lg:px-10 lg:py-12 xl:px-14">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-oat-50/80 to-transparent lg:hidden dark:from-charcoal-950/80"
            aria-hidden
          />

          <div className="relative mx-auto w-full max-w-md">
            <div className="health-card rounded-3xl p-6 sm:p-8 md:p-10">
              <ICareAuthView path={path} />
              {path === "sign-in" && (
                <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
                  {patientAuthCopy.signIn.hint}
                </p>
              )}
              {path === "sign-up" && (
                <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
                  {patientAuthCopy.signUp.consent}
                </p>
              )}
              {path === "forgot-password" && (
                <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
                  {patientAuthCopy.forgotPassword.hint}
                </p>
              )}
              {path === "reset-password" && (
                <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
                  {patientAuthCopy.resetPassword.hint}
                </p>
              )}
            </div>

            <div className="mt-6 flex items-center justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" aria-hidden />
                {patientAuthCopy.backToHome}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
