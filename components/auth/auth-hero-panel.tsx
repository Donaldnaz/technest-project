import Image from "next/image";
import { ShieldCheck, Sparkles } from "lucide-react";

import { patientAuthCopy } from "@/lib/copy/patient/auth";

const highlights = [
  {
    icon: Sparkles,
    text: patientAuthCopy.hero.highlights[0],
  },
  {
    icon: ShieldCheck,
    text: patientAuthCopy.hero.highlights[1],
  },
];

export function AuthHeroPanel() {
  return (
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
            {patientAuthCopy.hero.title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {patientAuthCopy.hero.description}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 shadow-sm">
          <div className="relative aspect-[4/3]">
            <Image
              src="/landing/healthcare-hero.png"
              alt="Patient and care team reviewing health records together in a calm, modern clinic"
              fill
              priority
              sizes="(max-width: 1280px) 0vw, 40vw"
              className="object-cover object-center"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-900/25 via-transparent to-transparent"
              aria-hidden
            />
          </div>
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
        {patientAuthCopy.hero.footer}
      </p>
    </section>
  );
}
