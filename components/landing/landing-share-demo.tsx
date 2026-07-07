import { FileUp, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { landingCopy } from "@/lib/copy/landing";

export function LandingShareDemo() {
  const { share, activity } = landingCopy.experience;

  return (
    <div className="space-y-6">
      <section
        className="health-card rounded-2xl p-5 md:p-6"
        aria-labelledby="landing-share-heading"
      >
        <div className="mb-4 space-y-1">
          <h3 id="landing-share-heading" className="font-heading text-lg font-semibold">
            {share.title}
          </h3>
          <p className="text-sm text-muted-foreground">{share.description}</p>
        </div>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="landing-provider-email">{share.providerLabel}</Label>
            <Input
              id="landing-provider-email"
              type="email"
              readOnly
              value={share.providerPlaceholder}
              className="dashboard-form-control bg-muted/30"
              tabIndex={-1}
              aria-readonly
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="landing-share-message">{share.messageLabel}</Label>
            <textarea
              id="landing-share-message"
              readOnly
              rows={3}
              defaultValue={share.messagePlaceholder}
              className="dashboard-form-control min-h-[5.5rem] resize-none bg-muted/30"
              tabIndex={-1}
              aria-readonly
            />
          </div>

          <Button type="button" size="lg" className="w-full rounded-xl" disabled>
            <Share2 className="size-4" aria-hidden />
            {share.submit}
          </Button>
        </div>
      </section>

      <section
        className="health-card rounded-2xl p-5 md:p-6"
        aria-labelledby="landing-activity-heading"
      >
        <div className="mb-4 space-y-1">
          <h3 id="landing-activity-heading" className="font-heading text-lg font-semibold">
            {activity.title}
          </h3>
          <p className="text-sm text-muted-foreground">{activity.description}</p>
        </div>

        <ol className="relative space-y-0">
          {activity.items.map((item, index) => (
            <li key={item.title} className="relative flex gap-4 pb-6 last:pb-0">
              {index < activity.items.length - 1 && (
                <span
                  className="absolute left-5 top-10 h-[calc(100%-1rem)] w-px bg-border"
                  aria-hidden
                />
              )}
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FileUp className="size-4" aria-hidden />
              </div>
              <div className="min-w-0 flex-1 pt-1">
                <p className="font-medium leading-snug">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
