import { Heart, Leaf, ShieldCheck, Sparkles } from "lucide-react";

const principles = [
  {
    icon: Leaf,
    title: "Plain language first",
    description:
      "Health information should be easy to understand — we use clear words, not clinical jargon.",
  },
  {
    icon: Heart,
    title: "Patient-centered design",
    description:
      "Calm layouts and generous spacing — because managing health records should never feel rushed or cold.",
  },
  {
    icon: ShieldCheck,
    title: "Trust by default",
    description:
      "Encryption, access controls, and practitioner review — your health records stay private until you share them.",
  },
  {
    icon: Sparkles,
    title: "Respectful and inclusive",
    description:
      "Built for patients and caregivers of all backgrounds — with accessible, respectful language throughout.",
  },
];

export function LandingPrinciples() {
  return (
    <section className="border-t border-border/50 bg-muted/20 px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((item) => (
          <article key={item.title} className="text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <item.icon className="size-5" aria-hidden />
            </div>
            <h3 className="font-heading font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
