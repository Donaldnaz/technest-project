import { redirect } from "next/navigation";

import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { SiteContainer } from "@/components/layout/site-container";
import { patientOnboardingCopy } from "@/lib/copy/patient/onboarding";
import { isOnboardingComplete } from "@/lib/auth/onboarding";
import { getOptionalSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

function splitDisplayName(name: string | null | undefined): {
  firstName: string;
  lastName: string;
} {
  if (!name?.trim()) {
    return { firstName: "", lastName: "" };
  }

  const parts = name.trim().split(/\s+/);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ");

  return { firstName, lastName };
}

export default async function OnboardingPage() {
  const session = await getOptionalSession();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  if (await isOnboardingComplete(session.user.id)) {
    redirect("/dashboard");
  }

  const { firstName, lastName } = splitDisplayName(session.user.name);
  const copy = patientOnboardingCopy;

  return (
    <SiteContainer className="max-w-3xl">
      <header className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {copy.page.eyebrow}
          </p>
          <p className="rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground">
            {copy.page.timeEstimate}
          </p>
        </div>
        <h1 className="mt-4 font-heading text-2xl font-semibold tracking-tight text-balance max-sm:text-xl md:text-3xl lg:text-4xl">
          {copy.page.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
          {copy.page.description}
        </p>
      </header>

      <OnboardingForm
        defaultAccountFirstName={firstName}
        defaultAccountLastName={lastName}
      />
    </SiteContainer>
  );
}
