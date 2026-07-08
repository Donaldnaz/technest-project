"use client";

import { useState, useTransition } from "react";
import {
  CheckCircle2,
  Mail,
  MessageSquareText,
  SendHorizontal,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { sharePatientWithProvider } from "@/app/actions/shares";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type ShareWithProviderProps = {
  patientId: string;
  patientName: string;
  patientRelationship?: "self" | "other";
};

const fieldClassName =
  "dashboard-form-control w-full rounded-xl border border-input bg-background px-3.5 outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

export function ShareWithProvider({
  patientId,
  patientName,
  patientRelationship = "self",
}: ShareWithProviderProps) {
  const [pending, startTransition] = useTransition();
  const [providerEmail, setProviderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const notePlaceholder =
    patientRelationship === "self"
      ? "e.g. Records for my cardiology follow-up next week"
      : `e.g. Records for ${patientName.split(" ")[0]}'s upcoming visit`;

  function handleShare(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      const result = await sharePatientWithProvider({
        patientId,
        providerEmail,
        message: message || undefined,
      });

      if (result.success) {
        setProviderEmail("");
        setMessage("");
        setSent(true);
        toast.success("Request submitted — our care team will follow up.");
        return;
      }

      toast.error(result.error);
    });
  }

  function handleDismissSent() {
    setSent(false);
  }

  function handleSendAnother() {
    setSent(false);
  }

  if (sent) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="animate-in fade-in slide-in-from-top-2 overflow-hidden rounded-2xl border border-sage-200/80 bg-gradient-to-br from-sage-50 to-oat-50 shadow-sm dark:border-sage-800 dark:from-sage-950/40 dark:to-charcoal-950/40"
      >
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:p-6">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-sage-200/80 text-sage-800 dark:bg-sage-800/50 dark:text-sage-100">
            <CheckCircle2 className="size-6" aria-hidden />
          </div>

          <div className="min-w-0 flex-1 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="font-heading text-lg font-semibold text-foreground">
                  Request sent
                </p>
                <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
                  Our care team will follow up and coordinate sharing your
                  records with your provider. You do not need to do anything
                  else.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDismissSent}
                className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-sage-100/80 dark:hover:bg-sage-900/40"
                aria-label="Dismiss success message"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Button
                type="button"
                size="default"
                className="min-h-11 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
                onClick={handleDismissSent}
              >
                Done
              </Button>
              <Button
                type="button"
                size="default"
                variant="outline"
                className="min-h-11 w-full rounded-xl sm:w-auto"
                onClick={handleSendAnother}
              >
                Send another request
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/50">
      <div className="border-b border-border/60 bg-muted/25 px-5 py-4 md:px-6 md:py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <SendHorizontal className="size-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1 space-y-3">
            <div>
              <p className="font-heading text-base font-semibold text-foreground">
                Send records to your provider
              </p>
              <p className="mt-1 max-w-prose text-sm leading-relaxed text-muted-foreground">
                Enter your doctor or clinic email. Our care team handles
                secure sharing — no invite links to manage.
              </p>
            </div>
            <ol className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-3 sm:gap-3">
              {[
                "Enter provider email",
                "Add an optional note",
                "We coordinate the rest",
              ].map((step, index) => (
                <li
                  key={step}
                  className="flex items-center gap-2 rounded-xl border border-border/50 bg-background/80 px-3 py-2"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span className="leading-snug">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleShare}
        className="space-y-6 px-5 py-5 md:px-6 md:py-6"
      >
        <div className="grid gap-5 lg:grid-cols-2 lg:items-start">
          <div className="space-y-2">
            <Label
              htmlFor="providerEmail"
              className="text-sm font-medium text-foreground"
            >
              Provider email
            </Label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                id="providerEmail"
                type="email"
                placeholder="doctor@clinic.org"
                value={providerEmail}
                onChange={(event) => setProviderEmail(event.target.value)}
                required
                disabled={pending}
                className={cn(fieldClassName, "pl-10")}
              />
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Use the email address your clinic or doctor gave you for records.
            </p>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="shareMessage"
              className="text-sm font-medium text-foreground"
            >
              Optional note
              <span className="font-normal text-muted-foreground">
                {" "}
                — for our care team
              </span>
            </Label>
            <div className="relative">
              <MessageSquareText
                className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-muted-foreground"
                aria-hidden
              />
              <textarea
                id="shareMessage"
                rows={3}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className={cn(fieldClassName, "min-h-[7.5rem] resize-y py-3 pl-10")}
                placeholder={notePlaceholder}
                disabled={pending}
              />
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Mention the visit type or anything helpful for your care team.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
            By submitting, you authorize iCare to coordinate sharing your
            uploaded records with the provider listed above.
          </p>
          <Button
            type="submit"
            disabled={pending}
            className="min-h-11 w-full shrink-0 rounded-xl px-6 sm:w-auto"
          >
            {pending ? "Sending…" : "Submit to care team"}
          </Button>
        </div>
      </form>
    </div>
  );
}
