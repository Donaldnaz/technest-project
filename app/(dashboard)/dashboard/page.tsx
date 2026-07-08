import { requireSession, requireUserId } from "@/lib/auth/session";
import {
  getDocumentDashboardStats,
  listRecentDocuments,
} from "@/lib/db/queries/documents";
import { listRecentPatients } from "@/lib/db/queries/patients";
import { CareTimeline } from "@/components/health/care-timeline";
import { DocumentPillbox } from "@/components/health/document-pillbox";
import { MetricCards } from "@/components/health/metric-cards";
import { WelcomeBanner } from "@/components/health/welcome-banner";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const userId = await requireUserId();
  const session = await requireSession();

  const [
    documentStats,
    recentDocuments,
    recentPatients,
  ] = await Promise.all([
    getDocumentDashboardStats(userId),
    listRecentDocuments(userId, 8),
    listRecentPatients(userId, 5),
  ]);

  const {
    documentCount,
    readyCount,
    processingCount,
    pdfCount,
    jpegCount,
  } = documentStats;

  const profileId = recentPatients[0]?.id;

  return (
    <div className="health-page">
      <WelcomeBanner
        userName={session.user.name}
        profileId={profileId}
        documentCount={documentCount}
      />

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="order-2 space-y-6 lg:order-1 lg:col-span-8">
          <section aria-labelledby="care-overview-heading">
            <h2
              id="care-overview-heading"
              className="font-heading text-xl font-semibold"
            >
              Your records
            </h2>
            <p className="mt-1 mb-5 text-sm text-muted-foreground">
              Medical records you&apos;ve uploaded and their review status
            </p>
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
          <CareTimeline documents={recentDocuments} limit={3} />
        </aside>
      </div>
    </div>
  );
}
