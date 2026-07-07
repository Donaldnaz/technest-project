import { requireSession, requireUserId } from "@/lib/auth/session";
import {
  countDocuments,
  countDocumentsByMimePrefix,
  countDocumentsByStatus,
  listRecentDocuments,
} from "@/lib/db/queries/documents";
import { listRecentPatients } from "@/lib/db/queries/patients";
import { DashboardQuickActions } from "@/components/dashboard/dashboard-quick-actions";
import { patientDashboardCopy } from "@/lib/copy/patient/dashboard";
import { CareTimeline } from "@/components/health/care-timeline";
import { DocumentPillbox } from "@/components/health/document-pillbox";
import { MetricCards } from "@/components/health/metric-cards";
import { WelcomeBanner } from "@/components/health/welcome-banner";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const userId = await requireUserId();
  const session = await requireSession();

  const [
    documentCount,
    readyCount,
    processingCount,
    recentDocuments,
    recentPatients,
    pdfCount,
    jpegCount,
  ] = await Promise.all([
    countDocuments(userId),
    countDocumentsByStatus(userId, "ready"),
    countDocumentsByStatus(userId, "processing"),
    listRecentDocuments(userId, 8),
    listRecentPatients(userId, 5),
    countDocumentsByMimePrefix(userId, "application/pdf"),
    countDocumentsByMimePrefix(userId, "image/jpeg"),
  ]);

  const profileId = recentPatients[0]?.id;

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <WelcomeBanner
        userName={session.user.name}
        profileId={profileId}
        documentCount={documentCount}
      />

      <DashboardQuickActions profileId={profileId} />

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="order-2 space-y-8 md:space-y-10 lg:order-1 lg:col-span-8">
          <section aria-labelledby="care-overview-heading" className="space-y-6">
            <div className="space-y-2">
              <h2
                id="care-overview-heading"
                className="font-heading text-xl font-semibold md:text-2xl"
              >
                {patientDashboardCopy.overview.recordsTitle}
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {patientDashboardCopy.overview.recordsDescription}
              </p>
            </div>
            <MetricCards
              documentCount={documentCount}
              readyCount={readyCount}
              processingCount={processingCount}
            />
          </section>

          <DocumentPillbox
            profileId={profileId}
            pdfCount={pdfCount}
            jpegCount={jpegCount}
            readyCount={readyCount}
            processingCount={processingCount}
          />
        </div>

        <aside className="order-1 lg:order-2 lg:col-span-4">
          <CareTimeline documents={recentDocuments} />
        </aside>
      </div>
    </div>
  );
}
