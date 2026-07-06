import { ThemeSwitcher } from "@/components/landing/theme-switcher";
import { SectionHeader } from "@/components/layout/section-header";
import { SiteContainer } from "@/components/layout/site-container";

export function LandingRestMode() {
  return (
    <section id="rest-mode" className="site-section border-t border-border/50">
      <SiteContainer className="py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeader
              eyebrow="Rest Mode"
              title="Easier on the eyes at night"
              description="Warm charcoals and soft amber tones for late-evening care."
            />
            <div className="mt-6">
              <ThemeSwitcher />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="health-card overflow-hidden rounded-3xl">
              <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
                <span className="text-sm font-medium">Light</span>
              </div>
              <div className="space-y-3 bg-gradient-to-br from-teal-100/50 via-oat-50 to-sage-100/40 p-5">
                <div className="rounded-2xl bg-card/90 p-4">
                  <p className="text-xs text-muted-foreground">Heart rate</p>
                  <p className="font-heading text-2xl font-semibold">72 bpm</p>
                </div>
              </div>
            </div>

            <div className="health-card overflow-hidden rounded-3xl">
              <div className="flex items-center gap-2 border-b border-border/50 bg-charcoal-950 px-4 py-3 text-amber-100">
                <span className="text-sm font-medium">Rest Mode</span>
              </div>
              <div className="space-y-3 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-amber-950/30 p-5">
                <div className="rounded-2xl bg-charcoal-900/80 p-4">
                  <p className="text-xs text-amber-200/70">Heart rate</p>
                  <p className="font-heading text-2xl font-semibold text-amber-50">
                    72 bpm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
