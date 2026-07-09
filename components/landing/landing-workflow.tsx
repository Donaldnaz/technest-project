import { ArrowRight, FileCheck2, Share2, Upload } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload your health records",
    description:
      "Add lab reports, imaging, referrals, and visit notes to your private, encrypted health folder.",
  },
  {
    step: "02",
    icon: FileCheck2,
    title: "Read plain English summaries",
    description:
      "Our AI-enabled system prepares summaries in everyday language — reviewed by a practitioner before they are finalized.",
  },
  {
    step: "03",
    icon: Share2,
    title: "Share with your care team",
    description:
      "Send selected records to your practitioner when you choose, so appointments start with the right context.",
  },
];

export function LandingWorkflow() {
  return (
    <section id="how-it-works" className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              How it works
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
              Three simple steps to organized care
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              iCare helps you upload health records, understand them in plain
              English, and share with practitioners on your terms.
            </p>

            <div className="mt-10 space-y-8">
              {steps.map((item, index) => (
                <div key={item.step} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                      <item.icon className="size-5" aria-hidden />
                    </div>
                    {index < steps.length - 1 && (
                      <span className="mt-2 h-full w-px bg-border" aria-hidden />
                    )}
                  </div>
                  <div className="pb-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Step {item.step}
                    </p>
                    <h3 className="mt-1 font-heading text-lg font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="health-card rounded-3xl p-8">
            <div className="space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-teal-100/80 via-oat-50 to-sage-100/70 p-6 dark:from-teal-950/40 dark:via-charcoal-900 dark:to-sage-950/30">
                <p className="text-sm font-medium text-muted-foreground">
                  Your health folder
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    "CBC lab results.pdf — Plain English ready",
                    "Chest X-ray report.pdf — Under review",
                    "Referral cardiology.jpg — Uploaded",
                  ].map((item) => (
                    <p
                      key={item}
                      className="rounded-xl bg-background/70 px-3 py-2 text-sm text-foreground/90 dark:bg-card/60"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-card p-4">
                <div>
                  <p className="text-sm font-medium">Practitioner review</p>
                  <p className="text-xs text-muted-foreground">
                    Summaries checked before you read them
                  </p>
                </div>
                <div className="flex size-9 items-center justify-center rounded-xl bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200">
                  <FileCheck2 className="size-4" aria-hidden />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                Open your health records workspace
                <ArrowRight className="size-4" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
