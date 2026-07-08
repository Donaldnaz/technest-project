import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { ICareAccountView } from "@/components/account/icare-account-view";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";

export const dynamicParams = false;

const allowedPaths = ["settings", "security"] as const;

export function generateStaticParams() {
  return allowedPaths.map((path) => ({ path }));
}

const pageMeta: Record<
  (typeof allowedPaths)[number],
  { title: string; description: string }
> = {
  settings: {
    title: "Account settings",
    description: "View your name and email. These details are set at sign-up and cannot be changed here.",
  },
  security: {
    title: "Password",
    description: "Change your sign-in password.",
  },
};

export default async function AccountPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  if (!allowedPaths.includes(path as (typeof allowedPaths)[number])) {
    notFound();
  }

  const meta = pageMeta[path as (typeof allowedPaths)[number]];

  return (
    <div className="health-page">
      <DashboardPageHeader
        title={meta.title}
        description={meta.description}
      />

      <div className="health-card mx-auto w-full max-w-3xl rounded-3xl p-6 md:p-8">
        <ICareAccountView path={path} />
      </div>

      <div className="flex justify-center">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
