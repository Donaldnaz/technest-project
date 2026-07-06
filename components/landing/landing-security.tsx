import {
  CheckCircle2,
  Eye,
  Heart,
  Shield,
  UserCheck,
} from "lucide-react";

const points = [
  "Your medical history stays private and accessible only to you",
  "Lab results and imaging stored safely with each patient profile",
  "Clear record of who is in your care and what needs follow-up",
  "Designed for clinicians and families — simple, calm, trustworthy",
];

export function LandingSecurity() {
  return (
    <section
      id="trust"
      className="border-t border-border/50 bg-gradient-to-b from-muted/20 to-background px-4 py-20 md:px-6 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="health-card rounded-3xl p-8 md:p-10">
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Shield, label: "Privacy", value: "Protected" },
              { icon: Heart, label: "Records", value: "Organized" },
              { icon: UserCheck, label: "Care team", value: "Connected" },
              { icon: Eye, label: "Results", value: "Clear" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-muted/40 p-4 dark:bg-muted/20"
              >
                <item.icon className="mb-2 size-5 text-primary" aria-hidden />
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-heading font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Trust & privacy
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Your health deserves dignity and discretion
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            iCare is built around the belief that medical information should feel
            safe — never exposed, never overwhelming, always in your control.
          </p>

          <ul className="mt-8 space-y-4">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 size-5 shrink-0 text-primary"
                  aria-hidden
                />
                <span className="text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
