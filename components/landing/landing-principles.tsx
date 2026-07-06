import { Heart, Leaf, Sparkles, Waves } from "lucide-react";

const principles = [
  {
    icon: Leaf,
    title: "Warm, not sterile",
    description:
      "Sage greens and oat creams replace harsh hospital blues — comfort first.",
  },
  {
    icon: Heart,
    title: "Readable, caring design",
    description:
      "Clear words and generous spacing — because health information should never feel rushed or cold.",
  },
  {
    icon: Waves,
    title: "Soft geometry",
    description:
      "16–24px radii and gentle shadows — every surface feels approachable.",
  },
  {
    icon: Sparkles,
    title: "Delightful moments",
    description:
      "Check-off animations and subtle celebrations when daily care is complete.",
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
