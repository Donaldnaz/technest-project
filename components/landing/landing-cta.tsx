import { LinkButton } from "@/components/ui/link-button";
import { SiteContainer } from "@/components/layout/site-container";

export function LandingCta() {
  return (
    <section className="site-section border-t border-border/50">
      <SiteContainer className="py-16 md:py-20">
        <div className="health-card relative overflow-hidden rounded-3xl px-6 py-12 text-center md:px-12">
          <div
            className="pointer-events-none absolute -left-12 top-0 size-48 rounded-full bg-sage-100/60 blur-3xl dark:bg-sage-950/30"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-8 bottom-0 size-40 rounded-full bg-terracotta-100/50 blur-3xl dark:bg-terracotta-900/20"
            aria-hidden
          />

          <div className="relative">
            <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
              Start your care journey
            </h2>
            <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed text-muted-foreground">
              Free to begin. Explore the live demo above, then create an account
              when you&apos;re ready.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <LinkButton href="/auth/sign-up" size="lg" className="rounded-2xl">
                Create account
              </LinkButton>
              <LinkButton
                href="/auth/sign-in"
                variant="outline"
                size="lg"
                className="rounded-2xl"
              >
                Sign in
              </LinkButton>
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
