import { redirect } from "next/navigation";

import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { SiteContainer } from "@/components/layout/site-container";
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

  return (
    <SiteContainer className="max-w-2xl">
      <header className="mb-8 text-center md:mb-10">
        <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          Welcome to iCare
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          Before you upload health records, tell us a little about you and who
          you are caring for.
        </p>
      </header>

      <OnboardingForm
        defaultAccountFirstName={firstName}
        defaultAccountLastName={lastName}
      />
    </SiteContainer>
  );
}
