"use client";

import { UploadFormCard } from "@/components/upload/upload-form-card";
import { UploadWellnessPanel } from "@/components/upload/upload-wellness-panel";

type UploadHubProps = {
  patientId: string;
  userName?: string | null;
  patientFirstName: string;
  patientRelationship: "self" | "other";
  isFirstUpload?: boolean;
};

export function UploadHub({
  patientId,
  userName,
  patientFirstName,
  patientRelationship,
  isFirstUpload = false,
}: UploadHubProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-border/40 bg-oat-50/50 shadow-sm dark:bg-charcoal-950/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[calc(100vh-12rem)]">
        <UploadWellnessPanel />

        <div className="flex items-center justify-center px-4 py-8 sm:px-8 lg:px-10 lg:py-12">
          <UploadFormCard
            patientId={patientId}
            userName={userName}
            patientFirstName={patientFirstName}
            patientRelationship={patientRelationship}
            isFirstUpload={isFirstUpload}
          />
        </div>
      </div>
    </section>
  );
}
