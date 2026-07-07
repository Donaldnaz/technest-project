"use client";

import { Badge } from "@/components/ui/badge";
import { landingCopy } from "@/lib/copy/landing";

const statusLabels = {
  ready: "Ready to view",
  processing: "Being organized",
} as const;

export function LandingDocumentsDemo() {
  const { documents } = landingCopy.experience;

  return (
    <section
      className="health-card rounded-2xl p-5 md:p-6"
      aria-labelledby="landing-documents-heading"
    >
      <div className="mb-4 space-y-1">
        <h3 id="landing-documents-heading" className="font-heading text-lg font-semibold">
          {documents.title}
        </h3>
        <p className="text-sm text-muted-foreground">{documents.description}</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30">
              {documents.columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {documents.rows.map((row) => (
              <tr
                key={row.fileName}
                className="border-b border-border/40 last:border-0"
              >
                <td className="px-4 py-3 font-medium">{row.fileName}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.type}</td>
                <td className="px-4 py-3">
                  <Badge
                    variant={row.status === "ready" ? "secondary" : "outline"}
                    className={
                      row.status === "ready"
                        ? "bg-sage-100 text-sage-800 dark:bg-sage-950/50 dark:text-sage-200"
                        : undefined
                    }
                  >
                    {statusLabels[row.status]}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
