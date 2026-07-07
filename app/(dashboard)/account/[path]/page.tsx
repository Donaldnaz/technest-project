import { notFound } from "next/navigation";

import { ICareAccountView } from "@/components/account/icare-account-view";
import { AppBreadcrumbs } from "@/components/clinical/app-breadcrumbs";
import { patientAccountCopy } from "@/lib/copy/patient/account";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";

export const dynamicParams = false;

const allowedPaths = ["settings", "security"] as const;

export function generateStaticParams() {
  return allowedPaths.map((path) => ({ path }));
}

export default async function AccountPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  if (!allowedPaths.includes(path as (typeof allowedPaths)[number])) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <div className="space-y-4">
        <AppBreadcrumbs
          items={[
            { label: patientDashboardCopy.nav.home, href: "/dashboard" },
            { label: patientDashboardCopy.nav.settings },
          ]}
          showBackIcon
        />

        <header className="space-y-2">
          <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
            {patientAccountCopy.page.title}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {patientAccountCopy.page.description}
          </p>
        </header>
      </div>

      <ICareAccountView path={path} />
    </div>
  );
}
